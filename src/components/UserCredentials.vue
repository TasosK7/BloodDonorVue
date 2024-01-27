<script setup>
import { useApplicationStore } from '@/stores/application.js';
const { userData } = useApplicationStore();
</script>
<template>
  <div>
    <div>
      <strong>First Name:</strong> {{ userData.fname }}
    </div>
    <div>
      <strong>Last Name:</strong> {{ userData.lname }}
    </div>
    <div>
      <strong>Email:</strong> {{ userData.email }}
    </div>
    <div>
      <strong>Phone number:</strong> {{ userData.phone_number }}
    </div>
    <div>
      <strong>Address:</strong> {{ userData.address }}
    </div>
    <div>
      <strong>Address:</strong> {{ userData.address }}
    </div>
    <div>
      <strong>Blood Type:</strong> {{ userData.blood_type }}
    </div>
  </div>
</template>

