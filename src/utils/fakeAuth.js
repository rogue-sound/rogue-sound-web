export const fakeAuth = () => {
  const user = localStorage.getItem('userName');
  return user ? { isAuthenticated: true } : { isAuthenticated: false };
};
