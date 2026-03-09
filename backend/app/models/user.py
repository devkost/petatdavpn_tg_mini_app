from typing import List, TYPE_CHECKING
from sqlalchemy import BigInteger, String, DateTime, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
from datetime import datetime, timezone

if TYPE_CHECKING:
    from app.models.payment import Payment
    from app.models.referral import Referral


class User(Base):
    __tablename__ = "users"

    id:         Mapped[int]      = mapped_column(primary_key=True)
    tg_id:      Mapped[int]      = mapped_column(BigInteger, unique=True, index=True)
    username:   Mapped[str|None] = mapped_column(String(64))
    password_hash: Mapped[str|None] = mapped_column(String(256))
    is_active:  Mapped[bool]     = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    balance:    Mapped[int]      = mapped_column(BigInteger, nullable=False, default=0, server_default='0')
    vpn_key:    Mapped[str|None] = mapped_column(String(512))

    email:      Mapped[str|None] = mapped_column(String(256), unique=True)
    
    # Связи
    payments:   Mapped[list["Payment"]]     = relationship(back_populates="user")
    referrals:  Mapped[list["Referral"]]    = relationship(back_populates="user", foreign_keys="Referral.referrer_id")
