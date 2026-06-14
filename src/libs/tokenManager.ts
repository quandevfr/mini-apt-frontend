let accessToken: string | null = null;

export const tokenManager = {
  get: () => accessToken,
  set: (token: string): void => {
    accessToken = token;
  },
  clear: (): void => {
    accessToken = null;
  },
};
