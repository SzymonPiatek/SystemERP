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
  events: {
    all: '/events',
    event: (id: number) => `/events/${id}`,
  },
  notes: {
    all: '/notes',
    note: (id: number) => `/notes/${id}`,
  },
};

export default API;
