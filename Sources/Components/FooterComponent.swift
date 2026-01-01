import Foundation
import Ignite

struct FooterComponent: HTML {
  var body: some HTML {
    VStack {
      HStack {
        ForEach(SocialLink.allCases) { link in
          Link(link.image, target: link.target)
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

@MainActor
private enum SocialLink: String, CaseIterable {
  case github
  case linkedin
  
  var image: Image { Image(systemName: rawValue, description: description) }
  var description: String {
    switch self {
    case .github: "Github Link"
    case .linkedin: "LinkedIn Link"
    }
  }
  var target: String {
    switch self {
    case .github: "https://github.com/thesteadycompany"
    case .linkedin: "https://www.linkedin.com/in/hogumachu/"
    }
  }
}
