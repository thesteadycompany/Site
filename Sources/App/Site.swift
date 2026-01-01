import Foundation
import Ignite

struct AppSite: Site {
  let name = "Docs"
  let titleSuffix = " – The Steady Company"
  let url = URL(static: "https://thesteadycompany.github.io")
  let builtInIconsEnabled = true
  let author = "Hogumachu"
  let homePage = Home()
  let layout = MainLayout()
  let darkTheme: (any Theme)? = DarkTheme()
  let lightTheme: (any Theme)? = LightTheme()
}
