import Foundation
import Ignite

struct GardenPage: StaticPage {
  let title = "Garden"
  
  var body: some BodyElement {
    VStack(spacing: .medium) {
      Text("🪴 The Garden")
        .font(.title4)
      Text("To be updated...")
        .font(.body)
    }
  }
}
