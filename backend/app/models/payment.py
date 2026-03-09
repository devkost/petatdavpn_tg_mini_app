from sqlalchemy import ForeignKey, String, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
from datetime import datetime, timezone

from app.models.user import User


class Payment(Base):
    __tablename__ = "payments"

    id:           Mapped[int]            = mapped_column(primary_key=True)
    user_id:      Mapped[int]            = mapped_column(ForeignKey("users.id"))
    amount:       Mapped[int]            = mapped_column(Integer)
    status:       Mapped[str]            = mapped_column(String(16))
    created_at:   Mapped[datetime]       = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    paid_at:      Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    # Связь
    user: Mapped["User"] = relationship(back_populates="payments")
