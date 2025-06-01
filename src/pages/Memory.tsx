
import { useState, useEffect } from "react";
import Header from "../components/Header";
import MemoryCard from "../components/MemoryCard";
import GameControls from "../components/GameControls";
import VictoryModal from "../components/VictoryModal";
import { Brain } from "lucide-react";
import { Card } from "../types/memory";
import { CARDS_DATA } from "../data/memoryCards";

const Memory = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState(8);
  const [isGameActive, setIsGameActive] = useState(false);
  const [canFlipCards, setCanFlipCards] = useState(true);

  // Inicializar jogo
  const initializeGame = (numPairs: number) => {
    const selectedCards = CARDS_DATA.slice(0, numPairs);
    const gameCards = [...selectedCards, ...selectedCards]
      .map((cardData, index) => ({
        id: index,
        emoji: cardData.emoji,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsCompleted(false);
    setIsGameActive(true);
    setCanFlipCards(true);
  };

  useEffect(() => {
    initializeGame(difficulty / 2);
  }, [difficulty]);

  // Verificar se jogo foi completado
  useEffect(() => {
    if (matches === difficulty / 2 && matches > 0) {
      setIsCompleted(true);
      setIsGameActive(false);
    }
  }, [matches, difficulty]);

  // Virar carta
  const flipCard = (id: number) => {
    if (!isGameActive || !canFlipCards || flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setCanFlipCards(false);
      setMoves(moves + 1);
      
      // Verificar se as cartas combinam
      const [firstId, secondId] = newFlippedCards;
      if (cards[firstId].emoji === cards[secondId].emoji) {
        // Match encontrado
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstId].isMatched = true;
          updatedCards[secondId].isMatched = true;
          setCards(updatedCards);
          setMatches(matches + 1);
          setFlippedCards([]);
          setCanFlipCards(true);
        }, 1000);
      } else {
        // Não combina - virar de volta
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstId].isFlipped = false;
          updatedCards[secondId].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
          setCanFlipCards(true);
        }, 1000);
      }
    }
  };

  const startNewGame = () => {
    initializeGame(difficulty / 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Brain className="h-10 w-10 text-kidPink animate-pulse" />
            Jogo da Memória
          </h1>
          <p className="text-lg text-gray-600">Encontre os pares!</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <GameControls
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            moves={moves}
            matches={matches}
            isGameActive={isGameActive}
            onNewGame={startNewGame}
          />

          {/* Tabuleiro do jogo */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div 
              className="grid gap-4 mx-auto"
              style={{ 
                gridTemplateColumns: `repeat(${Math.sqrt(difficulty) === Math.floor(Math.sqrt(difficulty)) ? Math.sqrt(difficulty) : 4}, 1fr)`,
                maxWidth: '600px'
              }}
            >
              {cards.map((card) => (
                <MemoryCard
                  key={card.id}
                  card={card}
                  onFlip={flipCard}
                  canFlip={canFlipCards}
                  isGameActive={isGameActive}
                />
              ))}
            </div>
          </div>

          <VictoryModal
            isVisible={isCompleted}
            moves={moves}
            onNewGame={startNewGame}
          />
        </div>
      </main>
    </div>
  );
};

export default Memory;
