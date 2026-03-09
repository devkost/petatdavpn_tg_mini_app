import httpx

MARZBAN_URL = "https://petardavpn.duckdns.org"
MARZBAN_USER = "devkost"
MARZBAN_PASS = "Zxcfdsa111"

async def create_vpn_user(username: str) -> str | None:
    async with httpx.AsyncClient(timeout=120.0) as client:
        res = await client.post(
            f"{MARZBAN_URL}/api/admin/token",
            data={"username": MARZBAN_USER, "password": MARZBAN_PASS}
        )
        token = res.json()["access_token"]

        res = await client.post(
            f"{MARZBAN_URL}/api/user",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "username": username,
                "status": "active",
                "proxies": {"vless": {}},
                "inbounds": {"vless": ["VLESS TCP REALITY"]},
                "data_limit": 0,
                "expire": None
            }
        )
        print(f"Marzban response: {res.status_code} {res.text}")
        if res.status_code == 200:
            sub_url = res.json()["subscription_url"]
            await client.put(
                f"{MARZBAN_URL}/api/user/{username}",
                headers={"Authorization": f"Bearer {token}"},
                json={"status": "disabled"}
            )
            return sub_url

        if res.status_code == 409:
            res = await client.get(
                f"{MARZBAN_URL}/api/user/{username}",
                headers={"Authorization": f"Bearer {token}"}
            )
            if res.status_code == 200:
                return res.json()["subscription_url"]

        return None


async def set_user_status(username: str, active: bool) -> bool:
    if not username:
        return False
    status = "active" if active else "disabled"
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            res = await client.post(
                f"{MARZBAN_URL}/api/admin/token",
                data={"username": MARZBAN_USER, "password": MARZBAN_PASS}
            )
            token = res.json()["access_token"]
            res = await client.put(
                f"{MARZBAN_URL}/api/user/{username}",
                headers={"Authorization": f"Bearer {token}"},
                json={"status": status}
            )
            return res.status_code == 200
    except Exception as e:
        print(f"[Marzban] Ошибка изменения статуса {username}: {e}")
        return False
