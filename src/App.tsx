import { useState } from 'react'
import InfiniteScrollList from '@/components/regular/InfiniteScrollList'
import VirtualizedInfiniteScrollList from '@/components/virtualized/VirtualizedInfiniteScrollList'
import './App.css'

function App() {
  const [useVirtualization, setUseVirtualization] = useState(false)

  return (
    <div className="app">
      <div className="toggle-container">
        <button 
          onClick={() => setUseVirtualization(!useVirtualization)}
          className="toggle-button"
        >
          Switch to {useVirtualization ? 'Regular' : 'Virtualized'} Mode
        </button>
        <p className="toggle-description">
          {useVirtualization 
            ? '🚀 Virtualized: Only visible items are rendered for better performance' 
            : '📜 Regular: All loaded items are rendered in DOM'}
        </p>
      </div>
      
      {useVirtualization ? (
        <VirtualizedInfiniteScrollList />
      ) : (
        <InfiniteScrollList />
      )}
    </div>
  )
}

export default App
