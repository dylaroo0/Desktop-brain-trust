import React, { useState, useRef, useEffect } from 'react';
import './ConversationFeed.css';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system' | 'specialist';
  content: string;
  timestamp: Date;
  author?: string;
  specialist?: string;
  avatar?: string;
}

interface ConversationFeedProps {
  className?: string;
}

const ConversationFeed: React.FC<ConversationFeedProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to BrainTrust Circle! Your AI collaboration workspace is ready.',
      timestamp: new Date(),
      author: 'System'
    },
    {
      id: '2', 
      type: 'user',
      content: 'I want to create a children\'s storybook. Can you help me assemble the right team?',
      timestamp: new Date(),
      author: 'You'
    },
    {
      id: '3',
      type: 'specialist',
      content: 'I\'ll help you create the perfect storybook team! Let me assemble specialists for character development, plot structure, and illustration. What age group and theme are you targeting?',
      timestamp: new Date(),
      author: 'Super Organizer (Agent)',
      specialist: 'Agent',
      avatar: '🧠'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date(),
      author: 'You'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'specialist',
        content: 'I understand your request. Let me coordinate with the specialist team to provide the best solution.',
        timestamp: new Date(),
        author: 'Super Organizer (Agent)',
        specialist: 'Agent',
        avatar: '🧠'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCreatePriorityList = () => {
    const systemMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: '📋 Priority list created and saved to your calendar. Specialists have been notified of their tasks.',
      timestamp: new Date(),
      author: 'Super Organizer (Agent)'
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const handleAssembleTeam = () => {
    const teamMessage: Message = {
      id: Date.now().toString(),
      type: 'specialist',
      content: '🤖 Team assembled! I\'ve added Character Developer, Plot Specialist, and Illustration Expert to your workspace. They\'re ready to collaborate on your children\'s storybook project.',
      timestamp: new Date(),
      author: 'Super Organizer (Agent)',
      specialist: 'Agent',
      avatar: '🧠'
    };
    setMessages(prev => [...prev, teamMessage]);
  };

  return (
    <div className={`conversation-feed ${className || ''}`}>
      <div className="feed-header">
        <div className="feed-title">
          <h3>💬 Conversation Feed</h3>
          <div className="feed-subtitle">Central collaboration hub</div>
        </div>
        <div className="feed-actions">
          <button 
            className="action-btn primary"
            onClick={handleCreatePriorityList}
            title="Create priority list from conversation"
          >
            📋 Create List
          </button>
          <button 
            className="action-btn secondary"
            onClick={handleAssembleTeam}
            title="Assemble specialist team"
          >
            🤖 Assemble Team
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-header">
              <div className="message-author">
                {message.avatar && <span className="author-avatar">{message.avatar}</span>}
                <span className="author-name">{message.author}</span>
                {message.specialist && (
                  <span className="specialist-badge">{message.specialist}</span>
                )}
              </div>
              <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message ai typing">
            <div className="message-header">
              <div className="message-author">
                <span className="author-avatar">🧠</span>
                <span className="author-name">Super Organizer</span>
              </div>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input-area">
        <div className="input-container">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Collaborate with your AI team..."
            className="message-input"
            rows={1}
          />
          <button 
            className="send-button"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            ▶️
          </button>
        </div>
        <div className="input-help">
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default ConversationFeed;
