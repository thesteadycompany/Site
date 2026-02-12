---
author: hogumachu
title: TaskLocal로 스레드 안전한 의존성 주입하기
subtitle: 주입하기 애매한 Date, UUID, Locale을 컨텍스트로 다루는 법
coverImage: /images/covers/2026-01-30-tasklocal-dependency-injection-cover.jpg
date: 2026-01-30 16:30
tags: Swift, iOS, Dependency Injection, TaskLocal, Testing
published: true
---

## 들어가며

의존성 주입이라고 하면 보통 생성자나 함수 인자로 넘기는 방식을 먼저 떠올리잖아요.\
그런데 Date, UUID, Locale 같은 값은 "현재 시각", "새 ID", "현재 로케일"처럼\
전역이나 환경에 가깝기 때문에 매 레이어마다 인자로 넘기기 애매해요.

swift-dependencies처럼 "컨텍스트 기반 DI"를 쓰면\
이런 의존성도 테스트 가능하고 스레드 안전하게 다룰 수 있다는 걸\
**TaskLocal**로 직접 구현해보면서 정리해봤어요.

---

## 왜 "주입하기 애매한" 의존성이 있을까

**Date, UUID, Locale**은 앱 전역에서 쓰이지만,\
매번 `init(date: Date, uuid: UUID, locale: Locale)`처럼 넘기자니 시그니처가 부풀어 오르고,\
실제로는 대부분 "지금 시각", "새 UUID", "현재 로케일" 한 가지 구현만 써요.

**이미지 디스크 캐시**처럼 앱 전역에서 하나만 쓰는 객체도 비슷해요.\
프로덕션에서는 한 인스턴스를 쓰고, 테스트에서만 mock/stub으로 바꾸고 싶은데\
생성자로만 주입하려면 그 객체를 쓰는 모든 경로에 인자가 붙어야 해요.

정리하면, "싱글톤처럼 한 번 정해진 값을 어디서든 쓰고 싶지만,\
테스트와 스레드 안전하게 바꿀 수 있는" 수단이 필요해요.

---

## TaskLocal이 주는 것: 스레드 안전 + 태스크 스코프

**TaskLocal**은 Swift가 제공하는 메커니즘으로,\
스레드 로컬처럼 "현재 실행 컨텍스트(태스크)"에 값을 묶어 둬요.

싱글톤처럼 "한 번 정해진 값을 어디서든 쓰는" 느낌을 주면서,\
**태스크 단위로** 다른 값으로 덮어쓸 수 있어요.\
그래서 테스트에서만 `withValue`로 고정된 Date, UUID, Locale을 넣어 주면 되고,\
프로덕션 코드는 생성자 인자를 늘리지 않아도 돼요.

---

## 1. 가장 단순한 형태: SimpleDependency

구현 난이도가 가장 낮아요.\
타입당 **TaskLocal 하나**만 두는 방식이에요.\
`@TaskLocal public static var current`에 클로저를 넣어 두고, 호출부에서는 `current()`처럼 써요.

```swift
public enum SimpleDateGenerator {
  @TaskLocal public static var current: @Sendable () -> Date = { Date() }
}

public enum SimpleUUIDGenerator {
  @TaskLocal public static var current: @Sendable () -> UUID = { UUID() }
}

public enum SimpleLocaleGenerator {
  @TaskLocal public static var current: @Sendable () -> Locale = { .current }
}
```

View에서는 생성자로 Date/UUID/Locale을 받지 않고,\
`SimpleDateGenerator.current()`, `SimpleUUIDGenerator.current()`처럼 현재 컨텍스트에서 꺼내 써요.

테스트에서는 `$current.withValue`로 해당 태스크 안에서만 값을 덮어써요.

```swift
@Test @MainActor func testDate() async throws {
  let now = Date(timeIntervalSince1970: 0)
  SimpleDateGenerator.$current.withValue({ now }) {
    let view = SimpleDependencyView()
    #expect(view.date == now)
  }
}
```

