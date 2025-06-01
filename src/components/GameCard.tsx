
import React from 'react';

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  hoverColor: string;
  onClick: () => void;
}

const GameCard = ({ title, description, icon, bgColor, hoverColor, onClick }: GameCardProps) => {
  return (
    <div 
      className={`${bgColor} ${hoverColor} rounded-3xl p-8 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="mb-4 flex justify-center group-hover:animate-bounce-gentle">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-lg opacity-90">{description}</p>
      </div>
    </div>
  );
};

export default GameCard;
