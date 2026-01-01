import Foundation
import Ignite

struct NavigationBarComponent: HTML {
  @Environment(\.articles) var art
  var body: some HTML {
    NavigationBar {
      Link("Garden", target: GardenPage())
      
      Link(target: "https://hogumachu.github.io") {
        Span("Personal Blog")
      }
    } logo: {
      Span("THE STEADY COMPANY")
        .font(.logo)
    }
    .navigationItemAlignment(.trailing)
    .position(.fixedTop)
    .background(.ultraThinMaterial)
  }
}
