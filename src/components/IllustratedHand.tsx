import React from 'react';

interface IllustratedHandProps {
  count: number; // 1 to 10
  size?: number;
}

export const IllustratedHand: React.FC<IllustratedHandProps> = ({ count, size = 100 }) => {
  // Renders hand fingers visual representation for numbers 1 to 10
  // For 1-5, renders 1 hand. For 6-10, renders 2 hands (5 + remaining)

  const renderSingleHand = (activeFingers: number, isLeft = false) => {
    // Finger indices: 1 = Thumb, 2 = Index, 3 = Middle, 4 = Ring, 5 = Pinky
    // In toddler counting, 1 is usually index finger or thumb. Let's make it intuitive:
    // 1 = Index up
    // 2 = Index + Middle (Peace sign)
    // 3 = Thumb + Index + Middle (or Index, Middle, Ring)
    // 4 = Index, Middle, Ring, Pinky
    // 5 = All 5 open
    const isThumbUp = activeFingers === 5 || activeFingers === 3;
    const isIndexUp = activeFingers >= 1;
    const isMiddleUp = activeFingers >= 2;
    const isRingUp = activeFingers >= 4;
    const isPinkyUp = activeFingers >= 4;

    return (
      <svg
        viewBox="0 0 100 110"
        className="w-full h-full drop-shadow-md overflow-visible"
        style={{ transform: isLeft ? 'scaleX(-1)' : 'none' }}
      >
        {/* Palm */}
        <path
          d="M 30 50 Q 25 70 30 90 Q 50 100 70 90 Q 75 70 70 50 Z"
          fill="#FED7AA"
          stroke="#EA580C"
          strokeWidth="2.5"
        />

        {/* Thumb */}
        {isThumbUp ? (
          <path
            d="M 28 65 Q 12 55 18 42 Q 24 35 32 50 Z"
            fill="#FED7AA"
            stroke="#EA580C"
            strokeWidth="2.5"
          />
        ) : (
          <path
            d="M 30 65 Q 22 68 28 78 Z"
            fill="#FDBA74"
            stroke="#EA580C"
            strokeWidth="2"
          />
        )}

        {/* Index Finger */}
        {isIndexUp ? (
          <path
            d="M 34 50 L 34 20 Q 39 12 44 20 L 44 50 Z"
            fill="#FED7AA"
            stroke="#EA580C"
            strokeWidth="2.5"
          />
        ) : (
          <path
            d="M 34 50 Q 39 42 44 50 Z"
            fill="#FDBA74"
            stroke="#EA580C"
            strokeWidth="2"
          />
        )}

        {/* Middle Finger */}
        {isMiddleUp ? (
          <path
            d="M 44 48 L 44 14 Q 49 7 54 14 L 54 48 Z"
            fill="#FED7AA"
            stroke="#EA580C"
            strokeWidth="2.5"
          />
        ) : (
          <path
            d="M 44 48 Q 49 40 54 48 Z"
            fill="#FDBA74"
            stroke="#EA580C"
            strokeWidth="2"
          />
        )}

        {/* Ring Finger */}
        {isRingUp ? (
          <path
            d="M 54 50 L 54 18 Q 59 12 64 18 L 64 50 Z"
            fill="#FED7AA"
            stroke="#EA580C"
            strokeWidth="2.5"
          />
        ) : (
          <path
            d="M 54 50 Q 59 42 64 50 Z"
            fill="#FDBA74"
            stroke="#EA580C"
            strokeWidth="2"
          />
        )}

        {/* Pinky Finger */}
        {isPinkyUp ? (
          <path
            d="M 64 54 L 64 28 Q 69 22 74 28 L 74 54 Z"
            fill="#FED7AA"
            stroke="#EA580C"
            strokeWidth="2.5"
          />
        ) : (
          <path
            d="M 64 54 Q 69 47 74 54 Z"
            fill="#FDBA74"
            stroke="#EA580C"
            strokeWidth="2"
          />
        )}

        {/* Palm fold lines */}
        <path d="M 38 65 Q 50 72 62 65" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>
    );
  };

  if (count <= 5) {
    return (
      <div style={{ width: size, height: size }} className="inline-flex items-center justify-center">
        {renderSingleHand(count)}
      </div>
    );
  }

  // 6 to 10: Two hands (5 + count - 5)
  const leftHandFingers = 5;
  const rightHandFingers = count - 5;

  return (
    <div style={{ width: size * 1.8, height: size }} className="inline-flex items-center justify-center gap-1">
      <div style={{ width: size * 0.9, height: size }}>
        {renderSingleHand(leftHandFingers, true)}
      </div>
      <div style={{ width: size * 0.9, height: size }}>
        {renderSingleHand(rightHandFingers, false)}
      </div>
    </div>
  );
};
