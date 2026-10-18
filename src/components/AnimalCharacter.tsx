import React from 'react';
import { AnimalId } from '../types/game';

interface AnimalCharacterProps {
  animalId: AnimalId;
  size?: number;
  isCounted?: boolean;
  isEating?: boolean;
  isHappy?: boolean;
  countedNumber?: number;
  onClick?: () => void;
  className?: string;
  showSpeech?: string;
}

export const AnimalCharacter: React.FC<AnimalCharacterProps> = ({
  animalId,
  size = 120,
  isCounted = false,
  isEating = false,
  isHappy = false,
  countedNumber,
  onClick,
  className = '',
  showSpeech,
}) => {
  // SVG illustration for each cute toddler animal
  const renderAnimalSVG = () => {
    switch (animalId) {
      case 'bunny':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Long Ears */}
            <g className={isCounted ? 'animate-wiggle' : ''}>
              <ellipse cx="36" cy="24" rx="9" ry="22" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2.5" />
              <ellipse cx="36" cy="24" rx="5" ry="16" fill="#FBCFE8" />
              <ellipse cx="64" cy="24" rx="9" ry="22" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2.5" />
              <ellipse cx="64" cy="24" rx="5" ry="16" fill="#FBCFE8" />
            </g>
            {/* Body */}
            <circle cx="50" cy="74" r="22" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2.5" />
            {/* Feet */}
            <ellipse cx="35" cy="90" rx="9" ry="6" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2.5" />
            <ellipse cx="65" cy="90" rx="9" ry="6" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2.5" />
            {/* Face */}
            <ellipse cx="50" cy="56" rx="28" ry="24" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2.5" />
            {/* Cheeks */}
            <circle cx="33" cy="62" r="5" fill="#FDA4AF" opacity="0.8" />
            <circle cx="67" cy="62" r="5" fill="#FDA4AF" opacity="0.8" />
            {/* Eyes */}
            {isHappy || isEating ? (
              <path d="M 36 52 Q 40 47 44 52 M 56 52 Q 60 47 64 52" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
            ) : (
              <>
                <ellipse cx="40" cy="52" rx="4" ry="5" fill="#1F2937" />
                <circle cx="38.5" cy="50.5" r="1.5" fill="#FFFFFF" />
                <ellipse cx="60" cy="52" rx="4" ry="5" fill="#1F2937" />
                <circle cx="58.5" cy="50.5" r="1.5" fill="#FFFFFF" />
              </>
            )}
            {/* Cute Nose and Mouth */}
            <polygon points="50,60 46,57 54,57" fill="#F43F5E" />
            <path
              d={isEating ? "M 46 63 Q 50 71 54 63 Z" : "M 46 62 Q 50 67 54 62"}
              stroke="#1F2937"
              strokeWidth="2"
              strokeLinecap="round"
              fill={isEating ? "#EF4444" : "none"}
            />
            {/* Paws */}
            <circle cx="36" cy="74" r="5" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2" />
            <circle cx="64" cy="74" r="5" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2" />
          </svg>
        );

      case 'bear':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Ears */}
            <circle cx="30" cy="30" r="12" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
            <circle cx="30" cy="30" r="6" fill="#FDE68A" />
            <circle cx="70" cy="30" r="12" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
            <circle cx="70" cy="30" r="6" fill="#FDE68A" />
            {/* Body */}
            <circle cx="50" cy="74" r="23" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
            <circle cx="50" cy="76" r="13" fill="#FEF3C7" />
            {/* Head */}
            <circle cx="50" cy="52" r="26" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
            {/* Snout */}
            <ellipse cx="50" cy="58" rx="13" ry="10" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />
            {/* Nose & Mouth */}
            <ellipse cx="50" cy="54" rx="5" ry="3.5" fill="#451A03" />
            <path
              d={isEating ? "M 46 60 Q 50 68 54 60 Z" : "M 46 60 Q 50 65 54 60"}
              stroke="#451A03"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill={isEating ? "#DC2626" : "none"}
            />
            {/* Cheeks */}
            <circle cx="32" cy="56" r="4.5" fill="#FCA5A5" opacity="0.8" />
            <circle cx="68" cy="56" r="4.5" fill="#FCA5A5" opacity="0.8" />
            {/* Eyes */}
            {isHappy || isEating ? (
              <path d="M 37 45 Q 41 40 45 45 M 55 45 Q 59 40 63 45" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
            ) : (
              <>
                <circle cx="40" cy="45" r="4" fill="#451A03" />
                <circle cx="38.5" cy="43.5" r="1.5" fill="#FFFFFF" />
                <circle cx="60" cy="45" r="4" fill="#451A03" />
                <circle cx="58.5" cy="43.5" r="1.5" fill="#FFFFFF" />
              </>
            )}
            {/* Paws */}
            <circle cx="34" cy="72" r="6" fill="#B45309" stroke="#78350F" strokeWidth="2" />
            <circle cx="66" cy="72" r="6" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          </svg>
        );

      case 'puppy':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Floppy Ears */}
            <ellipse cx="26" cy="42" rx="10" ry="18" fill="#D97706" stroke="#92400E" strokeWidth="2.5" transform="rotate(-15 26 42)" />
            <ellipse cx="74" cy="42" rx="10" ry="18" fill="#D97706" stroke="#92400E" strokeWidth="2.5" transform="rotate(15 74 42)" />
            {/* Body */}
            <circle cx="50" cy="74" r="22" fill="#FDE047" stroke="#92400E" strokeWidth="2.5" />
            {/* Wagging tail */}
            <path d="M 68 76 Q 85 70 82 58" stroke="#D97706" strokeWidth="6" strokeLinecap="round" fill="none" className="animate-wiggle" />
            {/* Head */}
            <circle cx="50" cy="50" r="26" fill="#FDE047" stroke="#92400E" strokeWidth="2.5" />
            {/* Spot over eye */}
            <ellipse cx="60" cy="46" rx="9" ry="10" fill="#F59E0B" opacity="0.8" />
            {/* Cheeks */}
            <circle cx="32" cy="56" r="4.5" fill="#FCA5A5" opacity="0.8" />
            <circle cx="68" cy="56" r="4.5" fill="#FCA5A5" opacity="0.8" />
            {/* Eyes */}
            {isHappy || isEating ? (
              <path d="M 37 46 Q 41 41 45 46 M 55 46 Q 59 41 63 46" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
            ) : (
              <>
                <circle cx="41" cy="46" r="4.5" fill="#1F2937" />
                <circle cx="39.5" cy="44.5" r="1.5" fill="#FFFFFF" />
                <circle cx="59" cy="46" r="4.5" fill="#1F2937" />
                <circle cx="57.5" cy="44.5" r="1.5" fill="#FFFFFF" />
              </>
            )}
            {/* Snout */}
            <ellipse cx="50" cy="58" rx="10" ry="7" fill="#FFFFFF" />
            <ellipse cx="50" cy="54" rx="4.5" ry="3.5" fill="#1F2937" />
            {/* Tongue or Mouth */}
            {isEating ? (
              <path d="M 47 60 Q 50 67 53 60 Z" fill="#EF4444" />
            ) : (
              <path d="M 46 59 Q 50 64 54 59" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
            )}
            {/* Paws */}
            <circle cx="36" cy="74" r="5.5" fill="#FDE047" stroke="#92400E" strokeWidth="2" />
            <circle cx="64" cy="74" r="5.5" fill="#FDE047" stroke="#92400E" strokeWidth="2" />
          </svg>
        );

      case 'kitten':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Pointy Ears */}
            <polygon points="26,38 32,16 44,32" fill="#FB923C" stroke="#C2410C" strokeWidth="2.5" />
            <polygon points="29,34 34,22 41,31" fill="#FED7AA" />
            <polygon points="74,38 68,16 56,32" fill="#FB923C" stroke="#C2410C" strokeWidth="2.5" />
            <polygon points="71,34 66,22 59,31" fill="#FED7AA" />
            {/* Body */}
            <circle cx="50" cy="74" r="22" fill="#FB923C" stroke="#C2410C" strokeWidth="2.5" />
            <ellipse cx="50" cy="76" rx="11" ry="14" fill="#FFF7ED" />
            {/* Tail */}
            <path d="M 68 76 Q 84 82 85 64" stroke="#FB923C" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            {/* Head */}
            <circle cx="50" cy="52" r="25" fill="#FB923C" stroke="#C2410C" strokeWidth="2.5" />
            {/* Whiskers */}
            <line x1="22" y1="56" x2="33" y2="57" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="62" x2="33" y2="61" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
            <line x1="67" y1="57" x2="78" y2="56" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
            <line x1="67" y1="61" x2="78" y2="62" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
            {/* Cheeks */}
            <circle cx="34" cy="58" r="4.5" fill="#FCA5A5" opacity="0.8" />
            <circle cx="66" cy="58" r="4.5" fill="#FCA5A5" opacity="0.8" />
            {/* Eyes */}
            {isHappy || isEating ? (
              <path d="M 37 47 Q 41 42 45 47 M 55 47 Q 59 42 63 47" stroke="#431407" strokeWidth="3" strokeLinecap="round" fill="none" />
            ) : (
              <>
                <ellipse cx="41" cy="47" rx="4.5" ry="5.5" fill="#047857" />
                <circle cx="39.5" cy="45" r="1.8" fill="#FFFFFF" />
                <ellipse cx="59" cy="47" rx="4.5" ry="5.5" fill="#047857" />
                <circle cx="57.5" cy="45" r="1.8" fill="#FFFFFF" />
              </>
            )}
            {/* Nose & Mouth */}
            <polygon points="50,57 47,54 53,54" fill="#F43F5E" />
            <path
              d={isEating ? "M 46 60 Q 50 67 54 60 Z" : "M 46 59 Q 50 63 54 59"}
              stroke="#7C2D12"
              strokeWidth="2"
              strokeLinecap="round"
              fill={isEating ? "#EF4444" : "none"}
            />
          </svg>
        );

      case 'duck':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Body */}
            <ellipse cx="50" cy="70" rx="26" ry="20" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
            {/* Wing */}
            <ellipse cx="40" cy="70" rx="14" ry="9" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" className={isCounted ? "animate-wiggle" : ""} />
            {/* Head */}
            <circle cx="56" cy="44" r="20" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
            {/* Cute Duck Beak */}
            <ellipse cx="74" cy="47" rx="11" ry="6" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
            {isEating && <ellipse cx="76" cy="47" rx="4" ry="2" fill="#7C2D12" />}
            {/* Cheek */}
            <circle cx="48" cy="49" r="4.5" fill="#FDA4AF" opacity="0.8" />
            {/* Eyes */}
            {isHappy || isEating ? (
              <path d="M 54 39 Q 59 34 63 40" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
            ) : (
              <>
                <circle cx="58" cy="40" r="4.5" fill="#1F2937" />
                <circle cx="56.5" cy="38.5" r="1.5" fill="#FFFFFF" />
              </>
            )}
            {/* Feet */}
            <ellipse cx="42" cy="90" rx="8" ry="4" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
            <ellipse cx="58" cy="90" rx="8" ry="4" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
          </svg>
        );

      case 'frog':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Big Frog Eyes atop head */}
            <circle cx="32" cy="34" r="13" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
            <circle cx="32" cy="34" r="8" fill="#FFFFFF" />
            <circle cx="32" cy="34" r="4.5" fill="#1F2937" />
            <circle cx="30.5" cy="32" r="1.5" fill="#FFFFFF" />

            <circle cx="68" cy="34" r="13" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
            <circle cx="68" cy="34" r="8" fill="#FFFFFF" />
            <circle cx="68" cy="34" r="4.5" fill="#1F2937" />
            <circle cx="66.5" cy="32" r="1.5" fill="#FFFFFF" />

            {/* Body */}
            <ellipse cx="50" cy="74" rx="24" ry="18" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
            <ellipse cx="50" cy="76" rx="14" ry="11" fill="#DCFCE7" />

            {/* Head */}
            <ellipse cx="50" cy="52" rx="28" ry="20" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
            {/* Cheeks */}
            <circle cx="28" cy="56" r="5" fill="#F472B6" opacity="0.8" />
            <circle cx="72" cy="56" r="5" fill="#F472B6" opacity="0.8" />
            {/* Big Smile */}
            {isEating ? (
              <ellipse cx="50" cy="58" rx="9" ry="6" fill="#DC2626" stroke="#15803D" strokeWidth="2" />
            ) : (
              <path d="M 33 54 Q 50 68 67 54" stroke="#15803D" strokeWidth="3" strokeLinecap="round" fill="none" />
            )}
            {/* Feet */}
            <ellipse cx="28" cy="88" rx="10" ry="4" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
            <ellipse cx="72" cy="88" rx="10" ry="4" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
          </svg>
        );

      case 'lion':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Fluffy Mane */}
            <g className={isCounted ? "animate-pulse-glow" : ""}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const cx = 50 + 26 * Math.cos(rad);
                const cy = 48 + 26 * Math.sin(rad);
                return <circle key={i} cx={cx} cy={cy} r="13" fill="#EA580C" stroke="#C2410C" strokeWidth="2" />;
              })}
            </g>
            {/* Body */}
            <circle cx="50" cy="75" r="21" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
            {/* Head */}
            <circle cx="50" cy="48" r="23" fill="#FDE047" stroke="#B45309" strokeWidth="2.5" />
            {/* Ears */}
            <circle cx="32" cy="30" r="7" fill="#FDE047" stroke="#B45309" strokeWidth="2" />
            <circle cx="32" cy="30" r="3.5" fill="#F59E0B" />
            <circle cx="68" cy="30" r="7" fill="#FDE047" stroke="#B45309" strokeWidth="2" />
            <circle cx="68" cy="30" r="3.5" fill="#F59E0B" />
            {/* Cheeks */}
            <circle cx="34" cy="54" r="4.5" fill="#FDA4AF" opacity="0.8" />
            <circle cx="66" cy="54" r="4.5" fill="#FDA4AF" opacity="0.8" />
            {/* Eyes */}
            {isHappy || isEating ? (
              <path d="M 38 43 Q 42 38 46 43 M 54 43 Q 58 38 62 43" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
            ) : (
              <>
                <circle cx="41" cy="43" r="4" fill="#451A03" />
                <circle cx="39.5" cy="41.5" r="1.5" fill="#FFFFFF" />
                <circle cx="59" cy="43" r="4" fill="#451A03" />
                <circle cx="57.5" cy="41.5" r="1.5" fill="#FFFFFF" />
              </>
            )}
            {/* Nose & Mouth */}
            <polygon points="50,52 46,48 54,48" fill="#78350F" />
            <path
              d={isEating ? "M 46 56 Q 50 63 54 56 Z" : "M 46 55 Q 50 59 54 55"}
              stroke="#78350F"
              strokeWidth="2"
              strokeLinecap="round"
              fill={isEating ? "#DC2626" : "none"}
            />
          </svg>
        );

      case 'panda':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Black Ears */}
            <circle cx="28" cy="28" r="10" fill="#1F2937" stroke="#111827" strokeWidth="2" />
            <circle cx="72" cy="28" r="10" fill="#1F2937" stroke="#111827" strokeWidth="2" />
            {/* Body */}
            <circle cx="50" cy="74" r="23" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2.5" />
            <ellipse cx="50" cy="67" rx="23" ry="8" fill="#1F2937" />
            {/* Head */}
            <circle cx="50" cy="50" r="26" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2.5" />
            {/* Black Eye Patches */}
            <ellipse cx="38" cy="47" rx="8" ry="10" fill="#1F2937" transform="rotate(-15 38 47)" />
            <ellipse cx="62" cy="47" rx="8" ry="10" fill="#1F2937" transform="rotate(15 62 47)" />
            {/* Cheeks */}
            <circle cx="30" cy="58" r="4.5" fill="#FDA4AF" opacity="0.8" />
            <circle cx="70" cy="58" r="4.5" fill="#FDA4AF" opacity="0.8" />
            {/* Eyes inside patch */}
            {isHappy || isEating ? (
              <path d="M 35 46 Q 38 42 41 46 M 59 46 Q 62 42 65 46" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            ) : (
              <>
                <circle cx="39" cy="46" r="3.5" fill="#FFFFFF" />
                <circle cx="39" cy="46" r="2" fill="#1F2937" />
                <circle cx="61" cy="46" r="3.5" fill="#FFFFFF" />
                <circle cx="61" cy="46" r="2" fill="#1F2937" />
              </>
            )}
            {/* Nose & Mouth */}
            <ellipse cx="50" cy="56" rx="4.5" ry="3.5" fill="#1F2937" />
            <path
              d={isEating ? "M 46 61 Q 50 68 54 61 Z" : "M 46 60 Q 50 65 54 60"}
              stroke="#1F2937"
              strokeWidth="2"
              strokeLinecap="round"
              fill={isEating ? "#EF4444" : "none"}
            />
          </svg>
        );

      case 'penguin':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Body */}
            <ellipse cx="50" cy="65" rx="25" ry="30" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
            {/* White Tummy */}
            <ellipse cx="50" cy="68" rx="16" ry="22" fill="#FFFFFF" />
            {/* Flippers */}
            <ellipse cx="24" cy="62" rx="7" ry="16" fill="#0F172A" stroke="#0284C7" strokeWidth="1.5" transform="rotate(20 24 62)" />
            <ellipse cx="76" cy="62" rx="7" ry="16" fill="#0F172A" stroke="#0284C7" strokeWidth="1.5" transform="rotate(-20 76 62)" />
            {/* Cheeks */}
            <circle cx="37" cy="52" r="4.5" fill="#FDA4AF" opacity="0.8" />
            <circle cx="63" cy="52" r="4.5" fill="#FDA4AF" opacity="0.8" />
            {/* Eyes */}
            {isHappy || isEating ? (
              <path d="M 38 44 Q 42 39 46 44 M 54 44 Q 58 39 62 44" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
            ) : (
              <>
                <circle cx="41" cy="44" r="4" fill="#0F172A" />
                <circle cx="39.5" cy="42.5" r="1.5" fill="#FFFFFF" />
                <circle cx="59" cy="44" r="4" fill="#0F172A" />
                <circle cx="57.5" cy="42.5" r="1.5" fill="#FFFFFF" />
              </>
            )}
            {/* Beak */}
            <polygon points="50,47 43,53 57,53" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
            {/* Feet */}
            <ellipse cx="40" cy="94" rx="9" ry="5" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
            <ellipse cx="60" cy="94" rx="9" ry="5" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
          </svg>
        );

      case 'monkey':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Big Round Ears */}
            <circle cx="22" cy="48" r="13" fill="#92400E" stroke="#78350F" strokeWidth="2.5" />
            <circle cx="22" cy="48" r="7" fill="#FDE68A" />
            <circle cx="78" cy="48" r="13" fill="#92400E" stroke="#78350F" strokeWidth="2.5" />
            <circle cx="78" cy="48" r="7" fill="#FDE68A" />
            {/* Body */}
            <circle cx="50" cy="74" r="21" fill="#92400E" stroke="#78350F" strokeWidth="2.5" />
            <ellipse cx="50" cy="76" rx="12" ry="14" fill="#FDE68A" />
            {/* Tail */}
            <path d="M 68 76 Q 88 80 88 64 Q 88 52 80 54" stroke="#92400E" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Head */}
            <circle cx="50" cy="50" r="25" fill="#92400E" stroke="#78350F" strokeWidth="2.5" />
            {/* Light Face Mask */}
            <ellipse cx="42" cy="48" rx="10" ry="12" fill="#FDE68A" />
            <ellipse cx="58" cy="48" rx="10" ry="12" fill="#FDE68A" />
            <ellipse cx="50" cy="58" rx="14" ry="10" fill="#FDE68A" />
            {/* Cheeks */}
            <circle cx="34" cy="58" r="4" fill="#FDA4AF" opacity="0.8" />
            <circle cx="66" cy="58" r="4" fill="#FDA4AF" opacity="0.8" />
            {/* Eyes */}
            {isHappy || isEating ? (
              <path d="M 38 45 Q 42 40 46 45 M 54 45 Q 58 40 62 45" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
            ) : (
              <>
                <circle cx="42" cy="45" r="4" fill="#1F2937" />
                <circle cx="40.5" cy="43.5" r="1.5" fill="#FFFFFF" />
                <circle cx="58" cy="45" r="4" fill="#1F2937" />
                <circle cx="56.5" cy="43.5" r="1.5" fill="#FFFFFF" />
              </>
            )}
            {/* Nose & Smile */}
            <circle cx="47" cy="55" r="1.5" fill="#78350F" />
            <circle cx="53" cy="55" r="1.5" fill="#78350F" />
            <path
              d={isEating ? "M 45 61 Q 50 67 55 61 Z" : "M 44 60 Q 50 66 56 60"}
              stroke="#78350F"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill={isEating ? "#EF4444" : "none"}
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`relative inline-flex flex-col items-center justify-center select-none cursor-pointer transition-transform duration-200 active:scale-90 ${
        isCounted ? 'scale-110 drop-shadow-xl' : 'hover:scale-105'
      } ${className}`}
    >
      {/* Number Balloon or Star above head when counted */}
      {countedNumber !== undefined && countedNumber > 0 && (
        <div className="absolute -top-7 z-20 animate-pop-in pointer-events-none">
          <div className="relative flex items-center justify-center px-3 py-1 bg-amber-400 border-2 border-amber-600 rounded-full shadow-lg text-amber-950 font-black text-lg md:text-xl transform -rotate-6">
            ⭐ {countedNumber}
            {/* Balloon triangle tail */}
            <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-amber-600"></div>
          </div>
        </div>
      )}

      {/* Speech bubble if provided */}
      {showSpeech && (
        <div className="absolute -top-10 z-20 animate-pop-in pointer-events-none whitespace-nowrap">
          <div className="bg-white px-3 py-1 rounded-2xl shadow-md border-2 border-amber-400 text-amber-900 font-bold text-xs md:text-sm">
            {showSpeech}
          </div>
        </div>
      )}

      {/* Main SVG Graphic */}
      <div className={`w-full h-full relative ${isCounted ? 'animate-gentle-bounce' : ''}`}>
        {renderAnimalSVG()}

        {/* Heart bubbles when eating */}
        {isEating && (
          <div className="absolute top-0 right-0 animate-pop-in pointer-events-none text-2xl">
            💖
          </div>
        )}
      </div>

      {/* Glow aura when counted */}
      {isCounted && (
        <div className="absolute inset-0 -z-10 rounded-full bg-yellow-300 opacity-40 blur-md animate-pulse"></div>
      )}
    </div>
  );
};
