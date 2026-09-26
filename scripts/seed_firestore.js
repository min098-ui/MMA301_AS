const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCetKKlEgHLp8Wlmaq60YgsRxwJVKJjoBU",
  authDomain: "mma30-dc71a.firebaseapp.com",
  projectId: "mma30-dc71a",
  storageBucket: "mma30-dc71a.firebasestorage.app",
  messagingSenderId: "465012638838",
  appId: "1:465012638838:web:61032d4cbfa2d3825c0b57",
  measurementId: "G-BSC7DNWSHH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleTasks = [
  {
    title: 'Initialize React Native Expo Project',
    description: 'Scaffold project with TypeScript, ESLint, Prettier, and clean architecture folder structure.',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-01',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    teamId: null,
    assigneeId: null,
  },
  {
    title: 'Connect Cloud Firestore Database',
    description: 'Set up Firebase connection, define data model, and implement taskService CRUD operations.',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-03',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    teamId: null,
    assigneeId: null,
  },
  {
    title: 'Build Public Task CRUD Screen',
    description: 'Create responsive Home screen with real-time onSnapshot sync, task modal, edit, and delete.',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-10-05',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    teamId: null,
    assigneeId: null,
  },
  {
    title: 'Team Workspaces & Member Assignment',
    description: 'Prepare teamId and assigneeId fields for Practical Exam 2 collaboration features.',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '2026-10-10',
    createdAt: new Date().toISOString(),
    teamId: null,
    assigneeId: null,
  },
];

async function seed() {
  console.log('Testing connection to Cloud Firestore: mma30-dc71a...');
  const tasksRef = collection(db, 'tasks');
  const existing = await getDocs(tasksRef);
  console.log(`Current documents count in 'tasks': ${existing.size}`);

  if (existing.size === 0) {
    console.log('Seeding initial sample tasks into Firestore...');
    for (const task of sampleTasks) {
      const docRef = await addDoc(tasksRef, task);
      console.log(`+ Created task document [ID: ${docRef.id}]: "${task.title}"`);
    }
    console.log('Successfully seeded sample tasks into Firestore!');
  } else {
    console.log('Firestore already contains tasks:');
    existing.forEach((doc) => {
      console.log(`- [${doc.id}]: ${doc.data().title} (${doc.data().status})`);
    });
  }
}

seed().catch((err) => {
  console.error('Firestore connection notice:', err.message);
  process.exit(1);
});
