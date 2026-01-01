import Foundation
import Ignite

enum SocialLink: String, CaseIterable, SystemImageLink {
  case github
  case linkedin
  
  var systemName: String { rawValue }
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
