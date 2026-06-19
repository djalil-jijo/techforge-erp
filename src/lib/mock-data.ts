// 📊 البيانات التجريبية الكاملة | Complete Mock Data
// هذا الملف يحتوي على جميع البيانات الوهمية للنظام

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  track: 'الروبوتيك' | 'الإلكترونيات' | 'البرمجة';
  enrollmentDate: string;
  attendanceRate: number;
  status: 'نشط' | 'معلق' | 'متخرج';
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  quantity: number;
  available: number;
  status: 'جاهز' | 'في الصيانة' | 'معطل';
  location: string;
  condition: 'ممتاز' | 'جيد' | 'متوسط' | 'ضعيف';
}

export interface Assignment {
  id: string;
  itemId: string;
  itemName: string;
  borrowerName: string;
  role: 'Student' | 'Instructor';
  borrowDate: string;
  expectedReturnDate: string;
  status: 'active' | 'overdue' | 'returned';
}

export interface Transaction {
  id: string;
  studentName: string;
  amount: number;
  type: 'الرسوم الدراسية' | 'خدمات FabLab' | 'مشاريع';
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

// ============= الطلاب | STUDENTS =============
export const MOCK_STUDENTS: Student[] = [
  {
    id: 'STU-001',
    name: 'محمد علي بن عمارة',
    email: 'mohammad.benamar@techforge.dz',
    phone: '0661234567',
    track: 'الروبوتيك',
    enrollmentDate: '2025-09-15',
    attendanceRate: 92,
    status: 'نشط',
  },
  {
    id: 'STU-002',
    name: 'فاطمة الزهراء مرابط',
    email: 'fatima.mrabat@techforge.dz',
    phone: '0671234568',
    track: 'البرمجة',
    enrollmentDate: '2025-09-16',
    attendanceRate: 88,
    status: 'نشط',
  },
  {
    id: 'STU-003',
    name: 'عمر صالح قاسمي',
    email: 'omar.gasmi@techforge.dz',
    phone: '0681234569',
    track: 'الإلكترونيات',
    enrollmentDate: '2025-09-17',
    attendanceRate: 95,
    status: 'نشط',
  },
  {
    id: 'STU-004',
    name: 'ليلى خديجة براهيمي',
    email: 'leila.brahimi@techforge.dz',
    phone: '0691234570',
    track: 'الروبوتيك',
    enrollmentDate: '2025-09-18',
    attendanceRate: 85,
    status: 'نشط',
  },
  {
    id: 'STU-005',
    name: 'حسن محمود بلحج',
    email: 'hassan.belhadj@techforge.dz',
    phone: '0701234571',
    track: 'البرمجة',
    enrollmentDate: '2025-09-19',
    attendanceRate: 78,
    status: 'معلق',
  },
  {
    id: 'STU-006',
    name: 'نور الدين يوسفي',
    email: 'nouraldin.yousefi@techforge.dz',
    phone: '0711234572',
    track: 'الإلكترونيات',
    enrollmentDate: '2025-09-20',
    attendanceRate: 90,
    status: 'نشط',
  },
];

// ============= المعدات والأدوات | EQUIPMENT =============
export const MOCK_INVENTORY: Equipment[] = [
  {
    id: 'EQ-001',
    name: 'Arduino Mega 2560',
    category: 'المتحكمات الدقيقة',
    quantity: 15,
    available: 8,
    status: 'جاهز',
    location: 'الرف A1',
    condition: 'ممتاز',
  },
  {
    id: 'EQ-002',
    name: 'Raspberry Pi 4 (8GB)',
    category: 'الحواسيب اللوحية',
    quantity: 10,
    available: 6,
    status: 'جاهز',
    location: 'الرف A2',
    condition: 'ممتاز',
  },
  {
    id: 'EQ-003',
    name: 'طابعة 3D (Creality Ender 3)',
    category: 'الطباعة ثلاثية الأبعاد',
    quantity: 4,
    available: 2,
    status: 'جاهز',
    location: 'الورشة الرئيسية',
    condition: 'جيد',
  },
  {
    id: 'EQ-004',
    name: 'خيط PLA ملون (Filament)',
    category: 'مواد الطباعة',
    quantity: 50,
    available: 35,
    status: 'جاهز',
    location: 'الخزانة B1',
    condition: 'ممتاز',
  },
  {
    id: 'EQ-005',
    name: 'آلة CNC الحفر',
    category: 'المعدات الثقيلة',
    quantity: 2,
    available: 1,
    status: 'في الصيانة',
    location: 'ورشة CNC',
    condition: 'متوسط',
  },
  {
    id: 'EQ-006',
    name: 'حقيبة الروبوت التعليمي',
    category: 'مجموعات التعليم',
    quantity: 8,
    available: 5,
    status: 'جاهز',
    location: 'الرف C1',
    condition: 'جيد',
  },
  {
    id: 'EQ-007',
    name: 'لحام إلكتروني (Soldering Station)',
    category: 'أدوات اللحام',
    quantity: 6,
    available: 4,
    status: 'جاهز',
    location: 'مقاعد الإلكترونيات',
    condition: 'ممتاز',
  },
  {
    id: 'EQ-008',
    name: 'مجموعة مستشعرات (Sensors Kit)',
    category: 'المستشعرات',
    quantity: 20,
    available: 12,
    status: 'جاهز',
    location: 'الرف D2',
    condition: 'ممتاز',
  },
  {
    id: 'EQ-009',
    name: 'محرك كهربائي (Motor Kit)',
    category: 'المحركات',
    quantity: 25,
    available: 18,
    status: 'جاهز',
    location: 'الرف D3',
    condition: 'جيد',
  },
  {
    id: 'EQ-010',
    name: 'لوحة الدوائر الكهربائية (Breadboard)',
    category: 'لوحات التجميع',
    quantity: 30,
    available: 22,
    status: 'جاهز',
    location: 'الرف E1',
    condition: 'ممتاز',
  },
];

// ============= نقل العهدة | ASSIGNMENTS =============
export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'ASG-001',
    itemId: 'EQ-001',
    itemName: 'Arduino Mega 2560',
    borrowerName: 'محمد علي بن عمارة',
    role: 'Student',
    borrowDate: '2026-06-15',
    expectedReturnDate: '2026-06-22',
    status: 'active',
  },
  {
    id: 'ASG-002',
    itemId: 'EQ-002',
    itemName: 'Raspberry Pi 4 (8GB)',
    borrowerName: 'الأستاذ أحمد محمود',
    role: 'Instructor',
    borrowDate: '2026-06-10',
    expectedReturnDate: '2026-06-25',
    status: 'active',
  },
  {
    id: 'ASG-003',
    itemId: 'EQ-006',
    itemName: 'حقيبة الروبوت التعليمي',
    borrowerName: 'فاطمة الزهراء مرابط',
    role: 'Student',
    borrowDate: '2026-06-12',
    expectedReturnDate: '2026-06-19',
    status: 'overdue',
  },
  {
    id: 'ASG-004',
    itemId: 'EQ-007',
    itemName: 'لحام إلكتروني',
    borrowerName: 'الأستاذ خالد البرقي',
    role: 'Instructor',
    borrowDate: '2026-06-01',
    expectedReturnDate: '2026-06-18',
    status: 'returned',
  },
  {
    id: 'ASG-005',
    itemId: 'EQ-003',
    itemName: 'طابعة 3D (Creality Ender 3)',
    borrowerName: 'عمر صالح قاسمي',
    role: 'Student',
    borrowDate: '2026-06-14',
    expectedReturnDate: '2026-06-28',
    status: 'active',
  },
];

