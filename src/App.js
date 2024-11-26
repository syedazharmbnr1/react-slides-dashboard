import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, Network, BarChart2, Activity } from 'lucide-react';
import DetailedTimelineSlide from './components/DetailedTimelineSlide';
import NetworkDashboard from './components/NetworkDashboard';
import CSVProcessor from './components/CSVProcessor';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside
          className={`${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'relative'} 
            ${isMobile && !isSidebarOpen ? '-translate-x-full' : ''}
            w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out`}
        >
          <div className="h-16 flex items-center px-4 border-b border-gray-200">
            <Network className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold ml-2">Network Hub</span>
          </div>
          
          <nav className="flex-1 py-4 px-3 space-y-1">
            <Link to="/" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <BarChart2 className="h-5 w-5 mr-3" />
              Timeline
            </Link>
            <Link to="/dashboard" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Activity className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link to="/analysis" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Menu className="h-5 w-5 mr-3" />
              Analysis
            </Link>
          </nav>
        </aside>

        {/* Mobile overlay */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<DetailedTimelineSlide />} />
              <Route path="/dashboard" element={<NetworkDashboard />} />
              <Route path="/analysis" element={<CSVProcessor />} />
            </Routes>
          </div>
        </main>

        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="fixed bottom-4 right-4 p-3 rounded-full bg-blue-600 text-white shadow-lg z-50"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;