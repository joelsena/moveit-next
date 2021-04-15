import { useHook } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level } = useHook();

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/joelsena.png" alt="Joel Sena"/>

            <div>
                <strong>Joel Sena</strong>
                <p>
                    <img src="icons/level.svg" alt="Ícone"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}