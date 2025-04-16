import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/Session.module.css';
import SlideContent from '../../components/SlideContent';
import NavigationControls from '../../components/NavigationControls';
import ParticipantEngagement from '../../components/ParticipantEngagement';
import ProgressTracker from '../../components/ProgressTracker';
import dynamic from 'next/dynamic';
import { initPerformanceMonitoring, startTiming, endTiming } from '@/utils/performance';

// Dynamically import the RevealWrapper to avoid SSR issues
const RevealWrapper = dynamic(
  () => import('@/components/presentation/RevealWrapper'),
  { ssr: false }
);

export default function Session2() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize performance monitoring
  useEffect(() => {
    startTiming('session2-initialization');
    initPerformanceMonitoring();
    
    // Simulate loading content
    const timer = setTimeout(() => {
      setIsLoading(false);
      endTiming('session2-initialization');
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Loading session...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Session 2: Technology Stack for Maritime and Logistics Innovation | NEXUS Agenda Course</title>
        <meta name="description" content="Session 2: Technology Stack for Maritime and Logistics Innovation - Learn about advanced technologies for maritime and logistics applications" />
      </Head>

      <header className={styles.header}>
        <h1>Session 2: Technology Stack for Maritime and Logistics Innovation</h1>
        <Link href="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </header>

      <main className={styles.main}>
        <RevealWrapper
          config={{
            controls: true,
            progress: true,
            center: true,
            transition: 'slide',
            backgroundTransition: 'fade',
            viewDistance: 3,
            autoPlayMedia: true,
            fragments: true,
            // For accessibility
            accessibility: {
              keyboardNavigation: true,
              skipLinks: true,
              navigationMode: 'linear',
              help: true,
            },
            // Track performance metrics
            presentationRecording: process.env.NODE_ENV === 'development',
          }}
        >
          {/* Title Slide */}
          <section className="slide" data-background-color="#0a558c">
            <div className="slide-content">
              <h1 className="text-5xl font-bold text-white mb-6">
                Technology Stack for Maritime and Logistics Innovation
              </h1>
              <h2 className="text-3xl text-white/90 mb-8">
                Session 2: NEXUS Agenda Course
              </h2>
              <p className="text-xl text-white/80">
                Advanced technologies and implementation strategies for the maritime sector
              </p>
            </div>
          </section>

          {/* Learning Objectives Slide */}
          <section className="slide" data-background-color="#ffffff">
            <div className="slide-content">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Learning Objectives</h2>
              <ul className="text-left space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-600 p-2 rounded-full mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">Evaluate Technology Applicability</p>
                    <p className="text-gray-600">Assess which specific technologies are most appropriate for different NEXUS components and identify key selection criteria</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-600 p-2 rounded-full mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">Analyze Implementation Prerequisites</p>
                    <p className="text-gray-600">Identify technical, operational, and organizational prerequisites for successful technology implementation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-600 p-2 rounded-full mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">Map Technology-Challenge Alignment</p>
                    <p className="text-gray-600">Match specific maritime and logistics challenges with appropriate technological solutions</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-600 p-2 rounded-full mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">Identify Integration Requirements</p>
                    <p className="text-gray-600">Determine integration requirements between different technologies, focusing on data flows and interoperability</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-600 p-2 rounded-full mr-4 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">Develop Technology Roadmaps</p>
                    <p className="text-gray-600">Create phased implementation plans for introducing advanced technologies into NEXUS components</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Technology Context Section */}
          <section>
            <section className="slide" data-background-color="#f8fafc">
              <div className="slide-content">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Technology Context in Maritime and Logistics</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-xl mb-4">Understanding the current landscape, challenges, and opportunities</p>
                  <div className="grid grid-cols-3 gap-4 text-center mt-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Digital Maturity</h3>
                      <p className="text-gray-600">Current state and benchmarking</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Maritime Adaptations</h3>
                      <p className="text-gray-600">Sector-specific considerations</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">NEXUS Strategy</h3>
                      <p className="text-gray-600">Technology portfolio approach</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="slide" data-background-color="#f8fafc">
              <div className="slide-content">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Digital Maturity Landscape</h3>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Current state assessment of Portuguese port technology adoption</p>
                        <p className="text-gray-600">Evaluation of existing systems, integration levels, and digital capabilities</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">International benchmarking against leading digital ports</p>
                        <p className="text-gray-600">Comparison with Rotterdam, Singapore, Hamburg, and other digital leaders</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Sector-specific implementation challenges and success factors</p>
                        <p className="text-gray-600">Critical factors that influence technology adoption in maritime environments</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="slide" data-background-color="#f8fafc">
              <div className="slide-content">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Maritime-Specific Technology Adaptations</h3>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Operational constraints affecting technology implementation</p>
                        <p className="text-gray-600">24/7 operations, equipment reliability requirements, and interface with global systems</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Environmental considerations for maritime deployments</p>
                        <p className="text-gray-600">Saltwater exposure, weather conditions, electromagnetic interference, and power requirements</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Regulatory frameworks governing maritime technology adoption</p>
                        <p className="text-gray-600">IMO regulations, customs requirements, security standards, and privacy considerations</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="slide" data-background-color="#f8fafc">
              <div className="slide-content">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">NEXUS Technology Strategy</h3>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Portfolio approach to technology selection and implementation</p>
                        <p className="text-gray-600">Strategic framework for evaluating and selecting complementary technologies</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Capability building requirements across stakeholders</p>
                        <p className="text-gray-600">Skills development, organizational change management, and training approaches</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Standards and interoperability considerations</p>
                        <p className="text-gray-600">Adoption of industry standards, API specifications, and data exchange protocols</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </section>

          {/* AI and Machine Learning Section */}
          <section>
            <section className="slide" data-background-color="#e1effe">
              <div className="slide-content">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">AI and Machine Learning Applications</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-xl mb-4">Intelligent systems for maritime and logistics optimization</p>
                  <div className="grid grid-cols-3 gap-4 text-center mt-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Maritime AI Use Cases</h3>
                      <p className="text-gray-600">Domain-specific applications</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Implementation Architecture</h3>
                      <p className="text-gray-600">Technical framework and approach</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">NEXUS Applications</h3>
                      <p className="text-gray-600">Project-specific integrations</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="slide" data-background-color="#e1effe">
              <div className="slide-content">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Maritime AI Use Cases</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-lg shadow">
                    <h4 className="text-xl font-semibold text-blue-800 mb-3">Predictive Maintenance</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Equipment failure prediction using sensor data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Maintenance scheduling optimization</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Reduced downtime and operational disruption</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow">
                    <h4 className="text-xl font-semibold text-blue-800 mb-3">Operational Optimization</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Container stacking and yard management</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Berth allocation and vessel scheduling</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Resource allocation optimization</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow">
                    <h4 className="text-xl font-semibold text-blue-800 mb-3">Document Processing</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Automated document classification</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Data extraction from shipping documents</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Customs facilitation and clearance</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow">
                    <h4 className="text-xl font-semibold text-blue-800 mb-3">Synchromodal Transport</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Real-time multi-modal route optimization</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Dynamic carrier selection and allocation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Emissions reduction through optimal modal shifts</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="slide" data-background-color="#e1effe">
              <div className="slide-content">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Implementation Architecture</h3>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xl font-semibold text-blue-800 mb-3">Data Requirements</h4>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Data collection infrastructure and protocols</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Data quality assessment and preparation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Historical data requirements by use case</span>
                        </li>
                      </ul>
                      
                      <h4 className="text-xl font-semibold text-blue-800 mb-3">Model Development</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Model selection and training approaches</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Evaluation metrics for maritime applications</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Periodic retraining and model evolution</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-blue-800 mb-3">Integration Approach</h4>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>API-based model serving architecture</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Integration with operational systems</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Data pipelines for real-time processing</span>
                        </li>
                      </ul>
                      
                      <h4 className="text-xl font-semibold text-blue-800 mb-3">Performance Monitoring</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Model performance and drift detection</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Operational KPIs and business impact</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Feedback loops for continuous improvement</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="slide" data-background-color="#e1effe">
              <div className="slide-content">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">NEXUS-Specific Applications</h3>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="text-xl font-semibold text-blue-800 mb-2">Open Data Platform Analytics</h4>
                      <p className="mb-4">Integration of AI capabilities with the NEXUS Open Data Platform</p>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Predictive analytics on aggregated port and logistics data</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Pattern recognition for operational anomalies</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Decision support dashboards with AI-driven recommendations</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="text-xl font-semibold text-blue-800 mb-2">AI-Enhanced Federated Applications</h4>
                      <p className="mb-4">AI capabilities integrated into NEXUS application portfolio</p>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Predictive ETA for vessel and cargo tracking applications</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Intelligent document processing for customs applications</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Resource optimization modules for terminal operations</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="text-xl font-semibold text-blue-800 mb-2">Digital Twin Integration</h4>
                      <p className="mb-4">AI integration with hardware assets via digital twin architecture</p>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Real-time anomaly detection for equipment performance</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Predictive maintenance for port infrastructure and equipment</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Simulation capabilities for operational planning and optimization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>

          {/* Blockchain Section */}
          <section>
            <section className="slide" data-background-color="#e6f7ff">
              <div className="slide-content">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Blockchain and Distributed Ledger Technologies</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-xl mb-4">Trusted, transparent transactions for maritime supply chains</p>
                  <div className="grid grid-cols-3 gap-4 text-center mt-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Maritime Use Cases</h3>
                      <p className="text-gray-600">Supply chain and documentation applications</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Implementation Architecture</h3>
                      <p className="text-gray-600">Technical framework and protocols</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">NEXUS Applications</h3>
                      <p className="text-gray-600">Project-specific integrations</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional blockchain section slides would go here */}
          </section>

          {/* IoT Section */}
          <section>
            <section className="slide" data-background-color="#edf2f7">
              <div className="slide-content">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">IoT, Cloud, and Edge Computing</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-xl mb-4">Connecting the physical and digital worlds in maritime environments</p>
                  <div className="grid grid-cols-3 gap-4 text-center mt-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Maritime IoT Landscape</h3>
                      <p className="text-gray-600">Sensor networks and applications</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Implementation Architecture</h3>
                      <p className="text-gray-600">Technical framework and approach</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">NEXUS Applications</h3>
                      <p className="text-gray-600">Project-specific integrations</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional IoT section slides would go here */}
          </section>

          {/* Connectivity Section */}
          <section>
            <section className="slide" data-background-color="#f0f9ff">
              <div className="slide-content">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Next-Generation Connectivity</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-xl mb-4">5G/6G and advanced networking for maritime operations</p>
                  <div className="grid grid-cols-3 gap-4 text-center mt-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">5G/6G Applications</h3>
                      <p className="text-gray-600">Maritime-specific use cases</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Private Networks</h3>
                      <p className="text-gray-600">Security and implementation</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">NEXUS Applications</h3>
                      <p className="text-gray-600">Project-specific requirements</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional connectivity section slides would go here */}
          </section>

          {/* Activities Preview */}
          <section className="slide" data-background-color="#0a558c">
            <div className="slide-content">
              <h2 className="text-4xl font-bold text-white mb-8">Interactive Activities</h2>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-5 rounded-lg">
                  <h3 className="text-2xl font-semibold text-white mb-3">Technology-Challenge Mapping</h3>
                  <p className="text-white/90">Collaborative exercise matching technologies to maritime challenges</p>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm p-5 rounded-lg">
                  <h3 className="text-2xl font-semibold text-white mb-3">Solution Architecture Design</h3>
                  <p className="text-white/90">Technical design workshop for NEXUS components</p>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm p-5 rounded-lg">
                  <h3 className="text-2xl font-semibold text-white mb-3">Technology Roadmap Development</h3>
                  <p className="text-white/90">Creating phased implementation plans</p>
                </div>
              </div>
              
              <div className="mt-8 text-white/80">
                <p>The activities are designed for cross-functional collaboration and hands-on application of concepts</p>
              </div>
            </div>
          </section>

          {/* Final Slide */}
          <section className="slide" data-background-color="#0a558c">
            <div className="slide-content">
              <h2 className="text-5xl font-bold text-white mb-8">Thank You</h2>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg max-w-2xl mx-auto">
                <p className="text-2xl text-white mb-6">
                  Session 2: Technology Stack for Maritime and Logistics Innovation
                </p>
                
                <div className="text-white/80">
                  <p>Next session will focus on implementation strategies and technical integration approaches</p>
                </div>
              </div>
            </div>
          </section>
        </RevealWrapper>
      </main>
    </div>
  );
}