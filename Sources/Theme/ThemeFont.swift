import Foundation
import Ignite

extension Font {
  static let pretendard = Font(
    name: "Pretendard",
    sources: [
      .init(weight: .ultraLight, url: URL(static: "/fonts/Pretendard-ExtraLight.woff2")),
      .init(weight: .thin, url: URL(static: "/fonts/Pretendard-Thin.woff2")),
      .init(weight: .light, url: URL(static: "/fonts/Pretendard-Light.woff2")),
      .init(weight: .regular, url: URL(static: "/fonts/Pretendard-Regular.woff2")),
      .init(weight: .medium, url: URL(static: "/fonts/Pretendard-Medium.woff2")),
      .init(weight: .semibold, url: URL(static: "/fonts/Pretendard-SemiBold.woff2")),
      .init(weight: .bold, url: URL(static: "/fonts/Pretendard-Bold.woff2")),
      .init(weight: .heavy, url: URL(static: "/fonts/Pretendard-ExtraBold.woff2")),
      .init(weight: .black, url: URL(static: "/fonts/Pretendard-Black.woff2")),
    ]
  )
}
