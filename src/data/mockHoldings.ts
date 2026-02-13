import {Holding} from '@app-types';

export const mockHoldings: Holding[] = [
  {
    id: 'hold-001',
    dealId: 'deal-prev-001',
    dealName: 'SUMMIT REAL ASSETS III',
    committedAmount: 500_000_00,
    currentValue: 612_500_00,
    gainLoss: 112_500_00,
    gainLossPercent: 22.5,
    status: 'active',
  },
  {
    id: 'hold-002',
    dealId: 'deal-prev-002',
    dealName: 'VANGUARD CREDIT FUND',
    committedAmount: 250_000_00,
    currentValue: 271_250_00,
    gainLoss: 21_250_00,
    gainLossPercent: 8.5,
    status: 'active',
  },
  {
    id: 'hold-003',
    dealId: 'deal-prev-003',
    dealName: 'ATLAS VENTURE PARTNERS I',
    committedAmount: 1_000_000_00,
    currentValue: 870_000_00,
    gainLoss: -130_000_00,
    gainLossPercent: -13.0,
    status: 'active',
  },
  {
    id: 'hold-004',
    dealId: 'deal-prev-004',
    dealName: 'CORNERSTONE INFRA II',
    committedAmount: 750_000_00,
    currentValue: 967_500_00,
    gainLoss: 217_500_00,
    gainLossPercent: 29.0,
    status: 'active',
  },
];

export const mockPerformanceData = [
  {month: 'Mar', value: 2_350_000},
  {month: 'Apr', value: 2_380_000},
  {month: 'May', value: 2_420_000},
  {month: 'Jun', value: 2_390_000},
  {month: 'Jul', value: 2_450_000},
  {month: 'Aug', value: 2_510_000},
  {month: 'Sep', value: 2_480_000},
  {month: 'Oct', value: 2_550_000},
  {month: 'Nov', value: 2_600_000},
  {month: 'Dec', value: 2_580_000},
  {month: 'Jan', value: 2_650_000},
  {month: 'Feb', value: 2_721_250},
];
