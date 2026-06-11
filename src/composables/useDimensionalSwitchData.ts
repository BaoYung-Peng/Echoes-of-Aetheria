import type { DimensionMode } from './useDimensionSwitch';
import { STAR_CITY_COLOR, ARCADIA_COLOR } from './useDimensionSwitch';

export interface DimensionCard {
  title: string;
  description: string;
  accent: string;
  realm: 'star' | 'arcadia';
}

export interface SceneOption {
  title: string;
  description: string;
  accent: string;
  realm: 'star' | 'arcadia';
}

export interface TacticalItem {
  label: string;
  value: string;
}

export interface FormationSlot {
  label: string;
  desc: string;
}

export function useDimensionalSwitchData() {
  const cards: DimensionCard[] = [
    {
      title: '星刻市視角',
      description: '電光商圈資訊、社交住宅與數據目標標記，強調現實維度的任務與資源流。',
      accent: STAR_CITY_COLOR,
      realm: 'star',
    },
    {
      title: '阿爾卡迪亞戰術層',
      description: '浮空遺跡符文地脈、裂隙連鎖與弱點節點，凸顯異界模式的策略差異。',
      accent: ARCADIA_COLOR,
      realm: 'arcadia',
    },
  ];

  const sceneOptions: SceneOption[] = [
    {
      title: '霓虹商圈 • 星刻市',
      description: '現實維度下的場景以高樓、資料塔與社交住宅為核心，資源採集與任務提示更偏向玩家觀察與地形預判。',
      accent: STAR_CITY_COLOR,
      realm: 'star',
    },
    {
      title: '符文裂隙 • 阿爾卡迪亞',
      description: '異界維度揭示裂隙連鎖與地脈共鳴，敵人弱點會隨地形變化，玩家需要用場地謀略引導連鎖爆發。',
      accent: ARCADIA_COLOR,
      realm: 'arcadia',
    },
  ];

  const formation: FormationSlot[] = [
    { label: '前鋒', desc: '主攻單位，承擔破盾與輸出任務' },
    { label: '重裝', desc: '坦克/防禦位，維持隊伍穩定' },
    { label: '術師', desc: '範圍與控場，觸發地脈連鎖' },
    { label: '輔助', desc: '治療/增益，支持 4+1 編成' },
    { label: '偵查', desc: '遠端偵查與標記弱點' },
  ];

  const getDimensionDetails = (mode: DimensionMode) => {
    if (mode === 'star') {
      return [
        { label: '場地狀態', value: '資料封鎖、社交住宅事件' },
        { label: '弱點資訊', value: '目標緩衝區、破盾節點' },
        { label: '戰術焦點', value: '編組 4+1、隊友支援、能量管理' },
      ];
    }

    return [
      { label: '場地狀態', value: '符文地脈、裂隙擴散、共鳴點' },
      { label: '弱點資訊', value: '異界弱點連鎖、減抗節點' },
      { label: '戰術焦點', value: '幻境輔助、連鎖爆發、維度觸發' },
    ];
  };

  const getBonusTriggers = (mode: DimensionMode) => {
    if (mode === 'star') {
      return [
        { label: 'Bonus 觸發', value: '社交住宅事件完成時可獲得「戰力回復」與「資料節點強化」。' },
        { label: '場景切換', value: '從星刻市切換至異界後，同一區域會解鎖符文地脈視角。' },
        { label: '戰術利基', value: '固定裝備可在都市場景中疊加「數據盾牌」，提高 4+1 戰陣耐久。' },
      ];
    }

    return [
      { label: 'Bonus 觸發', value: '進入阿爾卡迪亞可激活「裂隙共鳴」，連鎖攻擊額外造成符文爆發傷害。' },
      { label: '場景切換', value: '從異界返回現實，可獲得「弱點標記」與「能量回復」的切換紅利。' },
      { label: '戰術利基', value: '「地形謀略」影響敵方耐性，地脈節點可讓固定裝備獲得次元屬性加成。' },
    ];
  };

  const getTerrainStrategy = (mode: DimensionMode) => {
    if (mode === 'star') {
      return [
        { label: '雲塔高地', value: '利用高地視野標記敵人弱點並佈置輔助角色，提升隊伍控制。' },
        { label: '霓虹街區', value: '在開放街區判斷敵群走位，將群攻技能與場地節點結合形成破盾節奏。' },
        { label: '住宅區域', value: '透過社交住宅事件增加能量蓄積，為 4+1 戰陣鋪路。' },
      ];
    }

    return [
      { label: '裂隙廢墟', value: '利用地形裂隙推動連鎖爆發，讓固定技能命中弱點產生擴散效果。' },
      { label: '符文祭壇', value: '排列角色技能順序以觸發「共鳴連鎖」，形成可控的異界傷害路徑。' },
      { label: '空中遺跡', value: '在浮空平台布局隊形，強化「職能替代」與「援護節奏」的戰術多樣性。' },
    ];
  };

  return {
    cards,
    sceneOptions,
    formation,
    getDimensionDetails,
    getBonusTriggers,
    getTerrainStrategy,
  };
}
