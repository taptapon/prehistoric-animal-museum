import type { AnimalContentZhCN } from '../../types'

export const zhCN = {
  name: '剑齿虎',
  classificationLabel: '史前大型剑齿猫科动物',
  visibleFeature:
    '看看它粗壮的身体、短短的尾巴，还有嘴边两根又长又直的大牙，像两把小剑。',
  narration: {
    sentences: [
      '这是剑齿虎，一种和猛犸象生活在同一时代的史前大猫，它不是老虎的祖先。',
      '看看它粗壮的身体、短短的尾巴，还有嘴边两根像剑一样的大牙，比今天的狮子还要威风。',
    ],
    pronunciation: [
      { text: '剑齿虎', reading: 'jiàn chǐ hǔ' },
      { text: '猫科', reading: 'māo kē' },
      { text: '更新世', reading: 'gèng xīn shì' },
    ],
  },
  facts: {
    period: '晚更新世（约 40 万至 1 万年前）',
    discoveryRegions: [
      '北美洲（拉布雷亚沥青坑）',
      '南美洲',
    ],
    size: {
      kind: 'body-length',
      minMeters: 1.5,
      maxMeters: 2.2,
    },
    diet: 'carnivore',
  },
  parentClassificationNote:
    '剑齿虎虽然常被叫作「剑齿虎（saber-toothed tiger）」，但它不是老虎的祖先，和现生猫科的亲缘也很远：它属于已灭绝的剑齿虎亚科（Machairodontinae），约 2000 万年前就与现代猫科的祖先分家。展陈按最著名的致命剑齿虎（Smilodon fatalis）体量复原，约与大型狮子相当但更粗壮，体重可达 160 至 280 公斤，上下颌能张开近 120 度让长牙发挥作用。它是拉布雷亚沥青坑发现数量最多的大型食肉动物之一，也是加州的州化石。',
  sources: [
    {
      title: 'Suiting Up for Smilodon — Natural History Museum of Los Angeles County',
      url: 'https://nhm.org/stories/suiting-smilodon',
      accessedOn: '2026-11-22',
    },
    {
      title: 'Smilodon — Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Smilodon',
      accessedOn: '2026-11-22',
    },
  ],
  editorial: {
    uncertaintyNotes: [
      '展陈模型按属级身份呈现，以最著名的致命剑齿虎（Smilodon fatalis）为体量参照；剑齿虎属还有更大和更小的种，本说明向家长注明这一取舍。',
      '剑齿虎的毛色和斑纹无法从化石确定，模型的斑点棕毛属于古艺术复原惯例的艺术创作。',
      '剑齿虎是独居还是群居、如何使用长牙捕猎，学界仍在研究中；儿童内容只保留广泛接受的形态特征。',
    ],
    editedBy: 'Prehistoric Animal Museum candidate research',
    reviewedBy: 'jianghong（产品负责人）',
    reviewedOn: '2026-11-22',
  },
} satisfies AnimalContentZhCN
