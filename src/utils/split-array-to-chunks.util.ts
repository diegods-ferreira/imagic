export const splitArrayToChunks = (array: any[], parts: number) => {
  const result = [];

  for (let i = parts; i > 0; i -= 1) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }

  return result;
};
