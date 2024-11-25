import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';

export const testAxiosFetch = async () => {
  try {
    console.log('Testing GET request...');
    const getData = await axiosFetch<{ message: string; data: number[] }>({
      method: 'get',
      url: API.users.all,
    });
    console.log('GET response:', getData);
  } catch (error) {
    console.error('Error during testing axiosFetch:', error);
  }
};
