import type { AnimalContentEn } from '../../types'

export const en = {
  name: 'Tiger',
  classificationLabel: 'A large living cat',
  visibleFeature:
    'Look at its orange fur with black stripes - the stripes help the tiger hide in tall grass. It is the biggest cat in the world.',
  narration: {
    sentences: [
      'This is the tiger, the biggest cat in the world. Its orange fur has black stripes that help it hide in the tall grass.',
      'Tigers love water - most cats avoid it, but the tiger hops right in for a soak.',
    ],
    pronunciation: [
      { text: 'tiger', reading: 'TY-guh' },
      { text: 'camouflage', reading: 'KAM-uh-flahj' },
      { text: 'Panthera tigris', reading: 'PAN-thur-uh TY-gris' },
    ],
  },
  facts: {
    period: 'Living today (still found across Asia)',
    discoveryRegions: [
      'Forests of the Russian Far East and East Asia',
      'Forests and grasslands of South and Southeast Asia',
    ],
    size: {
      kind: 'body-length',
      minMeters: 2.0,
      maxMeters: 3.7,
    },
    diet: 'carnivore',
  },
  parentClassificationNote:
    'The tiger is a living animal, not a fossil species - the collection was extended to living animals on 23 November 2026 with the product owner\'s approval, and the tiger joins that expansion, helping children connect vanished prehistoric cats (such as the museum\'s smilodon) with cats alive today. The tiger is the largest living cat species and is listed as Endangered by the IUCN; wild tigers today live only in Asia. Animal Diversity Web at the University of Michigan records a total length range of about 2.0 to 3.7 metres and a weight range of about 91 to 423 kilograms; the largest subspecies is the Amur (Siberian) tiger of the snowy Russian Far East. Tigers also love the water and are excellent swimmers, which is rare among cats, and their stripes are camouflage in tall grass and forest.',
  sources: [
    {
      title: 'Panthera tigris - Animal Diversity Web, University of Michigan',
      url: 'https://animaldiversity.org/accounts/Panthera_tigris/',
      accessedOn: '2026-11-27',
    },
    {
      title: 'Tiger - San Diego Zoo Wildlife Alliance',
      url: 'https://animals.sandiegozoo.org/animals/tiger',
      accessedOn: '2026-11-27',
    },
  ],
  editorial: {
    uncertaintyNotes: [
      'The tiger is a living species; the collection was extended to living animals on 2026-11-23 by the product owner, and this parent-facing note records that it is alive today rather than extinct.',
      'The exhibit reuses the museum\'s reviewed riverside-jungle scene art (originally painted for the baryonyx exhibit, with Mesozoic plants); it is an artistic setting rather than a realistic reconstruction of an Asian tiger habitat.',
      'Tiger subspecies classification is still discussed among scientists; child-facing content keeps to the widely accepted conclusion that the tiger is the largest living cat, and stripe individuality is not asserted in the child layer.',
    ],
    editedBy: 'Prehistoric Animal Museum candidate research',
    reviewedBy: 'jianghong (product owner)',
    reviewedOn: '2026-11-27',
  },
} satisfies AnimalContentEn
