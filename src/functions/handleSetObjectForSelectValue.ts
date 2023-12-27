export function handleSetObjectForSelectValue<T>(
    e: React.ChangeEvent<HTMLSelectElement>,
    setValue: Function,
    watch: Function, // Adicionando watch como um parâmetro
    array: T[],
    valueKey: string,
    isArray: boolean = false
) {
    if (!Array.isArray(array)) {
        console.error('O argumento "array" não é um array válido:', array);
        return;
    }

    const selectedId = e.target.value;
    const selectedItem = array.find((item: any) => item.id.toString() === selectedId);

    if (!selectedItem) return;

    if (isArray) {
        // Obter o valor atual do campo
        const currentValue = watch(valueKey);

        // Calcular o novo valor do campo
        const newValue = Array.isArray(currentValue) ? [...currentValue, selectedItem] : [selectedItem];

        // Atualizar o valor do campo
        setValue(valueKey, newValue);
    } else {
        setValue(valueKey, selectedItem);
    }
}
