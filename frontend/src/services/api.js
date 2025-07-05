// API service for backend integration
import axios from 'axios';
import mockApi from './mockApi';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const API = `${BACKEND_URL}/api`;

// Helper function to check if backend is available
const isBackendAvailable = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/`, { timeout: 2000 });
    return true;
  } catch (error) {
    console.warn('Backend not available, using mock API');
    return false;
  }
};

export const api = {
  // Card Management APIs
  getCardDetails: async () => {
    if (await isBackendAvailable()) {
      const response = await axios.get(`${API}/cards/details`);
      return response.data;
    }
    return mockApi.getCardDetails();
  },

  getTransactionHistory: async (limit = 10, offset = 0) => {
    if (await isBackendAvailable()) {
      const response = await axios.get(`${API}/cards/transactions`, {
        params: { limit, offset }
      });
      return response.data;
    }
    return mockApi.getTransactionHistory(limit, offset);
  },

  // Push Provisioning APIs
  createPushProvisioningRequest: async (merchantAppIds) => {
    if (await isBackendAvailable()) {
      const response = await axios.post(`${API}/push-provisioning`, {
        merchant_app_ids: merchantAppIds,
        card_identifier: "default_card"
      });
      return response.data;
    }
    return mockApi.createPushProvisioningRequest(merchantAppIds);
  },

  getPushProvisioningStatus: async (requestId) => {
    if (await isBackendAvailable()) {
      const response = await axios.get(`${API}/push-provisioning/status/${requestId}`);
      return response.data;
    }
    return mockApi.getPushProvisioningStatus(requestId);
  },

  getAvailableMerchants: async () => {
    if (await isBackendAvailable()) {
      const response = await axios.get(`${API}/push-provisioning/merchants`);
      return response.data;
    }
    return mockApi.getAvailableMerchants();
  },

  // Token Management APIs
  listUserTokens: async (cardIdentifier = "default_card") => {
    if (await isBackendAvailable()) {
      const response = await axios.get(`${API}/tokens`, {
        params: { card_identifier: cardIdentifier }
      });
      return response.data;
    }
    return mockApi.listUserTokens(cardIdentifier);
  },

  getTokenDetails: async (tokenReferenceId) => {
    if (await isBackendAvailable()) {
      const response = await axios.get(`${API}/tokens/${tokenReferenceId}`);
      return response.data;
    }
    return mockApi.getTokenDetails(tokenReferenceId);
  },

  updateTokenStatus: async (tokenReferenceId, tokenStatus) => {
    if (await isBackendAvailable()) {
      const response = await axios.put(`${API}/tokens/${tokenReferenceId}`, {
        token_status: tokenStatus
      });
      return response.data;
    }
    return mockApi.updateTokenStatus(tokenReferenceId, tokenStatus);
  },

  deleteToken: async (tokenReferenceId) => {
    if (await isBackendAvailable()) {
      const response = await axios.delete(`${API}/tokens/${tokenReferenceId}`);
      return response.data;
    }
    return mockApi.deleteToken(tokenReferenceId);
  }
};

export default api;