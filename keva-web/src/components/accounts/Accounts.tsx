import React, { useState } from 'react';

import { classNames } from '../../util/util'
import { StateProp, Account, uuidv4 } from '../../state/state'

import { CheckIcon, XIcon } from '@primer/octicons-react'

import './Accounts.css'

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function AccountRow({ acc, onDelete, onCommit }: { acc: NewAccount, onDelete: (id: Account) => void, onCommit: (acc: Account, isNew: boolean) => void }) {
    const [edit, setEdit] = useState(!!acc.isNew);

    const [nom, setNom] = useState(acc.nom);
    const [description, setDescription] = useState(acc.description);
    const [type, setType] = useState(acc.type || 'active');

    const commit = () => {
        if (edit) {
            setEdit(false);
            onCommit({ id: acc.id,  nom, description, type }, !!acc.isNew);
        } else {
            onDelete(acc);
        }
    }

    return (
        <tr
            onClick={ () => !edit && setEdit(true) }
            className={ classNames({
                edit: edit
            })
        }>
            <th scope="row">
            {
                !edit
                    ? acc.nom
                    : <input type="text" value={ nom } className="form-control xs"
                        placeholder="nom" aria-label="Account nom"
                        onChange={e => setNom(e.target.value)} />
            }
            </th>

            <td>
            {
                !edit
                    ? acc.description
                    : <input type="text" value={ description } className="form-control xs"
                        placeholder="description" aria-label="Account description"
                        onChange={e => setDescription(e.target.value)} />
            }
            </td>

            <td>
            {
                !edit
                    ? acc.type
                    : <select value={ type } className="form-control xs"
                        placeholder="id" aria-label="Account type"
                        onChange={e => setType(e.target.value as ('active' | 'passive'))} >
                            <option value='active'>active</option>
                            <option value='passive'>passive</option>
                        </select>
            }
            </td>

            <td className='action-cell'>
                <div onClick={() => commit()} >
            { edit
                ? <CheckIcon className="yes-icon" />
                : <XIcon className="x-icon" />
            }
            </div>
            </td>
        </tr>
    );
}

function width(w: string) {
    return {
        width: w,
        maxWidth: w
    };
}

type NewAccount = Account & { isNew?: true }

export default function Accounts({ state }: StateProp) {
    const [newAccs, setNewAccs] = useState<NewAccount[]>([]);

    const onDelete = (account: NewAccount) => state.notify({ kind: 'delete-account', account });
    const onCommit = (account: NewAccount, isNew: boolean) => {
        if (isNew) {
            setNewAccs(accs => accs.filter(x => x.id !== account.id));
        }

        state.notify({ kind: isNew ? 'add-account' : 'update-account', account });
    };

    const accountRows = state.accounts.concat(newAccs)
        .map(acc => (<AccountRow acc={ acc } onCommit={ onCommit } onDelete={ onDelete } key={ acc.id } />));

    return (
        <div className="add-account-main flex-column">
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" style={ width('15%') }>#</th>
                            <th scope="col">Description</th>
                            <th scope="col" style={ width('20%') }>Type</th>
                            <th scope="col" style={ width('40px') }></th>
                        </tr>
                    </thead>
                    <tbody>
                        { accountRows.length
                            ? accountRows
                            : <h2>Sorry, no accounts available</h2>
                        }
                    </tbody>
                </table>
            </div>
            <a className="add-account-btn"
                onClick={ () => setNewAccs(old => [ ...old, {
                    id: uuidv4(),
                    nom: '',
                    description: '',
                    type: '' as any,
                    isNew: true
                } ]) }>
                Add account
            </a>
        </div>
  );
}

