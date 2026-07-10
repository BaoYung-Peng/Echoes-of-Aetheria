import { onBeforeUnmount, ref } from 'vue';

export type AudioCategory = 'bgm' | 'button' | 'hover' | 'transition' | 'enter' | 'characterVoice' | 'ambient';

export interface AudioPlaybackOptions {
  volume?: number;
  loop?: boolean;
  playbackRate?: number;
}

export interface AudioManagerState {
  enabled: boolean;
  masterVolume: number;
  categoryVolumes: Record<AudioCategory, number>;
}

export const DEFAULT_CATEGORY_VOLUMES: Record<AudioCategory, number> = {
  bgm: 0.6,
  button: 0.55,
  hover: 0.35,
  transition: 0.45,
  enter: 0.6,
  characterVoice: 0.7,
  ambient: 0.4,
};

export function useAudioManager() {
  const enabled = ref(true);
  const masterVolume = ref(0.7);
  const categoryVolumes = ref<Record<AudioCategory, number>>({ ...DEFAULT_CATEGORY_VOLUMES });
  const activeSources = ref<Record<AudioCategory, string | null>>({
    bgm: null,
    button: null,
    hover: null,
    transition: null,
    enter: null,
    characterVoice: null,
    ambient: null,
  });

  const audioElements = new Map<AudioCategory, HTMLAudioElement>();

  const getEffectiveVolume = (category: AudioCategory) => {
    const categoryVolume = categoryVolumes.value[category] ?? 1;
    return Math.min(1, Math.max(0, categoryVolume * masterVolume.value));
  };

  const applyVolume = (category: AudioCategory, element: HTMLAudioElement) => {
    element.volume = enabled.value ? getEffectiveVolume(category) : 0;
  };

  const getOrCreateAudioElement = (category: AudioCategory) => {
    const existing = audioElements.get(category);
    if (existing) return existing;

    const element = new Audio();
    element.preload = 'auto';
    element.volume = getEffectiveVolume(category);
    audioElements.set(category, element);
    return element;
  };

  const play = (category: AudioCategory, src: string, options: AudioPlaybackOptions = {}) => {
    if (!enabled.value) return null;

    const element = getOrCreateAudioElement(category);
    element.src = src;
    element.loop = options.loop ?? false;
    element.playbackRate = options.playbackRate ?? 1;
    applyVolume(category, element);

    void element.play().catch(() => undefined);
    activeSources.value[category] = src;

    return element;
  };

  const stop = (category: AudioCategory) => {
    const element = audioElements.get(category);
    if (!element) return;

    element.pause();
    element.currentTime = 0;
    activeSources.value[category] = null;
  };

  const stopAll = () => {
    for (const category of Object.keys(activeSources.value) as AudioCategory[]) {
      stop(category);
    }
  };

  const setEnabled = (value: boolean) => {
    enabled.value = value;

    if (!value) {
      stopAll();
      return;
    }

    for (const category of Object.keys(activeSources.value) as AudioCategory[]) {
      const element = audioElements.get(category);
      if (element && activeSources.value[category]) {
        applyVolume(category, element);
      }
    }
  };

  const setMasterVolume = (value: number) => {
    masterVolume.value = Math.min(1, Math.max(0, value));

    for (const category of Object.keys(activeSources.value) as AudioCategory[]) {
      const element = audioElements.get(category);
      if (element) {
        applyVolume(category, element);
      }
    }
  };

  const setCategoryVolume = (category: AudioCategory, value: number) => {
    categoryVolumes.value[category] = Math.min(1, Math.max(0, value));

    const element = audioElements.get(category);
    if (element) {
      applyVolume(category, element);
    }
  };

  const getState = (): AudioManagerState => ({
    enabled: enabled.value,
    masterVolume: masterVolume.value,
    categoryVolumes: categoryVolumes.value,
  });

  onBeforeUnmount(() => {
    stopAll();

    for (const element of audioElements.values()) {
      element.src = '';
      element.remove();
    }

    audioElements.clear();
  });

  return {
    enabled,
    masterVolume,
    categoryVolumes,
    activeSources,
    play,
    stop,
    stopAll,
    setEnabled,
    setMasterVolume,
    setCategoryVolume,
    getState,
  };
}
