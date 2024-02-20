<script setup>
import { useApplicationStore, useCitizenStore } from '@/stores/application.js'
const { userData } = useApplicationStore();

</script>

<template>
  <div class="bg-body-tertiary">
    <div class="container">
      <div class="row py-4 px-3">
        <div class="col-12">
          <div class="mb-4">
            <h1>!ERROR!</h1>
          </div>
          <div>
            <p>
              You are not meant to be here
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>