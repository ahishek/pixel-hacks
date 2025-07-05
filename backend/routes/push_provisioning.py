"""
Push Provisioning API endpoints
Based on Visa TMS Push Provisioning workflow
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List
from backend.models.token_models import (
    PushProvisioningRequest, PushProvisioningResponse, 
    PushProvisioningResult, TokenStatus, ProvisioningStatus
)
from services.visa_service import VisaTokenManagementService
from services.mock_data import MERCHANT_APPS, MOCK_CARD_DATA
from datetime import datetime
import logging
import asyncio

router = APIRouter(prefix="/api/push-provisioning", tags=["push-provisioning"])
visa_service = VisaTokenManagementService()
logger = logging.getLogger(__name__)


@router.post("", response_model=PushProvisioningResponse)
async def create_push_provisioning_request(request: PushProvisioningRequest, background_tasks: BackgroundTasks):
    """
    Create push provisioning request for selected merchant apps
    This endpoint initiates the token creation process for multiple merchants
    """
    try:
        # Validate merchant app IDs
        valid_app_ids = [app["id"] for app in MERCHANT_APPS]
        invalid_ids = [app_id for app_id in request.merchant_app_ids if app_id not in valid_app_ids]
        
        if invalid_ids:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid merchant app IDs: {invalid_ids}"
            )
        
        # Get merchant app names for the request
        selected_apps = [
            app for app in MERCHANT_APPS 
            if app["id"] in request.merchant_app_ids
        ]
        merchant_names = [app["name"] for app in selected_apps]
        
        logger.info(f"Starting push provisioning for merchants: {merchant_names}")
        
        # Call Visa TMS service for push provisioning
        visa_response = await visa_service.create_push_provisioning_request(
            card_data=MOCK_CARD_DATA,
            merchant_apps=merchant_names
        )
        
        # Convert Visa response to our API response format
        provisioning_results = []
        for result in visa_response["pushProvisioningResults"]:
            provisioning_results.append(
                PushProvisioningResult(
                    merchant_id=result["merchantId"],
                    merchant_name=result["merchantName"],
                    token_reference_id=result["tokenReferenceId"],
                    token_status=TokenStatus(result["tokenStatus"]),
                    provisioning_result=ProvisioningStatus(result["provisioningResult"]),
                    token_expiry_date=result["tokenExpiryDate"],
                    created_timestamp=datetime.fromisoformat(result["createdTimestamp"].replace('Z', '+00:00')),
                    last_updated_timestamp=datetime.fromisoformat(result["lastUpdatedTimestamp"].replace('Z', '+00:00'))
                )
            )
        
        response = PushProvisioningResponse(
            request_id=visa_response["requestId"],
            status=visa_response["status"],
            timestamp=datetime.fromisoformat(visa_response["timestamp"].replace('Z', '+00:00')),
            push_provisioning_results=provisioning_results
        )
        
        logger.info(f"Push provisioning completed successfully. Request ID: {response.request_id}")
        
        # Add background task for any post-processing if needed
        background_tasks.add_task(log_provisioning_completion, response.request_id, len(provisioning_results))
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Push provisioning failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Push provisioning failed: {str(e)}")


@router.get("/status/{request_id}")
async def get_push_provisioning_status(request_id: str):
    """
    Get the status of a push provisioning request
    """
    try:
        # In a real implementation, this would check the actual status
        # For now, return a mock success status
        return {
            "request_id": request_id,
            "status": "COMPLETED",
            "timestamp": datetime.utcnow().isoformat(),
            "message": "Push provisioning completed successfully"
        }
    except Exception as e:
        logger.error(f"Failed to get provisioning status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get provisioning status: {str(e)}")


@router.get("/merchants")
async def get_available_merchants():
    """
    Get list of available merchant apps for push provisioning
    """
    try:
        return {
            "merchants": MERCHANT_APPS,
            "total_count": len(MERCHANT_APPS),
            "response_timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.error(f"Failed to get merchants: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get merchants: {str(e)}")


async def log_provisioning_completion(request_id: str, token_count: int):
    """
    Background task to log completion of push provisioning
    """
    logger.info(f"Push provisioning request {request_id} completed with {token_count} tokens created")