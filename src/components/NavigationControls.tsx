import styles from '../styles/NavigationControls.module.css';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstSlide: boolean;
  isLastSlide: boolean;
}

export default function NavigationControls({
  onPrevious,
  onNext,
  isFirstSlide,
  isLastSlide
}: NavigationControlsProps) {
  return (
    <div className={styles.container}>
      <button
        onClick={onPrevious}
        disabled={isFirstSlide}
        className={`${styles.button} ${styles.previous}`}
        aria-label="Previous slide"
      >
        Previous
      </button>
      
      <button
        onClick={onNext}
        disabled={isLastSlide}
        className={`${styles.button} ${styles.next}`}
        aria-label="Next slide"
      >
        Next
      </button>
    </div>
  );
}
