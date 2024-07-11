<script setup>
import { onMounted, ref  , computed} from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useCitizenStore } from '@/stores/application.js';
import { useApplicationStore } from '@/stores/application.js';
const { setCitizenData, persistCitizenData, isAuthenticated } = useCitizenStore();
const { userData } = useApplicationStore();
const { citizenData } = useCitizenStore();
const backendEnvVar = import.meta.env.VITE_BACKEND + "/api";


const loading = ref(false);
const authenticationFailed = ref(false);
const welcomeMessage = ref('');


onMounted(async () => {
  if (userData.roles.includes("ROLE_USER")) {
   // try {
    welcomeMessage.value = `Welcome ${userData.username}, now you can apply for a donation.`;
    const response = await fetch(`${backendEnvVar}/citizen`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.accessToken}`,
      },
    });
          const data = await response.json();
    setCitizenData(data);
    persistCitizenData(); 



    //   loading.value = true;
    //   const response = await fetch('http://localhost:7070/citizen', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${userData.accessToken}`,
    //     },
    //   });
    //
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //
    //   citizenData.value = await response.json();
    //   setCitizenData(citizenData.value);
    //   persistCitizenData();
    //   console.log("USER", citizenData.value);
    // } catch (error) {
    //   console.error('Error fetching citizen data:', error);
    //   authenticationFailed.value = true;
    // } finally {
    //   loading.value = false;
    // }
    //
    //  console.log("USER");
     // const urlRef = ref('http://localhost:7070/citizen');
     // const authRef = ref(true);
     // const { data, performRequest } = useRemoteData(urlRef, authRef);
     // performRequest();
     //  const jsonData = JSON.parse(data.value);
     //  setCitizenData(jsonData);
     //  persistCitizenData();


  }else if(userData.roles.includes("ROLE_SECRETARY")) {
    welcomeMessage.value = `Welcome ${userData.username}, you can now handle applications.`;
    console.log("SEC");
  }else if(userData.roles.includes("ROLE_ADMIN")) {
    welcomeMessage.value = `Welcome ${userData.username}, you can freely handle the users of the system`;
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
            <h1>Home</h1>
          </div>
          <div>
            <p>{{welcomeMessage}}</p>
<!--            <p>-->
<!--              Logged in as: <strong>{{ userData.username }}</strong>-->
<!--              Role :<strong>{{ userData.roles }}</strong>-->
<!--            </p>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


