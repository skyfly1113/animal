import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AnimalData, AnimalId, CountingStyle } from '../types/game';
import { ANIMALS } from '../data/animals';
import { AnimalCharacter } from './AnimalCharacter';
import {
  playBiteSound,
  playAnimalSound,
  playSuccessSound,
  speakWord,
  NATIVE_KOREAN_NUMS,
  SINO_KOREAN_NUMS,
  ENGLISH_NUMS,
} from '../utils/audio';
import { RotateCcw, ArrowRight, Heart, Sparkles, Volume2 } from 'lucide-react';

interface FeedAnimalGameProps {
  countingStyle: CountingStyle;
  onEarnStar: (animalId: AnimalId) => void;
}

export const FeedAnimalGame: React.FC<FeedAnimalGameProps> = ({ countingStyle, onEarnStar }) => {
  const [animalIndex, setAnimalIndex] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number>(3);
  const [fedCount, setFedCount] = useState<number>(0);
  const [isEating, setIsEating] = useState<boolean>(false);
  const [isSatisfied, setIsSatisfied] = useState<boolean>(false);

  const animal = ANIMALS[animalIndex % ANIMALS.length];

  // Setup round
  useEffect(() => {
    initRound();
  }, [animalIndex, targetCount]);

  const initRound = () => {
    setFedCount(0);
    setIsEating(false);
    setIsSatisfied(false);

    const countWord =
      countingStyle === 'english'
        ? `${targetCount}`
        : countingStyle === 'sino'
        ? `${SINO_KOREAN_NUMS[targetCount - 1]}개`
        : `${NATIVE_KOREAN_NUMS[targetCount - 1]}개`;

    const promptText = `${animal.name}가 배고파요! ${animal.favoriteFood.name} ${countWord} 주세요!`;
    speakWord(promptText);
  };

  const handleFeedFood = () => {
    if (isSatisfied || fedCount >= targetCount) return;

    const nextFed = fedCount + 1;
    setFedCount(nextFed);
    setIsEating(true);

    playBiteSound();
    setTimeout(() => {
      setIsEating(false);
    }, 450);

    // Speak count
    let countSpoken = '';
    if (countingStyle === 'english') {
      countSpoken = `${ENGLISH_NUMS[nextFed - 1]}!`;
    } else if (countingStyle === 'sino') {
      countSpoken = `${SINO_KOREAN_NUMS[nextFed - 1]}개!`;
    } else {
      countSpoken = `${NATIVE_KOREAN_NUMS[nextFed - 1]}개!`;
    }
    speakWord(countSpoken);

    // Check if full
    if (nextFed === targetCount) {
      setTimeout(() => {
        setIsSatisfied(true);
        playAnimalSound(animal.id);
        playSuccessSound();
        onEarnStar(animal.id);

        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {}

        const thanksWord =
          countingStyle === 'english'
            ? `Yummy! I am so full! Thank you!`
            : `냠냠! 배불러요! ${animal.name}에게 밥을 다 주었어요! 고마워요!`;
        speakWord(thanksWord);
      }, 500);
    }
  };

  const handleNextAnimal = () => {
    const nextIdx = (animalIndex + 1) % ANIMALS.length;
    const nextTarget = Math.floor(Math.random() * 5) + 2; // 2 to 6 for feeding
    setAnimalIndex(nextIdx);
    setTargetCount(nextTarget);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-3 sm:p-4">
      {/* Top Animal Selector Bar */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl p-3 shadow-md border-2 border-amber-200 mb-4 flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-amber-900 font-bold text-xs sm:text-sm whitespace-nowrap">
          밥 줄 친구 고르기:
        </span>
        <div className="flex gap-1.5">
          {ANIMALS.map((a, idx) => (
            <button
              key={a.id}
              onClick={() => {
                setAnimalIndex(idx);
              }}
              className={`p-2 rounded-2xl transition-all ${
                animal.id === a.id
                  ? 'toddler-btn-orange scale-110 text-white'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
              }`}
              title={a.name}
            >
              <span className="text-xl sm:text-2xl">{a.emoji}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Dining Room Stage */}
      <div className="relative w-full min-h-[400px] sm:min-h-[460px] rounded-3xl overflow-hidden shadow-xl border-4 border-amber-300 bg-gradient-to-b from-amber-100 via-rose-50 to-orange-100 flex flex-col items-center justify-between p-4 sm:p-6">
        {/* Top Request Bubble */}
        <div className="relative z-10 w-full max-w-lg bg-white/95 rounded-3xl p-3 sm:p-4 border-3 border-amber-300 shadow-md flex items-center justify-between gap-3 animate-pop-in">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">{animal.favoriteFood.emoji}</span>
            <div>
              <p className="text-amber-950 font-black text-sm sm:text-base">
                {animal.name}: &quot;{animal.favoriteFood.name} {targetCount}개 주세요!&quot;
              </p>
              <p className="text-amber-700 font-bold text-xs">
                아래 먹이를 눌러서 그릇에 담아주세요
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const countWord =
                countingStyle === 'english'
                  ? `${targetCount}`
                  : `${NATIVE_KOREAN_NUMS[targetCount - 1]}개`;
              speakWord(`${animal.name}에게 ${animal.favoriteFood.name} ${countWord} 주세요!`);
            }}
            className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full transition-colors flex-shrink-0"
            title="다시 듣기"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Animal & Dining Table */}
        <div className="relative z-10 my-auto flex flex-col items-center">
          {/* Animal */}
          <div className="relative">
            <AnimalCharacter
              animalId={animal.id}
              size={150}
              isEating={isEating}
              isHappy={isSatisfied}
              onClick={() => playAnimalSound(animal.id)}
            />
          </div>

          {/* Plate / Bowl */}
          <div className="relative -mt-4 w-60 sm:w-72 h-20 sm:h-24 bg-white border-4 border-amber-300 rounded-[50px] shadow-lg flex items-center justify-center p-2">
            {fedCount === 0 ? (
              <span className="text-amber-400 font-bold text-xs sm:text-sm animate-pulse">
                🍽️ 빈 그릇 (먹이를 넣어주세요)
              </span>
            ) : (
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                {Array.from({ length: fedCount }).map((_, i) => (
                  <span
                    key={i}
                    className="text-2xl sm:text-3xl animate-pop-in transform hover:scale-125 transition-transform"
                  >
                    {animal.favoriteFood.emoji}
                  </span>
                ))}
              </div>
            )}

            {/* Bowl Counter Badge */}
            <div className="absolute -bottom-3 right-4 bg-amber-500 text-white font-black text-xs px-2.5 py-0.5 rounded-full shadow-sm">
              {fedCount} / {targetCount}
            </div>
          </div>
        </div>

        {/* Bottom Food Tray: Big Tactile Food Buttons */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-3 sm:p-4 border-2 border-amber-300 shadow-md flex items-center justify-center gap-3 sm:gap-4 flex-wrap max-w-md w-full">
            {Array.from({ length: Math.max(targetCount, 5) }).map((_, idx) => {
              const isUsed = idx < fedCount;
              return (
                <button
                  key={idx}
                  disabled={isUsed || isSatisfied}
                  onClick={handleFeedFood}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-all ${
                    isUsed
                      ? 'opacity-25 grayscale cursor-not-allowed scale-90'
                      : 'toddler-btn-orange hover:scale-110 active:scale-95'
                  }`}
                  title={`${animal.favoriteFood.name} 주기`}
                >
                  {animal.favoriteFood.emoji}
                </button>
              );
            })}
          </div>
        </div>

        {/* Satisfied Celebration Overlay */}
        {isSatisfied && (
          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-pop-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border-4 border-amber-400 flex flex-col items-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-3xl mb-3 animate-gentle-bounce">
                💖
              </div>
              <h3 className="text-2xl font-black text-amber-950 mb-1">배불러요!</h3>
              <p className="text-amber-800 font-bold text-sm mb-4">
                {animal.name}에게 {animal.favoriteFood.name} {targetCount}개를 모두 주었어요! ⭐
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={initRound}
                  className="flex-1 toddler-btn-yellow py-3 rounded-2xl text-amber-950 font-black text-base flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-5 h-5" />
                  다시 주기
                </button>
                <button
                  onClick={handleNextAnimal}
                  className="flex-1 toddler-btn-green py-3 rounded-2xl text-white font-black text-base flex items-center justify-center gap-1"
                >
                  다른 동물
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 text-center text-amber-800/80 font-bold text-xs sm:text-sm">
        💡 팁: 아래 먹이를 톡 누르면 와구와구 맛있게 먹으며 숫자를 세어요!
      </div>
    </div>
  );
};
