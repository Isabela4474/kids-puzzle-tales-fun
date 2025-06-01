
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Puzzle as PuzzleIcon, RotateCcw, Trophy } from "lucide-react";

const Puzzle = () => {
  const [pieces, setPieces] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState(3);

  // Inicializar quebra-cabeça
  const initializePuzzle = (size: number) => {
    const totalPieces = size * size;
    const shuffled = Array.from({ length: totalPieces }, (_, i) => i).sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    setMoves(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    initializePuzzle(difficulty);
  }, [difficulty]);

  // Verificar se o quebra-cabeça está completo
  useEffect(() => {
    const isComplete = pieces.every((piece, index) => piece === index);
    setIsCompleted(isComplete);
  }, [pieces]);

  // Mover peça
  const movePiece = (index: number) => {
    if (isCompleted) return;

    const newPieces = [...pieces];
    const emptyIndex = pieces.indexOf(difficulty * difficulty - 1); // Última peça é a "vazia"
    
    // Verificar se a peça pode ser movida (adjacente à posição vazia)
    const canMove = 
      (index === emptyIndex - 1 && emptyIndex % difficulty !== 0) || // Esquerda
      (index === emptyIndex + 1 && index % difficulty !== 0) || // Direita
      index === emptyIndex - difficulty || // Acima
      index === emptyIndex + difficulty; // Abaixo

    if (canMove) {
      newPieces[emptyIndex] = newPieces[index];
      newPieces[index] = difficulty * difficulty - 1;
      setPieces(newPieces);
      setMoves(moves + 1);
    }
  };

  const getPieceContent = (piece: number) => {
    if (piece === difficulty * difficulty - 1) return ""; // Peça vazia
    
    // Emojis para diferentes peças
    const emojis = ["🐶", "🐱", "🐰", "🦁", "🐸", "🐧", "🦋", "🌟", "🌈"];
    return emojis[piece % emojis.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <PuzzleIcon className="h-10 w-10 text-kidOrange animate-wiggle" />
            Quebra-cabeças Mágico
          </h1>
          <p className="text-lg text-gray-600">Organize as peças na ordem correta!</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Controles */}
          <div className="bg-white rounded-3xl p-6 shadow-xl mb-8">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="font-semibold text-gray-700">Dificuldade:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                  className="bg-kidOrange text-white px-4 py-2 rounded-full font-semibold"
                >
                  <option value={3}>Fácil (3x3)</option>
                  <option value={4}>Médio (4x4)</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-semibold">Movimentos: {moves}</span>
              </div>
              
              <button
                onClick={() => initializePuzzle(difficulty)}
                className="bg-kidBlue text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Novo Jogo
              </button>
            </div>
          </div>

          {/* Quebra-cabeça */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div 
              className="grid gap-2 mx-auto"
              style={{ 
                gridTemplateColumns: `repeat(${difficulty}, 1fr)`,
                maxWidth: `${difficulty * 80}px`
              }}
            >
              {pieces.map((piece, index) => (
                <div
                  key={index}
                  onClick={() => movePiece(index)}
                  className={`
                    aspect-square flex items-center justify-center text-4xl font-bold rounded-xl cursor-pointer transition-all duration-200
                    ${piece === difficulty * difficulty - 1 
                      ? 'bg-gray-200' 
                      : 'bg-gradient-to-br from-kidYellow to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                    }
                  `}
                >
                  {getPieceContent(piece)}
                </div>
              ))}
            </div>
          </div>

          {/* Modal de vitória */}
          {isCompleted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-8 text-center max-w-md mx-4 animate-bounce-gentle">
                <Trophy className="h-16 w-16 text-kidYellow mx-auto mb-4 animate-wiggle" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Parabéns! 🎉</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Você completou o quebra-cabeça em {moves} movimentos!
                </p>
                <button
                  onClick={() => initializePuzzle(difficulty)}
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

export default Puzzle;
