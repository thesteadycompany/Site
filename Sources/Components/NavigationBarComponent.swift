import Foundation
import Ignite

struct NavigationBarComponent: HTML {
  @Environment(\.articles) var art
  var body: some HTML {
    NavigationBar {
      Dropdown("Contents") {
        
      }
      
      Link(target: "https://hogumachu.github.io") {
        Span("Personal Blog")
      }
    } logo: {
      EmptyInlineElement()
    }
    .navigationBarStyle(.dark)
    .navigationItemAlignment(.trailing)
    .position(.fixedTop)
    .background(Color(hex: "#0A0A0A"))
  }
}
