"""
Token management API endpoints
"""

from fastapi import APIRouter, HTTPException
from typing import List
from models.token_models import (
    TokenInfo, TokenListResponse, TokenUpdateRequest, 
    TokenUpdateResponse, TokenStatus
)
from services.visa_service import VisaTokenManagementService
from services.mock_data import MERCHANT_APPS
from datetime import datetime
import logging

router = APIRouter(prefix="/api/tokens", tags=["tokens"])
visa_service = VisaTokenManagementService()
logger = logging.getLogger(__name__)


@router.get("", response_model=TokenListResponse)
async def list_user_tokens(card_identifier: str = "default_card"):
    """
    List all tokens for the user's card
    """
    try:
        # Call Visa TMS service to get tokens
        visa_response = await visa_service.list_tokens(card_identifier)
        
        return TokenListResponse(
            tokens=[TokenInfo(**token) for token in visa_response["tokens"]],
            total_count=visa_response["totalCount"],
            response_timestamp=datetime.fromisoformat(visa_response["responseTimestamp"].replace('Z', '+00:00'))
        )
    except Exception as e:
        logger.error(f"Failed to list tokens: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch tokens: {str(e)}")


@router.get("/{token_reference_id}", response_model=TokenInfo)
async def get_token_details(token_reference_id: str):
    """
    Get details of a specific token
    """
    try:
        # Call Visa TMS service to get token status
        visa_response = await visa_service.get_token_status(token_reference_id)
        
        return TokenInfo(
            token_reference_id=visa_response["tokenReferenceId"],
            merchant_id="UNKNOWN",  # Not provided in mock response
            merchant_name=visa_response["merchantName"],
            token_status=TokenStatus(visa_response["tokenStatus"]),
            created_timestamp=datetime.utcnow(),  # Mock data
            last_used_timestamp=datetime.fromisoformat(visa_response["lastUsedTimestamp"].replace('Z', '+00:00')) if visa_response.get("lastUsedTimestamp") else None,
            token_expiry_date=visa_response["tokenExpiryDate"]
        )
    except Exception as e:
        logger.error(f"Failed to get token details: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch token details: {str(e)}")


@router.put("/{token_reference_id}", response_model=TokenUpdateResponse)
async def update_token_status(token_reference_id: str, request: TokenUpdateRequest):
    """
    Update token status (activate/deactivate)
    """
    try:
        # Call Visa TMS service to update token
        visa_response = await visa_service.update_token_status(token_reference_id, request.token_status.value)
        
        return TokenUpdateResponse(
            token_reference_id=visa_response["tokenReferenceId"],
            token_status=TokenStatus(visa_response["tokenStatus"]),
            last_updated_timestamp=datetime.fromisoformat(visa_response["lastUpdatedTimestamp"].replace('Z', '+00:00')),
            update_result=visa_response["updateResult"]
        )
    except Exception as e:
        logger.error(f"Failed to update token: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update token: {str(e)}")


@router.delete("/{token_reference_id}")
async def delete_token(token_reference_id: str):
    """
    Delete a token permanently
    """
    try:
        # Call Visa TMS service to delete token
        visa_response = await visa_service.delete_token(token_reference_id)
        
        return {
            "message": "Token deleted successfully",
            "token_reference_id": visa_response["tokenReferenceId"],
            "deletion_result": visa_response["deletionResult"],
            "deleted_timestamp": visa_response["deletedTimestamp"]
        }
    except Exception as e:
        logger.error(f"Failed to delete token: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to delete token: {str(e)}")