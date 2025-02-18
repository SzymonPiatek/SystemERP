const API = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  users: {
    all: '/users',
    user: (id: number) => `/users/${id}`,
    changeActive: (id: number) => `/users/${id}/change_active`,
    changePassword: (id: number) => `/users/${id}/change_password`,
    setProfilePicture: (id: number) => `/users/${id}/profile_pic`,
    changeForgottenPassword: '/users/change_forgotten_password',
    forgotPassword: '/users/forgot_password',
    invite: '/users/invite',
    acceptInvite: '/user/accept_invite',
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
