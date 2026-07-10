import { useAudioManager } from './useAudioManager';

const { play, stop } = useAudioManager();

// BGM
play('bgm', '/audio/bgm/main-theme.mp3', { loop: true, volume: 0.8 });

// 按鈕音效
play('button', '/audio/sfx/button-click.mp3');

// Hover 音效
play('hover', '/audio/sfx/hover.mp3');

// 轉場音效
play('transition', '/audio/sfx/page-transition.mp3');

// 角色語音
play('characterVoice', '/audio/sfx/character-voice.mp3');

// 停止背景音樂
stop('bgm');
