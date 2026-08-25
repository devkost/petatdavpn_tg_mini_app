import { useNavigate } from 'react-router-dom'
import Header from '../../ui/Header/Header'
import styles from './Profile.module.css'

const Profile = () => {
    const navigate = useNavigate()

    const handlePrivacyPolicy = () => {
        navigate('/privacy-policy')
    }

    const handleUserAgreement = () => {
        navigate('/user-agreement')
    }

    return (
        <div className={styles.container}>
            <Header title="Профиль" />

            <div className={styles.content}>
                <button className={`${styles.btn} ${styles.btnDark}`} onClick={handlePrivacyPolicy}>
                    <span className={styles.btnLeft}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        Политика конфиденциальности
                    </span>
                </button>

                <button className={`${styles.btn} ${styles.btnDark}`} onClick={handleUserAgreement}>
                    <span className={styles.btnLeft}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                        </svg>
                        Пользовательское соглашение
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Profile
