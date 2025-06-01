
export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  videoUrl?: string;
  educationalTip?: string;
}

export interface CardData {
  emoji: string;
  videoUrl: string;
  tip: string;
}
