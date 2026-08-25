import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ title, tgBtn }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.header}>
            { tgBtn ? (
                <button className={styles.headerBtn} onClick={() => navigate('/profile')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                </button>
            ) : (
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
                    </svg>
                </button>
            )}

            <span className={styles.headerTitle}>{title}</span>

            { tgBtn ? ( 
                <button className={styles.headerBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
                </button>
            ) : (
                <div className={styles.headerSpacer} />
            )}
        </div>
    )
}

export default Header;