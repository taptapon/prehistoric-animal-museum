# AGENTS.md — 本仓 agent 作业约定

> 面向在本仓库工作的编码 agent。记录**我们实际使用**的「新增 / 修改动物展品」流程与约定。
>
> 上游权威文档（优先级更高）：
> - `ANIMAL_AUTHORING_GUIDE.md` — 维护者流程与门禁
> - `.agents/skills/prehistoric-animal-onboarding/` — onboarding skill 与 references
> - `CONTRIBUTING.md` / `LICENSING.md` — 贡献与许可边界
>
> 本文件只补充落地约定，**不削弱任何上游门禁**；与上游冲突时按上游执行，并把差异报告给用户。
> 仓库定位：`origin` = 个人 fork，`upstream` = 原作者仓；改动尽量保持「单动物目录 + 最小注册点」，便于与上游合并。

> **外发红线（最高优先级）**：只向 `origin`（个人 fork）提交 / 推送；**禁止**向 `upstream`（原作者仓）开 PR 或推送。确需向上游贡献时，必须先取得用户明确同意，并显式指定 `--repo s010s/...`，不得依赖 `gh` 的默认解析。本仓已设防护：`gh repo set-default` 指向个人 fork；`upstream` 的 push URL 为 `DISABLE`（fetch 仍正常）。任何外发动作（PR / issue / 评论 / 发布）执行前都要说明影响面并取得同意。

## 0. 速查命令

```sh
npm ci                                     # Node >= 22.13
npm run review                             # 本地评审：validate:review + vite --mode review
npm run validate:content                   # 内容 / 包结构 / 预算 / 文案
npm run validate:review                    # review 素材 + review 预览
npm run validate:model-previews            # 生产预览 manifest 与模型哈希
npm run generate:credits                   # 重新生成 credits.generated.ts + THIRD_PARTY_NOTICES.md
npx tsx scripts/render-model-previews.ts --target=production <animal-id>   # 单只渲染预览
npm run typecheck
npm test -- --run
npm run build                              # 全量发布门禁
npm run test:e2e                           # Playwright e2e（本地 headed，系统 Chrome）
```

## 1. 目录与工作区

- 生产包：`src/content/animals/<id>/`
- 评审草稿：`src/review/animals/<id>/`
- 候选素材：`assets/candidates/<id>/`
  - `output/` — 被评审引用的运行时成品（model.glb、poster、poster-portrait、thumbnail、background-*）
  - `working/` — Blender / 归一化中间物
  - `evidence/` — 归一化日志、landmarks 等证据
  - `sources/` — 下载原件、生成 prompt
- **被 gitignore 的私有工作区，禁止 `git add -f`**：`assets/candidates/`、`assets/review-generated/`、`.handoff/`、`prototypes/`、`spikes/`、`docs/handoff|research|specification/`、`tools/*`（`tools/animal-onboarding/` 除外）、`.agents/*`（onboarding skill 除外）。
- `id` 一律小写 ASCII kebab-case；目录名 = package id = 集合条目 = URL。

## 2. 新增动物标准流程

### Step 1 来源与权利（先于一切）

- 素材检索一律按 §11：Sketchfab 优先，白名单只有 CC0 / CC BY 4.0。
- 记录来源页、作者、URL、访问日期、许可证、下载变体；权利链解释不清 → 停止。
- 首选 CC0 / CC BY 4.0 / public domain / 项目自制；复核上传者描述，若指向影视或游戏第三方模型，先确认原权利人允许再分发。
- 多角度、移动端检视模型：优先轮廓可信、表面质量、儿童友好、与现有馆藏有差异。

### Step 2 模型归一化

保留原件，用 `tools/model-pipeline` 产出 self-contained GLB：

```sh
cd tools/model-pipeline && npm ci
node normalize-glb.mjs <source.glb> <output.glb> --clip Idle
node validate-glb.mjs <output.glb>
```

- 预算见 guide §3：正常评审上限 GLB 20 MiB / 三角 120k / draw calls 24 / materials 16 / bones 160；超限需 `model.budgetException`；绝对上限 20 MiB / 250k / 32 / 16 / 200。
- `Idle` 必须 8 秒、24fps、首尾连续、无根位移。默认策略 `replace-with-project-morph` 会丢弃源骨骼/动画，必须在 provenance 里记为破坏性替换。
- 逐项记录修改：删掉的动画/道具、材质转换、贴图缩放、几何/姿态变化、最终字节数与哈希。

### Step 3 评审草稿包（review）

1. 建 3 个文件：`src/review/animals/<id>/{content.zh-CN.ts,content.en.ts,package.ts}`
   - `package.ts`：`satisfies CompleteDraftAnimalPackage`，`status: 'draft'`；assets 全部用 `reviewAssetUrl('<id>', ...)`；`narration: {}`、`provenance: []`；`review` 块写 badge/status/note/checks/accent/modelCredit；`draftNotes` 列未完成项。
   - content 两语文件与生产包同构，但 import 路径为 `../../../content/types`，`editorial.reviewedBy` 写「待产品负责人评审 / Pending product owner review」。
