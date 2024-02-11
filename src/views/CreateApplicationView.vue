<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useApplicationStore, useCitizenStore } from '@/stores/application.js'
const { citizenData  } = useCitizenStore();
const { userData} = useApplicationStore();
const router = useRouter();
console.log('Citizen ID:', citizenData.id);

const loading = ref(false);
const applicationData = ref({
  recent_blood_tests:''

});


const applicationFailed = ref(false);

const onFormSubmit = () => {
  console.log(JSON.stringify(applicationData.value));
  loading.value = true;
  applicationFailed.value = false;

  fetch('http://localhost:7070/citizen/'+citizenData.id+'/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.accessToken}`

    },
    body: JSON.stringify(applicationData.value)
  })
    .then((response) => {
      if (response.ok) {


        router.push({ name: 'thankyou' });

      } else {
        applicationFailed.value = true;
      }
    })
    .catch((err) => {
      console.warn(err);
      applicationFailed.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
};
onMounted(() => {
  console.log(citizenData.id);
});


</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-4">
          <div class="mb-4">
            <h1>Apply for blood Donation here!</h1>
          </div>
          <div class="spinner-border" role="status" v-if="loading">
            <span class="visually-hidden">Loading...</span>
          </div>
          <form v-else>
            <div class="mb-2" v-if="applicationFailed">
              <div class="alert alert-danger" role="alert">
                Application failed!
                -Every field must not be blank
              </div>
            </div>


            <div class="mb-2">
              <label for="recentBloodTestsFormControl" class="form-label mb-1"
              >Recent Blood Tests</label
              >
              <input
                v-model="applicationData.recent_blood_tests"
                type="text"
                class="form-control"
                id="usernameFormControl"
              />
            </div>

            <button @click="onFormSubmit" type="submit" class="btn btn-primary btn-lg">
              Apply
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
