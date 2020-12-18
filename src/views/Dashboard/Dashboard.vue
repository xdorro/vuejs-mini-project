<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <AdminSidebar />
      </div>
      <div class="col-lg-9">
        <div class="jumbotron text-center">
          <h1>Trang quản trị</h1>
          <p>
            This page demonstrates
            <span class="text-danger">nested</span> views.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminSidebar from '../../views/Sidebar';

export default {
  name: 'dashboard',
  components: {
    AdminSidebar,
  },
};
</script>