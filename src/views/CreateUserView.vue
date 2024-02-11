<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div class="bg-body-tertiary">
    <div class="row py-4 px-3">
        <div class="mb-4">
  <h1> Select if you want to create a <b>Citizen</b> or a <b>Secretary</b></h1>
  <div class = " center-container">
  <td><button @click="router.push({ name: 'createCitizen' })" class="btn btn-primary btn-lg">
    Create Citizen
  </button></td>
  <td><button @click="router.push({ name: 'createSecretary' })" class="btn btn-primary btn-lg">
    Create Secretary
  </button></td>
         </div>
        </div>
      </div>

</div>
</template>


<style scoped>
.center-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 20vh; /* Adjust as needed to center vertically */
}

.btn {
  margin-right: 40px; /* Adjust the margin for horizontal spacing */
}
</style>