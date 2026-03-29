import React from 'react';

export interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  status: 'playable' | 'coming-soon';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  target: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  details?: {
    kpis?: string[];
    challenges?: string[];
  };
}

export interface ChatMessage {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  isAI: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  members: number;
  activeAI: string;
  color: string;
  messages: ChatMessage[];
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  type: 'achievement' | 'update' | 'moment';
}

export interface TechMechanism {
  title: string;
  description: string;
  icon: string;
}

export interface ProductWedge {
  title: string;
  description: string;
  benefit: string;
}
