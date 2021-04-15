import Head from 'next/head';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ExperienceBar } from '../components/ExperienceBar';
import { ChallengeBox } from '../components/ChallengeBox';
import styles from '../styles/pages/Home.module.css';
import { Countdown } from '../components/Countdown';
import { Profile } from '../components/Profile';

// Home do projeto
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <ExperienceBar />

      {/* CountdownProvider vem aqui porque só a home precisa dela */}
      <CountdownProvider>
        <section>
          {/* Esquerda */}
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>

          {/* Direitas */}
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  );
}
