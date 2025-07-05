// Mock data for the CC app
export const MOCK_CARD_DATA = {
  card_number: "4532 1234 5678 9012",
  card_holder_name: "Arvind Sethuraman",
  expiry_date: "12/28",
  cvv: "123",
  card_type: "visa",
  available_limit: 65000,
  total_outstanding: 0,
  next_statement_date: "25 Feb",
  unspent_amount: 0
};

export const MOCK_TRANSACTIONS = [
  {
    transaction_id: 1,
    merchant_name: "Uber",
    amount: 100,
    transaction_date: "2024-01-15",
    transaction_type: "ride",
    status: "completed"
  },
  {
    transaction_id: 2,
    merchant_name: "Amazon",
    amount: 250,
    transaction_date: "2024-01-14",
    transaction_type: "shopping",
    status: "completed"
  },
  {
    transaction_id: 3,
    merchant_name: "Airtel Payment on PayZapp",
    amount: 450,
    transaction_date: "2024-01-13",
    transaction_type: "recharge",
    status: "completed"
  },
  {
    transaction_id: 4,
    merchant_name: "Zepto",
    amount: 300,
    transaction_date: "2024-01-12",
    transaction_type: "grocery",
    status: "completed"
  }
];

export const mockMerchantApps = [
  {
    id: 1,
    name: "Myntra",
    icon: "👗",
    category: "Fashion",
    description: "Fashion & Lifestyle",
    hasToken: false
  },
  {
    id: 2,
    name: "Uber",
    icon: "🚗",
    category: "Transportation",
    description: "Ride & Delivery",
    hasToken: false
  },
  {
    id: 3,
    name: "Zepto",
    icon: "🛒",
    category: "Grocery",
    description: "10-minute grocery delivery",
    hasToken: false
  },
  {
    id: 4,
    name: "Playo",
    icon: "🏸",
    category: "Sports",
    description: "Sports & Fitness",
    hasToken: false
  },
  {
    id: 5,
    name: "Bigbasket",
    icon: "🥬",
    category: "Grocery",
    description: "Online grocery shopping",
    hasToken: false
  },
  {
    id: 6,
    name: "Flipkart",
    icon: "🛍️",
    category: "E-commerce",
    description: "Online shopping",
    hasToken: false
  },
  {
    id: 7,
    name: "Swiggy",
    icon: "🍕",
    category: "Food",
    description: "Food delivery",
    hasToken: false
  }
];

export const mockSecurityInfo = {
  title: "Advanced Security Details",
  description: "Your card details are protected with industry-leading security measures",
  points: [
    "Merchants only receive secure card tokens, never your actual card details",
    "All transactions are encrypted end-to-end",
    "Compliant with RBI guidelines for card tokenization",
    "Visa-certified security protocols",
    "HDFC Bank's advanced fraud detection system"
  ],
  logos: [
    { name: "RBI", src: "/api/placeholder/80/40" },
    { name: "Visa", src: "/api/placeholder/80/40" },
    { name: "HDFC", src: "/api/placeholder/80/40" }
  ]
};