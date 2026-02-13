import {Deal} from '@app-types';

export const mockDeals: Deal[] = [
  {
    id: 'deal-001',
    name: 'Greenline Properties',
    shortDescription:
      'Apartment buildings in Austin and Denver. Renovated units, strong rental demand.',
    amount: 2_500_000_00,
    targetReturn: '14-18% expected return',
    status: 'open',
    dealType: 'real_estate',
    minimumCommitment: 100_00,
    closingDate: '2026-04-15',
  },
  {
    id: 'deal-002',
    name: 'Bolt Robotics',
    shortDescription:
      'Series A startup building warehouse robots. Revenue tripled last year.',
    amount: 5_000_000_00,
    targetReturn: '3-5x potential',
    status: 'open',
    dealType: 'venture',
    minimumCommitment: 50_00,
    closingDate: '2026-06-30',
  },
  {
    id: 'deal-003',
    name: 'Steady Yield Fund',
    shortDescription:
      'Loans to small businesses. Pays out quarterly, low risk.',
    amount: 10_000_000_00,
    targetReturn: '8-10% yearly',
    status: 'closing',
    dealType: 'debt',
    minimumCommitment: 100_00,
    closingDate: '2026-03-01',
  },
  {
    id: 'deal-004',
    name: 'NovaPay',
    shortDescription:
      'Fintech app doing $80M in revenue. On track for IPO in 2027.',
    amount: 15_000_000_00,
    targetReturn: '20-25% expected return',
    status: 'open',
    dealType: 'equity',
    minimumCommitment: 250_00,
    closingDate: '2026-09-15',
  },
  {
    id: 'deal-005',
    name: 'Pacific Storage Co.',
    shortDescription:
      'Self-storage facilities across California and Oregon. 95% occupancy rate.',
    amount: 8_000_000_00,
    targetReturn: '12-16% expected return',
    status: 'open',
    dealType: 'real_estate',
    minimumCommitment: 200_00,
    closingDate: '2026-07-01',
  },
];
