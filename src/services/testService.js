import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `http://localhost:8080/api/tests`;

class TestService {
  getAllTests() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getTestById(id) {
    return axios({
      method: 'get',
      url: `${API_URL}/${id}`,
      headers: authHeader()
    });
  }

  createNewTest(test) {
    return axios({
      method: 'post',
      url: `${API_URL}`,
      headers: authHeader(),
      data: test
    });
  }

  addQuestionsTestById(id, questions) {
    return axios({
      method: 'post',
      url: `${API_URL}/${id}/questions`,
      headers: authHeader(),
      data: questions
    });
  }

  addUsersTestById(id, users) {
    return axios({
      method: 'post',
      url: `${API_URL}/${id}/users`,
      headers: authHeader(),
      data: users
    });
  }

  updateTestById(id, test) {
    return axios({
      method: 'put',
      url: `${API_URL}/${id}`,
      headers: authHeader(),
      data: test
    });
  }

  deleteTestById(id) {
    return axios({
      method: 'delete',
      url: `${API_URL}/${id}`,
      headers: authHeader()
    });
  }
}

export default new TestService();
