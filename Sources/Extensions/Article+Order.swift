import Foundation
import Ignite

extension Sequence where Element == Article {
  @MainActor
  func recent() -> [Element] {
    return self
      .sorted(by: { $0.date > $1.date })
  }
}
