
export function classNames(classes: { [name: string]: boolean }) {
    return Object.entries(classes)
        .filter(([_, isActive]) => isActive)
        .map(([name]) => name)
        .join(' ');
}
