
import { RotateCcw } from "lucide-react";

interface GameControlsProps {
  difficulty: number;
  setDifficulty: (difficulty: number) => void;
  moves: number;
  matches: number;
  isGameActive: boolean;
  onNewGame: () => void;
}

const GameControls = ({ 
  difficulty, 
  setDifficulty, 
  moves, 
  matches, 
  isGameActive, 
  onNewGame 
}: GameControlsProps) => {
  return (
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
          onClick={onNewGame}
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
  );
};

export default GameControls;
