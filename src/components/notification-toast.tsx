import { Bell } from "lucide-react"
import { toast } from "sonner"

export function showNotification(message: string) {
  toast(message, {
    icon: <Bell className="h-4 w-4" />,
    duration: 5000,
  })
}

