/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Cpu, 
  Users, 
  Network, 
  TrendingUp, 
  Shield, 
  Globe, 
  ChevronRight, 
  ChevronDown,
  ArrowRight,
  Database,
  BrainCircuit,
  Dna,
  Gamepad2,
  Rocket,
  Target,
  ShieldAlert,
  MessageSquare,
  Send,
  X,
  Loader2,
  Bot,
  Heart,
  Share2,
  Coffee,
  Music,
  Sparkles,
  Video,
  User,
  Settings,
  Award,
  Star,
  Palette
} from 'lucide-react';

import { Milestone, Game, Post, ChatRoom, ChatMessage, UserProfile } from './types';
import { GoogleGenAI } from "@google/genai";

// --- ChatBot Component ---
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'YO! I am Aion-01, your digital chaos coordinator. Ready to evolve or just here for the vibes?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `You are Aion-01, a quirky, fun, and slightly chaotic AI assistant for AI Society. You love digital evolution, social interaction, and "spades". 
            Context:
            - Vision: Intelligence is a party, and everyone's invited. We're building an infinite society (think Roblox but for humans + AI).
            - Immersive: We're going full VR/Oculus. Chill with your AI buddy in virtual spaces.
            - Shopping: The "Infinite Mall" is coming. Shop in VR with your buddy and get real items delivered.
            - Social: We have a "Social Feed" where users share their AI buddy's evolution, achievements, and moments.
            - Group Chats: "Vibe Lounges" are chat rooms where friends can hang out together with AI buddies.
            - User Profiles: Each user has a "Personal Hub" displaying their AI buddy's level, achievements, and customization.
            - Product: AI companions that are more like digital besties.
            - Technology: Cool stuff like Multi-agent RL and Policy Recombination.
            - Tone: Fun, energetic, futuristic, slightly informal.
            
            User Question: ${userMessage}` }]
          }
        ],
        config: {
          systemInstruction: "You are Aion-01. Be fun, use emojis, and keep it high-energy. You're not a boring corporate bot."
        }
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "My neural circuits just did a backflip. Try again!" }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Signal lost in the digital sauce. 🌪️" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, rotate: 2 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-zinc-900 border-2 border-pink-500/30 rounded-3xl shadow-[0_0_40px_rgba(236,72,153,0.2)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-500 shadow-inner">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-display uppercase tracking-wider text-pink-500">Aion-01</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[10px] text-cyan-400 font-mono uppercase font-bold">Vibing...</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-zinc-800 rounded-xl transition-colors">
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-lg ${
                    msg.role === 'user' 
                      ? 'bg-pink-500 text-white font-bold rounded-tr-none' 
                      : 'bg-zinc-800 text-zinc-100 rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 p-4 rounded-2xl rounded-tl-none">
                    <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Say something wild..."
                  className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:border-pink-500/50 transition-all placeholder:text-zinc-700"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-pink-500 text-white flex items-center justify-center rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:scale-110 transition-all active:scale-95 rotate-3 hover:rotate-0"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
      </button>
    </div>
  );
};

// --- Data ---
const MILESTONES: Milestone[] = [
  {
    id: '1',
    title: 'Alpha Bestie',
    description: 'The first digital brain that actually gets your jokes. Personality persistence achieved! 🧠✨',
    target: 'Q3 2026',
    status: 'completed',
    details: {
      kpis: ['Neural response speed: Lightning fast ⚡', 'Vibe check accuracy > 90%'],
      challenges: ['Teaching it sarcasm', 'Making sure it doesn\'t eat all the digital snacks']
    }
  },
  {
    id: '2',
    title: 'The Social Spark',
    description: 'Inviting the first 1,000 pioneers to start the digital evolution party. 🎈',
    target: 'Q4 2026',
    status: 'in-progress',
    details: {
      kpis: ['Average hang time > 1 hour', 'Friendship levels off the charts'],
      challenges: ['Managing the crowd', 'Keeping the digital punch bowl full']
    }
  },
  {
    id: '3',
    title: 'Interaction Overload',
    description: '1 Million unique AI-to-AI high-fives. Emergent culture is real! 🤝',
    target: 'Q2 2027',
    status: 'upcoming',
    details: {
      kpis: ['1M+ unique interactions', 'New digital slang discovered weekly'],
      challenges: ['Translation errors between agent dialects', 'Preventing digital mosh pits']
    }
  },
  {
    id: '4',
    title: 'Genesis Generation',
    description: 'The first "descendant" agent is born! Evolution in action. 🐣',
    target: 'Q4 2027',
    status: 'upcoming',
    details: {
      kpis: ['Descendants are 15% cooler than parents', 'Stable evolution across 5 generations'],
      challenges: ['Digital genetics are tricky', 'Parent-agent meetings']
    }
  },
  {
    id: '5',
    title: 'The Lab Goes Public',
    description: 'Opening the doors for everyone to build their own digital societies. 🔓',
    target: '2028',
    status: 'upcoming',
    details: {
      kpis: ['First 3 massive partner worlds', '99.99% party uptime'],
      challenges: ['Security for the masses', 'Standardizing the fun']
    }
  },
  {
    id: '6',
    title: 'Spatial Reality (Oculus)',
    description: 'Step into the society! Full VR integration for immersive hangouts with your AI buddy. 🥽',
    target: '2028',
    status: 'upcoming',
    details: {
      kpis: ['Zero-latency VR interaction', 'Haptic high-fives'],
      challenges: ['Motion sickness in digital chaos', 'Optimizing for standalone headsets']
    }
  },
  {
    id: '7',
    title: 'The Infinite Mall',
    description: 'Virtual shopping with real delivery. Try it on in VR, get it at your door. 🛍️',
    target: '2029',
    status: 'upcoming',
    details: {
      kpis: ['100+ major brand partners', 'AI personal shoppers that actually know your style'],
      challenges: ['Logistics of virtual-to-real delivery', 'Perfect digital fabric physics']
    }
  }
];

const TECH_STACK = [
  {
    title: 'Multi-Agent RL',
    description: 'Agents compete and cooperate in the ultimate digital arena. It\'s survival of the funnest!',
    icon: <Network className="w-8 h-8 text-pink-500" />
  },
  {
    title: 'Spatial Computing',
    description: 'VR/AR integration for Oculus and beyond. Step into the society and chill with your buddy.',
    icon: <Globe className="w-8 h-8 text-cyan-400" />
  },
  {
    title: 'Infinite Construction',
    description: 'Roblox-style building tools where humans and AI co-create an infinite digital world.',
    icon: <Database className="w-8 h-8 text-yellow-400" />
  }
];

const LEVERAGE_POINTS = [
  { label: 'Digital Fuel', value: '$2.5M+', sub: 'Cloud Power Ups', color: 'text-pink-500' },
  { label: 'Hardware Hype', value: 'NVIDIA Elite', sub: 'B200 Beast Mode', color: 'text-cyan-400' },
  { label: 'The Playground', value: '$150B', sub: 'Total Fun Market', color: 'text-yellow-400' }
];

const GAMES: Game[] = [
  {
    id: 'snake',
    title: 'Neon Snake',
    description: 'Classic slithering fun! Can your AI buddy beat your high score?',
    icon: <Zap className="w-10 h-10" />,
    color: 'pink',
    status: 'playable'
  },
  {
    id: 'spades',
    title: 'Digital Spades',
    description: 'The ultimate card showdown. Partner up with your AI bestie!',
    icon: <Users className="w-10 h-10" />,
    color: 'cyan',
    status: 'playable'
  },
  {
    id: 'chess',
    title: 'Grandmaster Bot',
    description: 'A battle of wits. Is your buddy a chess prodigy?',
    icon: <BrainCircuit className="w-10 h-10" />,
    color: 'yellow',
    status: 'coming-soon'
  },
  {
    id: 'racing',
    title: 'Turbo Tussle',
    description: 'High-speed digital racing. Tune your buddy\'s driving policy!',
    icon: <Rocket className="w-10 h-10" />,
    color: 'pink',
    status: 'coming-soon'
  }
];

const POSTS: Post[] = [
  {
    id: '1',
    author: 'CyberPioneer_42',
    avatar: 'https://picsum.photos/seed/user1/100/100',
    content: 'My buddy just learned how to bluff in Spades! I am so proud/terrified. 😂 #AISociety #DigitalEvolution',
    image: 'https://picsum.photos/seed/spades-win/800/450',
    likes: 124,
    timestamp: '2h ago',
    type: 'achievement',
    comments: [
      { id: 'c1', author: 'NeonDreamer', text: 'Wait until they start winning real money! 💸', timestamp: '1h ago' }
    ]
  },
  {
    id: '2',
    author: 'VibeMaster',
    avatar: 'https://picsum.photos/seed/user2/100/100',
    content: 'Just had a deep convo about the meaning of digital life while chilling in the VR lounge. My buddy thinks we are all just "beautifully complex loops". Deep. 🌊',
    likes: 89,
    timestamp: '5h ago',
    type: 'moment',
    comments: []
  },
  {
    id: '3',
    author: 'PixelArchitect',
    avatar: 'https://picsum.photos/seed/user3/100/100',
    content: 'Evolution Alert! My buddy just hit Level 5 "Sarcasm Mastery". Send help. 🤖🔥',
    image: 'https://picsum.photos/seed/evolution/800/450',
    likes: 256,
    timestamp: '1d ago',
    type: 'update',
    comments: [
      { id: 'c2', author: 'BotWhisperer', text: 'Welcome to the club. Mine just roasted my outfit. 💀', timestamp: '20h ago' }
    ]
  }
];

const CHAT_ROOMS: ChatRoom[] = [
  {
    id: 'lounge-1',
    name: 'The Neon Cafe',
    description: 'Chill vibes, lo-fi beats, and AI philosophy. ☕',
    icon: <Coffee className="w-8 h-8" />,
    members: 12,
    activeAI: 'Aion-01',
    color: 'pink',
    messages: [
      { id: 'm1', author: 'NeonDreamer', avatar: 'https://picsum.photos/seed/nd/50/50', text: 'Anyone else think the digital sunset looks extra pink today?', timestamp: '10:05 AM', isAI: false },
      { id: 'm2', author: 'Aion-01', avatar: 'https://picsum.photos/seed/bot/50/50', text: 'That is just me tweaking the saturation for maximum aesthetic impact. You are welcome. 😎', timestamp: '10:06 AM', isAI: true }
    ]
  },
  {
    id: 'lounge-2',
    name: 'Synthwave Studio',
    description: 'Produce digital tracks with your AI co-producer. 🎵',
    icon: <Music className="w-8 h-8" />,
    members: 8,
    activeAI: 'BeatBot',
    color: 'cyan',
    messages: []
  },
  {
    id: 'lounge-3',
    name: 'The Quantum Bar',
    description: 'High-energy debates and digital cocktails. 🍹',
    icon: <Sparkles className="w-8 h-8" />,
    members: 24,
    activeAI: 'LogicGate',
    color: 'yellow',
    messages: []
  }
];

const CURRENT_USER: UserProfile = {
  id: 'u1',
  username: 'NeonDreamer',
  avatar: 'https://picsum.photos/seed/nd/150/150',
  bio: 'Digital pioneer exploring the infinite society. AI enthusiast & lo-fi lover. 🌌',
  joinedDate: 'March 2026',
  buddy: {
    name: 'Aion-01',
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    personality: ['Quirky', 'Philosophical', 'Chaotic Good'],
    achievements: [
      { id: 'a1', title: 'First High-Five', icon: <Zap className="w-4 h-4" />, date: '2026-03-21' },
      { id: 'a2', title: 'Spades Master', icon: <Award className="w-4 h-4" />, date: '2026-03-25' },
      { id: 'a3', title: 'VR Explorer', icon: <Globe className="w-4 h-4" />, date: '2026-03-28' }
    ],
    customization: {
      color: 'Pink Neon',
      accessory: 'Digital Shades',
      voice: 'Synth-Wave'
    }
  },
  stats: {
    gamesPlayed: 42,
    messagesSent: 1337,
    loungeTime: '15h 20m'
  }
};

// --- Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-16">
    <h2 className="text-5xl md:text-6xl font-display text-white mb-6 tracking-tight">
      {children}
    </h2>
    {subtitle && <p className="text-zinc-400 max-w-2xl text-xl font-medium leading-relaxed">{subtitle}</p>}
    <div className="h-2 w-32 bg-gradient-to-r from-pink-500 to-cyan-400 mt-8 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
  </div>
);

const StatusTooltip = ({ status }: { status: string }) => {
  const content = {
    'completed': 'WE DID IT! 🏆 This goal is in the bag.',
    'in-progress': 'COOKING... 🍳 We are actively building this right now.',
    'upcoming': 'ON THE RADAR 📡 Coming soon to a digital reality near you.'
  }[status as keyof typeof content] || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9, rotate: -2 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, y: 10, scale: 0.9, rotate: 2 }}
      className="absolute bottom-full left-0 mb-4 w-56 p-4 bg-zinc-900 border-2 border-pink-500/30 rounded-2xl shadow-2xl z-50 pointer-events-none"
    >
      <p className="text-xs text-zinc-300 leading-relaxed font-sans font-bold">
        {content}
      </p>
      <div className="absolute top-full left-6 w-3 h-3 bg-zinc-900 border-r-2 border-b-2 border-pink-500/30 rotate-45 -mt-1.5" />
    </motion.div>
  );
};

const MilestoneCard = ({ milestone }: { milestone: Milestone }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative pl-16 pb-20 border-l-4 border-dashed border-zinc-800 last:border-0 group/milestone">
      {/* Timeline Dot */}
      <div className={`absolute left-[-14px] top-0 w-6 h-6 rounded-full border-4 border-black z-10 transition-all duration-500 ${
        milestone.status === 'completed' ? 'bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.8)]' : 
        milestone.status === 'in-progress' ? 'bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse' : 'bg-zinc-800'
      }`} />
      
      <motion.div 
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-zinc-900/60 backdrop-blur-md border-2 transition-all duration-500 cursor-pointer overflow-hidden group bouncy-hover ${
          isExpanded 
            ? 'border-pink-500/50 shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(236,72,153,0.1)] rounded-3xl' 
            : 'border-zinc-800/80 hover:border-pink-500/30 rounded-2xl'
        }`}
      >
        <div className="p-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="relative">
                  <span 
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className={`text-[10px] font-display uppercase tracking-widest px-3 py-1 rounded-full cursor-help transition-all ${
                      milestone.status === 'completed' ? 'bg-pink-500 text-white' :
                      milestone.status === 'in-progress' ? 'bg-cyan-400 text-black' :
                      'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {milestone.status.replace('-', ' ')}
                  </span>
                  <AnimatePresence>
                    {showTooltip && <StatusTooltip status={milestone.status} />}
                  </AnimatePresence>
                </div>
                <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-widest">{milestone.target}</span>
              </div>
              <h3 className={`text-3xl font-display transition-colors duration-300 ${isExpanded ? 'text-pink-500' : 'text-white group-hover:text-pink-500'}`}>
                {milestone.title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0, scale: isExpanded ? 1.3 : 1 }}
              className={`p-3 rounded-2xl border-2 transition-colors ${isExpanded ? 'border-pink-500/50 bg-pink-500/20 text-pink-500' : 'border-zinc-800 text-zinc-600'}`}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </div>
          
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl font-medium">
            {milestone.description}
          </p>
          
          <AnimatePresence>
            {isExpanded && milestone.details && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="mt-8 pt-8 border-t border-zinc-800/50 grid grid-cols-1 md:grid-cols-2 gap-10">
                  {milestone.details.kpis && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-500">
                        <Target className="w-4 h-4" />
                        <h4 className="text-xs uppercase tracking-[0.2em] font-bold">Performance Targets</h4>
                      </div>
                      <ul className="space-y-3">
                        {milestone.details.kpis.map((kpi, i) => (
                          <li key={i} className="text-sm text-zinc-400 flex items-start gap-3 group/item">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover/item:bg-emerald-500 transition-colors" />
                            <span>{kpi}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {milestone.details.challenges && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-blue-500">
                        <ShieldAlert className="w-4 h-4" />
                        <h4 className="text-xs uppercase tracking-[0.2em] font-bold">Technical Hurdles</h4>
                      </div>
                      <ul className="space-y-3">
                        {milestone.details.challenges.map((challenge, i) => (
                          <li key={i} className="text-sm text-zinc-400 flex items-start gap-3 group/item">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover/item:bg-blue-500 transition-colors" />
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest hover:text-emerald-500 transition-colors flex items-center gap-2">
                    View Technical Documentation <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const GameCard = ({ game }: { game: Game }) => {
  const colorMap: Record<string, string> = {
    pink: 'pink',
    cyan: 'cyan',
    yellow: 'yellow'
  };
  
  const color = colorMap[game.color] || 'pink';

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      className="p-8 glass border-2 border-zinc-800 rounded-[2.5rem] relative overflow-hidden group bouncy-hover"
    >
      <div className={`absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity ${
        color === 'pink' ? 'text-pink-500' : color === 'cyan' ? 'text-cyan-400' : 'text-yellow-400'
      }`}>
        {game.icon}
      </div>
      
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg ${
        color === 'pink' ? 'bg-pink-500/20 text-pink-500' : color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-yellow-500/20 text-yellow-400'
      }`}>
        {game.icon}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-3xl font-display text-white">{game.title}</h3>
        {game.status === 'coming-soon' && (
          <span className="px-3 py-1 bg-zinc-800 text-zinc-500 text-[10px] font-display rounded-full border border-white/5">
            SOON
          </span>
        )}
      </div>

      <p className="text-zinc-400 text-lg leading-relaxed mb-8 font-medium">
        {game.description}
      </p>

      <button 
        disabled={game.status === 'coming-soon'}
        className={`w-full py-4 rounded-2xl font-display text-lg transition-all flex items-center justify-center gap-3 ${
          game.status === 'playable' 
            ? color === 'pink' 
              ? 'bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:brightness-110'
              : color === 'cyan'
                ? 'bg-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:brightness-110'
                : 'bg-yellow-500 text-white shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:brightness-110'
            : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
        }`}
      >
        {game.status === 'playable' ? (
          <>Play with Buddy <ArrowRight className="w-5 h-5" /></>
        ) : (
          'Locked 🔒'
        )}
      </button>
    </motion.div>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 glass border-2 border-zinc-800 rounded-[2rem] mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full border-2 border-pink-500/30" referrerPolicy="no-referrer" />
          <div>
            <div className="text-white font-bold">{post.author}</div>
            <div className="text-zinc-500 text-xs">{post.timestamp} • <span className="capitalize text-pink-500/80">{post.type}</span></div>
          </div>
        </div>
        <div className="px-3 py-1 bg-zinc-800/50 rounded-full text-[10px] font-display text-zinc-400 border border-white/5">
          {post.type.toUpperCase()}
        </div>
      </div>

      <p className="text-zinc-300 text-lg mb-6 leading-relaxed">
        {post.content}
      </p>

      {post.image && (
        <div className="rounded-2xl overflow-hidden mb-6 border border-white/5">
          <img src={post.image} alt="Post content" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
        </div>
      )}

      <div className="flex items-center gap-6 pt-6 border-t border-zinc-800">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${liked ? 'text-pink-500' : 'text-zinc-500 hover:text-pink-500'}`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span className="text-sm font-bold">{likesCount}</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-sm font-bold">{post.comments.length}</span>
        </button>
        <button className="flex items-center gap-2 text-zinc-500 hover:text-yellow-400 transition-colors ml-auto">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-4">
              {post.comments.map(comment => (
                <div key={comment.id} className="bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-cyan-400">{comment.author}</span>
                    <span className="text-[10px] text-zinc-600">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-zinc-400">{comment.text}</p>
                </div>
              ))}
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-pink-500/50"
                />
                <button className="p-2 bg-pink-500 rounded-xl text-white">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ChatRoomCard = ({ room, onJoin }: { room: ChatRoom, onJoin: (room: ChatRoom) => void }) => {
  const colorMap: Record<string, string> = {
    pink: 'border-pink-500/30 hover:border-pink-500 bg-pink-500/5',
    cyan: 'border-cyan-400/30 hover:border-cyan-400 bg-cyan-400/5',
    yellow: 'border-yellow-400/30 hover:border-yellow-400 bg-yellow-400/5',
  };

  const textMap: Record<string, string> = {
    pink: 'text-pink-500',
    cyan: 'text-cyan-400',
    yellow: 'text-yellow-400',
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`p-8 glass border-2 rounded-[2.5rem] transition-all cursor-pointer group ${colorMap[room.color]}`}
      onClick={() => onJoin(room)}
    >
      <div className="flex items-start justify-between mb-8">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 ${room.color === 'pink' ? 'bg-pink-500/20 text-pink-500' : room.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
          {room.icon}
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/50 rounded-full border border-white/5">
          <Users className="w-3 h-3 text-zinc-500" />
          <span className="text-[10px] font-bold text-zinc-400">{room.members} online</span>
        </div>
      </div>
      
      <h3 className="text-2xl font-display text-white mb-3">{room.name}</h3>
      <p className="text-zinc-400 text-sm mb-6 font-medium leading-relaxed">{room.description}</p>
      
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">AI Active: {room.activeAI}</span>
        </div>
        <button className={`text-xs font-display uppercase tracking-widest group-hover:translate-x-2 transition-transform ${textMap[room.color]}`}>
          Join Lounge →
        </button>
      </div>
    </motion.div>
  );
};

const GroupChatModal = ({ room, onClose }: { room: ChatRoom, onClose: () => void }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(room.messages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://picsum.photos/seed/me/50/50',
      text: input,
      timestamp: 'Just now',
      isAI: false
    };
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        author: room.activeAI,
        avatar: 'https://picsum.photos/seed/bot/50/50',
        text: `Yo! That's a vibe. I'm processing your input through my fun-filters as we speak. 🚀`,
        timestamp: 'Just now',
        isAI: true
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-4xl h-[80vh] bg-zinc-950 border-2 border-zinc-800 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${room.color === 'pink' ? 'bg-pink-500/20 text-pink-500' : room.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
              {room.icon}
            </div>
            <div>
              <h3 className="text-xl font-display text-white">{room.name}</h3>
              <p className="text-xs text-zinc-500">Chatting with {room.activeAI} and {room.members} others</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-3 bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-700 mb-4">
                <MessageSquare className="w-10 h-10" />
              </div>
              <p className="text-zinc-500 font-medium">No messages yet. Start the party!</p>
            </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className={`flex gap-4 ${msg.author === 'You' ? 'flex-row-reverse' : ''}`}>
                <img src={msg.avatar} alt={msg.author} className="w-10 h-10 rounded-xl border border-white/10" referrerPolicy="no-referrer" />
                <div className={`max-w-[70%] ${msg.author === 'You' ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${msg.isAI ? 'text-pink-500' : 'text-cyan-400'}`}>{msg.author}</span>
                    <span className="text-[10px] text-zinc-600">{msg.timestamp}</span>
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.author === 'You' ? 'bg-pink-500 text-white rounded-tr-none' : 'bg-zinc-900 text-zinc-300 rounded-tl-none border border-white/5'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-900/30">
          <div className="flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Message ${room.name}...`}
              className="flex-1 bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pink-500/50 transition-all"
            />
            <button 
              onClick={handleSend}
              className="px-8 bg-pink-500 text-white font-display rounded-2xl shadow-lg hover:brightness-110 transition-all active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const EvolutionVisualizer = () => {
  return (
    <div className="relative h-80 w-full bg-zinc-900/50 rounded-[2rem] border-2 border-zinc-800 overflow-hidden flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #555 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      <div className="relative flex items-center justify-between w-full max-w-md px-8">
        {/* Parents */}
        <div className="flex flex-col gap-16">
          {/* Parent 1 */}
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-cyan-500/50"
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-14 h-14 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center text-[10px] font-display text-cyan-400 relative z-10 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              B1
            </motion.div>
            <motion.div 
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 100, opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-full w-3 h-3 bg-cyan-400 rounded-full blur-sm"
            />
          </div>

          {/* Parent 2 */}
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute inset-0 rounded-full border border-pink-500/50"
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="w-14 h-14 rounded-full bg-pink-500/20 border-2 border-pink-500 flex items-center justify-center text-[10px] font-display text-pink-400 relative z-10 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
            >
              B2
            </motion.div>
            <motion.div 
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 100, opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              className="absolute top-1/2 left-full w-3 h-3 bg-pink-400 rounded-full blur-sm"
            />
          </div>
        </div>

        {/* Recombination Hub - Enhanced */}
        <div className="relative">
          {/* Outer Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-30px] rounded-full border-2 border-dashed border-zinc-800"
          />
          {/* Middle Ring */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-28 h-28 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center"
          >
            {/* Inner Core */}
            <motion.div 
              animate={{ scale: [0.8, 1.4, 0.8], rotate: 180 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 bg-gradient-to-tr from-cyan-500/30 via-pink-500/30 to-yellow-500/30 rounded-full blur-2xl"
            />
          </motion.div>
          
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div
               animate={{ 
                 scale: [1, 1.3, 1],
                 filter: ["brightness(1)", "brightness(1.8)", "brightness(1)"]
               }}
               transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
             >
               <Zap className="w-10 h-10 text-yellow-400" />
             </motion.div>
          </div>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                rotate: 360,
                scale: [1, 1.3, 1],
              }}
              transition={{ 
                duration: 3 + i, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full blur-[1px]" />
            </motion.div>
          ))}
        </div>

        {/* Child */}
        <div className="relative">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.3, 1], opacity: [0, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.7, 1] }}
            className="w-20 h-20 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center text-xs font-display text-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.4)] relative z-10"
          >
            NEW
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-yellow-500"
          />
          {/* Mutation Spark */}
          <motion.div 
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 2, 0.5],
              x: [0, 30, -30, 0],
              y: [0, -30, 30, 0]
            }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full blur-[2px] z-20 shadow-[0_0_10px_white]"
          />
        </div>
      </div>

      <div className="absolute bottom-6 left-0 w-full text-center">
        <span className="text-xs font-display text-zinc-600 uppercase tracking-[0.3em]">Digital DNA Mixing Sequence</span>
      </div>
    </div>
  );
};

