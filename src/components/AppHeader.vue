<script setup>
import { RouterLink } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
//const applicationStore = useApplicationStore();
</script>

<!-- TestHeader.vue -->
<template>
    <h1>Blood Donor App</h1>
    <header class="text-bg-dark">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-center py-2 px-3">

        <ul class="nav">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'applications' }" class="nav-link">My Applications</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'profile' }" class="nav-link">My Profile</router-link>
          </li>
           <li class="nav-item" >
                        <router-link :to="{ name: 'login' }" class="nav-link text-white"
                            >Login</router-link>         
           </li>
           <li class="nav-item" >
                        <router-link :to="{ name: 'register' }" class="nav-link text-white"
                            >Register</router-link>         
           </li>

        </ul>
      </div>
    </div>
    </header>
  </template>
