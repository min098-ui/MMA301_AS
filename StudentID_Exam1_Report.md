# Practical Exam 1 Report: Task Management App
**React Native, Firebase Setup & CRUD (No Authentication)**

- **Student ID:** `[YOUR_STUDENT_ID]` *(e.g. QE123456 - please rename file to `StudentID_Exam1.docx`)*
- **Course:** MMA301 – Mobile Applications Development
- **Tech Stack:** React Native (Expo SDK 57, TypeScript), Google Cloud Firestore, React Navigation
- **Date:** September 2026

---

## 1. Project Links & Verification

- **GitHub Repository (Public):** `https://github.com/<YOUR_GITHUB_USERNAME>/MMA301_AS`
- **Expo Project / QR Code URL:** `https://expo.dev/@<YOUR_USERNAME>/MMA301_AS` *(or Expo Go dev server)*
- **EAS APK Build (Optional):** Available via EAS Build artifacts or shared cloud storage

---

## 2. Git Version Control & Commit Evidence

The repository was built through 9 sequential, atomic commits documenting every step of implementation:

| Commit Hash | Message | Requirement Demonstrated |
| :--- | :--- | :--- |
| `e7d3514` | Initial commit | Scaffolded Expo project with blank-typescript template |
| `30ac839` | chore: configure ESLint, Prettier, .gitignore and environment templates | Code style tooling, rules, and repository hygiene |
| `dba5aed` | chore: add .env.example template with Firebase keys | Safe environment variable template without secret leakage |
| `20020d5` | feat: define Task data model and application theme tokens | TypeScript interfaces and UI design system |
| `6975858` | feat: configure Firebase SDK and implement Firestore CRUD service | Firebase modular SDK integration and Firestore CRUD service |
| `090a109` | feat: create useTasks hook with real-time onSnapshot listener | Real-time state synchronization with offline fallback |
| `5423811` | feat: add UI components for task cards, modals, filter tabs | Reusable UI components: TaskCard, TaskModal, FilterTabs |
| `48d5f11` | feat: implement HomeScreen with CRUD, Teams/Profile, and tabs | Full public CRUD on HomeScreen with bottom tab navigation |
| `4849226` | ci: add GitHub Actions CI workflow and documentation with ERD | Automated lint/typecheck CI pipeline and comprehensive README |

---

## 3. Cloud Firestore Data Model & Schema

### Entity Relationship Diagram (ERD)

```text
+-------------------------------------------------------------+
|                      COLLECTION: tasks                      |
+-------------------+-----------------+----------+------------+
| Field Name        | Data Type       | Required | Note       |
+-------------------+-----------------+----------+------------+
| id                | string (DocID)  | Yes      | Auto-gen   |
| title             | string          | Yes      | Min 3 char |
| description       | string          | No       | Notes      |
| status            | string          | Yes      | Enum       |
| priority          | string          | Yes      | Enum       |
| dueDate           | string          | Yes      | YYYY-MM-DD |
| createdAt         | string (ISO)    | Yes      | Timestamp  |
| teamId            | string | null   | No       | For Exam 2 |
| assigneeId        | string | null   | No       | For Exam 2 |
+-------------------+-----------------+----------+------------+
```

### Firestore Security Rules (Test Mode for Public Access)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 4. Architecture & Implementation Highlights

1. **`src/services/firebase.ts`**: Safely initializes the Firebase app and Firestore instance, preventing duplicate instances across hot reloads.
2. **`src/services/taskService.ts`**: Implements modular Firestore functions:
   - `addDoc(collection(db, 'tasks'), data)`
   - `updateDoc(doc(db, 'tasks', id), updates)`
   - `deleteDoc(doc(db, 'tasks', id))`
   - `onSnapshot(query(collection(db, 'tasks'), orderBy('createdAt', 'desc')), ...)`
3. **`src/hooks/useTasks.ts`**: Provides real-time subscription, optimistic updates, search filtering, and status filtering.
4. **`src/screens/HomeScreen.tsx`**: Features responsive layout (phone & tablet), statistics summary banner, search bar, filter tabs, task cards, and modal triggers.
5. **Bonus Features**:
   - **Client-Side Validation**: Required title field, trimmed input, minimum 3 characters with error feedback.
   - **Status Filtering**: `All`, `To Do`, `In Progress`, `Completed` tabs with live count badges.
   - **Pull-To-Refresh**: Native `RefreshControl` integration.
   - **CI Pipeline**: `.github/workflows/ci.yml` validates code on every push.

---

## 5. Visual Screenshot Evidence & Captions

### Screenshot 1: Firebase Console — Firestore Tasks Collection
- **Caption:** *Figure 1: Cloud Firestore Console showing the `tasks` collection with auto-generated document IDs and schema fields (`title`, `description`, `status`, `priority`, `dueDate`, `createdAt`, `teamId`, `assigneeId`). Demonstrates Requirement 3.*

### Screenshot 2: Home Screen (Task List & Header)
- **Caption:** *Figure 2: Home screen introducing TaskMaster Hub with app description, summary statistics, search bar, status filter tabs, and the active task list. Demonstrates Requirement 4 & 5.*

### Screenshot 3: Create Task Form (Pre-Submission)
- **Caption:** *Figure 3: Task creation modal dialog filled in with title, description, status ("In Progress"), priority ("High"), and due date before submitting. Demonstrates Requirement 5 & Form Validation.*

### Screenshot 4: Task List After Creation
- **Caption:** *Figure 4: Task list showing the newly created task immediately displayed at the top of the feed via Firestore `onSnapshot` real-time listener. Demonstrates Requirement 5.*

### Screenshot 5: Edit Task Modal
- **Caption:** *Figure 5: Edit Task modal displaying pre-populated fields and updating the status to "Completed". Demonstrates Requirement 5.*

### Screenshot 6: Task List After Edit
- **Caption:** *Figure 6: Task list showing the task's status badge updated to "Completed" with emerald styling. Demonstrates Requirement 5.*

### Screenshot 7: Task List After Deletion
- **Caption:** *Figure 7: Deletion confirmation dialog and task list confirming the item has been removed from Firestore. Demonstrates Requirement 5.*

### Screenshot 8: Navigation Bar & Teams "Coming Soon" Screen
- **Caption:** *Figure 8: Bottom navigation bar showing the Teams tab selected and rendering the "Coming Soon in Practical Exam 2" placeholder roadmap. Demonstrates Requirement 4.*

---

## 6. How to Submit
1. Rename `StudentID_Exam1.docx` to your actual student ID, for example `QE123456_Exam1.docx`.
2. Open the file in Microsoft Word or Google Docs, paste your screenshots into the designated screenshot boxes, and update your repository / Expo links.
3. Submit the `.docx` file as instructed.
