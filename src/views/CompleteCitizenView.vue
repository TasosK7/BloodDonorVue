<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApplicationStore } from '@/stores/application.js';
const router = useRouter();
const route = useRoute();
const userIdRef = ref(null);
const loading = ref(false);
const { userData } = useApplicationStore();
const backendEnvVar = import.meta.VITE_BACKEND;

const citizenData = ref({
  fname: '',
  lname: '',
  phone_number: '',
  date_of_birth:'',
  address: '',
  blood_type: ''

});

const creationFailed = ref(false);

onMounted(async () => {
  userIdRef.value = route.params.id;
  console.log(userIdRef.value);
});

const onFormSubmit = () => {
  console.log(JSON.stringify(citizenData.value));
  loading.value = true;
  creationFailed.value = false;

  fetch('{{backendEnvVar}}'+'/admin/'+ userIdRef.value +'/citizen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.accessToken}`

    },
    body: JSON.stringify(citizenData.value)
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.json());
        router.push({ name: 'creationSuccess' });

      } else {
        creationFailed.value = true;
      }
    })
    .catch((err) => {
      console.warn(err);
      creationFailed.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-4">
          <div class="mb-4">
            <h1>Please provide the Citizen's Information</h1>
          </div>
          <div class="spinner-border" role="status" v-if="loading">
            <span class="visually-hidden">Loading...</span>
          </div>
          <form v-else>
            <div class="mb-2" v-if="creationFailed">
              <div class="alert alert-danger" role="alert">
                Registration failed!
                -Every field must not be blank
                -Phone Number must be of 10 digits exactly
              </div>
            </div>

            <div class="mb-2">
              <label for="firstNameFormControl" class="form-label mb-1"
              >First Name</label
              >
              <input
                v-model="citizenData.fname"
                type="text"
                class="form-control-lg"
                id="firstNameFormControl"
              />
            </div>


            <div class="mb-2">
              <label for="lastNameFormControl" class="form-label mb-1"
              >Last Name</label
              >
              <input
                v-model="citizenData.lname"
                type="text"
                class="form-control-lg"
                id="lastNameFormControl"
              />
            </div>




            <div class="mb-2">
              <label for="phoneNumberFormControl" class="form-label mb-1"
              >Phone Number</label
              >
              <input
                v-model="citizenData.phone_number"
                type="text"
                class="form-control-lg"
                id="phoneNumberFormControl"
              />
            </div>

            <div class="mb-2">
              <label for="dateOfBirthFormControl" class="form-label mb-1"
              >Date of Birth</label
              >
              <input
                v-model="citizenData.date_of_birth"
                type="text"
                class="form-control-lg"
                id="dateOfBirthFormControl"
              />
            </div>


            <div class="mb-2">
              <label for="addressFormControl" class="form-label mb-1"
              >Address</label
              >
              <input
                v-model="citizenData.address"
                type="text"
                class="form-control-lg"
                id="addressFormControl"
              />
            </div>

            <div class="mb-2">
              <label for="bloodTypeFormControl" class="form-label mb-1"
              >Blood Type</label
              >
            </div><div>
            <select v-model="citizenData.blood_type" class="form-control-lg" id="roleFormControl">
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

            <button @click="onFormSubmit" type="submit" class="btn btn-primary btn-lg">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
