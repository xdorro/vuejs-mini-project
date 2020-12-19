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
              id="exampleFormControlInput1"
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
              <tr v-for="(question, index) in filteredList" :key="index">
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
import AdminSidebar from '../../views/Sidebar.vue';
import QuestionService from '../../services/questionService';
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
      create_question: {},
      update_question: {},
    };
  },
  computed: {
    filteredList() {
      return this.questions.filter((question) => {
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
    async handleFileChange(e) {
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

            let jsonObject = JSON.stringify(rowObject);
            this.upload_questions = jsonObject;

            console.log(jsonObject);
          });
        };
      }
    },
    upload: function () {
      $('#uploadModal').modal('show');
    },
    saveAll: function () {
      QuestionService.uploadQuestions(
        this.upload_level,
        this.upload_questions
      ).then(
        (response) => {
          if (response.data.status == true) {
            // message;
            Swal.fire({
              icon: 'success',
              title: response.data.message,
            });

            this.upload_level = '';
            this.upload_questions = '';
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
      $('#createModal').modal('show');
    },
    store: function () {},
    edit: function (id) {
      $('#updateModal').modal('show');
    },
    // update: function () {},
    // del: function (id) {},
  },
};
</script>