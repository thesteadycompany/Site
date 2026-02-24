---
author: hogumachu
title: SwiftUI ZoomNavigationTransition 버그 기록
subtitle: iOS 18에서 드래그 dismiss 시 source가 사라지는 문제와 우회 시도
coverImage: /images/covers/2026-02-24-swiftui-zoom-navigation-transition-bug-cover.jpg
date: 2026-02-24 21:00
tags: SwiftUI, iOS, NavigationTransition, Animation, Bug
published: true
---

## 들어가며

iOS 18에서 `ZoomNavigationTransition`이 추가된 뒤로, 전환 연출을 더 자연스럽게 만들 수 있겠다고 기대했어요.\
특히 카드나 썸네일에서 상세 화면으로 들어갈 때 딱 원하던 모션이라 바로 적용해봤거든요.\
그런데 실제 디바이스에서 드래그 dismiss를 빠르게 수행하면 전환 source가 보이지 않는 문제가 계속 재현됐어요.

---

## 문제 재현: 정석 구현에서도 발생하는 dismiss 버그

먼저 Apple 문서에서 안내하는 형태 그대로 구성했어요.\
관련 문서는 [ZoomNavigationTransition](https://developer.apple.com/documentation/swiftui/zoomnavigationtransition)예요.

아래 코드는 `matchedTransitionSource`와 `.navigationTransition(.zoom(...))`를 정석대로 연결한 예시예요.

```swift
Button {
  isRedPresented = true
} label: {
  Circle()
    .fill(.red)
    .frame(width: 30, height: 30)
}
.matchedTransitionSource(id: TransitionID.red, in: namespace)

.navigationDestination(isPresented: $isRedPresented) {
  DetailView(color: .red)
    .navigationTransition(.zoom(sourceID: TransitionID.red, in: namespace))
}
```

재현 영상:
![bug video 1](/videos/garden/zoom-transition-bug-1.mov)

이 방식에서는 push 시점보다, **드래그로 즉시 dismiss할 때 source가 비는 현상**이 더 잘 보였어요.\
결국 "정석 구현인데도 인터랙티브 dismiss 안정성이 부족하다"는 결론이었어요.

---

## 대안 시도: background에 source를 두는 방식

그래서 source를 버튼 본체가 아니라 background에 붙여서 동작을 분리해봤어요.\
의도는 dismiss 중 source의 생존 타이밍을 조금 더 안정적으로 만들자는 것이었어요.

```swift
Button {
  isBluePresented = true
} label: {
  Circle()
    .fill(.blue)
    .frame(width: 30, height: 30)
}
.background {
  Circle()
    .fill(.blue)
    .matchedTransitionSource(id: TransitionID.blue, in: namespace)
}
```

재현 영상:
![bug video 2](/videos/garden/zoom-transition-bug-2.mov)

이 방식은 첫 번째 버그와는 반대로, zoom in/out 과정에서 **TransitionSource가 자연스럽게 사라지지 않는 잔상 문제**가 보여요.\
즉, source가 아예 사라지는 문제는 줄어도 전환 완성도는 떨어져서 실서비스에 그대로 쓰기엔 아쉬웠어요.

---

## 그래서 지금 가능한 선택지

2026-02-24 기준으로는 조건부로 판단하는 게 가장 현실적이라고 봐요.

- 화면 하단처럼 source 잔상이 사용자에게 거의 보이지 않는 구조라면: SwiftUI 기본 전환 유지
- 인터랙티브 dismiss 완성도가 핵심인 화면이라면: [Hero](https://github.com/HeroTransitions/Hero) 같은 검증된 라이브러리나 UIKit 전환 고려

개인적으로는 "기능 구현 가능"과 "상호작용 완성도"를 분리해서 판단해야 한다고 느꼈어요.\
지금 `ZoomNavigationTransition`은 전자에는 충분하지만, 후자에서는 케이스별 검증 비용이 아직 커요.

---

## 마치며

`ZoomNavigationTransition`은 API 자체는 좋아요.\
다만 드래그 dismiss 경계 케이스에서 체감되는 버그가 여전히 있고, 우회 방식도 완전하진 않았어요.

당분간은 화면 특성에 따라 SwiftUI 유지와 Hero/UIKit를 혼용하는 전략이 안전해 보여요.\
추후 iOS 업데이트에서 동작이 개선되면 이 글도 실제 재검증 결과로 업데이트할게요.
