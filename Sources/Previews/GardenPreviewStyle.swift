import Foundation
import Ignite

@MainActor
struct GardenPreviewStyle: @preconcurrency ArticlePreviewStyle {
  func body(content: Article) -> any HTML {
    LinkGroup(target: content.path) {
      VStack(alignment: .leading, spacing: .small) {
        Text(content.title)
          .horizontalAlignment(.leading)
          .font(.title5)
          .foregroundStyle(.primary)
        
        Text(content.description)
          .horizontalAlignment(.leading)
          .font(.body)
          .foregroundStyle(.secondary)
      }
      .padding(.medium)
      .background(.gray.opacity(0.03))
      .hoverTransition(to: 1.01)
      .cornerRadius(16)
    }
  }
}
