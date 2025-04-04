"use client"

import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Bell, LogOut} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {connectToWebSocket} from "@/lib/websocket-instance"
import {logout} from "@/lib/api/user";

interface User {
  email: string
}

interface Notification {
  id: string
  message: string
  timestamp: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const initSocket = async () => {
      const newSocket = await connectToWebSocket();
      setSocket(newSocket);
    }
    initSocket();
  }, []);

  useEffect(() => {
    // Listen for user registration events
    if (socket) {
      socket.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log(data);
          const newNotification = {
            id: data.userId,
            message: data.message,
            timestamp: new Date().toISOString(),
          }
          setNotifications((prev) => [newNotification, ...prev])
        } catch (error) {
          console.error('Failed to parse WebSocket message', error);
        }
      });
    }

    // Clean up on unmount
    return () => {
      if (socket ) {
        socket.close();
      }
    };
  }, [socket])

  // Simulate WebSocket connection and notifications
  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("user")

    if (!userStr) {
      router.push("/login")
      return
    }

    try {
      const userData = JSON.parse(userStr)
      setUser(userData)

    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const handleLogout = async () => {
    if (socket) {
      socket.close();
    }
    await logout()
    router.push("/")
  }

  if (!user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between py-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              {user.email}
            </Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4"/>
              Logout
            </Button>
          </div>
        </header>

        <main className="grid gap-6 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to your dashboard</CardTitle>
              <CardDescription>
                You are now logged in and will receive real-time notifications when new users
                register.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is a simple dashboard demonstrating real-time notifications.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Note: In this frontend-only demo, we&#39;re simulating notifications every 15 seconds.
                In a real
                application, these would come from a WebSocket connection to your backend.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5"/>
                Notifications
              </CardTitle>
              <CardDescription>Real-time updates when new users register</CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <ul className="space-y-2">
                  {notifications.map((notification, id) => (
                    <li key={id} className="rounded-md border p-3 text-sm">
                      <div className="flex justify-between">
                        <span>{notification.message}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">
                  No notifications yet. When new users register, you&#39;ll see them here.
                </p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

