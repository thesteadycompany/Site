import Foundation
import Ignite

extension Link {
  init<T: AnyLink>(_ link: T, @InlineElementBuilder content: () -> some InlineElement) {
    self.init(target: link.target, content: content)
  }
  
  init<T: SystemImageLink>(_ link: T) {
    self.init(link.image, target: link.target)
  }
}
