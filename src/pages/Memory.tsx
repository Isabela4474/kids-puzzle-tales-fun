
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Brain, RotateCcw, Trophy } from "lucide-react";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const Memory = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState(8); // 4 pares = 8 cartas

  const emojis = ["🐶", "🐱", "🐰", "🦁", "🐸", "🐧", "🦋", "🌟", "🌈", "🎈", "🎀", "🎨"];

  // Inicializar jogo
  const initializeGame = (numPairs: number) => {
    const selectedEmojis = emojis.slice(0, numPairs);
    const gameCards = [...selectedEmojis, ...selectedEmojis]
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    initializeGame(difficulty / 2);
  }, [difficulty]);

  // Verificar se jogo foi completado
  useEffect(() => {
    if (matches === difficulty / 2 && matches > 0) {
      setIsCompleted(true);
    }
  }, [matches, difficulty]);

  // Virar carta
  const flipCard = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
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
        }, 1000);
      } else {
        // Não combina - virar de volta
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstId].isFlipped = false;
          updatedCards[secondId].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
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
          <p className="text-lg text-gray-600">Encontre os pares das cartas!</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Controles */}
          <div className="bg-white rounded-3xl p-6 shadow-xl mb-8">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="font-semibold text-gray-700">Dificuldade:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                  className="bg-kidPink text-white px-4 py-2 rounded-full font-semibold"
                >
                  <option value={8}>Fácil (4 pares)</option>
                  <option value={12}>Médio (6 pares)</option>
                  <option value={16}>Difícil (8 pares)</option>
                </select>
              </div>
              
              <div className="flex items-center gap-4 text-gray-700">
                <span className="font-semibold">Jogadas: {moves}</span>
                <span className="font-semibold">Pares: {matches}/{difficulty / 2}</span>
              </div>
              
              <button
                onClick={() => initializeGame(difficulty / 2)}
                className="bg-kidBlue text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Novo Jogo
              </button>
            </div>
          </div>

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
                <div
                  key={card.id}
                  onClick={() => flipCard(card.id)}
                  className="aspect-square relative cursor-pointer"
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
                      absolute inset-0 backface-hidden rotate-y-180 rounded-xl flex items-center justify-center text-4xl shadow-lg
                      ${card.isMatched 
                        ? 'bg-gradient-to-br from-kidGreen to-green-600' 
                        : 'bg-gradient-to-br from-kidYellow to-yellow-500'
                      }
                    `}>
                      {card.emoji}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal de vitória */}
          {isCompleted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-8 text-center max-w-md mx-4 animate-bounce-gentle">
                <Trophy className="h-16 w-16 text-kidYellow mx-auto mb-4 animate-wiggle" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Fantástico! 🎉</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Você encontrou todos os pares em {moves} jogadas!
                </p>
                <button
                  onClick={() => initializeGame(difficulty / 2)}
                  className="bg-kidGreen text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
                >
                  Jogar Novamente
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Memory;
