// 🎨 الثوابت والألوان والتكوينات | Constants & Color Palette

export const COLORS = {
  // الألوان الأساسية | Primary Colors
  obsidian: {
    950: '#0f0f1e',
    900: '#1a1a2e',
    800: '#252540',
    700: '#303050',
  },
  cyan: '#00d9ff',
  amber: '#ffb800',
  emerald: '#00ff88',
  purple: '#d946ef',
  red: '#ff4444',
};

export const EQUIPMENT_CATEGORIES = [
  'المتحكمات الدقيقة',
  'الحواسيب اللوحية',
  'الطباعة ثلاثية الأبعاد',
  'مواد الطباعة',
  'المعدات الثقيلة',
  'مجموعات التعليم',
  'أدوات اللحام',
  'المستشعرات',
  'المحركات',
  'لوحات التجميع',
];

export const TRACKS = [
  { id: 'robotics', name: 'الروبوتيك', icon: '🤖', color: 'text-cyber-cyan' },
  { id: 'electronics', name: 'الإلكترونيات', icon: '⚡', color: 'text-laser-amber' },
  { id: 'programming', name: 'البرمجة', icon: '💻', color: 'text-emerald-glow' },
];

export const TRANSACTION_TYPES = [
  'الرسوم الدراسية',
  'خدمات FabLab',
  'مشاريع',
];

export const EQUIPMENT_CONDITIONS = [
  { value: 'ممتاز', color: 'bg-emerald-glow text-black' },
  { value: 'جيد', color: 'bg-cyan text-black' },
  { value: 'متوسط', color: 'bg-laser-amber text-black' },
  { value: 'ضعيف', color: 'bg-neon-red text-white' },
];

export const EQUIPMENT_STATUS = [
  { value: 'جاهز', color: 'bg-emerald-glow/10 text-emerald-glow border-emerald-glow/30' },
  { value: 'في الصيانة', color: 'bg-laser-amber/10 text-laser-amber border-laser-amber/30' },
  { value: 'معطل', color: 'bg-neon-red/10 text-neon-red border-neon-red/30' },
];

export const MONTHS_AR = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

export const DAYS_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
