import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/Session.module.css';

export default function Session2() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Define slides
  const slides = [
    // Title Slide
    {
      id: 'title',
      title: 'Technology Stack for Maritime and Logistics Innovation',
      subtitle: 'Session 2: NEXUS Agenda Course',
      content: 'Advanced technologies and implementation strategies for the maritime sector',
      background: '#0a558c'
    },
    // Learning Objectives
    {
      id: 'objectives',
      title: 'Learning Objectives',
      content: [
        'Evaluate Technology Applicability - Assess which technologies are appropriate for NEXUS components',
        'Analyze Implementation Prerequisites - Identify technical and organizational prerequisites',
        'Map Technology-Challenge Alignment - Match maritime challenges with technological solutions',
        'Identify Integration Requirements - Determine data flows and interoperability needs',
        'Develop Technology Roadmaps - Create phased implementation plans'
      ],
      background: '#ffffff'
    },
    // Technology Context
    {
      id: 'context',
      title: 'Technology Context in Maritime and Logistics',
      subtitle: 'Understanding the current landscape, challenges, and opportunities',
      sections: [
        {
          title: 'Digital Maturity',
          content: 'Current state assessment of Portuguese port technology adoption and international benchmarking'
        },
        {
          title: 'Maritime Adaptations',
          content: 'Environmental and operational constraints affecting technology implementation'
        },
        {
          title: 'NEXUS Strategy',
          content: 'Portfolio approach to technology selection, capability building, and standards'
        }
      ],
      background: '#f8fafc'
    },
    // AI and ML
    {
      id: 'ai-ml',
      title: 'AI and Machine Learning Applications',
      subtitle: 'Intelligent systems for maritime and logistics optimization',
      sections: [
        {
          title: 'Maritime AI Use Cases',
          points: [
            'Predictive maintenance for equipment failure prediction',
            'Operational optimization for container stacking, berth allocation',
            'Document processing for automated classification and extraction',
            'Synchromodal transport for real-time multi-modal route optimization'
          ]
        },
        {
          title: 'Implementation Architecture',
          points: [
            'Data requirements and collection infrastructure',
            'Model development and evaluation metrics',
            'Integration approaches and API-based serving',
            'Performance monitoring and feedback loops'
          ]
        },
        {
          title: 'NEXUS Applications',
          points: [
            'Open data platform analytics and pattern recognition',
            'Predictive ETA for vessel and cargo tracking',
            'Digital twin integration for port infrastructure'
          ]
        }
      ],
      background: '#e1effe'
    },
    // Blockchain
    {
      id: 'blockchain',
      title: 'Blockchain and Distributed Ledger Technologies',
      subtitle: 'Trusted, transparent transactions for maritime supply chains',
      sections: [
        {
          title: 'Maritime Use Cases',
          points: [
            'Supply chain transparency and provenance tracking',
            'Smart contracts for customs clearance and payments',
            'Secure document management and verification',
            'Decentralized equipment and resource sharing'
          ]
        },
        {
          title: 'Implementation Architecture',
          points: [
            'Consortium vs. public blockchain selection',
            'On-chain vs. off-chain data strategies',
            'Identity management and access control',
            'Integration with legacy systems'
          ]
        },
        {
          title: 'NEXUS Applications',
          points: [
            'Trusted documentation exchange platform',
            'Automated compliance and reporting',
            'Cross-stakeholder transaction verification'
          ]
        }
      ],
      background: '#e6f7ff'
    },
    // IoT
    {
      id: 'iot',
      title: 'IoT, Cloud, and Edge Computing',
      subtitle: 'Connecting the physical and digital worlds in maritime environments',
      sections: [
        {
          title: 'Maritime IoT Landscape',
          points: [
            'Sensor networks for equipment, cargo, and environment monitoring',
            'RFID and NFC for asset tracking and authentication',
            'Autonomous vehicles and equipment control systems',
            'Wearables for safety and operational efficiency'
          ]
        },
        {
          title: 'Implementation Architecture',
          points: [
            'Edge processing for real-time data analysis',
            'Gateway infrastructure and communication protocols',
            'Cloud integration for analytics and machine learning',
            'Security and resilience considerations'
          ]
        },
        {
          title: 'NEXUS Applications',
          points: [
            'Port digital twin development',
            'Real-time operational dashboards',
            'Predictive maintenance systems',
            'Environmental monitoring networks'
          ]
        }
      ],
      background: '#edf2f7'
    },
    // Connectivity
    {
      id: 'connectivity',
      title: 'Next-Generation Connectivity',
      subtitle: '5G/6G and advanced networking for maritime operations',
      sections: [
        {
          title: '5G/6G Applications',
          points: [
            'Ultra-reliable low-latency communications',
            'Massive IoT deployments',
            'Enhanced mobile broadband for remote operations',
            'Network slicing for dedicated maritime services'
          ]
        },
        {
          title: 'Private Networks',
          points: [
            'Secure infrastructure for critical operations',
            'Remote areas connectivity solutions',
            'Ship-to-shore communication systems',
            'Redundancy and fallback mechanisms'
          ]
        },
        {
          title: 'NEXUS Requirements',
          points: [
            'Bandwidth needs for data-intensive applications',
            'Latency requirements for real-time operations',
            'Reliability considerations for critical systems',
            'Coverage planning for port and maritime areas'
          ]
        }
      ],
      background: '#f0f9ff'
    },
    // Activities
    {
      id: 'activities',
      title: 'Interactive Activities',
      sections: [
        {
          title: 'Technology-Challenge Mapping',
          content: 'Collaborative exercise matching technologies to maritime challenges'
        },
        {
          title: 'Solution Architecture Design',
          content: 'Technical design workshop for NEXUS components'
        },
        {
          title: 'Technology Roadmap Development',
          content: 'Creating phased implementation plans for introducing advanced technologies'
        }
      ],
      background: '#0a558c',
      textColor: 'white'
    },
    // Conclusion
    {
      id: 'conclusion',
      title: 'Thank You',
      subtitle: 'Session 2: Technology Stack for Maritime and Logistics Innovation',
      content: 'Next session will focus on implementation strategies and technical integration approaches',
      background: '#0a558c',
      textColor: 'white'
    }
  ];
  
  useEffect(() => {
    // Simulate loading content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    // Setup keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevious();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide]);
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading session...</div>;
  }
  
  const currentSlideData = slides[currentSlide];

  return (
    <div className={styles.container}>
      <Head>
        <title>Session 2: Technology Stack for Maritime and Logistics Innovation | NEXUS Agenda Course</title>
        <meta name="description" content="Session 2: Technology Stack for Maritime and Logistics Innovation" />
        <style>{`
          body { margin: 0; padding: 0; }
          .slide-controls { position: fixed; bottom: 20px; width: 100%; display: flex; justify-content: center; z-index: 100; }
          .slide-controls button { margin: 0 10px; padding: 8px 16px; border: none; background: rgba(0,0,0,0.2); color: white; border-radius: 4px; cursor: pointer; }
          .slide-controls button:hover { background: rgba(0,0,0,0.4); }
          .slide-controls button:disabled { opacity: 0.5; cursor: not-allowed; }
          .progress-bar { position: fixed; top: 0; left: 0; height: 4px; background: #3182ce; transition: width 0.3s; }
          .slide-navigation { position: fixed; bottom: 20px; right: 20px; }
          .slide-count { font-size: 14px; color: rgba(0,0,0,0.5); }
        `}</style>
      </Head>

      <header className={styles.header}>
        <h1>Session 2: Technology Stack for Maritime and Logistics Innovation</h1>
        <Link href="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </header>

      <main className={styles.main}>
        {/* Progress bar */}
        <div 
          className="progress-bar" 
          style={{width: `${((currentSlide + 1) / slides.length) * 100}%`}}
        ></div>
        
        {/* Slide navigation */}
        <div className="slide-navigation">
          <span className="slide-count">{currentSlide + 1} / {slides.length}</span>
        </div>
        
        {/* Current slide */}
        <div 
          className={styles.slide} 
          style={{
            backgroundColor: currentSlideData.background,
            color: currentSlideData.textColor || (currentSlideData.background === '#0a558c' ? 'white' : 'inherit')
          }}
        >
          {/* Title slide */}
          {currentSlideData.id === 'title' && (
            <div className={styles.titleSlide}>
              <h1>{currentSlideData.title}</h1>
              <h2>{currentSlideData.subtitle}</h2>
              <p>{currentSlideData.content}</p>
            </div>
          )}
          
          {/* Learning objectives slide */}
          {currentSlideData.id === 'objectives' && (
            <div className={styles.contentSlide}>
              <h2>{currentSlideData.title}</h2>
              <ul className={styles.objectivesList}>
                {currentSlideData.content && Array.isArray(currentSlideData.content) && currentSlideData.content.map((item, index) => (
                  <li key={index}>
                    <div className={styles.objectiveBullet}>{index + 1}</div>
                    <div>{item}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Three-column context slide */}
          {currentSlideData.id === 'context' && (
            <div className={styles.contentSlide}>
              <h2>{currentSlideData.title}</h2>
              <p className={styles.subtitle}>{currentSlideData.subtitle}</p>
              
              <div className={styles.threeColumns}>
                {currentSlideData.sections && Array.isArray(currentSlideData.sections) && currentSlideData.sections.map((section, index) => (
                  <div key={index} className={styles.column}>
                    <h3>{section.title}</h3>
                    <p>{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Technology section slides (AI/ML, Blockchain, IoT, Connectivity) */}
          {(currentSlideData.id === 'ai-ml' || 
            currentSlideData.id === 'blockchain' || 
            currentSlideData.id === 'iot' || 
            currentSlideData.id === 'connectivity') && (
            <div className={styles.contentSlide}>
              <h2>{currentSlideData.title}</h2>
              <p className={styles.subtitle}>{currentSlideData.subtitle}</p>
              
              <div className={styles.techSections}>
                {currentSlideData.sections && Array.isArray(currentSlideData.sections) && currentSlideData.sections.map((section, index) => (
                  <div key={index} className={styles.techSection}>
                    <h3>{section.title}</h3>
                    {section.content && <p>{section.content}</p>}
                    {section.points && Array.isArray(section.points) && (
                      <ul className={styles.techList}>
                        {section.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Activities slide */}
          {currentSlideData.id === 'activities' && (
            <div className={styles.contentSlide}>
              <h2>{currentSlideData.title}</h2>
              
              <div className={styles.activitiesGrid}>
                {currentSlideData.sections && Array.isArray(currentSlideData.sections) && currentSlideData.sections.map((activity, index) => (
                  <div key={index} className={styles.activityCard}>
                    <h3>{activity.title}</h3>
                    <p>{activity.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Conclusion slide */}
          {currentSlideData.id === 'conclusion' && (
            <div className={styles.conclusionSlide}>
              <h2>{currentSlideData.title}</h2>
              <h3>{currentSlideData.subtitle}</h3>
              <p>{currentSlideData.content}</p>
            </div>
          )}
        </div>
        
        {/* Slide controls */}
        <div className="slide-controls">
          <button 
            onClick={handlePrevious} 
            disabled={currentSlide === 0}
          >
            Previous
          </button>
          <button 
            onClick={handleNext} 
            disabled={currentSlide === slides.length - 1}
          >
            Next
          </button>
        </div>
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2025 NEXUS Agenda Course</p>
        </div>
      </footer>
    </div>
  );
}