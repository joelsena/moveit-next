import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useHook } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    isActive: boolean;
    hasFinished: boolean;

    startCountdown(): void;
    resetCountdown(): void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

const CountdownContext = createContext({} as CountdownContextData);

// Tipagem global do javascript
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    // Transformar minutos para segundo
    // Multiplica o minuto por 60
    const [time, setTime] = useState<number>(0.1 * 60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [hasFinished, setHasFinished] = useState<boolean>(false);
    const { startNewChallenge } = useHook();

    // De segundos para minutos
    // Faz o processo reverso
    // Garante que vai ser um valor não quebrado
    const minutes = Math.floor(time / 60);

    // O resto da divisão de minutos por 60 corresponde aos segundos
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(!isActive);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setHasFinished(false);
        setIsActive(false);
        setTime(25 * 60);
    }

    // Adiciona um efeito coláteral toda vez que o active e o time mudar
    useEffect(() => {
        if(isActive && time > 0){
            // Assina este timeout em uma variável para reseta-lo depois
            countdownTimeout = setTimeout(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if(isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return(
        <CountdownContext.Provider
            value={{
                minutes,
                seconds,
                isActive,
                hasFinished,
                startCountdown,
                resetCountdown
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
}

export function useCountdownHook() {
    const countdownContext = useContext(CountdownContext);

    if(!countdownContext) throw new Error('The context must be inside a provider');

    return countdownContext;
}