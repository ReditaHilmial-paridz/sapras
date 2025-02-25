<template>
    <div class="container mt-5">
      <div class="card p-4 shadow-sm">
        <h3 class="text-center">SURAT KABAR LAMA (KABAR GWEH MAHAL CUY)</h3>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label class="form-label">Nama Dokumen :</label>
            <input type="text" v-model="form.namaDokumen" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Nama Pengirim :</label>
            <input type="text" v-model="form.namaPengirim" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Nama Penerima :</label>
            <input type="text" v-model="form.namaPenerima" class="form-control">
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label">Kategori Surat :</label>
              <select v-model="form.kategori" class="form-select">
                <option value="">Kategori</option>
                <option value="Resmi">Resmi</option>
                <option value="Pribadi">Pribadi</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Tujuan Surat :</label>
              <select v-model="form.tujuan" class="form-select">
                <option value="">Tujuan</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Pemerintahan">Pemerintahan</option>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Upload File :</label>
            <input type="file" class="form-control" @change="handleFileUpload">
          </div>
          <button type="submit" class="btn btn-dark w-100">Kirim</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          namaDokumen: '',
          namaPengirim: '',
          namaPenerima: '',
          kategori: '',
          tujuan: '',
          file: null
        }
      };
    },
    methods: {
      handleFileUpload(event) {
        this.form.file = event.target.files[0];
      },
      submitForm() {
        console.log("Data yang dikirim:", this.form);
        alert("Form berhasil dikirim!");
      }
    }
  };
  </script>
  
  <style>
  body {
    background-color: #f8f9fa;
  }
  </style>