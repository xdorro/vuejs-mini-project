import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/questions';

class QuestionService {
  getAllQuestions() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getQuestionById(id) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  uploadQuestions(level, questions) {
    return axios({
      method: 'post',
      url: `${API_URL}/saveall/${level}`,
      headers: authHeader(),
      data: questions
    });
  }

  createNewQuestion(email, password) {
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

  updateQuestionById(id, old_password, new_password) {
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

  deleteQuestionById(id) {
    return axios({
      method: 'delete',
      url: `${API_URL}/${id}`,
      headers: authHeader()
    });
  }
}

export default new QuestionService();
