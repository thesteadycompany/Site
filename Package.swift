// swift-tools-version: 6.0

import PackageDescription

let package = Package(
  name: "Docs",
  platforms: [.macOS(.v13)],
  dependencies: [
    .package(url: "https://github.com/thesteadycompany/Ignite", branch: "main")
  ],
  targets: [
    .executableTarget(
      name: "Docs",
      dependencies: ["Ignite"]),
  ]
)
