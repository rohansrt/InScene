import {
  Beaker, BookOpen, CalendarClock, ChartColumn, ClipboardList, CloudRain, Database, Droplets, FileWarning, Fish,
  FlaskConical, Footprints, GlassWater, House, Landmark, Megaphone, MessageSquareWarning, MessagesSquare, Microscope,
  Recycle, ScanFace, ShoppingCart, Smartphone, Sparkles, Store, Sun, Timer, TrafficCone, Trash2, TrendingUp, Trophy,
  Users, Video, Wallet, Wrench, Zap, type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  megaphone: Megaphone,
  messages: MessagesSquare,
  home: House,
  smartphone: Smartphone,
  traffic: TrafficCone,
  droplets: Droplets,
  glass: GlassWater,
  flask: FlaskConical,
  cart: ShoppingCart,
  book: BookOpen,
  trash: Trash2,
  users: Users,
  'message-alert': MessageSquareWarning,
  footprints: Footprints,
  trophy: Trophy,
  wrench: Wrench,
  zap: Zap,
  fish: Fish,
  chart: ChartColumn,
  rain: CloudRain,
  recycle: Recycle,
  video: Video,
  clipboard: ClipboardList,
  timer: Timer,
  'file-warning': FileWarning,
  beaker: Beaker,
  sun: Sun,
  microscope: Microscope,
  database: Database,
  landmark: Landmark,
  trending: TrendingUp,
  wallet: Wallet,
  store: Store,
  scan: ScanFace,
  calendar: CalendarClock,
}

export function SimulationIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Sparkles
  return <Icon className={className} aria-hidden="true" strokeWidth={1.6} />
}
