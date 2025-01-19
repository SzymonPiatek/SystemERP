import API from '../utils/apiRoutes';
import axiosFetch from '../utils/axiosFetch.ts';

export const logout = async () => axiosFetch({ url: API.auth.logout, method: 'post' });
