from sqlalchemy import ForeignKey, BigInteger, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
from datetime import datetime, timezone

from app.models.user import User


class Referral(Base):
    __tablename__ = "referrals"

    id:               Mapped[int]              = mapped_column(primary_key=True)
    referrer_id:      Mapped[int]              = mapped_column(ForeignKey("users.id"))
    referred_user_id: Mapped[int]              = mapped_column(ForeignKey("users.id"))

    created_at:       Mapped[datetime]         = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user:             Mapped["User"]           = relationship(back_populates="referrals", foreign_keys=[referrer_id])
    inviter:          Mapped["User"]           = relationship(foreign_keys=[referred_user_id])
