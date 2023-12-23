import { capitalizeFirstLetter } from "./captalizeFirstLetter";

export const extractNameFromUrl = (url: string) => {
    const segments = url.split('/').filter(segment => segment).map(segment => decodeURIComponent(segment));

    let name;
    if (segments.length > 2 && (segments[segments.length - 1] === 'new' || segments[segments.length - 1] === 'change')) {
        name = segments[segments.length - 2];
    } else {
        name = segments[segments.length - 1] || '';
    }

    return capitalizeFirstLetter(name);
};