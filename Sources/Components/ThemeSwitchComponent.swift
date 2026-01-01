import Foundation
import Ignite

struct ThemeSwitchComponent: HTML {
  @Environment(\.themes) var themes
  
  var body: some HTML {
    if let light = themes.light, let dark = themes.dark {
      HStack(spacing: .xSmall) {
        ButtonGroup(accessibilityLabel: "Theme Switch Buttons") {
          Button {
            SwitchTheme(light)
          } label: {
            Image(systemName: "sun-fill", description: "Light Mode Icon")
              .foregroundStyle(.white.opacity(0.7))
          }
          Button {
            SwitchTheme(dark)
          } label: {
            Image(systemName: "moon-fill", description: "Dark Mode Icon")
              .foregroundStyle(.black.opacity(0.7))
          }
        }
      }
      .hoverTransition()
    }
  }
}

private extension Sequence where Element == Theme {
  var light: Element? {
    first(where: { $0.colorScheme == .light })
  }
  var dark: Element? {
    first(where: { $0.colorScheme == .dark })
  }
}
