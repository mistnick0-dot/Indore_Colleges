/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LogoIcon } from './Logo';
import { ChatMessage } from '../types';

export default function OrbChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'orb',
      text: "Hi! I am **ORB**, your official Indore Colleges Academic Counselor for Indore. 🎓 Ask me anything about Indore's top professional colleges, institutes, or universities (like *IIT Indore*, *IIM Indore*, *IPS Academy*, or *SGSITS*)!",
      createdAt: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      createdAt: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/orb-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!res.ok) {
        throw new Error('Counselling connection lost. Please try again.');
      }

      const data = await res.json();
      const orbMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'orb',
        text: data.text,
        createdAt: new Date().toISOString()
      };

      setMessages((prev) => [...prev, orbMsg]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const suggestionPrompts = [
    "IIT Indore vs SGSITS?",
    "Best B.Tech colleges in Indore?",
    "Top Management colleges?",
    "Tell me about IIM Indore IPM."
  ];

  // Render markdown helper (bold only for clean UI)
  const formatMessageText = (text: string) => {
    // Basic bold parsing: **text** -> <strong>text</strong>
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-bold text-gray-950">{part.slice(2, -2)}</strong>;
      }
      // Replace italics: *text* -> <em>text</em>
      const italicParts = part.split(/(\*[^*]+\*)/g);
      return italicParts.map((subPart, subIdx) => {
        if (subPart.startsWith('*') && subPart.endsWith('*')) {
          return <em key={`${idx}-${subIdx}`} className="italic text-gray-800">{subPart.slice(1, -1)}</em>;
        }
        return subPart;
      });
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.2 }}
            className="w-[360px] max-w-[calc(100vw-2rem)] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-red-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-1 shadow-sm">
                    <LogoIcon className="h-7 w-7" />
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-red-600" />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-tight">ORB Counselor</h3>
                  <p className="text-[10px] text-red-200">Indore Colleges Academic Advisor</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-red-200 hover:text-white rounded-lg p-1 hover:bg-red-500 transition"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-red-600 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                    }`}
                  >
                    {formatMessageText(msg.text)}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs shadow-xs flex items-center space-x-2">
                    <span className="flex space-x-1">
                      <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                    <span className="text-gray-400 italic text-[10px]">ORB is drafting advice...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center space-x-1.5 bg-red-50 text-red-600 border border-red-100 p-2.5 rounded-xl text-[11px]">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="p-3 bg-white border-t border-gray-100/55">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Common Inquiries</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestionPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-[11px] text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg border border-red-100/40 font-medium transition text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 bg-white border-t border-gray-100 flex space-x-2 items-center"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about boards, fees, admissions in Indore..."
                className="flex-1 rounded-xl border border-gray-200 px-3 py-2 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || loading}
                className="bg-red-600 text-white rounded-xl p-2 hover:bg-red-500 transition disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Bubble */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl shadow-slate-400/20 border-2 border-[#FA6E00] transition relative p-2"
        aria-label="Open ORB Counselor"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-slate-700" />
        ) : (
          <>
            <LogoIcon className="h-9 w-9" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#FA6E00] border-2 border-white rounded-full text-[9px] font-black text-white px-1.5 py-0.5 shadow-xs animate-bounce">
              ORB
            </span>
          </>
        )}
      </motion.button>
    </div>
  );
}
