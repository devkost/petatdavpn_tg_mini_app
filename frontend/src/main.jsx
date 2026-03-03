import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const tg = window.Telegram?.WebApp

if (tg?.platform && tg.platform !== 'unknown') {
    tg.ready()

    const platform = tg.platform.toLowerCase()

    document.body.classList.add('tg-app')
    if (platform === 'ios')                              document.body.classList.add('tg-ios')
    if (platform === 'android')                          document.body.classList.add('tg-android')
    if (platform === 'tdesktop' || platform === 'macos') document.body.classList.add('tg-desktop')

    const safeTop        = tg.safeAreaInset?.top ?? 0
    const contentSafeTop = tg.contentSafeAreaInset?.top ?? 0
    const totalTop       = safeTop + contentSafeTop

    const finalPadding = (platform === 'tdesktop' || platform === 'macos') ? 32 : totalTop

    document.documentElement.style.setProperty('--tg-header-height', `${finalPadding}px`)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)