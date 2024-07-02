<script setup>
import { onMounted, ref } from 'vue';
import { useApplicationStore, useCitizenStore } from '@/stores/application.js'
const { userData } = useApplicationStore();
const { citizenData } = useCitizenStore();
const values = ref([]);
const loading = ref(true);
const backendEnvVar = import.meta.VITE_BACKEND;


onMounted(async () => {
  try {
    console.log(citizenData.id);
    const response = await fetch('{{backendEnvVar}}'+ '/citizen/' + citizenData.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.accessToken}`,
      },
    });
    const data = await response.json();
    values.value = data;
    loading.value = false;
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    loading.value = false;
  }

});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1>Applications</h1>
                    </div>
                    <div>
                      <table class="table">
                        <thead>
                        <tr>
                          <th>Date Created</th>
                          <th>Recent Blood Tests</th>
                          <th>Approval Status</th>
                        </tr>
                        </thead>
                        <tbody v-if="values">
                        <tr v-for="application in values" :key="application.id">
                          <td>{{ application.date_created }}</td>
                          <td>{{ application.recent_blood_tests }}</td>
                          <td>{{ application.approval_status }}</td>
                          <td>
                            <!--
                            <RouterLink :to="{ name: 'Applicatoin-Details', params: { id: application.id } }">
                              Display
                            </RouterLink>-->
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <pre>{{ data }}</pre>
                </div>
            </div>
        </div>
    </div>
</template>