import {Holding} from '@app-types';

export const mockHoldings: Holding[] = [
  {
    id: 'hold-001',
    dealId: 'deal-prev-001',
    dealName: 'Sunrise Apartments',
    committedAmount: 200_00,
    currentValue: 245_00,
    gainLoss: 45_00,
    gainLossPercent: 22.5,
    status: 'active',
  },
  {
    id: 'hold-002',
    dealId: 'deal-prev-002',
    dealName: 'ClearLend Fund',
    committedAmount: 150_00,
    currentValue: 162_75,
    gainLoss: 12_75,
    gainLossPercent: 8.5,
    status: 'active',
  },
  {
    id: 'hold-003',
    dealId: 'deal-prev-003',
    dealName: 'Hyperloop Labs',
    committedAmount: 500_00,
    currentValue: 435_00,
    gainLoss: -65_00,
    gainLossPercent: -13.0,
    status: 'active',
  },
  {
    id: 'hold-004',
    dealId: 'deal-prev-004',
    dealName: 'GridPower Solar',
    committedAmount: 300_00,
    currentValue: 387_00,
    gainLoss: 87_00,
    gainLossPercent: 29.0,
    status: 'active',
  },
];

export const mockPerformanceData = [
  {month: 'Mar', value: 1_050},
  {month: 'Apr', value: 1_070},
  {month: 'May', value: 1_090},
  {month: 'Jun', value: 1_075},
  {month: 'Jul', value: 1_110},
  {month: 'Aug', value: 1_140},
  {month: 'Sep', value: 1_125},
  {month: 'Oct', value: 1_160},
  {month: 'Nov', value: 1_185},
  {month: 'Dec', value: 1_175},
  {month: 'Jan', value: 1_210},
  {month: 'Feb', value: 1_229},
];
