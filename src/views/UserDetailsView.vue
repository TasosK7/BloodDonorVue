<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js'
const { userData } = useApplicationStore();
const values = ref([]);
const loading = ref(true);
const backendEnvVar = import.meta.env.VITE_BACKEND + "/api";

const router = useRouter();
const route = useRoute();
const userIdRef = ref(null);

onMounted(async () => {
  userIdRef.value = route.params.id;
  console.log(userIdRef.value);
  try {
    const response = await fetch(`${backendEnvVar}/admin/` + userIdRef.value , {
      method: 'PUT',
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
    <h1>User Details</h1>
    <div>
      <strong>Username:</strong> {{ values.username}}
    </div>
    <div>
      <strong>Last Name:</strong> {{ values.email }}
    </div>
    <div>
      <strong>Email:</strong> {{ values.role }}
    </div>
    <div>
      <strong>Phone number:</strong> {{ values.phone_number }}
    </div>
  </div>
</template>