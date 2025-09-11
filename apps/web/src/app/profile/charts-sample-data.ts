// Sample data for charts
export const codeData = [
  { date: 'Sep 5', value: 50 },
  { date: 'Sep 6', value: 180 },
  { date: 'Sep 7', value: 150 },
  { date: 'Sep 8', value: 100 },
  { date: 'Sep 9', value: 40 },
  { date: 'Sep 10', value: 250 },
];

export const messagesData = [{ label: 'Write mode', value: 16 }];

export const languageData = [
  { name: 'TypeScript', value: 45, color: 'hsl(var(--primary))' },
  { name: 'JavaScript', value: 30, color: 'hsl(var(--secondary))' },
  { name: 'Python', value: 15, color: 'hsl(var(--accent))' },
  { name: 'CSS', value: 10, color: 'hsl(var(--muted))' },
];

export const productivityData = [
  { day: 'Mon', commits: 8, reviews: 3, issues: 2 },
  { day: 'Tue', commits: 12, reviews: 5, issues: 1 },
  { day: 'Wed', commits: 6, reviews: 2, issues: 4 },
  { day: 'Thu', commits: 15, reviews: 7, issues: 0 },
  { day: 'Fri', commits: 10, reviews: 4, issues: 3 },
  { day: 'Sat', commits: 4, reviews: 1, issues: 1 },
  { day: 'Sun', commits: 2, reviews: 0, issues: 0 },
];

export const skillsData = [
  { skill: 'Frontend', progress: 85 },
  { skill: 'Backend', progress: 70 },
  { skill: 'DevOps', progress: 60 },
  { skill: 'AI/ML', progress: 45 },
];

export const monthlyStatsData = [
  { month: 'Jan', lines: 1200, commits: 45, prs: 12 },
  { month: 'Feb', lines: 1800, commits: 62, prs: 18 },
  { month: 'Mar', lines: 2200, commits: 78, prs: 25 },
  { month: 'Apr', lines: 1900, commits: 55, prs: 20 },
  { month: 'May', lines: 2500, commits: 89, prs: 30 },
  { month: 'Jun', lines: 2100, commits: 71, prs: 22 },
];

export const activityData = [
  { date: 'Sep 5', commits: 3, messages: 12, lines: 150 },
  { date: 'Sep 6', commits: 5, messages: 18, lines: 280 },
  { date: 'Sep 7', commits: 2, messages: 8, lines: 120 },
  { date: 'Sep 8', commits: 4, messages: 15, lines: 200 },
  { date: 'Sep 9', commits: 1, messages: 5, lines: 80 },
  { date: 'Sep 10', commits: 6, messages: 22, lines: 350 },
];

export const achievements = [
  {
    title: 'Code Streak Master',
    description: '51 day coding streak',
    icon: '🔥',
    progress: 100,
    color: 'bg-orange-500',
  },
  {
    title: 'AI Collaborator',
    description: 'Used AI assistance 500+ times',
    icon: '🤖',
    progress: 85,
    color: 'bg-blue-500',
  },
  { title: 'Early Adopter', description: 'Beta tester since day 1', icon: '⭐', progress: 100, color: 'bg-yellow-500' },
  { title: 'Community Helper', description: 'Helped 25+ developers', icon: '🤝', progress: 60, color: 'bg-green-500' },
];

export const recentActivity = [
  { action: 'Completed code review', time: '2 hours ago', type: 'review' },
  { action: 'Pushed 3 commits to main branch', time: '4 hours ago', type: 'commit' },
  { action: 'Started new conversation with AI', time: '6 hours ago', type: 'ai' },
  { action: 'Updated profile settings', time: '1 day ago', type: 'settings' },
  { action: "Earned 'Code Streak Master' achievement", time: '2 days ago', type: 'achievement' },
];

export const sidebarItems = [
  {
    section: 'ACCOUNT',
    items: [
      { name: 'Profile', active: true },
      { name: 'Notifications', active: false },
      { name: 'Settings', active: false },
    ],
  },
  {
    section: 'SUBSCRIPTION',
    items: [
      { name: 'Usage', active: false },
      { name: 'Manage Plan', active: false },
      { name: 'Model Provider API Keys', active: false },
    ],
  },
  {
    section: 'FEATURES',
    items: [
      { name: 'Deploys', active: false },
      { name: 'Conversation Shares', active: false },
    ],
  },
];
