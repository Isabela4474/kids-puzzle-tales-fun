
import { Book, Puzzle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import GameCard from "../components/GameCard";

const Index = () => {
  const navigate = useNavigate();

  const games = [
    {
      title: "Livros Mágicos",
      description: "Descubra histórias incríveis e aventuras fantásticas!",
      icon: <Book className="h-16 w-16" />,
      bgColor: "bg-gradient-to-br from-kidGreen to-green-600",
      hoverColor: "hover:from-green-500 hover:to-green-700",
      path: "/books"
    },
    {
      title: "Quebra-cabeças",
      description: "Monte peças e desenvolva seu raciocínio!",
      icon: <Puzzle className="h-16 w-16" />,
      bgColor: "bg-gradient-to-br from-kidOrange to-orange-600",
      hoverColor: "hover:from-orange-500 hover:to-orange-700",
      path: "/puzzle"
    },
    {
      title: "Jogo da Memória",
      description: "Teste sua memória com cartas divertidas!",
      icon: <div className="h-16 w-16 bg-white rounded-lg flex items-center justify-center text-4xl">🧠</div>,
      bgColor: "bg-gradient-to-br from-kidPink to-red-600",
      hoverColor: "hover:from-red-500 hover:to-red-700",
      path: "/memory"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-bounce-gentle">
            🌟 Bem-vindos às Aventuras de Leitura! 🌟
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um mundo mágico de aprendizado onde você pode ler histórias incríveis, 
            resolver quebra-cabeças desafiadores e treinar sua memória com jogos divertidos!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {games.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              description={game.description}
              icon={game.icon}
              bgColor={game.bgColor}
              hoverColor={game.hoverColor}
              onClick={() => navigate(game.path)}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🎯 Objetivos de Aprendizado</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">📚</div>
                <h3 className="font-bold text-lg text-kidBlue">Desenvolver a Leitura</h3>
                <p className="text-gray-600">Melhore suas habilidades de leitura com histórias envolventes</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🧩</div>
                <h3 className="font-bold text-lg text-kidOrange">Raciocínio Lógico</h3>
                <p className="text-gray-600">Desenvolva o pensamento crítico com quebra-cabeças</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🧠</div>
                <h3 className="font-bold text-lg text-kidPink">Memória</h3>
                <p className="text-gray-600">Treine e fortaleça sua capacidade de memorização</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
