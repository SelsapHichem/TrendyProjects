import React from 'react';
import { ErrorBoundary } from './common/components/ErrorBoundary';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto">
            <Dashboard />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;