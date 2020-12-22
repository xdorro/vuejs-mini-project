<template>
  <div>
    <div class="container">
      <div class="jumbotron text-center">
        <h1>Danh sách học viên trong bài thi</h1>
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
            <input
              type="email"
              class="form-control"
              placeholder="Tìm kiếm học viên"
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
                <td>{{ user.user.email }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'dashboard.tests.users.tasks',
                      params: {
                        test_id: test_id,
                        user_id: user.user.id,
                      },
                    }"
                    class="btn btn-info"
                    >Chấm bài</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminSidebar from '@/views/Sidebar.vue';
import TestService from '@/services/testService';

export default {
  name: 'dashboard.tests.users.tasks',
  components: {
    AdminSidebar,
  },
  data: function () {
    return {
      loading: false,
      search: '',
      users: [],
      test_id: '',
    };
  },
  computed: {
    filteredList() {
      return this.users.filter((user) => {
        return user.user.email
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
      var self = this;

      self.test_id = self.$route.params.test_id;

      TestService.getTestById(self.$route.params.test_id).then(
        (response) => {
          if (response.data.status == true) {
            this.users = response.data.result.userTestEntityList;
          }
        },
        () => {}
      );
    },
  },
};
</script>