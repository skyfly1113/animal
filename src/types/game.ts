export type AnimalId =
  | 'bunny'
  | 'bear'
  | 'puppy'
  | 'kitten'
  | 'duck'
  | 'frog'
  | 'lion'
  | 'panda'
  | 'penguin'
  | 'monkey';

export type CountingStyle = 'native' | 'sino' | 'english';

export interface AnimalData {
  id: AnimalId;
  name: string;
  englishName: string;
  emoji: string;
  color: string;
  badgeBg: string;
  soundName: string; // e.g. "깡총깡총", "멍멍", "야옹"
  favoriteFood: {
    id: string;
    name: string;
    emoji: string;
    color: string;
  };
  greeting: string;
}

export interface StickerReward {
  id: string;
  name: string;
  animalId: AnimalId;
  title: string;
  dateEarned?: string;
  isUnlocked: boolean;
  sparkleColor: string;
}
