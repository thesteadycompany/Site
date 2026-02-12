---
author: hogumachu
title: 블로그를 이사하는 이유
subtitle: 블로그를 이전하는 이유에 대한 설명
date: 2025-01-07 10:00
tags: Blog, Swift, Web
published: true
---

# 블로그를 이사하는 이유

![](/images/blog/why-im-relocating-my-blog/1.png)

이전에는 [티스토리](https://hogumachu.tistory.com/)에서 블로그를 운영했습니다.
열심히 이미지 리소스도 만들고 포스팅을 하였지만 결국에는 이사를 하게 되었습니다.

### 🚗 블로그를 GitHub Pages로 이사하는 이유

---

![](/images/contents/background/perplex-background.jpg)

티스토리, 네이버, velog 등 블로그를 시작하기 적합한 곳이 많습니다.
여러 플러그인도 많아서 버튼 하나만 누르면 추가되고 조회수도 다 나오고 좋은 기능을 편리하게 제공해줍니다.

그럼에도 GitHub Pages을 선택한 이유는 **커스텀이 자유**롭습니다.
물론 다른 서비스도 테마나 HTML/CSS을 건드리면 커스텀이 가능한 것으로 알고 있습니다.
그러나 그렇게 편하지는 않더라구요. 일단 HTML/CSS에 대한 지식이 거의 없기 때문에...🦧

따라서 저는 제가 주로 사용하는 언어인 **Swift로 블로그를 만들기** 시작했습니다.

### Swift로 정적 페이지 만들기 - Publish vs. Ignite

---

#### Publish

원래 티스토리로 블로그를 하기 전에 [Publish](https://github.com/JohnSundell/Publish)로 블로그를 운영했습니다.
Publish는 UI를 **Swift를 통해 HTML/CSS로 컨버팅** 해주는 방식입니다.

```swift
extension Theme where Site == DeliciousRecipes {
    static var delicious: Self {
        Theme(htmlFactory: DeliciousHTMLFactory())
    }

    private struct DeliciousHTMLFactory: HTMLFactory {
        ...
        func makeItemHTML(
            for item: Item<DeliciousRecipes>,
            context: PublishingContext<DeliciousRecipes>
        ) throws -> HTML {
            HTML(
                .head(for: item, on: context.site),
                .body(
                    .ul(
                        .class("ingredients"),
                        .forEach(item.metadata.ingredients) {
                            .li(.text($0))
                        }
                    ),
                    .p(
                        "This will take around ",
                        "\(Int(item.metadata.preparationTime / 60)) ",
                        "minutes to prepare"
                    ),
                    .contentBody(item.body)
                )
            )
        }
        ...
    }
}
```

Swift를 사용하면 편하게 블로그를 할 수 있겠다 생각했는데 HTML/CSS를 Swift로 표현하다보니 결국에는 똑같이 어려웠습니다.
원하는 UI를 그리기 위해서는 HTML/CSS를 배워야 했습니다.

#### Ignite

현재는 Publish에서 [Ignite](https://github.com/twostraws/Ignite)로 변경하였습니다.

```swift
import Foundation
import Ignite

struct CustomContentLayout: ContentLayout {
    var body: some HTML {
        Text(content.title)
            .font(.title1)

        if let image = content.image {
            Image(image, description: content.imageDescription)
                .resizable()
                .cornerRadius(20)
                .frame(maxHeight: 300)
        }

        if content.hasTags {
            GroupBox {
                Text("Tagged with: \(content.tags.joined(separator: ", "))")

                Text("\(content.estimatedWordCount) words; \(content.estimatedReadingMinutes) minutes to read.")
            }
        }

        Text(content.body)
    }
}
```

Ignite의 UI 그리는 방식은 **매우 친숙한 SwiftUI 방식**입니다.
SwiftUI에 대한 경험이 있다면 아주 편리하게 UI를 그릴 수 있습니다.

또한 Ignite는 활발하게 개발되고 있습니다.
오늘 기준 Publish는 머지된 PR이 2023년이 마지막이고 Ignite는 어제입니다.

#### 그래서 결론은
- 커스텀이 자유로운 블로그를 만들고 싶었다.
- Swift로 블로그를 만들고 싶었다.
- HTML/CSS가 익숙하지 않은 상태에서 만들고 싶었다.

위와 같은 이유로 현재 Ignite로 블로그를 만들고 있습니다.
