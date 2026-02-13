export type HoldingStatus = 'active' | 'pending' | 'exited';

export interface Holding {
  id: string;
  dealId: string;
  dealName: string;
  committedAmount: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
  status: HoldingStatus;
}
