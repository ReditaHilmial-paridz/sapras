<script>
export default {
    data() {
        return {
            id: this.$route.query.id,
            nama: '',
            status: '',
            tanggal_masuk: '',
            tanggal_keluar: ''
        };
    },
    methods: {
        simpanData() {
            alert(`Data siswa dengan ID ${this.id} telah disimpan.`);
            this.$router.push('/');
        },
        batalEdit() {
            this.$router.push('/');
        }
    }
};
</script>

<template>
    <div class="container mt-4">
        <h2>Edit Data Siswa</h2>
        <form>
            <div class="mb-3">
                <label class="form-label">Nama</label>
                <input type="text" class="form-control" v-model="nama">
            </div>
            <div class="mb-3">
                <label class="form-label">Status</label>
                <input type="text" class="form-control" v-model="status">
            </div>
            <div class="mb-3">
                <label class="form-label">Tanggal Masuk</label>
                <input type="date" class="form-control" v-model="tanggal_masuk">
            </div>
            <div class="mb-3">
                <label class="form-label">Tanggal Keluar</label>
                <input type="date" class="form-control" v-model="tanggal_keluar">
            </div>
            <button type="button" class="btn btn-success" @click="simpanData">Simpan</button>
            <button type="button" class="btn btn-secondary ms-2" @click="batalEdit">Batal</button>
        </form>
    </div>
</template>

<style scoped>
.container {
    max-width: 600px;
}
</style>
