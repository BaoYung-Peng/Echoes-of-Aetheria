export type WorldMode = 'city' | 'aether';

export interface CoreMetric {
  val: string;
  label: string;
}

export interface UnitPair {
  city: string;
  aether: string;
}

export interface LoopStep {
  title: string;
  desc: string;
}

export interface StrategySolution {
  title: string;
  desc: string;
}

export function useGameplanData() {
  const metrics: CoreMetric[] = [
    { val: '4+1', label: '戰陣系統' },
    { val: '0 浮動', label: '固定裝備浮動數值' },
    { val: '3+ 討伐', label: 'Boss 策略' },
    { val: '雙重維度', label: '異界互動隱藏劇情' },
    { val: '多樣化', label: '角色成長路線' },
    { val: '每季更新', label: '長線版本' },
  ];

  const units: UnitPair[] = [
    { city: '防禦', aether: '破盾者' },
    { city: '反制', aether: '治療' },
    { city: '特殊', aether: '弱點機制' },
    { city: '連鎖', aether: '主力' },
  ];

  const loopSteps: LoopStep[] = [
    { title: '接取任務', desc: '在星刻市取得主線、日常與活動委託。' },
    { title: '次元調查', desc: '切換阿爾卡迪亞視角，找出隱藏機關。' },
    { title: '編成隊伍', desc: '依 Boss 弱點與場地規則配置 4+1 陣容。' },
    { title: '連鎖戰術', desc: '運用特殊效果完成戰術解題。' },
    { title: '固定成長', desc: '取得固定數值模組與店鋪經營資源。' },
    { title: '社交展示', desc: '住宅區展示角色與版本成果。' },
  ];

  const solutions: StrategySolution[] = [
    { title: '弱點連鎖', desc: '玩家透過鎖定特定部位找出弱點，賦予玩家副本內持有特殊效果。' },
    { title: '場地機制', desc: '穿梭於現實與異界維度，透過能量引力引爆雙維度之共鳴，於不同維度間抉擇，考驗玩家們的戰術思維' },
    { title: '職業應用', desc: '以守護、治療、弱點標記、主力、戰友支援等方式；每個角色皆有現實與異界兩維度的特殊運用' },
  ];

  return {
    metrics,
    units,
    loopSteps,
    solutions,
  };
}
