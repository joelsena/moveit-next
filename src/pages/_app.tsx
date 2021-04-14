import { ChallengesProvider } from '../contexts/ChallengesContext';
import '../styles/global.css';

// A primeira página vem pronto do intermediário que é o next.js
// As página depois vão ser geradas no front mas de primeira não;
// O servidor node processa nossa interface e retorna o HTML, CSS E JS prontos.

/**** 
  SPA(Single Page Application) = Somente uma página é retornada. O conteúdo muda mas a página em si não.
  => Contras:
      • Se disabilitar o javascript ele fica inútil;
      • Dificulta a indexização de busca em ferramentas de pesquisa;
      • Dificulta crowlers de buscar informações da tua página para pesquisa ou embed data;
        
 SSR(Server-side Rendering) = Um servidor intermediário com o dever de retornar a interface já pronta para o client-side
        • É possível otimizar a indexação de pesquisa e de crowlers;
        • Aumenta a performance e a segurança já que é este servidor intermediário retorna uma página estática
 SSG(Static-side generation) = É um HTML, CSS E JS estático mas que conseguimos atualizar ele de tempos em tempos.
        • Evita muitas requisições desnecessárias ao banco para distribuir um dado repetido 

***/

// Tudo que se repete entre as páginas vem para cá

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp
