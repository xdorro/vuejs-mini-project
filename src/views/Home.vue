<template>
  <div class="container">
    <div class="jumbotron text-center">
      <h1>Hello, world!</h1>
      <p>
        This page demonstrates
        <span class="text-danger">nested</span> views.
      </p>
    </div>
  </div>
</template>

<script>
// import UserService from './services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: '',
    };
  },
  mounted() {
    // UserService.getPublicContent().then(
    //   (response) => {
    //     this.content = response.data;
    //   },
    //   (error) => {
    //     this.content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  },
};
</script>
