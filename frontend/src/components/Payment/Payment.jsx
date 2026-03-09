import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Payment.module.css'
import Header from '../../ui/Header/Header'

const DAILY_COST = 5

const quickAmounts = [
    { amount: 100, days: 20 },
    { amount: 200, days: 40 },
    { amount: 300, days: 60 },
    { amount: 500, days: 100 },
    { amount: 1000, days: 200 },
    { amount: 2000, days: 400 },
]

const paymentMethods = [
    { id: 'card', label: 'Карта РФ', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
    )},
    { id: 'sbp', label: 'СБП (Система быстрых платежей)', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>
        </svg>
    )},
    { id: 'crypto', label: 'Криптовалюта', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9 8h4a2 2 0 0 1 0 4H9v4"/><line x1="9" y1="12" x2="14" y2="12"/>
        </svg>
    )},
        { id: 'crypto', label: 'Криптовалюта', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9 8h4a2 2 0 0 1 0 4H9v4"/><line x1="9" y1="12" x2="14" y2="12"/>
        </svg>
    )},
        { id: 'crypto', label: 'Криптовалюта', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9 8h4a2 2 0 0 1 0 4H9v4"/><line x1="9" y1="12" x2="14" y2="12"/>
        </svg>
    )},
        { id: 'crypto', label: 'Криптовалюта', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9 8h4a2 2 0 0 1 0 4H9v4"/><line x1="9" y1="12" x2="14" y2="12"/>
        </svg>
    )},
]

const Payment = () => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(null)
    const [inputVal, setInputVal] = useState('')
    const [methodOpen, setMethodOpen] = useState(false)
    const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0])

    const amount = selected ?? (parseInt(inputVal) || 0)
    const days = amount > 0 ? Math.floor(amount / DAILY_COST) : 0

    const handleQuick = (val) => {
        setSelected(val)
        setInputVal(String(val))
    }

    const handleInput = (e) => {
        setSelected(null)
        setInputVal(e.target.value)
    }

    const handleMethodSelect = (method) => {
        setSelectedMethod(method)
        setMethodOpen(false)
    }

    return (
        <div className={styles.container}>
            <Header title="Пополнение" />

            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                    </div>
                    <span className={styles.cardTitle}>Способ оплаты</span>
                </div>

                <div
                    className={`${styles.methodBtn} ${methodOpen ? styles.methodBtnOpen : ''}`}
                    onClick={() => setMethodOpen(!methodOpen)}
                >
                    <span className={styles.methodBtnIcon}>{selectedMethod.icon}</span>
                    <span className={styles.methodBtnLabel}>{selectedMethod.label}</span>
                    <svg
                        className={`${styles.methodChevron} ${methodOpen ? styles.methodChevronOpen : ''}`}
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </div>

                {methodOpen && (
                    <div className={styles.dropdown}>
                        {paymentMethods.map((m) => (
                            <div
                                key={m.id}
                                className={`${styles.dropdownItem} ${selectedMethod.id === m.id ? styles.dropdownItemActive : ''}`}
                                onClick={() => handleMethodSelect(m)}
                            >
                                <span className={styles.dropdownIcon}>{m.icon}</span>
                                <span className={styles.dropdownLabel}>{m.label}</span>
                                {selectedMethod.id === m.id && (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.cardQuick}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                    </div>
                    <span className={styles.cardTitle}>Быстрый выбор</span>
                </div>
                <div className={styles.grid}>
                    {quickAmounts.map((q) => (
                        <button
                            key={q.amount}
                            className={`${styles.quickBtn} ${selected === q.amount ? styles.quickBtnActive : ''}`}
                            onClick={() => handleQuick(q.amount)}
                        >
                            <span className={styles.quickPrice}>{q.amount.toLocaleString('ru-RU')} ₽</span>
                            <span className={styles.quickDays}>{q.days} дней</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.inputWrap}>
                <input
                    className={styles.amountInput}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Введите сумму"
                    value={inputVal}
                    onChange={handleInput}
                    onKeyDown={(e) => {
                        if (!/[0-9]/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab'].includes(e.key)) {
                            e.preventDefault()
                        }
                    }}
                />
                <span className={styles.currencyLabel}>₽</span>
            </div>

            <div className={styles.infoBlock}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.infoIcon}>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                <span className={styles.infoText}>
                    Баланс пополняется мгновенно. Списание 5 ₽/день.
                    {days > 0 && <> Выбранной суммы хватит на <b>{days} дней</b>.</>}
                </span>
            </div>

            <button className={styles.btnPay} disabled={amount <= 0}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                {amount > 0 ? `Оплатить ${amount.toLocaleString('ru-RU')} ₽` : 'Введите сумму'}
            </button>

        </div>
    )
}

export default Payment;
