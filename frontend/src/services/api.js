// API service for backend integration
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const api = {
  // Card Management APIs
  getCardDetails: async () => {
    const response = await axios.get(`${API}/cards/details`);
    return response.data;
  },

  getTransactionHistory: async (limit = 10, offset = 0) => {
    const response = await axios.get(`${API}/cards/transactions`, {
      params: { limit, offset }
    });
    return response.data;
  },

  // Push Provisioning APIs
  createPushProvisioningRequest: async (merchantAppIds) => {
    const response = await axios.post(`${API}/push-provisioning`, {
      merchant_app_ids: merchantAppIds,
      card_identifier: "default_card"
    });
    return response.data;
  },

  getPushProvisioningStatus: async (requestId) => {
    const response = await axios.get(`${API}/push-provisioning/status/${requestId}`);
    return response.data;
  },

  getAvailableMerchants: async () => {
    const response = await axios.get(`${API}/push-provisioning/merchants`);
    return response.data;
  },

  // Token Management APIs
  listUserTokens: async (cardIdentifier = "default_card") => {
    const response = await axios.get(`${API}/tokens`, {
      params: { card_identifier: cardIdentifier }
    });
    return response.data;
  },

  getTokenDetails: async (tokenReferenceId) => {
    const response = await axios.get(`${API}/tokens/${tokenReferenceId}`);
    return response.data;
  },

  updateTokenStatus: async (tokenReferenceId, tokenStatus) => {
    const response = await axios.put(`${API}/tokens/${tokenReferenceId}`, {
      token_status: tokenStatus
    });
    return response.data;
  },

  deleteToken: async (tokenReferenceId) => {
    const response = await axios.delete(`${API}/tokens/${tokenReferenceId}`);
    return response.data;
  }
};

export default api;