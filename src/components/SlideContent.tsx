import { useEffect } from 'react';
import styles from '../styles/SlideContent.module.css';

interface SlideContentProps {
  slide: {
    type: 'objective' | 'content' | 'activity' | 'assessment' | 'resource';
    content: string;
  } | null;
  sessionId: number;
}

export default function SlideContent({ slide, sessionId }: SlideContentProps) {
  // Log viewed content for analytics
  useEffect(() => {
    if (slide) {
      // Log slide view to analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'view_slide', {
          session_id: sessionId,
          slide_type: slide.type,
          content_snippet: slide.content.substring(0, 50)
        });
      }
    }
  }, [slide, sessionId]);

  if (!slide) {
    return <div className={styles.empty}>No content available</div>;
  }

  // Determine slide component based on type
  const renderSlideContent = () => {
    switch (slide.type) {
      case 'objective':
        return (
          <div className={`${styles.slide} ${styles.objective}`}>
            <h2>Learning Objective</h2>
            <p>{slide.content}</p>
          </div>
        );
      case 'content':
        return (
          <div className={`${styles.slide} ${styles.content}`}>
            <h2>Content</h2>
            <p>{slide.content}</p>
          </div>
        );
      case 'activity':
        return (
          <div className={`${styles.slide} ${styles.activity}`}>
            <h2>Interactive Activity</h2>
            <p>{slide.content}</p>
            <button className={styles.startActivity}>Start Activity</button>
          </div>
        );
      case 'assessment':
        return (
          <div className={`${styles.slide} ${styles.assessment}`}>
            <h2>Assessment</h2>
            <p>{slide.content}</p>
            <button className={styles.startAssessment}>Begin Assessment</button>
          </div>
        );
      case 'resource':
        return (
          <div className={`${styles.slide} ${styles.resource}`}>
            <h2>Resource</h2>
            <p>{slide.content}</p>
            <button className={styles.accessResource}>Access Resource</button>
          </div>
        );
      default:
        return <div className={styles.empty}>Invalid slide type</div>;
    }
  };

  return (
    <div className={styles.container}>
      {renderSlideContent()}
    </div>
  );
}
