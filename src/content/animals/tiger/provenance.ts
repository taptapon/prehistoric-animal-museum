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
      title: 'Stylized Bengal Tiger with 4 animations',
      author: 'jungle_jim (Sketchfab user jungle_jim)',
      url: 'https://sketchfab.com/3d-models/stylized-bengal-tiger-with-4-animations-d87e750f18aa416dbccdd5ca7b81f751',
      accessedOn: '2026-11-27',
      bytes: 3_754_964,
      sha256:
        '931d8cafc078416989224ce9300e6579487b80b3aae137d8ee7256e136555807',
    },
    runtime: {
      bytes: 4_150_496,
      sha256:
        '669bb09ed6a2f059537272108d4b401ce46b1666febad7fae2055374e1b6fb10',
    },
    modifications: [
      'Used the CC BY 4.0 source directly; the licence permits modification and redistribution with attribution recorded here and in the public credits.',
      'Stripped the shipped 48-node rig, its four self-described crude animations and the armature modifiers destructively in Blender before normalization: the imported rest frame was posed by the "Armature|Trick" animation (a roll-over pose), and the museum presents the mesh in its bind pose instead; the project-authored motion replaces all source animation (recorded destructive replacement).',
      'Reoriented the source body length axis into the canonical X body axis and rescaled it to the museum target length, grounded for a land exhibit.',
      'The exhibit presents the living tiger under the owner-approved 2026-11-23 collection expansion; the parent-facing note records this framing and the stylised cartoon finish.',
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
        'Reused the already-reviewed project-authored baryonyx riverside-jungle background without modification; its fern forest and water pools match the tiger\'s forest life, and the parent-facing note records the scene as an artistic setting.',
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
    bytes: 207_160,
    sha256:
      '2879cbfa8010517d7ad7305a9a1a46d05d076d9b23d6d5604af60e6768b444b7',
  },
  posterPortrait: {
    bytes: 88_034,
    sha256:
      '1d027d3702fa2b59a1c1f3522cdbc0f993427b49ce70f92180e455a61e8b6f1f',
  },
  thumbnail: {
    bytes: 97_854,
    sha256:
      '5dc2f26d11a5727fc8b3fff533a22421d359d006e71c7f7b2cd84e0f5254489f',
  },
  narration: {
    generatedOn: '2026-11-27',
    script: zhCN.narration.sentences.join(''),
    bytes: 179_804,
    sha256:
      'a7b6ed071aba888b0d13a202de393d098efad2cc5f26e2f532aae936bad5e005',
  },
})

export const provenance = [
  ...baseProvenance,
  createReviewedEnglishNarrationProvenance('tiger', en),
] as const
