import type { AnimalContentZhCN } from '../../types'

export const zhCN = {
  name: '老虎',
  classificationLabel: '现生大型猫科动物',
  visibleFeature:
    '看看它橙色皮毛上的一条条黑色条纹，这些条纹能帮它藏进高高的草丛里，它是猫科动物里体形最大的。',
  narration: {
    sentences: [
      '这是老虎，猫科动物里体形最大的动物，它橙色皮毛上的黑色条纹，能帮它藏进高高的草丛里。',
      '老虎还特别喜欢水，是个游泳小能手，大多数猫都不肯下水，它却会跳进河里泡澡降温。',
    ],
    pronunciation: [
      { text: '老虎', reading: 'lǎo hǔ' },
      { text: '条纹', reading: 'tiáo wén' },
      { text: '猫科', reading: 'māo kē' },
    ],
  },
  facts: {
    period: '现生（今天仍生活在亚洲）',
    discoveryRegions: [
      '俄罗斯远东与东亚的森林',
      '南亚与东南亚的森林和草地',
    ],
    size: {
      kind: 'body-length',
      minMeters: 2.0,
      maxMeters: 3.7,
    },
    diet: 'carnivore',
  },
  parentClassificationNote:
    '老虎是现生动物，不是化石物种——本馆自 2026 年 11 月 23 日起扩展收录现生动物（产品负责人批准），老虎是扩展后的新成员，可以帮助孩子把灭绝的史前大猫（如馆藏的剑齿虎）和今天仍存活的猫科动物联系起来。虎是现存最大的猫科动物，被 IUCN 列为濒危物种；野生虎今天只生活在亚洲。据密歇根大学 Animal Diversity Web 记录，虎的全长范围约 2.0 至 3.7 米、体重约 91 至 423 公斤，其中最大的亚种是生活在俄罗斯远东雪林里的东北虎（阿穆尔虎）。虎还喜欢水、是出色的游泳好手，这在猫科动物中很少见；皮毛上的条纹是它在高草和森林中的伪装。',
  sources: [
    {
      title: 'Panthera tigris — Animal Diversity Web, University of Michigan',
      url: 'https://animaldiversity.org/accounts/Panthera_tigris/',
      accessedOn: '2026-11-27',
    },
    {
      title: 'Tiger — San Diego Zoo Wildlife Alliance',
      url: 'https://animals.sandiegozoo.org/animals/tiger',
      accessedOn: '2026-11-27',
    },
  ],
  editorial: {
    uncertaintyNotes: [
      '老虎是现生物种，馆藏自 2026-11-23 起扩展收录现生动物（产品负责人批准）；家长面已注明它是今天仍存活的物种，不是灭绝动物。',
      '展位背景复用了馆内已审的河畔丛林场景图（原为重爪龙展位绘制，中生代植被），属于艺术化场景处理而非亚洲虎栖息地的写实复原。',
      '虎的亚种划分在学界仍有讨论，儿童内容只保留「现存最大的猫科动物」这一广泛接受的结论；条纹的个体差异等细节未写入儿童事实层。',
    ],
    editedBy: 'Prehistoric Animal Museum candidate research',
    reviewedBy: 'jianghong（产品负责人）',
    reviewedOn: '2026-11-27',
  },
} satisfies AnimalContentZhCN
