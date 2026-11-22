import type { AnimalContentEn } from '../../types'

export const en = {
  name: 'Hippopotamus',
  classificationLabel: 'A large living semi-aquatic mammal',
  visibleFeature:
    'Look at its round barrel body and its huge wide-opening mouth - its eyes, ears and nostrils all sit in a line along the top of its head.',
  narration: {
    sentences: [
      'Meet the hippopotamus, a big river animal with its eyes, ears and nostrils on top of its head.',
      'Look at its round barrel body and its huge wide-opening mouth - at night it walks onto the land to eat lots and lots of grass.',
    ],
    pronunciation: [
      { text: 'hippopotamus', reading: 'hip-oh-POT-uh-mus' },
      { text: 'semiaquatic', reading: 'sem-ee-AK-wat-ik' },
      { text: 'Hippopotamidae', reading: 'hip-oh-POT-uh-my-dee' },
    ],
  },
  facts: {
    period: 'Living today (still found across sub-Saharan Africa)',
    discoveryRegions: [
      'Rivers and lakes of sub-Saharan Africa',
    ],
    size: {
      kind: 'body-length',
      minMeters: 3.0,
      maxMeters: 3.5,
    },
    diet: 'herbivore',
  },
  parentClassificationNote:
    'The hippopotamus is a living animal, not a fossil species - it is this museum\'s first living-species exhibit (added on 23 November 2026 with the product owner\'s approval), helping children connect the vanished Ice Age neighbours with animals alive today. Only two hippopotamus species survive: the common hippopotamus and the pygmy hippopotamus. Genetic studies show that among living animals the hippopotamus is the closest land relative of whales and dolphins. An adult hippopotamus is about three to three and a half metres long, can weigh around 1.5 tonnes, and is the third-largest land mammal after elephants and rhinoceroses; it is listed as Vulnerable by the IUCN. Its mouth can open about 150 degrees, and although it spends its days in the water, at night it walks ashore and eats roughly forty kilograms of grass.',
  sources: [
    {
      title: 'Hippopotamus - Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Hippopotamus',
      accessedOn: '2026-11-23',
    },
    {
      title: 'Hippopotamus - African Wildlife Foundation',
      url: 'https://www.awf.org/wildlife-conservation/hippopotamus',
      accessedOn: '2026-11-23',
    },
    {
      title: 'Hippopotamus amphibius - Animal Diversity Web, University of Michigan',
      url: 'https://animaldiversity.org/accounts/Hippopotamus_amphibius/',
      accessedOn: '2026-11-23',
    },
  ],
  editorial: {
    uncertaintyNotes: [
      'The hippopotamus is a living species; the collection was extended to living animals on 2026-11-23 by the product owner, and this parent-facing note records that it is alive today rather than extinct.',
      'The exhibit reuses the museum\'s reviewed river-sandbank scene art (originally painted for the apatosaurus exhibit, with Mesozoic plants); it is an artistic setting rather than a realistic reconstruction of an African hippo habitat, and its water-and-bank setting matches the hippo\'s semi-aquatic life.',
      'Hippopotamus group structure, territorial behaviour and breeding details are still being studied; child-facing content keeps to widely accepted features and the day-and-night activity pattern.',
    ],
    editedBy: 'Prehistoric Animal Museum candidate research',
    reviewedBy: 'jianghong (product owner)',
    reviewedOn: '2026-11-23',
  },
} satisfies AnimalContentEn
