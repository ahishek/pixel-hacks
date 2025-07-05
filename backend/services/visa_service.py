"""
Visa TMS Service Layer - Mock Implementation
This service layer mimics Visa TMS API calls for push provisioning.
Replace this entire service with actual Visa API calls when ready.
"""

import json
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Any
from backend.services.mock_data import MOCK_VISA_RESPONSES, MERCHANT_APPS


class VisaTokenManagementService:
    """
    Mock implementation of Visa Token Management Service
    Based on: https://developer.visaacceptance.com/docs/vas/en-us/tms/developer/ctv/rest/tms/tms-workflows/tms-workflow-push-provisioning.html
    """
    
    def __init__(self):
        self.base_url = "https://sandbox.api.visa.com/cybersource/tms/v1"  # Mock URL
        self.api_key = "mock_api_key"  # Will be replaced with real credentials
    
    async def create_push_provisioning_request(self, card_data: Dict, merchant_apps: List[str]) -> Dict[str, Any]:
        """
        Mock implementation of Visa TMS Push Provisioning Request
        POST /pushProvisioning
        """
        # Simulate API processing time
        request_id = str(uuid.uuid4())
        
        # Mock response based on Visa TMS structure
        response = {
            "requestId": request_id,
            "status": "ACCEPTED",
            "timestamp": datetime.utcnow().isoformat(),
            "pushProvisioningResults": []
        }
        
        # Create mock token for each merchant app
        for app_name in merchant_apps:
            app_data = next((app for app in MERCHANT_APPS if app["name"] == app_name), None)
            if app_data:
                token_data = {
                    "merchantId": app_data["merchant_id"],
                    "merchantName": app_name,
                    "tokenReferenceId": f"TKN_{str(uuid.uuid4())[:8].upper()}",
                    "tokenStatus": "ACTIVE",
                    "provisioningResult": "SUCCESS",
                    "tokenExpiryDate": (datetime.utcnow() + timedelta(days=1095)).strftime("%Y%m"),  # 3 years
                    "createdTimestamp": datetime.utcnow().isoformat(),
                    "lastUpdatedTimestamp": datetime.utcnow().isoformat()
                }
                response["pushProvisioningResults"].append(token_data)
        
        return response
    
    async def get_token_status(self, token_reference_id: str) -> Dict[str, Any]:
        """
        Mock implementation of Get Token Status
        GET /tokens/{tokenReferenceId}
        """
        # Return mock token status
        return {
            "tokenReferenceId": token_reference_id,
            "tokenStatus": "ACTIVE",
            "merchantName": "Mock Merchant",
            "lastUsedTimestamp": datetime.utcnow().isoformat(),
            "tokenExpiryDate": (datetime.utcnow() + timedelta(days=1095)).strftime("%Y%m")
        }
    
    async def update_token_status(self, token_reference_id: str, status: str) -> Dict[str, Any]:
        """
        Mock implementation of Update Token Status
        PUT /tokens/{tokenReferenceId}
        """
        return {
            "tokenReferenceId": token_reference_id,
            "tokenStatus": status.upper(),
            "lastUpdatedTimestamp": datetime.utcnow().isoformat(),
            "updateResult": "SUCCESS"
        }
    
    async def delete_token(self, token_reference_id: str) -> Dict[str, Any]:
        """
        Mock implementation of Delete Token
        DELETE /tokens/{tokenReferenceId}
        """
        return {
            "tokenReferenceId": token_reference_id,
            "deletionResult": "SUCCESS",
            "deletedTimestamp": datetime.utcnow().isoformat()
        }
    
    async def list_tokens(self, card_identifier: str) -> Dict[str, Any]:
        """
        Mock implementation of List Tokens
        GET /tokens?cardIdentifier={cardIdentifier}
        """
        # Return mock list of tokens
        mock_tokens = []
        for i, app in enumerate(MERCHANT_APPS[:5]):  # Return first 5 apps with tokens
            mock_tokens.append({
                "tokenReferenceId": f"TKN_{str(uuid.uuid4())[:8].upper()}",
                "merchantId": app["merchant_id"],
                "merchantName": app["name"],
                "tokenStatus": "ACTIVE" if i % 2 == 0 else "INACTIVE",
                "createdTimestamp": (datetime.utcnow() - timedelta(days=i*10)).isoformat(),
                "lastUsedTimestamp": (datetime.utcnow() - timedelta(days=i)).isoformat() if i % 2 == 0 else None
            })
        
        return {
            "tokens": mock_tokens,
            "totalCount": len(mock_tokens),
            "responseTimestamp": datetime.utcnow().isoformat()
        }