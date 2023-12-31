import toast from "react-hot-toast";

type SimpleItemProps = {
    id: number
    name: string
}

export function handleSetObjectForSelectValue<T>(
    e: React.ChangeEvent<HTMLSelectElement>,
    setValue: Function,
    watch: Function,
    array: SimpleItemProps[],
    valueKey: string,
    isArray: boolean = false
) {
    if (!Array.isArray(array)) {
        console.error('O argumento "array" não é um array válido:', array);
        return;
    }

    const selectedId = e.target.value;
    const selectedItem = array.find((item) => item.id.toString() === selectedId);

    if (!selectedItem) return;

    if (isArray) {
        const currentValue = watch(valueKey);

        const checkItemNotRepeat = currentValue.some((item: SimpleItemProps) => item.id === selectedItem.id)

        if (checkItemNotRepeat) {
            toast("Item já adicionado ao grupo")
            return
        }

        const newValue = Array.isArray(currentValue) ? [...currentValue, selectedItem] : [selectedItem];

        setValue(valueKey, newValue);
    } else {
        setValue(valueKey, selectedItem);
    }
}
