import Foundation
import Ignite

struct MainLayout: Layout {
  var body: some Document {
    Body {
      NavigationBarComponent()
        .padding(.bottom, 100)
      content
      FooterComponent()
    }
  }
}
