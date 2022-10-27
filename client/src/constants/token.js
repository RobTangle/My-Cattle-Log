export const header = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
