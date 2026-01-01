import Foundation
import Ignite

extension HTML {
  func hoverTransition(to: Double = 1.1) -> some HTML {
    transition(.scale(from: 1, to: to), on: .hover)
  }
}
