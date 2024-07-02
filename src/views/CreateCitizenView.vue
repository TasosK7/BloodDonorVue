<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
const router = useRouter();
const { userData } = useApplicationStore();
const backendEnvVar = import.meta.env.VITE_BACKEND;

const loading = ref(false);
const citData = ref({
  username:'',
  email:'',
  password: '',
  roles: [
    {
      id: 2,
      name: 'ROLE_USER',
    }
  ]
});
const creationFailed = ref(false);

const onFormSubmit = () => {
  console.log(JSON.stringify(citData.value));
  loading.value = true;
  creationFailed.value = false;

  fetch(`${backendEnvVar}/admin/users/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.accessToken}`

    },
    body: JSON.stringify(citData.value)
  })
    .then((response) => {
      if (response.ok) {
        const myPromise = response.json();
        myPromise.then((result) => {
          const userId = result.id;
          console.log(userId);
          router.push({ name: 'completeCitizen' , params:{id: userId}});
        }).catch((error) => {
          console.error('Error:', error);
        });
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
        <div class="col-12">
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
                -Username must be 3-20 characters long
                -Email must be of correct format
                -Password must be 6-40 characters long
              </div>
            </div>


            <div class="mb-2">
              <label for="usernameFormControl" class="form-label mb-1"
              >Username</label
              >
              </div>
            <div>
              <input
                v-model="citData.username"
                type="text"
                class="form-control-lg"
                id="usernameFormControl"
              />
            </div>

            <div class="mb-2">
              <label for="emailFormControl" class="form-label mb-1"
              >Email</label
              >
            </div><div>
              <input
                v-model="citData.email"
                type="email"
                class="form-control-lg"
                id="emailFormControl"
              />
            </div>

            <div class="mb-2">
              <label for="passwordFormControl" class="form-label mb-1"
              >Password</label
              >
            </div><div>
              <input
                v-model="citData.password"
                type="text"
                class="form-control-lg"
                id="passwordFormControl"
              />
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
