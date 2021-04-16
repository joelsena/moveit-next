import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ExperienceBar } from '../components/ExperienceBar';
import { ChallengeBox } from '../components/ChallengeBox';
import styles from '../styles/pages/Home.module.css';
import { Countdown } from '../components/Countdown';
import { Profile } from '../components/Profile';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

// Home do projeto
// Não fazer chamadas a API nas funções que retornam os componentes
// Porque os motores de busca não vão aguardar essa chamada finalizar
export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
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
    </ChallengesProvider>
  );
}

// Esse método manipula o que é passado da camada next para o front(react)
// Função do Next.js que nos permite fazer buscas na API para preencher
// os componentes com os dados do back-end
// Fazer chamadas a API nessas funções possibilitam um indexação melhor e mais otimizada
// Só pode ser feita embaixo de uma tela
export const getServerSideProps: GetServerSideProps = async(ctx) => {
  // ctx = contexto
  // Todos os cookies da nossa aplicação
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  // Retorna o que queremos passar para a camada front
  return{
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  };
}
// Cookies são uma estrutura de persistêcia que pode ser acessado tanto no front quanto no back
// Motores de busca esperam uma resposta do servidor para depois renderizar a página
