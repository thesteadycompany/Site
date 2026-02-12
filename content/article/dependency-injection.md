---
author: hogumachu
title: 의존성 주입에 대해서
subtitle: iOS에서 사용하는 의존성 주입 방법은 뭐가 있을까?
date: 2025-05-06 00:00
tags: Blog, Swift, Dependency-Injection
published: true
---

# 의존성 주입에 대해서

## 정의

- 소프트웨어 엔지니어링에서 의존성 주입(dependency injection) 은 하나의 객체가 다른 객체의 의존성을 제공하는 테크닉
- ”의존성”은 예를 들어 서비스로 사용할 수 있는 객체이다. 클라이언트가 어떤 서비스를 사용할 것인지 지정하는 대신, 클라이언트에게 무슨 서비스를 사용할 것인지를 말해주는 것이다. 
- "주입"은 의존성(서비스)을 사용하려는 객체(클라이언트)로 전달하는 것을 의미한다. 서비스는 클라이언트 상태의 일부이다. 클라이언트가 서비스를 구축하거나 찾는 것을 허용하는 대신 클라이언트에게 서비스를 전달하는 것이 패턴의 기본 요건이다.
- 출처 -  [위키백과](https://ko.wikipedia.org/wiki/의존성_주입)

의존성 주입의 의도는 _**객체의 생성과 사용의 관심을 분리**_ 하는 것이에요.

## Swift에서의 의존성 주입
---
### Protocol 기반 의존성
- Swift에서는 대부분 프로토콜 기반으로 의존성을 설계해요.
```swift
protocol ReadableClient {
  func read(id: String) async throws -> Data
}

protocol WritableClient: ReadableClient {
  func write(id: String, data: Data) async throws
}

final class ReadOnlyController {
  private let readableClient: any ReadableClient
}

final class SomeController {
  private let writableClient: any WritableClient
  
  func makeReadOnlyController() -> ReadOnlyController {
    return ReadOnlyController(readableClient: writableClient)
  }
}
```
- Protocol 기반 의존성은 여러 의존성을 중첩할 수 있어요.
- 필요한 Protocol만 열어주고 불필요한 부분은 닫아줄 수 있어요.
  - 이로 인해 휴먼 에러를 줄일 수 있어요. (읽기 전용에서는 읽기 동작만 강제)

### Struct 기반 의존성
- pointfree에서 만든 [swift-dependencies](https://github.com/pointfreeco/swift-dependencies) 라는 라이브러리는 struct 기반이에요.
- pointfree가 생각하는 struct와 protocol 기반 의존성 주입에 대한 글은 [링크](https://swiftpackageindex.com/pointfreeco/swift-dependencies/main/documentation/dependencies/designingdependencies) 를 참조해주세요.
- 의존성을 struct로 설계하고 그 내부 구현을 주입 받도록 하는 방식이에요.
```swift
struct SomeClient {
  var read: (_ id: String) async throws -> Data
  var write: (_ id: String, _ data: Data) async throws -> Void
}

// 상세 구현 생략

final class ReadOnlyController {
  @Dependency(\.someClient.read) var read
}

final class SomeController {
  @Dependency(\.someClient) var someClient
}
```

## Protocol vs. Struct(swift-dependencies) 기반 의존성
---
### Protocol 기반 의존성 주입은 무겁다. (swift-dependencies)

protocol 기반은 mock 객체를 만들기 위해 해당 protocol을 준수하는 객체를 만들어야 해요.
struct 기반은 준수하는 과정 없이 객체를 만들기만 하면 mock 객체로 사용할 수 있어요.
```swift
/// Protocol 기반
final class MockWritableClient: WritableClient {
  func read(id: String) async throws -> Data { /* 생략 */ }
  func write(id: String, data: Data) async throws { /* 생략 */ }
}

let mockClient = MockWritableClient()
```

```swift
/// Struct 기반
let client = SomeClient(
  read: { /* 생략 */ },
  write: { /* 생략 */ }
)
```
확실히 Struct 기반이 가볍다고 느껴져요.
그러나 이 단점은 Protocol 기반 + [mockolo](https://github.com/uber/mockolo)를 활용해서 코드 생성을 하여 해결할 수 있어요.

### swift-dependencies는 구현체를 추상화하기 어렵다.
Protocol 기반은 인터페이스에 의존을 하며 외부에서 해당 의존성을 주입해요.
swift-dependencies도 그런 방식이 가능하지만 가이드 방식은 조금 달라요.

아래와 같은 모듈 구조가 있다고 가정할게요.

![](/images/blog/dependency-injection/1.png)

먼저 Protocol 기반 의존성은 다음과 같아요.
```swift
/// Service Interface Module

public protocol ReadableClient {
  func read(id: String) async throws -> Data
}

public protocol WritableClient: ReadableClient {
  func write(id: String, data: Data) async throws
}
```

```swift
/// Service Module

import ServiceInterfaceModule

public final class DefaultClient: WritableClient {
  public func read(id: String) async throws -> Data { /* 생략 */ }
  public func write(id: String, data: Data) async throws { /* 생략 */ }
}
```

```swift
/// Home Module

import ServiceInterfaceModule

public final class HomeViewController: UIViewController {
  private let client: WritableClient
  public init(client: WritableClient) { /* 생략 */ }
}
```

```swift
/// App Module

import Home
import ServiceModule
import ServiceInterfaceModule

func makeRootViewController() -> UIViewController {
  let client = DefaultClient()
  let viewController = HomeViewController(client: client)
  return viewController
}
```

확실히 라이브러리를 사용하지 않은 Protocol 기반은 꽤 복잡해요.
swift-dependencies를 사용하면 굉장히 편리해요.
그러나 인터페이스 모듈을 활용하기 어려워요.
static으로 선언된 의존성을 알고 있어야 하기 때문이에요.

```swift
/// 인터페이스
public struct SomeClient: Sendable {
  public var read: @Sendable (_ id: String) async throws -> Data
  public var write: @Sendable (_ id: String, _ data: Data) async throws -> Void
}

/// 구현체
extension SomeClient: DependencyKey {
  public static var liveValue: Self { 
    /* implemented */
  }
}

extension DependencyValues {
  public var someClient: SomeClient {
    get { self[SomeClient.self] } 
    set { self[SomeClient.self] = newValue }
  }
}
```
Struct로 인터페이스를 정의하고 `DependencyKey`, `DependencyValues`로 구현체를 정의해요.
해당 객체를 사용하는 곳에서는 `@Dependency`라는 property wrapper를 통해 값을 가져오는데 인터페이스만을 통해서는 가져올 수 없어요.

즉, 모듈 구조가 아래와 같은 형태가 되어요.

![](/images/blog/dependency-injection/2.png)

## 정리하자면
---
저는 최근에 UIKit을 사용하면 [needle](https://github.com/uber/needle) + [mockolo](https://github.com/uber/mockolo)를 사용하고 있어요.
needle은 서비스 로케이터 패턴의 편리함과 컴파일 타임에 의존성 주입 체크를 할 수 있는 라이브러리에요.

SwiftUI를 사용하면 [swift-dependencies](https://github.com/pointfreeco/swift-dependencies)를 활용해요.
TCA를 주로 활용하는데 해당 라이브러리가 강결합이 되어있어 선택지가 없어요 😢

만약 사내에서 의존성 관리를 어떻게 할 것인지 생각한다면 저는 아래와 같은 기준으로 선택할 것 같아요.
- iOS 개발자가 많은가? -> 많다면 Protocol, 그렇지 않다면 Struct
  - 많다의 기준이 모호하지만, 저는 3명이 넘어가는 순간 Protocol을 선택할 것 같아요.
  - Struct 기반을 활용하다보면 자꾸 그 상황에 쓰는 기능이 아닌 것을 종종 활용하더라구요. (static 선언이므로)
  - 물론 Struct 기반도 여러 Struct로 쪼개면 위와 같은 문제를 해결할 수 있을 것 같아요.
- TCA를 사용하는가? -> 어쩔 수 없이 Struct (swift-dependencies)
- RIBs를 사용하는가? -> [needle](https://github.com/uber/needle) 추천드려요.

사실 위와 같은 얘기를 했지만 Struct가 너무 편리한 것 같아요.
RIBs + Protocol 기반으로 많은 작업을 했지만 많은 코드 점핑으로 인해 구현체를 찾기 불편한 점도 있었고 굳이 그정도로 추상화를 해야 하는 것인가? 하는 생각이 종종 생겼어요.
최근에는 일단 확장성보다는 생산성에 초점을 두고 진행한 후 추후 문제가 생길 것 같으면 바꾸는 것도 하나의 방법이라 생각해요.
