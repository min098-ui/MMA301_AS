export interface Team {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: number;
}

export type TeamRole = 'owner' | 'member';

export interface TeamMember {
  teamId: string;
  userId: string;
  role: TeamRole;
  joinedAt: number;
}
