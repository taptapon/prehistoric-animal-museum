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
      title: 'Hippopotamus',
      author: 'SDPM (Sketchfab user sdpm)',
      url: 'https://sketchfab.com/3d-models/hippopotamus-9090d29e8c5c49ea963c91faec699482',
      accessedOn: '2026-11-23',
      bytes: 2_036_000,
      sha256:
        '5e70786ce8e3d3a22e4a8010f9ca3c7609dd15a945d26d1b8385aa89b6dde849',
    },
    runtime: {
      bytes: 2_679_600,
      sha256:
        '931bfedba10ac9a9fc335f1d798389208c91921b530d63f5546e1f52fcb6604e',
    },
    modifications: [
      'Used the CC BY 4.0 source directly; the licence permits modification and redistribution with attribution recorded here and in the public credits.',
      'Reoriented the source from its imported length axis into the canonical X body axis and rescaled it to the museum target length, keeping the model grounded for a land exhibit.',
      'Adjusted the single PBR material from its unset defaults (which resolved to full metallic and made the coat read as a black silhouette under the green scene lighting) to metallic 0.0 and roughness 0.85, matching matte hippopotamus skin; the base-colour texture itself is untouched.',
      'Authored a deterministic project Idle (land-breathe-tail morph): eight-second closed loop with gentle breathing and tail sway, no root translation, no walking.',
      'The exhibit presents the living common hippopotamus as the museum\'s first living-species exhibit under the owner-approved 2026-11-23 collection expansion; the parent-facing note records this framing.',
    ],
  },
  derivedImagesGeneratedOn: '2026-11-23',
  thumbnailDerivation: {
    ...recomposedCollectionThumbnailDerivation,
    generatedOn: '2026-11-23',
  },
  backgrounds: {
    landscape: {
      source: reviewedBackgroundSources.apatosaurus.landscape,
      runtime: {
        bytes: 261_024,
        sha256:
          '7221069b1c33fc389a03d93c5c508ec6696ae269951ebc74ccd9101d2b910a27',
      },
      runtimeModifications: [
        'Reused the already-reviewed project-authored apatosaurus Morrison river-corridor background without modification; its water-and-sandbank clearing matches the hippopotamus\'s semi-aquatic river-edge life, and the parent-facing note records the scene as an artistic setting.',
      ],
    },
    portrait: {
      source: reviewedBackgroundSources.apatosaurus.portrait,
      runtime: {
        bytes: 303_080,
        sha256:
          'c70e720ee3ce56507cf1b1b49986a976f1ef04ea0d37190a52b5ef2e1daff9bc',
      },
      runtimeModifications: [
        'Reused the already-reviewed project-authored apatosaurus portrait background without modification.',
      ],
    },
  },
  poster: {
    bytes: 122_520,
    sha256:
      '8e45682e0de643307c587e155fe4c25c943b321b6497a3bc7d7a31a377d6722b',
  },
  posterPortrait: {
    bytes: 78_520,
    sha256:
      '8bcecb334dc9928530e61e8ba5691b78cddb137e32d3a63339166292cc6253e3',
  },
  thumbnail: {
    bytes: 54_802,
    sha256:
      '9be2858236eaa6721f3d9a9892287a2d50d2e7acd1e1fe5d384f0515c4428432',
  },
  narration: {
    generatedOn: '2026-11-23',
    script: zhCN.narration.sentences.join(''),
    bytes: 164_924,
    sha256:
      '3ead943ee3f57f549fe3b6d594bc68b7bdd2cdaef8ba243ec217fef1c58e46b2',
  },
})

export const provenance = [
  ...baseProvenance,
  createReviewedEnglishNarrationProvenance('hippopotamus', en),
] as const
