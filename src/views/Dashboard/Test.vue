<template>
  <div>
    <div class="container">
      <div class="jumbotron text-center">
        <h1>Quản lý bài thi</h1>
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
            <button type="button" class="btn btn-success" @click="create">
              Thêm bài thi
            </button>
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Tìm kiếm bài thi"
              v-model="search"
            />
          </div>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Bài thi</th>
                <th scope="col">Câu hỏi</th>
                <th scope="col">Học viên</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(test, index) in filteredList" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ test.testName }}</td>
                <td>
                  <span class="badge badge-primary">{{
                    test.questionTestEntityList.length
                  }}</span>
                </td>
                <td>
                  <span class="badge badge-success">{{
                    test.userTestEntityList.length
                  }}</span>
                </td>
                <td>
                  <div
                    class="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <router-link
                      :to="{
                        name: 'dashboard.tests.users',
                        params: { test_id: test.id },
                      }"
                      class="btn btn-info"
                      >Chấm bài</router-link
                    >
                    <button
                      @click="edit(test.id)"
                      type="button"
                      class="btn btn-warning"
                    >
                      Sửa
                    </button>
                    <button
                      @click="del(test.id)"
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
      id="createModal"
      tabindex="-1"
      role="dialog"
      data-backdrop="static"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thêm mới bài thi</h5>
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
                      name="Tên bài thi"
                      rules="required"
                      v-slot="{ classes, errors }"
                    >
                      <label>Tên bài thi</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Tên bài thi"
                        :class="classes"
                        v-model="test_detail.testName"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="form-group col-md-6">
                    <ValidationProvider
                      name="Thời gian thi"
                      rules="required|integer"
                      v-slot="{ classes, errors }"
                    >
                      <label>Thời gian thi (phút)</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Thời gian thi"
                        :class="classes"
                        v-model="test_detail.testTime"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <ValidationProvider
                      name="Thời gian bắt đầu"
                      rules="required"
                      v-slot="{ classes, errors }"
                    >
                      <label>Thời gian bắt đầu</label>
                      <ejs-datetimepicker
                        type="text"
                        class="form-control"
                        placeholder="Thời gian bắt đầu"
                        :class="classes"
                        v-model="test_detail.testDateBegin"
                      ></ejs-datetimepicker>
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="form-group col-md-6">
                    <ValidationProvider
                      name="Thời gian kết thúc"
                      rules="required"
                      v-slot="{ classes, errors }"
                    >
                      <label>Thời gian kết thúc</label>
                      <ejs-datetimepicker
                        type="text"
                        class="form-control"
                        placeholder="Thời gian kết thúc"
                        :class="classes"
                        v-model="test_detail.testDateFinish"
                      ></ejs-datetimepicker>
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
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
      <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cập nhật bài thi</h5>
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
                      name="Tên bài thi"
                      rules="required"
                      v-slot="{ classes, errors }"
                    >
                      <label>Tên bài thi</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Tên bài thi"
                        :class="classes"
                        v-model="test_detail.testName"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="form-group col-md-6">
                    <ValidationProvider
                      name="Thời gian thi"
                      rules="required|integer"
                      v-slot="{ classes, errors }"
                    >
                      <label>Thời gian thi (phút)</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Thời gian thi"
                        :class="classes"
                        v-model="test_detail.testTime"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <ValidationProvider
                      name="Thời gian bắt đầu"
                      rules="required"
                      v-slot="{ classes, errors }"
                    >
                      <label>Thời gian bắt đầu</label>
                      <ejs-datetimepicker
                        type="text"
                        class="form-control"
                        placeholder="Thời gian bắt đầu"
                        :class="classes"
                        v-model="test_detail.testDateBegin"
                      ></ejs-datetimepicker>
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="form-group col-md-6">
                    <ValidationProvider
                      name="Thời gian kết thúc"
                      rules="required"
                      v-slot="{ classes, errors }"
                    >
                      <label>Thời gian kết thúc</label>
                      <ejs-datetimepicker
                        type="text"
                        class="form-control"
                        placeholder="Thời gian kết thúc"
                        :class="classes"
                        v-model="test_detail.testDateFinish"
                      ></ejs-datetimepicker>
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="question-tab"
                      data-toggle="tab"
                      href="#question"
                      role="tab"
                      aria-controls="question"
                      aria-selected="true"
                      >Danh sách câu hỏi</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="user-tab"
                      data-toggle="tab"
                      href="#user"
                      role="tab"
                      aria-controls="user"
                      aria-selected="false"
                      >Danh sách học viên</a
                    >
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="question"
                    role="tabpanel"
                    aria-labelledby="question-tab"
                  >
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Tìm kiếm câu hỏi"
                        v-model="searchQuestion"
                      />
                    </div>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">
                            <label class="form-checkbox">
                              <input
                                type="checkbox"
                                v-model="selectAllQuestions"
                              />
                              <i class="form-icon"></i>
                            </label>
                          </th>
                          <th scope="col">STT</th>
                          <th scope="col">Câu hỏi</th>
                          <th scope="col">Độ khó</th>
                          <th scope="col">Kiểu</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="(question, index) in filteredListQuestion"
                          :key="index"
                        >
                          <td>
                            <label class="form-checkbox">
                              <input
                                type="checkbox"
                                :value="question.id"
                                v-model="questionTestEntityList"
                              />
                              <i class="form-icon"></i>
                            </label>
                          </td>
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
                                question.questionType === 'TN'
                                  ? 'Trắc Nghiệm'
                                  : 'Tự Luận'
                              }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="user"
                    role="tabpanel"
                    aria-labelledby="user-tab"
                  >
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Tìm kiếm người dùng"
                        v-model="searchUser"
                      />
                    </div>

                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">
                            <label class="form-checkbox">
                              <input type="checkbox" v-model="selectAllUsers" />
                              <i class="form-icon"></i>
                            </label>
                          </th>
                          <th scope="col">STT</th>
                          <th scope="col">Email</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="(user, index) in filteredListUser"
                          :key="index"
                        >
                          <td>
                            <label class="form-checkbox">
                              <input
                                type="checkbox"
                                :value="user.id"
                                v-model="userTestEntityList"
                              />
                              <i class="form-icon"></i>
                            </label>
                          </td>
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ user.email }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
import UserService from '@/services/userService';
import QuestionService from '@/services/questionService';
import TestService from '@/services/testService';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Datepicker from 'vuejs-datetimepicker';

