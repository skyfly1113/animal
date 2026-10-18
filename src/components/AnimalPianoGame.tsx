import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AnimalId } from '../types/game';
import { ANIMALS } from '../data/animals';
import { AnimalCharacter } from './AnimalCharacter';
import {
  playPianoNote,
  playAnimalSound,
  playSuccessSound,
  speakWord,
} from '../utils/audio';
import { Music, Play, RotateCcw, Sparkles } from 'lucide-react';

interface PianoKey {
  noteIndex: number;
  pitchName: string;
  solfege: string;
  animalId: AnimalId;
  color: string;
  btnClass: string;
}

const PIANO_KEYS: PianoKey[] = [
  { noteIndex: 0, pitchName: 'C4', solfege: '1 도', animalId: 'bunny', color: '#EF4444', btnClass: 'toddler-btn-pink' },
  { noteIndex: 1, pitchName: 'D4', solfege: '2 레', animalId: 'bear', color: '#F97316', btnClass: 'toddler-btn-orange' },
  { noteIndex: 2, pitchName: 'E4', solfege: '3 미', animalId: 'puppy', color: '#EAB308', btnClass: 'toddler-btn-yellow' },
  { noteIndex: 3, pitchName: 'F4', solfege: '4 파', animalId: 'kitten', color: '#22C55E', btnClass: 'toddler-btn-green' },
  { noteIndex: 4, pitchName: 'G4', solfege: '5 솔', animalId: 'duck', color: '#06B6D4', btnClass: 'toddler-btn-blue' },
  { noteIndex: 5, pitchName: 'A4', solfege: '6 라', animalId: 'frog', color: '#3B82F6', btnClass: 'toddler-btn-blue' },
  { noteIndex: 6, pitchName: 'B4', solfege: '7 시', animalId: 'lion', color: '#8B5CF6', btnClass: 'toddler-btn-purple' },
  { noteIndex: 7, pitchName: 'C5', solfege: '8 높은도', animalId: 'panda', color: '#EC4899', btnClass: 'toddler-btn-pink' },
];

interface NurserySong {
  id: string;
  name: string;
  notes: number[]; // noteIndex 0 to 7
  lyrics: string[];
}

const NURSERY_SONGS: NurserySong[] = [
  {
    id: 'bear3',
    name: '🐻 곰 세 마리',
    notes: [0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 4, 4, 2, 0],
    lyrics: ['곰', '세', '마', '리', '가', '한', '집', '에', '있', '어', '아', '빠', '곰', '엄마곰'],
  },
  {
    id: 'bunny',
    name: '🐰 산토끼',
    notes: [4, 4, 2, 4, 7, 7, 4, 4, 2, 0, 2, 4, 0],
    lyrics: ['산', '토', '끼', '토', '끼', '야', '어', '디', '를', '가', '느', '냐'],
  },
  {
    id: 'star',
    name: '⭐ 작은 별',
    notes: [0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0],
    lyrics: ['반', '짝', '반', '짝', '작', '은', '별', '아', '름', '답', '게', '비', '치', '네'],
  },
];

interface AnimalPianoGameProps {
  onEarnStar: (animalId: AnimalId) => void;
}

