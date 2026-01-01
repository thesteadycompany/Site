import Foundation
import Ignite

struct GardenPage: StaticPage {
  @Environment(\.articles) var articles
  let title = "Garden"
  
  var body: some BodyElement {
    PageSectionTitleComponent(
      title: "🪴 Garden",
      description: "정재하지 않은, 짧은 글을 씁니다."
    )
    .padding(.top, .xLarge)
    
    Grid {
      ForEach(articles.all.recent()) { article in
        ArticlePreview(for: article)
          .articlePreviewStyle(GardenPreviewStyle())
          .frame(maxWidth: .percent(100%))
      }
    }
    .columns(2)
  }
}
