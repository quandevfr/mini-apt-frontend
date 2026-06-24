export const PATHS = {
  AUTH: {
    SIGN_IN: '/auth/signin',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY: '/auth/verify-otp',
    RESET_PASSWORD: '/auth/reset-password',
    RESET_PASSWORD_SUCCESS: '/auth/reset-password/success',
    REFRESH: '/auth/refresh',
  },
  ERROR: {
    NOT_FOUND: '/404',
    UNAUTHORIZED: '/unauthorized',
  },
  PAGE: {
    DASHBOARD: '/',
    SENT_MESSAGE: '/sent-message',
    APARTMENTS: {
      INDEX: '/apartments',
      CREATE: '/apartments/create',
      UPDATE: '/apartments/:id/edit',
      DETAILS: '/apartments/:id',
    },
    ROOMS: {
      INDEX: '/rooms',
      CREATE: '/rooms/create',
    },
    TENANTS: {
      INDEX: '/tenants',
      CREATE: '/tenants/create',
    },
    INVOICES: '/invoices',
    REQUEST: '/requests',
  },
};
