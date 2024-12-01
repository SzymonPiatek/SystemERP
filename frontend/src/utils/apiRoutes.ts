const API = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  users: {
    all: '/users',
    user: (id: number) => `/users/${id}`,
    changeActive: (id: number) => `/users/${id}/change_active`,
    changePassword: (id: number) => `/users/${id}/change_password`,
  },
  companies: {
    all: '/companies',
    company: (id: number) => `/companies/${id}`,
  },
  events: {
    all: '/events',
    event: (id: number) => `/events/${id}`,
  },
};

export default API;
