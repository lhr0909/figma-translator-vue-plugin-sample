import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {useStore} from '@/store/StoreContext';

interface SelectorProps {
    label: 'From' | 'To';
}

export function Selector({label}: SelectorProps) {
    const {languages, from, to, updateFrom, updateTo} = useStore();
    const fromTo = label.toLowerCase() as 'from' | 'to';
    const value = fromTo === 'from' ? from : to;
    const updateValue = fromTo === 'from' ? updateFrom : updateTo;

    return (
        <Select value={value} onValueChange={updateValue}>
            <SelectTrigger className="w-[308px]">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                {languages.map((language: {key: string; text: string}) => (
                    <SelectItem key={language.key} value={language.key}>
                        {language.text}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
