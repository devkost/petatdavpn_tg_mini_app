from fastapi import FastAPI
from app.routers import user, referral, payment

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
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