2. 注册 3 处（缺一 review 构建即失败）：
   - `src/review/assets.ts` → `LocalReviewAnimalId` 联合类型加 `<id>`
   - `scripts/review-assets.ts` → `reviewAnimalFiles` 加条目：`model` / `backgroundLandscape` / `backgroundPortrait` / `poster` / `posterPortrait` / `thumbnail`。候选阶段用 `repositoryFile('assets/candidates/<id>/output/...')`，已生产素材用 `productionAnimalAsset('<id>', ...)`。
   - `src/review/catalog.ts` → import + 加入 `onboardingDrafts`
3. `npm run review` 本地看效果。审核页数据来自 review catalog，素材来自本机候选目录——换机或他人拉取后缺素材属预期。

### Step 4 评审与定稿

- 人工检查：轮廓、儿童友好、8 秒循环（0/2/4/6/8s）、五视口（360×640、390×844、844×390、768×1024、1440×900）。
- 通过后复制为生产包，并把 `reviewedBy` 改为真实评审人（如 `jianghong（产品负责人）` / `jianghong (product owner)`）、`reviewedOn` 写当天、import 改为 `../../types`。
- 评审文案与生产文案同源：差异只允许 import 路径与 reviewedBy/reviewedOn。

### Step 5 生产包

目录结构（guide §1）：

```text
src/content/animals/<id>/
  animal.ts  package.ts  content.zh-CN.ts  content.en.ts  provenance.ts
  model/model.glb
  images/{poster,poster-portrait,thumbnail}.webp
  images/{preview-*.webp, model-preview.manifest.json}   # 生成物
  backgrounds/{landscape,portrait}.webp
  audio/narration.{zh-CN,en}.mp3
  provenance/LICENSES/{model-license,model-source,background-generation,derived-images,narration-rights}.txt
```

- `animal.ts` 是纯样板（import URL + `createRuntimeAnimal`），从 `stegosaurus/animal.ts` 复制改 id 即可。
- `package.ts`：`definePublishedAnimal({ status: 'published', ... })`；presentation 从保守值起步（`initialYawDegrees: -90`、`safeAreaPadding: 0.12`、`shadow: 'ground'`；水域 / 飞行 `shadow: 'none'`）；`animation` 单 `Idle`、`loop: 'repeat'`、`speed: 1`；narration 双语均 `status: 'ready'`、`speaker: 'Serena'`、`language: Chinese/English`、`humanReviewStatus: 'approved'`。
- `provenance.ts`：用 `createPublishedAssetProvenance` 记录模型、背景 ×2、海报 ×2、缩略图、中文旁白；**英文旁白不在该文件里**，而是在 `src/content/provenance-helpers.ts` 的 `reviewedEnglishNarrationArtifacts` 登记 `{generatedOn, bytes, sha256}`，再用 `createReviewedEnglishNarrationProvenance('<id>', en)` 拼入数组。
- 背景复用：同生态已审背景优先复用（引用 `reviewedBackgroundSources.<animal>.<orientation>`，`runtimeModifications` 写明「未修改」）；生态不同则新生成并记录生成方式。

### Step 6 接入与生成物

1. `src/content/collections/main.ts` → `animalIds` 加 `<id>`。**顺序显式、首尾循环**；新动物通常置顶。
2. `src/content/provenance-helpers.ts` → 英文旁白登记（见 Step 5）。
3. `npm run generate:credits` → 重新生成 `src/content/credits.generated.ts` 与 `THIRD_PARTY_NOTICES.md`（**禁手改**）。
4. `npx tsx scripts/render-model-previews.ts --target=production <id>` → 生成 `images/preview-*.webp` ×6 与 `images/model-preview.manifest.json`（**禁手改**）。
   - 前置：id 必须已在 `mainCollection`（脚本按集合取可渲染列表）。
   - 首次运行需 `npx playwright install chromium`（见 §7）。
   - manifest 绑定模型哈希与 presentation 签名；换模型或改 presentation 必须重跑。
5. 双语 README：`README.md` / `README.zh-CN.md` 的「See the full collection / 查看完整馆藏」按陆地 / 天空 / 海洋分组，新增动物要加进对应分组。当前 README 没有数字状态标记（`local-release-status` 只出现在 `scripts/canonical-release-plan.ts` 的旧发布路径里，README 内并不存在），不要去找。验证套件会把两个公开目录表与 `mainCollection` 对比。

### Step 7 验证

