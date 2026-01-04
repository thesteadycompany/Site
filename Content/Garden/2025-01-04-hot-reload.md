---
author: hogumachu
title: 생산성 올리는 방법 (Hot Reload)
subtitle: Inject를 이용하여 생산성 올리기
date: 2025-01-04 09:00
tags: iOS, Hot Reload
published: true
---


## iOS에서 불필요한 리소스를 줄이는 방법

앱 개발을 진행하면서 변경사항이 있을 때 재빌드 하는 것은 꽤 비효율적이다.<br>
Flutter 개발을 할 때는 핫 리로드 기능이 빌트인 되어있어 빠르게 개발이 가능했다.<br>
iOS 개발을 할 때는 모듈을 쪼개고, 데모앱을 만들어 빌드 속도를 낮추는 방법으로 해결해왔다.

---

## Hot Reload를 위해 생산성 올리기
[Inject](https://github.com/krzysztofzablocki/Inject)를 통해 iOS도 핫 리로드가 가능하다.<br>
빌트인이 아니라 초기 설정이 조금 필요하지만 크게 어렵진 않다.

또한 [Playbook](https://github.com/playbook-ui/playbook-ios)이라는 라이브러리도 존재하는데 시나리오를 등록하여 각 UI를 볼 수 있다.

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

Playbook으로 시나리오를 등록하고, Inject로 Hot Reload를 하면 더욱 빠르게 개발이 가능하다.
