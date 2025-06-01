
import { Book } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Início', color: 'bg-kidBlue hover:bg-blue-600' },
    { path: '/books', label: 'Livros', color: 'bg-kidGreen hover:bg-green-600' },
    { path: '/puzzle', label: 'Quebra-cabeça', color: 'bg-kidOrange hover:bg-orange-600' },
    { path: '/memory', label: 'Jogo da Memória', color: 'bg-kidPink hover:bg-red-600' }
  ];

  return (
    <header className="bg-gradient-to-r from-kidBlue to-kidPurple text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <Book className="h-8 w-8 animate-bounce-gentle" />
          <h1 className="text-2xl font-bold">Aventuras de Leitura</h1>
        </div>
        
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                location.pathname === item.path 
                  ? 'bg-white text-kidBlue shadow-lg' 
                  : `${item.color} text-white`
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="md:hidden">
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
