import {useStore} from '@/store/StoreContext';

import { Button } from "@/components/ui/button";

export function TranslateButton() {
    const {from, to, translate} = useStore();
    const disabled = from === '' || to === '' || from === to;

    return (
        <Button
            variant="default"
            onClick={translate}
            disabled={disabled}
        >
            Translate
        </Button>
    );
}
