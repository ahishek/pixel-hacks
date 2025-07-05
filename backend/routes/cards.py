"""
Card management API endpoints
"""

from fastapi import APIRouter, HTTPException
from typing import List
from backend.models.token_models import CardDetails, Transaction, TransactionListResponse
from backend.services.mock_data import MOCK_CARD_DATA, MOCK_TRANSACTIONS
from datetime import datetime

router = APIRouter(prefix="/api/cards", tags=["cards"])


@router.get("/details", response_model=CardDetails)
async def get_card_details():
    """
    Get credit card details for the logged-in user
    """
    try:
        # Convert camelCase keys to snake_case for Pydantic model
        card_data = {
            "card_number": MOCK_CARD_DATA["cardNumber"],
            "card_holder_name": MOCK_CARD_DATA["cardHolderName"],
            "expiry_date": MOCK_CARD_DATA["expiryDate"],
            "cvv": MOCK_CARD_DATA["cvv"],
            "card_type": MOCK_CARD_DATA["cardType"],
            "available_limit": MOCK_CARD_DATA["availableLimit"],
            "total_outstanding": MOCK_CARD_DATA["totalOutstanding"],
            "next_statement_date": MOCK_CARD_DATA["nextStatementDate"],
            "unspent_amount": MOCK_CARD_DATA["unspentAmount"]
        }
        return CardDetails(**card_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch card details: {str(e)}")


@router.get("/transactions", response_model=TransactionListResponse)
async def get_transaction_history(limit: int = 10, offset: int = 0):
    """
    Get transaction history for the user's card
    """
    try:
        # Apply pagination
        transactions = MOCK_TRANSACTIONS[offset:offset + limit]
        
        return TransactionListResponse(
            transactions=[Transaction(**txn) for txn in transactions],
            total_count=len(MOCK_TRANSACTIONS),
            response_timestamp=datetime.utcnow()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch transactions: {str(e)}")


@router.get("/transactions/{transaction_id}", response_model=Transaction)
async def get_transaction_details(transaction_id: str):
    """
    Get details of a specific transaction
    """
    try:
        transaction = next((txn for txn in MOCK_TRANSACTIONS if txn["id"] == transaction_id), None)
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")
        
        return Transaction(**transaction)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch transaction details: {str(e)}")