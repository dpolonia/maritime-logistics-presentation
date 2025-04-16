import { useState, useEffect } from 'react';
import styles from '../styles/ParticipantEngagement.module.css';

interface ParticipantEngagementProps {
  sessionId: number;
  slideType?: 'objective' | 'content' | 'activity' | 'assessment' | 'resource';
}

// Add gtag type definition
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function ParticipantEngagement({
  sessionId,
  slideType
}: ParticipantEngagementProps) {
  const [question, setQuestion] = useState('');
  const [reactionCount, setReactionCount] = useState({
    understand: 0,
    confused: 0,
    interesting: 0
  });
  
  // Reset engagement panel when slide changes
  useEffect(() => {
    setQuestion('');
  }, [slideType]);

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would send to a backend API
    console.log(`Question submitted for session ${sessionId}:`, question);
    
    // Log engagement event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ask_question', {
        session_id: sessionId,
        slide_type: slideType
      });
    }
    
    // Clear input after submission
    setQuestion('');
    
    // Show acknowledgment
    alert('Your question has been submitted to the presenter.');
  };

  const handleReaction = (type: 'understand' | 'confused' | 'interesting') => {
    // Update local state
    setReactionCount(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
    
    // In a real implementation, this would send to a backend API
    console.log(`Reaction '${type}' for session ${sessionId}`);
    
    // Log engagement event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'reaction', {
        session_id: sessionId,
        slide_type: slideType,
        reaction_type: type
      });
    }
  };

  return (
    <div className={styles.container}>
      <h3>Participant Engagement</h3>
      
      <div className={styles.reactions}>
        <button 
          onClick={() => handleReaction('understand')} 
          className={styles.reactionButton} 
          aria-label="I understand"
        >
          ✓ I understand ({reactionCount.understand})
        </button>
        <button 
          onClick={() => handleReaction('confused')} 
          className={styles.reactionButton} 
          aria-label="I'm confused"
        >
          ? I'm confused ({reactionCount.confused})
        </button>
        <button 
          onClick={() => handleReaction('interesting')} 
          className={styles.reactionButton} 
          aria-label="This is interesting"
        >
          ! Interesting ({reactionCount.interesting})
        </button>
      </div>
      
      <form onSubmit={handleQuestionSubmit} className={styles.questionForm}>
        <label htmlFor="question" className={styles.label}>
          Ask a question:
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={styles.input}
          placeholder="Type your question here..."
          required
        />
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}