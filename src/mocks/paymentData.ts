import { PaymentData } from '../types/payment';

export const mockPaymentData: PaymentData = {
  nextPaymentAmount: 124572,
  nextPaymentDate: '2025-04-25',
  paymentCycle: {
    start: '2025-04-11',
    end: '2025-04-24',
    type: '月2回振込'
  },
  bankInfo: {
    bankName: 'PayPay銀行',
    branchName: 'ビジネス営業部',
    accountName: 'カ）ダイニー',
    accountNumber: '1234567'
  },
  transactions: [
    {
      id: 'X3PHBGM46MJFMZ65',
      date: '2024-11-05 16:52',
      paymentType: 'terminal',
      transactionType: 'payment',
      status: 'confirmed',
      scheduledDate: '2025-04-25',
      salesAmount: 560,
      paymentAmount: 549,
      fee: 11,
      paymentMethod: 'VISA_CARD'
    },
    {
      id: 'QWFMKWQOMA39XFV5',
      date: '2024-11-05 16:57',
      paymentType: 'mobile',
      transactionType: 'payment',
      status: 'confirmed',
      scheduledDate: '2025-04-25',
      salesAmount: 10350,
      paymentAmount: 10143,
      fee: 207,
      paymentMethod: 'VISA_CARD'
    },
    {
      id: 'ZSVW996T99NKGK82',
      date: '2024-11-05 17:01',
      paymentType: 'terminal',
      transactionType: 'payment',
      status: 'confirmed',
      scheduledDate: '2025-04-25',
      salesAmount: 115000,
      paymentAmount: 112700,
      fee: 2300,
      paymentMethod: 'VISA_CARD'
    },
    {
      id: 'D6LX3LRLQTGLNK82',
      date: '2024-11-05 17:03',
      paymentType: 'terminal',
      transactionType: 'payment',
      status: 'authorized',
      scheduledDate: '2025-04-25',
      salesAmount: 6000,
      paymentAmount: 5880,
      fee: 120,
      paymentMethod: 'VISA_CARD'
    },
    {
      id: 'QWFMKWQOMA39XFV5',
      date: '2024-11-05 17:10',
      paymentType: 'mobile',
      transactionType: 'refund',
      status: 'confirmed',
      scheduledDate: '2025-04-25',
      salesAmount: 810,
      paymentAmount: 794,
      fee: 16,
      paymentMethod: 'VISA_CARD',
      originalTransactionId: 'QWFMKWQOMA39XFV5'
    },
    {
      id: 'M7K8N9O0P1Q2R3S4',
      date: '2024-11-05 17:15',
      paymentType: 'terminal',
      transactionType: 'payment',
      status: 'confirmed',
      scheduledDate: '2025-04-25',
      salesAmount: 2500,
      paymentAmount: 2450,
      fee: 50,
      paymentMethod: 'MASTER_CARD'
    },
    {
      id: 'M7K8N9O0P1Q2R3S4',
      date: '2024-11-05 17:20',
      paymentType: 'mobile',
      transactionType: 'refund',
      status: 'confirmed',
      scheduledDate: '2025-04-25',
      salesAmount: 1500,
      paymentAmount: 1470,
      fee: 30,
      paymentMethod: 'JCB',
      originalTransactionId: 'M7K8N9O0P1Q2R3S4'
    },
    {
      id: 'B3C4D5E6F7G8H9I0',
      date: '2024-11-05 17:25',
      paymentType: 'terminal',
      transactionType: 'payment',
      status: 'authorized',
      scheduledDate: '2025-04-25',
      salesAmount: 8000,
      paymentAmount: 7840,
      fee: 160,
      paymentMethod: 'AMEX'
    },
    {
      id: 'J1K2L3M4N5O6P7Q8',
      date: '2024-11-05 17:30',
      paymentType: 'mobile',
      transactionType: 'payment',
      status: 'confirmed',
      scheduledDate: '2025-04-25',
      salesAmount: 3500,
      paymentAmount: 3430,
      fee: 70,
      paymentMethod: 'VISA_CARD'
    },
    {
      id: 'J1K2L3M4N5O6P7Q8',
      date: '2024-11-05 17:35',
      paymentType: 'terminal',
      transactionType: 'refund',
      status: 'confirmed',
      scheduledDate: '2025-04-25',
      salesAmount: 2000,
      paymentAmount: 1960,
      fee: 40,
      paymentMethod: 'MASTER_CARD',
      originalTransactionId: 'J1K2L3M4N5O6P7Q8'
    }
  ]
}; 