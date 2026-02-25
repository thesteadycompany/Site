---
author: hogumachu
title: TCA Feature(Reducer)는 왜 순수해야 할까
subtitle: 예측 가능성, 테스트, 리플레이, 동시성, 의존성 경계 관점에서 정리
date: 2026-02-25 21:00
tags: iOS, Swift, TCA, Architecture, Test
coverImage: /images/covers/why-tca-feature-must-be-pure-cover.jpg
published: true
---

# TCA Feature(Reducer)는 왜 순수해야 할까

TCA를 쓰다 보면 결국 같은 질문으로 돌아온다.

“Reducer를 왜 이렇게까지 순수하게 유지해야 하지?”

결론부터 말하면 이유는 명확하다.

- 예측 가능성
- 테스트 가능성
- 리플레이/디버깅
- 동시성 안정성
- 의존성 경계 명확화

이 다섯 가지가 무너지면, TCA의 장점 대부분이 같이 무너진다.

---

## 같은 입력이면 같은 출력이어야 한다

Reducer의 핵심은 상태 전이 규칙이다.
같은 `state`와 같은 `action`을 넣으면 항상 같은 결과가 나와야 한다.

이게 보장되면 버그가 줄고, 코드가 예측 가능해진다.

문제는 Reducer 내부에서 랜덤 값이나 전역 상태를 직접 읽는 순간 시작된다.

- `Date.now()`
- `UUID()`
- 싱글턴/전역 mutable 상태

이런 값을 Reducer 안에서 바로 읽으면, 같은 액션을 보내도 결과가 달라질 수 있다.
그때부터 “왜 이번엔 되고, 다음엔 안 되지?” 같은 디버깅 지옥이 시작된다.

---

## 테스트가 압도적으로 쉬워진다

순수 함수 테스트는 단순하다.

- given: 초기 상태
- when: 액션
- then: 상태 변화 + 발생한 effect

즉, `TestStore`에서 상태 전이만 검증하면 된다.
검증 대상이 분리되어 있으니 빠르고 안정적이다.

반대로 Reducer가 IO까지 직접 만지기 시작하면 테스트 성격이 바뀐다.

- 테스트가 통합 테스트처럼 무거워지고
- 실행 속도가 느려지고
- 환경에 따라 실패가 생기고
- mock/setup 비용이 커진다

이 순간부터 테스트는 “안전망”이 아니라 “유지비”가 된다.

---

## 리플레이/디버깅이 가능해진다

Reducer가 순수하면 `state + action` 로그 시퀀스를 그대로 재생할 수 있다.
즉, 버그 리포트에서 받은 이벤트를 같은 순서로 replay해서 재현할 수 있다.

이건 실제 운영에서 강력하다.

- 재현이 안 되던 이슈의 재현 확률이 올라가고
- 수정 전/후 동작을 같은 입력으로 비교할 수 있고
- 회귀(regression) 확인도 훨씬 명확해진다

“재현이 안 돼요”가 줄어드는 것만으로 팀 생산성이 꽤 올라간다.

---

## 동시성 복잡도를 Reducer 밖으로 밀어낼 수 있다

Reducer가 IO를 직접 처리하면, 동시성 이슈가 도메인 로직 안으로 들어온다.

- 어떤 스레드에서 실행되는지
- 언제 완료되는지
- 중간 취소가 되는지
- 중복 호출이 생기는지

이걸 Reducer 내부에서 같이 풀기 시작하면 복잡도가 급격히 올라간다.

TCA는 이 문제를 `Effect` 경계로 분리한다.
Reducer는 상태 전이만 담당하고, 비동기/스케줄링은 Effect로 다룬다.

그래서 아래 같은 제어를 선언적으로 붙이기 쉬워진다.

- 취소 키 기반 cancel
- debounce / throttle
- 최신 요청만 유지 (`cancelInFlight`)

결과적으로 동시성 문제를 “비즈니스 규칙”과 분리해서 관리할 수 있다.

---

## 의존성 경계가 명확해진다

순수 Reducer는 도메인 규칙을 담고,
IO는 의존성 계층에서 처리한다.

이 경계가 명확하면 코드 리뷰도 쉬워진다.

- Reducer: 상태 전이 규칙이 맞는가?
- Effect: 어떤 사이드 이펙트가 발생하는가? 취소/중복 제어는 있는가?

예시를 보면 차이가 더 명확하다.

```swift
// swift-dependencies 사용
struct Feature {
  @Dependency(\.date.now) var now

  func printNow() {
    print(now)
  }
}
```

```swift
// 수동 의존성 주입
protocol DateGenerator {
  func now() -> Date
}

struct Feature {
  let generator: any DateGenerator

  func printNow() {
    print(generator.now())
  }
}
```

TCA를 사용하면 내부 의존성 도구(`swift-dependencies`)로 주입이 가볍다.
실무 생산성 관점에서 확실히 편하다.

다만 러닝 커브가 있는 것도 사실이다.

- `swift-dependencies`는 빠르고 간결하지만 학습 비용이 있다
- 수동 DI는 익숙하고 직관적이지만 보일러플레이트가 늘어난다

팀 상황에 따라 선택은 달라질 수 있다.
수동 DI를 유지하면서 [Needle](https://github.com/uber/needle) 같은 도구로 보일러플레이트를 줄이는 방법도 충분히 유효하다.

---

## 정리

Reducer 순수성은 TCA 스타일의 “취향”이 아니라,
아키텍처의 핵심 제약 조건에 가깝다.

순수성을 지키면

- 상태 전이가 예측 가능해지고
- 테스트가 가벼워지고
- 버그 재현/리플레이가 쉬워지고
- 동시성 이슈를 제어 가능한 경계 밖으로 밀어낼 수 있다

결국 좋은 아키텍처는 복잡도를 없애는 게 아니라,
복잡도를 다뤄야 할 자리에만 남기는 방식이라고 생각한다.
TCA에서 Reducer 순수성이 중요한 이유도 정확히 그 지점에 있다.
