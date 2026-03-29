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

export interface AIBuddy {
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  personality: string[];
  achievements: { id: string; title: string; icon: React.ReactNode; date: string }[];
  customization: {
    color: string;
    accessory: string;
    voice: string;
  };
}

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  joinedDate: string;
  buddy: AIBuddy;
  stats: {
    gamesPlayed: number;
    messagesSent: number;
    loungeTime: string;
  };
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