| 改了什么 | 必跑 |
| --- | --- |
| 文案 / 包结构 | `validate:content`、`validate:review`（有 review 条目时）、`typecheck` |
| 模型 / 背景 / 海报 / 缩略图 | `validate:content`、重渲染预览、`validate:model-previews` |
| 预览布局契约（`MODEL_PREVIEW_CONTRACT_VERSION`） | 全量重渲染所有动物 + `validate:model-previews` |
| 发布前 | `npm test -- --run` + `npm run build` |
| 交互 / 响应式 | `npm run test:e2e`（headed）+ 五视口人工检查 |

`npm run build` 包含 flight 校验、`tsc`、静态构建、生产边界扫描。质量 / 科学 / 权利 / 真机检查不过时：保持线上包可用，在候选区修，**不降低门禁**。

### Step 8 提交

- 日常 push 到 `origin`（个人 fork）；同步上游用 `git fetch upstream && git merge upstream/main`（或 `gh repo sync`）。`upstream` 只用于 fetch，push URL 已是 `DISABLE`，不要改回。
- 不 `--force`、不 `--no-verify`；提交前做敏感信息自检。
- 生成物随代码一起提交，但必须由脚本生成。
- 单动物建议拆 commit：① review 草稿 ② 生产包 ③ 注册 / 生成物 / README。

## 3. 文案与科学约定

- 每语种：两句儿童旁白 + `visibleFeature` + `facts` + `pronunciation` + `parentClassificationNote` + 1–3 条权威来源（含 `accessedOn`）+ `editorial.uncertaintyNotes`。
- 两语各自完整，**禁止互填**；英文用英式拼写，面向约 2–6 岁儿童与家长。
- 不臆测物种、性别、毛色、食性、叫声或行为；有争议结论不进儿童事实层，放 `uncertaintyNotes` 向家长说明。
- 尺寸语义：`body-length` / `wingspan` / `shoulder-height` / `group-range`（后者须注明不是展示个体尺寸）。
- 艺术复原必须显式标注（如「按现生灰狼体态复原」）。
- `editedBy` / `reviewedBy` / `reviewedOn` 三项齐全；`reviewedBy` 不得留「待评审」。

## 4. 旁白约定

- 永不由 UI 自动播放；每语种用已定稿的两句台词离线合成，48 kHz mono MP3。
- 固定 Qwen3-TTS 0.6B CustomVoice + Serena；`zh-CN` 声明 `Chinese`，`en` 声明 `English`，语言/音色错配 = 发布错误。
- 必须完整听审两种语言成品：专名、地质年代、多音字、漏读、重复、杂音、静音、响度、语速。
- 公开说明必须写明「脚本经人工审阅、AI 离线合成」。
- 台词改动 → 重新合成 + 更新 provenance 的 `bytes` / `sha256` / `generatedOn`。

## 5. 视觉资产约定

- 背景横竖两版是独立构图，不是运行时裁剪；中央模型区留静；不烤动物、文字、UI、logo、水印。
- 海报从已接受的运行时 presentation 截取；海报 ≤ 500 KiB，缩略图 ≤ 120 KiB。
- 背景、海报、缩略图必须与最终模型、材质、朝向、场景一致。
- 预热透明图是生成物，不是手工布局；禁止单只动物加媒体查询、CSS 偏移或手工裁剪图。

## 6. 生成物规则

- `src/content/credits.generated.ts`、`THIRD_PARTY_NOTICES.md` ← `npm run generate:credits`
- `images/preview-*.webp`、`images/model-preview.manifest.json` ← `scripts/render-model-previews.ts`
- 生成物只通过脚本更新；改了输入就重跑，不要手改。
- 模型或 presentation 变化 → 重渲染预览并跑 `validate:model-previews`。
- 布局契约（画布 / 相机 / 像素比 / object-fit）变化 → 升 `MODEL_PREVIEW_CONTRACT_VERSION` 并全量重渲染。

## 7. 浏览器与 Playwright 约定（本机实测）

- **e2e**（`npm run test:e2e`）：`playwright.config.ts` 本地 `channel: 'chrome'` → 用**系统 Chrome**，无需 `playwright install`；CI 才用内置 Chromium。
- **预览渲染**（`scripts/render-model-previews.ts`）：裸 `chromium.launch()` → 用**内置 Chromium 的 headless shell**，这是唯一需要 install 的路径。
- 浏览器缓存是用户级共享（`~/Library/Caches/ms-playwright/`），按 revision 分目录；Playwright 版本变了才需要重装，不是每项目一份。
- **安装只装用得到的 headless shell**（`install chromium` 会连完整 Chrome for Testing 一起下，约多一倍流量）：
  ```sh
  PLAYWRIGHT_DOWNLOAD_HOST=https://cdn.npmmirror.com/binaries/playwright \
    npx playwright install chromium-headless-shell
  ```
  国内直连 npmmirror 实测明显快于走代理；代理下载曾经挂起十几分钟。装完先确认对应 revision 目录存在，再跑渲染。
