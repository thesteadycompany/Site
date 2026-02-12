---
author: hogumachu
title: 생산성 올리는 방법 (Hot Reload)
subtitle: Inject를 이용하여 생산성 올리기
coverImage: /images/covers/2025-01-04-hot-reload-cover.jpg
date: 2025-01-04 09:00
tags: iOS, Hot Reload
published: true
---

## 들어가며

앱을 개발하다 보면, 작은 변경이 있을 때마다 재빌드하는 게 꽤 비효율적이에요.\
Flutter를 개발할 때는 핫 리로드가 빌트인으로 들어있어서 정말 빠르게 개발할 수 있었거든요.\
반면 iOS 개발에서는 모듈을 쪼개고 데모앱을 따로 만들어 빌드 속도를 줄이는 방식으로 해결해왔어요.

그러다 "iOS에서도 핫 리로드를 쓸 수 있으면 얼마나 좋을까?" 하는 생각이 들었고,\
찾아보니 꽤 괜찮은 도구들이 있었어요.

---

## Hot Reload: Inject 도입

[Inject](https://github.com/krzysztofzablocki/Inject)를 사용하면 iOS에서도 핫 리로드가 가능해요.\
빌트인은 아니라 초기 설정이 조금 필요하지만, 크게 어렵진 않았어요.

---

## UI 시나리오 관리: Playbook

또 하나 유용했던 건 [Playbook](https://github.com/playbook-ui/playbook-ios)이라는 라이브러리예요.\
시나리오를 등록하면 각 UI를 한눈에 볼 수 있어요.

```swift
/// Playbook 예시 코드
/// 출처: https://github.com/playbook-ui/playbook-ios
Playbook.default.addScenarios(of: "Home") {
    Scenario("CategoryHome", layout: .fill) {
        CategoryHome().environmentObject(UserData.stub)
    }

    Scenario("LandmarkList", layout: .fill) {
        NavigationView {
            LandmarkList().environmentObject(UserData.stub)
        }
    }

    Scenario("UIView red", layout: .fixed(length: 100)) {
        let view = UIView()
        view.backgroundColor = .red
        return view
    }
}
```

---

## 마치며

Playbook으로 시나리오를 등록하고, Inject로 핫 리로드를 걸면\
작은 UI 수정에 재빌드할 필요 없이 바로 결과를 확인할 수 있어요.\
Flutter에서 느꼈던 빠른 개발 경험을 iOS에서도 어느 정도 가져올 수 있었고,\
체감 생산성이 확실히 달라졌어요.
