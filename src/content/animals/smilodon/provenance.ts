import {
  createPublishedAssetProvenance,
  createReviewedEnglishNarrationProvenance,
  recomposedCollectionThumbnailDerivation,
  reviewedBackgroundSources,
} from '../../provenance-helpers'
import { en } from './content.en'
import { zhCN } from './content.zh-CN'

const ncSaModelLicense = {
  spdx: 'CC-BY-NC-SA-4.0',
  name: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
} as const

const baseProvenance = createPublishedAssetProvenance({
  animalName: zhCN.name,
  modelLicense: ncSaModelLicense,
  modelLicenseLabel: 'CC BY-NC-SA 4.0',
  model: {
    source: {
      title: 'Ice Age Big Cat',
      author: 'kenchoo (Sketchfab user kenchoo)',
      url: 'https://sketchfab.com/3d-models/ice-age-big-cat-2887bc87fbba4118905a49924a2cb0b9',
      accessedOn: '2026-11-22',
      bytes: 6_910_644,
      sha256:
        'd61da8e5856400b098d6143caab6d469e6451959215d0b4dfb0bbe514544d680',
    },
    runtime: {
      bytes: 5_507_380,
      sha256:
        '4e88fdd5605bfbb0ad7ee71d62c875776e7419dbf495de12bbde22d8ff2cc995',
    },
    modifications: [
      'Used the CC BY-NC-SA 4.0 source under its own terms recorded here: attribution to kenchoo, non-commercial distribution only, and share-alike for this exhibit and its derived images; the owner-approved intake decision records why the exhibit adopted this licence.',
      'Reoriented the source from its imported length axis into the canonical X body axis and rescaled it to the museum target length, keeping the model grounded for a land exhibit.',
      'Baked and joined the seven source meshes (body, eyes, teeth, tongue, fur shells) into one self-contained mesh and discarded the 50-joint source armature together with its 136-channel animation; this destructive replacement is recorded per the replace-with-project-morph strategy.',
      'Kept the single PBR base-colour material and its two embedded textures unchanged; verified the coat reads naturally under the runtime environment lighting.',
      'Authored a deterministic project Idle (land-breathe-tail morph): eight-second closed loop with gentle breathing and tail sway, no root translation, no walking.',
      'The exhibit presents the genus identity with Smilodon fatalis as the scale reference; the parent-facing note records this species-level simplification and the artistic spotted coat.',
    ],
  },
  derivedImagesGeneratedOn: '2026-11-22',
  thumbnailDerivation: {
    ...recomposedCollectionThumbnailDerivation,
    generatedOn: '2026-11-22',
  },
  backgrounds: {
    landscape: {
      source: reviewedBackgroundSources.mammoth.landscape,
      runtime: {
        bytes: 420_388,
        sha256:
          '2b23ceaf9e6b7f6d270dcb327254f5be27fb764fc2a845c627fa928aa3c01eb4',
      },
      runtimeModifications: [
        'Reused the already-reviewed project-authored mammoth Ice Age tundra background without modification; Smilodon lived in Pleistocene North America alongside mammoths, so the cold daylight palette suits the exhibit.',
      ],
    },
    portrait: {
      source: reviewedBackgroundSources.mammoth.portrait,
      runtime: {
        bytes: 268_126,
        sha256:
          '3b5e795c4abe470c1ca0cfba9d7834397080b76cb261e2ea1d3f1757f0482335',
      },
      runtimeModifications: [
        'Reused the already-reviewed project-authored mammoth Ice Age tundra portrait background without modification.',
      ],
    },
  },
  poster: {
    bytes: 119_600,
    sha256:
      '0d2be44ba0d8964c7c03a9b7ef6911d2deb608e180b68d7e01fccf0ade89ee3e',
  },
  posterPortrait: {
    bytes: 55_098,
    sha256:
      'b608d765b2395909f6f564e994785add1170cc85b9e7b6dac5e9e574f48571d7',
  },
  thumbnail: {
    bytes: 51_706,
    sha256:
      'c5e3a63c96eeeae721b0e2cc10d2f9031808d5690041787007bcdd4a779dea4b',
  },
  narration: {
    generatedOn: '2026-11-22',
    script: zhCN.narration.sentences.join(''),
    bytes: 160_844,
    sha256:
      '15355959a2d3a56068d1d92d4b67056d5363a90c8623f713e63ce4d60b3a7d6d',
  },
})

export const provenance = [
  ...baseProvenance,
  createReviewedEnglishNarrationProvenance('smilodon', en),
] as const
