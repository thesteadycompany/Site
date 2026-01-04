import Foundation
import Ignite

@MainActor
struct GardenPreviewStyle: @preconcurrency ArticlePreviewStyle {
  func body(content: Article) -> any HTML {
    LinkGroup(target: content.path) {
      VStack(alignment: .leading, spacing: .zero) {
        Text(content.title)
          .horizontalAlignment(.leading)
          .font(.title5)
          .foregroundStyle(.primary)
        
        Text(content.subtitle ?? "")
          .horizontalAlignment(.leading)
          .font(.body)
          .foregroundStyle(.secondary)
          .padding(.top, .small)
        
        Text(content.dateString)
          .horizontalAlignment(.leading)
          .font(.xSmall)
          .foregroundStyle(.tertiary)
          .padding(.top, .xSmall)
        
        if let tags = content.tags, !tags.isEmpty {
          HStack(spacing: .xSmall) {
            ForEach(tags) {
              Badge($0)
                .badgeStyle(.subtleBordered)
                .role(.light)
                .fontWeight(.regular)
            }
          }
          .padding(.top, .small)
        }
      }
      .padding(.medium)
      .background(.gray.opacity(0.03))
      .hoverTransition(to: 1.01)
      .cornerRadius(16)
    }
  }
}
