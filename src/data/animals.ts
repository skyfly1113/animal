import { AnimalData } from '../types/game';

export const ANIMALS: AnimalData[] = [
  {
    id: 'bunny',
    name: '토끼',
    englishName: 'Bunny',
    emoji: '🐰',
    color: '#FDA4AF',
    badgeBg: 'bg-rose-100 border-rose-300 text-rose-700',
    soundName: '깡총깡총!',
    favoriteFood: {
      id: 'carrot',
      name: '당근',
      emoji: '🥕',
      color: '#EA580C'
    },
    greeting: '안녕! 나는 깡총 토끼야!'
  },
  {
    id: 'bear',
    name: '곰돌이',
    englishName: 'Bear',
    emoji: '🐻',
    color: '#D97706',
    badgeBg: 'bg-amber-100 border-amber-300 text-amber-800',
    soundName: '어흥 꿀꿀!',
    favoriteFood: {
      id: 'honey',
      name: '꿀단지',
      emoji: '🍯',
      color: '#F59E0B'
    },
    greeting: '안녕! 달콤한 꿀을 좋아하는 곰돌이야!'
  },
  {
    id: 'puppy',
    name: '강아지',
    englishName: 'Puppy',
    emoji: '🐶',
    color: '#F59E0B',
    badgeBg: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    soundName: '멍멍!',
    favoriteFood: {
      id: 'bone',
      name: '뼈다귀',
      emoji: '🦴',
      color: '#E5E7EB'
    },
    greeting: '멍멍! 신나게 뛰어노는 강아지야!'
  },
  {
    id: 'kitten',
    name: '고양이',
    englishName: 'Kitten',
    emoji: '🐱',
    color: '#FB923C',
    badgeBg: 'bg-orange-100 border-orange-300 text-orange-800',
    soundName: '야옹~',
    favoriteFood: {
      id: 'fish',
      name: '물고기',
      emoji: '🐟',
      color: '#38BDF8'
    },
    greeting: '야옹~ 반가워! 낮잠을 좋아하는 고양이야!'
  },
  {
    id: 'duck',
    name: '오리',
    englishName: 'Duck',
    emoji: '🦆',
    color: '#FBBF24',
    badgeBg: 'bg-yellow-100 border-amber-300 text-amber-800',
    soundName: '꽥꽥!',
    favoriteFood: {
      id: 'corn',
      name: '옥수수',
      emoji: '🌽',
      color: '#EAB308'
    },
    greeting: '꽥꽥! 둥둥 헤엄치는 아기 오리야!'
  },
  {
    id: 'frog',
    name: '개구리',
    englishName: 'Frog',
    emoji: '🐸',
    color: '#4ADE80',
    badgeBg: 'bg-emerald-100 border-emerald-300 text-emerald-800',
    soundName: '개굴개굴!',
    favoriteFood: {
      id: 'lily',
      name: '연꽃씨',
      emoji: '🪷',
      color: '#F472B6'
    },
    greeting: '개굴개굴! 높이높이 뛰는 초록 개구리야!'
  },
  {
    id: 'lion',
    name: '아기 사자',
    englishName: 'Baby Lion',
    emoji: '🦁',
    color: '#F97316',
    badgeBg: 'bg-amber-100 border-orange-300 text-orange-800',
    soundName: '어흥!',
    favoriteFood: {
      id: 'apple',
      name: '빨간 사과',
      emoji: '🍎',
      color: '#EF4444'
    },
    greeting: '어흥! 멋쟁이 왕자 아기 사자야!'
  },
  {
    id: 'panda',
    name: '판다',
    englishName: 'Panda',
    emoji: '🐼',
    color: '#64748B',
    badgeBg: 'bg-slate-100 border-slate-300 text-slate-800',
    soundName: '우걱우걱!',
    favoriteFood: {
      id: 'bamboo',
      name: '대나무',
      emoji: '🎋',
      color: '#10B981'
    },
    greeting: '안녕! 데굴데굴 구르기 좋아하는 판다야!'
  },
  {
    id: 'penguin',
    name: '펭귄',
    englishName: 'Penguin',
    emoji: '🐧',
    color: '#0284C7',
    badgeBg: 'bg-sky-100 border-sky-300 text-sky-800',
    soundName: '뒤뚱뒤뚱!',
    favoriteFood: {
      id: 'shrimp',
      name: '새우',
      emoji: '🦐',
      color: '#F87171'
    },
    greeting: '뒤뚱뒤뚱! 얼음나라에서 온 꼬마 펭귄이야!'
  },
  {
    id: 'monkey',
    name: '원숭이',
    englishName: 'Monkey',
    emoji: '🐵',
    color: '#B45309',
    badgeBg: 'bg-orange-100 border-amber-300 text-amber-800',
    soundName: '우끼끼!',
    favoriteFood: {
      id: 'banana',
      name: '바나나',
      emoji: '🍌',
      color: '#FACC15'
    },
    greeting: '우끼끼! 나무 타기 대장 장난꾸러기 원숭이야!'
  }
];

export const INITIAL_STICKERS = ANIMALS.map((a, idx) => ({
  id: `sticker-${a.id}`,
  name: `${a.name} 스티커`,
  animalId: a.id,
  title: idx < 3 ? '기본 획득!' : '수세기 미션 성공!',
  isUnlocked: idx < 3,
  sparkleColor: a.color
}));
