import { useNavigate } from 'react-router-dom'
import styles from './Auth.module.css';

const Auth = () => {
    return (
        <>
            <div className={styles.info}>
                {/* Верхний блок: бейдж + бренд + слоган */}
                <div className={styles.infoTop}>
                    <div className={styles.badge}>
                        Сервера онлайн
                    </div>
                    <div className={styles.brand}>PetardaVPN</div>
                    <div className={styles.tagline}>
                        Безлимитный VPN · Без логов · Без<br/>ограничений<br/>Подключитесь за 10 секунд
                    </div>
                </div>

                {/* Блок статистики — занимает всё оставшееся место */}
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>20+</span>
                        <span className={styles.statLabel}>стран</span>
                    </div>
                    <div className={styles.divider}/>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>0</span>
                        <span className={styles.statLabel}>логов</span>
                    </div>
                </div>
            </div>

            <div className={styles.separator} />

            <div className={styles.actions}>
                <button className={styles.btn_email}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                    Войти по Email
                </button>

                <button className={styles.btn_createacc}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    Создать аккаунт
                </button>

                <div className={styles.or}>или</div>

                <button className={styles.btn_telegramacc}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.4l-2.963-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.559.186z"/>
                    </svg>
                    Войти через Telegram
                </button>

                <p className={styles.legal}>
                    Создавая аккаунт, вы соглашаетесь с<br/>
                    <a href="#">Условиями использования</a> и
                    <a href="#"> Политикой<br/>конфиденциальности</a>
                </p>
            </div>
        </>
    )
}

export default Auth
