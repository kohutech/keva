
export type State = {
    currentPage: Pages,
    accounts: Account[],

    notify: (evt: KevaEvent) => void
};

export type StateProp = {
    state: State
}

export type Account = {
    id: string,
    nom: string,
    description: string,
    type: 'active' | 'passive'
}

type Pages = 'double-entry' | 'accounts'

type KevaEvent = { kind: 'set-page', page: Pages }
               | { kind: 'add-account', account: Account }
               | { kind: 'update-account', account: Account }
               | { kind: 'delete-account', account: Account }

export function eventLoop(render: (state: State) => void) {
    const state: State = {
        currentPage: 'double-entry',
        accounts: [
            {
                id: uuidv4(),
                nom: '601',
                description: 'Lousy account',
                type: 'active'
            }
        ],

        notify: evt => handleEvent(evt, state, render)
    };

    render(state);
}

function handleEvent(evt: KevaEvent, state: State, render: (state: State) => void) {
    switch (evt.kind) {
        case 'set-page': {
            const newState: State = {
                ... state,
                notify: evt => handleEvent(evt, newState, render),

                currentPage: evt.page
            };

            return render(newState);
        }

        case 'add-account': {
            const newState: State = {
                ... state,
                notify: evt => handleEvent(evt, newState, render),

                accounts: state.accounts.concat([ evt.account ])
            };

            return render(newState);
        }

        case 'update-account': {
            const newState: State = {
                ... state,
                notify: evt => handleEvent(evt, newState, render),

                accounts: state.accounts.map(x => x.id === evt.account.id ? evt.account : x)

            };

            return render(newState);
        }

        case 'delete-account': {
            const newState: State = {
                ... state,
                notify: evt => handleEvent(evt, newState, render),

                accounts: state.accounts.filter(x => x.id !== evt.account.id)

            };

            return render(newState);
        }
    }
}

export function uuidv4() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, cc => {
        const c = Number(cc);
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
}
