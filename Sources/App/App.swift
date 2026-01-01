import Foundation
import Ignite

@main
struct App {
  static func main() async {
    var site = AppSite()
    
    do {
      try await site.publish()
    } catch {
      print(error.localizedDescription)
    }
  }
}
