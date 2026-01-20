// 细胞过程相关的常量和数据

export const PROCESS_INFO = {
  endocytosis: {
    title: '内吞作用（Endocytosis）',
    subtitle: '细胞如何"吃"东西',
    description: '内吞作用是细胞通过细胞膜内陷形成囊泡，将细胞外的物质包裹进入细胞内部的过程。',
    steps: [
      {
        title: '识别阶段',
        description: '细胞膜表面的受体识别并结合目标物质（如营养物质、激素、病原体等）',
        duration: 2000,
      },
      {
        title: '膜内陷',
        description: '细胞膜在结合位点处开始向内凹陷，形成小窝状结构',
        duration: 3000,
      },
      {
        title: '囊泡形成',
        description: '膜内陷加深并最终闭合，形成包裹着外部物质的囊泡',
        duration: 2000,
      },
      {
        title: '囊泡脱离',
        description: '新形成的囊泡从细胞膜上脱离，进入细胞质',
        duration: 2000,
      },
      {
        title: '运输与融合',
        description: '囊泡在细胞质中移动，与溶酶体或其他细胞器融合，释放内容物',
        duration: 3000,
      },
    ],
    types: [
      {
        name: '吞噬作用',
        description: '吞噬大颗粒物质（如细菌、细胞碎片），主要由巨噬细胞等免疫细胞执行',
      },
      {
        name: '胞饮作用',
        description: '摄取液体和溶解的小分子物质，几乎所有细胞都能进行',
      },
      {
        name: '受体介导的内吞',
        description: '通过特异性受体识别并摄取特定物质（如LDL胆固醇、铁蛋白等）',
      },
    ],
  },
  exocytosis: {
    title: '外排作用（Exocytosis）',
    subtitle: '细胞如何"扔"东西',
    description: '外排作用是细胞通过囊泡与细胞膜融合，将细胞内的物质释放到细胞外的过程。',
    steps: [
      {
        title: '囊泡形成',
        description: '细胞器（如高尔基体）包装需要分泌的物质，形成分泌囊泡',
        duration: 2000,
      },
      {
        title: '囊泡运输',
        description: '囊泡沿着细胞骨架（微管、微丝）向细胞膜方向移动',
        duration: 3000,
      },
      {
        title: '识别与对接',
        description: '囊泡表面的蛋白质识别细胞膜上的对接位点',
        duration: 2000,
      },
      {
        title: '膜融合',
        description: '囊泡膜与细胞膜融合，形成融合孔',
        duration: 2000,
      },
      {
        title: '内容物释放',
        description: '囊泡内的物质通过融合孔释放到细胞外',
        duration: 3000,
      },
    ],
    types: [
      {
        name: '组成型分泌',
        description: '持续进行的分泌过程，如分泌细胞外基质成分、膜蛋白等',
      },
      {
        name: '调节型分泌',
        description: '受信号调控的分泌，如神经递质释放、激素分泌、消化酶分泌',
      },
      {
        name: '溶酶体外排',
        description: '将细胞内的废物和不可消化物质排出细胞外',
      },
    ],
  },
}

export const CELL_COLORS = {
  membrane: '#2D5F5D',
  cytoplasm: '#E8F4F3',
  nucleus: '#1A3A38',
  organelle: '#4A9B94',
  vesicle: '#7BC4BD',
  particle: '#F4A261',
}
