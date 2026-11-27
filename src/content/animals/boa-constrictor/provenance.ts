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
      title: 'Boa Constrictor Hispaniola',
      author: 'franciscomedina77 (Sketchfab user)',
      url: 'https://sketchfab.com/3d-models/boa-constrictor-hispaniola-2090cbe07a0d405680ebaaedfb913095',
      accessedOn: '2026-11-27',
      bytes: 17_209_056,
      sha256:
        'a05f98ad91368e9e35c1173dbe945902652a01f93bd156c4d26728cff99b46ba',
    },
    runtime: {
      bytes: 10_266_316,
      sha256:
        'd806230fd555399c8d7360f75ce10e56cbdc7e142436f44e8e80a6f2b1f5c756',
    },
    modifications: [
      'Used the CC BY 4.0 source directly; the licence permits modification and redistribution with attribution recorded here and in the public credits.',
      'Decimated the 499,846-face autoconverted photogrammetry mesh to 99,995 faces in Blender (uniform collapse) before normalization, keeping the reviewed 1024x1024 colour texture; recorded destructive geometry simplification.',
      'The Sketchfab autoconverted GLB shipped no rig or animation; the project-authored deterministic breathing Idle adds the only motion (recorded as a project-authored replacement).',
      'Reoriented the source body length axis into the canonical X body axis and rescaled it to the museum target length, grounded for a land exhibit.',
      'The exhibit presents the living boa constrictor under the owner-approved 2026-11-23 collection expansion; the parent-facing note records this framing.',
    ],
  },
  derivedImagesGeneratedOn: '2026-11-27',
  thumbnailDerivation: {
    ...recomposedCollectionThumbnailDerivation,
    generatedOn: '2026-11-27',
  },
  backgrounds: {
    landscape: {
      source: reviewedBackgroundSources.baryonyx.landscape,
      runtime: {
        bytes: 854_516,
        sha256:
          '1b5ebdeff9a75fae21d0fe3c43102b0d5a73849add10b95b997567c0a49aa2a4',
      },
      runtimeModifications: [
        'Reused the already-reviewed project-authored baryonyx riverside wet-woodland background without modification; its river mud, ferns and water pools match the boa\'s tropical woodland life, and the parent-facing note records the scene as an artistic setting.',
      ],
    },
    portrait: {
      source: reviewedBackgroundSources.baryonyx.portrait,
      runtime: {
        bytes: 728_982,
        sha256:
          'e9d80b3bfe9aefc2ea93c2d3e2f909079e2ba1b25f1efee7cc1cf31f63a0ca85',
      },
      runtimeModifications: [
        'Reused the already-reviewed project-authored baryonyx portrait background without modification.',
      ],
    },
  },
  poster: {
    bytes: 212_246,
    sha256:
      '334685dd314239607e90a5049b3ea5818bcefea09a8a928c672bb22eaab14685',
  },
  posterPortrait: {
    bytes: 87_664,
    sha256:
      '235b05b5ae5a9cf77a31507533b5e54c39f395086777f070bfe102125e47e44e',
  },
  thumbnail: {
    bytes: 99_616,
    sha256:
      '4e2fd53cb0f5b4a056945e0ac9ccd47ed2b177d090c756b0147a8492bc57e245',
  },
  narration: {
    generatedOn: '2026-11-27',
    script: zhCN.narration.sentences.join(''),
    bytes: 156_524,
    sha256:
      '90476b4397230512f88f949dd21912bc78ab59d97ee35e0db9b1b1a3648ccbfc',
  },
})

export const provenance = [
  ...baseProvenance,
  createReviewedEnglishNarrationProvenance('boa-constrictor', en),
] as const
