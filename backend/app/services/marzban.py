import httpx
from app.config import settings


async def _get_token() -> str:
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{settings.marzban_url}/api/admin/token",
            data={
                "username": settings.marzban_username,
                "password": settings.marzban_password,
            },
        )
        resp.raise_for_status()
        return resp.json()["access_token"]


def _extract_username(vpn_key: str) -> str | None:
    if not vpn_key:
        return None
    return vpn_key.rstrip("/").split("/")[-1] or None


async def set_user_status(vpn_key: str, active: bool) -> bool:
    username = _extract_username(vpn_key)
    if not username:
        return False

    status = "active" if active else "disabled"

    try:
        token = await _get_token()
        async with httpx.AsyncClient() as client:
            resp = await client.put(
                f"{settings.marzban_url}/api/user/{username}",
                json={"status": status},
                headers={"Authorization": f"Bearer {token}"},
            )
            resp.raise_for_status()
        return True
    except Exception as e:
        print(f"[Marzban] Ошибка изменения статуса {username} → {status}: {e}")
        return False
