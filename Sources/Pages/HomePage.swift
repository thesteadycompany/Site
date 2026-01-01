import Foundation
import Ignite

struct HomePage: StaticPage {
  let title = "Home"
  
  var body: some HTML {
    VStack(spacing: .xLarge) {
      Spacer(size: 100)
      
      Text("THE<br>STEADY<br>COMPANY")
        .font(.custom("Space Grotesk", size: .em(2), weight: .bold))
        .horizontalAlignment(.center)
      
      Spacer(size: 100)
      
      Grid {
        content("🪴", target: GardenPage().path)
        content("📰", target: Links.personalBlog.target)
      }
      
      Spacer()
    }
  }
  
  @HTMLBuilder
  private func content(_ title: String, target: String) -> some HTML {
    LinkGroup(target: target) {
      VStack(spacing: .medium) {
        Text(title)
          .foregroundStyle(.primary)
          .font(.title1)
        
        Image(systemName: "arrow-right-circle-fill", description: "arrow")
          .resizable()
          .font(.title4)
      }
      .padding(.vertical, .large)
      .padding(.horizontal, .xLarge)
      .background(.gray.opacity(0.05))
      .cornerRadius(16)
    }
    .hoverTransition()
  }
}
