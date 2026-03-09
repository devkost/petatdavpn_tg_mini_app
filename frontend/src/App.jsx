import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
window.Telegram.WebApp.expand()
window.Telegram.WebApp.requestFullscreen()

function App() {
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