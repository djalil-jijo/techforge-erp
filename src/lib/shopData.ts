// ============================
// بيانات المتجر - منتجات FabLab
// ============================

export type ProductCategory =
  | "روبوتيك"
  | "إلكترونيك"
  | "طباعة ثلاثية الأبعاد"
  | "لوحات تحكم"
  | "أدوات تعليمية"
  | "ديكور تقني";

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDesc: string;
  price: number;
  category: ProductCategory;
  stock: number;
  image: string; // emoji placeholder
  badge?: string;
  specs?: string[];
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "p001",
    name: "ذراع روبوتية مصغّرة - 4 محاور",
    shortDesc: "ذراع روبوتية قابلة للبرمجة بـ Arduino، 4 محاور، مثالية للتعلم",
    description:
      "ذراع روبوتية مصنوعة بالطباعة الثلاثية الأبعاد في FabLab TechForge، تعمل بمحركات سيرفو عالية الدقة وتُتحكم بها عبر Arduino Mega 2560. تُعدّ مثالية لتعلّم أساسيات الروبوتيك الصناعي والبرمجة التشابكية. جميع أجزائها مطبوعة من مادة PETG الصلبة في مختبرنا.",
    price: 12500,
    category: "روبوتيك",
    stock: 8,
    image: "🦾",
    badge: "الأكثر مبيعاً",
    featured: true,
    specs: [
      "4 محاور حركة مستقلة",
      "محركات سيرفو MG996R",
      "توافق كامل مع Arduino",
      "حمولة قصوى 500g",
      "مادة PETG صلبة",
    ],
  },
  {
    id: "p002",
    name: "لوحة توسعة IoT Shield - ESP32",
    shortDesc: "لوحة توسعة متخصصة لـ ESP32 مع كل ما تحتاجه لمشاريع IoT",
    description:
      "لوحة PCB مصممة ومصنوعة يدوياً داخل FabLab، تعمل كدرع توسعة لـ ESP32-WROOM. تحتوي على مقابس لأجهزة الاستشعار DHT22 وBMP280، مدخل بطارية ليثيوم، ومحوّل جهد متكامل. تُصنّع بآلة CNC الخاصة بمختبرنا.",
    price: 3800,
    category: "لوحات تحكم",
    stock: 22,
    image: "🖥️",
    badge: "جديد",
    featured: true,
    specs: [
      "متوافقة مع ESP32-WROOM-32",
      "مداخل DHT22 / BME280",
      "مدخل بطارية LiPo 3.7V",
      "مدخلان I2C خارجيان",
      "أبعاد: 70×55mm",
    ],
  },
  {
    id: "p003",
    name: "سيارة روبوتية تعليمية - Line Follower",
    shortDesc: "سيارة روبوتية متكاملة تتبع الخط تلقائياً، مع كود مفتوح المصدر",
    description:
      "مجموعة سيارة روبوتية تتبع الخط مصنوعة داخل FabLab، تحتوي على هيكل PLA مطبوع ثلاثياً، لوحة Arduino UNO، 5 مستشعرات IR، قاعدة محركات L298N، وعجلات معدنية. تُباع مع كود مصدري كامل وشرح خطوة بخطوة.",
    price: 7200,
    category: "روبوتيك",
    stock: 15,
    image: "🏎️",
    specs: [
      "هيكل PLA مطبوع ثلاثياً",
      "5 مستشعرات IR عالية الدقة",
      "قاعدة محركات L298N",
      "بطارية 9V مدمجة",
      "كود مصدري كامل مع شرح",
    ],
  },
  {
    id: "p004",
    name: "نموذج طباعة 3D مخصص - حسب الطلب",
    shortDesc: "نماذج ثلاثية الأبعاد مخصصة بمادتك واللون الذي تريده",
    description:
      "خدمة طباعة ثلاثية الأبعاد مخصصة من مختبر FabLab. أرسل لنا ملف STL الخاص بك أو فكرتك، وسنقوم بطباعة نموذجك بدقة 0.1mm بمواد متعددة الاختيار (PLA، PETG، TPU). السعر للحجم القياسي 10×10×10 cm.",
    price: 1500,
    category: "طباعة ثلاثية الأبعاد",
    stock: 99,
    image: "🔷",
    badge: "مخصص",
    specs: [
      "دقة طباعة 0.1mm",
      "مواد: PLA / PETG / TPU",
      "ألوان: 12 لون متاح",
      "حجم أقصى: 20×20×20 cm",
      "مدة التسليم: 3-5 أيام",
    ],
  },
  {
    id: "p005",
    name: "ساعة ذكية DIY - OLED + RTC",
    shortDesc: "مشروع ساعة ذكية كاملة بشاشة OLED وموديول الوقت الحقيقي",
    description:
      "مشروع ساعة رقمية ذكية قابلة للتجميع، تحتوي على شاشة OLED 0.96 بوصة، موديول DS3231 للوقت الحقيقي، وهيكل أكريليك مقطوع بليزر في FabLab. تأتي مع جميع المكونات والتعليمات التفصيلية لتجميعها وبرمجتها بنفسك.",
    price: 2900,
    category: "أدوات تعليمية",
    stock: 30,
    image: "⌚",
    specs: [
      "شاشة OLED 0.96 بوصة",
      "موديول RTC DS3231",
      "هيكل أكريليك مقطوع بليزر",
      "بطارية CR2032 مدمجة",
      "كود Arduino مفتوح المصدر",
    ],
  },
  {
    id: "p006",
    name: "لوحة كنترول LED قابلة للبرمجة",
    shortDesc: "لوحة LED RGB 8×8 مع وحدة تحكم Arduino Mini قابلة للبرمجة",
    description:
      "لوحة LED RGB بمصفوفة 8×8 مع لوحة Arduino Pro Mini مدمجة، تُتيح عرض النصوص والرسوم المتحركة بسهولة. مثالية لمشاريع الطلاب ومعارض العلوم. مصنوعة يدوياً في FabLab مع ضمان الجودة.",
    price: 4100,
    category: "إلكترونيك",
    stock: 18,
    image: "💡",
    specs: [
      "مصفوفة LED 8×8 RGB",
      "Arduino Pro Mini مدمج",
      "إمكانية التحكم اللاسلكي",
      "مكتبة برمجة جاهزة",
      "جهد التشغيل: 5V USB",
    ],
  },
  {
    id: "p007",
    name: "إطار ديكور تقني - TechForge Logo",
    shortDesc: "إطار ديكوري أكريليك منقوش بالليزر بشعار TechForge",
    description:
      "قطعة ديكور تقنية مصنوعة من الأكريليك الشفاف سماكة 4mm، منقوشة بليزر CO2 بشعار TechForge. مع إضاءة LED من الحواف للمنحها مظهراً تقنياً رائعاً. أبعاد: 20×15 cm. رائعة لتزيين مكتبك أو مكتب عملك.",
    price: 1800,
    category: "ديكور تقني",
    stock: 45,
    image: "🏅",
    badge: "هدية مثالية",
    featured: true,
    specs: [
      "أكريليك شفاف 4mm",
      "نقش ليزر دقيق",
      "إضاءة LED RGB جانبية",
      "أبعاد: 20×15 cm",
      "يأتي مع حامل معدني",
    ],
  },
  {
    id: "p008",
    name: "كيت تعلم الإلكترونيك للمبتدئين",
    shortDesc: "كل ما تحتاجه لبدء رحلتك في عالم الإلكترونيك والبرمجة",
    description:
      "مجموعة تعليمية شاملة لمبتدئي الإلكترونيك، تحتوي على: Arduino UNO، لوحة تجارب Breadboard، 200+ قطعة إلكترونية مصنّفة، أسلاك توصيل، و10 مشاريع عملية تدريجية مع شرح مفصّل بالعربية. معتمدة من فريق التدريس في TechForge.",
    price: 5600,
    category: "أدوات تعليمية",
    stock: 12,
    image: "🎓",
    badge: "موصى به",
    featured: true,
    specs: [
      "Arduino UNO أصلي",
      "+200 قطعة إلكترونية",
      "Breadboard 830 نقطة",
      "10 مشاريع تدريجية بالعربية",
      "دعم فني من فريق TechForge",
    ],
  },
];

export const CATEGORIES: ProductCategory[] = [
  "روبوتيك",
  "إلكترونيك",
  "طباعة ثلاثية الأبعاد",
  "لوحات تحكم",
  "أدوات تعليمية",
  "ديكور تقني",
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("ar-DZ") + " دج";
}
