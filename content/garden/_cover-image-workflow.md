# Cover Image Workflow (baoyu-cover-image)

## 목표

- 신규 글마다 커버 이미지를 빠르게 생성
- 모든 글에서 톤앤매너를 일관되게 유지

## 입력값 4개(고정)

1. 제목 (`title`)
2. 부제 (`subtitle`)
3. 핵심 키워드 3~5개 (`keywords`)
4. 감정 톤 1개 (`tone`: 차분/실험적/기술적 등)

## 생성 명령 예시

```bash
/baoyu-cover-image content/garden/2026-02-12-example.md \
  --type minimal \
  --palette warm \
  --rendering flat-vector \
  --text none \
  --mood subtle \
  --aspect 16:9 \
  --ref public/images/covers/references/ref-01-garden-warm-consistent.jpg \
  --ref public/images/covers/references/ref-02-garden-warm-consistent.jpg \
  --ref public/images/covers/references/ref-03-garden-warm-consistent.jpg
```

## 기본 프롬프트(최소 스타일 고정)

```text
Create a 1200x675 article cover image (16:9).
No text, no logo, no watermark.
Topic: {title}
Subtitle context: {subtitle}
Keywords: {keyword1}, {keyword2}, {keyword3}, {keyword4}, {keyword5}
Tone: {tone}
Style constraints:
- warm garden palette family rotation: golden-amber, terracotta-rose, sage-warm, olive-sunset, peach-coral, deep-warm-dusk
- flat vector illustration with subtle paper grain only
- one central focal object, at most two secondary abstract shapes
- keep at least 60% negative space
- soft warm light, low-to-medium contrast
- rotate composition family from previous posts (single-tree / double-tree-and-path / hill-and-river / greenhouse-grid / seed-to-sprout / forest-silhouette)
- avoid realistic faces/hands and avoid visual clutter
```

## 권장 호출 방식

```bash
/baoyu-cover-image content/garden/{slug}.md --quick \
  --type minimal \
  --palette warm \
  --rendering flat-vector \
  --text none \
  --mood subtle \
  --aspect 16:9 \
  --ref public/images/covers/references/ref-01-garden-warm-consistent.jpg \
  --ref public/images/covers/references/ref-02-garden-warm-consistent.jpg \
  --ref public/images/covers/references/ref-03-garden-warm-consistent.jpg
```

## 산출물 선정 규칙

1. 후보 4장 생성
2. 1차 탈락: 왜곡/노이즈/과채도/과한 텍스트 느낌
3. 최종 1장 선택 후 아래 경로로 저장

## 파일 저장 규칙

- 경로: `public/images/covers/`
- 파일명: `{slug}-cover.jpg`
- 선택: 필요 시 `{slug}-cover.webp` 병행 생성

## 글 frontmatter 반영

```yaml
coverImage: /images/covers/{slug}-cover.jpg
```
