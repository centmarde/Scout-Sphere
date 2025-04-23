import React, { useState } from 'react';
import theme from '../../theme/theme';
import { Map, Landmark, Droplets, PlusSquare, HelpCircle } from 'lucide-react';
import AddHeritageDialog from './dialogs/add_heritage';
import HelpDialog from './dialogs/help_dialog';

export type MapType = 'standard' | 'heritage' | 'flood';

interface MapTabsProps {
  currentMapType: MapType;
  heritageVisible: boolean;
  floodVisible: boolean;
  onSwitchToStandard: () => void;
  onToggleHeritage: () => void;
  onToggleFlood: () => void;
  onAddHeritage?: () => void;
  onHelp?: () => void;
}

const MapTabs: React.FC<MapTabsProps> = ({
  currentMapType,
  heritageVisible,
  floodVisible,
  onSwitchToStandard,
  onToggleHeritage,
  onToggleFlood,
  onAddHeritage,
  onHelp,
}) => {
  const { colors } = theme;
  const [isHeritageDialogOpen, setIsHeritageDialogOpen] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  
  const handleToggleHeritage = () => {
    onToggleHeritage();
    if (currentMapType === 'standard' && !heritageVisible) {
      setIsHeritageDialogOpen(true);
    }
  };

  const handleAddHeritage = () => {
    if (onAddHeritage) {
      onAddHeritage();
    }
    setIsHeritageDialogOpen(true);
    // No longer opening help dialog here
  };

  const handleHelp = () => {
    if (onHelp) {
      onHelp();
    }
    setIsHelpDialogOpen(true);
  };

  return (
    <>
      <div className="flex mb-4 justify-between">
        <div className="flex gap-4">
          <button
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{
              backgroundColor: currentMapType === 'standard' ? colors.primary : 'white',
              color: currentMapType === 'standard' ? colors.background : colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={onSwitchToStandard}
          >
            <Map size={18} />
            Standard Map
          </button>
          
          <button
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{
              backgroundColor: currentMapType === 'heritage' || (currentMapType === 'standard' && heritageVisible) 
                ? colors.primary 
                : 'white',
              color: currentMapType === 'heritage' || (currentMapType === 'standard' && heritageVisible)
                ? colors.background 
                : colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={handleToggleHeritage}
          >
            <Landmark size={18} />
            Heritage Sites {heritageVisible ? '(Visible)' : '(Hidden)'}
          </button>
          
          <button
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{
              backgroundColor: currentMapType === 'flood' || (currentMapType === 'standard' && floodVisible) 
                ? colors.primary 
                : 'white',
              color: currentMapType === 'flood' || (currentMapType === 'standard' && floodVisible)
                ? colors.background 
                : colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={onToggleFlood}
          >
            <Droplets size={18} />
            Flood Zones {floodVisible ? '(Visible)' : '(Hidden)'}
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{
              backgroundColor: colors.secondary,
              color: 'white',
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={handleAddHeritage}
          >
            <PlusSquare size={18} />
            Add Heritage
          </button>
          
          <button
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{
              backgroundColor: 'white',
              color: colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={handleHelp}
          >
            <HelpCircle size={18} />
            Help
          </button>
        </div>
      </div>

      <AddHeritageDialog 
        isOpen={isHeritageDialogOpen} 
        onClose={() => setIsHeritageDialogOpen(false)}
        onConfirm={() => {
          // Handle the confirmation logic
          setIsHeritageDialogOpen(false);
        }}
        polygonId={1} // You may need to pass the actual polygon ID dynamically
      />

      <HelpDialog 
        isOpen={isHelpDialogOpen} 
        onClose={() => setIsHelpDialogOpen(false)} 
      />
    </>
  );
};

export default MapTabs;
