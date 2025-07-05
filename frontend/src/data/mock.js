// Mock data for the CC app
export const mockCardData = {
  cardNumber: "4532 1234 5678 9012",
  cardHolderName: "RAKESH VERMA",
  expiryDate: "12/28",
  cvv: "123",
  cardType: "visa",
  availableLimit: 65000,
  totalOutstanding: 0,
  nextStatementDate: "25 Feb",
  unspentAmount: 0
};

export const mockTransactions = [
  {
    id: 1,
    merchant: "Uber",
    amount: 100,
    date: "2024-01-15",
    type: "ride",
    status: "completed"
  },
  {
    id: 2,
    merchant: "Amazon",
    amount: 250,
    date: "2024-01-14",
    type: "shopping",
    status: "completed"
  },
  {
    id: 3,
    merchant: "Airtel Payment on PayZapp",
    amount: 450,
    date: "2024-01-13",
    type: "recharge",
    status: "completed"
  },
  {
    id: 4,
    merchant: "Zepto",
    amount: 300,
    date: "2024-01-12",
    type: "grocery",
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