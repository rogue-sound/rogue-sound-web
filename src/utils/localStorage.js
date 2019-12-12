const getItem = (key) => localStorage.getItem(key);

const setItem = (key, data) => localStorage.setItem(key, data);

const removeItem = (key) => localStorage.removeItem(key);

const clear = () => localStorage.clear();

export default {
  getItem,
  setItem,
  removeItem,
  clear,
};
