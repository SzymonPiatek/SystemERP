const API = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
  },
  users: {
    all: '/users',
    user: (id: number) => `/users/${id}`,
    changeActive: (id: number) => `/users/${id}/change_active`,
    changePassword: (id: number) => `/users/${id}/change_password`,
    changeForgottenPassword: '/users/change_forgotten_password/:token',
    setProfilePicture: (id: number) => `/users/${id}/profile_pic`,
    forgotPassword: '/user/forgot_password',
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