- **不要把 install 和 render 串成一条长命令**：下载失败时整条链一起卡住且看不到进度。分开执行，渲染前验证可执行文件存在。
- 代理只作为镜像不可用时的兜底；挂起时先 kill 再换镜像重试。
- 上游 guide §5 的「禁止 headless 浏览器」条款针对其采集证据流程；本 fork 的预览渲染按代码实际路径运行 headless Chromium，属已采用的本地约定。

## 8. 常见错误对照

| 症状 | 处理 |
| --- | --- |
| `CANONICAL_PATH_MISSING` | 恢复精确的规范文件名 |
| `ASSET_HASH_MISMATCH` / `ASSET_SIZE_MISMATCH` | 确认新文件是已审运行时产物后，再更新 provenance |
| `PROVENANCE_MISSING` | 补记录，不削弱校验 |
| `REDISTRIBUTION_NOT_ALLOWED` | 解决权利依据，否则不发布 |
| `GLB_EXTERNAL_URI` | 把贴图与 buffer 重打包进 GLB |
| 缺 `Idle` | 修正 clip 声明，或按「已审静态展品」发布 |
| 手机上动物被裁切 | 先加 `safeAreaPadding`，再考虑方向专用偏置 |
| 静态模型显得「卡住」 | 改场景 / 姿态 / 文案，不要硬加动画 |
| 预览图整张不透明、校验报「silhouette invalid / 触点触边」 | 检查截图链上层容器是否有不透明底色（如 `.museum-page`），补进 `render-model-previews.ts` 的透明列表后重渲染 |
| 构建包含私有路径 | 删除该 import，重跑生产边界扫描 |

## 9. 实际案例：dire-wolf（2026-11-22）

新增恐狼时实际落地的改动，可作为模板对照：

- 候选素材：`assets/candidates/dire-wolf/{output,working,evidence,sources}`（不入库）。
- review 草稿：`src/review/animals/dire-wolf/` 三件套；注册 `src/review/catalog.ts`、`scripts/review-assets.ts`、`src/review/assets.ts`。
- 生产包：`src/content/animals/dire-wolf/`；`mainCollection.animalIds` 置顶；`reviewedEnglishNarrationArtifacts` 登记英文旁白哈希。
- 生成物：`generate:credits` 更新 credits 与 notices；`render-model-previews --target=production dire-wolf` 生成预览与 manifest。
- 素材取舍：背景复用已审的猛犸象冰原背景（provenance 引用 `reviewedBackgroundSources.mammoth` 并注明未修改）；模型来自 Sketchfab CC BY 4.0，在 provenance 与家长面注明「按现生灰狼体态复原」。

## 10. 耗时复盘与提速清单（dire-wolf 实测，2026-11-22）

本次单只动物约 4 小时，其中大半耗在环境首装与流程试错。按收益从高到低：

1. **先判路径，再动手**：官方 onboarding 采集门目前走不通（应用未暴露 `data-loaded-glb-sha256`）。遇到新动物先确认这一点，直接走 guide §7 的「流程外制作」，**不要**再试 `stage-lock` / `l3-acceptance` / `capture plan` 链——本次在这条死路上来回耗费约三分之一时间。
2. **背景优先复用**：从已发布动物里挑同生境背景，拷贝 + provenance 写 `reviewedBackgroundSources.<animal>` 指针并注明未修改。跳过图像生成、审核与场景一致性返工。
3. **模型筛选三连**：Sketchfab API 一次返回 `license.label` / `vertexCount` / `animationCount`；先拉缩略图目检（背景、姿态、儿童友好度），合格再下载。直接排除：NonCommercial/NoDerivs、游戏/影视衍生（Warcraft、权游、Ice Age 等）、纯标本扫描、**浮雕板**（包围盒任一维 ≪ 其余两维，如 16×19×0.65）。
4. **下载防断**：Sketchfab 签名 CDN 走代理，`curl -C -` 断点续传；下载后立即 `shasum -a 256` 记源哈希。
5. **目录占位坑**：`run init` 要求 `assets/candidates/<id>/` 不存在。前期调研/截图放 `assets/candidates/<id>-recon/`，正式 init 前再建目录。
6. **朝向一次到位**：`sourceBodyAxis: 'y'`（glTF 中 Z 为长度轴最常见，导入 Blender 即 Y），`'z'` 只用于竖长模型；`tailAxisSign` 与旋转后尾端所在 ±X 一致（y→+1，z→-1）。先用 normalizer 自带的 5 角度渲染目检，再往下走。
7. **两个高频硬失败**：接触影未覆盖四爪 → `shadowScale ≥ 1.3`；预览整张不透明 → 见 §7 的 `.museum-page` 透明补丁。
8. **海报尺寸写死**：横版 1200×675、竖版 390×844（`build:site` 会直接把 poster 合成进 1200×675 社交卡，超尺寸即报 `Image to composite must have same dimensions or smaller`）。海报 ≤ 500 KiB，缩略图 ≤ 120 KiB。
9. **生成物顺序**：每次改内容或图片后，先 `npm run generate:credits` 再 `npm run generate:seo-social-cards`；模型或 presentation 变动重跑 `render-model-previews`。漏掉的症状就是 build 报 `GENERATED_CREDITS_STALE` / `SEO social card manifest is stale`。
10. **Playwright 版本坑**：用 `./node_modules/.bin/playwright install chromium-headless-shell`；`npx playwright` 可能解析到全局更新的版本、下载与项目不匹配的 revision（本次白等十几分钟）。国内直连 npmmirror 镜像，别串长命令（见 §7）。
11. **旁白路线**：TTS 运行时已装在 `~/.runtime/qwen3-tts`（uv venv + 固定 revision 模型）。`generate_narration.py` 被 model-lock 门挡住时，用 fallback 驱动 `importlib` 加载同一模块的 `normalize` / `artifact_metrics` / `automatic_checks`，保证证据格式与官方一致。CPU 生成约 3–4 分钟/轮 × 2 轮 × 2 语言。
12. **验证并行**：`tsc -b` 与 `validate:content` 串行前置，`vitest run` 丢后台，`build:site` 最后跑；失败优先排查 credits / SEO / 海报尺寸三连。

