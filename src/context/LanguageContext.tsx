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
    appName: 'Axolotl Clouds ☁️🌸',
    appSubtitle: 'Sweet & fluffy task management in the clouds',
    newTask: 'Add Task',
    total: 'Total',
    todo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done',
    searchPlaceholder: 'Search fluffy tasks...',
    allTasks: 'All Tasks',
    todoTasks: 'To Do Tasks',
    inProgressTasks: 'In Progress Tasks',
    completedTasks: 'Completed Tasks',
    due: 'Due',
    deleteTitle: 'Delete Task',
    deleteConfirm: 'Are you sure you want to delete',
    cancel: 'Cancel',
    delete: 'Delete',
    createTaskTitle: 'New Fluffy Task ☁️',
    editTaskTitle: 'Edit Fluffy Task 🌸',
    createTaskSubtitle: 'Add a new marshmallow task to your list',
    editTaskSubtitle: 'Update your sweet task details & status',
    titleLabel: 'Title',
    descLabel: 'Description (optional)',
    statusLabel: 'Status',
    priorityLabel: 'Priority',
    dueDateLabel: 'Due Date (YYYY-MM-DD)',
    saveChanges: 'Save Changes',
    createTaskBtn: 'Create Task 🌸',
    emptyTitle: 'All Fluffy & Done! ☁️',
    emptyMsg: 'No tasks found in this cloud',
    emptyFilterMsg: 'No tasks found matching your filter',
    tabTasks: 'Tasks 🌸',
    tabTeams: 'Teams ☁️',
    tabProfile: 'Profile 💖',
    teamsTitle: 'Axolotl Cloud Squad ☁️',
    teamsSubtitle: 'Collaborate with your sweet team in real-time across workspaces (Practical Exam 2).',
    teamsMilestone: 'Milestone Preview 🌸',
    featWorkspaceTitle: 'Shared Cloud Workspaces',
    featWorkspaceDesc: 'Team up with peers across multiple sweet projects in real time.',
    featAssignTitle: 'Member Task Allocation',
    featAssignDesc: 'Assign tasks to team members using the assigneeId schema field.',
    featPermsTitle: 'Marshmallow Permissions',
    featPermsDesc: 'Role-based access controls and smooth squad management.',
    profileTitle: 'Nguyen Tuong Vy (Axolotl 🌸)',
    profileRole: 'Practical Exam 1 – Mode: Public Cloud CRUD',
    profileTag: 'Marshmallow Cloud Edition ☁️',
    profileSystem: 'System & Database Status',
    profileDb: 'Database',
    profileConnected: 'Cloud Firestore Connected',
    profileAuth: 'Authentication',
    profilePublic: 'Public (No login for Exam 1)',
    profileNotice: 'User auth and squad tokens will be added in Practical Exam 2.',
    prioHigh: 'High 🍓',
    prioMed: 'Medium 🍬',
    prioLow: 'Low 🍀',
  },
  vi: {
    appName: 'Axolotl Mây Hồng ☁️🌸',
    appSubtitle: 'Quản lý công việc ngọt ngào như kẹo bông gòn',
    newTask: 'Thêm việc',
    total: 'Tổng',
    todo: 'Cần làm',
    inProgress: 'Đang làm',
    done: 'Đã xong',
    searchPlaceholder: 'Tìm kiếm công việc mây hồng...',
    allTasks: 'Tất cả việc',
    todoTasks: 'Việc cần làm',
    inProgressTasks: 'Việc đang làm',
    completedTasks: 'Việc đã xong',
    due: 'Hạn',
    deleteTitle: 'Xóa việc',
    deleteConfirm: 'Bạn có chắc muốn xóa',
    cancel: 'Hủy',
    delete: 'Xóa',
    createTaskTitle: 'Tạo việc mới ☁️',
    editTaskTitle: 'Chỉnh sửa việc 🌸',
    createTaskSubtitle: 'Thêm nhiệm vụ kẹo bông mới vào danh sách',
    editTaskSubtitle: 'Cập nhật nội dung và trạng thái công việc',
    titleLabel: 'Tiêu đề',
    descLabel: 'Mô tả (tùy chọn)',
    statusLabel: 'Trạng thái',
    priorityLabel: 'Mức ưu tiên',
    dueDateLabel: 'Hạn chót (YYYY-MM-DD)',
    saveChanges: 'Lưu thay đổi',
    createTaskBtn: 'Tạo việc 🌸',
    emptyTitle: 'Xong hết rồi nè! ☁️',
    emptyMsg: 'Chưa có công việc nào trong đám mây này',
    emptyFilterMsg: 'Không tìm thấy việc nào theo bộ lọc này',
    tabTasks: 'Nhiệm vụ 🌸',
    tabTeams: 'Đội ngũ ☁️',
    tabProfile: 'Hồ sơ 💖',
    teamsTitle: 'Biệt Đội Axolotl Mây ☁️',
    teamsSubtitle: 'Cộng tác cùng đồng đội trong thời gian thực (Practical Exam 2).',
    teamsMilestone: 'Xem trước tính năng 🌸',
    featWorkspaceTitle: 'Không gian làm việc chung',
    featWorkspaceDesc: 'Cộng tác cùng đồng đội trong thời gian thực trên các dự án.',
    featAssignTitle: 'Phân công nhiệm vụ',
    featAssignDesc: 'Giao việc trực tiếp cho thành viên qua trường assigneeId.',
    featPermsTitle: 'Phân quyền linh hoạt',
    featPermsDesc: 'Quản trị nhóm và bảo mật phân quyền thông minh.',
    profileTitle: 'Nguyễn Tường Vy (Axolotl 🌸)',
    profileRole: 'Practical Exam 1 – Chế độ: Public CRUD',
    profileTag: 'Phiên bản Kẹo Bông Mây ☁️',
    profileSystem: 'Trạng thái hệ thống & Firestore',
    profileDb: 'Cơ sở dữ liệu',
    profileConnected: 'Đã kết nối Cloud Firestore',
    profileAuth: 'Xác thực tài khoản',
    profilePublic: 'Công khai (Không cần đăng nhập)',
    profileNotice: 'Đăng nhập và phân quyền chi tiết sẽ được tích hợp trong Bài thi 2.',
    prioHigh: 'Cao 🍓',
    prioMed: 'Vừa 🍬',
    prioLow: 'Thấp 🍀',
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
