import type { AnimalContentEn } from '../../types'

export const en = {
  name: 'Rabbit',
  classificationLabel: 'A small living plant-eating mammal',
  visibleFeature:
    'Look at its long ears and short tail - the rabbit pushes off with its strong back legs to hop, hop, hop.',
  narration: {
    sentences: [
      'This is the rabbit. Its long ears twist and turn to catch sounds from every direction, so it knows when danger is near.',
      'With strong back legs the rabbit hops and hops, and it lives underground in big burrow homes with all its friends.',
    ],
    pronunciation: [
      { text: 'rabbit', reading: 'RAB-it' },
      { text: 'burrow', reading: 'BUR-oh' },
      { text: 'Oryctolagus cuniculus', reading: 'or-ik-TOL-uh-gus kuh-NIK-yuh-lus' },
    ],
  },
  facts: {
    period: 'Living today (found across the world)',
    discoveryRegions: [
      'Europe (original home)',
      'Introduced by people, now found on every continent',
    ],
    size: {
      kind: 'body-length',
      minMeters: 0.38,
      maxMeters: 0.5,
    },
    diet: 'herbivore',
  },
  parentClassificationNote:
    'The rabbit is a living animal, not a fossil species - the collection was extended to living animals on 23 November 2026 with the product owner\'s approval, and the rabbit joins that expansion. The exhibit is modelled on the European rabbit (Oryctolagus cuniculus, also called the Old World rabbit), the only living species in its genus and the ancestor of every pet rabbit - domestic rabbits and wild European rabbits are the same species. Animal Diversity Web at the University of Michigan records wild European rabbits at about 38 to 50 centimetres long and 1.5 to 2.5 kilograms. They originally come from Europe and were carried by people around the world; they like living in groups and dig large, complex underground burrow systems called warrens, where they live together. Their long ears can turn to catch sounds, an important tool for spotting danger.',
  sources: [
    {
      title: 'Oryctolagus cuniculus - Animal Diversity Web, University of Michigan',
      url: 'https://animaldiversity.org/accounts/Oryctolagus_cuniculus/',
      accessedOn: '2026-11-27',
    },
    {
      title: 'Rabbits - RSPCA Advice & Welfare',
      url: 'https://www.rspca.org.uk/adviceandwelfare/pets/rabbits',
      accessedOn: '2026-11-27',
    },
  ],
  editorial: {
    uncertaintyNotes: [
      'The rabbit is a living species; the collection was extended to living animals on 2026-11-23 by the product owner, and this parent-facing note records that it is alive today rather than extinct.',
      'The exhibit reuses the museum\'s reviewed woodland-clearing scene art (originally painted for the maiasaura exhibit, with Mesozoic plants); it is an artistic setting rather than a realistic reconstruction of rabbit habitat.',
      'The exhibit artwork is a stylised interpretation modelled on the European rabbit (ancestor of all pet rabbits); real European rabbits have different ear proportions and coat colours, as recorded in this parent-facing note.',
    ],
    editedBy: 'Prehistoric Animal Museum candidate research',
    reviewedBy: 'jianghong (product owner)',
    reviewedOn: '2026-11-27',
  },
} satisfies AnimalContentEn
