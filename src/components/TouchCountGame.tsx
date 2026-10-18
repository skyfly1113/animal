import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AnimalData, AnimalId, CountingStyle } from '../types/game';
import { ANIMALS } from '../data/animals';
import { AnimalCharacter } from './AnimalCharacter';
import {
  playCountSound,
  playAnimalSound,
  playSuccessSound,
  speakNumberCount,
  speakWord,
  NATIVE_KOREAN_NUMS,
  SINO_KOREAN_NUMS,
  ENGLISH_NUMS,
} from '../utils/audio';
import { Sparkles, RotateCcw, ArrowRight, Volume2, Trophy } from 'lucide-react';

interface TouchCountGameProps {
  countingStyle: CountingStyle;
  onEarnStar: (animalId: AnimalId) => void;
}

interface AnimalItem {
  id: number;
  animal: AnimalData;
  countedOrder: number | null; // 1, 2, 3... or null
  rotation: number;
  xOffset: number;
}

export const TouchCountGame: React.FC<TouchCountGameProps> = ({ countingStyle, onEarnStar }) => {
  const [targetCount, setTargetCount] = useState<number>(3);
  const [selectedAnimalId, setSelectedAnimalId] = useState<AnimalId | 'mix'>('bunny');
  const [animalItems, setAnimalItems] = useState<AnimalItem[]>([]);
  const [currentCountedCount, setCurrentCountedCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Initialize animals when targetCount or selectedAnimalId changes
  useEffect(() => {
    resetGame(targetCount, selectedAnimalId);
  }, [targetCount, selectedAnimalId]);

  const resetGame = (count: number, animalChoice: AnimalId | 'mix') => {
    const items: AnimalItem[] = [];
    for (let i = 0; i < count; i++) {
      let animal: AnimalData;
      if (animalChoice === 'mix') {
        animal = ANIMALS[i % ANIMALS.length];
      } else {
        animal = ANIMALS.find((a) => a.id === animalChoice) || ANIMALS[0];
      }
      items.push({
        id: i,
        animal,
        countedOrder: null,
        rotation: (Math.random() - 0.5) * 8,
        xOffset: (Math.random() - 0.5) * 10,
      });
    }
    setAnimalItems(items);
    setCurrentCountedCount(0);
    setIsCompleted(false);

    // Speak initial prompt
    const chosenName = animalChoice === 'mix' ? '동물 친구들' : (ANIMALS.find(a => a.id === animalChoice)?.name || '친구들');
    speakWord(`화면의 ${chosenName}을 손으로 콕콕 터치해서 세어보세요!`);
  };

  const handleAnimalClick = (item: AnimalItem) => {
    if (item.countedOrder !== null) {
      // Already counted, still play happy animal sound!
      playAnimalSound(item.animal.id);
      return;
    }

    const nextCount = currentCountedCount + 1;
    setCurrentCountedCount(nextCount);

    // Update item
    setAnimalItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, countedOrder: nextCount } : it))
    );

    // Sounds
    playCountSound(nextCount);
    setTimeout(() => {
      playAnimalSound(item.animal.id);
    }, 120);

    // Speech
    speakNumberCount(nextCount, countingStyle, item.animal.name);

    // Check completion
    if (nextCount === targetCount) {
      setIsCompleted(true);
      onEarnStar(item.animal.id);

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#EC4899', '#3B82F6', '#8B5CF6'],
        });
      } catch {}

      setTimeout(() => {
        playSuccessSound();
        const finishWord =
          countingStyle === 'english'
            ? `Awesome! We counted all ${targetCount} animals!`
            : countingStyle === 'sino'
            ? `와아! ${targetCount}마리를 모두 세었어요! 최고예요!`
            : `와아! ${NATIVE_KOREAN_NUMS[targetCount - 1]} 마리를 모두 세었어요! 참 잘했어요!`;
        speakWord(finishWord);
      }, 350);
    }
  };

  const handleNextNumber = () => {
    const next = targetCount >= 10 ? 1 : targetCount + 1;
    setTargetCount(next);
  };

  const currentAnimal = ANIMALS.find((a) => a.id === selectedAnimalId);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-3 sm:p-4">
      {/* Top Controller: Count Target Selector */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl p-3 sm:p-4 shadow-md border-2 border-amber-200 mb-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Number Buttons 1 to 10 */}
        <div className="flex flex-col items-center md:items-start w-full">
          <span className="text-amber-900 font-bold text-sm mb-1.5 flex items-center gap-1.5">
            <span>몇 마리 세어볼까요? (숫자 선택)</span>
          </span>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const isSelected = targetCount === num;
              return (
                <button
                  key={num}
                  onClick={() => setTargetCount(num)}
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl font-black text-lg sm:text-xl transition-all flex items-center justify-center ${
                    isSelected
                      ? 'toddler-btn-orange text-white scale-110'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animal Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
          <button
            onClick={() => setSelectedAnimalId('mix')}
            className={`px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              selectedAnimalId === 'mix'
                ? 'toddler-btn-purple text-white'
                : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
            }`}
          >
            🌈 모두 섞기
          </button>
          {ANIMALS.slice(0, 6).map((animal) => {
            const isSel = selectedAnimalId === animal.id;
            return (
              <button
                key={animal.id}
                onClick={() => setSelectedAnimalId(animal.id)}
                className={`p-1.5 rounded-2xl transition-all ${
                  isSel
                    ? 'toddler-btn-yellow scale-110'
                    : 'bg-amber-50 hover:bg-amber-100 border border-amber-200'
                }`}
                title={animal.name}
              >
                <span className="text-2xl">{animal.emoji}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Play Stage */}
      <div className="relative w-full min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden shadow-xl border-4 border-amber-300 bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-200 flex flex-col justify-between p-4">
        {/* Sky Elements: Sunshine & Fluffy Clouds */}
        <div className="absolute top-3 left-4 flex items-center gap-2 pointer-events-none">
          <div className="w-12 h-12 bg-amber-300 border-4 border-amber-400 rounded-full animate-pulse-glow flex items-center justify-center text-xl">
            ☀️
          </div>
          <div className="bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-sky-800 shadow-sm">
            맑은 하늘 목장
          </div>
        </div>

        <div className="absolute top-6 right-8 text-white/90 text-4xl pointer-events-none animate-gentle-bounce">
          ☁️
        </div>
        <div className="absolute top-14 right-28 text-white/70 text-3xl pointer-events-none">
          ☁️
        </div>

        {/* Top Progress & Audio Guide Bar */}
        <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-2 bg-white/85 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border-2 border-emerald-300 shadow-sm mt-12 sm:mt-0">
          {/* Star Counting Progress */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span className="text-emerald-950 font-black text-sm mr-1">
              {currentCountedCount} / {targetCount}
            </span>
            {Array.from({ length: targetCount }).map((_, i) => (
              <span
                key={i}
                className={`text-xl sm:text-2xl transition-transform duration-300 ${
                  i < currentCountedCount ? 'scale-125 animate-pop-in' : 'opacity-35 grayscale'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>

          {/* Current Word Guide */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-amber-400 text-amber-950 rounded-full font-black text-sm sm:text-base shadow-sm">
              {currentCountedCount === 0
                ? '동물을 눌러보세요!'
                : countingStyle === 'english'
                ? ENGLISH_NUMS[currentCountedCount - 1]
                : countingStyle === 'sino'
                ? SINO_KOREAN_NUMS[currentCountedCount - 1]
                : NATIVE_KOREAN_NUMS[currentCountedCount - 1]}
            </div>
            <button
              onClick={() => {
                if (currentCountedCount > 0) {
                  speakNumberCount(currentCountedCount, countingStyle);
                } else {
                  speakWord('동물을 터치해서 세어보세요!');
                }
              }}
              className="p-1.5 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-full transition-colors"
              title="다시 듣기"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Animals Meadow Display */}
        <div className="relative z-10 my-auto py-6 w-full flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {animalItems.map((item) => {
            const isCounted = item.countedOrder !== null;
            return (
              <div
                key={item.id}
                style={{
                  transform: `rotate(${item.rotation}deg) translateX(${item.xOffset}px)`,
                }}
                className="transition-transform duration-300 flex flex-col items-center"
              >
                <AnimalCharacter
                  animalId={item.animal.id}
                  size={targetCount <= 4 ? 130 : targetCount <= 7 ? 105 : 88}
                  isCounted={isCounted}
                  countedNumber={item.countedOrder ?? undefined}
                  isHappy={isCounted}
                  onClick={() => handleAnimalClick(item)}
                />
                <span className="mt-1 text-xs font-bold text-emerald-900 bg-white/70 px-2 py-0.5 rounded-full shadow-xs">
                  {item.animal.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Grassy Meadow Bottom with Flowers */}
        <div className="relative z-10 w-full pt-2 flex items-center justify-between text-xl pointer-events-none opacity-80">
          <span>🌸 🌿</span>
          <span>🌻 🌼 🌿</span>
          <span>🌷 🌸</span>
        </div>

        {/* Completion Modal Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-pop-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border-4 border-amber-400 flex flex-col items-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl mb-3 animate-gentle-bounce">
                🎉
              </div>
              <h3 className="text-2xl font-black text-amber-950 mb-1">참 잘했어요!</h3>
              <p className="text-amber-800 font-bold text-sm mb-4">
                {currentAnimal?.name || '동물 친구'} {targetCount}마리를 모두 세었어요! ⭐
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => resetGame(targetCount, selectedAnimalId)}
                  className="flex-1 toddler-btn-yellow py-3 rounded-2xl text-amber-950 font-black text-base flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-5 h-5" />
                  다시 세기
                </button>
                <button
                  onClick={handleNextNumber}
                  className="flex-1 toddler-btn-green py-3 rounded-2xl text-white font-black text-base flex items-center justify-center gap-1"
                >
                  다음 숫자
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toddler Hint Footer */}
      <div className="mt-3 text-center text-amber-800/80 font-bold text-xs sm:text-sm">
        💡 팁: 동물을 손가락으로 콕 누르면 폴짝 뛰며 숫자를 소리로 들려줘요!
      </div>
    </div>
  );
};
