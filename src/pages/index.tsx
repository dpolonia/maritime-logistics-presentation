import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const sessions = [
    { id: 1, title: 'Overview of NEXUS Agenda and Advanced Technologies' },
    { id: 2, title: 'Advanced Technologies in Project Management' },
    { id: 3, title: 'Data-Driven Project Management' },
    { id: 4, title: 'Ensuring Project Security and Transparency' },
    { id: 5, title: 'Robotics, Automation, and Project Execution' },
    { id: 6, title: 'Managing Federated Applications and Services' },
    { id: 7, title: 'Leading Innovative Projects and Managing Change' },
    { id: 8, title: 'Risk Management and Regulatory Compliance' },
    { id: 9, title: 'Course Review and Practical Application' },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>NEXUS Agenda Course</title>
        <meta name="description" content="NEXUS Agenda Course Presentation System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>NEXUS Agenda Course</h1>

        <p className={styles.description}>
          Select a session to begin
        </p>

        <div className={styles.grid}>
          {sessions.map((session) => (
            <Link href={`/sessions/${session.id}`} key={session.id}>
              <div className={styles.card}>
                <h2>Session {session.id}</h2>
                <p>{session.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
