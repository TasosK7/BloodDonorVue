<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js'
const { userData } = useApplicationStore();
const values = ref([]);
const loading = ref(true);

const router = useRouter();
const route = useRoute();
const applicationIdRef = ref(null);
const backendEnvVar = import.meta.VITE_BACKEND;

onMounted(async () => {
  applicationIdRef.value = route.params.id;
  console.log(applicationIdRef.value);
  try {
    const response = await fetch('{{backendEnvVar}}'+'/secretary/' + applicationIdRef.value, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.accessToken}`,
      },
    });
    const data = await response.json();
    values.value = data;
    loading.value = false;
    console.log("data" ,data);
  } catch (error) {
    console.error('Error fetching data:', error);
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h1>Applicant's Details</h1>
    <div>
      <strong>First Name:</strong> {{ values.fname }}
    </div>
    <div>
      <strong>Last Name:</strong> {{ values.lname }}
    </div>
    <div>
      <strong>Email:</strong> {{ values.email }}
    </div>
    <div>
      <strong>Phone number:</strong> {{ values.phone_number }}
    </div>
    <div>
      <strong>Date of Birth:</strong> {{ values.date_of_birth }}
    </div>
    <div>
      <strong>Address:</strong> {{ values.address }}
    </div>
    <div>
      <strong>Blood Type:</strong> {{ values.blood_type }}
    </div>
  </div>
</template>

