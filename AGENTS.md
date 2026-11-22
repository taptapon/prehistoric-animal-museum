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
