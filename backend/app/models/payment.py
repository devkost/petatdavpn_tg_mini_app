from sqlalchemy import ForeignKey, String, DateTime, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
from datetime import datetime

from app.models.user import User


class Payment(Base):
    __tablename__ = "payments"

    id:           Mapped[int]        = mapped_column(primary_key=True)
    user_id:      Mapped[int]        = mapped_column(ForeignKey("users.id"))
    amount:       Mapped[float]      = mapped_column(Float)
    status:       Mapped[str]        = mapped_column(String(16))
    created_at:   Mapped[datetime]   = mapped_column(DateTime, default=datetime.utcnow)

    # Связь
    user: Mapped["User"] = relationship(back_populates="payments")
