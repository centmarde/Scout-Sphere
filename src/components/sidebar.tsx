"use client"

import * as React from "react"
import { Bell, Box, Home, LogOut, Menu, Settings, PenToolIcon as Tool, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import theme from "@/theme/theme"

interface MainSidebarProps extends React.ComponentPropsWithoutRef<"div"> {
  isMobile?: boolean;
}

export function MainSidebar({ isMobile = false, className, ...props }: MainSidebarProps) {
  const [activeTab, setActiveTab] = React.useState("dashboard")
  const [notificationCount, setNotificationCount] = React.useState(3)
  const [isOpen, setIsOpen] = React.useState(false)
  
  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    if (isMobile) setIsOpen(false)
  }

  const handleNotificationClick = () => {
    setNotificationCount(0)
  }

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "#",
    },
    {
      id: "packages",
      label: "Packages",
      icon: Box,
      href: "#",
    },
    {
      id: "maintenance",
      label: "Maintenance",
      icon: Tool,
      href: "#",
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      href: "#",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "#",
    },
  ]

  // Get the current active item
  const activeItem = navItems.find(item => item.id === activeTab);

  if (isMobile) {
    return (
      <>
        {/* Mobile header with burger menu */}
        <div 
          className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-3"
          style={{ 
            backgroundColor: theme.colors.background, 
            borderBottom: `1px solid ${theme.colors.tertiary}`
          }}
          {...props}
        >
          {/* Burger menu button */}
          <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(!drawerOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Page title instead of breadcrumbs */}
          <h2 className="text-base font-medium" style={{ color: theme.colors.text }}>
            {activeItem?.label || 'Dashboard'}
          </h2>
          
          {/* Notification button */}
          <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
            <div className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-bold">
                  {notificationCount}
                </span>
              )}
            </div>
          </Button>
        </div>

        {/* Mobile drawer overlay */}
        {drawerOpen && (
          <div 
            className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 z-30"
            onClick={() => setDrawerOpen(false)}
          />
        )}
        
        {/* Mobile sidebar drawer */}
        <div 
          className={`fixed top-0 left-0 bottom-0 w-[260px] z-40 transform transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ backgroundColor: theme.colors.background }}
        >
          <div className="flex justify-between items-center p-4" style={{ borderBottom: `1px solid ${theme.colors.tertiary}` }}>
            <h1 className="text-xl font-bold" style={{ color: theme.colors.primary }}>Admin Panel</h1>
            <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-60px)]">
            <nav className="flex flex-col p-2">
              {navItems.map((item) => (
                <div key={item.id} className="mb-1">
                  <a 
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors"
                    style={{
                      backgroundColor: activeTab === item.id ? theme.colors.primary : 'transparent',
                      color: activeTab === item.id ? theme.colors.background : theme.colors.text
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick(item.id);
                      setDrawerOpen(false);
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </div>
              ))}
            </nav>
          </div>
          
          <div className="absolute bottom-0 w-full p-4" style={{ borderTop: `1px solid ${theme.colors.tertiary}` }}>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => console.log("Logout clicked")}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
        
        {/* Content area padding to account for fixed header and tabs */}
        <div className="pt-[104px]" /> {/* 56px for header + 48px for tabs */}
      </>
    );
  }
  
  return (
    <div 
      className="flex flex-col h-screen relative w-[280px] overflow-hidden" 
      style={{ 
        backgroundColor: theme.colors.background, 
        borderRight: `1px solid ${theme.colors.tertiary}`
      }}
      {...props}
    >
      <div className="p-4" style={{ color: theme.colors.primary }}>
        <h1 className="text-xl font-bold text-center">Admin Panel</h1>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <div key={item.id} className="mb-1">
              <a 
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors"
                style={{
                  backgroundColor: activeTab === item.id ? theme.colors.primary : 'transparent',
                  color: activeTab === item.id ? theme.colors.background : theme.colors.text
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(item.id);
                }}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </div>
          ))}
        </nav>
      </div>
      <div className="p-4" style={{ borderTop: `1px solid ${theme.colors.tertiary}` }}>
        <Button variant="outline" className="w-full justify-start gap-2" onClick={() => console.log("Logout clicked")}>
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
      <div className="absolute top-0 bottom-0 left-0 w-1" style={{ backgroundColor: theme.colors.secondary }}></div>
    </div>
  )
}

export default MainSidebar;
