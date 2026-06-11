import type { Character } from '../types/character';
import cute1Image from '../assets/images/Cute1.png';
import cute2Image from '../assets/images/Cute2.png';
import cute3Image from '../assets/images/Cute3.png';

export function useHomeCharacters() {
  const characters: Character[] = [
    { name: 'Character1', image: cute1Image, path: '/ssr/role' },
    { name: 'Character2', image: cute2Image, path: '/ssr/role' },
    { name: 'Character3', image: cute3Image, path: '/ssr/role' },
  ];

  return { characters };
}
