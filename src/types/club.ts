export interface ClubMember {
  id: string;
  name: string;
  initials: string;
}

export interface ClubMessage {
  id: string;
  memberId: string;
  memberName: string;
  text: string;
  timestamp: string;
}

export interface ClubDeal {
  id: string;
  name: string;
  totalPool: number;
  committed: number;
  targetReturn: string;
  memberCount: number;
  status: 'raising' | 'funded' | 'active';
}

export interface Club {
  id: string;
  name: string;
  description: string;
  members: ClubMember[];
  messages: ClubMessage[];
  deal: ClubDeal;
}
