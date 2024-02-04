<script setup>
import {onBeforeMount} from 'vue';
import { RouterView } from 'vue-router';
import {useApplicationStore} from '@/stores/application.js';
import {useCitizenStore} from '@/stores/application.js'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue';

console.log("hey");
const { loadUserData } = useApplicationStore();
const {loadCitizenData} = useCitizenStore();

onBeforeMount(() => {
  loadUserData();
  loadCitizenData();
});
</script>

<template>
  <AppHeader />
  <AppFooter />
  <RouterView />
</template>
