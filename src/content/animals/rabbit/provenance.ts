import {
  createPublishedAssetProvenance,
  createReviewedEnglishNarrationProvenance,
  recomposedCollectionThumbnailDerivation,
  reviewedBackgroundSources,
} from '../../provenance-helpers'
import { en } from './content.en'
import { zhCN } from './content.zh-CN'

const baseProvenance = createPublishedAssetProvenance({
  animalName: zhCN.name,
  model: {
    source: {
      title: 'Cute Bunny',
      author: 'minimoku (Sketchfab user minimoku)',
      url: 'https://sketchfab.com/3d-models/cute-bunny-7d30845d69c4474ebeddd177df6b7f02',
      accessedOn: '2026-11-27',
      bytes: 1_165_640,
      sha256:
        'b1c6fd8a3d08949a7eed2266a06c5ec54bd952e4ca83a3a37412aaf0f8f67276',
    },
    runtime: {
      bytes: 810_704,
      sha256:
        'd5325004642ad5670acd023ace1f9d6fb68f3ada727b186b6d518549c6388566',
    },
    modifications: [
      'Used the CC BY 4.0 source directly; the licence permits modification and redistribution with attribution recorded here and in the public credits.',
      'The source scene holds two cartoon rabbit individuals; the white individual was removed destructively in Blender (2026-11-27) so the exhibit presents a single animal, and the removal is recorded here and in the normalization evidence.',
      'Reoriented the source body length axis into the canonical X body axis and rescaled it to the museum target length, grounded for a land exhibit.',
      'Authored a deterministic project Idle (land-breathe-tail morph): eight-second closed loop with gentle breathing and ear sway, no root translation.',
      'The exhibit presents the living European rabbit (ancestor of all domestic rabbits) under the owner-approved 2026-11-23 collection expansion; the stylised cartoon finish is recorded in the parent-facing notes.',
    ],
  },
  derivedImagesGeneratedOn: '2026-11-27',
  thumbnailDerivation: {
    ...recomposedCollectionThumbnailDerivation,
    generatedOn: '2026-11-27',
  },
  backgrounds: {
    landscape: {
      source: reviewedBackgroundSources.maiasaura.landscape,
      runtime: {
        bytes: 336_442,
        sha256:
          '57da28e0040da8a8dcc53779a1fa1d43f68a76930ef75cdb6ea57a07b013b4d3',
      },
      runtimeModifications: [
        'Reused the already-reviewed project-authored maiasaura woodland-clearing background without modification; its golden grass clearing matches the rabbit\'s meadow-edge life, and the parent-facing note records the scene as an artistic setting.',
      ],
    },
    portrait: {
      source: reviewedBackgroundSources.maiasaura.portrait,
      runtime: {
        bytes: 265_958,
        sha256:
          'd615b288525fc0d144b5a3a0bb17a17439fa81f68323861e9378fd206105fd58',
      },
      runtimeModifications: [
        'Reused the already-reviewed project-authored maiasaura portrait background without modification.',
      ],
    },
  },
  poster: {
    bytes: 139_342,
    sha256:
      'b58e165f9ffbe240c6c0a1fab96472b09942bc89a5d6e1d6166fee52c767971b',
  },
  posterPortrait: {
    bytes: 49_918,
    sha256:
      'e19e8c0c9118ae9e717300130f113203d13779ba9953dbd74af99a68cc8322ac',
  },
  thumbnail: {
    bytes: 59_562,
    sha256:
      '486221adab0e1cd97a06239a3e6eedb81bfaf1d6f9537139dfd65a2aae722590',
  },
  narration: {
    generatedOn: '2026-11-27',
    script: zhCN.narration.sentences.join(''),
    bytes: 139_484,
    sha256:
      '92ee70048c52de2c5bb3d3ebe01b30c0917be6da6f68ce62dfea7a541a2ca4fc',
  },
})

export const provenance = [
  ...baseProvenance,
  createReviewedEnglishNarrationProvenance('rabbit', en),
] as const
