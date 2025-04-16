import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/Session.module.css';
import SlideContent from '../../components/SlideContent';
import NavigationControls from '../../components/NavigationControls';
import ParticipantEngagement from '../../components/ParticipantEngagement';
import ProgressTracker from '../../components/ProgressTracker';

// Type definitions
interface SessionData {
  id: number;
  title: string;
  objectives: string[];
  content: string[];
  activities: string[];
  assessment: string[];
  resources: string[];
}

interface SlideContent {
  type: 'objective' | 'content' | 'activity' | 'assessment' | 'resource';
  content: string;
}

// Add gtag type definition
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Session data structure
const sessionData: SessionData[] = [
  {
    id: 1,
    title: 'Overview of NEXUS Agenda and Advanced Technologies',
    objectives: [
      'Understand the purpose and scope of the NEXUS Agenda',
      'Identify key advanced technologies relevant to project management',
      'Recognize how emerging technologies impact project delivery'
    ],
    content: [
      'Introduction to NEXUS Agenda framework',
      'Survey of advanced technologies in modern project environments',
      'Technology integration challenges and opportunities',
      'Case studies of technology-enabled project success'
    ],
    activities: [
      'Technology readiness assessment exercise',
      'Group discussion on technology barriers',
      'Interactive demonstration of emerging tools'
    ],
    assessment: [
      'Pre-session technology familiarity questionnaire',
      'Post-session comprehension check'
    ],
    resources: [
      'NEXUS Agenda overview documentation',
      'Technology trend reports',
      'Case study materials'
    ]
  },
  // Other sessions would follow the same pattern
  {
    id: 2,
    title: 'Advanced Technologies in Project Management',
    objectives: ['Objectives for session 2'],
    content: ['Content for session 2'],
    activities: ['Activities for session 2'],
    assessment: ['Assessment for session 2'],
    resources: ['Resources for session 2']
  },
  // Add data for remaining sessions 3-9 with similar structure
];

export default function Session() {
  const router = useRouter();
  const { id } = router.query;
  const [session, setSession] = useState<SessionData | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Performance monitoring
  useEffect(() => {
    const reportPerformanceMetric = (metric: string, value: number) => {
      if (window.gtag) {
        window.gtag('event', 'performance_metric', {
          metric_name: metric,
          value: value,
          session_id: id
        });
      }
    };

    // Report page load time
    if (typeof window !== 'undefined' && !isLoading) {
      setTimeout(() => {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        reportPerformanceMetric('load_time', navigationEntry.duration);
      }, 0);
    }
  }, [id, isLoading]);

  // Fetch session data
  useEffect(() => {
    if (id) {
      const sessionId = parseInt(id.toString(), 10);
      const foundSession = sessionData.find(s => s.id === sessionId);
      
      if (foundSession) {
        setSession(foundSession);
      } else {
        router.push('/404');
      }
      
      setIsLoading(false);
    }
  }, [id, router]);

  const handleNext = () => {
    if (session && currentSlide < getSlideCount() - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const getSlideCount = () => {
    if (!session) return 0;
    
    // Count all content sections (objectives, content, activities, etc.)
    return [
      ...session.objectives,
      ...session.content,
      ...session.activities,
      ...session.assessment,
      ...session.resources
    ].length;
  };

  const getCurrentSlideContent = (): SlideContent | null => {
    if (!session) return null;
    
    const allContent: SlideContent[] = [
      ...session.objectives.map(item => ({ type: 'objective' as const, content: item })),
      ...session.content.map(item => ({ type: 'content' as const, content: item })),
      ...session.activities.map(item => ({ type: 'activity' as const, content: item })),
      ...session.assessment.map(item => ({ type: 'assessment' as const, content: item })),
      ...session.resources.map(item => ({ type: 'resource' as const, content: item }))
    ];
    
    return allContent[currentSlide] || null;
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading session...</div>;
  }

  if (!session) {
    return <div className={styles.error}>Session not found</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{session.title} | NEXUS Agenda Course</title>
        <meta name="description" content={`Session ${id}: ${session.title}`} />
      </Head>

      <header className={styles.header}>
        <h1>{session.title}</h1>
        <Link href="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </header>

      <main className={styles.main}>
        <ProgressTracker 
          current={currentSlide} 
          total={getSlideCount()} 
          sessionId={session.id} 
        />
        
        <div className={styles.slideContainer}>
          <SlideContent 
            slide={getCurrentSlideContent()} 
            sessionId={session.id}
          />
        </div>

        <div className={styles.engagementContainer}>
          <ParticipantEngagement 
            sessionId={session.id} 
            slideType={getCurrentSlideContent()?.type} 
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <NavigationControls 
          onPrevious={handlePrevious} 
          onNext={handleNext} 
          isFirstSlide={currentSlide === 0} 
          isLastSlide={currentSlide === getSlideCount() - 1} 
        />
      </footer>
    </div>
  );
}