import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const teamsToCreate = [
  { name: 'Design Team', description: 'UI/UX Design and Prototyping' },
  { name: 'Development Team', description: 'Frontend and Backend Engineering' },
  { name: 'Marketing Team', description: 'SEO, Ads, and Social Media' },
  { name: 'QA Team', description: 'Quality Assurance and Testing' }
];

async function run() {
  try {
    // Try to login with a temp user or create one
    const email = 'seeduser@example.com';
    const password = 'password123';
    let user;
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      user = cred.user;
    } catch (e) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      user = cred.user;
    }

    console.log('Logged in as:', user.uid);

    for (const t of teamsToCreate) {
      const teamId = 'team-' + Date.now() + Math.floor(Math.random() * 1000);
      await setDoc(doc(db, 'teams', teamId), {
        id: teamId,
        name: t.name,
        description: t.description,
        ownerId: user.uid,
        createdAt: Date.now()
      });
      
      const memberId = teamId + '_' + user.uid;
      await setDoc(doc(db, 'teamMembers', memberId), {
        id: memberId,
        teamId: teamId,
        userId: user.uid,
        role: 'owner',
        joinedAt: Date.now()
      });
      console.log('Created team:', t.name);
    }
    console.log('Successfully created 4 teams!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();
