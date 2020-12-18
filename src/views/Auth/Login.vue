<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />

      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          name="form_login"
          @submit.prevent="handleSubmit(handleLogin)"
          class="needs-validation"
          novalidate
        >
          <ValidationProvider
            name="Email"
            rules="required|email"
            v-slot="{ classes, errors }"
          >
            <div class="form-group">
              <label for="email">Địa chỉ email</label>
              <input
                v-model="user.email"
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

          <ValidationProvider
            name="Mật khẩu"
            rules="required|min:6|max:32"
            v-slot="{ classes, errors }"
          >
            <div class="form-group">
              <label for="password">Mật khẩu</label>
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                name="password"
                :class="classes"
              />
              <div class="invalid-feedback" v-if="errors">
                {{ errors[0] }}
              </div>
            </div>
          </ValidationProvider>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span>
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                Đăng nhập</span
              >
            </button>
          </div>
          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import User from '@/models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      window.location.replace('/');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;

      if (this.user.email && this.user.password) {
        this.loading = false;

        this.$store.dispatch('auth/login', this.user).then(
          () => {
            window.location.replace('/');
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 450px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>