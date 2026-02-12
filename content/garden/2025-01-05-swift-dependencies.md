---
author: hogumachu
title: Swift Dependencies 잘 활용하기
subtitle: 추상화를 통해 빌드 시간 절약하기
date: 2025-01-05 19:00
tags: iOS, Dependency Injection
published: true
---

## 의존성 주입 방식
TCA를 주력으로 사용하다보니 [swift-dependencies](https://github.com/pointfreeco/)로 의존성 관리를 하고 있다.

프로토콜 방식과 다르게 구조체+클로저를 통해 의존성을 다루고 있다.

```swift
/// 구조체+클로저
@DependencyClient
struct Manager {
  var execute: @Sendable () async throws -> Void
}

protocol Provider {
  func execute() async throws -> Void
}

final class DefaultProvider: Provider {}
```

## Swift Dependencies를 활용한 의존성 역전
[swift-dependencies](https://github.com/pointfreeco/)는 이러한 의존성이 추상화 되지 않는 줄 알았는데 너무 잘 되고 있었다.

```swift
/// AuthClient 모듈
@DependencyClient
public struct AuthClient {
  public var auth: @Sendable () async throws -> Void
}

extension AuthClient: TestDependencyKey {
  public static let testValue = Self()
}

/// AuthClientLive 모듈
extension AuthClient: DependencyKey {
  public static let liveValue = AuthClient(
    auth: { /* 구현 */ }
  )
}
```

위와 같은 방식으로 모듈을 분리하고 그냥 사용하는 곳에서 구현체에 대한 모듈을 import하면 된다.

이를 통해 사이즈가 큰 외부 라이브러리(e.g. Firebase)를 인터페이스 모듈로 분리하여 활용하고 있다.

[링크](https://github.com/pointfreeco/isowords/tree/main/Sources/ApiClient)를 참조하면 좋다.
