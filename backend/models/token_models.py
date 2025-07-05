"""
Pydantic models for token management and push provisioning
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


class TokenStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    SUSPENDED = "SUSPENDED"
    DELETED = "DELETED"


class ProvisioningStatus(str, Enum):
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"
    PENDING = "PENDING"


class PushProvisioningRequest(BaseModel):
    merchant_app_ids: List[int] = Field(..., description="List of merchant app IDs to provision tokens for")
    card_identifier: str = Field(..., description="Card identifier (masked or tokenized)")


class PushProvisioningResult(BaseModel):
    merchant_id: str
    merchant_name: str
    token_reference_id: str
    token_status: TokenStatus
    provisioning_result: ProvisioningStatus
    token_expiry_date: str
    created_timestamp: datetime
    last_updated_timestamp: datetime


class PushProvisioningResponse(BaseModel):
    request_id: str
    status: str
    timestamp: datetime
    push_provisioning_results: List[PushProvisioningResult]


class TokenInfo(BaseModel):
    token_reference_id: str
    merchant_id: str
    merchant_name: str
    token_status: TokenStatus
    created_timestamp: datetime
    last_used_timestamp: Optional[datetime] = None
    token_expiry_date: str


class TokenListResponse(BaseModel):
    tokens: List[TokenInfo]
    total_count: int
    response_timestamp: datetime


class TokenUpdateRequest(BaseModel):
    token_status: TokenStatus


class TokenUpdateResponse(BaseModel):
    token_reference_id: str
    token_status: TokenStatus
    last_updated_timestamp: datetime
    update_result: str


class CardDetails(BaseModel):
    card_number: str
    card_holder_name: str
    expiry_date: str
    cvv: str
    card_type: str
    available_limit: int
    total_outstanding: int
    next_statement_date: str
    unspent_amount: int


class Transaction(BaseModel):
    id: str
    merchant: str
    amount: int
    date: str
    type: str
    status: str
    token_used: bool = False
    token_reference_id: Optional[str] = None


class TransactionListResponse(BaseModel):
    transactions: List[Transaction]
    total_count: int
    response_timestamp: datetime