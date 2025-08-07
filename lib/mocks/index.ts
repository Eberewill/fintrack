import { DashboardSummary, Transaction, User } from "@/types/components.types";

export const walletLedgerUsers: User[] = [
  {
  id: '1',
  name: 'Ava Johnson',
  email: 'ava.johnson@fintrack.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
  initials: 'AJ',
  role: 'Financial Analyst',
  department: 'Finance'
},
  {
    id: '2',
    name: 'Liam Smith',
    email: 'liam.smith@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    initials: 'LS',
    role: 'Senior Accountant',
    department: 'Finance'
  },
  {
    id: '3',
    name: 'Noah Davis',
    email: 'noah.davis@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    initials: 'ND',
    role: 'Investment Manager',
    department: 'Investment'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.wilson@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    initials: 'EW',
    role: 'Risk Analyst',
    department: 'Risk Management'
  },
  {
    id: '5',
    name: 'Oliver Brown',
    email: 'oliver.brown@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    initials: 'OB',
    role: 'Portfolio Manager',
    department: 'Investment'
  },
  {
    id: '6',
    name: 'Sophia Miller',
    email: 'sophia.miller@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    initials: 'SM',
    role: 'Financial Controller',
    department: 'Finance'
  },
  {
    id: '7',
    name: 'Jackson Taylor',
    email: 'jackson.taylor@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    initials: 'JT',
    role: 'Compliance Officer',
    department: 'Compliance'
  },
  {
    id: '8',
    name: 'Isabella Garcia',
    email: 'isabella.garcia@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    initials: 'IG',
    role: 'Treasury Analyst',
    department: 'Treasury'
  },
  {
    id: '9',
    name: 'Mason Rodriguez',
    email: 'mason.rodriguez@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
    initials: 'MR',
    role: 'Credit Analyst',
    department: 'Credit'
  },
  {
    id: '10',
    name: 'Mia Martinez',
    email: 'mia.martinez@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=150&h=150&fit=crop&crop=face',
    initials: 'MM',
    role: 'Operations Manager',
    department: 'Operations'
  },
  {
    id: '11',
    name: 'Ethan Anderson',
    email: 'ethan.anderson@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    initials: 'EA',
    role: 'Quantitative Analyst',
    department: 'Research'
  },
  {
    id: '12',
    name: 'Charlotte Thomas',
    email: 'charlotte.thomas@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=150&h=150&fit=crop&crop=face',
    initials: 'CT',
    role: 'Financial Planner',
    department: 'Planning'
  },
  {
    id: '13',
    name: 'Alexander Jackson',
    email: 'alexander.jackson@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    initials: 'AJ',
    role: 'Investment Advisor',
    department: 'Advisory'
  },
  {
    id: '14',
    name: 'Amelia White',
    email: 'amelia.white@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
    initials: 'AW',
    role: 'Budget Analyst',
    department: 'Budgeting'
  },
  {
    id: '15',
    name: 'Benjamin Harris',
    email: 'benjamin.harris@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    initials: 'BH',
    role: 'Audit Manager',
    department: 'Audit'
  },
  {
    id: '16',
    name: 'Harper Clark',
    email: 'harper.clark@fintrack.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    initials: 'HC',
    role: 'Tax Specialist',
    department: 'Tax'
  }
];

export const sampleDashboardSummary: DashboardSummary = {
  totalBalance: 12345,
  totalCredits: 7890,
  totalDebits: 4455,
  transactionCount: 150,
  balanceChange: 5,
  creditsChange: 3,
  debitsChange: -2,
  transactionChange: 10,
};

export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    date: '2023-10-01',
    remark: 'Salary',
    amount: 3000,
    currency: 'USD',
    type: 'Credit'
  },
  {
    id: '2',
    date: '2023-10-02',
    remark: 'Groceries',
    amount: -150,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '3',
    date: '2023-10-03',
    remark: 'Gym Membership',
    amount: -50,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '4',
    date: '2023-10-04',
    remark: 'Dinner',
    amount: -40,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '5',
    date: '2023-10-05',
    remark: 'Movie Tickets',
    amount: -30,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '6',
    date: '2023-10-06',
    remark: 'Rent',
    amount: -1200,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '7',
    date: '2023-10-07',
    remark: 'Utilities',
    amount: -100,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '8',
    date: '2023-10-08',
    remark: 'Car Payment',
    amount: -400,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '9',
    date: '2023-10-09',
    remark: 'Insurance',
    amount: -200,
    currency: 'USD',
    type: 'Debit'
  },
];
