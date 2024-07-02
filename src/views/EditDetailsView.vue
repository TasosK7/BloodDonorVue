<script setup>
import { useApplicationStore, useCitizenStore } from '@/stores/application.js'
const { citizenData , clearCitizenData } = useCitizenStore();
const {userData} = useApplicationStore();
const backendEnvVar = import.meta.VITE_BACKEND;
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const details = ref({
  phone_number: citizenData.phone_number,
  email: citizenData.email
});
const onFormSubmit = () => {

  fetch('{{backendEnvVar}}'+'/citizen/'+citizenData.id+ '/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.accessToken}`
    },
    body: JSON.stringify(details.value)
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          router.push({ name: 'changedDetails' });
          console.log("We good" +data);
          clearCitizenData();
        });
      } else {
        console.log("Oops");
      }
    })
};





</script>
<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <div class="mb-4">
            <h1>Edit Your Profile here</h1>


            <div class="mb-2">
              <label for="phoneNumberFormControl" class="form-label mb-1"
              >Phone Number</label
              >
            </div>
            <div>
              <input
                v-model="details.phone_number"
                type="text"
                class="form-control-lg"
                id="phoneNumberFormControl"
              />
            </div>
            <div class="mb-2">
              <label for="emailFormControl" class="form-label mb-1"
              >Email</label
              >
            </div>
            <div>
              <input
                v-model="details.email"
                type="text"
                class="form-control-lg"
                id="emailFormControl"
              />
            </div>

            <button @click="onFormSubmit" type="submit" class="btn btn-primary btn-lg">
              Submit Changes
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>