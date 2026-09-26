const fs = require('fs');
const path = require('path');
const {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
  BorderStyle,
  Packer,
  ShadingType,
} = require('docx');

const createHeading1 = (text) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 140 },
  });

const createHeading2 = (text) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
  });

const createHeading3 = (text) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 140, after: 60 },
  });

const createParagraph = (text, options = {}) =>
  new Paragraph({
    children: [
      new TextRun({
        text,
        font: 'Segoe UI',
        size: 22, // 11pt
        ...options,
      }),
    ],
    spacing: { after: 120 },
  });

const createBullet = (label, text) =>
  new Paragraph({
    bullet: { level: 0 },
    children: [
      new TextRun({ text: `${label}: `, bold: true, font: 'Segoe UI', size: 22 }),
      new TextRun({ text, font: 'Segoe UI', size: 22 }),
    ],
    spacing: { after: 80 },
  });

const createScreenshotBox = (figureNum, title, description, requirement) => {
  const border = {
    style: BorderStyle.DASHED,
    size: 2,
    color: '4F46E5',
  };

  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 100, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
              borders: { top: border, bottom: border, left: border, right: border },
              margins: { top: 200, bottom: 200, left: 240, right: 240 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: `[ INSERT SCREENSHOT HERE: ${title.toUpperCase()} ]`,
                      bold: true,
                      color: '4F46E5',
                      font: 'Segoe UI',
                      size: 24,
                    }),
                  ],
                  spacing: { before: 200, after: 100 },
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: `(Paste emulator / Firebase console screenshot here)`,
                      italics: true,
                      color: '64748B',
                      font: 'Segoe UI',
                      size: 20,
                    }),
                  ],
                  spacing: { after: 200 },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Figure ${figureNum}: `,
          bold: true,
          font: 'Segoe UI',
          size: 20,
          color: '0F172A',
        }),
        new TextRun({
          text: `${title} — `,
          bold: true,
          font: 'Segoe UI',
          size: 20,
          color: '0F172A',
        }),
        new TextRun({
          text: `${description} `,
          font: 'Segoe UI',
          size: 20,
          color: '334155',
        }),
        new TextRun({
          text: `[Demonstrates: ${requirement}]`,
          bold: true,
          font: 'Segoe UI',
          size: 20,
          color: '2563EB',
        }),
      ],
      spacing: { before: 80, after: 240 },
    }),
  ];
};

async function buildDoc() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title Banner
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Practical Exam 1 Report',
                bold: true,
                size: 44, // 22pt
                font: 'Segoe UI',
                color: '4F46E5',
              }),
            ],
            spacing: { before: 100, after: 80 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Task Management App: React Native, Firebase Setup & CRUD (No Authentication)',
                bold: true,
                size: 28, // 14pt
                font: 'Segoe UI',
                color: '1E293B',
              }),
            ],
            spacing: { after: 200 },
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Student ID', bold: true, font: 'Segoe UI', size: 22 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'QE123456 (Replace with your actual Student ID)',
                            bold: true,
                            font: 'Segoe UI',
                            size: 22,
                            color: '2563EB',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Course / Subject', bold: true, font: 'Segoe UI', size: 22 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'MMA301 - Mobile Applications Development',
                            font: 'Segoe UI',
                            size: 22,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Tech Stack', bold: true, font: 'Segoe UI', size: 22 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'React Native (Expo SDK 57), TypeScript, Cloud Firestore, React Navigation',
                            font: 'Segoe UI',
                            size: 22,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          createHeading1('1. Project Links & Submission Overview'),
          createParagraph(
            'This project fulfills all requirements of Practical Exam 1 by building the foundation of a mobile Task Management application using React Native with Expo and connecting it to Google Cloud Firestore with real-time CRUD synchronization.',
          ),
          createBullet('Public GitHub Repository', 'https://github.com/<YOUR_USERNAME>/MMA301_AS'),
          createBullet('Expo Project / QR Code URL', 'https://expo.dev/@<YOUR_USERNAME>/MMA301_AS or exp://exp.host/@<YOUR_USERNAME>/MMA301_AS'),
          createBullet('EAS APK Download Link (Optional)', 'https://expo.dev/artifacts/eas/... (or shared on Google Drive)'),

          createHeading1('2. Git Version Control & Commit Evidence'),
          createParagraph(
            'The project was initialized with Git and committed progressively across each major milestone, satisfying the requirement of at least 5 meaningful commits. The commit log below documents each atomic phase of development:',
          ),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 15, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Commit', bold: true, font: 'Segoe UI' })] })],
                  }),
                  new TableCell({
                    width: { size: 35, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Message', bold: true, font: 'Segoe UI' })] })],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Description / Requirement Met', bold: true, font: 'Segoe UI' })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'e7d3514' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Initial commit' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Scaffolded project using Expo blank-typescript template.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '30ac839' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'chore: configure ESLint, Prettier, .gitignore and environment templates' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Configured code style rules and .gitignore patterns.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'dba5aed' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'chore: add .env.example template with Firebase keys' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Added environment configuration template without secrets.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '20020d5' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'feat: define Task data model and application theme tokens' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Created TypeScript interfaces for tasks and visual design tokens.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '6975858' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'feat: configure Firebase SDK and implement Firestore CRUD service' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Implemented firebase.ts and taskService.ts with CRUD operations.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '090a109' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'feat: create useTasks hook with real-time onSnapshot listener' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Created hook for reactive state synchronization and offline fallback.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '5423811' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'feat: add UI components for task cards, modals, filter tabs' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Implemented Header, FilterTabs, TaskCard, TaskModal, EmptyState.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '48d5f11' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'feat: implement HomeScreen with CRUD and tab navigation' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Connected UI screens to AppNavigator with bottom tabs.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '4849226' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'ci: add GitHub Actions CI workflow and documentation with ERD' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Automated lint and type-checking on push; wrote README.' })] }),
                ],
              }),
            ],
          }),

          createHeading1('3. Cloud Firestore Data Model & Schema Details'),
          createParagraph(
            'The tasks collection in Cloud Firestore holds public task documents. In accordance with the Practical Exam 1 specification, each task document includes the required schema fields, plus teamId and assigneeId reserved for Practical Exam 2.',
          ),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 20, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Field Name', bold: true, font: 'Segoe UI' })] })],
                  }),
                  new TableCell({
                    width: { size: 18, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Type', bold: true, font: 'Segoe UI' })] })],
                  }),
                  new TableCell({
                    width: { size: 15, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Required?', bold: true, font: 'Segoe UI' })] })],
                  }),
                  new TableCell({
                    width: { size: 47, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Description & Example', bold: true, font: 'Segoe UI' })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'id' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'string' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Yes' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Auto-generated Firestore document ID' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'title' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'string' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Yes' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Task title (client validated, min 3 characters)' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'description' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'string' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'No' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Detailed notes, specifications, or context' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'status' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'string' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Yes' })] }),
                  new TableCell({ children: [new Paragraph({ text: "'To Do' | 'In Progress' | 'Completed'" })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'priority' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'string' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Yes' })] }),
                  new TableCell({ children: [new Paragraph({ text: "'Low' | 'Medium' | 'High'" })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'dueDate' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'string' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Yes' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Due date in YYYY-MM-DD ISO format' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'createdAt' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'string' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Yes' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'ISO 8601 timestamp string' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'teamId' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'string | null' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'No' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Nullable workspace ID (Reserved for Exam 2)' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'assigneeId' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'string | null' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'No' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Nullable member ID (Reserved for Exam 2)' })] }),
                ],
              }),
            ],
          }),

          createHeading1('4. Architecture & Implementation Highlights'),
          createHeading2('Modular Services & Separation of Concerns'),
          createParagraph(
            'The application follows clean architectural patterns separating database interaction from presentation:',
          ),
          createBullet(
            'services/firebase.ts',
            'Handles Firebase app lifecycle, avoiding multiple re-initializations during Metro fast refresh.',
          ),
          createBullet(
            'services/taskService.ts',
            'Encapsulates Firestore addDoc, updateDoc, deleteDoc, and real-time onSnapshot listeners.',
          ),
          createBullet(
            'hooks/useTasks.ts',
            'Manages reactive local state, optimistic updates, query searching, and status filtering.',
          ),
          createBullet(
            'navigation/AppNavigator.tsx',
            'Creates bottom tabs with Home, Teams (Coming Soon), and Profile placeholders.',
          ),

          createHeading2('Bonus Features Implemented'),
          createBullet(
            'Client-Side Form Validation',
            'Validates that task titles are non-empty, trimmed, and at least 3 characters long, with red visual highlights and error messages.',
          ),
          createBullet(
            'Real-Time Status Filter & Search',
            'Provides pill buttons for All, To Do, In Progress, and Completed tasks with dynamic count badges, plus search bar.',
          ),
          createBullet(
            'Pull-To-Refresh',
            'Standard RefreshControl bound to Firestore fetch for seamless manual refresh.',
          ),
          createBullet(
            'GitHub Actions CI Pipeline',
            'Automated pipeline (.github/workflows/ci.yml) validating linting and TypeScript on every commit/push.',
          ),

          createHeading1('5. Visual Evidence & Screenshot Gallery'),
          createParagraph(
            'The following sections provide the required screenshot evidence with descriptive captions indicating the verified functional requirement:',
          ),

          // Screenshot 1: Firebase Console
          ...createScreenshotBox(
            '1',
            'Firebase Console — Firestore Tasks Collection',
            'Cloud Firestore Console showing the "tasks" collection with auto-generated document IDs and schema fields (title, description, status, priority, dueDate, createdAt, teamId, assigneeId).',
            'Requirement 3: Firebase Project & Firestore Data Setup',
          ),

          // Screenshot 2: Home Screen
          ...createScreenshotBox(
            '2',
            'Home Screen — Public Task List & App Introduction',
            'Home screen introducing TaskMaster Hub with quick statistics cards, search bar, status filter tabs, and the initial list of tasks.',
            'Requirement 4 & 5: Home Screen & Public Task CRUD',
          ),

          // Screenshot 3: Create Task Form Filled
          ...createScreenshotBox(
            '3',
            'Create Task Form — Pre-Submission Input',
            'TaskModal dialog filled in with Title ("Prepare App Demo Presentation"), Description, Status ("In Progress"), Priority ("High"), and Due Date.',
            'Requirement 5: Task Creation Form & Client Validation',
          ),

          // Screenshot 4: Task List After Creation
          ...createScreenshotBox(
            '4',
            'Task List — Real-time Addition Verification',
            'Task list displaying the newly created task at the top of the feed with its High Priority badge and In Progress status chip.',
            'Requirement 5: Real-time onSnapshot Synchronization',
          ),

          // Screenshot 5: Edit Task Modal
          ...createScreenshotBox(
            '5',
            'Edit Task Modal — Updating Existing Task',
            'TaskModal opened in edit mode with current values populated, modifying the status to "Completed" and updating description.',
            'Requirement 5: Update Task Modal & Field Editing',
          ),

          // Screenshot 6: Task List After Edit
          ...createScreenshotBox(
            '6',
            'Task List — Real-time Edit Verification',
            'Task list showing the edited task with its updated status ("Completed") and revised details rendered immediately.',
            'Requirement 5: Real-time Task Update',
          ),

          // Screenshot 7: Task List After Deletion
          ...createScreenshotBox(
            '7',
            'Task List — Task Deletion Confirmation & Result',
            'Alert dialog confirming deletion and the resulting task list showing the item successfully removed from Firestore.',
            'Requirement 5: Task Deletion from List & Database',
          ),

          // Screenshot 8: Bottom Navigation & Teams Screen
          ...createScreenshotBox(
            '8',
            'Bottom Navigation Bar & Teams "Coming Soon" Screen',
            'Bottom tab bar highlighting the Teams tab and rendering the "Coming Soon" placeholder roadmap for Practical Exam 2.',
            'Requirement 4: Shared Navigation & Placeholder Screens',
          ),

          createHeading1('6. Conclusion'),
          createParagraph(
            'Practical Exam 1 has been completed with robust engineering practices: strong TypeScript typing, zero ESLint warnings, real-time Firestore connectivity, comprehensive CRUD features, and a foundation ready for Practical Exam 2.',
          ),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', 'StudentID_Exam1.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document successfully written to: ${outputPath}`);
}

buildDoc().catch(console.error);
