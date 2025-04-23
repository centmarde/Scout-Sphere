"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import theme from "@/theme/theme"

interface TabsProps {
  heritageMaintenanceComponent: React.ReactNode;
  addHeritageComponent: React.ReactNode;
}

export default function MaintenanceTabs({ 
  heritageMaintenanceComponent, 
  addHeritageComponent 
}: TabsProps) {
  const { colors } = theme;
  const [activeTab, setActiveTab] = useState<'heritage-maintenance' | 'add-heritage'>('heritage-maintenance');
  
  return (
    <div className="w-full">
      <div className="flex mb-4 justify-end">
        <div className="flex gap-2">
          <Button 
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{ 
              backgroundColor: activeTab === 'heritage-maintenance' ? colors.secondary : 'white',
              color: activeTab === 'heritage-maintenance' ? 'white' : colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={() => setActiveTab('heritage-maintenance')}
          >
            Heritage Maintenance
          </Button>
          <Button 
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{ 
              backgroundColor: activeTab === 'add-heritage' ? colors.secondary : 'white',
              color: activeTab === 'add-heritage' ? 'white' : colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={() => setActiveTab('add-heritage')}
          >
            Add Heritage
          </Button>
        </div>
      </div>
      
      {activeTab === 'heritage-maintenance' && (
        <div className="tab-content">
          {heritageMaintenanceComponent}
        </div>
      )}
      
      {activeTab === 'add-heritage' && (
        <div className="tab-content">
          {addHeritageComponent}
        </div>
      )}
    </div>
  );
}
