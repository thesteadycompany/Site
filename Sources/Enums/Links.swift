import Foundation

@MainActor
enum Links: CaseIterable, AnyLink {
  case personalBlog
  
  var description: String {
    switch self {
    case .personalBlog: "Personal Blog Link"
    }
  }
  var target: String {
    switch self {
    case .personalBlog: "https://hogumachu.github.io"
    }
  }
}
