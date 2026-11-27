import type { AnimalContentEn } from '../../types'

export const en = {
  name: 'Boa constrictor',
  classificationLabel: 'Living non-venomous boa',
  visibleFeature:
    'Look at the dark patches along its brown, scaly body — this pattern helps it hide among fallen leaves. Resting like this, its long body makes a big, quiet coil.',
  narration: {
    sentences: [
      'This is a boa constrictor, resting quietly in a big, cosy coil.',
      'Boas have no venom; a boa squeezes its prey with its strong, coiled body, like a gentle giant of the snake world.',
    ],
    pronunciation: [
      { text: 'boa', reading: '/ˈbəʊ.ə/' },
      { text: 'constrictor', reading: '/kənˈstrɪk.tə/' },
      { text: 'venom', reading: '/ˈven.əm/' },
    ],
  },
  facts: {
    period: 'Living (found in the Americas today)',
    discoveryRegions: [
      'Tropical and subtropical forests, grasslands and semi-dry areas from Mexico to Argentina',
      'Caribbean islands such as the Lesser Antilles',
    ],
    size: {
      kind: 'body-length',
      minMeters: 0.9,
      maxMeters: 4.0,
    },
    diet: 'carnivore',
  },
  parentClassificationNote:
    'The boa constrictor is a living species, not a fossil — the museum began including living animals on 23 November 2026 (approved by the product owner), and the boa is one of the newest members. Boa constrictor (also called the common boa) is a large non-venomous snake of the family Boidae; it subdues prey by constricting — current research indicates this rapidly immobilises prey mainly by interfering with blood flow, rather than simple suffocation as once thought. According to Animal Diversity Web (University of Michigan), individuals are generally 2–3 metres long, with the largest slightly over 4 metres; this exhibit presents a resting coil so children can see the whole silhouette. The 3D model is a photogrammetry scan of a real boa (an individual from Hispaniola according to the model author; the current status of that island population has not been independently verified by the museum). The exhibit background reuses the museum-reviewed riverside wet-woodland scene, which is close to the boa\'s real habitat, as an artistic setting.',
  sources: [
    {
      title: 'Boa constrictor — Animal Diversity Web, University of Michigan',
      url: 'https://animaldiversity.org/accounts/Boa_constrictor/',
      accessedOn: '2026-11-27',
    },
    {
      title: 'Boa constrictor — Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Boa_constrictor',
      accessedOn: '2026-11-27',
    },
  ],
  editorial: {
    uncertaintyNotes: [
      'The boa constrictor is a living species; the collection has included living animals since 23 November 2026 (approved by the product owner), and the parent-facing notes say so explicitly.',
      'The 3D model is a photogrammetry scan of one specific individual; its sex, age and colour variation do not represent the whole species. The status of the Hispaniola population has not been independently verified; the parent-facing note only reports the model author\'s statement.',
      'The exhibit background reuses the museum-reviewed riverside wet-woodland scene (originally painted for Baryonyx); it is close to the boa\'s real habitat but is an artistic setting, not a literal site reconstruction.',
      'Subspecies division within Boa constrictor is still discussed; child-facing facts keep only the widely accepted species-level conclusions.',
    ],
    editedBy: 'Prehistoric Animal Museum candidate research',
    reviewedBy: 'jianghong (product owner)',
    reviewedOn: '2026-11-27',
  },
} satisfies AnimalContentEn
