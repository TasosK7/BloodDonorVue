<script setup>
import { onMounted, ref } from 'vue';
import { useApplicationStore } from '@/stores/application.js'
const { userData } = useApplicationStore();
const values = ref([]);
const loading = ref(true);
import { useRouter } from 'vue-router';
const router = useRouter();

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:7070/admin/users', {
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
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
              </thead>
              <tbody v-if="values">
              <tr v-for="user in values" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <tr v-for="role in user.roles" :key="user.id">
                  <td>{{ role.name }}</td>
                </tr>


<!--              <td v-if=user.roles.includes("ROLE_USER")>USER</td>-->
<!--                <td v-if="user.roles.includes('ROLE_SECRETARY')">SECRETARY</td>-->
<!--                <td v-if="user.roles.includes('ROLE_ADMIN')">ADMIN</td>-->


                <td>
                  <RouterLink :to="{ name: 'userDetails', params: { id: user.id } }" class="btn btn-primary btn-lg">
                    User Details
                  </RouterLink>
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
