<template>
  <div class="container mt-4">
    <!-- Search & Button -->
    <div class="d-flex align-items-center gap-2 mb-3">
      <input v-model="search" type="text" class="form-control flex-grow-3" placeholder="cari..." style="max-width: 910px;">
      <button class="btn btn-success px-6" @click="openModal('add')">Tambah Akun</button>
    </div>

    <!-- Table -->
    <table class="table table-bordered text-center">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Email</th>
          <th>Role</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span :class="getRoleClass(user.role)" class="badge">{{ user.role }}</span>
          </td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="openModal('edit', user)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm" @click="openModal('delete', user)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5)">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title w-100 text-center">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <form v-if="modalType !== 'delete'" @submit.prevent="submitForm">
              <div class="mb-3">
                <label class="form-label">Nama</label>
                <input v-model="modalData.name" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">E-mail</label>
                <input v-model="modalData.email" type="email" class="form-control" required>
              </div>
              <div v-if="modalType === 'add'" class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="modalData.password" type="password" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Role</label>
                <select v-model="modalData.role" class="form-select">
                  <option value="siswa aktif">Siswa Aktif</option>
                  <option value="calon siswa">Calon Siswa</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>

              <div class="d-flex justify-content-center">
                <button type="submit" :class="modalType === 'edit' ? 'btn btn-warning' : 'btn btn-success'">
                  Simpan
                </button>
                <button type="button" class="btn btn-secondary ms-2" @click="closeModal">Batal</button>
              </div>
            </form>

            <!-- Konfirmasi Hapus -->
            <div v-else>
              <p class="text-center">Apakah Anda yakin ingin menghapus akun <strong>{{ modalData.name }}</strong>?</p>
              <div class="d-flex justify-content-center">
                <button class="btn btn-danger" @click="deleteUser">Hapus</button>
                <button class="btn btn-secondary ms-2" @click="closeModal">Batal</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const users = ref([]);
const search = ref("");
const showModal = ref(false);
const modalType = ref("");
const modalTitle = ref("");
const modalData = ref({ name: "", email: "", password: "", role: "siswa aktif" });
const selectedUserId = ref(null);

// Ambil data dari API saat komponen dimuat
const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/siswa");
    console.log("Data dari API:", response.data); // Debugging
    users.value = Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
};

onMounted(fetchUsers);

// Filter pencarian
const filteredUsers = computed(() =>
  Array.isArray(users.value)
    ? users.value.filter((user) =>
        user.name.toLowerCase().includes(search.value.toLowerCase()) ||
        user.email.toLowerCase().includes(search.value.toLowerCase()) ||
        user.role.toLowerCase().includes(search.value.toLowerCase())
      )
    : []
);

// Modal Handling
const openModal = (type, user = null) => {
  modalType.value = type;
  selectedUserId.value = user ? user.id : null;

  if (type === "add") {
    modalTitle.value = "Buat Akun Baru";
    modalData.value = { name: "", email: "", password: "", role: "siswa aktif" };
  } else if (type === "edit") {
    modalTitle.value = "Edit Akun";
    modalData.value = { ...user, password: "" };
  } else if (type === "delete") {
    modalTitle.value = "Konfirmasi Hapus";
    modalData.value = { ...user };
  }

  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

// Tambah atau Edit User
const submitForm = async () => {
  try {
    if (modalType.value === "add") {
      await axios.post("http://localhost:8000/api/siswa", modalData.value);
    } else if (modalType.value === "edit") {
      await axios.put(`http://localhost:8000/api/siswa/${modalData.value.id}`, modalData.value);
    }
    closeModal();
    fetchUsers(); // Perbarui data setelah perubahan
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
  }
};

// Hapus User
const deleteUser = async () => {
  try {
    if (selectedUserId.value !== null) {
      await axios.delete(`http://localhost:8000/api/siswa/${selectedUserId.value}`);
    }
    closeModal();
    fetchUsers(); // Perbarui data setelah penghapusan
  } catch (error) {
    console.error("Gagal menghapus data:", error);
  }
};

// Class Badge untuk Role
const getRoleClass = (role) => {
  return {
    "siswa aktif": "bg-primary text-white",
    "calon siswa": "bg-success text-white",
    "alumni": "bg-warning text-dark",
  }[role] || "bg-secondary text-white";
};
</script>


<style scoped>
.modal.fade.show {
  display: block;
}
.badge {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}
</style>
