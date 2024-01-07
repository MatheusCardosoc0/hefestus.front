import { capitalizeFirstLetter } from "./captalizeFirstLetter";

export const extractNameFromUrl = (url: string) => {
    const segments = url.split('/').filter(segment => segment).map(segment => decodeURIComponent(segment));

    let name;
    if (segments.length > 3 && segments[segments.length - 2] === 'change') {
        name = segments[segments.length - 3].slice(0, -1) + ' ' + segments[segments.length - 1];
    } else if (segments.length > 2 && (segments[segments.length - 1] === 'new')) {
        name = 'Criar ' + capitalizeFirstLetter(segments[segments.length - 2].slice(0, -1));
    } else {
        name = segments[segments.length - 1] || '';
    }

    return capitalizeFirstLetter(name);
};
