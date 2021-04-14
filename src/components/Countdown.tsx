import { useState, useEffect } from 'react';
import { useHook } from '../contexts/ChallengesContext';

import styles from '../styles/components/Countdown.module.css';

// Tipagem global do javascript
let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
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

    // padStart(maxLength, fillString) => verifica se tem tantos caracteres e senão tiver adiciona no começo(start) o caracter desejado
    // Split() => Divide a string apartir de um caracter passado
    // No caso divide tudo
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setIsActive(!isActive);
    }

    function resetTimeout() {
        clearTimeout(countdownTimeout);
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
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>

                <span>:</span>

                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetTimeout}
                        >
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className={styles.countdownButton}
                            onClick={startCountdown}
                        >
                            Iniciar um ciclo
                        </button>
                    ) }
                </>
            )}

            
        </div>
    );
}