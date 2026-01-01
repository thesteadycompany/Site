import Foundation
import Ignite

struct SocialFooterComponent: HTML {
  var body: some HTML {
    VStack(spacing: .medium) {
      HStack {
        ForEach(SocialLink.allCases) {
          Link($0)
            .role(.secondary)
            .target(.blank)
            .relationship(.noReferrer)
        }
      }
      
      ThemeSwitchComponent()
    }
    .margin(.top, .xLarge)
    .font(.title3)
  }
}
