interface IReturnHook {
  setStorage: (key: string, data: any) => any;
  getStorage: (key: string) => any;
  removeStorage: (key: string) => any;
}

const useLocalStorage = (): IReturnHook => {
  const getStorage = (key: string): any => {
    return JSON.parse(localStorage.getItem(key) || '[]');
  };
  const setStorage = (key: string, data: any): void => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  const removeStorage = (key: string): any => {
    return localStorage.removeItem(key);
  };
  return { setStorage, getStorage, removeStorage };
};
export default useLocalStorage;
