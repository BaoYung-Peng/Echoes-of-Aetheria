export interface WorldCard {
  title: string;
  description: string;
  color: string;
}

export function useWorldCards() {
  const worldCards: WorldCard[] = [
    {
      title: '現實：星刻市',
      description: '極致的高科技秩序，霓虹燈下的數據都市。居民們對維度異常習以為常，以為只是都市傳說，卻不知現實正在被蠶食。',
      color: '#00FFC6',
    },
    {
      title: '異界：阿爾卡迪亞',
      description: '失落的神域與結晶化荒原。這裡的時間停滯，英雄的靈魂在此長眠。這裡是維度坍塌的起源，也是力量的唯一出口。',
      color: '#FF00FF',
    },
  ];

  return {
    worldCards,
  };
}
