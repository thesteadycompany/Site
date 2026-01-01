import Foundation
import Ignite

struct PageSectionTitleComponent: HTML {
  let title: String
  let description: String
  
  var body: some HTML {
    VStack(alignment: .center, spacing: .medium) {
      Text(title)
        .font(.sectionTitle)
        .foregroundStyle(.primary)
      
      Text(description)
        .font(.small)
        .foregroundStyle(.secondary)
        .padding(.bottom, .xLarge)
    }
    .horizontalAlignment(.center)
  }
}
