import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// تنسيق الأرقام بصيغة عربية
export function formatNumberAr(num: number): string {
  return num.toLocaleString('ar-DZ')
}

// تنسيق التاريخ بصيغة عربية
export function formatDateAr(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('ar-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

// تنسيق العملة بصيغة جزائرية
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ar-DZ', {
    style: 'currency',
    currency: 'DZD',
  }).format(amount)
}

// حساب نسبة التوفر
export function calculateAvailabilityPercentage(available: number, total: number): number {
  return Math.round((available / total) * 100)
}

// الحصول على لون الحالة
export function getStatusColor(status: string): string {
  switch (status) {
    case 'نشط':
    case 'جاهز':
    case 'Completed':
      return 'text-emerald-glow'
    case 'معلق':
    case 'في الصيانة':
    case 'Pending':
      return 'text-laser-amber'
    case 'معطل':
    case 'overdue':
    case 'Failed':
      return 'text-neon-red'
    default:
      return 'text-gray-400'
  }
}

// اختبار إذا كانت العهدة متأخرة
export function isOverdue(expectedReturnDate: string): boolean {
  return new Date(expectedReturnDate) < new Date()
}

// الحصول على باقي الوقت
export function getDaysRemaining(returnDate: string): number {
  const today = new Date()
  const return_date = new Date(returnDate)
  const diffTime = return_date.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
