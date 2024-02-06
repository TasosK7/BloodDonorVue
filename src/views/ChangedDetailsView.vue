<script setup>
import { useApplicationStore, useCitizenStore } from '@/stores/application.js'
import { onMounted } from 'vue'
const { setUserData, persistUserData, isAuthenticated } = useApplicationStore();
const {clearCitizenData , setCitizenData , persistCitizenData} = useCitizenStore();
const { userData } = useApplicationStore();

onMounted(async () => {
 clearCitizenData();


    const response = await fetch('http://localhost:7070/citizen', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.accessToken}`,
      },
    });
    const data = await response.json();
    setCitizenData(data);
    persistCitizenData();

});

</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <div class="mb-4">
            <h1>{{userData.username}} your details have changed succesfully !</h1>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>