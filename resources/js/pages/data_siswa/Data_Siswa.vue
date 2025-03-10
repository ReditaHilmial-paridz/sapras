<script>

export default {
    data() {
        return {
            siswaList: [
                { id: 1, nama: 'Yuda', status: '', tanggal_masuk: '', tanggal_keluar: '' },
                { id: 2, nama: '', status: '', tanggal_masuk: '', tanggal_keluar: '' }
            ]
        };
    },
    methods: {
        tambahData() {
            this.$router.push('/tambah');
        },
        editData(index) {
            this.$router.push({ path: '/editsiswa', query: { id: this.siswaList[index].id } });
        },
        hapusData(index) {
            this.siswaList.splice(index, 1);
        }
    }
};

</script>

<template>
    <div class="container mt-4">
        <h2>Data Siswa</h2>
        <div class="mb-3">
            <button class="btn btn-primary" @click="tambahData">Tambah</button>
            <button class="btn btn-success">Import Excel</button>
        </div>
        <div class="mb-3 d-flex justify-content-between">
        <div>
          <label>Show
            <select v-model="entries" class="form-select d-inline w-auto mx-2">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select> entries</label>
        </div>
        <input type="text" v-model="search" class="form-control w-auto" placeholder="Search...">
      </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nama</th>
                    <th>Status</th>
                    <th>Tanggal Masuk</th>
                    <th>Tanggal Keluar</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(siswa, index) in siswaList" :key="index">
                    <td>{{ siswa.id }}</td>
                    <td>{{ siswa.nama }}</td>
                    <td>{{ siswa.status }}</td>
                    <td>{{ siswa.tanggal_masuk }}</td>
                    <td>{{ siswa.tanggal_keluar }}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" @click="editData(index)">✏️</button>
                        <button class="btn btn-sm btn-danger" @click="hapusData(index)">🗑️</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.container {
    max-width: 800px;
}
</style>


