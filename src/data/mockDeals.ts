import {Deal} from '@app-types';

export const mockDeals: Deal[] = [
  {
    id: 'deal-001',
    name: 'MERIDIAN TOWER FUND IV',
    shortDescription:
      'Class A office portfolio across Tier 1 metros. Stabilized assets with value-add upside.',
    amount: 75_000_000_00,
    targetReturn: '16-20% NET IRR',
    status: 'open',
    dealType: 'real_estate',
    minimumCommitment: 250_000_00,
    closingDate: '2026-04-15',
  },
  {
    id: 'deal-002',
    name: 'OBSIDIAN VENTURES II',
    shortDescription:
      'Early-stage technology fund. AI infrastructure and developer tooling thesis.',
    amount: 120_000_000_00,
    targetReturn: '3-5x MOIC',
    status: 'open',
    dealType: 'venture',
    minimumCommitment: 500_000_00,
    closingDate: '2026-06-30',
  },
  {
    id: 'deal-003',
    name: 'BLACKSTONE CREDIT OPPS',
    shortDescription:
      'Senior secured lending to mid-market borrowers. Floating rate, quarterly distributions.',
    amount: 200_000_000_00,
    targetReturn: '10-12% YIELD',
    status: 'closing',
    dealType: 'debt',
    minimumCommitment: 100_000_00,
    closingDate: '2026-03-01',
  },
  {
    id: 'deal-004',
    name: 'APEX GROWTH EQUITY VII',
    shortDescription:
      'Growth equity in enterprise SaaS. $50-200M revenue companies with clear path to IPO.',
    amount: 500_000_000_00,
    targetReturn: '20-25% NET IRR',
    status: 'open',
    dealType: 'equity',
    minimumCommitment: 1_000_000_00,
    closingDate: '2026-09-15',
  },
  {
    id: 'deal-005',
    name: 'PACIFIC RIM LOGISTICS',
    shortDescription:
      'Industrial logistics REIT focusing on last-mile distribution centers in APAC gateway cities.',
    amount: 300_000_000_00,
    targetReturn: '14-18% NET IRR',
    status: 'open',
    dealType: 'real_estate',
    minimumCommitment: 500_000_00,
    closingDate: '2026-07-01',
  },
];
