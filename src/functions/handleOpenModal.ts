interface OpenModalParams<T extends { id?: number }> {
    type: 'post' | 'put';
    entity: T | null;
    setCurrentId: (id: number) => void;
    setState: (stateFunc: (prevState: any) => any) => void;
}

function handleOpenModal<T extends { id?: number }>({
    type,
    entity,
    setCurrentId,
    setState
}: OpenModalParams<T>) {
    if (type === 'post') {
        setCurrentId(0);
        setState((prevState: any) => ({ ...prevState, isOpenModal: true }));
    }
    if (type === 'put' && entity && typeof entity.id === 'number') {
        setCurrentId(entity.id);
        setState((prevState: any) => ({ ...prevState, isOpenModal: true }));
    }
}
