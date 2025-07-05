#!/usr/bin/env python3
"""
Backend API Test Script for Credit Card Token Management API
Tests all the key endpoints for the Visa TMS push provisioning workflow
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any, List, Optional

# Get the backend URL from the frontend .env file
BACKEND_URL = "https://ec5a1883-37fc-474f-a2a9-dfe69ab9c824.preview.emergentagent.com/api"

# Test result tracking
test_results = {
    "total": 0,
    "passed": 0,
    "failed": 0,
    "details": []
}

def log_test_result(endpoint: str, test_name: str, passed: bool, response: Optional[Dict] = None, error: Optional[str] = None):
    """Log test result with details"""
    result = {
        "endpoint": endpoint,
        "test_name": test_name,
        "passed": passed,
        "timestamp": datetime.now().isoformat(),
    }
    
    if response:
        result["status_code"] = response.status_code
        try:
            result["response"] = response.json()
        except:
            result["response"] = response.text
    
    if error:
        result["error"] = error
    
    test_results["total"] += 1
    if passed:
        test_results["passed"] += 1
        print(f"✅ PASS: {endpoint} - {test_name}")
    else:
        test_results["failed"] += 1
        print(f"❌ FAIL: {endpoint} - {test_name}")
        if error:
            print(f"   Error: {error}")
    
    test_results["details"].append(result)

def test_get_card_details():
    """Test GET /api/cards/details endpoint"""
    endpoint = "/cards/details"
    print(f"\n🔍 Testing GET {endpoint}")
    
    try:
        response = requests.get(f"{BACKEND_URL}{endpoint}")
        
        # Test status code
        status_code_ok = response.status_code == 200
        log_test_result(endpoint, "Status code is 200", status_code_ok, response)
        
        if status_code_ok:
            data = response.json()
            
            # Test response structure
            required_fields = [
                "card_number", "card_holder_name", "expiry_date", "cvv", 
                "card_type", "available_limit", "total_outstanding", 
                "next_statement_date", "unspent_amount"
            ]
            
            missing_fields = [field for field in required_fields if field not in data]
            structure_ok = len(missing_fields) == 0
            
            if not structure_ok:
                error_msg = f"Missing fields: {', '.join(missing_fields)}"
            else:
                error_msg = None
                
            log_test_result(endpoint, "Response has correct structure", structure_ok, response, error_msg)
            
            # Test data types
            if structure_ok:
                type_checks = [
                    isinstance(data["card_number"], str),
                    isinstance(data["card_holder_name"], str),
                    isinstance(data["expiry_date"], str),
                    isinstance(data["available_limit"], int),
                    isinstance(data["total_outstanding"], int)
                ]
                
                types_ok = all(type_checks)
                log_test_result(endpoint, "Response has correct data types", types_ok, response)
    
    except Exception as e:
        log_test_result(endpoint, "No exceptions during request", False, error=str(e))

def test_get_transactions():
    """Test GET /api/cards/transactions endpoint"""
    endpoint = "/cards/transactions"
    print(f"\n🔍 Testing GET {endpoint}")
    
    try:
        # Test with default parameters
        response = requests.get(f"{BACKEND_URL}{endpoint}")
        
        # Test status code
        status_code_ok = response.status_code == 200
        log_test_result(endpoint, "Status code is 200", status_code_ok, response)
        
        if status_code_ok:
            data = response.json()
            
            # Test response structure
            required_fields = ["transactions", "total_count", "response_timestamp"]
            missing_fields = [field for field in required_fields if field not in data]
            structure_ok = len(missing_fields) == 0
            
            if not structure_ok:
                error_msg = f"Missing fields: {', '.join(missing_fields)}"
            else:
                error_msg = None
                
            log_test_result(endpoint, "Response has correct structure", structure_ok, response, error_msg)
            
            # Test transactions array
            if "transactions" in data and len(data["transactions"]) > 0:
                transaction = data["transactions"][0]
                transaction_fields = [
                    "id", "merchant", "amount", "date", "type", 
                    "status", "token_used"
                ]
                
                missing_tx_fields = [field for field in transaction_fields if field not in transaction]
                tx_structure_ok = len(missing_tx_fields) == 0
                
                if not tx_structure_ok:
                    error_msg = f"Transaction missing fields: {', '.join(missing_tx_fields)}"
                else:
                    error_msg = None
                    
                log_test_result(endpoint, "Transaction has correct structure", tx_structure_ok, response, error_msg)
            
            # Test with pagination parameters
            response_with_params = requests.get(f"{BACKEND_URL}{endpoint}?limit=2&offset=1")
            params_status_ok = response_with_params.status_code == 200
            
            if params_status_ok:
                data_with_params = response_with_params.json()
                pagination_ok = len(data_with_params["transactions"]) <= 2
                log_test_result(endpoint, "Pagination parameters work correctly", pagination_ok, response_with_params)
            else:
                log_test_result(endpoint, "Pagination parameters work correctly", False, response_with_params)
    
    except Exception as e:
        log_test_result(endpoint, "No exceptions during request", False, error=str(e))

def test_get_merchants():
    """Test GET /api/push-provisioning/merchants endpoint"""
    endpoint = "/push-provisioning/merchants"
    print(f"\n🔍 Testing GET {endpoint}")
    
    try:
        response = requests.get(f"{BACKEND_URL}{endpoint}")
        
        # Test status code
        status_code_ok = response.status_code == 200
        log_test_result(endpoint, "Status code is 200", status_code_ok, response)
        
        if status_code_ok:
            data = response.json()
            
            # Test response structure
            required_fields = ["merchants", "total_count", "response_timestamp"]
            missing_fields = [field for field in required_fields if field not in data]
            structure_ok = len(missing_fields) == 0
            
            if not structure_ok:
                error_msg = f"Missing fields: {', '.join(missing_fields)}"
            else:
                error_msg = None
                
            log_test_result(endpoint, "Response has correct structure", structure_ok, response, error_msg)
            
            # Test merchants array
            if "merchants" in data and len(data["merchants"]) > 0:
                merchant = data["merchants"][0]
                merchant_fields = ["id", "name", "merchant_id", "category", "description"]
                
                missing_merchant_fields = [field for field in merchant_fields if field not in merchant]
                merchant_structure_ok = len(missing_merchant_fields) == 0
                
                if not merchant_structure_ok:
                    error_msg = f"Merchant missing fields: {', '.join(missing_merchant_fields)}"
                else:
                    error_msg = None
                    
                log_test_result(endpoint, "Merchant has correct structure", merchant_structure_ok, response, error_msg)
    
    except Exception as e:
        log_test_result(endpoint, "No exceptions during request", False, error=str(e))

def test_push_provisioning():
    """Test POST /api/push-provisioning endpoint"""
    endpoint = "/push-provisioning"
    print(f"\n🔍 Testing POST {endpoint}")
    
    try:
        # Test with valid payload
        payload = {
            "merchant_app_ids": [1, 2, 3],
            "card_identifier": "default_card"
        }
        
        response = requests.post(
            f"{BACKEND_URL}{endpoint}",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Test status code
        status_code_ok = response.status_code == 200
        log_test_result(endpoint, "Status code is 200 with valid payload", status_code_ok, response)
        
        if status_code_ok:
            data = response.json()
            
            # Test response structure
            required_fields = ["request_id", "status", "timestamp", "push_provisioning_results"]
            missing_fields = [field for field in required_fields if field not in data]
            structure_ok = len(missing_fields) == 0
            
            if not structure_ok:
                error_msg = f"Missing fields: {', '.join(missing_fields)}"
            else:
                error_msg = None
                
            log_test_result(endpoint, "Response has correct structure", structure_ok, response, error_msg)
            
            # Test provisioning results
            if "push_provisioning_results" in data and len(data["push_provisioning_results"]) > 0:
                result = data["push_provisioning_results"][0]
                result_fields = [
                    "merchant_id", "merchant_name", "token_reference_id", 
                    "token_status", "provisioning_result", "token_expiry_date",
                    "created_timestamp", "last_updated_timestamp"
                ]
                
                missing_result_fields = [field for field in result_fields if field not in result]
                result_structure_ok = len(missing_result_fields) == 0
                
                if not result_structure_ok:
                    error_msg = f"Provisioning result missing fields: {', '.join(missing_result_fields)}"
                else:
                    error_msg = None
                    
                log_test_result(endpoint, "Provisioning result has correct structure", result_structure_ok, response, error_msg)
        
        # Test with invalid payload
        invalid_payload = {
            "merchant_app_ids": [999, 998],  # Invalid IDs
            "card_identifier": "default_card"
        }
        
        invalid_response = requests.post(
            f"{BACKEND_URL}{endpoint}",
            json=invalid_payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Should return 400 Bad Request
        invalid_status_ok = invalid_response.status_code == 400
        log_test_result(endpoint, "Returns 400 with invalid merchant IDs", invalid_status_ok, invalid_response)
    
    except Exception as e:
        log_test_result(endpoint, "No exceptions during request", False, error=str(e))

def test_get_tokens():
    """Test GET /api/tokens endpoint"""
    endpoint = "/tokens"
    print(f"\n🔍 Testing GET {endpoint}")
    
    try:
        # Test with default parameters
        response = requests.get(f"{BACKEND_URL}{endpoint}")
        
        # Test status code
        status_code_ok = response.status_code == 200
        log_test_result(endpoint, "Status code is 200", status_code_ok, response)
        
        if status_code_ok:
            data = response.json()
            
            # Test response structure
            required_fields = ["tokens", "total_count", "response_timestamp"]
            missing_fields = [field for field in required_fields if field not in data]
            structure_ok = len(missing_fields) == 0
            
            if not structure_ok:
                error_msg = f"Missing fields: {', '.join(missing_fields)}"
            else:
                error_msg = None
                
            log_test_result(endpoint, "Response has correct structure", structure_ok, response, error_msg)
            
            # Test tokens array
            if "tokens" in data and len(data["tokens"]) > 0:
                token = data["tokens"][0]
                token_fields = [
                    "token_reference_id", "merchant_id", "merchant_name", 
                    "token_status", "created_timestamp"
                ]
                
                missing_token_fields = [field for field in token_fields if field not in token]
                token_structure_ok = len(missing_token_fields) == 0
                
                if not token_structure_ok:
                    error_msg = f"Token missing fields: {', '.join(missing_token_fields)}"
                else:
                    error_msg = None
                    
                log_test_result(endpoint, "Token has correct structure", token_structure_ok, response, error_msg)
            
            # Test with card_identifier parameter
            response_with_params = requests.get(f"{BACKEND_URL}{endpoint}?card_identifier=test_card")
            params_status_ok = response_with_params.status_code == 200
            log_test_result(endpoint, "Card identifier parameter works", params_status_ok, response_with_params)
    
    except Exception as e:
        log_test_result(endpoint, "No exceptions during request", False, error=str(e))

def test_update_token_status():
    """Test PUT /api/tokens/{token_id} endpoint"""
    # First, get a token ID from the list
    print(f"\n🔍 Testing PUT /tokens/{{token_id}}")
    
    try:
        # Get list of tokens
        list_response = requests.get(f"{BACKEND_URL}/tokens")
        
        if list_response.status_code == 200:
            tokens = list_response.json().get("tokens", [])
            
            if tokens:
                token_id = tokens[0]["token_reference_id"]
                endpoint = f"/tokens/{token_id}"
                
                # Test updating token status to INACTIVE
                payload = {
                    "token_status": "INACTIVE"
                }
                
                response = requests.put(
                    f"{BACKEND_URL}{endpoint}",
                    json=payload,
                    headers={"Content-Type": "application/json"}
                )
                
                # Test status code
                status_code_ok = response.status_code == 200
                log_test_result(endpoint, "Status code is 200", status_code_ok, response)
                
                if status_code_ok:
                    data = response.json()
                    
                    # Test response structure
                    required_fields = [
                        "token_reference_id", "token_status", 
                        "last_updated_timestamp", "update_result"
                    ]
                    
                    missing_fields = [field for field in required_fields if field not in data]
                    structure_ok = len(missing_fields) == 0
                    
                    if not structure_ok:
                        error_msg = f"Missing fields: {', '.join(missing_fields)}"
                    else:
                        error_msg = None
                        
                    log_test_result(endpoint, "Response has correct structure", structure_ok, response, error_msg)
                    
                    # Test if status was updated correctly
                    status_updated = data["token_status"] == "INACTIVE"
                    log_test_result(endpoint, "Token status updated to INACTIVE", status_updated, response)
                    
                    # Test updating back to ACTIVE
                    active_payload = {
                        "token_status": "ACTIVE"
                    }
                    
                    active_response = requests.put(
                        f"{BACKEND_URL}{endpoint}",
                        json=active_payload,
                        headers={"Content-Type": "application/json"}
                    )
                    
                    if active_response.status_code == 200:
                        active_data = active_response.json()
                        active_status_updated = active_data["token_status"] == "ACTIVE"
                        log_test_result(endpoint, "Token status updated back to ACTIVE", active_status_updated, active_response)
            else:
                log_test_result("/tokens/{token_id}", "Get token for testing", False, error="No tokens available to test with")
        else:
            log_test_result("/tokens/{token_id}", "Get token for testing", False, error="Failed to get token list")
    
    except Exception as e:
        log_test_result("/tokens/{token_id}", "No exceptions during request", False, error=str(e))

def print_summary():
    """Print test summary"""
    print("\n" + "="*80)
    print(f"TEST SUMMARY: {test_results['passed']}/{test_results['total']} tests passed")
    print(f"PASS RATE: {(test_results['passed']/test_results['total'])*100:.2f}%")
    print("="*80)
    
    if test_results["failed"] > 0:
        print("\nFAILED TESTS:")
        for result in test_results["details"]:
            if not result["passed"]:
                print(f"- {result['endpoint']} - {result['test_name']}")
                if "error" in result:
                    print(f"  Error: {result['error']}")
                print()

def main():
    """Run all tests"""
    print("="*80)
    print("CREDIT CARD TOKEN MANAGEMENT API TEST")
    print(f"Testing against: {BACKEND_URL}")
    print("="*80)
    
    # Run all tests
    test_get_card_details()
    test_get_transactions()
    test_get_merchants()
    test_push_provisioning()
    test_get_tokens()
    test_update_token_status()
    
    # Print summary
    print_summary()
    
    # Return exit code based on test results
    return 0 if test_results["failed"] == 0 else 1

if __name__ == "__main__":
    sys.exit(main())