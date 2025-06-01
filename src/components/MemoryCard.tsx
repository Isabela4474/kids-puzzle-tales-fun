
import { Card } from "../types/memory";

interface MemoryCardProps {
  card: Card;
  onFlip: (id: number) => void;
  canFlip: boolean;
  isGameActive: boolean;
}

const MemoryCard = ({ card, onFlip, canFlip, isGameActive }: MemoryCardProps) => {
  const handleClick = () => {
    onFlip(card.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`aspect-square relative transition-all duration-200 ${
        canFlip && isGameActive && !card.isFlipped && !card.isMatched 
          ? 'cursor-pointer hover:scale-105' 
          : 'cursor-default'
      }`}
    >
      <div 
        className={`
          absolute inset-0 rounded-xl transition-transform duration-500 transform-style-preserve-3d
          ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
        `}
      >
        {/* Frente da carta (oculta) */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-kidPurple to-purple-600 rounded-xl flex items-center justify-center text-4xl shadow-lg">
          ?
        </div>
        
        {/* Verso da carta (emoji) */}
        <div className={`
          absolute inset-0 backface-hidden rotate-y-180 rounded-xl flex items-center justify-center text-4xl shadow-lg transition-all duration-300
          ${card.isMatched 
            ? 'bg-gradient-to-br from-kidGreen to-green-600 animate-pulse' 
            : 'bg-gradient-to-br from-kidYellow to-yellow-500'
          }
        `}>
          {card.emoji}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
