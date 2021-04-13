import { useState, useEffect } from 'react';

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    // Transformar minutos para segundo
    // Multiplica o minuto por 60
    const [time, setTime] = useState<number>(25 * 60);
    const [active, setActive] = useState<boolean>(false);

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
        setActive(!active);
    }

    // Adiciona um efeito coláteral toda vez que o active e o time mudar
    useEffect(() => {
        if(active && time > 0){
            setTimeout(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        }
    }, [active, time]);

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

            <button 
                type="button" 
                className={styles.countdownButton}
                onClick={startCountdown}
            >
                Iniciar um ciclo
            </button>
        </div>
    );
}