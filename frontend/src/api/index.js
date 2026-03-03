const BASE_URL = 'https://undej-wiley-sinless.ngrok-free.dev/api'

export const api = {
    get: (url) => fetch(`${BASE_URL}${url}`)
        .then(res => res.json()),

    post: (url, body) => fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(res => res.json())
}