import { ref } from 'vue'

export type AudioCategory =
    | 'bgm'
    | 'button'
    | 'hover'
    | 'transition'
    | 'enter'
    | 'characterVoice'
    | 'ambient'

export interface AudioPlaybackOptions {
    volume?: number
    loop?: boolean
    playbackRate?: number
}

export const DEFAULT_CATEGORY_VOLUMES: Record<AudioCategory, number> = {
    bgm: 0.6,
    button: 0.55,
    hover: 0.35,
    transition: 0.45,
    enter: 0.6,
    characterVoice: 0.7,
    ambient: 0.4,
}

//========================
// BGM Resource
//========================
const DEFAULT_BGM =
    '/audio/bgm/lnplusmusic-cyberpunk-futuristic-city-music-323171.mp3'

//========================
// Singleton State
//========================
const enabled = ref(false)
const masterVolume = ref(0.7)
const categoryVolumes = ref<Record<AudioCategory, number>>({
    ...DEFAULT_CATEGORY_VOLUMES,
})

const activeSources = ref<Record<AudioCategory, string | null>>({
    bgm: null,
    button: null,
    hover: null,
    transition: null,
    enter: null,
    characterVoice: null,
    ambient: null,
})

const audioElements = new Map<AudioCategory, HTMLAudioElement>()

//========================

function getEffectiveVolume(category: AudioCategory) {
    return Math.min(
        1,
        Math.max(
            0,
            masterVolume.value *
            (categoryVolumes.value[category] ?? 1)
        )
    )
}

function getAudio(category: AudioCategory) {
    let audio = audioElements.get(category)

    if (!audio) {
        audio = new Audio()
        audio.preload = 'auto'
        audioElements.set(category, audio)
    }

    return audio
}

function applyVolume(category: AudioCategory) {
    const audio = audioElements.get(category)

    if (!audio) return

    audio.volume = enabled.value
        ? getEffectiveVolume(category)
        : 0
}

export function useAudioManager() {

    function play(
        category: AudioCategory,
        src: string,
        options: AudioPlaybackOptions = {}
    ) {
        const audio = getAudio(category)
        // 只有當 enabled 為 false 時才阻擋播放
        if (!enabled.value) return
        // 已經播放同一首，不重新播放
        if (
            activeSources.value[category] === src &&
            !audio.paused
        ) {
            return
        }

        audio.pause()
        audio.src = src
        audio.currentTime = 0
        audio.loop = options.loop ?? false
        audio.playbackRate =
            options.playbackRate ?? 1

        audio.volume =
            options.volume ??
            getEffectiveVolume(category)

        activeSources.value[category] = src
        audio.play().catch(console.warn)
    }

    function stop(category: AudioCategory) {
        const audio = audioElements.get(category)

        if (!audio) return
        audio.pause()
        audio.currentTime = 0
        activeSources.value[category] = null
    }

    function stopAll() {
        audioElements.forEach((audio) => {
            audio.pause()
            audio.currentTime = 0
        })

        Object.keys(activeSources.value).forEach((key) => {
            activeSources.value[key as AudioCategory] = null
        })
    }

    function setEnabled(value: boolean) {
        enabled.value = value

        if (!value) {
            // 如果設為 false，停止所有聲音
            stopAll()
        } else {
            // 如果設為 true，自動恢復播放 BGM
            // 注意：這裡直接呼叫 playBgm()，它會處理 loop 和路徑
            playBgm()

            // 確保其他類別的音量也正確應用（如果之前有在播放的話）
            audioElements.forEach((_, category) => {
                applyVolume(category)
            })
        }
    }

    function setMasterVolume(value: number) {
        masterVolume.value = Math.min(
            1,
            Math.max(0, value)
        )
        audioElements.forEach((_, category) => {
            applyVolume(category)
        })
    }

    function setCategoryVolume(
        category: AudioCategory,
        value: number
    ) {
        categoryVolumes.value[category] = Math.min(
            1,
            Math.max(0, value)
        )
        applyVolume(category)
    }

    function playBgm() {
        play(
            'bgm',
            DEFAULT_BGM,
            {
                loop: true
            }
        )
    }

    function isPlaying(category: AudioCategory) {
        const audio = audioElements.get(category)
        if (!audio) return false
        return !audio.paused
    }

    return {
        enabled,
        masterVolume,
        categoryVolumes,
        activeSources,
        playBgm,
        play,
        stop,
        stopAll,
        setEnabled,
        setMasterVolume,
        setCategoryVolume,
        isPlaying,
    }
}