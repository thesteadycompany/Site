import {
  ProjectBulletList,
  ProjectExternalLinks,
  ProjectHero,
  ProjectHighlightGrid,
  ProjectMediaFrame,
  ProjectSection,
  ProjectStoryStep,
} from "@/components/projects/ProjectPrimitives";

const highlights = [
  {
    title: "문제",
    description: "TestFlight, App Distribution, 직접 설치 등 기존 테스트 흐름은 준비 과정이 길고 비개발 직군 참여가 어렵습니다.",
  },
  {
    title: "해결",
    description: "앱 파일 공유만으로 설치/실행을 단순화하고, Xcode 및 Simulator 설치 과정을 앱 내부에서 자동화했습니다.",
  },
  {
    title: "현재 범위",
    description: "iOS는 설치/실행 중심, Android는 앱 실행과 로그 확인까지 우선 지원하며 기능 범위를 확장 중입니다.",
  },
];

const keyFeatures = [
  "앱 파일 드래그앤드롭 설치 및 실행",
  "Xcode/Simulator 설치 유도 및 초기 설정 간소화",
  "Android 앱 실행 및 로그 확인 플로우 제공",
  "빌드를 다시 하지 않아도 전달된 산출물로 즉시 테스트 가능",
];

const externalLinks = [
  { href: "https://github.com/thesteadycompany/TheDriver", label: "GitHub Repository" },
  { href: "https://tech.kakaopay.com/post/multiverse/", label: "Multiverse Article" },
];

const storySteps = [
  {
    step: "01",
    title: "여러 디바이스를 한 곳에서 컨트롤",
    description: "iOS/Android 테스트 디바이스를 목적에 맞게 빠르게 전환하며 관리할 수 있어 테스트 준비 시간을 줄입니다.",
    imageSrc: "/images/projects/thedriver/thedriver-screen-1.png",
    imageAlt: "TheDriver device control view",
  },
  {
    step: "02",
    title: "실행 중인 앱 로그를 즉시 확인",
    description: "앱 실행 상태와 로그를 함께 보면서 문제를 빠르게 파악할 수 있어, 비개발 직군과의 확인 흐름도 단순해집니다.",
    imageSrc: "/images/projects/thedriver/thedriver-screen-2.png",
    imageAlt: "TheDriver running app logs view",
  },
  {
    step: "03",
    title: "드래그앤드롭으로 설치 및 실행",
    description: "공유받은 앱 파일을 바로 올려 설치하고 실행해 TestFlight나 별도 배포 경로 없이도 테스트를 시작할 수 있습니다.",
    imageSrc: "/images/projects/thedriver/thedriver-screen-3.png",
    imageAlt: "TheDriver drag and drop install flow",
  },
  {
    step: "04",
    title: "원하는 디바이스를 쉽게 설정",
    description: "검증 목적에 맞는 디바이스 조합을 직접 선택해 환경을 구성하고 반복 테스트 시나리오를 빠르게 재현할 수 있습니다.",
    imageSrc: "/images/projects/thedriver/thedriver-screen-4.png",
    imageAlt: "TheDriver device configuration flow",
  },
];

export function TheDriverProjectPage() {
  return (
    <div className="space-y-10">
      <ProjectHero
        eyebrow="Project Overview"
        title="앱 설치와 테스트 진입장벽을 낮추는 실행 도구"
        description="TheDriver는 빌드 산출물을 드래그앤드롭해 시뮬레이터에 바로 설치하고 실행할 수 있도록 설계한 macOS 앱입니다. 개발자가 전달한 앱 파일만 있으면 비개발 직군도 테스트폰 없이 빠르게 검증할 수 있습니다."
      />

      <ProjectHighlightGrid items={highlights} />

      <ProjectSection title="핵심 기능">
        <ProjectBulletList items={keyFeatures} />
      </ProjectSection>

      <ProjectSection title="데모 영상">
        <ProjectMediaFrame>
          <video
            controls
            playsInline
            preload="metadata"
            poster="/images/projects/thedriver/thedriver-screen-1.png"
            className="h-auto w-full"
          >
            <source src="/videos/projects/thedriver/thedriver-demo.mp4" type="video/mp4" />
            브라우저가 video 태그를 지원하지 않습니다.
          </video>
        </ProjectMediaFrame>
      </ProjectSection>

      <ProjectSection title="사용 흐름">
        <div className="space-y-8">
          {storySteps.map((step) => (
            <ProjectStoryStep
              key={step.step}
              step={step.step}
              title={step.title}
              description={step.description}
              imageSrc={step.imageSrc}
              imageAlt={step.imageAlt}
            />
          ))}
        </div>
      </ProjectSection>

      <section className="rounded-2xl bg-secondary-background/35 p-6">
        <h3 className="text-2xl font-bold text-primary sm:text-3xl">영감과 구현 맥락</h3>
        <p className="mt-3 text-sm leading-7 text-secondary sm:text-base">
          카카오페이의 멀티버스 사례에서 영감을 받아, 내부 테스트 진입장벽을 낮추는 방향으로 AI를 활용해 빠르게 프로토타이핑하고
          제품 구조를 정리했습니다.
        </p>
        <ProjectExternalLinks links={externalLinks} />
      </section>
    </div>
  );
}
