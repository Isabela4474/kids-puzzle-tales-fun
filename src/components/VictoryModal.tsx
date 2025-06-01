
import { Trophy } from "lucide-react";

interface VictoryModalProps {
  isVisible: boolean;
  moves: number;
  onNewGame: () => void;
}

const VictoryModal = ({ isVisible, moves, onNewGame }: VictoryModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 text-center max-w-md mx-4 animate-bounce-gentle">
        <Trophy className="h-16 w-16 text-kidYellow mx-auto mb-4 animate-wiggle" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Fantástico! 🎉</h2>
        <p className="text-lg text-gray-600 mb-6">
          Você encontrou todos os pares em {moves} jogadas!
        </p>
        <button
          onClick={onNewGame}
          className="bg-kidGreen text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  );
};

export default VictoryModal;
