export function handleSetObjectForSelectValue<T>(e: React.ChangeEvent<HTMLSelectElement>, setValue: Function, array: T[], valueKey: keyof T) {
    const selectedId = e.target.value;
    const selectedItem = array.find((item: any) => item.id.toString() === selectedId);
    if (selectedItem) setValue(valueKey, selectedItem);
}