import Ignite
import Foundation

extension Font {
  static let logo = Font.brand(size: .em(1), weight: .bold)
  static let sectionTitle = Font.brand(size: .em(1.5), weight: .bold)
  
  private static func brand(
    style: Font.Style = .body,
    size: LengthUnit,
    weight: Font.Weight = .regular
  ) -> Font {
    .custom("Space Grotesk", style: style, size: size, weight: weight)
  }
}
