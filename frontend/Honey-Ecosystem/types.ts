
export interface Message {
  id: string;
  sender: 'user' | 'ai' | 'other';
  text: string;
  timestamp: Date;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Course {
  id: string;
  title: string;
  author: string;
  image: string;
  category: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
}
