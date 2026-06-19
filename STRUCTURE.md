# 📐 هيكلية مشروع TechForge ERP - البنية المعمارية الكاملة
# Full Folder Structure & Architecture Documentation

## 🎯 نظرة عامة | Overview
نظام إدارة شامل (ERP) لمركز تدريس تقني متخصص في الروبوتيك والإلكترونيات مع خدمات FabLab (طباعة 3D، حفر CNC).

---

## 📁 الهيكل الكامل للمشروع | Complete Folder Structure

```
src/
├── app/                              # مجلد التطبيق الرئيسي (App Router)
│   ├── layout.tsx                    # التخطيط الرئيسي العام
│   ├── globals.css                   # الأنماط العامة والمتغيرات
│   ├── page.tsx                      # الصفحة الرئيسية (Landing Page)
│   │
│   ├── (public)/                     # Group: الواجهات العامة
│   │   ├── login/
│   │   │   └── page.tsx             # تسجيل الدخول
│   │   ├── register/
│   │   │   └── page.tsx             # التسجيل الأولي للطلاب
│   │   ├── order-service/
│   │   │   └── page.tsx             # طلب خدمات FabLab
│   │   └── about/
│   │       └── page.tsx             # عن المركز
│   │
│   ├── (admin)/                      # Group: لوحة تحكم الإدارة
│   │   ├── layout.tsx                # التخطيط المشترك (Sidebar + Topbar)
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx         # مركز القيادة التنفيذي
│   │   │   ├── payments/
│   │   │   │   └── page.tsx         # النواة المالية
│   │   │   ├── expenses/
│   │   │   │   └── page.tsx         # تعقب المصاريف
│   │   │   ├── students/
│   │   │   │   └── page.tsx         # إدارة الطلاب
│   │   │   ├── teachers/
│   │   │   │   └── page.tsx         # إدارة الأساتذة
│   │   │   ├── classes/
│   │   │   │   └── page.tsx         # إدارة الفوج والقاعات
│   │   │   ├── timetable/
│   │   │   │   └── page.tsx         # المجدول الذكي
│   │   │   ├── inventory/
│   │   │   │   ├── page.tsx         # المستودع الرقمي
│   │   │   │   └── assignments/
│   │   │   │       └── page.tsx     # نقل العهدة الديناميكي
│   │   │   ├── reports/
│   │   │   │   └── page.tsx         # غرفة تدقيق التقارير
│   │   │   ├── competitions/
│   │   │   │   └── page.tsx         # إدارة المسابقات
│   │   │   └── projects/
│   │   │       └── page.tsx         # مركز تصنيع FabLab
│   │
│   ├── (teacher)/                    # Group: لوحة تحكم المعلمين
│   │   ├── layout.tsx                # التخطيط المشترك
│   │   ├── teacher/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx         # واجهة الأستاذ اليومية
│   │   │   ├── my-tools/
│   │   │   │   └── page.tsx         # الحقيبة الرقمية
│   │   │   ├── attendance/
│   │   │   │   └── page.tsx         # تحضير الطلاب
│   │   │   ├── grades/
│   │   │   │   └── page.tsx         # رصد التقييمات
│   │   │   └── reports/
│   │   │       └── create/
│   │   │           └── page.tsx     # التقرير الرقمي السريع
│   │
│   └── (portal)/                     # Group: بوابة الطلاب وأولياء الأمور
│       ├── layout.tsx                # التخطيط المشترك
│       └── portal/
│           ├── dashboard/
│           │   └── page.tsx         # واجهة الطالب المستقبلية
│           ├── schedule/
│           │   └── page.tsx         # جدول الحصص
│           ├── report-cards/
│           │   └── page.tsx         # النتائج والشهادات
│           ├── fees/
│           │   └── page.tsx         # كشف الحساب المالي
│           └── my-activities/
│               └── page.tsx         # الرادار التنافسي
│
├── components/                       # المكونات القابلة لإعادة الاستخدام
│   ├── ui/
│   │   ├── GlassCard.tsx            # بطاقة زجاجية (Glassmorphism)
│   │   ├── StatCard.tsx             # بطاقة الإحصائيات
│   │   ├── Sidebar.tsx              # الشريط الجانبي
│   │   ├── Topbar.tsx               # شريط العنوان العلوي
│   │   ├── ChartComponent.tsx        # مكونات الرسوم البيانية
│   │   └── LoadingSpinner.tsx        # مؤشر التحميل
│   └── dashboard/
│       ├── RevenueChart.tsx          # رسم بياني الإيرادات
│       ├── InventoryOverview.tsx     # نظرة عامة على المخزن
│       └── EquipmentStatus.tsx       # حالة المعدات
│
├── lib/
│   ├── mock-data.ts                  # البيانات التجريبية (Mock Data)
│   ├── utils.ts                      # الدوال المساعدة
│   └── constants.ts                  # الثوابت والألوان
│
└── styles/
    ├── globals.css                   # الأنماط العامة
    └── animations.css                # التأثيرات المتحركة

```

---

## 🎨 نظام الألوان والثيم | Color System & Theme

### الألوان الرئيسية | Primary Colors
- **Deep Obsidian**: `#0f0f1e` - الخلفية الأساسية الداكنة
- **Electric Cyan**: `#00d9ff` - البرمجيات والروبوتيك
- **Laser Amber**: `#ffb800` - CNC والطباعة 3D
- **Emerald Green**: `#00ff88` - العمليات المالية
- **Neon Purple**: `#d946ef` - التفاعل والتنبيهات

### التأثيرات الخاصة | Special Effects
- **Glassmorphism**: تأثير زجاج شفاف مع backdrop blur
- **Neon Glow**: توهج خفيف حول البطاقات والعناصر المهمة
- **Pulsing Indicator**: مؤشرات نابضة للبيانات الحية

---

## 📱 استجابة الشاشات | Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **4K Monitors**: > 1920px

---

## 🔄 تدفق المستخدمين | User Flow

### 👤 زائر عام | Public User
```
Landing Page → Login / Register → Public Services (FabLab Order)
```

### 👨‍🎓 طالب | Student
```
Register → Portal Dashboard → Schedule → Report Cards → Fees
```

### 👨‍🏫 أستاذ | Teacher
```
Login → Teacher Dashboard → Attendance → Grades → Reports
```

### 👨‍💼 مدير | Admin
```
Login → Admin Dashboard → Inventory → Payments → Reports
```

---

## 💾 البيانات التجريبية | Mock Data Categories

1. **الطلاب**: أسماء جزائرية، بيانات تعليمية
2. **المعدات**: Arduino, Raspberry Pi, Filament 3D, معدات CNC
3. **المعاملات المالية**: رسوم الدورات، مداخيل FabLab
4. **الجداول الزمنية**: حصص الروبوتيك والإلكترونيات
5. **الإحصائيات**: تقارير شهرية وسنوية

---

## 🚀 تقنيات الواجهة | Frontend Stack
- **Next.js 16+** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Recharts** (الرسوم البيانية)
- **Framer Motion** (التأثيرات المتحركة)
- **Lucide React** (الرموز)

---

## 📝 ملاحظات هامة | Important Notes
- جميع النصوص تدعم العربية والإنجليزية
- التصميم مستجيب تماماً على جميع الأجهزة
- البيانات التجريبية كاملة وواقعية في جميع المكونات
- التأثيرات المرئية محسنة للأداء (GPU Acceleration)

