export const fakeAuth = () => {
  const user = localStorage.getItem('username');
  return { isAuthenticated: !!user };
};
