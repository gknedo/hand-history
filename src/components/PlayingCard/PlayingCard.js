import React, { useMemo } from 'react';
import './styles.css';

const getRank = (card) => {
  if(card[0] === "1") return "T";
  return card[0];
}
const getSuit = (card) => {
  if(card[0] === "1") return card[2];
  return card[1];
}

function PlayingCard({rank, suit, card}) {
  const selectedRank = !!card ? getRank(card) : rank;
  const selectedSuit = !!card ? getSuit(card) : suit;

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