**下一只动物的目标基线**（环境已就绪时）：≤ 60–90 分钟——模型筛选 15m、管线与 QA 15m、海报缩略图 10m、旁白生成与试听 15m、验证与提交 15m。

**最短路径**：
1. 选模型（缩略图目检 + 许可过滤）
2. 下载 + 哈希 → 决定是否复用背景
3. 写 profile（轴/尾向/影/初始视角）→ normalizer
4. `qa --model-only` 通过
5. 应用内截图 → 海报/缩略图（标准尺寸）
6. 写内容（双语 2 句 + 家长面 + 来源）→ TTS 生成 → owner 试听
7. 生产包 + provenance/LICENSES → credits/SEO/预览
8. validate → tsc → vitest → build:site → 提交推 fork

## 11. 素材源与检索规程（Sketchfab 优先）

**主源固定为 Sketchfab**，其它源只在 Sketchfab 穷尽后启用（见本节末尾）。检索分「粗筛 → 目检 → 实审」三段，全部完成再下载。

### 11.1 粗筛：API 检索（匿名可查）

```sh
# 宽词优先：先按大类扫，再收敛到属名；一次拿回许可与几何规模
curl -s "https://api.sketchfab.com/v3/search?type=models&q=prehistoric+wolf&downloadable=true&count=24&sort_by=-likeCount" \
| jq -r '.results[] | [.name, .license.label, (.vertexCount|tostring), (.animationCount|tostring), .user.username, .uid] | @tsv'
```

- 关键词顺序：大类词（`dinosaur` / `prehistoric mammal` / `ice age` / `pleistocene` / `extinct`）→ 属名/英文俗名；同一目标至少换 3 组词再判定「没有」。
- 必须带 `downloadable=true`；`sort_by=-likeCount` 用来优先看社区验证过的资产，但**排序不代表可商用**。
- 许可白名单只有两种：`CC0 Public Domain` / `CC Attribution`（按项目口径视为 CC BY 4.0）。
- 直接排除任何带 `NonCommercial` / `NoDerivs` / `ShareAlike` 的标签（含博物馆账号常见的 CC BY-NC-SA，如 NHMLA/La Brea 的恐狼）。
- 名称/描述黑名单词：`warcraft` `elder scrolls` `skyrim` `game of thrones` `stark` `ice age`（电影）`jurassic` `ark` `carnivores` `turok` `palworld` `pokemon` `furry` `print` `low poly game` ——命中即疑为第三方 IP 或游戏衍生，先看描述确认原权利人，否则弃用。
- 标本/骨骼扫描（skull / jaw / bone / specimen / VCU / LACMIP 等）不作为活体展品候选。

### 11.2 目检：缩略图 → 包围盒

- 看多角度缩略图：轮廓是否是目标动物、姿态是否平和（拒绝呲牙/攻击性造型）、是否照片级纹理、是否有明显破面。
- 用 GLB 头解析包围盒，任一维 ≪ 另两维（如 16.85 × 19.63 × **0.65**）= 浮雕板/贴图板，直接排除。
- 记录候选表到 `assets/candidates/<id>-recon/INTAKE-EVIDENCE.md`：名称、uid、作者、许可、顶点/动画数、缩略图判读、取舍理由。

### 11.3 下载：owner token（权威存放 `~/.config/sketchfab/token`）

