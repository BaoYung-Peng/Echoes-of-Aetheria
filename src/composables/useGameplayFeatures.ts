export interface GameplayFeature {
  title: string;
  description: string;
  visualLabel: string;
  visualStyle: Record<string, string>;
  reverse?: boolean;
}

export function useGameplayFeatures() {
  const features: GameplayFeature[] = [
    {
      title: '戰術共鬥：連鎖反應',
      description:
        '突破傳統回合制，採用 4+1 陣容策略。透過「連鎖反應系統」，針對敵人弱點觸發多次連擊，將 MMORPG 的 Boss 共鬥體驗完美融入回合制戰鬥中。',
      visualLabel: '戰鬥演示視覺圖',
      visualStyle: { borderColor: 'rgba(192, 132, 252, 0.6)', background: 'rgba(86, 41, 183, 0.28)' },
    },
    {
      title: '都市生活：社交住宅區',
      description:
        '星刻市不僅是戰場，更是您的公共大廳。在此經營店鋪、裝潢專屬空間，邀請好友互動，體驗深度社交與經營的樂趣。',
      visualLabel: '社交住宅模擬圖',
      visualStyle: { borderColor: 'rgba(34, 211, 238, 0.6)', background: 'rgba(6, 182, 212, 0.18)' },
      reverse: true,
    },
    {
      title: '敘事級長線更新',
      description:
        '每一週期重大版本更新，均會帶來全新都市區域與異世界地圖。揭開維度坍塌的真相，保證您的每一次探索都充滿新鮮感。',
      visualLabel: '長線版本地圖預覽',
      visualStyle: { borderColor: 'rgba(168, 85, 247, 0.6)', background: 'rgba(55, 48, 163, 0.24)' },
    },
  ];

  return {
    features,
  };
}
