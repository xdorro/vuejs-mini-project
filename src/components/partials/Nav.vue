<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" ui-sref="home">
      <img :src="require('../../assets/img/Logo_TTC.png')" width="150px" />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">Trang chủ</router-link>
        </li>

        <li class="nav-item" v-if="isAdmin">
          <router-link to="/dashboard" class="nav-link">Admin</router-link>
        </li>
      </ul>

      <ul class="navbar-nav my-2 my-lg-0">
        <li class="nav-item" v-if="isLogin">
          <a class="nav-link" @click="logout">Đăng xuất</a>
        </li>
        <li class="nav-item" v-else>
          <router-link to="/login" class="nav-link">Đăng nhập</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { authService } from "../../services/authService";
import router from "../../router";

export default {
  name: "Nav",
  data() {
    return {
      currentUser: null,
    };
  },
  computed: {
    isLogin() {
      return authService.isAuthenticated();
    },
    isAdmin() {
      return authService.isAuthorized("ROLE_ADMIN");
    },
  },
  created() {
    // authService.currentUser.subscribe((x) => (this.currentUser = x));
  },
  methods: {
    logout() {
      authService.logout();
      router.push("/login");
    },
  },
};
</script>