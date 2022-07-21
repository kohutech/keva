import React from 'react';

import './App.css'

import Accounts from './components/accounts/Accounts'
import DoubleEntry from './components/double-entry/DoubleEntry'
import Sidebar from './components/sidebar/Sidebar'

import { StateProp } from './state/state'

export default function App({ state }: StateProp) {
    return (

        <div className="flex-container app-viewport">
            <Sidebar state={ state } />

            { state.currentPage === 'double-entry' && <DoubleEntry state={ state } />}
            { state.currentPage === 'accounts' && <Accounts state={ state } />}
        </div>
  );
}
