const API = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  users: {
    all: '/users',
    user: (id: number) => `/users/${id}`,
  },
  companies: {
    all: '/companies',
    company: (id: number) => `/companies/${id}`,
  },
};

export default API;
