<template>
  <div class="list-group pb-3">
    <router-link to="/dashboard" class="list-group-item list-group-item-action"
      >Bảng điều khiển</router-link
    >
    <router-link
      to="/dashboard/users"
      class="list-group-item list-group-item-action"
      >Danh sách học viên</router-link
    >
    <router-link
      to="/dashboard/questions"
      class="list-group-item list-group-item-action"
      >Danh sách câu hỏi</router-link
    >
    <router-link
      to="/dashboard/tests"
      class="list-group-item list-group-item-action"
      >Danh sách bài thi</router-link
    >
  </div>
</template>