<template>
  <div>
    <div class="container">
      <div class="jumbotron text-center">
        <h1>Quản lý học viên</h1>
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
            <button class="btn btn-success" @click="create">
              Thêm học viên
            </button>
          </div>

          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Tìm kiếm người dùng"
              v-model="search"
            />
          </div>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Email</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(user, index) in filteredList" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ user.email }}</td>
                <td>
                  <div
                    class="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <button
                      @click="edit(user.id)"
                      type="button"
                      class="btn btn-warning"
                    >
                      Sửa
                    </button>
                    <button
                      @click="del(user.id)"
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
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Thêm học viên mới
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
              name="frm_create"
              @submit.prevent="handleSubmit(store)"
              class="needs-validation"
              novalidate
            >
              <div class="modal-body">
                <ValidationProvider
                  name="Email"
                  rules="required|email"
                  v-slot="{ classes, errors }"
                >
                  <div class="form-group">
                    <label for="email">Địa chỉ email</label>
                    <input
                      v-model="create_user.email"
                      type="email"
                      class="form-control"
                      name="email"
                      :class="classes"
                    />
                    <div class="invalid-feedback" v-if="errors">
                      {{ errors[0] }}
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
                  Đóng
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
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Sửa thông tin học viên
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
              name="frm_update"
              @submit.prevent="handleSubmit(update)"
              class="needs-validation"
              novalidate
            >
              <div class="modal-body">
                <ValidationProvider
                  name="Mật khẩu cũ"
                  rules="required|min:6|max:32"
                  v-slot="{ classes, errors }"
                >
                  <div class="form-group">
                    <label for="password">Mật khẩu cũ</label>
                    <input
                      v-model="update_user.old_password"
                      type="password"
                      class="form-control"
                      name="old_password"
                      :class="classes"
                    />
                    <div class="invalid-feedback" v-if="errors">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  name="Mật khẩu mới"
                  rules="required|min:6|max:32"
                  v-slot="{ classes, errors }"
                >
                  <div class="form-group">
                    <label for="password">Mật khẩu mới</label>
                    <input
                      v-model="update_user.new_password"
                      type="password"
                      class="form-control"
                      name="new_password"
                      :class="classes"
                    />
                    <div class="invalid-feedback" v-if="errors">
                      {{ errors[0] }}
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
                  Đóng
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="loading"
                >
                  Cập nhật
                </button>
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
import UserService from '../../services/userService';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export default {
  name: 'dashboard.user',
  components: {
    AdminSidebar,
  },
  data: function () {
    return {
      loading: false,
      search: '',
      users: [],
      create_user: {
        email: '',
        password: '123456789',
      },
      update_user: {
        id: null,
        old_password: '',
        new_password: '',
      },
    };
  },
  computed: {
    filteredList() {
      return this.users.filter((user) => {
        return user.email.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load: function () {
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
      $('#createModal').modal('show');
    },
    store: function () {
      UserService.createNewUser(
        this.create_user.email,
        this.create_user.password
      ).then(
        (response) => {
          if (response.data.status == true) {
            // message;
            Swal.fire({
              icon: 'success',
              title: response.data.message,
            });

            this.create_user.email = '';

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
            title: 'Thêm học viên không thành công',
          });
        }
      );
    },
    edit: function (id) {
      this.update_user.id = id;
      $('#updateModal').modal('show');
    },
    update: function () {
      UserService.updateUserById(
        this.update_user.id,
        this.update_user.old_password,
        this.update_user.new_password
      ).then(
        (response) => {
          if (response.data.status == true) {
            // message;
            Swal.fire({
              icon: 'success',
              title: response.data.message,
            });

            this.update_user.id = null;
            this.update_user.old_password = '';
            this.update_user.new_password = '';

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
            title: 'Thêm học viên không thành công',
          });
        }
      );
    },
    del: function (id) {
      Swal.fire({
        title: 'Vui lòng xác nhận?',
        text: 'Bạn sẽ không thể khôi phục lại người dùng này!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xoá ngay!',
        cancelButtonText: 'Huỷ',
      }).then((result) => {
        if (result.value) {
          UserService.deleteUserById(id).then(
            (response) => {
              if (response.data.status == true) {
                // message;
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
              // console.log(error.response);
              Swal.fire({
                icon: 'error',
                title: 'Xoá học viên không thành công',
              });
            }
          );
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        }
      });
    },
  },
};
</script>