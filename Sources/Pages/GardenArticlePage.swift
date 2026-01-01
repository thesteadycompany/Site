import Foundation
import Ignite

struct GardenArticlePage: ArticlePage {
  var body: some HTML {
    Text(article.title)
      .horizontalAlignment(.center)
      .font(.title1)
      .foregroundStyle(.primary)
      .padding(.top, .xLarge)
    
    Text(article.description)
      .horizontalAlignment(.center)
      .font(.body)
      .foregroundStyle(.secondary)
      .padding(.bottom, .xLarge)
    
    Group {
      Text(article.text)
    }
    .margin(.medium)
    .padding(.medium)
  }
}
