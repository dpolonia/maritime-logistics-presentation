import styles from '../styles/ProgressTracker.module.css';

interface ProgressTrackerProps {
  current: number;
  total: number;
  sessionId: number;
}

export default function ProgressTracker({ current, total, sessionId }: ProgressTrackerProps) {
  const percentage = Math.round((current / (total - 1)) * 100) || 0;
  
  return (
    <div className={styles.container}>
      <div className={styles.progressText}>
        Slide {current + 1} of {total}
      </div>
      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${percentage}%` }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
          role="progressbar"
          aria-label={`Session progress: ${percentage}%`}
        ></div>
      </div>
    </div>
  );
}
