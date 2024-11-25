import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import { User } from '../utils/types.ts';

type LoginResponse = {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  users: User[];
};

export const testAxiosFetch = async () => {
  try {
    console.log('Testing GET request...');
    const getData: LoginResponse = await axiosFetch({
      method: 'post',
      url: API.auth.login,
      data: {
        email: 'admin@test.pl',
        password: 'Testowe123!',
      },
    });
    localStorage.setItem('accessToken', getData.accessToken);
  } catch (error) {
    console.error('Error during testing axiosFetch:', error);
  }

  try {
    console.log('Testing GET request...');
    const getData = await axiosFetch({
      method: 'get',
      url: API.users.all,
    });
    console.log('getData:', getData);
  } catch (error) {
    console.error('Error during testing axiosFetch:', error);
  }
};
