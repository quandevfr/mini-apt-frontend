export const PATH = {
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_OTP: '/auth/verify-otp',
    RESET_PASSWORD: '/auth/reset-password',
    RESET_SUCCESS: '/auth/reset-password/success',
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
