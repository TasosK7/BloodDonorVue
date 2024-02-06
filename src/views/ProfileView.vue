<!-- ProfileView.vue -->
<script setup>
import UserCredentials from '@/components/UserCredentials.vue';
import { RouterLink } from 'vue-router'
import { useCitizenStore } from '@/stores/application.js';
const { citizenData } = useCitizenStore();


</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <div class="mb-4">
            <h1>Profile</h1>
          </div>
          <div>
            <UserCredentials />
          </div>
          <div>
            <li class="nav-item">
              <router-link :to="{ name: 'editDetails' }" class="nav-link">Edit Details</router-link>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>