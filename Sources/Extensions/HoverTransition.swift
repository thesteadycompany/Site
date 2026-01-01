import Foundation
import Ignite

extension HTML {
  func hoverTransition() -> some HTML {
    transition(.scale(from: 1, to: 1.1), on: .hover)
  }
}
