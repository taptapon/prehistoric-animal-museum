import type { AnimalContentZhCN } from '../../types'

export const zhCN = {
  name: '兔子',
  classificationLabel: '现生小型食草哺乳动物',
  visibleFeature:
    '看看它长长的耳朵和短短的尾巴，它的后腿特别有力，走起路来蹦蹦跳跳的。',
  narration: {
    sentences: [
      '这是兔子，它的长耳朵会转来转去，能听到四面八方的声音，有危险靠近马上就知道。',
      '兔子用有力的后腿蹦蹦跳跳，还和伙伴们一起住在地下挖好的洞穴家里。',
    ],
    pronunciation: [
      { text: '兔子', reading: 'tù zi' },
      { text: '蹦蹦跳跳', reading: 'bèng bèng tiào tiào' },
      { text: '洞穴', reading: 'dòng xué' },
    ],
  },
  facts: {
    period: '现生（今天仍生活在世界各地）',
    discoveryRegions: [
      '欧洲（原产地）',
      '随人类引入，现广泛分布于世界各大洲',
    ],
    size: {
      kind: 'body-length',
      minMeters: 0.38,
      maxMeters: 0.5,
    },
    diet: 'herbivore',
  },
  parentClassificationNote:
    '兔子是现生动物，不是化石物种——本馆自 2026 年 11 月 23 日起扩展收录现生动物（产品负责人批准），兔子是扩展后的新成员。展品形象以欧洲穴兔（Oryctolagus cuniculus，又称 Old World rabbit）为原型，它是兔属唯一的现生种，也是所有家兔的祖先——家兔和野生穴兔其实是同一个物种。据密歇根大学 Animal Diversity Web 记录，野生穴兔体长约 38 至 50 厘米、体重约 1.5 至 2.5 公斤。它们原产欧洲，后被人类带到世界各大洲；喜欢群居，会在地下挖出复杂的大型洞穴系统（称为 warren，洞穴群）一起生活。长耳朵可以转动方向捕捉声音，是它们察觉危险的重要工具。',
  sources: [
    {
      title: 'Oryctolagus cuniculus — Animal Diversity Web, University of Michigan',
      url: 'https://animaldiversity.org/accounts/Oryctolagus_cuniculus/',
      accessedOn: '2026-11-27',
    },
    {
      title: 'Rabbits — RSPCA Advice & Welfare',
      url: 'https://www.rspca.org.uk/adviceandwelfare/pets/rabbits',
      accessedOn: '2026-11-27',
    },
  ],
  editorial: {
    uncertaintyNotes: [
      '兔子是现生物种，馆藏自 2026-11-23 起扩展收录现生动物（产品负责人批准）；家长面已注明它是今天仍存活的物种，不是灭绝动物。',
      '展位背景复用了馆内已审的林间草地场景图（原为慈母龙展位绘制，中生代植被），属于艺术化场景处理而非兔子真实栖息地的写实复原。',
      '展品形象是卡通化艺术处理，原型为欧洲穴兔（家兔的祖先）；真实穴兔的耳朵比例、毛色与该卡通形象有差异，家长面已注明。',
    ],
    editedBy: 'Prehistoric Animal Museum candidate research',
    reviewedBy: 'jianghong（产品负责人）',
    reviewedOn: '2026-11-27',
  },
} satisfies AnimalContentZhCN