"타입당 TaskLocal 하나"만 있어도,\
생성자 인자 없이 View나 비즈니스 로직에서 값을 쓰고, 테스트에서만 덮어쓸 수 있어요.

---

## 2. 컨테이너 하나로 모으기: ContainerDependency

난이도는 Simple보다 한 단계 올라가요.\
TaskLocal에는 "값 하나"만 둘 수 있으므로,\
date, uuid, locale을 담은 **구조체 하나**를 통째로 넣는 방식이에요.

```swift
public enum ContainerDependencyValues {
  @TaskLocal public static var current = ContainerDependencyContainer()
}

public struct ContainerDependencyContainer: Sendable {
  public var date: @Sendable () -> Date
  public var uuid: @Sendable () -> UUID
  public var locale: @Sendable () -> Locale

  public init(
    date: @Sendable @escaping () -> Date = { Date() },
    uuid: @Sendable @escaping () -> UUID = { UUID() },
    locale: @Sendable @escaping () -> Locale = { Locale.current }
  ) {
    self.date = date
    self.uuid = uuid
    self.locale = locale
  }
}

@propertyWrapper
public struct ContainerDependency<Value> {
  private let keyPath: KeyPath<ContainerDependencyContainer, Value>

  public var wrappedValue: Value {
    ContainerDependencyValues.current[keyPath: keyPath]
  }
  public init(_ keyPath: KeyPath<ContainerDependencyContainer, Value>) {
    self.keyPath = keyPath
  }
}
```

`withDependencies`는 컨테이너를 하나 만들고, 필요한 필드만 바꾼 뒤 TaskLocal에 넣어 operation을 실행해요.

```swift
public func withDependencies<T>(
  _ configure: (inout ContainerDependencyContainer) -> Void,
  operation: () async throws -> T
) async rethrows -> T {
  var deps = ContainerDependencyContainer()
  configure(&deps)
  return try await ContainerDependencyValues.$current.withValue(deps, operation: operation)
}
```

View 사용법은 Simple보다 나아져요. `@ContainerDependency(\.date)` 등으로 접근할 수 있어요.

다만 단점이 있어요.\
**연관 없는 의존성**을 하나의 구조체에 몰아넣다 보니 응집도가 떨어져요.\
Date/UUID/Locale은 서로 역할이 다른데, 같은 컨테이너에 묶여 있거든요.\
그리고 **확장성**이 없어요. 새 의존성(예: 이미지 캐시)을 넣으려면 `ContainerDependencyContainer` 정의를 매번 수정해야 해요.

---

## 3. swift-dependencies 스타일: ProtocolDependency

구현 난이도는 세 가지 중 가장 높지만, **사용성은 가장 좋아요.**\
Container의 단점(응집도와 확장성)을 Key 기반 설계로 해결한 형태예요.

의존성을 **한 컨테이너에 모으되, Key로 접근**해요.\
각 Key가 자기 타입만 책임지므로 연관 없는 것끼리 한 덩어리로 묶이지 않고,\
새 의존성은 Key + defaultValue만 추가하면 되므로 확장이 자유로워요.

**DependencyKey**와 **DependencyValues**(TaskLocal)로 "현재 컨텍스트의 의존성 모음"을 표현해요.

```swift
public protocol DependencyKey {
  associatedtype Value: Sendable
  static var defaultValue: Value { get }
}

public struct DependencyValues: Sendable {
  @TaskLocal public static var current = DependencyValues()

  private var storage: [ObjectIdentifier: any Sendable] = [:]

  public subscript<Key: DependencyKey>(key: Key.Type) -> Key.Value {
    get {
      guard let value = storage[ObjectIdentifier(key)] as? Key.Value else {
        return Key.defaultValue
      }
      return value
    }
    set {
      storage[ObjectIdentifier(key)] = newValue
    }
  }
}

@propertyWrapper
public struct Dependency<Value> {
  private let keyPath: KeyPath<DependencyValues, Value>

  public init(_ keyPath: KeyPath<DependencyValues, Value>) {
    self.keyPath = keyPath
  }

  public var wrappedValue: Value {
    DependencyValues.current[keyPath: keyPath]
  }
}
```

