from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.routers import user, referral, payment
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.services.billing import charge_all_users
from app.database import AsyncSessionLocal
from fastapi.middleware.cors import CORSMiddleware

scheduler = AsyncIOScheduler()

async def daily_charge():
    async with AsyncSessionLocal() as session:
        await charge_all_users(session)

@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.add_job(daily_charge, "interval", minutes=1)
    scheduler.start()
    yield
    scheduler.shutdown()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(referral.router)
app.include_router(payment.router)

@app.get("/health")
async def health():
    return {"status": "ok"}
