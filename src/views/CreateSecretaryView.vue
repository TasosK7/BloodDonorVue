<<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loading = ref(false);

const secData = ref({
  username:'',
  email:'',
  password: '',
  roles: [
    {
      id: 3,
      name: 'ROLE_SECRETARY',
    }
  ]
});

const creationFailed = ref(false);

const onFormSubmit = () => {
  console.log(JSON.stringify(secData.value));
  loading.value = true;
  creationFailed.value = false;

  fetch('http://localhost:7070/admin/users/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'


    },
    body: JSON.stringify(secData.value)
  })
    .then((response) => {
      if (response.ok) {


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
        <div class="col-12">
          <div class="mb-4">
            <h1>Please provide the Secretary's Information</h1>
          </div>
          <div class="spinner-border" role="status" v-if="loading">
            <span class="visually-hidden">Loading...</span>
          </div>
          <form v-else>
            <div class="mb-2" v-if="creationFailed">
              <div class="alert alert-danger" role="alert">
                Creation failed!
                -Username might be taken
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
                v-model="secData.username"
                type="text"
                class="form-control-lg"
                id="usernameFormControl"
              />
            </div>
            <div class="mb-2">
              <label for="emailFormControl" class="form-label mb-1"
              >Email</label
              >
              </div>
            <div>
              <input
                v-model="secData.email"
                type="email"
                class="form-control-lg"
                id="emailFormControl"
              />
            </div>
            <div class="mb-2">
              <label for="passwordFormControl" class="form-label mb-1"
              >Password</label
              >
              </div>
            <div>
              <input
                v-model="secData.password"
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
