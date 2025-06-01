
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Brain, RotateCcw, Trophy, Play, Pause, Volume2 } from "lucide-react";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  videoUrl?: string;
  educationalTip?: string;
}

const Memory = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState(8);
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string>("");
  const [currentTip, setCurrentTip] = useState<string>("");
  const [isGameActive, setIsGameActive] = useState(false);
  const [canFlipCards, setCanFlipCards] = useState(true);

  const cardsData = [
    { emoji: "🐶", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", tip: "Os cães são animais leais e amigáveis!" },
    { emoji: "🐱", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", tip: "Os gatos são animais independentes e carinhosos!" },
    { emoji: "🐰", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", tip: "Os coelhos saltam e adoram cenouras!" },
    { emoji: "🦁", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", tip: "O leão é conhecido como o rei da selva!" },
    { emoji: "🐸", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", tip: "Os sapos vivem na água e na terra!" },
    { emoji: "🐧", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", tip: "Os pinguins vivem no gelo e nadam muito bem!" },
    { emoji: "🦋", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", tip: "As borboletas começam como lagartas!" },
    { emoji: "🌟", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", tip: "As estrelas brilham no céu noturno!" },
    { emoji: "🌈", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", tip: "O arco-íris aparece depois da chuva!" },
    { emoji: "🎈", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", tip: "Balões sobem porque são cheios de ar!" },
    { emoji: "🎀", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", tip: "Laços são usados para decorar presentes!" },
    { emoji: "🎨", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", tip: "A arte nos permite expressar nossa criatividade!" }
  ];

  // Inicializar jogo
  const initializeGame = (numPairs: number) => {
    const selectedCards = cardsData.slice(0, numPairs);
    const gameCards = [...selectedCards, ...selectedCards]
      .map((cardData, index) => ({
        id: index,
        emoji: cardData.emoji,
        videoUrl: cardData.videoUrl,
        educationalTip: cardData.tip,
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
        // Match encontrado - mostrar vídeo educativo
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstId].isMatched = true;
          updatedCards[secondId].isMatched = true;
          setCards(updatedCards);
          setMatches(matches + 1);
          setFlippedCards([]);
          setCanFlipCards(true);
          
          // Mostrar vídeo educativo
          setCurrentVideo(cards[firstId].videoUrl || "");
          setCurrentTip(cards[firstId].educationalTip || "");
          setShowVideo(true);
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

  const closeVideo = () => {
    setShowVideo(false);
    setCurrentVideo("");
    setCurrentTip("");
  };

  const startNewGame = () => {
    initializeGame(difficulty / 2);
    setShowVideo(false);
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
          <p className="text-lg text-gray-600">Encontre os pares e aprenda algo novo!</p>
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
                  disabled={isGameActive && moves > 0}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    isGameActive && moves > 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-kidPink text-white hover:bg-red-600 cursor-pointer'
                  }`}
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
                onClick={startNewGame}
                disabled={!isGameActive && moves === 0}
                className={`px-4 py-2 rounded-full font-semibold transition-colors flex items-center gap-2 ${
                  !isGameActive && moves === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-kidBlue text-white hover:bg-blue-600 cursor-pointer'
                }`}
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
                  className={`aspect-square relative transition-all duration-200 ${
                    canFlipCards && isGameActive && !card.isFlipped && !card.isMatched 
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
              ))}
            </div>
          </div>

          {/* Modal de vídeo educativo */}
          {showVideo && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-6 max-w-2xl mx-4 animate-scale-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">🎓 Momento Educativo!</h3>
                  <button
                    onClick={closeVideo}
                    className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mb-4">
                  <video
                    src={currentVideo}
                    controls
                    autoPlay
                    className="w-full rounded-xl"
                    style={{ maxHeight: '300px' }}
                  >
                    Seu navegador não suporta vídeos.
                  </video>
                </div>
                
                <div className="bg-gradient-to-r from-kidBlue to-kidPurple text-white p-4 rounded-xl mb-4">
                  <p className="text-lg text-center">{currentTip}</p>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={closeVideo}
                    className="bg-kidGreen text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
                  >
                    Continuar Jogando
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de vitória */}
          {isCompleted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-8 text-center max-w-md mx-4 animate-bounce-gentle">
                <Trophy className="h-16 w-16 text-kidYellow mx-auto mb-4 animate-wiggle" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Fantástico! 🎉</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Você encontrou todos os pares em {moves} jogadas e aprendeu coisas novas!
                </p>
                <button
                  onClick={startNewGame}
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
