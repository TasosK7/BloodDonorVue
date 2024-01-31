<script setup>

import { useCitizenStore } from '@/stores/application.js';
const { citizenData } = useCitizenStore();
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';

</script>
<template>
  <div>
    <div>
      <strong>First Name:</strong> {{ citizenData.fname }}
    </div>
    <div>
      <strong>Last Name:</strong> {{ citizenData.lname }}
    </div>
    <div>
      <strong>Email:</strong> {{ citizenData.email }}
    </div>
    <div>
      <strong>Phone number:</strong> {{ citizenData.phone_number }}
    </div>
    <div>
      <strong>Date of Birth:</strong> {{ citizenData.date_of_birth }}
    </div>
    <div>
      <strong>Address:</strong> {{ citizenData.address }}
    </div>
    <div>
      <strong>Blood Type:</strong> {{ citizenData.blood_type }}
    </div>
  </div>
</template>

