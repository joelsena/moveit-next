// CSS Modules => Uma forma de utilizar estilos no Next
// Em vez de colocar strings de classes coloca o módulo 'styles'
import { useHook } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useHook();

    // Regra de 3
    // Se experienceToNextLevel é 100% então currentExperience é quanto?
    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return(
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />

                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }} >
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}