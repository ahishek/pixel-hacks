"""
Mock data for Visa TMS API responses
Modify this file to change mock responses when testing
"""

from datetime import datetime, timedelta

# Mock Visa TMS API responses
MOCK_VISA_RESPONSES = {
    "push_provisioning_success": {
        "requestId": "REQ_12345678",
        "status": "ACCEPTED",
        "timestamp": "2024-01-15T10:30:00Z",
        "pushProvisioningResults": [
            {
                "merchantId": "MERCHANT_001",
                "merchantName": "Myntra",
                "tokenReferenceId": "TKN_ABCD1234",
                "tokenStatus": "ACTIVE",
                "provisioningResult": "SUCCESS",
                "tokenExpiryDate": "202701",
                "createdTimestamp": "2024-01-15T10:30:00Z"
            }
        ]
    },
    "push_provisioning_error": {
        "requestId": "REQ_12345679",
        "status": "FAILED",
        "timestamp": "2024-01-15T10:30:00Z",
        "errorCode": "INVALID_CARD",
        "errorMessage": "The provided card details are invalid"
    },
    "token_status": {
        "tokenReferenceId": "TKN_ABCD1234",
        "tokenStatus": "ACTIVE",
        "merchantName": "Myntra",
        "lastUsedTimestamp": "2024-01-15T09:15:00Z",
        "tokenExpiryDate": "202701"
    }
}

# Merchant app configuration with mock Visa merchant IDs
MERCHANT_APPS = [
    {
        "id": 1,
        "name": "Myntra",
        "merchant_id": "VISA_MERCHANT_001",
        "category": "Fashion",
        "description": "Fashion & Lifestyle",
        "icon": "👗"
    },
    {
        "id": 2,
        "name": "Uber",
        "merchant_id": "VISA_MERCHANT_002",
        "category": "Transportation",
        "description": "Ride & Delivery",
        "icon": "🚗"
    },
    {
        "id": 3,
        "name": "Zepto",
        "merchant_id": "VISA_MERCHANT_003",
        "category": "Grocery",
        "description": "10-minute grocery delivery",
        "icon": "🛒"
    },
    {
        "id": 4,
        "name": "Playo",
        "merchant_id": "VISA_MERCHANT_004",
        "category": "Sports",
        "description": "Sports & Fitness",
        "icon": "🏸"
    },
    {
        "id": 5,
        "name": "Bigbasket",
        "merchant_id": "VISA_MERCHANT_005",
        "category": "Grocery",
        "description": "Online grocery shopping",
        "icon": "🥬"
    },
    {
        "id": 6,
        "name": "Flipkart",
        "merchant_id": "VISA_MERCHANT_006",
        "category": "E-commerce",
        "description": "Online shopping",
        "icon": "🛍️"
    },
    {
        "id": 7,
        "name": "Swiggy",
        "merchant_id": "VISA_MERCHANT_007",
        "category": "Food",
        "description": "Food delivery",
        "icon": "🍕"
    }
]

# Mock card data
MOCK_CARD_DATA = {
    "cardNumber": "4532123456789012",
    "cardHolderName": "RAKESH VERMA",
    "expiryDate": "12/28",
    "cvv": "123",
    "cardType": "visa",
    "issuerBankId": "HDFC_BANK_001",
    "availableLimit": 65000,
    "totalOutstanding": 0,
    "nextStatementDate": "2024-02-25",
    "unspentAmount": 0
}

# Mock transaction history
MOCK_TRANSACTIONS = [
    {
        "id": "TXN_001",
        "merchant": "Uber",
        "amount": 100,
        "date": "2024-01-15",
        "type": "ride",
        "status": "completed",
        "tokenUsed": True,
        "tokenReferenceId": "TKN_UBER_001"
    },
    {
        "id": "TXN_002",
        "merchant": "Amazon",
        "amount": 250,
        "date": "2024-01-14",
        "type": "shopping",
        "status": "completed",
        "tokenUsed": False,
        "tokenReferenceId": None
    },
    {
        "id": "TXN_003",
        "merchant": "Airtel Payment on PayZapp",
        "amount": 450,
        "date": "2024-01-13",
        "type": "recharge",
        "status": "completed",
        "tokenUsed": False,
        "tokenReferenceId": None
    },
    {
        "id": "TXN_004",
        "merchant": "Zepto",
        "amount": 300,
        "date": "2024-01-12",
        "type": "grocery",
        "status": "completed",
        "tokenUsed": True,
        "tokenReferenceId": "TKN_ZEPTO_001"
    }
]