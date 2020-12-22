<template>
  <div>
    <div class="container">
      <div class="jumbotron text-center">
        <h1>Chấm điểm tự luận học viên</h1>
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
            <button type="button" class="btn btn-success">
              Hoàn thành chấm bài
            </button>
          </div>

          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              @submit.prevent="handleSubmit(store)"
              class="needs-validation"
              novalidate
            >
              <div
                class="card mb-5"
                v-for="(task, index) in filteredList"
                :key="index"
              >
                <div class="card-body">
                  <h5 class="card-title">Câu hỏi: {{ task.id }}</h5>
                  <p class="card-text">Trả lời: {{ task.id }}</p>

                  <div class="form-group">
                    <ValidationProvider
                      name="Điểm"
                      rules="required|integer"
                      v-slot="{ classes, errors }"
                    >
                      <label>Điểm (10/10): </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Điểm"
                        :class="classes"
                      />
                      <div class="invalid-feedback" v-if="errors">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
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