---
author: hogumachu
title: Swift Dependencies 잘 활용하기
subtitle: 추상화를 통해 빌드 시간 절약하기
coverImage: /images/covers/2025-01-05-swift-dependencies-cover.jpg
date: 2025-01-05 19:00
tags: iOS, Dependency Injection
published: true
---

## 들어가며

TCA를 주력으로 사용하다 보니 [swift-dependencies](https://github.com/pointfreeco/)로 의존성을 관리하고 있어요.\
프로토콜 방식과 다르게, 구조체+클로저를 통해 의존성을 다루는 방식이에요.

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

---

## 의존성 역전이 이렇게 잘 되는 줄 몰랐어요

사실 처음에는 [swift-dependencies](https://github.com/pointfreeco/)로 의존성이 제대로 추상화되지 않을 줄 알았어요.\
그런데 실제로 써보니 너무 잘 되고 있었어요.

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

위처럼 모듈을 분리하고, 사용하는 쪽에서 구현체 모듈을 import하면 돼요.

---

## 마치며

이 방식을 통해 사이즈가 큰 외부 라이브러리(예: Firebase)를 인터페이스 모듈로 분리해서 활용하고 있어요.\
빌드 시간도 줄어들었고, 테스트 환경도 훨씬 깔끔해졌어요.

참고로 [isowords의 ApiClient 구조](https://github.com/pointfreeco/isowords/tree/main/Sources/ApiClient)를 보면\
실제 프로젝트에서 어떻게 적용하는지 감을 잡을 수 있어요.
