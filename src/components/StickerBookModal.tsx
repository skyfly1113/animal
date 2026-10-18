import React from 'react';
import { StickerReward } from '../types/game';
import { ANIMALS } from '../data/animals';
import { AnimalCharacter } from './AnimalCharacter';
import { playPopSound, playAnimalSound, speakWord } from '../utils/audio';
import { X, Sparkles, Award } from 'lucide-react';

interface StickerBookModalProps {
  stickers: StickerReward[];
  onClose: () => void;
}

export const StickerBookModal: React.FC<StickerBookModalProps> = ({ stickers, onClose }) => {
  const unlockedCount = stickers.filter((s) => s.isUnlocked).length;

  const handleTapSticker = (sticker: StickerReward) => {
    if (!sticker.isUnlocked) {
      playPopSound();
      speakWord('게임을 플레이해서 이 스티커를 모아보세요!');
      return;
    }

    const animal = ANIMALS.find((a) => a.id === sticker.animalId);
    playAnimalSound(sticker.animalId);
    if (animal) {
      speakWord(animal.greeting);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-pop-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-amber-300 p-5 sm:p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-amber-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">📒</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950">
                내 동물 스티커북
              </h2>
              <p className="text-amber-700 font-bold text-xs">
                모은 스티커: {unlockedCount} / {stickers.length} 개 ⭐
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-transform active:scale-90"
            title="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stickers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 my-2">
          {stickers.map((sticker) => {
            const animal = ANIMALS.find((a) => a.id === sticker.animalId) || ANIMALS[0];

            return (
              <div
                key={sticker.id}
                onClick={() => handleTapSticker(sticker)}
                className={`relative p-3 rounded-2xl border-2 flex flex-col items-center text-center cursor-pointer transition-all duration-200 ${
                  sticker.isUnlocked
                    ? 'bg-amber-50/80 border-amber-300 hover:scale-105 active:scale-95 shadow-md'
                    : 'bg-slate-100/70 border-dashed border-slate-300 opacity-60'
                }`}
              >
                {sticker.isUnlocked ? (
                  <>
                    <AnimalCharacter animalId={sticker.animalId} size={70} isHappy={true} />
                    <span className="mt-2 text-sm font-black text-amber-950">
                      {animal.name}
                    </span>
                    <span className="text-[11px] font-bold text-amber-700">
                      {sticker.title}
                    </span>
                    <div className="absolute top-2 right-2 text-amber-500 text-xs">
                      ✨
                    </div>
                  </>
                ) : (
                  <div className="h-28 flex flex-col items-center justify-center">
                    <span className="text-3xl grayscale mb-1">🔒</span>
                    <span className="text-xs font-bold text-slate-500">
                      미션 완료 시 오픈!
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t-2 border-amber-100 text-center">
          <p className="text-amber-800 font-bold text-xs sm:text-sm">
            💡 수세기 놀이나 먹이주기를 성공할 때마다 반짝이는 동물 스티커를 받아요!
          </p>
        </div>
      </div>
    </div>
  );
};
