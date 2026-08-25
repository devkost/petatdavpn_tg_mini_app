import { useEffect, useState } from 'react'
import Header from '../../ui/Header/Header'
import styles from './DocPage.module.css'

const parseMarkdown = (text) => {
    const lines = text.split('\n')
    const elements = []
    let listItems = []
    let listKey = 0

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`ul-${listKey++}`}>
                    {listItems}
                </ul>
            )
            listItems = []
        }
    }

    const parseInline = (str) => {
        const tokens = []
        const regex = /(\*\*.*?\*\*|\*.*?\*|[^*]+)/g
        let m
        while ((m = regex.exec(str)) !== null) {
            const t = m[0]
            if (t.startsWith('**') && t.endsWith('**')) {
                tokens.push(<strong key={tokens.length}>{t.slice(2, -2)}</strong>)
            } else if (t.startsWith('*') && t.endsWith('*')) {
                tokens.push(<em key={tokens.length}>{t.slice(1, -1)}</em>)
            } else {
                tokens.push(t)
            }
        }
        return tokens.length === 1 ? tokens[0] : tokens
    }

    lines.forEach((raw, idx) => {
        const line = raw.trim()
        if (!line) {
            flushList()
            return
        }

        if (line.startsWith('### ')) {
            flushList()
            elements.push(<h3 key={idx}>{line.slice(4)}</h3>)
        } else if (line.startsWith('## ')) {
            flushList()
            elements.push(<h2 key={idx}>{line.slice(3)}</h2>)
        } else if (line.startsWith('# ')) {
            flushList()
            elements.push(<h1 key={idx}>{line.slice(2)}</h1>)
        } else if (line.startsWith('- ')) {
            listItems.push(
                <li key={idx}>
                    {parseInline(line.slice(2))}
                </li>
            )
        } else {
            flushList()
            elements.push(
                <p key={idx}>
                    {parseInline(line)}
                </p>
            )
        }
    })

    flushList()
    return elements
}

const DocPage = ({ title, date, docUrl }) => {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(docUrl)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load document')
                return res.text()
            })
            .then(text => {
                setContent(text)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [docUrl])

    if (loading) {
        return (
            <div className={styles.container}>
                <Header title={title} />
                <div className={styles.content}>Загрузка...</div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Header title={title} />
            <div className={styles.content}>
                <div className={styles.date}>{date}</div>
                <div className={styles.card}>
                    {parseMarkdown(content)}
                </div>
            </div>
        </div>
    )
}

export default DocPage
