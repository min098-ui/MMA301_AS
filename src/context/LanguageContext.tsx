import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'vi';

interface Translations {
  appName: string;
  appSubtitle: string;
  newTask: string;
  total: string;
  todo: string;
  inProgress: string;
  done: string;
  searchPlaceholder: string;
  allTasks: string;
  todoTasks: string;
  inProgressTasks: string;
  completedTasks: string;
  due: string;
  deleteTitle: string;
  deleteConfirm: string;
  cancel: string;
  delete: string;
  createTaskTitle: string;
  editTaskTitle: string;
  createTaskSubtitle: string;
  editTaskSubtitle: string;
  titleLabel: string;
  descLabel: string;
  statusLabel: string;
  priorityLabel: string;
  dueDateLabel: string;
  saveChanges: string;
  createTaskBtn: string;
  emptyTitle: string;
  emptyMsg: string;
  emptyFilterMsg: string;
  tabTasks: string;
  tabTeams: string;
  tabProfile: string;
  teamsTitle: string;
  teamsSubtitle: string;
  teamsMilestone: string;
  featWorkspaceTitle: string;
  featWorkspaceDesc: string;
  featAssignTitle: string;
  featAssignDesc: string;
  featPermsTitle: string;
  featPermsDesc: string;
  profileTitle: string;
  profileRole: string;
  profileTag: string;
  profileSystem: string;
  profileDb: string;
  profileConnected: string;
  profileAuth: string;
  profilePublic: string;
  profileNotice: string;
  prioHigh: string;
  prioMed: string;
  prioLow: string;
}

const translations: Record<Language, Translations> = {
  en: {
    appName: 'TaskMaster Pro',
    appSubtitle: 'Cloud Firestore Task & Project Management',
    newTask: 'Create Task',
    total: 'Total',
    todo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done',
    searchPlaceholder: 'Search tasks by title or keyword...',
    allTasks: 'All Tasks',
    todoTasks: 'To Do',
    inProgressTasks: 'In Progress',
    completedTasks: 'Completed',
    due: 'Due',
    deleteTitle: 'Delete Task',
    deleteConfirm: 'Are you sure you want to permanently delete',
    cancel: 'Cancel',
    delete: 'Delete',
    createTaskTitle: 'Create New Task',
    editTaskTitle: 'Edit Task',
    createTaskSubtitle: 'Fill in task details to add to your project',
    editTaskSubtitle: 'Update task properties, status, or deadline',
    titleLabel: 'Title',
    descLabel: 'Description (optional)',
    statusLabel: 'Status',
    priorityLabel: 'Priority',
    dueDateLabel: 'Due Date (YYYY-MM-DD)',
    saveChanges: 'Save Changes',
    createTaskBtn: 'Create Task',
    emptyTitle: 'No Tasks Found',
    emptyMsg: 'There are currently no tasks in this view',
    emptyFilterMsg: 'No tasks matching',
    tabTasks: 'Tasks',
    tabTeams: 'Teams',
    tabProfile: 'Profile',
    teamsTitle: 'Teams & Workspaces',
    teamsSubtitle: 'Collaborate with teammates in real-time across shared workspaces (Practical Exam 2).',
    teamsMilestone: 'Coming in Exam 2',
    featWorkspaceTitle: 'Shared Team Workspaces',
    featWorkspaceDesc: 'Real-time multi-tenant collaboration across projects.',
    featAssignTitle: 'Member Task Allocation',
    featAssignDesc: 'Assign tasks to specific team members using assigneeId.',
    featPermsTitle: 'Role-Based Access Control',
    featPermsDesc: 'Granular permissions and enterprise workspace admin.',
    profileTitle: 'Nguyen Tuong Vy',
    profileRole: 'Practical Exam 1 – Mode: Public CRUD',
    profileTag: 'Connected to Firestore',
    profileSystem: 'System & Database Status',
    profileDb: 'Database',
    profileConnected: 'Cloud Firestore Active',
    profileAuth: 'Authentication',
    profilePublic: 'Public (No login required for Exam 1)',
    profileNotice: 'User authentication and workspace session tokens will be integrated in Practical Exam 2.',
    prioHigh: 'High',
    prioMed: 'Medium',
    prioLow: 'Low',
  },
  vi: {
    appName: 'TaskMaster Pro',
    appSubtitle: 'Hệ thống Quản lý Công việc & Dự án Cloud Firestore',
    newTask: 'Tạo công việc',
    total: 'Tổng số',
    todo: 'Cần làm',
    inProgress: 'Đang làm',
    done: 'Hoàn thành',
    searchPlaceholder: 'Tìm kiếm công việc theo từ khóa...',
    allTasks: 'Tất cả việc',
    todoTasks: 'Cần làm',
    inProgressTasks: 'Đang làm',
    completedTasks: 'Hoàn thành',
    due: 'Hạn chót',
    deleteTitle: 'Xác nhận xóa',
    deleteConfirm: 'Bạn có chắc chắn muốn xóa công việc',
    cancel: 'Hủy bỏ',
    delete: 'Xóa',
    createTaskTitle: 'Tạo công việc mới',
    editTaskTitle: 'Chỉnh sửa công việc',
    createTaskSubtitle: 'Điền thông tin nhiệm vụ để thêm vào dự án',
    editTaskSubtitle: 'Cập nhật nội dung, trạng thái hoặc thời hạn',
    titleLabel: 'Tiêu đề công việc',
    descLabel: 'Mô tả chi tiết (tùy chọn)',
    statusLabel: 'Trạng thái',
    priorityLabel: 'Mức độ ưu tiên',
    dueDateLabel: 'Ngày đến hạn (YYYY-MM-DD)',
    saveChanges: 'Lưu thay đổi',
    createTaskBtn: 'Tạo công việc',
    emptyTitle: 'Chưa có công việc nào',
    emptyMsg: 'Hiện không có công việc nào trong danh mục này',
    emptyFilterMsg: 'Không tìm thấy công việc nào khớp với',
    tabTasks: 'Nhiệm vụ',
    tabTeams: 'Đội ngũ',
    tabProfile: 'Hồ sơ',
    teamsTitle: 'Đội Ngũ & Không Gian Chung',
    teamsSubtitle: 'Cộng tác nhóm thời gian thực qua không gian làm việc số (Practical Exam 2).',
    teamsMilestone: 'Dự kiến ở Bài thi 2',
    featWorkspaceTitle: 'Không gian làm việc chung',
    featWorkspaceDesc: 'Cộng tác đa người dùng trực tiếp trên cùng dự án.',
    featAssignTitle: 'Phân công thành viên',
    featAssignDesc: 'Giao việc cho từng thành viên thông qua trường assigneeId.',
    featPermsTitle: 'Phân quyền vai trò',
    featPermsDesc: 'Bảo mật và quản trị nhóm chuyên nghiệp.',
    profileTitle: 'Nguyễn Tường Vy',
    profileRole: 'Practical Exam 1 – Chế độ: Public CRUD',
    profileTag: 'Đã kết nối Firestore',
    profileSystem: 'Thông tin hệ thống & Cơ sở dữ liệu',
    profileDb: 'Cơ sở dữ liệu',
    profileConnected: 'Cloud Firestore Hoạt động',
    profileAuth: 'Xác thực tài khoản',
    profilePublic: 'Công khai (Không cần đăng nhập)',
    profileNotice: 'Tính năng đăng nhập và phân quyền chi tiết sẽ được phát triển trong Practical Exam 2.',
    prioHigh: 'Cao',
    prioMed: 'Trung bình',
    prioLow: 'Thấp',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: translations.en,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'vi' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
