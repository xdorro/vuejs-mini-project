<template>
  <div>
    <div class="container">
      <div class="jumbotron text-center">
        <h1>Quản lý câu hỏi</h1>
        <p>
          This page demonstrates
          <span class="text-danger">nested</span> views.
        </p>
      </div>

      <div class="row">
        <div class="col-lg-3">
          <AdminSidebar />
        </div>
        <div class="col-lg-9">
          <div class="form-group">
            <button type="button" class="btn btn-primary" @click="upload">
              Upload câu hỏi
            </button>

            <button type="button" class="btn btn-success" @click="create">
              Thêm câu hỏi
            </button>
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Tìm kiếm câu hỏi"
              v-model="search"
            />
          </div>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Câu hỏi</th>
                <th scope="col">Độ khó</th>
                <th scope="col">Kiểu</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(question, index) in questions" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ question.question }}</td>
                <td>
                  <span class="badge badge-primary">
                    {{
                      question.level == 'F'
                        ? 'Fresher'
                        : question.level == 'J'
                        ? 'Junior'
                        : question.level == 'M'
                        ? 'Middle'
                        : 'Senior'
                    }}
                  </span>
                </td>
                <td>
                  <span class="badge badge-success">
                    {{
                      question.questionType === 'TN' ? 'Trắc Nghiệm' : 'Tự Luận'
                    }}
                  </span>
                </td>
                <td>
                  <div
                    class="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <button
                      @click="edit(question.id)"
                      type="button"
                      class="btn btn-warning"
                    >
                      Sửa
                    </button>
                    <button
                      @click="del(question.id)"
                      type="button"
                      class="btn btn-danger"
                    >
                      Xoá
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="uploadModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      data-backdrop="static"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Upload danh sách câu hỏi
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              name="frm_upload"
              @submit.prevent="handleSubmit(saveAll)"
              class="needs-validation"
              novalidate
            >
              <div class="modal-body">
                <ValidationProvider
                  name="Cấp độ"
                  rules="required|oneOf:F,J,M,S"
                  v-slot="{ classes, errors }"
                >
                  <div class="form-group">
                    <select
                      class="custom-select"
                      name="upload_level"
                      required
                      v-model="upload_level"
                      :class="classes"
                    >
                      <option selected value="" disabled>
                        Vui lòng chọn cấp độ
                      </option>
                      <option value="F">Fresher</option>
                      <option value="J">Junior</option>
                      <option value="M">Middle</option>
                      <option value="S">Senior</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  name="File câu hỏi"
                  rules="required|ext:xls,xlsx"
                  v-slot="{ classes, errors }"
                  ref="provider"
                >
                  <div class="form-group">
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="upload_file"
                        accept=".xls,.xlsx"
                        required
                        :class="classes"
                        @change="handleFileChange"
                      />
                      <label class="custom-file-label" for="upload_file"
                        >Chọn file câu hỏi</label
                      >
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </div>
                </ValidationProvider>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Huỷ
                </button>
                <button type="submit" class="btn btn-primary">Cập nhật</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="createModal"
      tabindex="-1"
      role="dialog"
      data-backdrop="static"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thêm câu hỏi</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              @submit.prevent="handleSubmit(store)"
              class="needs-validation"
              novalidate
            >
              <div class="modal-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <ValidationProvider
                      name="Cấp độ"
                      rules="required|oneOf:F,J,M,S"
                      v-slot="{ classes, errors }"
                    >
                      <label>Cấp độ</label>
                      <select
                        class="custom-select"
                        required
                        v-model="question_detail.level"
                        :class="classes"
                      >
                        <option selected value="" disabled>
                          Vui lòng chọn cấp độ
                        </option>
                        <option value="F">Fresher</option>
                        <option value="J">Junior</option>
                        <option value="M">Middle</option>
                        <option value="S">Senior</option>
                      </select>
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="form-group col-md-6">
                    <ValidationProvider
                      name="Loại câu hỏi"
                      rules="required|oneOf:TL,TN"
                      v-slot="{ classes, errors }"
                    >
                      <label>Loại câu hỏi</label>
                      <select
                        class="custom-select"
                        required
                        v-model="question_detail.questionType"
                        @change="changeQuestionType"
                        :class="classes"
                      >
                        <option selected value="" disabled>
                          Vui lòng chọn loại câu hỏi
                        </option>
                        <option value="TN">Trắc nhiệm</option>
                        <option value="TL">Tự luận</option>
                      </select>
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="form-group">
                  <ValidationProvider
                    name="Nội dung câu hỏi"
                    rules="required"
                    v-slot="{ classes, errors }"
                  >
                    <label for="inputAddress">Nội dung câu hỏi</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nội dung câu hỏi"
                      :class="classes"
                      v-model="question_detail.question"
                    />
                    <div class="invalid-feedback" v-if="errors">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <ValidationProvider
                    name="Nội dung đáp án A"
                    :rules="`${
                      question_detail.questionType == 'TL' ? '' : 'required'
                    }`"
                    v-slot="{ classes, errors }"
                  >
                    <label for="inputAddress">Đáp án A</label>
                    <div class="input-group mb-2 mr-sm-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="radio"
                            name="exampleRadios"
                            value="a"
                            checked
                            v-model="question_detail.answer"
                            :disabled="question_detail.questionType == 'TL'"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nội dung đáp án A"
                        :class="classes"
                        v-model="question_detail.a"
                        :disabled="question_detail.questionType == 'TL'"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <ValidationProvider
                    name="Nội dung đáp án B"
                    :rules="`${
                      question_detail.questionType == 'TL' ? '' : 'required'
                    }`"
                    v-slot="{ classes, errors }"
                  >
                    <label for="inputAddress">Đáp án B</label>
                    <div class="input-group mb-2 mr-sm-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="radio"
                            name="exampleRadios"
                            value="b"
                            v-model="question_detail.answer"
                            :disabled="question_detail.questionType == 'TL'"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nội dung đáp án B"
                        :class="classes"
                        v-model="question_detail.b"
                        :disabled="question_detail.questionType == 'TL'"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <ValidationProvider
                    name="Nội dung đáp án C"
                    :rules="`${
                      question_detail.questionType == 'TL' ? '' : 'required'
                    }`"
                    v-slot="{ classes, errors }"
                  >
                    <label for="inputAddress">Đáp án C</label>
                    <div class="input-group mb-2 mr-sm-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="radio"
                            name="exampleRadios"
                            value="c"
                            v-model="question_detail.answer"
                            :disabled="question_detail.questionType == 'TL'"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nội dung đáp án C"
                        :class="classes"
                        v-model="question_detail.c"
                        :disabled="question_detail.questionType == 'TL'"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <ValidationProvider
                    name="Nội dung đáp án D"
                    :rules="`${
                      question_detail.questionType == 'TL' ? '' : 'required'
                    }`"
                    v-slot="{ classes, errors }"
                  >
                    <label for="inputAddress">Đáp án D</label>
                    <div class="input-group mb-2 mr-sm-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="radio"
                            name="exampleRadios"
                            value="d"
                            v-model="question_detail.answer"
                            :disabled="question_detail.questionType == 'TL'"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nội dung đáp án D"
                        :class="classes"
                        v-model="question_detail.d"
                        :disabled="question_detail.questionType == 'TL'"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Huỷ
                </button>
                <button type="submit" class="btn btn-primary">Thêm</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="updateModal"
      tabindex="-1"
      role="dialog"
      data-backdrop="static"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Sửa câu hỏi</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              @submit.prevent="handleSubmit(update)"
              class="needs-validation"
              novalidate
            >
              <div class="modal-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <ValidationProvider
                      name="Cấp độ"
                      rules="required|oneOf:F,J,M,S"
                      v-slot="{ classes, errors }"
                    >
                      <label>Cấp độ</label>
                      <select
                        class="custom-select"
                        required
                        v-model="question_detail.level"
                        :class="classes"
                      >
                        <option selected value="" disabled>
                          Vui lòng chọn cấp độ
                        </option>
                        <option value="F">Fresher</option>
                        <option value="J">Junior</option>
                        <option value="M">Middle</option>
                        <option value="S">Senior</option>
                      </select>
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="form-group col-md-6">
                    <ValidationProvider
                      name="Loại câu hỏi"
                      rules="required|oneOf:TL,TN"
                      v-slot="{ classes, errors }"
                    >
                      <label>Loại câu hỏi</label>
                      <select
                        class="custom-select"
                        required
                        v-model="question_detail.questionType"
                        @change="changeQuestionType"
                        :class="classes"
                      >
                        <option selected value="" disabled>
                          Vui lòng chọn loại câu hỏi
                        </option>
                        <option value="TN">Trắc nhiệm</option>
                        <option value="TL">Tự luận</option>
                      </select>
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="form-group">
                  <ValidationProvider
                    name="Nội dung câu hỏi"
                    rules="required"
                    v-slot="{ classes, errors }"
                  >
                    <label for="inputAddress">Nội dung câu hỏi</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nội dung câu hỏi"
                      :class="classes"
                      v-model="question_detail.question"
                    />
                    <div class="invalid-feedback" v-if="errors">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <ValidationProvider
                    name="Nội dung đáp án A"
                    :rules="`${
                      question_detail.questionType == 'TL' ? '' : 'required'
                    }`"
                    v-slot="{ classes, errors }"
                  >
                    <label for="inputAddress">Đáp án A</label>
                    <div class="input-group mb-2 mr-sm-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="radio"
                            name="exampleRadios"
                            value="a"
                            checked
                            v-model="question_detail.answer"
                            :disabled="question_detail.questionType == 'TL'"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nội dung đáp án A"
                        :class="classes"
                        v-model="question_detail.a"
                        :disabled="question_detail.questionType == 'TL'"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <ValidationProvider
                    name="Nội dung đáp án B"
                    :rules="`${
                      question_detail.questionType == 'TL' ? '' : 'required'
                    }`"
                    v-slot="{ classes, errors }"
                  >
                    <label for="inputAddress">Đáp án B</label>
                    <div class="input-group mb-2 mr-sm-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="radio"
                            name="exampleRadios"
                            value="b"
                            v-model="question_detail.answer"
                            :disabled="question_detail.questionType == 'TL'"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nội dung đáp án B"
                        :class="classes"
                        v-model="question_detail.b"
                        :disabled="question_detail.questionType == 'TL'"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <ValidationProvider
                    name="Nội dung đáp án C"
                    :rules="`${
                      question_detail.questionType == 'TL' ? '' : 'required'
                    }`"
                    v-slot="{ classes, errors }"
                  >
                    <label for="inputAddress">Đáp án C</label>
                    <div class="input-group mb-2 mr-sm-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="radio"
                            name="exampleRadios"
                            value="c"
                            v-model="question_detail.answer"
                            :disabled="question_detail.questionType == 'TL'"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nội dung đáp án C"
                        :class="classes"
                        v-model="question_detail.c"
                        :disabled="question_detail.questionType == 'TL'"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <ValidationProvider
                    name="Nội dung đáp án D"
                    :rules="`${
                      question_detail.questionType == 'TL' ? '' : 'required'
                    }`"
                    v-slot="{ classes, errors }"
                  >
                    <label for="inputAddress">Đáp án D</label>
                    <div class="input-group mb-2 mr-sm-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input
                            type="radio"
                            name="exampleRadios"
                            value="d"
                            v-model="question_detail.answer"
                            :disabled="question_detail.questionType == 'TL'"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nội dung đáp án D"
                        :class="classes"
                        v-model="question_detail.d"
                        :disabled="question_detail.questionType == 'TL'"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Huỷ
                </button>
                <button type="submit" class="btn btn-primary">Thêm</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminSidebar from '@/views/Sidebar.vue';
import QuestionService from '@/services/questionService';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import XLSX from 'xlsx';

export default {
  name: 'dashboard.question',
  components: {
    AdminSidebar,
  },
  data: function () {
    return {
      search: '',
      questions: [],
      upload_level: '',
      upload_questions: '',
      question_detail: {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        answer: '',
        level: '',
        questionType: '',
      },
    };
  },
  computed: {
    filteredList() {
      return this.questions.filter((question) => {
        console.log(question);
        return question.question
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load: function () {
      QuestionService.getAllQuestions().then(
        (response) => {
          if (response.data.status == true) {
            this.questions = response.data.result;
          }
        },
        () => {
          // Swal.fire({
          //   icon: 'error',
          //   title: error.response.data.message,
          // });
        }
      );
    },
    changeQuestionType: function () {
      if (this.question_detail.questionType == 'TL') {
        this.question_detail.a = '';
        this.question_detail.b = '';
        this.question_detail.c = '';
        this.question_detail.d = '';
        this.question_detail.answer = '';
      }
    },
    async handleFileChange(e) {
      var seft = this;

      const { valid } = await this.$refs.provider.validate(e);

      if (valid) {
        let selectedFile = event.target.files[0];
        let fileReader = new FileReader();

        fileReader.readAsBinaryString(selectedFile);

        fileReader.onload = function (e) {
          let data = e.target.result;

          let workbook = XLSX.read(data, {
            type: 'binary',
          });

          workbook.SheetNames.forEach((sheet) => {
            let rowObject = XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[sheet]
            );

            seft.upload_questions = JSON.stringify(rowObject);
          });
        };
      }
    },
    upload: function () {
      $('#uploadModal').modal('show');
    },
    saveAll: function () {
      QuestionService.uploadQuestions(
        this.upload_questions,
        this.upload_level
      ).then(
        (response) => {
          if (response.data.status == true) {
            // message;
            Swal.fire({
              icon: 'success',
              title: response.data.message,
            });

            this.upload_level = '';
            // this.upload_questions = '';
            $('#uploadModal').modal('hide');

            this.load();
          } else {
            Swal.fire({
              icon: 'error',
              title: response.data.message,
            });
          }
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Upload câu hỏi không thành công',
          });
        }
      );
    },
    create: function () {
      this.question_detail = {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        answer: '',
        level: '',
        questionType: '',
      };

      $('#createModal').modal('show');
    },
    store: function () {
      QuestionService.createNewQuestion(
        JSON.stringify(this.question_detail)
      ).then(
        (response) => {
          if (response.data.status == true) {
            Swal.fire({
              icon: 'success',
              title: response.data.message,
            });

            this.question_detail = {
              id: '',
              question: '',
              a: '',
              b: '',
              c: '',
              d: '',
              answer: '',
              level: '',
              questionType: '',
            };

            $('#createModal').modal('hide');

            this.load();
          } else {
            Swal.fire({
              icon: 'error',
              title: response.data.message,
            });
          }
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Thêm câu hỏi không thành công',
          });
        }
      );
    },
    edit: function (id) {
      QuestionService.getQuestionById(id).then(
        (response) => {
          if (response.data.status == true) {
            let data = response.data.result;

            this.question_detail = {
              id: id,
              question: data.question,
              a: data.a,
              b: data.b,
              c: data.c,
              d: data.d,
              answer: data.answer,
              level: data.level,
              questionType: data.questionType,
            };

            $('#updateModal').modal('show');

            this.load();
          } else {
            Swal.fire({
              icon: 'error',
              title: response.data.message,
            });
          }
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Upload câu hỏi không thành công',
          });
        }
      );
    },
    update: function () {
      QuestionService.updateQuestionById(
        this.question_detail.id,
        JSON.stringify(this.question_detail)
      ).then(
        (response) => {
          if (response.data.status == true) {
            // message;
            Swal.fire({
              icon: 'success',
              title: response.data.message,
            });

            this.question_detail = {
              id: '',
              question: '',
              a: '',
              b: '',
              c: '',
              d: '',
              answer: '',
              level: '',
              questionType: '',
            };

            $('#updateModal').modal('hide');

            this.load();
          } else {
            Swal.fire({
              icon: 'error',
              title: response.data.message,
            });
          }
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Cập nhật câu hỏi không thành công',
          });
        }
      );
    },
    del: function (id) {
      Swal.fire({
        title: 'Vui lòng xác nhận?',
        text: 'Bạn sẽ không thể khôi phục lại câu hỏi này!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xoá ngay!',
        cancelButtonText: 'Huỷ',
      }).then((result) => {
        if (result.value) {
          QuestionService.deleteQuestionById(id).then(
            (response) => {
              if (response.data.status == true) {
                Swal.fire({
                  icon: 'success',
                  title: response.data.message,
                });

                this.load();
              } else {
                Swal.fire({
                  icon: 'error',
                  title: response.data.message,
                });
              }
            },
            () => {
              Swal.fire({
                icon: 'error',
                title: 'Xoá câu hỏi không thành công',
              });
            }
          );
        }
      });
    },
  },
};
</script>