import React, { useState } from 'react';
import { CountingStyle } from '../types/game';
import { ANIMALS } from '../data/animals';
import { AnimalCharacter } from './AnimalCharacter';
import { IllustratedHand } from './IllustratedHand';
import {
  playCountSound,
  playAnimalSound,
  speakWord,
  NATIVE_KOREAN_NUMS,
  SINO_KOREAN_NUMS,
  ENGLISH_NUMS,
} from '../utils/audio';
import { ChevronLeft, ChevronRight, Volume2, Sparkles } from 'lucide-react';

interface NumberCardGameProps {
  countingStyle: CountingStyle;
}

export const NumberCardGame: React.FC<NumberCardGameProps> = ({ countingStyle }) => {
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const animal = ANIMALS[(currentNumber - 1) % ANIMALS.length];

  const nativeWord = NATIVE_KOREAN_NUMS[currentNumber - 1] || `${currentNumber}`;
  const sinoWord = SINO_KOREAN_NUMS[currentNumber - 1] || `${currentNumber}`;
  const engWord = ENGLISH_NUMS[currentNumber - 1] || `${currentNumber}`;

  const handleSpeakCard = () => {
    playCountSound(currentNumber);
    setTimeout(() => {
      if (countingStyle === 'english') {
        speakWord(`${engWord}! ${currentNumber} ${animal.englishName}s`, 'en-US');
      } else if (countingStyle === 'sino') {
        speakWord(`${sinoWord}! 숫자 ${currentNumber}!`, 'ko-KR');
      } else {
        speakWord(`${nativeWord}! ${animal.name} ${nativeWord} 마리!`, 'ko-KR');
      }
    }, 150);
  };

  const handlePrev = () => {
    const next = currentNumber <= 1 ? 10 : currentNumber - 1;
    setCurrentNumber(next);
    playCountSound(next);
  };

  const handleNext = () => {
    const next = currentNumber >= 10 ? 1 : currentNumber + 1;
    setCurrentNumber(next);
    playCountSound(next);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-3 sm:p-4">
      {/* Number Slider / Indicator */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl p-3 shadow-md border-2 border-amber-200 mb-4 flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-amber-900 font-bold text-xs sm:text-sm whitespace-nowrap">
          숫자 바로가기:
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: 10 }).map((_, i) => {
            const num = i + 1;
            const isSel = num === currentNumber;
            return (
              <button
                key={num}
                onClick={() => {
                  setCurrentNumber(num);
                  playCountSound(num);
                }}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl font-black text-base sm:text-lg transition-all flex items-center justify-center ${
                  isSel
                    ? 'toddler-btn-orange text-white scale-110'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Flashcard Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-amber-300 p-5 sm:p-8 flex flex-col items-center">
        {/* Card Header: Numeral & Finger visual */}
        <div className="w-full flex items-center justify-between gap-4 border-b-2 border-amber-100 pb-4">
          {/* Big Chunky Number */}
          <div
            onClick={handleSpeakCard}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-400 border-4 border-amber-500 shadow-lg flex items-center justify-center text-amber-950 font-black text-5xl sm:text-6xl group-hover:scale-105 active:scale-95 transition-transform">
              {currentNumber}
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-amber-950 font-black text-2xl sm:text-3xl">
                  {nativeWord}
                </span>
                <span className="text-amber-700 font-bold text-base sm:text-lg">
                  ({sinoWord})
                </span>
              </div>
              <span className="text-rose-600 font-extrabold text-sm sm:text-base">
                {engWord}
              </span>
            </div>
          </div>

          {/* Finger Representation */}
          <div className="flex flex-col items-center bg-amber-50 rounded-2xl p-2 border border-amber-200">
            <IllustratedHand count={currentNumber} size={70} />
            <span className="text-xs font-bold text-amber-800 mt-1">손가락 {currentNumber}개</span>
          </div>
        </div>

        {/* Animals Display matching the number */}
        <div className="my-6 w-full flex flex-wrap items-center justify-center gap-3 sm:gap-4 min-h-[160px]">
          {Array.from({ length: currentNumber }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center transition-transform hover:scale-110 active:scale-95"
            >
              <AnimalCharacter
                animalId={animal.id}
                size={currentNumber <= 3 ? 120 : currentNumber <= 6 ? 85 : 68}
                isCounted={true}
                countedNumber={idx + 1}
                onClick={() => {
                  playCountSound(idx + 1);
                  playAnimalSound(animal.id);
                }}
              />
            </div>
          ))}
        </div>

        {/* Listen Pronunciation Button */}
        <button
          onClick={handleSpeakCard}
          className="toddler-btn-yellow px-6 py-3 rounded-2xl text-amber-950 font-black text-base sm:text-lg flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
        >
          <Volume2 className="w-6 h-6" />
          <span>소리 듣기 (발음)</span>
        </button>

        {/* Prev & Next Floating Buttons */}
        <div className="w-full flex items-center justify-between mt-6 pt-4 border-t-2 border-amber-100">
          <button
            onClick={handlePrev}
            className="toddler-btn-yellow px-4 py-2.5 rounded-2xl text-amber-950 font-bold text-sm sm:text-base flex items-center gap-1 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
            이전 숫자
          </button>

          <span className="text-amber-700 font-bold text-sm">
            {currentNumber} / 10
          </span>

          <button
            onClick={handleNext}
            className="toddler-btn-green px-4 py-2.5 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center gap-1 hover:scale-105 active:scale-95"
          >
            다음 숫자
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-3 text-center text-amber-800/80 font-bold text-xs sm:text-sm">
        💡 팁: 큰 숫자나 동물을 누르면 숫자를 읽어주고 소리를 내요!
      </div>
    </div>
  );
};
