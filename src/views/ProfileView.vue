<!-- ProfileView.vue -->
<script setup>
import UserCredentials from '@/components/UserCredentials.vue';
import { RouterLink } from 'vue-router'

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
        </div>
      </div>
    </div>
  </div>
</template>