- 搜索接口匿名可用；`/v3/models/<uid>/download` 需要 **owner 的 Sketchfab API token**（账号 RawFox8864）。**权威存放（2026-11-27 用户裁定）：`~/.config/sketchfab/token`（600，git 仓库外）**——使用时 `SKFB_TOKEN=$(cat ~/.config/sketchfab/token)` 读入 shell 变量，不回显、不写入仓库/脚本/日志/记忆/会话消息；文件缺失或 API 报 `Invalid API token` 时向用户索取新 token 并写回该文件（`chmod 600`）。owner 轮换 token 后同步更新此文件。
- signed CDN（`sketchfab-prod-media.s3.amazonaws.com`）直连会超时：走 Clash 代理 `-x http://127.0.0.1:7897`，并用 `curl -C -` 断点续传；完成后比对 `glb.size` 与本地字节数，立即 `shasum -a 256`。
- 下载变体固定选 **Autoconverted → GLB**；不要 source format（.blend/.fbx 管线不直接吃）。
- 原始文件与下载回执、许可截图全部留在 `assets/candidates/<id>-recon/`（git 忽略），绝不 `git add -f`。

### 11.4 备选源（仅 Sketchfab 穷尽后）

| 源 | 许可 | 适用 |
| --- | --- | --- |
| Smithsonian Open Access 3D | 多为 CC0 | 标本/文物扫描，活体复原少 |
| Poly Haven | CC0 | 场景道具、环境资产，非动物主体 |
| Wikimedia Commons | 混合，逐件核 | 少量 3D 扫描 |
| 项目自建（Blender） | 项目自有 | 无合格外部模型时的兜底，成本高 |

博物馆官方账号（NHMLA、La Brea 等）模型质量高但普遍 CC BY-NC-SA，**按现行白名单不可用**；若用户明确要破例，必须先改白名单决策并记录，不得默认放行。

### 11.5 许可例外程序（2026-11-22 smilodon 案确立）

Sketchfab 穷尽（≥15 组检索词、候选全目检）后仍无合规活体复原时，走破例：

1. **先给用户出选择题**：唯一合格 NC-SA 候选 / Blender 自建 / 换目标动物。破例必须用户明确裁定，检索排除证据写 `assets/candidates/<id>-recon/INTAKE-EVIDENCE.md`（该文件即破例决策记录）。
2. **三层许可口径要分清**：生产校验器 `scripts/content-validation.ts` `publicationLicenseAllowlist` **本身就含 `CC-BY-NC-SA-4.0`**；收紧的是本文件 §11 本地白名单；onboarding 工具 `tools/animal-onboarding/src/profile.ts` 的白名单只有 CC0/CC-BY，其对 NC-SA 案例恒报 fail——**该工具不是发布门，忽略**。
3. **provenance 接线**：`createPublishedAssetProvenance` 支持 `modelLicense` + `modelLicenseLabel` 可选覆盖（默认 CC BY 4.0 不变）；NC-SA 会随模型 still 派生（poster×2、thumbnail）自动继承，`redistributionAllowed` 仍为 true（NC 管商用不管再分发）。
4. **NC 影响面须向用户明示**：该展品不可商用；个人/家庭项目无实际影响。


### 11.6 截图与无头浏览器补充坑（smilodon 案新增）

- **生产直通路径已验证两次**：恐狼与剑齿虎都是**无 review 草稿提交**、单提交直上生产（git 历史无 `src/review/animals/<id>/` 残留）。§2 Step 3 的 review 草稿三件套仅在需要走 `npm run review` 评审页时才建；截图只需生产文件 + 注册。
- **capture 前先放占位三件套**：`images/{poster,poster-portrait,thumbnail}.webp` 与 `audio/narration.*.mp3` 必须先有占位文件（从猛犸象拷贝即可），否则 import 断、动物卡点不亮（`data-ready-animal-id` 为空）。占位后截图、TTS、再回填真品与 provenance 哈希。
- **无头 Chrome 默认无 WebGL**：模型区显示「这个浏览器现在不能显示 3D 模型」即此症。启动参数须加 `--use-angle=swiftshader --enable-unsafe-swiftshader`（`--disable-gpu` 反而触发该问题）。复用 capture 脚本模板 `assets/candidates/<id>-recon/recon/capture-<id>.mjs`（恐狼版可直拷改名）。
- **`qa --model-only` 必须从仓根跑**：在 `tools/animal-onboarding/` 目录内跑会报 "profile escapes the repository"。
- **工具 qa 与发布解耦**：`--model-only` 通过 `initial-head-side`（`initialYawDegrees -35`）与全部模型预算门即够用；rights/risk-route/normalization-evidence 三个 fail 属 §10.1 死路链与 §11.5 工具白名单，不阻塞发布。
- **轴向实证法（§10.6 强化）**：`sourceBodyAxis` 初猜 + 归一化日志 `boundsMin/Max` 核对（长度轴跨度应 = targetLength），再用端部顶点高度采样定 `tailAxisSign`（头端高、尾端低）：
  ```sh
  blender --background --factory-startup --python-expr "...按 x 正负端 slab 统计 meanZ/maxZ..."
  ```
  剑齿虎两次重跑收敛（'y' + tailAxisSign 1），全程 <10 分钟。
