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

import React from 'react';
import {useStore} from '../store/StoreContext';

interface SelectorProps {
    label: 'From' | 'To';
}

export function Selector({label}: SelectorProps) {
    const {languages, from, to, updateFrom, updateTo} = useStore();
    const fromTo = label.toLowerCase() as 'from' | 'to';
    const value = fromTo === 'from' ? from : to;
    const updateValue = fromTo === 'from' ? updateFrom : updateTo;

    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => updateValue(e.target.value)}
                className={`
                    box-border
                    flex flex-row items-center gap-2
                    w-[308px] h-[48px]
                    px-3 py-[14px]
                    rounded-lg border-2
                    text-[#8A8A8A]
                    bg-[#2C2C2C]
                    appearance-none
                    pr-10
                    focus:border-white focus:outline-none
                    ${value ? 'text-white' : ''}
                `}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.18498 5.14811C2.8986 4.86172 2.43428 4.86172 2.14789 5.14811C1.86151 5.43449 1.86151 5.89881 2.14789 6.1852L7.48123 11.5185C7.61875 11.6561 7.80528 11.7333 7.99977 11.7333C8.19426 11.7333 8.38079 11.6561 8.51832 11.5185L13.8516 6.1852C14.138 5.89881 14.138 5.43449 13.8516 5.14811C13.5653 4.86172 13.1009 4.86172 12.8146 5.14811L7.99977 9.9629L3.18498 5.14811Z' fill='white'/%3E%3C/svg%3E%0A")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '96% 50%',
                }}
            >
                <option value="">{label}</option>
                {languages.map((language: {key: string; text: string}) => (
                    <option key={language.key} value={language.key}>
                        {language.text}
                    </option>
                ))}
            </select>
        </div>
    );
}
