import { useNavigate } from 'react-router-dom'
import styles from './Connect.module.css'

const Connect = () => {
    const navigate = useNavigate()

    const configLink = 'https://vpn.example.com/config/user123'

    const handleCopy = () => {
        navigator.clipboard.writeText(configLink)
    }

    return (
        <div className={styles.container}>

            {/* Header */}
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                <span className={styles.headerTitle}>Подписка</span>
                <div className={styles.headerSpacer} />
            </div>

            {/* Инструкция — растягивается */}
            <div className={styles.infoCard}>
                <span className={styles.infoTitle}>Скачайте приложение</span>
                <span className={styles.infoDesc}>
                    Скачайте приложение Happ,{'\n'}
                    скопируйте вашу ссылку и{'\n'}
                    вставьте её в приложении
                </span>
            </div>

            {/* Скачать приложение */}
            <button className={styles.btnBlue}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Скачать приложение
            </button>

            {/* Ссылка + копировать */}
            <div className={styles.linkRow}>
                <div className={styles.linkBox}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                    <span className={styles.linkText}>Здесь будет ссылка</span>
                </div>
                <button className={styles.copyBtn} onClick={handleCopy}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                </button>
            </div>

            {/* Завершить настройку */}
            <button className={`${styles.btnBlue} ${styles.btnFinish}`} >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Завершить настройку
            </button>

        </div>
    )
}

export default Connect;