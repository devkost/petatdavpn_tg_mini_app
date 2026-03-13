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

const tg = window.Telegram?.WebApp
const tgUser = tg?.initDataUnsafe?.user
const isTG = window.Telegram?.WebApp?.platform && 
             window.Telegram.WebApp.platform !== 'unknown'
const startPage = isTG || tgUser ? '/home' : '/auth'

function App() {
    useEffect(() => {
        async function initTg() {
            if (!tg) return

            try {
                init()
            } catch {}

            if (viewport.mount.isAvailable()) {
                await viewport.mount()
                viewport.expand()
            }

            if (viewport.requestFullscreen.isAvailable()) {
                if (tg?.platform !== 'tdesktop' && tg?.platform !== 'macos') {
                    await viewport.requestFullscreen()

                    document.body.classList.add('tg-app')
                    const finalPadding = 100
                    document.documentElement.style.setProperty('--tg-header-height', `${finalPadding}px`)
                }
            } 
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
                        <Route path='*' element={<Navigate to='/' replace />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App