// ============= المعاملات المالية | TRANSACTIONS =============
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX-001',
    studentName: 'محمد علي بن عمارة',
    amount: 15000,
    type: 'الرسوم الدراسية',
    date: '2026-06-01',
    status: 'Completed',
  },
  {
    id: 'TRX-002',
    studentName: 'فاطمة الزهراء مرابط',
    amount: 8500,
    type: 'خدمات FabLab',
    date: '2026-06-05',
    status: 'Completed',
  },
  {
    id: 'TRX-003',
    studentName: 'عمر صالح قاسمي',
    amount: 15000,
    type: 'الرسوم الدراسية',
    date: '2026-06-08',
    status: 'Pending',
  },
  {
    id: 'TRX-004',
    studentName: 'ليلى خديجة براهيمي',
    amount: 12000,
    type: 'مشاريع',
    date: '2026-06-10',
    status: 'Completed',
  },
  {
    id: 'TRX-005',
    studentName: 'حسن محمود بلحج',
    amount: 15000,
    type: 'الرسوم الدراسية',
    date: '2026-06-12',
    status: 'Pending',
  },
  {
    id: 'TRX-006',
    studentName: 'نور الدين يوسفي',
    amount: 5500,
    type: 'خدمات FabLab',
    date: '2026-06-15',
    status: 'Completed',
  },
  {
    id: 'TRX-007',
    studentName: 'محمد علي بن عمارة',
    amount: 3200,
    type: 'خدمات FabLab',
    date: '2026-06-16',
    status: 'Completed',
  },
  {
    id: 'TRX-008',
    studentName: 'فاطمة الزهراء مرابط',
    amount: 15000,
    type: 'الرسوم الدراسية',
    date: '2026-06-18',
    status: 'Pending',
  },
];

// ============= الأساتذة | TEACHERS =============
export const MOCK_TEACHERS = [
  {
    id: 'TCH-001',
    name: 'الأستاذ أحمد محمود',
    specialization: 'الروبوتيك',
    email: 'ahmad.mahmoud@techforge.dz',
    phone: '0551234567',
    status: 'نشط',
  },
  {
    id: 'TCH-002',
    name: 'الأستاذة سارة بن ناصر',
    specialization: 'البرمجة',
    email: 'sara.benasser@techforge.dz',
    phone: '0561234568',
    status: 'نشط',
  },
  {
    id: 'TCH-003',
    name: 'الأستاذ خالد البرقي',
    specialization: 'الإلكترونيات',
    email: 'khaled.bourqi@techforge.dz',
    phone: '0571234569',
    status: 'نشط',
  },
];

// ============= إحصائيات اللوحة | DASHBOARD STATISTICS =============
export const DASHBOARD_STATS = {
  totalStudents: MOCK_STUDENTS.length,
  activeStudents: MOCK_STUDENTS.filter(s => s.status === 'نشط').length,
  totalEquipment: MOCK_INVENTORY.reduce((sum, e) => sum + e.quantity, 0),
  availableEquipment: MOCK_INVENTORY.reduce((sum, e) => sum + e.available, 0),
  totalRevenue: MOCK_TRANSACTIONS.filter(t => t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0),
  pendingPayments: MOCK_TRANSACTIONS.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0),
};
