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

  uploadQuestions(questions, level) {
    return axios({
      method: 'post',
      url: `${API_URL}/saveall/${level}`,
      headers: authHeader(),
      data: questions
    });
  }

  createNewQuestion(question) {
    return axios({
      method: 'post',
      url: `${API_URL}`,
      headers: authHeader(),
      data: question
    });
  }

  updateQuestionById(id, question) {
    return axios({
      method: 'put',
      url: `${API_URL}/${id}`,
      headers: authHeader(),
      data: question
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
