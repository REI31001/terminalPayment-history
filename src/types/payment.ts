export interface PaymentTransaction {
  id: string;
  date: string;
  paymentType: 'terminal' | 'mobile';
  transactionType: 'payment' | 'refund';
  status: 'confirmed' | 'authorized';
  scheduledDate: string;
  salesAmount: number;
  paymentAmount: number;
  fee: number;
  paymentMethod: string;
}

export interface PaymentData {
  nextPaymentAmount: number;
  nextPaymentDate: string;
  paymentCycle: {
    start: string;
    end: string;
    type: string;
  };
  bankInfo: {
    bankName: string;
    branchName: string;
    accountName: string;
    accountNumber: string;
  };
  transactions: PaymentTransaction[];
} 