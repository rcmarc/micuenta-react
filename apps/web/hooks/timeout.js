export function timeout(seconds) {
  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve({
        json: () => ({
          error: 'Tiempo de espera agotado',
        }),
      });
    }, seconds || 10000);
  });
}
