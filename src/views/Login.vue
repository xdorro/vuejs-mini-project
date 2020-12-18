<template>
  <div class="container">
    <div class="col-lg-6 mx-auto">
      <div class="jumbotron">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="email">Địa chỉ email</label>
            <input
              type="text"
              v-model.trim="$v.email.$model"
              name="email"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.email.$error }"
            />
            <div
              v-if="submitted && !$v.email.required"
              class="invalid-feedback"
            >
              Email không được để trống
            </div>
            <div v-if="submitted && !$v.email.email" class="invalid-feedback">
              Email không đúng định dạng
            </div>
          </div>
          <div class="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              v-model.trim="$v.password.$model"
              name="password"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.password.$error }"
            />
            <div
              v-if="submitted && !$v.password.required"
              class="invalid-feedback"
            >
              Mật khẩu không được để trống
            </div>
            <div
              v-if="submitted && !$v.password.minLength"
              class="invalid-feedback"
            >
              Mật khẩu cần ít nhất 6 ký tự
            </div>
            <div
              v-if="submitted && !$v.password.maxLength"
              class="invalid-feedback"
            >
              Mật khẩu tối đa 32 ký tự
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" :disabled="loading">
              <span
                class="spinner-border spinner-border-sm"
                v-show="loading"
              ></span>

              <span>Đăng nhập</span>
            </button>
          </div>

          <div v-if="error" class="alert alert-danger">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

import router from "@/router";
import { authService } from "@/services/authService";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      error: "",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(32),
    },
  },
  created() {
    // redirect to home if already logged in
    if (authService.isAuthenticated()) {
      return router.push("/");
    }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  methods: {
    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.loading = true;
      authService.login(this.email, this.password).then(
        () => router.push(this.returnUrl),
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
    },
  },
};
</script>