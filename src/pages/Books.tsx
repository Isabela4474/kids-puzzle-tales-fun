
import { useState } from "react";
import Header from "../components/Header";
import { Book } from "lucide-react";

const Books = () => {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);

  const books = [
    {
      id: 1,
      title: "O Pequeno Coelho Aventureiro",
      cover: "🐰",
      story: "Era uma vez um pequeno coelho chamado Pulo que adorava explorar a floresta. Um dia, ele encontrou uma trilha misteriosa que o levou a uma aventura incrível...",
      fullStory: [
        "Era uma vez um pequeno coelho chamado Pulo que adorava explorar a floresta.",
        "Um dia, ele encontrou uma trilha misteriosa coberta de flores coloridas.",
        "Seguindo a trilha, Pulo descobriu uma clareira mágica onde os animais da floresta se reuniam.",
        "Lá, ele aprendeu sobre a importância da amizade e da coragem.",
        "E assim, Pulo se tornou o coelho mais corajoso de toda a floresta!"
      ]
    },
    {
      id: 2,
      title: "A Princesa e o Dragão Bondoso",
      cover: "👸",
      story: "Em um reino distante, vivia uma princesa muito esperta que descobriu que nem todos os dragões são malvados...",
      fullStory: [
        "Em um reino distante, vivia uma princesa muito esperta chamada Luna.",
        "Um dia, ela ouviu sobre um dragão que vivia na montanha próxima.",
        "Todos tinham medo, mas Luna decidiu conhecê-lo pessoalmente.",
        "Para sua surpresa, o dragão era muito gentil e apenas se sentia sozinho.",
        "Luna e o dragão se tornaram grandes amigos, provando que a aparência não define o caráter!"
      ]
    },
    {
      id: 3,
      title: "O Gato que Amava Estrelas",
      cover: "🐱",
      story: "Miau era um gato diferente de todos os outros - ele passava as noites olhando para o céu estrelado...",
      fullStory: [
        "Miau era um gato diferente de todos os outros da vizinhança.",
        "Enquanto os outros gatos caçavam ratos, Miau passava as noites olhando as estrelas.",
        "Uma noite, uma estrela cadente realizou seu maior desejo.",
        "Miau pôde voar pelo céu e conhecer todas as constelações.",
        "Quando voltou para casa, ele se tornou o contador de histórias do céu para todos os animais!"
      ]
    }
  ];

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Book className="h-10 w-10 text-kidGreen animate-bounce-gentle" />
            Biblioteca Mágica
          </h1>
          <p className="text-lg text-gray-600">Escolha uma história e embarque em uma aventura incrível!</p>
        </div>

        {!selectedBook ? (
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-3xl p-6 shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                onClick={() => setSelectedBook(book.id)}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce-gentle">{book.cover}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{book.title}</h3>
                  <p className="text-gray-600 text-sm">{book.story}</p>
                  <button className="mt-4 bg-kidGreen text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors">
                    Ler História
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-xl">
            {(() => {
              const book = books.find(b => b.id === selectedBook)!;
              return (
                <>
                  <div className="text-center mb-8">
                    <div className="text-8xl mb-4">{book.cover}</div>
                    <h2 className="text-3xl font-bold text-gray-800">{book.title}</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-kidBlue to-kidPurple text-white rounded-2xl p-8 mb-6">
                    <p className="text-xl leading-relaxed text-center">
                      {book.fullStory[currentPage]}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      className="bg-kidOrange text-white px-6 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
                    >
                      ← Página Anterior
                    </button>
                    
                    <div className="text-center">
                      <p className="text-gray-600">Página {currentPage + 1} de {book.fullStory.length}</p>
                      <div className="flex gap-2 mt-2 justify-center">
                        {book.fullStory.map((_, index) => (
                          <div
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                              index === currentPage ? 'bg-kidBlue' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {currentPage < book.fullStory.length - 1 ? (
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="bg-kidGreen text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
                      >
                        Próxima Página →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedBook(null);
                          setCurrentPage(0);
                        }}
                        className="bg-kidPink text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors"
                      >
                        Voltar aos Livros
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </main>
    </div>
  );
};

export default Books;
