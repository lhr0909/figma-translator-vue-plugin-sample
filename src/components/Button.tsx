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

export function Button() {
    const {from, to, translate} = useStore();
    const disabled = from === '' || to === '' || from === to;

    return (
        <button
            onClick={translate}
            disabled={disabled}
            className={`
                mt-6
                flex flex-row justify-center items-center
                w-[308px] h-[48px]
                rounded-lg
                text-white font-bold text-sm leading-5
                select-none
                ${disabled ? 'bg-[#8A8A8A]' : 'bg-[#3760C0] hover:opacity-90'}
            `}
            style={{padding: '14px 12px', gap: '8px'}}
        >
            Translate
        </button>
    );
}