export const AnimalPianoGame: React.FC<AnimalPianoGameProps> = ({ onEarnStar }) => {
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [selectedSong, setSelectedSong] = useState<NurserySong | null>(null);
  const [songStep, setSongStep] = useState<number>(0);
  const [isSongFinished, setIsSongFinished] = useState<boolean>(false);

  const handleKeyPress = (noteIndex: number, animalId: AnimalId) => {
    setActiveNote(noteIndex);
    playPianoNote(noteIndex);
    playAnimalSound(animalId);

    setTimeout(() => {
      setActiveNote(null);
    }, 250);

    // If song mode is active, check note
    if (selectedSong && !isSongFinished) {
      const expectedNote = selectedSong.notes[songStep];
      if (noteIndex === expectedNote) {
        const nextStep = songStep + 1;
        if (nextStep >= selectedSong.notes.length) {
          setIsSongFinished(true);
          playSuccessSound();
          onEarnStar(animalId);
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch {}
          speakWord(`우와! ${selectedSong.name} 연주를 멋지게 완성했어요!`);
        } else {
          setSongStep(nextStep);
        }
      }
    }
  };

  const startSong = (song: NurserySong) => {
    setSelectedSong(song);
    setSongStep(0);
    setIsSongFinished(false);
    speakWord(`반짝이는 불빛을 따라 ${song.name}를 연주해볼까요?`);
  };

  const stopSongMode = () => {
    setSelectedSong(null);
    setSongStep(0);
    setIsSongFinished(false);
  };

  const targetNoteIndex = selectedSong && !isSongFinished ? selectedSong.notes[songStep] : null;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-3 sm:p-4">
      {/* Top Song Selector Bar */}
      <div className="w-full bg-white/95 rounded-3xl p-3 sm:p-4 shadow-md border-2 border-amber-200 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Music className="w-6 h-6 text-amber-600" />
          <span className="text-amber-950 font-black text-sm sm:text-base">
            {selectedSong ? `동요 연주 모드: ${selectedSong.name}` : '자유 연주 & 동물 소리 건반'}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          {selectedSong ? (
            <button
              onClick={stopSongMode}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full font-bold text-xs"
            >
              자유 연주로 돌아가기
            </button>
          ) : (
            <>
              <span className="text-xs font-bold text-amber-800">동요 따라하기:</span>
              {NURSERY_SONGS.map((song) => (
                <button
                  key={song.id}
                  onClick={() => startSong(song)}
                  className="px-3 py-1.5 rounded-full font-bold text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-transform active:scale-95"
                >
                  {song.name}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Guide Banner for Song Mode */}
      {selectedSong && !isSongFinished && (
        <div className="w-full bg-amber-100/90 rounded-2xl p-2.5 mb-3 border-2 border-amber-300 text-center flex items-center justify-center gap-3">
          <span className="text-xl animate-bounce">👇</span>
          <span className="text-amber-950 font-black text-sm sm:text-base">
            반짝이는{' '}
            <span className="text-rose-600 font-black underline">
              {PIANO_KEYS[targetNoteIndex ?? 0].solfege}
            </span>{' '}
            동물을 톡 눌러주세요! ({songStep + 1} / {selectedSong.notes.length})
          </span>
          <span className="bg-white px-2.5 py-0.5 rounded-full text-xs font-bold text-amber-900 shadow-xs">
            가사: &quot;{selectedSong.lyrics[songStep]}&quot;
          </span>
        </div>
      )}

      {/* Piano Stage with 8 Animal Pedestals */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border-4 border-amber-300 bg-gradient-to-b from-indigo-100 via-sky-50 to-pink-100 p-4 sm:p-6 flex flex-col items-center">
        {/* Rainbow Stage Arch Header */}
        <div className="w-full flex items-center justify-center gap-2 mb-4 pointer-events-none">
          <span className="text-xl">🌈</span>
          <span className="text-amber-950 font-black text-base sm:text-lg">
            동물 소리 오케스트라 무대
          </span>
          <span className="text-xl">🎶</span>
        </div>

        {/* 8 Animal Keys */}
        <div className="w-full grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3 py-2">
          {PIANO_KEYS.map((key) => {
            const isTarget = targetNoteIndex === key.noteIndex;
            const isPlaying = activeNote === key.noteIndex;
            const animal = ANIMALS.find((a) => a.id === key.animalId) || ANIMALS[0];

            return (
              <div
                key={key.noteIndex}
                onClick={() => handleKeyPress(key.noteIndex, key.animalId)}
                className={`relative flex flex-col items-center p-2 rounded-2xl transition-all duration-150 cursor-pointer select-none bg-white/80 border-2 ${
                  isTarget
                    ? 'border-yellow-400 ring-4 ring-yellow-300 scale-105 shadow-xl bg-yellow-50 animate-pulse'
                    : 'border-slate-200 hover:border-amber-300 shadow-md'
                } ${isPlaying ? 'scale-90 bg-amber-100' : 'hover:-translate-y-1'}`}
              >
                {/* Highlight Glow when Target */}
                {isTarget && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-amber-950 font-black text-[11px] px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap animate-bounce">
                    여기 콕! ⭐
                  </div>
                )}

                {/* Animal */}
                <AnimalCharacter
                  animalId={key.animalId}
                  size={65}
                  isHappy={isPlaying || isTarget}
                  isCounted={isPlaying}
                />

                {/* Solfege / Number Key Label */}
                <div
                  className={`mt-2 w-full py-1.5 rounded-xl text-center font-black text-xs sm:text-sm text-white shadow-sm ${key.btnClass}`}
                >
                  {key.solfege}
                </div>

                <span className="mt-1 text-[10px] font-bold text-slate-600">
                  {animal.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Finished Celebration Modal */}
        {isSongFinished && (
          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-pop-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border-4 border-amber-400 flex flex-col items-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl mb-3 animate-gentle-bounce">
                🎶
              </div>
              <h3 className="text-2xl font-black text-amber-950 mb-1">멋진 연주예요!</h3>
              <p className="text-amber-800 font-bold text-sm mb-4">
                동물 친구들과 함께 동요를 멋지게 끝마쳤어요! ⭐
              </p>

              <button
                onClick={() => {
                  if (selectedSong) startSong(selectedSong);
                }}
                className="w-full toddler-btn-green py-3.5 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                한 번 더 연주하기
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 text-center text-amber-800/80 font-bold text-xs sm:text-sm">
        💡 팁: 도(1)부터 높은 도(8)까지 건반을 누르면 동물 친구들의 특별한 소리가 나요!
      </div>
    </div>
  );
};
