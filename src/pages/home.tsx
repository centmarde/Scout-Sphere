"use client"

import React from "react"
import DefaultLayout from "@/layout/default"

export default function HomePage() {
  return (
    <DefaultLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">2,543</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">$45,234</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium">JS</span>
                </div>
                <div>
                  <p className="text-sm font-medium">John Smith updated a project</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium">AD</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Alice Davis sent a message</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium">RW</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Robert Wilson completed a task</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm">Review new designs</p>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Today</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Team meeting</p>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Tomorrow</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Project deadline</p>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Urgent</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Budget review</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Next week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
