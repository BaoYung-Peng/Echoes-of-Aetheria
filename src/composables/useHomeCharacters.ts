import type { Character } from '../types/character';
import cute1Image from '../assets/images/Cute1.png';
import cute2Image from '../assets/images/Cute2.png';
import cute3Image from '../assets/images/Cute3.png';
import alter1Image from '../assets/images/Alter1.png';
import alter2Image from '../assets/images/Alter2.png';
import alter3Image from '../assets/images/Alter3.png';

export function useHomeCharacters() {
  const characters: Character[] = [
    { 
      name: 'Character1', 
      image: cute1Image, 
      alternateImage: alter1Image,
      path: '/ssr/role' 
    },
    { 
      name: 'Character2', 
      image: cute2Image, 
      alternateImage: alter2Image,
      path: '/ssr/role' 
    },
    { 
      name: 'Character3', 
      image: cute3Image, 
      alternateImage: alter3Image,
      path: '/ssr/role' 
    },
  ];

  return { characters };
}