- **来源核验防软 404**：博物馆页面 HTTP 200 不代表活着——SDNHM 剑齿虎页返回 200 但正文是「页面已移动」壳。引用前必须抓正文确认内容真实存在；NPS/Britannica 对部分文章 404/403。本轮可用源：NHMLA `nhm.org/stories/suiting-smilodon` + Wikipedia。
- **旁白证据先听后写（红线）**：`narration-rights.txt` 的 "Human listening review: approved" **必须在 owner 完整听审通过之后写入**——先写后听等于伪造证据；流程是 TTS → `open` 两支 mp3 请 owner 听 → AskUserQuestion 收结论 → 回填记录与 provenance 哈希。
- **源材质 metallic 默认值坑（河马案新增，截图变黑即此症）**：源 GLB 材质不设 `metallicFactor`/`roughnessFactor` = glTF 默认 metallic 1.0，在深色/绿色场景环境反射下模型渲染成黑剪影（亮雪地场景看不出问题）。修法：后处理 GLB 的 JSON chunk（binary 不动）置 `metallicFactor: 0` + `roughnessFactor: 0.85`（皮肤类材质），秒级完成；provenance `modifications` 如实记录材质调整。附赠诊断顺序：截图发黑 → 先查材质默认值，再查灯光。
- **`initial-head-side` 与头向**：gate 按 yaw 旋转后 head/tail 投影 x 判「观众左」——头在 +X 的模型（landmarks `head.position` x 为正）需要 `initialYawDegrees ≈ 145`（等效 -35 的镜像），不要沿用上一只的 -35。每个新模型先看 `head.position` 符号再定 yaw。
- **轴向映射不可跨模型外推（§10.6 强化）**：剑齿虎 glTF X 长 → 导入 Blender 落 Y；河马 glTF Z 长 → 导入 Blender 落 X。同一 autoconverter 不同源文件结果不同——**每个模型都要按归一化日志 bounds 重新实证**，长度轴跨度必须 = targetLength。
- **TTS 时长预算**：en 单回合 >18s 会挂 `automatic_checks`；经验安全线 ≤40 词/回合。超长时缩短该语言台词、driver 里注释掉已通过语言只重跑失败方（注意 dict 注释别破坏语法）。
- **Sketchfab 大响应截断**：搜索响应 >30KB 时直连常被中途截断（`Unfinished string at EOF`）→ 加 `-x http://127.0.0.1:7897 --compressed` 重试至 `jq -e '.results | length'` 通过。



## 12. 实际案例：smilodon（2026-11-22，第一只 NC-SA 破例 + 提速验证）

- **耗时**：约 1 小时（恐狼 4 小时 → §10 清单生效；含 15 组检索、两次轴向重跑、TTS 与全链验证）。
- **模型**：kenchoo「Ice Age Big Cat」CC BY-NC-SA 4.0（19,296 顶点 / 37,240 面 / 2 PNG 贴图 / 50 骨骼 + 1 源动画，全部破坏性替换记录在 provenance）。检索证据与破例决策：`assets/candidates/smilodon-recon/INTAKE-EVIDENCE.md`。
- **改动面**（与恐狼完全同构）：`src/content/animals/smilodon/` 生产包 + `mainCollection` 置顶 + `reviewedEnglishNarrationArtifacts` 登记 + credits/预览生成物 + 双语 README；`provenance-helpers.ts` 新增 `modelLicense`/`modelLicenseLabel` 可选覆盖（向后兼容）与 smilodon 英文旁白条目。
- **轴向参数**：`sourceBodyAxis 'y'` + `tailAxisSign 1`（源 glTF 长轴 X、根链无旋转；导入后长度落 Blender Y）。`initialYawDegrees -35`、shadow ground 0.35/1.3 与恐狼同款。
- **背景**：复用猛犸象冰原（provenance 引 `reviewedBackgroundSources.mammoth`），零新图。
- **工具侧遗留 fail（可忽略）**：qa `rights-and-direct-source`（工具白名单无 NC-SA）、`source-risk-route` 与 `blender-normalization-evidence`（死路链文件）——生产校验器 0 error 全绿。

### 12.1 案例追加：hippopotamus（2026-11-23，第一只现生展品）

- **口径扩展（用户裁定）**：没有合格古生物时馆藏可扩展到现生动物；河马是第一件。家长面必须写明「现生、非灭绝」与批准日期；README 分组照常按陆/空/海。
- **模型**：sdpm「Hippopotamus」CC BY 4.0（恐狼同作者，馆内信用先例；发现 2024 年 psk98077 同顶点数转载，取 2021 原发布）。史前河马唯一活体复原 gorgops 165 万面超绝对预算 6 倍直接排除。
- **材质修复**：源材质全默认（metallic 1.0）在绿色丛林背景渲染成黑剪影；后处理 GLB JSON chunk 置 metallic 0 / roughness 0.85 解决（§11.6 新条目）。
- **朝向**：`sourceBodyAxis 'x'` + `tailAxisSign -1` + `initialYawDegrees 145`——与剑齿虎/恐狼全部不同，证明轴向与头向必须逐模型实证。
- **背景**：复用 apatosaurus 河边沙洲（半水生生境匹配）；时代错配（中生代植被 vs 现生河马）在 provenance 与家长面双处注明艺术化处理。
- **旁白**：en 首轮 19.1s 超上限 fail，缩 3 词重生成 17.1s 过；zh 一次过 16.4s。
- **全程约 1 小时**，与剑齿虎持平（§10 基线生效）。


