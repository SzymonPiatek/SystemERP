const API = {
  auth: {
    login: '/login/',
    register: '/register',
  },
  users: {
    all: '/users/',
    user: (id: number) => `/users/${id}`,
  },
};

export default API;
