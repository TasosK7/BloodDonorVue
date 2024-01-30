<script setup>
import { onMounted, ref  , computed} from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';
const { setUserData, persistUserData, isAuthenticated } = useApplicationStore();
const { userData } = useApplicationStore();


onMounted(() => {
  if(userData.roles.includes("ROLE_USER")) {
    console.log("USER");
    const urlRef = ref('http://localhost:7070/citizen');
    const authRef = ref(true);
    const { data, performRequest } = useRemoteData(urlRef, authRef);
    performRequest();
    setUserData(data);
    persistUserData();

  }else if(userData.roles.includes("ROLE_SECRETARY")) {
    console.log("SEC");
  }else if(userData.roles.includes("ROLE_ADMIN")) {
    console.log("ADMIN");
  }
});
</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <div class="mb-4">
            <h1 class="fs-3">Home</h1>
          </div>
          <div>
            <p>
              Logged in as: <strong>{{ userData.username }}</strong>
              Role :<strong>{{ userData.roles }}</strong>
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
