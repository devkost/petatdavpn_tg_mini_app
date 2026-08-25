import httpx

from app.config import settings

BASE_URL = settings.backend_url.rstrip("/") + "/api"

async def init_user(tg_id: int, username = None, referrer_tg_id = None ) -> dict | None:
    try:
        params = {
            "tg_id": tg_id,
        }

        if username is not None:
            params["username"] = username


        if referrer_tg_id is not None:
            params["referrer_tg_id"] = referrer_tg_id

        async with httpx.AsyncClient(timeout=120.0) as client:
            res = await client.post(f"{BASE_URL}/user/create", params=params)
            res.raise_for_status()


            return res.json()
    except httpx.ConnectTimeout:
        print("API недоступен — таймаут")
        return None
    except httpx.HTTPStatusError as e:
        print(f"Ошибка API: {e.response.status_code}")
        print(f"Детали: {e.response.text}")
        return None
    
async def save_vpn_key(tg_id: int, vpn_key = None):
    try:
        params = {
            "tg_id": tg_id,
            "vpn_key": vpn_key
        }

        async with httpx.AsyncClient(timeout=120.0, verify=False) as client:
            res = await client.post(f"{BASE_URL}/user/vpn-key", params=params)
            res.raise_for_status()
            return res.json()
    except httpx.ConnectTimeout:
        print("API недоступен — таймаут")
        return None
    except httpx.HTTPStatusError as e:
        print(f"Ошибка API: {e.response.status_code}")
        return None