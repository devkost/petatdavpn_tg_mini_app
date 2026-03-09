import { useState, useEffect } from 'react'
import styles from './Connect.module.css'
import Header from '../../ui/Header/Header'
import useTgUser from '../../hooks/useTgUser'
import { api } from '../../api'

const Connect = () => {
    const { tgId } = useTgUser()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!tgId) {
            setLoading(false)
            return
        }
        const fetchUser = async () => {
            try {
                const data = await api.get(`/user/${tgId}`)
                setUser(data)
            } catch (error) {
                console.error("Ошибка загрузки", error)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [tgId])

    const configLink = user?.vpn_key ?? null

    const handleCopy = async () => {
        if (!configLink) return
        await navigator.clipboard.writeText(configLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
        window.Telegram.WebApp.openLink('https://apps.apple.com/app/happ-proxy-utility/id6504287215')
    }

    const handleConnect = () => {
        if (!configLink) return
        const deeplink = `happ://install-sub?url=${encodeURIComponent(configLink)}`
        window.location.href = deeplink
    }

    if (loading) return <div className="errorLoad">Загрузка...</div>

    return (
        <div className={styles.container}>

            {/* Header */}
            <Header title="Подключение" />

            {/* Инструкция */}
            <div className={styles.infoCard}>
                <span className={styles.infoTitle}>Скачайте приложение</span>
                <span className={styles.infoDesc}>
                    Скачайте приложение Happ,{'\n'}
                    нажмите "Подключиться" и{'\n'}
                    подписка добавится автоматически
                </span>
            </div>

            {/* Скачать приложение */}
            <button className={styles.btnBlue} onClick={handleDownload}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Скачать Happ
            </button>

            {/* Ссылка + копировать */}
            <div className={styles.linkRow}>
                <div className={styles.linkBox}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                    <span className={styles.linkText}>
                        {configLink ?? 'Ссылка не найдена'}
                    </span>
                </div>
                <button
                    className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`}
                    onClick={handleCopy}
                    disabled={!configLink}
                >
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

            {/* Подключиться */}
            <button
                className={`${styles.btnBlue} ${styles.btnFinish}`}
                onClick={handleConnect}
                disabled={!configLink}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Подключиться
            </button>

        </div>
    )
}

export default Connect;