import type { AnimalContentEn } from '../../types'

export const en = {
  name: 'Smilodon',
  classificationLabel: 'A large extinct sabre-toothed cat',
  visibleFeature:
    'Look at its strong body, short tail and two long straight sabre teeth by its mouth - it was even stockier than a lion.',
  narration: {
    sentences: [
      'Meet Smilodon, the great sabre-toothed cat that lived alongside mammoths long ago.',
      'Look at its strong body, short tail and two long dagger-like teeth - it was even stockier than a lion.',
    ],
    pronunciation: [
      { text: 'Smilodon', reading: 'SMY-loh-don' },
      { text: 'Machairodontinae', reading: 'mak-AY-roe-don-ty-nee' },
      { text: 'Pleistocene', reading: 'PLY-stoh-seen' },
    ],
  },
  facts: {
    period: 'Late Pleistocene (about 400,000 to 10,000 years ago)',
    discoveryRegions: [
      'North America (La Brea Tar Pits)',
      'South America',
    ],
    size: {
      kind: 'body-length',
      minMeters: 1.5,
      maxMeters: 2.2,
    },
    diet: 'carnivore',
  },
  parentClassificationNote:
    'Smilodon is often called the "saber-toothed tiger", but it was neither a tiger nor an ancestor of tigers: it belonged to the extinct machairodont subfamily (Machairodontinae), which split from the ancestors of all living cats around 20 million years ago. The exhibit follows the best-known species, Smilodon fatalis, which was about the size of a large lion but stockier, weighing up to 160-280 kilograms, and could open its jaws nearly 120 degrees to bring its long upper canines into play. It is one of the most common large carnivores found at the La Brea Tar Pits and is the state fossil of California.',
  sources: [
    {
      title: 'Suiting Up for Smilodon - Natural History Museum of Los Angeles County',
      url: 'https://nhm.org/stories/suiting-smilodon',
      accessedOn: '2026-11-22',
    },
    {
      title: 'Smilodon - Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Smilodon',
      accessedOn: '2026-11-22',
    },
  ],
  editorial: {
    uncertaintyNotes: [
      'The exhibit presents the genus Smilodon with the best-known species S. fatalis as its scale reference; the genus also included larger and smaller species. This choice is recorded here for parents.',
      'Smilodon coat colour and markings cannot be determined from fossils; the model\'s spotted tabby coat follows palaeoart convention and is an artistic interpretation.',
      'Whether Smilodon lived alone or in groups, and exactly how it used its long teeth to hunt, is still being studied; child-facing content keeps to widely accepted physical features.',
    ],
    editedBy: 'Prehistoric Animal Museum candidate research',
    reviewedBy: 'jianghong (product owner)',
    reviewedOn: '2026-11-22',
  },
} satisfies AnimalContentEn
