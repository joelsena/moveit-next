import { createContext, useState, ReactNode, useContext } from 'react';
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

    startNewChallenge(): void;
    resetChallenge(): void;
    levelUp(): void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps){
    const [level, setLevel] = useState<number>(1);
    const [currentExperience, setCurrentExperience] = useState<number>(0);
    const [challengesCompleted, setChallengesCompleted] = useState<number>(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(prevLevel => prevLevel + 1);
    }

    function startNewChallenge() {
        // Math.random() => retorna um número ENTRE 0 E 1
        // A multiplicação pode vai gerar números quebrados
        // por isso coloque o resultado em um Math.floor para arrendondar para baixo o número
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length); // Retorna uma número aleatório
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    return(
        <ChallengesContext.Provider value={{ 
            experienceToNextLevel,
            challengesCompleted,
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