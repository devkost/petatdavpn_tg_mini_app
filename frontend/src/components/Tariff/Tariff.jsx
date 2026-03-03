import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Tariff.module.css'

const plans = [
    { id: 1, period: '1 месяц',   price: 299,  priceLabel: '299 ₽',  perMonth: null },
    { id: 2, period: '3 месяца',  price: 799,  priceLabel: '799 ₽',  perMonth: '266₽ месяц' },
    { id: 3, period: '6 месяцев', price: 1499, priceLabel: '1 499 ₽', perMonth: '250₽ месяц' },
    { id: 4, period: '1 год',     price: 2399, priceLabel: '2 399 ₽', perMonth: '200₽ месяц' },
]

const Tariff = () => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(null)

    const current = plans.find(p => p.id === selected)

    return (
        <div className={styles.container}>

            {/* Header */}
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                <span className={styles.headerTitle}>Выбор тарифа</span>
                <div className={styles.headerSpacer} />
            </div>

            {/* Grid тарифов — растягивается */}
            <div className={styles.grid}>
                {plans.map(plan => (
                    <button
                        key={plan.id}
                        className={`${styles.planCard} ${selected === plan.id ? styles.planCardActive : ''}`}
                        onClick={() => setSelected(plan.id)}
                    >
                        <span className={styles.planPrice}>{plan.priceLabel}</span>
                        <span className={styles.planPeriod}>{plan.period}</span>
                        {plan.perMonth && (
                            <span className={styles.planPerMonth}>{plan.perMonth}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Кнопка оплаты */}
            <button className={styles.btnPay} disabled={!current}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                {current ? `Оплатить ${current.priceLabel}` : 'Выберите тариф'}
            </button>

        </div>
    )
}

export default Tariff;