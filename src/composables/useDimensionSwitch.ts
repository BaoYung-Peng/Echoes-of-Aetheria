import { computed, ref } from 'vue';

export const STAR_CITY_COLOR = '#00FFC6';
export const ARCADIA_COLOR = '#6B4CFF';

export type DimensionMode = 'star' | 'arcadia';

export function useDimensionSwitch(initial = 24) {
  const dimension = ref(initial);
  const dimensionMode = computed<DimensionMode>(() => (dimension.value < 50 ? 'star' : 'arcadia'));
  const dimensionLabel = computed(() => (dimension.value < 50 ? '星刻市' : '阿爾卡迪亞'));
  const sliderHint = computed(() =>
    dimension.value < 50
      ? '滑動次元刻度，觀察同一場域在都市與異界之間的實時資訊差異。'
      : '切換到異界視角，揭示符文地脈、裂隙連鎖與戰術機制。'
  );
  const currentAccent = computed(() => (dimension.value < 50 ? STAR_CITY_COLOR : ARCADIA_COLOR));
  const modeTag = computed(() => (dimension.value < 50 ? '現實維度' : '異界視角'));

  return {
    dimension,
    dimensionMode,
    dimensionLabel,
    sliderHint,
    currentAccent,
    modeTag,
  };
}
