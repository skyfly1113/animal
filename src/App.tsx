import React, { useState, useEffect } from 'react';
import { CountingStyle, StickerReward, AnimalId } from './types/game';
import { INITIAL_STICKERS } from './data/animals';
import { TouchCountGame } from './components/TouchCountGame';
import { FeedAnimalGame } from './components/FeedAnimalGame';
import { CountQuizGame } from './components/CountQuizGame';
import { NumberCardGame } from './components/NumberCardGame';
import { AnimalPianoGame } from './components/AnimalPianoGame';
import { StickerBookModal } from './components/StickerBookModal';
import {
  toggleBgm,
  getIsBgmPlaying,
  setMuteAll,
  getIsMuted,
  playPopSound,
  playSuccessSound,
  speakWord,
  getAudioContext,
} from './utils/audio';
import {
  Volume2,
  VolumeX,
  Music,
  Star,
  BookOpen,
  Sparkles,
  Hand,
  Trophy,
} from 'lucide-react';

type GameTab = 'touch' | 'feed' | 'quiz' | 'cards' | 'piano';

export default function App() {
  const [activeTab, setActiveTab] = useState<GameTab>('touch');
  const [countingStyle, setCountingStyle] = useState<CountingStyle>('native');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBgmOn, setIsBgmOn] = useState<boolean>(false);
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('toddler_stars');
    return saved ? parseInt(saved, 10) : 5;
  });
  const [stickers, setStickers] = useState<StickerReward[]>(() => {
    const saved = localStorage.getItem('toddler_stickers');
    return saved ? JSON.parse(saved) : INITIAL_STICKERS;
  });
  const [showStickerBook, setShowStickerBook] = useState<boolean>(false);
  const [hasStartedAudio, setHasStartedAudio] = useState<boolean>(false);

  // Sync state
  useEffect(() => {
    localStorage.setItem('toddler_stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('toddler_stickers', JSON.stringify(stickers));
  }, [stickers]);

  const handleEarnStar = (animalId: AnimalId) => {
    setStars((prev) => prev + 1);

    // Unlock sticker for this animal if locked
    setStickers((prev) =>
      prev.map((s) => {
        if (s.animalId === animalId && !s.isUnlocked) {
          return {
            ...s,
            isUnlocked: true,
            dateEarned: new Date().toLocaleDateString(),
          };
        }
        return s;
      })
    );
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setMuteAll(nextMuted);
    if (nextMuted) {
      setIsBgmOn(false);
    }
  };

  const handleToggleBgm = () => {
    // initialize context on click
    getAudioContext();
    const playing = toggleBgm();
    setIsBgmOn(playing);
  };

  const handleTabChange = (tab: GameTab) => {
    getAudioContext();
    setHasStartedAudio(true);
    playPopSound();
    setActiveTab(tab);

    if (tab === 'touch') speakWord('콕콕 터치 수세기 놀이!');
    else if (tab === 'feed') speakWord('동물 친구 밥 주기 놀이!');
    else if (tab === 'quiz') speakWord('숫자 맞추기 퀴즈!');
    else if (tab === 'cards') speakWord('손가락과 숫자 카드!');
    else if (tab === 'piano') speakWord('동물 소리 오케스트라!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/60 text-slate-800 font-sans pb-10">
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-300 shadow-sm px-3 sm:px-6 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          {/* Logo & Brand */}
          <div
            onClick={() => {
              getAudioContext();
              speakWord('동물 친구 수세기 놀이터에 온 걸 환영해요!');
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-3xl sm:text-4xl animate-gentle-bounce group-hover:scale-110 transition-transform">
              🐰
            </span>
            <div>
              <h1 className="text-lg sm:text-2xl font-black text-amber-950 tracking-tight leading-tight">
                동물 친구 <span className="text-rose-500">수세기</span> 놀이
              </h1>
              <p className="hidden sm:block text-[11px] font-bold text-amber-700 -mt-0.5">
                귀여운 동물과 함께하는 신나는 수세기 학습
              </p>
            </div>
          </div>

          {/* Right Action Cluster: Stars, Sticker Book, BGM, Mute, Language */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Star Counter */}
            <div
              onClick={() => {
                playSuccessSound();
                speakWord(`별을 ${stars}개 모았어요! 참 잘했어요!`);
              }}
              className="bg-amber-100 border-2 border-amber-300 rounded-full px-2.5 sm:px-3 py-1 flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95 transition-transform shadow-xs"
              title="모은 별"
            >
              <span className="text-amber-500 text-base sm:text-lg">⭐</span>
              <span className="font-black text-amber-950 text-sm sm:text-base">
                {stars}
              </span>
            </div>

            {/* Sticker Book Button */}
            <button
              onClick={() => {
                getAudioContext();
                playPopSound();
                setShowStickerBook(true);
              }}
              className="bg-rose-100 hover:bg-rose-200 border-2 border-rose-300 rounded-full px-2.5 sm:px-3 py-1 flex items-center gap-1 text-rose-800 font-bold text-xs sm:text-sm shadow-xs transition-transform active:scale-95"
              title="동물 스티커북"
            >
              <BookOpen className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">스티커북</span>
            </button>

            {/* BGM Toggle Button */}
            <button
              onClick={handleToggleBgm}
              className={`p-2 rounded-full border-2 transition-transform active:scale-90 ${
                isBgmOn
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                  : 'bg-slate-100 border-slate-300 text-slate-500'
              }`}
              title={isBgmOn ? '배경음악 끄기' : '배경음악 켜기 (자장가 멜로디)'}
            >
              <Music className={`w-4 h-4 sm:w-5 sm:h-5 ${isBgmOn ? 'animate-wiggle' : ''}`} />
            </button>

            {/* Mute FX Toggle */}
            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-full border-2 transition-transform active:scale-90 ${
                !isMuted
                  ? 'bg-amber-100 border-amber-400 text-amber-900'
                  : 'bg-rose-100 border-rose-300 text-rose-600'
              }`}
              title={isMuted ? '소리 켜기' : '소리 끄기'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Secondary Subheader Bar: Counting Language Mode Selection */}
        <div className="max-w-5xl mx-auto pt-2 flex items-center justify-between gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1 text-amber-900 font-bold flex-shrink-0">
            <span>수세기 방식:</span>
          </div>
          <div className="flex items-center gap-1 p-0.5 bg-amber-100/80 rounded-xl">
            <button
              onClick={() => {
                setCountingStyle('native');
                playPopSound();
                speakWord('우리말 수세기 하나, 둘, 셋');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                countingStyle === 'native'
                  ? 'bg-white text-amber-950 shadow-xs'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              하나, 둘, 셋 (우리말)
            </button>
            <button
              onClick={() => {
                setCountingStyle('sino');
                playPopSound();
                speakWord('숫자 수세기 일, 이, 삼');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                countingStyle === 'sino'
                  ? 'bg-white text-amber-950 shadow-xs'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              일, 이, 삼 (숫자)
            </button>
            <button
              onClick={() => {
                setCountingStyle('english');
                playPopSound();
                speakWord('One, Two, Three', 'en-US');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                countingStyle === 'english'
                  ? 'bg-white text-amber-950 shadow-xs'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              One, Two, Three (영어)
            </button>
          </div>
        </div>
      </header>

      {/* Mode Navigation Tabs (5 Game Modes) */}
      <nav className="w-full max-w-4xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-3 bg-amber-200/50 p-1.5 sm:p-2 rounded-3xl border-2 border-amber-300 shadow-inner">
          <button
            onClick={() => handleTabChange('touch')}
            className={`flex flex-col items-center justify-center py-2 sm:py-3 px-1 rounded-2xl transition-all ${
              activeTab === 'touch'
                ? 'toddler-btn-orange text-white scale-105 z-10'
                : 'bg-white/80 text-amber-900 hover:bg-white'
            }`}
          >
            <span className="text-xl sm:text-2xl">👆</span>
            <span className="font-black text-xs sm:text-sm mt-0.5 leading-tight text-center">
              콕콕 세기
            </span>
          </button>

          <button
            onClick={() => handleTabChange('feed')}
            className={`flex flex-col items-center justify-center py-2 sm:py-3 px-1 rounded-2xl transition-all ${
              activeTab === 'feed'
                ? 'toddler-btn-orange text-white scale-105 z-10'
                : 'bg-white/80 text-amber-900 hover:bg-white'
            }`}
          >
            <span className="text-xl sm:text-2xl">🥕</span>
            <span className="font-black text-xs sm:text-sm mt-0.5 leading-tight text-center">
              밥 주기
            </span>
          </button>

          <button
            onClick={() => handleTabChange('quiz')}
            className={`flex flex-col items-center justify-center py-2 sm:py-3 px-1 rounded-2xl transition-all ${
              activeTab === 'quiz'
                ? 'toddler-btn-orange text-white scale-105 z-10'
                : 'bg-white/80 text-amber-900 hover:bg-white'
            }`}
          >
            <span className="text-xl sm:text-2xl">❓</span>
            <span className="font-black text-xs sm:text-sm mt-0.5 leading-tight text-center">
              숫자 퀴즈
            </span>
          </button>

          <button
            onClick={() => handleTabChange('cards')}
            className={`flex flex-col items-center justify-center py-2 sm:py-3 px-1 rounded-2xl transition-all ${
              activeTab === 'cards'
                ? 'toddler-btn-orange text-white scale-105 z-10'
                : 'bg-white/80 text-amber-900 hover:bg-white'
            }`}
          >
            <span className="text-xl sm:text-2xl">🖐️</span>
            <span className="font-black text-xs sm:text-sm mt-0.5 leading-tight text-center">
              손가락 카드
            </span>
          </button>

          <button
            onClick={() => handleTabChange('piano')}
            className={`flex flex-col items-center justify-center py-2 sm:py-3 px-1 rounded-2xl transition-all ${
              activeTab === 'piano'
                ? 'toddler-btn-orange text-white scale-105 z-10'
                : 'bg-white/80 text-amber-900 hover:bg-white'
            }`}
          >
            <span className="text-xl sm:text-2xl">🎹</span>
            <span className="font-black text-xs sm:text-sm mt-0.5 leading-tight text-center">
              소리 건반
            </span>
          </button>
        </div>
      </nav>

      {/* Main Game Screen */}
      <main className="flex-1 w-full flex flex-col items-center mt-2">
        {activeTab === 'touch' && (
          <TouchCountGame
            countingStyle={countingStyle}
            onEarnStar={handleEarnStar}
          />
        )}

        {activeTab === 'feed' && (
          <FeedAnimalGame
            countingStyle={countingStyle}
            onEarnStar={handleEarnStar}
          />
        )}

        {activeTab === 'quiz' && (
          <CountQuizGame
            countingStyle={countingStyle}
            onEarnStar={handleEarnStar}
          />
        )}

        {activeTab === 'cards' && (
          <NumberCardGame countingStyle={countingStyle} />
        )}

        {activeTab === 'piano' && (
          <AnimalPianoGame onEarnStar={handleEarnStar} />
        )}
      </main>

      {/* Sticker Book Modal */}
      {showStickerBook && (
        <StickerBookModal
          stickers={stickers}
          onClose={() => setShowStickerBook(false)}
        />
      )}
    </div>
  );
}
