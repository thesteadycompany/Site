import Foundation
import Ignite

struct DarkTheme: Theme {
  let colorScheme = ColorScheme.dark

  // Accent Colors
  var accent: Color {
    Color(hex: "#FFFFFF")
  }

  var secondaryAccent: Color {
    Color(hex: "#CCCCCC")
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
    Color(hex: "#1A1A1A")
  }

  var offBlack: Color {
    Color(hex: "#FFFFFF")
  }

  // Text Colors
  var primary: Color {
    Color(hex: "#FFFFFF")
  }

  var emphasis: Color {
    Color(hex: "#FFFFFF")
  }

  var secondary: Color {
    Color(red: 255, green: 255, blue: 255, opacity: 0.7)
  }

  var tertiary: Color {
    Color(red: 255, green: 255, blue: 255, opacity: 0.5)
  }

  // Background Colors
  var background: Color {
    Color(hex: "#0A0A0A")
  }

  var secondaryBackground: Color {
    Color(hex: "#1A1A1A")
  }

  var tertiaryBackground: Color {
    Color(hex: "#2A2A2A")
  }

  // Border Color
  var border: Color {
    Color(hex: "#333333")
  }

  // Link Colors
  var link: Color {
    Color(hex: "#FFFFFF")
  }

  var hoveredLink: Color {
    Color(hex: "#CCCCCC")
  }

  var linkDecoration: TextDecoration {
    .underline
  }

  // Syntax Highlighter
  var syntaxHighlighterTheme: HighlighterTheme {
    .xcodeDark
  }
}
