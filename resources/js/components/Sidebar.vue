<template>
  <div class="d-flex flex-column vh-100 sidebar">
    <!-- Sidebar Header -->

    <!-- Sidebar Menu -->
    <ul class="nav flex-column mt-2">
      <li v-for="item in menuItems" :key="item.path" class="nav-item">
        <router-link 
          v-if="!item.children"
          :to="item.path"
          class="nav-link d-flex align-items-center px-3 py-2"
          :class="{ 'active': $route.path === item.path }"
        >
          <i :class="item.icon" class="me-2"></i> 
          <span>{{ item.name }}</span>
        </router-link>

        <!-- Dropdown Arsip -->
        <div v-else>
          <a 
            @click="toggleDropdown"
            class="nav-link d-flex align-items-center px-3 py-2 dropdown-toggle"
            :class="{ 'active': isDropdownOpen }"
          >
            <i :class="item.icon" class="me-2"></i> 
            <span>{{ item.name }}</span>
          </a>
          <ul v-if="isDropdownOpen" class="nav flex-column ms-4">
            <li v-for="sub in item.children" :key="sub.path" class="nav-item">
              <router-link :to="sub.path" class="nav-link px-3 py-2">
                <i :class="sub.icon" class="me-2"></i> {{ sub.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>

import { ref } from 'vue';

// Daftar menu sidebar
const menuItems = ref([
  { name: 'Dashboard', path: '/', icon: 'bi bi-house-door' },
  { name: 'Manajemen Akun', path: '/akun', icon: 'bi bi-person' },
  { name: 'Fasilitas', path: '/fasilitas', icon: 'bi bi-hdd-stack' },
  { name: 'Petugas', path: '/petugas', icon: 'bi bi-people' },
  { name: 'Data Siswa', icon: 'bi bi-person-lines-fill' ,
    children: [
        { name: 'Data Siswa', path: '/datasiswa/datasiswa', icon: 'bi bi-file-earmark-text' },
        { name: 'Edit Siswa', path: '/datasiswa/editsiswa', icon: 'bi bi-file-earmark-text' }
      ]
    },
  { 
    name: 'Arsip', 
    icon: 'bi bi-archive',
    children: [
      { name: 'Form Surat', path: '/arsip/surat', icon: 'bi bi-file-earmark-text' },
      { name: 'Data Surat', path: '/arsip/data', icon: 'bi bi-file-earmark' }
    ]
  }
]);

// State untuk dropdown arsip
const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #fff;
  border-right: 1px solid #ddd;
}

.nav-link {
  font-size: 16px;
  color: #333;
  transition: background 0.3s ease-in-out;
  cursor: pointer;
}

.nav-link i {
  font-size: 18px;
}

.nav-link:hover {
  background-color: #e9ecef;
}

.nav-link.active {
  background-color: #0d6efd !important;
  color: white !important;
  font-weight: bold;
}

/* Dropdown */
.dropdown-toggle::after {
  content: none; /* Hapus default dropdown icon Bootstrap */
}

.nav .nav-item .nav-link {
  padding-left: 40px;
}
</style>
