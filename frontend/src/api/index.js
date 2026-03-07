// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const BASE_URL = "https://petatdavpntgminiapp-production.up.railway.app/api"

export const api = {
    get: (url) => fetch(`${BASE_URL}${url}`)
        .then(res => res.json()),

    post: (url, body) => fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(res => res.json())
}