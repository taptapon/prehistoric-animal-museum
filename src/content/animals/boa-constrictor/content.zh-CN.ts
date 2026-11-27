import type { AnimalContentZhCN } from '../../types'

export const zhCN = {
  name: '蚺蛇',
  classificationLabel: '现生无毒蚺类',
  visibleFeature:
    '看看它棕色身体上的一块块深色斑纹，这样的花纹能帮它悄悄藏进落叶堆里；它盘起身子休息的样子，就像一个安静的大圆垫。',
  narration: {
    sentences: [
      '这是蚺蛇，它把长长的身体盘成一个安静的大圆圈，正趴在地上慢慢休息。',
      '蚺蛇没有毒，捕食时用强壮的身体紧紧缠住猎物，是蛇世界里的大力士。',
    ],
    pronunciation: [
      { text: '蚺蛇', reading: 'rán shé' },
      { text: '斑纹', reading: 'bān wén' },
      { text: '缠住', reading: 'chán zhù' },
    ],
  },
  facts: {
    period: '现生（今天仍生活在中南美洲）',
    discoveryRegions: [
      '墨西哥到阿根廷的热带与亚热带森林、草地和半干旱地区',
      '小安的列斯群岛等加勒比岛屿',
    ],
    size: {
      kind: 'body-length',
      minMeters: 0.9,
      maxMeters: 4.0,
    },
    diet: 'carnivore',
  },
  parentClassificationNote:
    '蚺蛇是现生动物，不是化石物种——本馆自 2026 年 11 月 23 日起扩展收录现生动物（产品负责人批准），蚺蛇是扩展后的新成员。蚺蛇（Boa constrictor，俗称红尾蚺）是蚺科的无毒大蛇，捕食时靠缠绕收缩制服猎物——现行研究认为这主要通过阻断血液循环让猎物迅速失去知觉，而不是从前以为的"憋死"。据密歇根大学 Animal Diversity Web 记录，蚺蛇个体一般长约 2 至 3 米、最大略超 4 米；本展位把它做成盘绕休息的姿态，方便孩子看清整体轮廓。本展位的 3D 模型是一件真实蚺蛇的照片测量扫描（据模型作者说明为伊斯帕尼奥拉岛的个体；该岛种群现状本馆未独立核实）。展位背景复用了馆内已审的河畔丛林场景图，与蚺蛇的真实生境相近，属于艺术化场景处理。',
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
      '蚺蛇是现生物种，馆藏自 2026-11-23 起扩展收录现生动物（产品负责人批准）；家长面已注明它是今天仍存活的物种，不是灭绝动物。',
      '3D 模型是一件具体个体的照片测量扫描，个体的性别、年龄与颜色变异不代表整个物种；伊斯帕尼奥拉岛的种群现状未独立核实，家长面只转述模型作者的说明。',
      '展位背景复用已审的河畔丛林场景图（原为重爪龙展位绘制），与现生蚺蛇生境相近，属艺术化场景处理，而非具体地点的写实复原。',
      '蚺蛇的亚种划分在学界仍有讨论；儿童事实层只保留物种级（Boa constrictor）的广泛接受结论。',
    ],
    editedBy: 'Prehistoric Animal Museum candidate research',
    reviewedBy: 'jianghong（产品负责人）',
    reviewedOn: '2026-11-27',
  },
} satisfies AnimalContentZhCN
