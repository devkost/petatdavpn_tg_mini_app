import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Home.module.css'
import Header from '../../ui/Header/Header'
import '../../styles/global.css'
import useTgUser from '../../hooks/useTgUser'
import { api } from '../../api'

const getOS = () => {
    const ua = navigator.userAgent
    if (/android/i.test(ua))               return 'Android'
    if (/iphone|ipad|ipod/i.test(ua))      return 'iOS'
    if (/mac os x/i.test(ua))              return 'macOS'
    if (/linux/i.test(ua))                 return 'Linux'
    if (/windows/i.test(ua))               return 'Windows'
    return 'Устройство'
}

const Home = () => {
    const navigate = useNavigate()
    const os = getOS()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const { tgId } = useTgUser()

    useEffect(() => {
        if (!tgId) {
            console.error("Не удалось получить tg_id из Telegram WebApp")
            setLoading(false)
            return
        }

        const fetchUser = async () => {
            try {
                const data = await api.get(`/user/${tgId}`)
                setUser(data)
                setLoading(false)
                console.log(data)
            } catch (error) {
                console.error("Ошибка загрузки", error)
            }
        }
        fetchUser()
    }, [])

    if (loading) return <div className="errorLoad">Загрузка...</div>

    return (
        <>
            <div className={styles.container}>
                <Header title="PetardaVPN" tgBtn/>

                <div className={styles.cards}>
                    {/* Верхний ряд: 2 карточки */}
                    <div className={styles.cardsRow}>
                        <div className={styles.card}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                            </svg>
                            <span className={styles.cardLabel}>Статус</span>
                            <span className={`${styles.cardValue} ${user.is_active ? styles.cardValueGreen : styles.cardValueRed}`}>{user.is_active ? "Активна" : "Не активна"}</span>
                        </div>

                        <div className={styles.card}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <span className={styles.cardLabel}>Истекает через</span>
                            <span className={`${styles.cardValue} ${styles.cardValueOrange}`}>3 дня</span>
                        </div>
                    </div>

                    {/* Нижняя карточка по центру */}
                    <div className={styles.cardsRowCenter}>
                        <div className={styles.card}>
                            <span className={styles.cardLabel}>Баланс</span>
                            <span className={styles.cardValue}>{user.balance.toLocaleString('de-DE')} ₽</span>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    {/* Подключить VPN */}
                    <button className={`${styles.btn} ${styles.btnBlue}`} onClick={() => navigate('/connect')}>
                        <span className={styles.btnLeft}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                            Подключить VPN
                        </span>
                        <span className={styles.btnRight}>для {os}</span>
                    </button>

                    {/* Продлить подписку */}
                    <button className={`${styles.btn} ${styles.btnBlue}`} onClick={() => navigate('/subscribe')}>
                        <span className={styles.btnLeft}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                            </svg>
                            Пополнить баланс
                        </span>
                        <span className={styles.btnRight}>от 299 ₽</span>
                    </button>

                    {/* Пригласить друга */}
                    <button className={`${styles.btn} ${styles.btnDark}`} onClick={() => navigate('/referral')}>
                        <span className={styles.btnLeft}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
                            </svg>
                            Пригласить друга
                        </span>
                    </button>

                    {/* Поддержка */}
                    <button className={`${styles.btn} ${styles.btnDark}`}>
                        <span className={styles.btnLeft}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                            Поддержка
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home;
