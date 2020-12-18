import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users';

class UserService {
  getAllUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getUserById(id) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  createNewUser(email, password) {
    return axios({
      method: 'post',
      url: `${API_URL}`,
      headers: authHeader(),
      data: {
        email: email,
        password: password
      }
    });
  }

  updateUserById(id, old_password, new_password) {
    return axios({
      method: 'put',
      url: `${API_URL}/${id}`,
      headers: authHeader(),
      data: {
        old_password: old_password,
        new_password: new_password
      }
    });
  }

  deleteUserById(id) {
    return axios({
      method: 'delete',
      url: `${API_URL}/${id}`,
      headers: authHeader()
    });
  }
}

export default new UserService();
