<template>
  <div class="layout">
    <!-- Header -->
    <Header class="header" />

    <div class="content-wrapper">
      <!-- Sidebar -->
      <Sidebar class="sidebar" />

      <!-- Main Content -->
      <div class="main-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
</script>

<style scoped>
/* Mengatur tata letak utama */
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Header tetap di atas */
.header {
  width: 100%;
  height: 50px; /* Sesuaikan tinggi header */
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0d6efd; /* Warna Bootstrap Primary */
  z-index: 1000;
}

/* Wrapper untuk sidebar dan konten utama */
.content-wrapper {
  display: flex;
  flex: 1;
  margin-top: 50px; /* Sesuaikan dengan tinggi header */
}

/* Sidebar di kiri */
.sidebar {
  width: 250px;
  height: calc(100vh - 50px); /* Kurangi tinggi header */
  background: white;
  border-right: 1px solid #ddd;
  position: fixed;
  left: 0;
  top: 50px;
  overflow-y: auto;
}

/* Konten utama di samping sidebar */
.main-content {
  flex: 1;
  margin-left: 250px; /* Sesuaikan dengan lebar sidebar */
  padding: 20px;
}
</style>
