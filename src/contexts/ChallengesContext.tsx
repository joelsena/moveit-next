import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import challenges from '../../challenges.json';


interface ChallengesProviderProps {
    children: ReactNode;
}

interface ChallengeType {
    type: string;
    description: string;
    amount: number;
}

interface ChallengesContextData {
    activeChallenge: ChallengeType;
    experienceToNextLevel: number;
    challengesCompleted: number;
    currentExperience: number;
    level: number;

    completeChallenge(): void;
    startNewChallenge(): void;
    resetChallenge(): void;
    levelUp(): void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

const notificationSounds = [
    'aaaaa',
    'epic-sax',
    'wake-me-up'
];

const lvlUpSounds = [
    'money',
    'stonks'
];

export function ChallengesProvider({ children }: ChallengesProviderProps){
    const [level, setLevel] = useState<number>(1);
    const [currentExperience, setCurrentExperience] = useState<number>(0);
    const [challengesCompleted, setChallengesCompleted] = useState<number>(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    // Requisita permisão para emitir notificações no browser do usuário
    useEffect(() => {
        Notification.requestPermission();
    }, []);
    
    function levelUp() {
        setLevel(prevLevel => prevLevel + 1);
        // const sound = Math.floor(Math.random() * lvlUpSounds.length);
        // new Audio(`sounds/lvlUp/${lvlUpSounds[sound]}.mp3`).play();
    }

    function startNewChallenge() {
        // Math.random() => retorna um número ENTRE 0 E 1
        // A multiplicação pode vai gerar números quebrados
        // por isso coloque o resultado em um Math.floor para arrendondar para baixo o número
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length); // Retorna uma número aleatório
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        // Executar um áudio
        // Outra API padrão de navegador
        // Tudo que estiver na pasta 'public' é enxergado diretamente pelos resto da aplicação
        // Não precisa de nenhum caminho louco
        const sound = Math.floor(Math.random() * notificationSounds.length);
        new Audio(`sounds/Notification/${notificationSounds[sound]}.mp3`).play();

        // Possui permissão
        if(Notification.permission === 'granted'){
            // Emiti uma nova notificação
            // Notification é uma API padrão dos navegadores
            new Notification('Novo desafio 🎉✨', {
                body: `Valendo ${challenge.amount}xp!`
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        // let it change
        let finalExperience = currentExperience + amount;


        // Verifica se tem xp o suficiente para upar de nível
        if(finalExperience >= experienceToNextLevel){
            // retira o excesso de xp se houver
            // Se forem igual fica 0
            finalExperience = finalExperience - experienceToNextLevel;
            // E em seguida incrementar o level
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setChallengesCompleted(prevValue => prevValue + 1);
        setActiveChallenge(null);
    }

    return(
        <ChallengesContext.Provider value={{ 
            experienceToNextLevel,
            challengesCompleted,
            completeChallenge,
            currentExperience, 
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            levelUp, 
            level
        }}>
            {children}
        </ChallengesContext.Provider>
    );
}

export function useHook() {
    const context = useContext(ChallengesContext);

    if (!context) throw new Error('The context must be inside a provider');
    return context;
}