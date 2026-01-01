import Foundation
import Ignite

struct MainLayout: Layout {
  var body: some Document {
    Body {
      NavigationBarComponent()
        .padding(.bottom, .xLarge)
      
      content
      
      SocialFooterComponent()
    }
  }
}
