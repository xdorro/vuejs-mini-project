<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <AdminSidebar />
      </div>
      <div class="col-lg-9">
        <div class="jumbotron text-center">
          <h1>Ahihi</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminSidebar from "@/components/partials/AdminSidebar";

export default {
  name: "users",
  components: {
    AdminSidebar,
  },
};
</script>