export interface RevenueData {
  month: string;
  amount: number;
}

export interface TrackData {
  name: string;
  value: number;
  color: string;
}

export interface Transaction {
  id: string;
  studentName: string;
  type: "Subscription" | "Service" | "Workshop";
  amount: number;
  date: string;
  status: "Completed" | "Pending" | "Refunded";
}

export interface InventoryItem {
  id: string;
  name: string;
  category: "Robotics" | "Electronics" | "3D Printing" | "CNC / Hardware" | "Tools";
  totalQty: number;
  availableQty: number;
  status: "available" | "limited" | "maintenance" | "out_of_stock";
  location: string;
  qrCode: string;
}

export interface Assignment {
  id: string;
  itemName: string;
  itemId: string;
  borrowerName: string;
  role: "Student" | "Instructor";
  borrowDate: string;
  expectedReturnDate: string;
  status: "active" | "overdue" | "returned";
}

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  track: "Robotics" | "IoT" | "CNC" | "AI / Software" | "Hardware";
  team: string[];
  status: "idea" | "prototyping" | "testing" | "completed";
  progress: number;
}

export interface LiveDevice {
  id: string;
  name: string;
  status: "idle" | "printing" | "cutting" | "offline";
  ping: number;
  load: number;
}

// ----------------------------------------------------
// Mock Data Objects
// ----------------------------------------------------

export const MOCK_REVENUE: RevenueData[] = [
  { month: "Jan", amount: 145000 },
  { month: "Feb", amount: 182000 },
  { month: "Mar", amount: 210000 },
  { month: "Apr", amount: 198000 },
  { month: "May", amount: 265000 },
  { month: "Jun", amount: 320000 },
];

export const MOCK_TRACKS: TrackData[] = [
  { name: "Robotics", value: 45, color: "#00e5ff" }, // cyber-cyan
  { name: "Electronics & IoT", value: 35, color: "#d500f9" }, // neon-purple
  { name: "3D & CNC Printing", value: 25, color: "#ff9100" }, // laser-amber
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "TX-9021",
    studentName: "Amine Bouaziz",
    type: "Subscription",
    amount: 8500,
    date: "2026-06-18",
    status: "Completed",
  },
  {
    id: "TX-9022",
    studentName: "Yasmine Haddad",
    type: "Service",
    amount: 12500,
    date: "2026-06-18",
    status: "Completed",
  },
  {
    id: "TX-9023",
    studentName: "Karim Benamar",
    type: "Workshop",
    amount: 4000,
    date: "2026-06-17",
    status: "Pending",
  },
  {
    id: "TX-9024",
    studentName: "Sara Merabet",
    type: "Subscription",
    amount: 8500,
    date: "2026-06-15",
    status: "Completed",
  },
  {
    id: "TX-9025",
    studentName: "Mohamed Belkacem",
    type: "Service",
    amount: 25000,
    date: "2026-06-14",
    status: "Completed",
  },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: "INV-ARD-01",
    name: "Arduino Uno R3 Starter Kit",
    category: "Electronics",
    totalQty: 25,
    availableQty: 18,
    status: "available",
    location: "Cabinet A-1",
    qrCode: "QR-ARD-01",
  },
  {
    id: "INV-RPY-04",
    name: "Raspberry Pi 4 Model B (4GB)",
    category: "Robotics",
    totalQty: 12,
    availableQty: 4,
    status: "limited",
    location: "Cabinet B-3",
    qrCode: "QR-RPY-04",
  },
  {
    id: "INV-3DP-CR",
    name: "Creality Ender-3 V3 3D Printer",
    category: "3D Printing",
    totalQty: 5,
    availableQty: 3,
    status: "available",
    location: "Zone-3D-A",
    qrCode: "QR-3DP-CR",
  },
  {
    id: "INV-CNC-30",
    name: "CNC 3018 Pro Engraving Machine",
    category: "CNC / Hardware",
    totalQty: 2,
    availableQty: 1,
    status: "maintenance",
    location: "Zone-CNC",
    qrCode: "QR-CNC-30",
  },
  {
    id: "INV-SOL-TS",
    name: "TS100 Smart Soldering Iron",
    category: "Tools",
    totalQty: 15,
    availableQty: 12,
    status: "available",
    location: "Workbench 2",
    qrCode: "QR-SOL-TS",
  },
  {
    id: "INV-LID-16",
    name: "RPLIDAR A2M8 360 Lidar Scanner",
    category: "Robotics",
    totalQty: 4,
    availableQty: 0,
    status: "out_of_stock",
    location: "Cabinet A-2",
    qrCode: "QR-LID-16",
  },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: "ASG-701",
    itemName: "Raspberry Pi 4 Model B",
    itemId: "INV-RPY-04",
    borrowerName: "Amine Bouaziz",
    role: "Student",
    borrowDate: "2026-06-10",
    expectedReturnDate: "2026-06-24",
    status: "active",
  },
  {
    id: "ASG-702",
    itemName: "TS100 Smart Soldering Iron",
    itemId: "INV-SOL-TS",
    borrowerName: "Yasmine Haddad",
    role: "Student",
    borrowDate: "2026-06-15",
    expectedReturnDate: "2026-06-20",
    status: "active",
  },
  {
    id: "ASG-703",
    itemName: "Arduino Uno R3 Starter Kit",
    itemId: "INV-ARD-01",
    borrowerName: "Anis Merah",
    role: "Student",
    borrowDate: "2026-06-01",
    expectedReturnDate: "2026-06-15",
    status: "overdue",
  },
  {
    id: "ASG-704",
    itemName: "CNC 3018 Pro Engraving Machine",
    itemId: "INV-CNC-30",
    borrowerName: "Prof. Lamine Touati",
    role: "Instructor",
    borrowDate: "2026-06-05",
    expectedReturnDate: "2026-06-12",
    status: "returned",
  },
];

export const MOCK_PROJECTS: ProjectCard[] = [
  {
    id: "PRJ-101",
    title: "Algerian Smart Agri-Drone",
    description: "Multi-spectral imaging drone for date palm monitoring in Biskra.",
    track: "Robotics",
    team: ["Amine Bouaziz", "Sara Merabet", "Anis Merah"],
    status: "prototyping",
    progress: 65,
  },
  {
    id: "PRJ-102",
    title: "Autonomous Chess Robot",
    description: "SCARA arm coupled with computer vision and stockfish to play chess.",
    track: "AI / Software",
    team: ["Yasmine Haddad", "Karim Benamar"],
    status: "testing",
    progress: 85,
  },
  {
    id: "PRJ-103",
    title: "CNC PCB Miller",
    description: "Modification of CNC 3018 for dry milling of high-density circuits.",
    track: "CNC",
    team: ["Meriem Bella", "Mohamed Belkacem"],
    status: "idea",
    progress: 10,
  },
  {
    id: "PRJ-104",
    title: "IoT Smart Home Hub",
    description: "Custom ESP32 board integrating LoraWAN sensors and HomeAssistant.",
    track: "IoT",
    team: ["Fatma Zohra", "Lamine Touati"],
    status: "completed",
    progress: 100,
  },
];

export const MOCK_LIVE_DEVICES: LiveDevice[] = [
  { id: "DEV-1", name: "Creality Ender 3D #1", status: "printing", ping: 12, load: 88 },
  { id: "DEV-2", name: "Creality Ender 3D #2", status: "idle", ping: 15, load: 0 },
  { id: "DEV-3", name: "CNC 3018 Router", status: "offline", ping: 0, load: 0 },
  { id: "DEV-4", name: "Laser Cutter 40W", status: "cutting", ping: 8, load: 92 },
];
