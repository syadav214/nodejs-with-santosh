const urlStore = new Map<string, string>();

const isKeyExists = (key: string): boolean => urlStore.has(key);

const getLongUrl = (key: string): string => urlStore.get(key) || "";

const setLongUrl = (key: string, longUrl: string): void => {
    urlStore.set(key, longUrl);
};

export { isKeyExists, getLongUrl, setLongUrl };

