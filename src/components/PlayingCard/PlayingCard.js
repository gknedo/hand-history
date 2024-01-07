import React, { useMemo } from 'react';
import './styles.css';

function PlayingCard({rank, suit, card}) {
  const selectedRank = !!card ? card[0] : rank;
  const selectedSuit = !!card ? card[1] : suit;

  const suitStr = useMemo(() => {
    if(["clubs", "c", "♣"].includes(selectedSuit)) return "clubs";
    if(["diamonds", "diams", "d", "♦"].includes(selectedSuit)) return "diams";
    if(["hearts", "h", "♥"].includes(selectedSuit)) return "hearts";
    if(["spades", "s", "♠"].includes(selectedSuit)) return "spades";
    return null;
  }, [selectedSuit])

  const suitSym = useMemo(() => {
    if(["clubs", "c", "♣"].includes(selectedSuit)) return "♣";
    if(["diamonds", "diams", "d", "♦"].includes(selectedSuit)) return "♦";
    if(["hearts", "h", "♥"].includes(selectedSuit)) return "♥";
    if(["spades", "s", "♠"].includes(selectedSuit)) return "♠";
    return null;
  }, [selectedSuit])
  return (
    <div className={`card rank-${selectedRank.toLowerCase()} ${suitStr}`}>
      <span className="rank">{selectedRank}</span>
      <span className="suit">{suitSym}</span>
    </div>
  );
}

export default PlayingCard;
