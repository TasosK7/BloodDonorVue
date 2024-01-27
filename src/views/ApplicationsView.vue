<script setup>
import { onMounted, ref  , computed} from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';

const route = useRoute();

const citizenIdRef = ref(null);
const urlRef = computed(() => {
  return 'http://localhost:7070/citizen/' + citizenIdRef.value;
});

const authRef = ref(true);
const { data, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
citizenIdRef.value = route.params.id;
  performRequest();
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Applications</h1>
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
                        <tbody v-if="data">
                        <tr v-for="application in data._embedded.applications" :key="application.id">
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