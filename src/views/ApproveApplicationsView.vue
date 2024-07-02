<script setup>
import { onMounted, ref } from 'vue';
import { useApplicationStore } from '@/stores/application.js'
const { userData } = useApplicationStore();
const values = ref([]);
const loading = ref(true);
import { useRouter } from 'vue-router';
const router = useRouter();
const backendEnvVar = import.meta.VITE_BACKEND;

onMounted(async () => {
  try {
    const response = await fetch('{{backendEnvVar}}'+'/secretary', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.accessToken}`
      },
    });
    const data = await response.json();

    // Sort applications by approval status, with 'Pending' first
    values.value = data.sort((a, b) => {
      if (a.approval_status === b.approval_status) {
        return 0;
      }
      return a.approval_status === 'Pending' ? -1 : 1;
    });


    //values.value = data;
    loading.value = false;
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    loading.value = false;
  }
});
const handleAction = async (applicationId, action) => {
  try {
    const response = await fetch(`'{{backendEnvVar}}' + '/secretary/${applicationId}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.accessToken}`,
      },
    });
  } catch (error) {
    console.error(`Error fetching data:`, error);
  }
};
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
                  <RouterLink :to="{ name: 'applicantDetails', params: { id: application.id } }" class="btn btn-primary btn-lg">
                    Display
                  </RouterLink>

                </td>
                <td  v-if="application.approval_status === 'Pending'">
                  <button @click="handleAction(application.id , 'approve')+router.push({ name: 'approved' })" class="btn btn-success btn-lg">Approve</button>
                </td>

                <td  v-if="application.approval_status === 'Pending'">
                  <button @click="handleAction(application.id , 'reject')+router.push({ name: 'rejected' })" class="btn btn-danger btn-lg">Reject</button>
                </td>

              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>