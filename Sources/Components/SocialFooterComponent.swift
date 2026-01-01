import Foundation
import Ignite

struct SocialFooterComponent: HTML {
  var body: some HTML {
    VStack {
      HStack {
        ForEach(SocialLink.allCases) {
          Link($0)
            .role(.secondary)
            .target(.blank)
            .relationship(.noReferrer)
        }
      }
    }
    .margin(.top, .xLarge)
    .font(.title3)
  }
}
