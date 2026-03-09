import httpx

MARZBAN_URL = "https://petardavpn.duckdns.org"
MARZBAN_USER = "devkost"
MARZBAN_PASS = "Zxcfdsa111"

async def get_token() -> str:
    async with httpx.AsyncClient() as client:
        res = await client.post(f"{MARZBAN_URL}/api/admin/token",
            data={"username": MARZBAN_USER, "password": MARZBAN_PASS})
        return res.json()["access_token"]

async def create_vpn_user(username: str) -> str | None:
    token = await get_token()
    async with httpx.AsyncClient() as client:
        res = await client.post(
            f"{MARZBAN_URL}/api/user",
            headers={"Authorization": f"Bearer {token}"},
            json={
                "username": username,
                "proxies": {"vless": {}},
                "inbounds": {"vless": ["VLESS TCP REALITY"]},
                "data_limit": 0,
                "expire": None
            }
        )
        if res.status_code == 200:
            return res.json()["subscription_url"]
        return None
