import type { AnimalContentZhCN } from '../../types'

export const zhCN = {
  name: '河马',
  classificationLabel: '现生大型半水生哺乳动物',
  visibleFeature:
    '看看它圆圆的桶一样的大身体和能张得特别大的嘴巴，它的鼻孔、眼睛和耳朵都长在头顶的一条线上。',
  narration: {
    sentences: [
      '这是河马，一种整天泡在河里和泥塘里的大动物，它的眼睛、耳朵和鼻孔都长在头顶上。',
      '看看它圆圆的大身体和能张得特别大的嘴巴，晚上它会上岸吃好多青草。',
    ],
    pronunciation: [
      { text: '河马', reading: 'hé mǎ' },
      { text: '半水生', reading: 'bàn shuǐ shēng' },
      { text: '鲸鱼', reading: 'jīng yú' },
    ],
  },
  facts: {
    period: '现生（今天仍生活在非洲）',
    discoveryRegions: [
      '撒哈拉以南非洲的河流与湖泊',
    ],
    size: {
      kind: 'body-length',
      minMeters: 3.0,
      maxMeters: 3.5,
    },
    diet: 'herbivore',
  },
  parentClassificationNote:
    '河马是现生动物，不是化石物种——它是本馆第一件现生展品（2026 年 11 月 23 日由产品负责人批准扩展），可以帮助孩子把冰河世纪的灭绝邻居和今天的动物联系起来。河马科现生只剩两个种：普通河马和倭河马。分子生物学研究发现，现生动物中河马是鲸鱼和海豚最近的陆地亲戚。成年河马体长约三米到三米半，体重可达约 1.5 吨，是仅次于象和犀牛的第三大陆生哺乳动物，被 IUCN 列为易危物种。它的嘴能张开约 150 度，虽然整天泡在水里，晚上却要上岸一夜吃掉约四十公斤青草。',
  sources: [
    {
      title: 'Hippopotamus — Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Hippopotamus',
      accessedOn: '2026-11-23',
    },
    {
      title: 'Hippopotamus — African Wildlife Foundation',
      url: 'https://www.awf.org/wildlife-conservation/hippopotamus',
      accessedOn: '2026-11-23',
    },
    {
      title: 'Hippopotamus amphibius — Animal Diversity Web, University of Michigan',
      url: 'https://animaldiversity.org/accounts/Hippopotamus_amphibius/',
      accessedOn: '2026-11-23',
    },
  ],
  editorial: {
    uncertaintyNotes: [
      '河马是现生物种，本馆在 2026-11-23 由产品负责人批准将馆藏范围扩展到现生动物后收录；家长面已注明它是今天仍存活的物种，不是灭绝动物。',
      '展位背景复用了馆内已审的河岸沙洲场景图（原为迷惑龙展位绘制，中生代植被），属于艺术化场景处理而非非洲河马栖息地的写实复原；河马的水岸生活习性与该场景相配。',
      '河马的群体结构、领地行为和繁殖细节仍在研究中，儿童内容只保留广泛接受的形态特征和昼夜活动规律。',
    ],
    editedBy: 'Prehistoric Animal Museum candidate research',
    reviewedBy: 'jianghong（产品负责人）',
    reviewedOn: '2026-11-23',
  },
} satisfies AnimalContentZhCN
