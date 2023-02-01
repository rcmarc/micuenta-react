export function useDateLocale() {
  return (date, dateStyle = 'long') => {
    return new Date(date).toLocaleDateString('es', { dateStyle });
  };
}

export const useLdapToDate = () => {
  return (time) => new Date(time / 1e4 - 1.16444736e13);
};