export default {
  name: 'dashboard.test',
  components: {
    AdminSidebar,
    Datepicker,
  },
  data: function () {
    return {
      search: '',
      searchQuestion: '',
      searchUser: '',
      questions: [],
      users: [],
      tests: [],
      test_detail: {
        testName: '',
        testTime: '',
        testDateBegin: '',
        testDateFinish: '',
        questionTestEntityList: [],
        userTestEntityList: [],
      },
      questionTestEntityList: [],
      userTestEntityList: [],
    };
  },
  computed: {
    filteredListUser() {
      return this.users.filter((user) => {
        return user.email.toLowerCase().includes(this.searchUser.toLowerCase());
      });
    },
    filteredListQuestion() {
      return this.questions.filter((question) => {
        return question.question
          .toLowerCase()
          .includes(this.searchQuestion.toLowerCase());
      });
    },
    filteredList() {
      return this.tests.filter((test) => {
        return test.testName.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    selectAllQuestions: {
      get: function () {
        return this.questions
          ? this.questionTestEntityList.length ==
              this.questions.length
          : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.questions.forEach(function (question) {
            selected.push(question.id);
          });
        }

        this.questionTestEntityList = selected;
      },
    },
    selectAllUsers: {
      get: function () {
        return this.users
          ? this.userTestEntityList.length ==
              this.users.length
          : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.users.forEach(function (user) {
            selected.push(user.id);
          });
        }

        this.userTestEntityList = selected;
      },
    },
  },
  mounted() {
    this.load();
    this.loadQuestions();
    this.loadUsers();
  },
  methods: {
    load: function () {
      TestService.getAllTests().then(
        (response) => {
          if (response.data.status == true) {
            this.tests = response.data.result;
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
    loadQuestions: function () {
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
    loadUsers: function () {
      UserService.getAllUsers().then(
        (response) => {
          if (response.data.status == true) {
            this.users = response.data.result;
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
    create: function () {
      this.test_detail = {
        testName: '',
        testTime: '',
        testDateBegin: '',
        testDateFinish: '',
        questionTestEntityList: [],
        userTestEntityList: [],
      };

      this.questionTestEntityList = [];
      this.userTestEntityList = [];

      $('#createModal').modal('show');
    },
    store: function () {
      TestService.createNewTest(JSON.stringify(this.test_detail)).then(
        (response) => {
          if (response.data.status == true) {
            Swal.fire({
              icon: 'success',
              title: response.data.message,
            });

            this.test_detail = {
              testName: '',
              testTime: '',
              testDateBegin: '',
              testDateFinish: '',
              questionTestEntityList: [],
              userTestEntityList: [],
            };
            
            this.questionTestEntityList = [];
            this.userTestEntityList = [];

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
            title: 'Thêm bài thi không thành công',
          });
        }
      );
    },
    edit: function (id) {
      TestService.getTestById(id).then(
        (response) => {
          if (response.data.status == true) {
            let data = response.data.result;
            this.test_detail = {
              id: id,
              testName: data.testName,
              testTime: data.testTime,
              testDateBegin: data.testDateBegin,
              testDateFinish: data.testDateFinish,
              questionTestEntityList: data.questionTestEntityList,
              userTestEntityList: data.userTestEntityList,
            };

            this.questionTestEntityList = data.questionTestEntityList.map(
              (x) => x.question.id
            );

            this.userTestEntityList = data.userTestEntityList.map(
              (x) => x.user.id
            );

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
            title: 'Upload bài thi không thành công',
          });
        }
      );
    },
    update: function () {
      var self = this;

      TestService.updateTestById(
        this.test_detail.id,
        JSON.stringify(this.test_detail)
      ).then(
        (response) => {
          if (response.data.status == true) {
            var question = false;
            var user = false;

            TestService.addQuestionsTestById(
              self.test_detail.id,
              JSON.stringify(self.questionTestEntityList)
            ).then((response) => {
              if (response.data.status == true) {
                self.questionTestEntityList = [];
              } else {
                Swal.fire({
                  icon: 'error',
                  title: response.data.message,
                });
              }
            });

            TestService.addUsersTestById(
              self.test_detail.id,
              JSON.stringify(self.userTestEntityList)
            ).then((response) => {
              if (response.data.status == true) {
                user = true;
                self.userTestEntityList = [];
              } else {
                Swal.fire({
                  icon: 'error',
                  title: response.data.message,
                });
              }
            });

            Swal.fire({
              icon: 'success',
              title: response.data.message,
            });

            self.test_detail = {
              id: '',
              testName: '',
              testTime: '',
              testDateBegin: '',
              testDateFinish: '',
            };

            $('#updateModal').modal('hide');

            self.load();
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
            title: 'Cập nhật bài thi không thành công',
          });
        }
      );
    },
    del: function (id) {
      Swal.fire({
        title: 'Vui lòng xác nhận?',
        text: 'Bạn sẽ không thể khôi phục lại bài thi này!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xoá ngay!',
        cancelButtonText: 'Huỷ',
      }).then((result) => {
        if (result.value) {
          TestService.deleteTestById(id).then(
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
                title: 'Xoá bài thi không thành công',
              });
            }
          );
        }
      });
    },
  },
};
</script>