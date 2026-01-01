import Foundation
import Ignite

struct HomePage: StaticPage {
  let title = "Home"
  
  var body: some HTML {
    VStack(spacing: .xLarge) {
      Spacer()
      
      Text("THE<br>STEADY<br>COMPANY")
        .font(.custom("Space Grotesk", size: .em(2), weight: .bold))
        .horizontalAlignment(.center)
      
      VStack(spacing: .medium) {
        content("🪴 Garden", target: GardenPage().path)
        content("📰 Personal Blog", target: Links.personalBlog.target)
      }
      
      SocialFooterComponent()
      
      Spacer()
    }
  }
  
  @HTMLBuilder
  private func content(_ title: String, target: String) -> some HTML {
    LinkGroup(target: target) {
      HStack(spacing: .medium) {
        Text(title)
          .foregroundStyle(.primary)
        
        Image(systemName: "arrow-right-circle-fill", description: "arrow")
          .resizable()
      }
      .font(.title4)
    }
    .hoverTransition()
  }
}