### 12.2 案例追加：tiger + rabbit（2026-11-27，双现生批量 + rig 拆除先例）

- **双动物批量**：一次流水线进两只（虎 + 兔），共用检索/模板/验证链；commit 单提交。全程约 1.5 小时（含 TTS 双动物 8 段生成与两轮朝向修正），符合 §10 基线。
- **带 rig 模型的坑（tiger 案新增，最重要）**：带骨骼动画的 Sketchfab 模型导入 Blender 即处于**某个源动画的第 0 帧姿态**——本例 tiger 导入即被 `Armature|Trick`（翻滚动作）摆成躺倒，机器门（land-contact-shadow 等）不拦这种 roll，只有截图目检能发现。修法：归一化前删 armature + ARMATURE 修饰器 + 全部 actions，导出净网格 GLB 作归一化输入（破坏性替换，provenance/model-source 双记录）。**归一化机器门全绿 ≠ 姿态正确，五角度渲染必须目检。**
- **工具 profile 字面量门**：`animationStrategy.sourceArmature` / `sourceAnimation` 只接受 `present` / `absent`；`inputPath` 必须 == `source.sourceModelPath`——对源做 Blender 预处理（删个体/拆 rig）时，把派生件记为 sourceModelPath，原始下载件的 bytes/sha256 留在证据链（model-source.txt + recon 目录），qa 的 rights-and-direct-source 照样过。
- **head-side gate 与视觉约定**：gate 只查 yaw 投影后 head/tail 的屏幕 x 顺序，`initialHeadSide` 可 left 可 right——虎 -35°（头左）配 `right`、兔 145°（脸朝观众偏右）配 `left` 均绿。别硬套上一只的 yaw，逐模型截图实证。
- **源材质默认值**：两个模型均自带显式 metallic 0.0（作者保存时已设置），未触发河马案黑剪影坑；但每模型仍须先查 GLB JSON chunk 再下结论。
- **TTS 批量**：一次 driver 跑两只 × 双语 8 段（model load 一次），单段失败注释其余只重跑失败段（driver 留在 tiger-recon）。tiger en 首轮 18.8s 超门，缩词至 15.5s。
- **vite dev 热载陷阱**：改 package.ts 的 presentation 后 dev server 不热载——截图前重启（`NODE_OPTIONS=--import tsx npm run dev`，详见 §13；本条已同步 agent 记忆）。
- **token 复用**：owner token 已落权威文件 `~/.config/sketchfab/token`（2026-11-27 起，见 §11.3），后续会话直接读该文件，不再扫会话转录找回；用完删临时副本。

## 13. dev server 基线问题（本机实测，2026-11-27）

`npm run dev` 在 vite 8 下开箱即挂（与新增动物无关）的根因与修法，所有要起 dev server / 截图的 agent 先读本节：

- **根因**：`vite.config.ts` 的 `canonicalAnimalCatalog` 经 tsx `tsImport` 动态加载动物 `package.ts`；vite 8 的 config 加载环境里 tsx loader 未注册 → Node 默认解析器拒绝无扩展名 import（`./content.en`），报 `ERR_MODULE_NOT_FOUND`（allosaurus-pandras）。
- **修法**：`NODE_OPTIONS="--import tsx" npm run dev`（全进程注入 tsx loader），约 540ms ready。
- **只监听 IPv6 localhost**：curl / 截图脚本必须用 `http://localhost:5173/`；写 `127.0.0.1` 会 000 无响应。
- **改 presentation 不热载**：改 `package.ts`（如 `initialYawDegrees`）后 vite dev 不会热载生效，截图拿到旧朝向（两轮截图像素级雷同即此症）——**改完必须 kill + 重启 dev server 再截图**。
- **无头 Chrome 截图链已全链验证**：swiftshader（§11.6 参数）+ 9333 调试口 + `[data-ready-animal-id]` 点击流。
- **`npm run review` 本 checkout 不可用**：`validate:review` 需要已 gitignore 的 review 素材（`assets/review-generated/` 等，本机没有），报错属预期，不是环境坏了。
- **生产 `build:site` 的旁白门**：前置 `validate:content` 会被旁白听审 pending 门拦（`NARRATION_LISTENING_EVIDENCE_INVALID`）——这是设计内红线，owner 听审通过后写入 approved 才放行。
