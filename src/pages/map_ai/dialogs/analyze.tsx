import React, { useState, useEffect } from 'react';
import theme from '../../../theme/theme';
import { X, PlusCircle, AlertTriangle, Sun, Moon } from 'lucide-react';
import axios from 'axios';

interface Analysis {
  id: number;
  title: string;
  imageUrl: string;
  insights: string;
  riskLevel: string;
  timestamp: string;
  origin: 'residential' | 'business' | 'flood'; // Added flood as origin type
  businessPotential?: string; // Added business potential prediction
}

interface AnalysisResponse {
  analyses: Analysis[];
}

interface AnalyzeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToAnalytics?: () => void;
  imageUrl?: string;
}

const AnalyzeDialog: React.FC<AnalyzeDialogProps> = ({
  isOpen,
  onClose,
  onAddToAnalytics,
  imageUrl
}) => {
  const { colors } = theme;
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [blueBackground, setBlueBackground] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      fetchRandomAnalysis();
    }
  }, [isOpen]);

  const fetchRandomAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get<AnalysisResponse>('/data/response.json');
      const { analyses } = response.data;
      
      if (analyses && analyses.length > 0) {
        // Get a random analysis
        const randomIndex = Math.floor(Math.random() * analyses.length);
        setAnalysis(analyses[randomIndex]);
      } else {
        setError('No analysis data available');
      }
    } catch (err) {
      setError('Failed to fetch analysis data');
      console.error('Error fetching analysis data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with blur effect instead of black background */}
      <div 
        className="fixed inset-0 backdrop-blur-md bg-opacity-30"
        onClick={onClose}
      ></div>
      
      {/* Dialog Content */}
      <div 
        className="rounded-lg shadow-xl z-10 max-w-3xl w-full mx-4 overflow-hidden"
        style={{ 
          maxHeight: '90vh',
          backgroundColor: blueBackground ? '#1a2b4a' : 'white' 
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: colors.tertiary }}
        >
          <h2 
            className="text-xl font-bold"
            style={{ color: blueBackground ? 'white' : colors.primary }}
          >
            {loading ? 'Loading Analysis...' : analysis?.title || 'AI Map Analysis'}
          </h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setBlueBackground(!blueBackground)}
              className="p-1 rounded-full hover:bg-gray-100 hover:bg-opacity-20"
              title={blueBackground ? "Switch to light theme" : "Switch to dark theme"}
            >
              {blueBackground ? 
                <Sun size={20} color="white" /> : 
                <Moon size={20} color={colors.text} />
              }
            </button>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 hover:bg-opacity-20"
            >
              <X size={20} color={blueBackground ? 'white' : colors.text} />
            </button>
          </div>
        </div>
        
        {/* Body with image */}
        <div 
          className="p-4 overflow-auto" 
          style={{ maxHeight: 'calc(90vh - 130px)' }}
        >
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: blueBackground ? 'white' : colors.primary }}></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <AlertTriangle size={32} color={blueBackground ? 'white' : colors.primary} className="mb-2" />
              <p style={{ color: blueBackground ? 'white' : colors.primary }}>{error}</p>
              <button 
                className="mt-4 px-4 py-2 rounded-md"
                style={{ backgroundColor: colors.secondary, color: colors.background }}
                onClick={fetchRandomAnalysis}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Smaller image container */}
              <div className="flex justify-center mb-4">
                <div className="rounded-lg overflow-hidden border w-1/2 max-w-xs" style={{ borderColor: colors.tertiary }}>
                  <img 
                    src={analysis?.imageUrl || imageUrl || '/images/ai_analysis_map.png'} 
                    alt="AI Analysis Visualization" 
                    className="w-full h-auto"
                  />

                  {/* Origin Legend */}
                  <div className="flex justify-end gap-4 p-2 bg-white bg-opacity-80">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs">Residential</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500 mr-1"></div>
                      <span className="text-xs">Business</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-red-500 mr-1"></div>
                      <span className="text-xs">Flood-Prone</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg" style={{ 
                backgroundColor: blueBackground ? '#2a3b5a' : colors.background,
                borderLeft: `4px solid ${
                  analysis?.origin === 'residential' ? 'green' : 
                  analysis?.origin === 'flood' ? 'red' : 'blue'
                }`
              }}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold" style={{ color: blueBackground ? 'white' : colors.primary }}>
                    <span className="mr-2">{
                      analysis?.origin === 'residential' ? '🏠' : 
                      analysis?.origin === 'flood' ? '🌊' : '🏢'
                    }</span>
                    Analysis Insights
                  </h3>
                  <span className="px-2 py-1 rounded-full text-sm" style={{ 
                    backgroundColor: 
                      analysis?.riskLevel === 'Critical' ? colors.primary : 
                      analysis?.riskLevel === 'High' ? colors.secondary : 
                      analysis?.riskLevel === 'Medium-High' ? colors.tertiary : 
                      analysis?.riskLevel === 'Medium' ? colors.background : 
                      '#FFFFFF',
                    color: 
                      ['Critical', 'High'].includes(analysis?.riskLevel || '') ? 
                      colors.background : blueBackground ? 'white' : colors.text
                  }}>
                    {analysis?.riskLevel || 'Unknown Risk'}
                  </span>
                </div>
                <p style={{ color: blueBackground ? 'white' : colors.text }}>
                  {analysis?.insights || 'No analysis data available.'}
                </p>
                
                {analysis?.businessPotential && (
                  <div className="mt-4 border-t pt-3" style={{ borderColor: blueBackground ? 'rgba(255,255,255,0.2)' : colors.tertiary }}>
                    <h4 className="font-medium mb-1" style={{ color: blueBackground ? 'white' : colors.primary }}>
                      Business Potential Assessment
                    </h4>
                    <p style={{ color: blueBackground ? 'white' : colors.text }}>{analysis.businessPotential}</p>
                  </div>
                )}
                
                {analysis?.timestamp && (
                  <p className="text-xs mt-3" style={{ color: blueBackground ? 'rgba(255,255,255,0.7)' : colors.mutedText }}>
                    Analysis generated: {new Date(analysis.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* Footer Actions */}
        <div 
          className="flex justify-end gap-3 p-4 border-t"
          style={{ borderColor: blueBackground ? 'rgba(255,255,255,0.2)' : colors.tertiary }}
        >
          <button
            className="px-4 py-2 rounded-md"
            style={{
              backgroundColor: blueBackground ? 'rgba(255,255,255,0.1)' : 'white',
              color: blueBackground ? 'white' : colors.text,
              border: blueBackground ? '1px solid rgba(255,255,255,0.2)' : `1px solid ${colors.tertiary}`
            }}
            onClick={onClose}
          >
            Close
          </button>
          
          <button
            className="px-4 py-2 rounded-md flex items-center gap-2"
            style={{
              backgroundColor: colors.secondary,
              color: colors.background
            }}
            onClick={() => {
              if (onAddToAnalytics) {
                onAddToAnalytics();
              }
            }}
          >
            <PlusCircle size={18} />
            Add to Analytics
          </button>
          
          <button
            className="px-4 py-2 rounded-md"
            style={{
              backgroundColor: colors.primary,
              color: colors.background
            }}
            onClick={fetchRandomAnalysis}
            disabled={loading}
          >
            Generate New Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeDialog;
