export type DealStatus = 'open' | 'closing' | 'closed' | 'funded';
export type DealType = 'equity' | 'debt' | 'fund' | 'real_estate' | 'venture';

export interface Deal {
  id: string;
  name: string;
  shortDescription: string;
  amount: number;
  targetReturn: string;
  status: DealStatus;
  dealType: DealType;
  minimumCommitment: number;
  closingDate: string;
}
