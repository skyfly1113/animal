import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AnimalData, AnimalId, CountingStyle } from '../types/game';
import { ANIMALS } from '../data/animals';
import { AnimalCharacter } from './AnimalCharacter';
import {
  playCountSound,
  playAnimalSound,
  playSuccessSound,
  playOopsSound,
  speakWord,
  NATIVE_KOREAN_NUMS,
  SINO_KOREAN_NUMS,
  ENGLISH_NUMS,
} from '../utils/audio';
import { RotateCcw, ArrowRight, Volume2, HelpCircle } from 'lucide-react';

interface CountQuizGameProps {
  countingStyle: CountingStyle;
  onEarnStar: (animalId: AnimalId) => void;
}

export const CountQuizGame: React.FC<CountQuizGameProps> = ({ countingStyle, onEarnStar }) => {
  const [animal, setAnimal] = useState<AnimalData>(ANIMALS[0]);
  const [actualCount, setActualCount] = useState<number>(3);
  const [options, setOptions] = useState<number[]>([]);
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    generateNewQuiz();
  }, []);

  const generateNewQuiz = () => {
    // Pick random animal
    const randomAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    // Pick count between 2 and 7 (great range for toddlers)
    const count = Math.floor(Math.random() * 6) + 2;

    // Generate 3 unique options including the actualCount
    const opts = new Set<number>([count]);
    while (opts.size < 3) {
      const delta = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
      const candidate = count + delta;
      if (candidate >= 1 && candidate <= 9 && candidate !== count) {
        opts.add(candidate);
      } else {
        const fallback = Math.floor(Math.random() * 8) + 1;
        opts.add(fallback);
      }
    }

    const shuffled = Array.from(opts).sort(() => Math.random() - 0.5);

    setAnimal(randomAnimal);
    setActualCount(count);
    setOptions(shuffled);
    setTappedIndices([]);
    setSelectedAnswer(null);
    setIsCorrect(null);

    // Speak question
    speakWord(`귀여운 ${randomAnimal.name}가 몇 마리 있을까요?`);
  };

  const handleAnimalTap = (index: number) => {
    if (!tappedIndices.includes(index)) {
      const nextTapped = [...tappedIndices, index];
      setTappedIndices(nextTapped);
      const tapNumber = nextTapped.length;

      playCountSound(tapNumber);
      setTimeout(() => {
        playAnimalSound(animal.id);
      }, 100);

      const word =
        countingStyle === 'english'
          ? ENGLISH_NUMS[tapNumber - 1]
          : countingStyle === 'sino'
          ? SINO_KOREAN_NUMS[tapNumber - 1]
          : NATIVE_KOREAN_NUMS[tapNumber - 1];
      speakWord(word);
    } else {
      playAnimalSound(animal.id);
    }
  };

  const handleSelectOption = (choice: number) => {
    if (isCorrect) return;

    setSelectedAnswer(choice);
    if (choice === actualCount) {
      setIsCorrect(true);
      playSuccessSound();
      onEarnStar(animal.id);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}

      const praiseWord =
        countingStyle === 'english'
          ? `That's right! There are ${actualCount} ${animal.englishName}s! Great job!`
          : `딩동댕! 정답이에요! ${animal.name}가 ${actualCount}마리 있어요! 최고예요!`;
      speakWord(praiseWord);
    } else {
      setIsCorrect(false);
      playOopsSound();
      speakWord('다시 한번 세어볼까요? 동물을 콕콕 눌러보세요!');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-3 sm:p-4">
      {/* Quiz Prompt Banner */}
      <div className="w-full bg-white/95 rounded-3xl p-3 sm:p-4 shadow-md border-2 border-amber-200 mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-3xl">{animal.emoji}</span>
          <div>
            <h2 className="text-amber-950 font-black text-base sm:text-lg">
              {animal.name}가 몇 마리 있을까요?
            </h2>
            <p className="text-amber-700 font-bold text-xs">
              동물을 누르면 숫자를 세어줘요! 다 센 후 아래 정답을 골라보세요.
            </p>
          </div>
        </div>

        <button
          onClick={() => speakWord(`귀여운 ${animal.name}가 몇 마리 있을까요?`)}
          className="p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full transition-colors flex-shrink-0"
          title="질문 다시 듣기"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Play Stage */}
      <div className="relative w-full min-h-[360px] sm:min-h-[420px] rounded-3xl overflow-hidden shadow-xl border-4 border-amber-300 bg-gradient-to-b from-teal-100 via-sky-50 to-emerald-100 flex flex-col justify-between p-4">
        {/* Helper Badge */}
        <div className="relative z-10 self-start bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal-900 shadow-xs flex items-center gap-1">
          <HelpCircle className="w-4 h-4 text-teal-600" />
          <span>직접 눌러서 세어본 수: {tappedIndices.length} 마리</span>
        </div>

        {/* Animals Group */}
        <div className="relative z-10 my-auto py-4 w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {Array.from({ length: actualCount }).map((_, index) => {
            const tapOrder = tappedIndices.indexOf(index);
            const isTapped = tapOrder !== -1;
            return (
              <div key={index} className="flex flex-col items-center">
                <AnimalCharacter
                  animalId={animal.id}
                  size={actualCount <= 4 ? 130 : 95}
                  isCounted={isTapped}
                  countedNumber={isTapped ? tapOrder + 1 : undefined}
                  isHappy={isCorrect === true || isTapped}
                  onClick={() => handleAnimalTap(index)}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Options: 3 Big Chunky Number Buttons */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <span className="text-emerald-950 font-black text-sm mb-2">
            알맞은 숫자를 콕 눌러주세요! 👇
          </span>
          <div className="flex items-center justify-center gap-3 sm:gap-6 w-full max-w-md">
            {options.map((opt) => {
              const isChosen = selectedAnswer === opt;
              let btnStyle = 'toddler-btn-yellow text-amber-950';

              if (isChosen) {
                if (isCorrect === true) {
                  btnStyle = 'toddler-btn-green text-white scale-110';
                } else if (isCorrect === false) {
                  btnStyle = 'toddler-btn-pink text-white';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className={`flex-1 h-16 sm:h-20 rounded-3xl font-black text-3xl sm:text-4xl transition-all flex items-center justify-center ${btnStyle} hover:scale-105 active:scale-95`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Correct Celebration Overlay */}
        {isCorrect && (
          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-pop-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border-4 border-emerald-400 flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mb-3 animate-gentle-bounce">
                🎉
              </div>
              <h3 className="text-2xl font-black text-emerald-950 mb-1">정답이에요!</h3>
              <p className="text-emerald-800 font-bold text-sm mb-4">
                {animal.name}가 {actualCount}마리 맞아요! ⭐
              </p>

              <button
                onClick={generateNewQuiz}
                className="w-full toddler-btn-green py-3.5 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-2"
              >
                다음 문제 풀기
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 text-center text-amber-800/80 font-bold text-xs sm:text-sm">
        💡 팁: 동물이 몇 마리인지 헷갈리면 동물을 직접 하나씩 눌러보세요!
      </div>
    </div>
  );
};
