

export function writeToLocalStorage<T extends string>(key: string, value: T) {
    localStorage.setItem(key, value as string);
}

export function getFromLocalStorage<T extends string>(key: string): T | null {
    const value = localStorage.getItem(key)
    if (value === null)
        return null;

    return value as T;
}