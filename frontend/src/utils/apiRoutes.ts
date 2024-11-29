const API = {
  auth: {
    login: 'auth/login',
    register: 'auth/register',
  },
  users: {
    all: '/users',
    user: (id: number) => `/users/${id}`,
  },
};

export default API;