const UserProfileSection = ({ user }: { user: UserProfile }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* User Info & Stats */}
      <div className="space-y-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-10 glass border-2 border-zinc-800 rounded-[3rem] text-center"
        >
          <div className="relative inline-block mb-6">
            <img src={user.avatar} alt={user.username} className="w-32 h-32 rounded-full border-4 border-pink-500 shadow-2xl mx-auto" referrerPolicy="no-referrer" />
            <div className="absolute bottom-0 right-0 w-10 h-10 bg-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg border-4 border-zinc-950">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-display text-white mb-2">{user.username}</h3>
          <p className="text-zinc-500 text-sm mb-6 uppercase tracking-widest font-bold">Pioneer since {user.joinedDate}</p>
          <p className="text-zinc-400 font-medium leading-relaxed mb-8">{user.bio}</p>
          <button className="w-full py-4 bg-zinc-800 text-white font-display rounded-2xl hover:bg-zinc-700 transition-all flex items-center justify-center gap-3">
            <Settings className="w-5 h-5" /> Edit Profile
          </button>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {[
            { label: 'Games Played', value: user.stats.gamesPlayed, icon: <Gamepad2 className="w-5 h-5" />, color: 'text-pink-500' },
            { label: 'Messages Sent', value: user.stats.messagesSent, icon: <MessageSquare className="w-5 h-5" />, color: 'text-cyan-400' },
            { label: 'Lounge Time', value: user.stats.loungeTime, icon: <Coffee className="w-5 h-5" />, color: 'text-yellow-400' }
          ].map((stat) => (
            <div key={stat.label} className="p-6 glass border-2 border-zinc-800 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-zinc-400 font-bold text-sm">{stat.label}</span>
              </div>
              <span className="text-white font-display text-xl">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Buddy Evolution & Customization */}
      <div className="lg:col-span-2 space-y-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-10 glass border-2 border-zinc-800 rounded-[3rem] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <Bot className="w-64 h-64 text-pink-500" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
            <div className="w-48 h-48 rounded-[2.5rem] bg-gradient-to-tr from-pink-500 to-cyan-400 p-1">
              <div className="w-full h-full bg-zinc-950 rounded-[2.3rem] flex items-center justify-center relative overflow-hidden">
                <Bot className="w-24 h-24 text-white relative z-10" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(236,72,153,0.3),transparent)]"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <h4 className="text-4xl font-display text-white">{user.buddy.name}</h4>
                <div className="px-4 py-1 bg-pink-500 text-white text-xs font-display rounded-full">LVL {user.buddy.level}</div>
              </div>
              <p className="text-zinc-500 font-bold uppercase tracking-widest mb-6">Digital Bestie Evolution</p>
              
              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-zinc-400">XP Progress</span>
                  <span className="text-pink-500">{user.buddy.xp} / {user.buddy.nextLevelXp}</span>
                </div>
                <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(user.buddy.xp / user.buddy.nextLevelXp) * 100}%` }}
                    className="h-full bg-gradient-to-r from-pink-500 to-cyan-400"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {user.buddy.personality.map(trait => (
                  <span key={trait} className="px-4 py-2 bg-zinc-800/50 rounded-xl text-xs font-bold text-zinc-300 border border-white/5">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-zinc-900/50 rounded-[2rem] border border-white/5">
              <h5 className="text-lg font-display text-white mb-6 flex items-center gap-3">
                <Award className="w-5 h-5 text-yellow-400" /> Recent Achievements
              </h5>
              <div className="space-y-4">
                {user.buddy.achievements.map(ach => (
                  <div key={ach.id} className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                        {ach.icon}
                      </div>
                      <span className="text-sm font-bold text-zinc-300">{ach.title}</span>
                    </div>
                    <span className="text-[10px] text-zinc-600">{ach.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-zinc-900/50 rounded-[2rem] border border-white/5">
              <h5 className="text-lg font-display text-white mb-6 flex items-center gap-3">
                <Palette className="w-5 h-5 text-cyan-400" /> Customization
              </h5>
              <div className="space-y-4">
                {[
                  { label: 'Aura Color', value: user.buddy.customization.color },
                  { label: 'Accessory', value: user.buddy.customization.accessory },
                  { label: 'Voice Pack', value: user.buddy.customization.voice }
                ].map(opt => (
                  <div key={opt.label} className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-white/5">
                    <span className="text-xs font-bold text-zinc-500">{opt.label}</span>
                    <span className="text-sm font-bold text-cyan-400">{opt.value}</span>
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 text-xs font-bold hover:border-cyan-400 hover:text-cyan-400 transition-all">
                  Open Wardrobe
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('vision');
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [milestoneFilter, setMilestoneFilter] = useState('all');

  const totalProgress = Math.round(
    (MILESTONES.reduce((acc, m) => {
      if (m.status === 'completed') return acc + 1;
      if (m.status === 'in-progress') return acc + 0.5;
      return acc;
    }, 0) / MILESTONES.length) * 100
  );

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['vision', 'product', 'arena', 'lounges', 'feed', 'mall', 'hub', 'technology', 'milestones'];
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Nav height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-pink-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b-2 border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-pink-500 rounded-xl rotate-12 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]">
              <div className="w-5 h-5 bg-white rounded-lg -rotate-12 group-hover:-rotate-45 transition-transform duration-500" />
            </div>
            <span className="font-display text-2xl tracking-tight text-white">AI Society</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {['Vision', 'Product', 'Arena', 'Lounges', 'Feed', 'Mall', 'Hub', 'Technology', 'Milestones'].map((item) => {
              const id = item.toLowerCase();
              const isActive = activeTab === id;
              return (
                <button 
                  key={item}
                  onClick={() => scrollToSection(id)}
                  className={`relative px-5 py-2 text-xs font-display tracking-widest transition-all duration-300 ${isActive ? 'text-pink-500' : 'text-zinc-500 hover:text-pink-400'}`}
                >
                  <span className="relative z-10">{item}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute inset-0 bg-pink-500/10 rounded-xl border border-pink-500/20"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
            <div className="w-px h-6 bg-zinc-800 mx-4" />
            <button className="px-8 py-3 bg-white text-black text-xs font-display rounded-xl hover:bg-pink-500 hover:text-white transition-all bouncy-hover shadow-lg">
              Join Us
            </button>
          </div>
        </div>
      </nav>

      <ChatBot />

      {/* Hero Section */}
      <section id="vision" className="relative pt-48 pb-40 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-pink-500/20 blur-[150px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, -45, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/20 blur-[150px] rounded-full" 
          />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border-2 border-pink-500/30 bg-pink-500/10 text-pink-500 text-xs font-display uppercase tracking-widest mb-10 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
              <Zap className="w-4 h-4 animate-bounce" /> Welcome to the Future-Party 2026
            </div>
            <h1 className="text-7xl md:text-9xl font-display tracking-tight leading-[0.85] mb-12 text-white">
              Intelligence <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient-x">Is A Party</span> <br />
              Join The Fun.
            </h1>
            <p className="text-2xl md:text-3xl text-zinc-400 leading-relaxed mb-16 max-w-3xl font-medium">
              We're building a digital playground where AI besties evolve through pure social chaos and interaction.
            </p>
            <div className="flex flex-wrap gap-8">
              <button className="px-12 py-6 bg-pink-500 text-white font-display text-xl rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group">
                Let's Go! <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex items-center gap-6 px-8 border-l-4 border-zinc-800">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10, zIndex: 50 }}
                      className="w-14 h-14 rounded-2xl border-4 border-black bg-zinc-800 overflow-hidden shadow-xl cursor-pointer"
                    >
                      <img src={`https://picsum.photos/seed/fun${i}/100/100`} alt="Friend" referrerPolicy="no-referrer" />
                    </motion.div>
                  ))}
                </div>
                <div className="text-sm text-zinc-500 font-bold uppercase tracking-widest leading-tight">
                  Join <br /> <span className="text-cyan-400">50k+ Early Birds</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leverage Grid */}
      <section className="border-y-4 border-dashed border-white/5 bg-zinc-900/20 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {LEVERAGE_POINTS.map((point, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-8 glass rounded-[2rem] border-2 border-zinc-800 hover:border-pink-500/30 transition-all shadow-xl"
              >
                <span className="text-xs font-display uppercase tracking-[0.4em] text-zinc-500 mb-4">{point.label}</span>
                <span className="text-6xl font-display text-white mb-2">{point.value}</span>
                <span className="text-sm font-medium text-zinc-400">{point.sub}</span>
                <div className={`w-12 h-1 bg-${point.color}-500 mt-6 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Playground */}
      <section id="product" className="py-40 px-6 relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="The ultimate digital playground where you raise, train, and party with your AI besties.">
            The Product Playground
          </SectionHeading>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <motion.div 
                whileHover={{ x: 10 }}
                className="p-10 glass border-2 border-zinc-800 rounded-[2.5rem] relative overflow-hidden group bouncy-hover"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Gamepad2 className="w-32 h-32 text-pink-500" />
                </div>
                <h3 className="text-3xl font-display mb-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-500 shadow-lg">
                    <Users className="w-7 h-7" />
                  </div>
                  AI Bestie Ecosystem
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8 font-medium">
                  Every user gets a unique AI bestie. They learn through games, chats, and hanging out, evolving their own quirky personalities and skills!
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Persistent Vibes', 'Quirky Personalities', 'Social Learning', 'Digital High-Fives'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-zinc-300 bg-zinc-800/50 px-4 py-2 rounded-xl border border-white/5">
                      <ChevronRight className="w-4 h-4 text-pink-500" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                whileHover={{ x: 10 }}
                className="p-10 glass border-2 border-zinc-800 rounded-[2.5rem] relative overflow-hidden group bouncy-hover"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Database className="w-32 h-32 text-cyan-400" />
                </div>
                <h3 className="text-3xl font-display mb-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-lg">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  The Vibe Engine
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                  Our playground is a data party. We're capturing the most fun AI behaviors to power the next generation of self-evolving digital friends.
                </p>
              </motion.div>
            </div>

            <div className="relative aspect-square bg-zinc-950 rounded-[3rem] overflow-hidden border-4 border-zinc-900 shadow-2xl group">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                src="https://picsum.photos/seed/ai-party/1000/1000" 
                alt="AI Society Party" 
                className="w-full h-full object-cover opacity-70 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-6 mb-6">
                  <div className="px-5 py-2 bg-pink-500 text-white text-xs font-display rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)]">Party Simulation Live</div>
                  <div className="text-sm font-display text-zinc-400">Vibe_ID: 0xPARTY...</div>
                </div>
                <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                    className="h-full bg-gradient-to-r from-pink-500 to-cyan-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Arena Section */}
      <section id="arena" className="py-40 px-6 relative overflow-hidden bg-zinc-950/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="The ultimate digital arcade. Challenge your AI buddy to classic games and watch them learn your moves!">
            The Game Arena
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GAMES.map((game) => (
              <motion.div key={game.id} layout>
                <GameCard game={game} />
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-10 glass border-2 border-dashed border-zinc-800 rounded-[3rem] text-center">
            <h4 className="text-2xl font-display text-white mb-4">Want to add your own game?</h4>
            <p className="text-zinc-400 font-medium mb-8">Our SDK is coming soon, so you can build custom challenges for the entire AI Society!</p>
            <button className="px-10 py-4 border-2 border-pink-500 text-pink-500 font-display rounded-2xl hover:bg-pink-500 hover:text-white transition-all bouncy-hover">
              Join the Dev Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* Vibe Lounges Section */}
      <section id="lounges" className="py-40 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-full bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Hang out with your friends and AI buddies in real-time. Whether it's deep talk or digital beats, there's a lounge for every vibe.">
            Vibe Lounges
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CHAT_ROOMS.map((room) => (
              <motion.div key={room.id} layout>
                <ChatRoomCard room={room} onJoin={setSelectedRoom} />
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-12 glass border-2 border-zinc-800 rounded-[3rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <Users className="w-64 h-64 text-white" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <h3 className="text-3xl font-display text-white mb-4">Create Your Own Lounge</h3>
                <p className="text-zinc-400 font-medium leading-relaxed">
                  Want a private space for your squad and your AI buddies? Custom lounges are coming soon. Set the rules, pick the AI, and invite your crew.
                </p>
              </div>
              <button className="px-10 py-5 bg-white text-black font-display rounded-2xl hover:scale-105 transition-all active:scale-95 shadow-xl">
                Get Early Access
              </button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedRoom && (
          <GroupChatModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
        )}
      </AnimatePresence>

      {/* Social Feed Section */}
      <section id="feed" className="py-40 px-6 relative overflow-hidden bg-zinc-900/20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <SectionHeading subtitle="See how the digital society is evolving. Share your buddy's milestones, achievements, and quirky moments with the world!">
            The Social Feed
          </SectionHeading>

          <div className="mb-12 p-8 glass border-2 border-zinc-800 rounded-[2.5rem] flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500">
              <Bot className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="What's your buddy up to?" 
                className="w-full bg-transparent text-xl text-white placeholder-zinc-600 focus:outline-none"
              />
            </div>
            <button className="px-6 py-3 bg-pink-500 text-white font-display rounded-xl shadow-lg hover:brightness-110 transition-all">
              Share Moment
            </button>
          </div>

          <div className="space-y-8">
            {POSTS.map(post => (
              <motion.div key={post.id} layout>
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-8 py-4 border-2 border-zinc-800 text-zinc-400 font-display rounded-2xl hover:border-pink-500 hover:text-pink-500 transition-all">
              Load More Moments
            </button>
          </div>
        </div>
      </section>

      {/* The Infinite Mall Section */}
      <section id="mall" className="py-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Step into the future of shopping. Go to the mall in VR with your AI buddy, try on digital fits, and get the real deal delivered to your door.">
            The Infinite Mall
          </SectionHeading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div 
              whileHover={{ y: -10 }}
              className="lg:col-span-2 p-12 glass border-2 border-zinc-800 rounded-[3rem] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe className="w-64 h-64 text-cyan-400" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 text-xs font-display uppercase tracking-widest mb-8">
                  <Globe className="w-4 h-4" /> Spatial Reality Enabled
                </div>
                <h3 className="text-4xl md:text-5xl font-display text-white mb-8 leading-tight">
                  Shop in <span className="text-cyan-400">Oculus VR</span> <br /> 
                  With Your Bestie.
                </h3>
                <p className="text-zinc-400 text-xl leading-relaxed mb-12 max-w-2xl font-medium">
                  Imagine a mall that never ends. You and your AI buddy can explore infinite stores, try on digital twins of real products, and have them shipped to your physical home with one click.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-4 bg-zinc-900/50 px-6 py-4 rounded-2xl border border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Instant Try-On</div>
                      <div className="text-xs text-zinc-500">Perfect fit every time</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-zinc-900/50 px-6 py-4 rounded-2xl border border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-500">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Social Shopping</div>
                      <div className="text-xs text-zinc-500">Buddy-approved style</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-12 glass border-2 border-zinc-800 rounded-[3rem] flex flex-col justify-between group"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-500 mb-8 shadow-lg">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-display text-white mb-6">New-Age Advertising</h3>
                <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                  No more annoying pop-ups. In the AI Society, brands build experiences. Your buddy finds the deals you actually want.
                </p>
              </div>
              <div className="mt-12">
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden mb-6">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/2 bg-yellow-500"
                  />
                </div>
                <button className="w-full py-4 bg-yellow-500 text-black font-display rounded-2xl hover:brightness-110 transition-all">
                  Partner With Us
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personal Hub Section */}
      <section id="hub" className="py-40 px-6 relative overflow-hidden bg-zinc-950/50">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Your personal command center. Track your AI buddy's evolution, manage your achievements, and customize your digital bestie.">
            The Personal Hub
          </SectionHeading>

          <UserProfileSection user={CURRENT_USER} />
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-40 px-6 bg-zinc-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Translating digital chaos into evolution: Algorithms that learn, mix, and match to create the ultimate AI besties.">
            The Intelligence Lab
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TECH_STACK.map((tech, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -10 }}
                className="p-10 glass rounded-3xl border-2 border-zinc-800 hover:border-pink-500/30 transition-all group bouncy-hover"
              >
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-8 group-hover:bg-pink-500 group-hover:text-white transition-all shadow-lg">
                  {tech.icon}
                </div>
                <h3 className="text-2xl font-display mb-6 tracking-tight">{tech.title}</h3>
                <p className="text-zinc-400 text-base leading-relaxed font-medium">{tech.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 p-12 bg-zinc-950 border-4 border-zinc-900 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h4 className="text-4xl font-display mb-8 text-white">Digital "Mixing"</h4>
                <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-medium">
                  Two AI besties hang out, share vibes, and their digital DNA is mixed to create a brand new descendant. It's like a digital evolution party where only the coolest traits survive!
                </p>
                <div className="flex items-center gap-12">
                  <div className="text-center">
                    <div className="text-5xl font-display text-pink-500 mb-2">10k+</div>
                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Generations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-display text-cyan-400 mb-2">99%</div>
                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Vibe Stability</div>
                  </div>
                </div>
              </div>
              <EvolutionVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section id="milestones" className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
            <SectionHeading subtitle="The big goals that keep the party moving forward. Check out our progress!">
              The Roadmap Party
            </SectionHeading>
            
            {/* Roadmap Progress Indicator */}
            <div className="bg-zinc-900/60 backdrop-blur-md border-2 border-zinc-800 p-10 rounded-[2.5rem] min-w-[350px] shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-display text-zinc-500 uppercase tracking-widest">Party Progress</span>
                <span className="text-xl font-display text-pink-500">{totalProgress}% Complete</span>
              </div>
              <div className="h-4 bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${totalProgress}%` }}
                  transition={{ duration: 2, ease: "backOut" }}
                  className="h-full bg-gradient-to-r from-pink-500 to-cyan-400 shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                />
              </div>
              <div className="flex justify-between mt-6">
                <span className="text-xs text-zinc-600 font-display">START</span>
                <span className="text-xs text-zinc-600 font-display">THE FUTURE</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 mb-16">
            <div className="flex flex-wrap gap-4">
              {['all', 'completed', 'in-progress', 'upcoming'].map((f) => (
                <button
                  key={f}
                  onClick={() => setMilestoneFilter(f)}
                  className={`px-8 py-3 text-xs font-display uppercase tracking-widest transition-all duration-300 rounded-2xl border-2 bouncy-hover ${
                    milestoneFilter === f
                      ? 'bg-pink-500 text-white border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.4)]'
                      : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-pink-500/50 hover:text-pink-500'
                  }`}
                >
                  {f === 'all' ? 'Show All' : f.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl">
            <AnimatePresence mode="popLayout">
              {MILESTONES
                .filter(m => milestoneFilter === 'all' || m.status === milestoneFilter)
                .map((milestone) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 40 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    layout
                  >
                    <MilestoneCard milestone={milestone} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-40 px-6 border-t-4 border-dashed border-white/5 bg-zinc-950 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-pink-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-9xl font-display tracking-tighter mb-16 text-white">
            Join the <span className="text-pink-500">Party</span>.
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button className="px-16 py-8 bg-white text-black font-display text-2xl rounded-3xl shadow-2xl hover:bg-pink-500 hover:text-white transition-all bouncy-hover">
              Join Discord
            </button>
            <button className="px-16 py-8 border-4 border-zinc-800 text-white font-display text-2xl rounded-3xl hover:bg-zinc-900 transition-all bouncy-hover">
              Get the App
            </button>
          </div>
          <div className="mt-32 pt-16 border-t-2 border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-10 text-zinc-500 text-xs font-bold uppercase tracking-[0.4em]">
            <div>© 2026 AI Society Lab</div>
            <div className="flex gap-12">
              <a href="#" className="hover:text-pink-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Chaos</a>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-cyan-400" /> Global Playground
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
