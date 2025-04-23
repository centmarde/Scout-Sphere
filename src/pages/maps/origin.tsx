import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/default';
import MapPreview from './map_preview';
import { ThemeProvider } from '../../theme/theme';
import theme from '../../theme/theme';
import axios from 'axios';

const OriginMap: React.FC = () => {
  const [location] = useState({ lat: 8.97, lng: 125.42 });
  const [zoom] = useState(15);
  const [markers] = useState([
    { lat: 8.97, lng: 125.42, title: 'Heritage Site Reference' },
  ]);
  
  // State to store polygon data - only heritage polygons
  const [heritagePolygons, setHeritagePolygons] = useState<Array<{
    paths: Array<{ lat: number; lng: number }>;
    options?: any;
    id?: number;
    name?: string;
  }>>([]);

  const [loading, setLoading] = useState<boolean>(false);

  // Fetch only heritage polygons data on component mount
  useEffect(() => {
    const fetchHeritagePolygons = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/data/maps.json');
        if (response.data && response.data.polygons) {
          // Set heritage-specific options
          const heritageData = response.data.polygons.map((polygon: any) => ({
            ...polygon,
            options: {
              fillColor: "#2ecc71",
              strokeColor: "#27ae60",
              fillOpacity: 0.3,
              strokeWeight: 2
            }
          }));
          setHeritagePolygons(heritageData);
        }
      } catch (error) {
        console.error('Error fetching heritage polygon data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHeritagePolygons();
  }, []);

  const { colors } = theme;

  return (
    <ThemeProvider>
      <DefaultLayout>
        <div className="mx-auto max-w-7xl w-full">
          <h1 
            className="text-3xl font-bold mb-6"
            style={{ color: colors.primary }}
          >
            Heritage Sites Map
          </h1>
          
          <div 
            className="mb-8 rounded-lg overflow-hidden shadow"
            style={{ borderColor: colors.tertiary }}
          >
            <MapPreview
              center={location}
              zoom={zoom}
              height="500px"
              width="100%"
              markers={markers}
              polygons={heritagePolygons}
              enableDrawing={false}
            />
          </div>
          
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-lg">
              <div 
                className="px-8 py-4 rounded shadow-md font-bold"
                style={{ 
                  backgroundColor: colors.background,
                  color: colors.primary
                }}
              >
                Loading heritage site data...
              </div>
            </div>
          )}
          
          {/* Map Legend */}
          <div 
            className="p-4 rounded-lg flex items-center gap-5"
            style={{ 
              backgroundColor: colors.background,
              borderColor: colors.tertiary,
              border: '1px solid'
            }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 border border-gray-300"
                style={{ backgroundColor: "#2ecc71" }}
              />
              <span style={{ color: colors.text }}>
                Heritage Sites
              </span>
            </div>
          </div>
          
          <div 
            className="p-4 rounded-lg mt-4"
            style={{ 
              backgroundColor: colors.background,
              borderColor: colors.tertiary,
              border: '1px solid'
            }}
          >
            <p style={{ color: colors.text, lineHeight: '1.5' }}>
              Viewing location: 8°58′N 125°25′E (Philippines)
              <br />
              Displaying {heritagePolygons.length} heritage site polygons.
            </p>
          </div>
        </div>
      </DefaultLayout>
    </ThemeProvider>
  );
};

export default OriginMap;
