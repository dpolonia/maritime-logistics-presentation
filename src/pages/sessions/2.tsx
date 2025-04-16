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

export default function Session2() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading content
    const timer = setTimeout(() => {
      setIsLoading(false);
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
        <meta name="description" content="Session 2: Technology Stack for Maritime and Logistics Innovation" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.4.0/dist/reveal.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.4.0/dist/theme/white.css" />
        <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.4.0/dist/reveal.js"></script>
      </Head>

      <header className={styles.header}>
        <h1>Session 2: Technology Stack for Maritime and Logistics Innovation</h1>
        <Link href="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </header>

      <main className={styles.main}>
        {/* Static version of the content without RevealWrapper */}
        <div className={styles.staticContent}>
          <h1>Session 2: Technology Stack for Maritime and Logistics Innovation</h1>
          
          <div className={styles.contentSection}>
            <h2>Learning Objectives</h2>
            <ul>
              <li>Evaluate Technology Applicability - Assess which specific technologies are most appropriate for different NEXUS components</li>
              <li>Analyze Implementation Prerequisites - Identify technical, operational, and organizational prerequisites</li>
              <li>Map Technology-Challenge Alignment - Match specific maritime challenges with appropriate technological solutions</li>
              <li>Identify Integration Requirements - Determine data flows and interoperability needs</li>
              <li>Develop Technology Roadmaps - Create phased implementation plans</li>
            </ul>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Technology Context in Maritime and Logistics</h2>
            <ul>
              <li>Digital Maturity - Current state assessment of port technology adoption and international benchmarking</li>
              <li>Maritime Adaptations - Environmental and operational constraints affecting technology implementation</li>
              <li>NEXUS Strategy - Portfolio approach to technology selection, capability building, and standards</li>
            </ul>
          </div>
          
          <div className={styles.contentSection}>
            <h2>AI and Machine Learning Applications</h2>
            <ul>
              <li>Maritime AI Use Cases - Predictive maintenance, operational optimization, document processing</li>
              <li>Implementation Architecture - Data requirements, model development, integration approaches</li>
              <li>NEXUS Applications - Open data platform analytics, federated applications, digital twin integration</li>
            </ul>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Blockchain and Distributed Ledger</h2>
            <ul>
              <li>Supply Chain Transparency - Provenance tracking, certificates of origin</li>
              <li>Smart Contracts - Automated customs clearance, insurance claims, payments</li>
              <li>Document Management - Secure, tamper-proof storage and verification</li>
            </ul>
          </div>
          
          <div className={styles.contentSection}>
            <h2>IoT, Cloud, and Edge Computing</h2>
            <ul>
              <li>Sensor Networks - Equipment monitoring, cargo tracking, environmental conditions</li>
              <li>Edge Processing - Real-time data analysis, reduced bandwidth requirements</li>
              <li>Cloud Integration - Central data repositories, analytics, machine learning</li>
            </ul>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Next-Generation Connectivity</h2>
            <ul>
              <li>5G/6G Applications - Ultra-reliable low-latency communications, massive IoT deployments</li>
              <li>Private Networks - Secure, dedicated infrastructure for critical operations</li>
              <li>NEXUS Requirements - Bandwidth, latency, reliability considerations for maritime applications</li>
            </ul>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Interactive Activities</h2>
            <ul>
              <li>Technology-Challenge Mapping - Collaborative exercise matching technologies to maritime challenges</li>
              <li>Solution Architecture Design - Technical design workshop for NEXUS components</li>
              <li>Technology Roadmap Development - Creating phased implementation plans</li>
            </ul>
          </div>
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