import { useNavigate } from 'react-router-dom'
import styles from './Subscribe.module.css'

const benefits = [
    'Обход ограничений и глушилок',
    'До 10 устройств одновременно',
    'Безлимитный трафик',
    'YouTube 4K без рекламы',
    'Высокая скорость соединения',
    'Неограниченная пропускная способность',
]

const locations = ['PL', 'NO', 'LV', 'SE', 'DE', 'KZ']

const Subscribe = () => {
    const navigate = useNavigate()

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

            {/* Benefits — фиксированная высота */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                    </div>
                    <span className={styles.cardTitle}>Преимущества подписки</span>
                </div>
                <ul className={styles.list}>
                    {benefits.map((item, i) => (
                        <li key={i} className={styles.listItem}>
                            <span className={styles.check}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            </span>
                            <span className={styles.listText}>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Locations — растягивается в свободное место */}
            <div className={styles.cardLocations}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                    </div>
                    <span className={styles.cardTitle}>Доступные локации</span>
                </div>
                <div className={styles.grid}>
                    {locations.map((code) => (
                        <div className={styles.locationBtn}>
                            {code}
                        </div>
                    ))}
                </div>
            </div>

            {/* Кнопка */}
            <button className={styles.btnChoose} onClick={() => navigate('/tariff')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                </svg>
                Выбрать тариф
            </button>
        </div>
    )
}

export default Subscribe