import React from 'react';

import { classNames } from '../../util/util'
import { StateProp } from '../../state/state'

import './Sidebar.css'

export default function Sidebar({ state }: StateProp) {
    return (
        <div className='sidebar flex-container flex-column'>
            <a
                className={classNames({
                    'sidebar-button': true,
                    active: state.currentPage === 'double-entry'
                })}

                onClick={() => state.notify({ kind: 'set-page', page: 'double-entry' }) }
            >Double Entry</a>

            <a
                className={classNames({
                    'sidebar-button': true,
                    active: state.currentPage === 'accounts'
                })}

                onClick={() => state.notify({ kind: 'set-page', page: 'accounts' }) }
            >Accounts</a>
        </div>
  );
}
