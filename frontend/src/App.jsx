import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { init, isTMA, viewport } from '@telegram-apps/sdk'
import Auth from './components/Auth/Auth.jsx'
import Home from './components/Home/Home.jsx'
import Subscribe from './components/Subscribe/Subscribe.jsx'
import Referral from './components/Referral/Referral.jsx'
import Payment from './components/Payment/Payment.jsx'
import Connect from './components/Connect/Connect.jsx'
import Profile from './components/Profile/Profile.jsx'
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy.jsx'
import UserAgreement from './components/UserAgreement/UserAgreement.jsx'

const tg = window.Telegram?.WebApp
const tgUser = tg?.initDataUnsafe?.user
const isTG = window.Telegram?.WebApp?.platform && 
             window.Telegram.WebApp.platform !== 'unknown'
const startPage = isTG || tgUser ? '/home' : '/auth'

function App() {
    useEffect(() => {
        async function initTg() {
            if (!tg) return

            try { init() } catch {}

            const platform = tg.platform?.toLowerCase()
            const isMobile = platform !== 'tdesktop' && platform !== 'macos'

            if (isMobile) {
                if (viewport.requestFullscreen.isAvailable()) {
                    await viewport.requestFullscreen()
                } else {
                    try {
                        await window.Telegram.WebApp.requestFullscreen()
                    } catch(e) {
                        console.log('fullscreen error:', e)
                        window.Telegram.WebApp.expand()
                    }
                }
            }

            console.log('requestFullscreen available:', viewport.requestFullscreen.isAvailable())
            console.log('platform:', platform)
            if (platform && (platform === 'ios' || platform === 'android')) {
                tg.ready()
                document.body.classList.add('tg-app')
            }

            const applyPadding = () => {
                const platform = tg.platform?.toLowerCase()
                const safeTop        = tg.safeAreaInset?.top ?? 0
                const contentSafeTop = tg.contentSafeAreaInset?.top ?? 0
                const totalTop       = safeTop + contentSafeTop
                const finalPadding   = (platform === 'tdesktop' || platform === 'macos') ? 32 : totalTop

                console.log('applyPadding:', { safeTop, contentSafeTop, finalPadding })
                document.documentElement.style.setProperty('--tg-header-height', `${finalPadding}px`)
            }

            tg.onEvent('safeAreaChanged', applyPadding)
            tg.onEvent('contentSafeAreaChanged', applyPadding)

            applyPadding()
        }
        initTg()
    }, [])

    return (
        <>
            <div className='grid-lines'></div>
            <div className='container'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Navigate to={startPage} replace />} />
                        <Route path='/auth' element={<Auth />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/subscribe' element={<Subscribe />} />
                        <Route path='/referral' element={<Referral />} />
                        <Route path='/payment' element={<Payment />} />
                        <Route path='/connect' element={<Connect />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                        <Route path='/user-agreement' element={<UserAgreement />} />
                        <Route path='*' element={<Navigate to='/' replace />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App