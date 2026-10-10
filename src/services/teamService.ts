import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { Team, TeamMember, TeamRole } from '../types/team';
import { UserProfile } from '../context/AuthContext';

const TEAMS_COLLECTION = 'teams';
const TEAM_MEMBERS_COLLECTION = 'teamMembers';
const USERS_COLLECTION = 'users';

export const teamService = {
  createTeam: async (name: string, description: string, ownerId: string): Promise<string> => {
    const newTeamRef = doc(collection(db, TEAMS_COLLECTION));
    const teamData: Team = {
      id: newTeamRef.id,
      name,
      description,
      ownerId,
      createdAt: Date.now(),
    };
    await setDoc(newTeamRef, teamData);

    // Add owner as a team member
    const memberRef = doc(collection(db, TEAM_MEMBERS_COLLECTION), `${newTeamRef.id}_${ownerId}`);
    const memberData: TeamMember = {
      teamId: newTeamRef.id,
      userId: ownerId,
      role: 'owner',
      joinedAt: Date.now(),
    };
    await setDoc(memberRef, memberData);

    return newTeamRef.id;
  },

  joinTeam: async (teamId: string, userId: string): Promise<void> => {
    // Check if team exists
    const teamDoc = await getDoc(doc(db, TEAMS_COLLECTION, teamId));
    if (!teamDoc.exists()) {
      throw new Error('Team not found');
    }

    const memberRef = doc(collection(db, TEAM_MEMBERS_COLLECTION), `${teamId}_${userId}`);
    const memberDoc = await getDoc(memberRef);
    if (memberDoc.exists()) {
      throw new Error('You are already a member of this team');
    }

    const memberData: TeamMember = {
      teamId,
      userId,
      role: 'member',
      joinedAt: Date.now(),
    };
    await setDoc(memberRef, memberData);
  },

  getUserTeams: (userId: string, onUpdate: (teams: Team[]) => void): (() => void) => {
    const q = query(
      collection(db, TEAM_MEMBERS_COLLECTION),
      where('userId', '==', userId)
    );

    return onSnapshot(q, async (snapshot) => {
      const teamIds = snapshot.docs.map((doc) => doc.data().teamId);
      
      if (teamIds.length === 0) {
        onUpdate([]);
        return;
      }

      // Fetch actual team documents
      const teamsRef = collection(db, TEAMS_COLLECTION);
      const qTeams = query(teamsRef, where('id', 'in', teamIds));
      
      // We can also just listen to the teams collection if we want real-time updates on team details
      const unsubscribeTeams = onSnapshot(qTeams, (teamsSnapshot) => {
        const teams = teamsSnapshot.docs.map(d => d.data() as Team);
        onUpdate(teams);
      });
      
      // Need a way to handle this unsubscribe inside an unsubscribe...
      // For simplicity, we just fetch them once per membership update, or listen separately.
      // Let's use getDocs for team details to avoid complex nested listeners, 
      // or we just return an empty array if empty, and otherwise fetch.
      // A better way is to just get them here:
      const tSnapshot = await getDocs(qTeams);
      onUpdate(tSnapshot.docs.map(d => d.data() as Team));
    });
  },

  getTeamMembers: (teamId: string, onUpdate: (members: (TeamMember & { user?: UserProfile })[]) => void): (() => void) => {
    const q = query(
      collection(db, TEAM_MEMBERS_COLLECTION),
      where('teamId', '==', teamId)
    );

    return onSnapshot(q, async (snapshot) => {
      const members = snapshot.docs.map(doc => doc.data() as TeamMember);
      
      if (members.length === 0) {
        onUpdate([]);
        return;
      }

      const userIds = members.map(m => m.userId);
      const usersRef = collection(db, USERS_COLLECTION);
      
      // Firestore 'in' query supports max 10 values, batching if needed
      const userIdsBatches = [];
      for (let i = 0; i < userIds.length; i += 10) {
        userIdsBatches.push(userIds.slice(i, i + 10));
      }

      let users: Record<string, UserProfile> = {};
      for (const batch of userIdsBatches) {
        const qUsers = query(usersRef, where('id', 'in', batch));
        const uSnapshot = await getDocs(qUsers);
        uSnapshot.forEach(d => {
          users[d.id] = d.data() as UserProfile;
        });
      }

      const membersWithUsers = members.map(m => ({
        ...m,
        user: users[m.userId]
      }));

      onUpdate(membersWithUsers);
    });
  }
};
