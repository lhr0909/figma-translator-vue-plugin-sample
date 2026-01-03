/**
 * Copyright 2023 LINE Corporation
 *
 * LINE Corporation licenses this file to you under the Apache License,
 * version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at:
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';

const StoreContext = createContext(null);

const languages = [
    {key: 'en', text: 'English'},
    {key: 'ja', text: 'Japanese'},
    {key: 'es', text: 'Spanish'},
    {key: 'fr', text: 'French'},
    {key: 'de', text: 'German'},
    {key: 'zh', text: 'Chinese'},
];

interface StoreValue {
    from: string;
    to: string;
    languages: {key: string; text: string}[];
    updateFrom: (value: string) => void;
    updateTo: (value: string) => void;
    swap: () => void;
    translate: () => void;
}

export function StoreProvider({children}: {children: React.ReactNode}) {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (!event.data.pluginMessage || !event.data.pluginMessage.value) return;

            if (event.data.pluginMessage.type === 'fromLanguage') {
                setFrom(event.data.pluginMessage.value);
            }

            if (event.data.pluginMessage.type === 'toLanguage') {
                setTo(event.data.pluginMessage.value);
            }
        };

        onmessage = handleMessage;
    }, []);

    const updateFrom = useCallback((value: string) => {
        setFrom(value);
        parent.postMessage({pluginMessage: {type: 'updateFromLanguage', value}}, '*');
    }, []);

    const updateTo = useCallback((value: string) => {
        setTo(value);
        parent.postMessage({pluginMessage: {type: 'updateToLanguage', value}}, '*');
    }, []);

    const swap = useCallback(() => {
        const temp = to;
        updateTo(from);
        setFrom(temp);
    }, [from, to, updateTo]);

    const translate = useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'translate', source: from, target: to}}, '*');
    }, [from, to]);

    return (
        <StoreContext.Provider value={{
            from,
            to,
            languages,
            updateFrom,
            updateTo,
            swap,
            translate
        } as StoreValue}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore(): StoreValue {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
