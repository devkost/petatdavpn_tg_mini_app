const useTgUser = () => {
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user
    return {
        tgId: tgUser?.id ?? null,
        username: tgUser?.username ?? 'none'
    }
}

export default useTgUser;