Date, UUID, Locale은 Key + DependencyValues 확장으로 등록해요.

```swift
public struct DateGeneratorKey: DependencyKey {
  public static let defaultValue: @Sendable () -> Date = { Date() }
}

extension DependencyValues {
  public var date: @Sendable () -> Date {
    get { self[DateGeneratorKey.self] }
    set { self[DateGeneratorKey.self] = newValue }
  }
}
```

**withDependencies**로 "이 operation 안에서만" 의존성을 바꿔서 실행해요.

```swift
public func withDependencies<T>(
  _ configure: (inout DependencyValues) -> Void,
  operation: () async throws -> T
) async rethrows -> T {
  var deps = DependencyValues.current
  configure(&deps)
  return try await DependencyValues.$current
    .withValue(deps, operation: operation)
}
```

View에서는 생성자 주입 없이 `@Dependency(\.date)` 등으로 접근해요.

```swift
struct ProtocolDependencyView: View {
  @Dependency(\.date) var date
  @Dependency(\.uuid) var uuid
  @Dependency(\.locale) var locale

  var body: some View {
    // ...
    DateView(date: date())
    UUIDView(uuid: uuid())
    LocaleView(locale: locale)
  }
}
```

테스트에서는 `withDependencies` 안에서만 mock으로 교체해요.

```swift
await withDependencies {
  $0.date = { now }
} operation: {
  let view = ProtocolDependencyView()
  #expect(view.date() == now)
}
```

새 의존성(예: 이미지 캐시)은 **Key + defaultValue**만 추가하고,\
`DependencyValues`에 프로퍼티만 붙이면 호출부는 그대로 `@Dependency(\.imageCache)`로 사용할 수 있어요.

세 가지를 한 줄로 정리하면:

- **SimpleDependency**: 구현이 가장 쉽고 단순해요. 타입별 TaskLocal 하나씩.
- **ContainerDependency**: 한 단계 복잡해요. 단일 구조체 컨테이너. 다만 응집도와 확장성은 아쉬워요.
- **ProtocolDependency**: 구현은 가장 어렵지만 사용성은 가장 좋아요. Key 기반으로 응집도와 확장성을 모두 잡아요.

---

## 정리 및 활용 포인트

Date, UUID, Locale, 이미지 디스크 캐시처럼 "주입받기 애매한" 의존성은\
TaskLocal + (필요하면) Key/Container 패턴으로 깔끔하게 다룰 수 있어요.

- **테스트**: 생성자/함수 시그니처를 바꾸지 않고,\
  `withValue` / `withDependencies` scope 안에서만 mock으로 교체하면 돼요.
- **스레드 안전**: TaskLocal은 태스크 단위로 격리되므로, 동시에 여러 태스크가 있어도 서로 덮어쓰지 않아요.
- swift-dependencies 라이브러리를 쓰지 않아도,\
  같은 아이디어를 프로젝트 규모에 맞게 Simple -> Container -> Protocol 중에서 선택해서 구현할 수 있어요.\
  난이도와 사용성을 고려하면 1->2->3 순서로 갈수록 구현은 복잡해지고, 대신 사용성과 확장성이 좋아져요.

---

## 마치며

매번 인자로 넘기지 않아도, TaskLocal로 스레드 안전하고 테스트 가능한 의존성 주입을 할 수 있다는 걸\
Simple -> Container -> Protocol 순으로, 난이도가 올라가면서 사용성도 함께 올라가는 세 가지 형태로 구현해봤어요.

주입하기 애매한 의존성이 생길 때마다 "생성자에 또 넣을까" 말고,\
"TaskLocal로 컨텍스트에 묶어 두고 테스트에서만 바꿀까"를 한 번 떠올려 보면 좋겠어요.

참고:

- [pointfreeco/swift-dependencies](https://github.com/pointfreeco/swift-dependencies)
- [샘플 코드](https://github.com/thesteadycompany/Samples/tree/main/Dependency)
