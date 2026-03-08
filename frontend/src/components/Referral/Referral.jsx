import { useState, useEffect } from 'react'
import styles from './Referral.module.css'
import Header from '../../ui/Header/Header'
import useTgUser from '../../hooks/useTgUser'
import { api } from '../../api'

const perks = [
    '+3 дня подписки',
    '+20% от пополнения друга на ваш баланс',
    'Каждый 10-й друг → +3 дня подписки',
]

const Referral = () => {
    const { tgId } = useTgUser()
    const [loading, setLoading] = useState(true)
    const [countRef, setRefCount] = useState(null)
    const refLink = `https://t.me/petardavpnbot?start=${tg_id}`
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!tgId) {
            console.error("Не удалось получить tg_id из Telegram WebApp")
            setLoading(false)
            return
        }

        const fetchCountReferrals = async () => {
            try {
                const data = await api.get(`/referrals/count/${tgId}`)
                setRefCount(data)
                setLoading(false)
                console.log(data)
            } catch (error) {
                console.error("Ошибка загрузки", error)
            }
        }
        fetchCountReferrals()
    }, [])


    const handleCopy = async () => {
        await navigator.clipboard.writeText(refLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    if (loading) return <div className="errorLoad">Загрузка...</div>

    return (
        <>
            <div className={styles.container}>
                <Header title="Пригласить друга" />

                {/* Счётчик — свободный блок */}
                <div className={styles.counterCard}>
                    <span className={styles.counterValue}>{ countRef ?? '0' }</span>
                    <span className={styles.counterLabel}>друзей приглашено</span>
                </div>

                {/* Перки */}
                <div className={styles.perksCard}>
                    {perks.map((perk, i) => (
                        <div key={i} className={styles.perkItem}>
                            <span className={styles.check}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            </span>
                            <span className={styles.perkText}>{perk}</span>
                        </div>
                    ))}
                </div>

                {/* Реферальная ссылка */}
                <div className={styles.refRow}>
                    <div className={styles.refLink}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                        </svg>
                        <span className={styles.refLinkText}>https://t.me/petardavpnbot?start={tgId}</span>
                    </div>
                    <button className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`} onClick={handleCopy}>
                        {copied ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Referral;