import Foundation
import Ignite

struct LightTheme: Theme {
  let colorScheme = ColorScheme.light

  // Accent Colors
  var accent: Color {
    Color(hex: "#0A0A0A")
  }

  var secondaryAccent: Color {
    Color(hex: "#6B6B6B")
  }

  var success: Color {
    Color(hex: "#00D97E")
  }

  var info: Color {
    Color(hex: "#5AC8FA")
  }

  var warning: Color {
    Color(hex: "#FFB800")
  }

  var danger: Color {
    Color(hex: "#E53E3E")
  }

  // Base Colors
  var offWhite: Color {
    Color(hex: "#F7F7F7")
  }

  var offBlack: Color {
    Color(hex: "#0A0A0A")
  }

  // Text Colors
  var primary: Color {
    Color(hex: "#0A0A0A")
  }

  var emphasis: Color {
    Color(hex: "#0A0A0A")
  }

  var secondary: Color {
    Color(red: 10, green: 10, blue: 10, opacity: 0.7)
  }

  var tertiary: Color {
    Color(red: 10, green: 10, blue: 10, opacity: 0.5)
  }

  // Background Colors
  var background: Color {
    Color(hex: "#FFFFFF")
  }

  var secondaryBackground: Color {
    Color(hex: "#F7F7F7")
  }

  var tertiaryBackground: Color {
    Color(hex: "#F0F0F0")
  }

  // Border Color
  var border: Color {
    Color(hex: "#E0E0E0")
  }

  // Link Colors
  var link: Color {
    Color(hex: "#0A0A0A")
  }

  var hoveredLink: Color {
    Color(hex: "#6B6B6B")
  }

  var linkDecoration: TextDecoration {
    .underline
  }

  // Syntax Highlighter
  var syntaxHighlighterTheme: HighlighterTheme {
    .xcodeLight
  }
}
