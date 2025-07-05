// Mock API service for development when backend is not available
import { MOCK_CARD_DATA, MOCK_TRANSACTIONS } from '../data/mock';

export const mockApi = {
  // Card Management APIs
  getCardDetails: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_CARD_DATA;
  },

  getTransactionHistory: async (limit = 10, offset = 0) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      transactions: MOCK_TRANSACTIONS.slice(offset, offset + limit),
      total: MOCK_TRANSACTIONS.length,
      limit,
      offset
    };
  },

  // Push Provisioning APIs
  createPushProvisioningRequest: async (merchantAppIds) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      request_id: "mock_request_123",
      status: "pending",
      merchant_app_ids: merchantAppIds,
      card_identifier: "default_card"
    };
  },

  getPushProvisioningStatus: async (requestId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      request_id: requestId,
      status: "completed",
      results: [
        {
          merchant_app_id: "merchant1",
          status: "success",
          token_reference_id: "token_123"
        }
      ]
    };
  },

  getAvailableMerchants: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      merchants: [
        {
          id: "merchant1",
          name: "Starbucks",
          icon: "☕",
          description: "Coffee and beverages"
        },
        {
          id: "merchant2", 
          name: "Uber",
          icon: "🚗",
          description: "Transportation services"
        },
        {
          id: "merchant3",
          name: "Amazon",
          icon: "📦", 
          description: "Online shopping"
        }
      ]
    };
  },

  // Token Management APIs
  listUserTokens: async (cardIdentifier = "default_card") => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      tokens: [
        {
          token_reference_id: "token_123",
          merchant_app_id: "merchant1",
          merchant_name: "Starbucks",
          token_status: "active",
          created_date: "2024-01-15",
          last_used: "2024-01-20"
        },
        {
          token_reference_id: "token_456",
          merchant_app_id: "merchant2", 
          merchant_name: "Uber",
          token_status: "suspended",
          created_date: "2024-01-10",
          last_used: "2024-01-18"
        }
      ]
    };
  },

  getTokenDetails: async (tokenReferenceId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      token_reference_id: tokenReferenceId,
      merchant_app_id: "merchant1",
      merchant_name: "Starbucks",
      token_status: "active",
      created_date: "2024-01-15",
      last_used: "2024-01-20",
      usage_count: 5
    };
  },

  updateTokenStatus: async (tokenReferenceId, tokenStatus) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      token_reference_id: tokenReferenceId,
      status: "updated",
      new_token_status: tokenStatus
    };
  },

  deleteToken: async (tokenReferenceId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      token_reference_id: tokenReferenceId,
      status: "deleted"
    };
  }
};

export default mockApi; 