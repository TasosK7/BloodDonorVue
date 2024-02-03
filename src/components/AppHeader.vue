<script setup>
import { RouterLink } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
const applicationStore = useApplicationStore();
</script>

<template>
  <h1 class="app-title">Blood Donor App</h1>
  <header class="text-bg-dark custom-header">
    <div class="container">
      <div class="d-flex flex-wrap justify-content-center py-2 px-3">
        <ul class="nav">
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
            <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
            <router-link :to="{ name: 'applications' }" class="nav-link">My Applications</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
            <router-link :to="{ name: 'createNewApplication' }" class="nav-link">Apply For Donation</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
            <router-link :to="{ name: 'profile' }" class="nav-link">My Profile</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === false">
            <router-link :to="{ name: 'login' }" class="nav-link text-white">Login</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === false">
            <router-link :to="{ name: 'register' }" class="nav-link text-white">Register</router-link>
          </li>
          <li class="nav-item" v-if="applicationStore.isAuthenticated === true">
            <router-link :to="{ name: 'logout' }" class="nav-link text-white">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  font-size: 26px;
}

.text-bg-dark {
  background-color: #333;
  color: #fff;
}

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: inline-block;
  margin-right: 25px;
  margin-left: 25px;
  font-style: italic;
  font-size: 36px;
}

.app-title {
  font-family: "Luminari, fantasy";
  font-size: 70px;
  margin-bottom: 30px;
  color: #D13B18;
  text-align: center;
}

.custom-header {
  min-width: 700px; /* Adjust the width as needed */
  margin: 0 auto; /* Center the header horizontally */
}
</style>


