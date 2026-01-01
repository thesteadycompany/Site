import Foundation
import Ignite

@MainActor
protocol AnyLink {
  var target: String { get }
  var description: String { get }
}

protocol SystemImageLink: AnyLink {
  var systemName: String { get }
}

extension SystemImageLink {
  var image: Image { Image(systemName: systemName, description: description) }
}
