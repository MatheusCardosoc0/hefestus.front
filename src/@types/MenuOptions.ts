export type Option = {
    title: string;
    function?: () => void;
    href?: string;
};

export interface MenuOptionsProps {
    TitleSection: string;
    ItemsForSection: Option[];
    isOpen: boolean
}