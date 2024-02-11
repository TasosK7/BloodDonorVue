<script setup>
import { onMounted, ref, computed } from 'vue';
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

const deleteUser = async (userId) => {
  try {
    await fetch(`http://localhost:7070/admin/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.accessToken}`,
      },
    });
    console.log(`User with ID ${userId} deleted`);
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
  }
};

const updateUser = async (user) => {
  try {

    const roleId = user.selectedRole === 'ROLE_USER' ? 2 : user.selectedRole === 'ROLE_SECRETARY' ? 3 : 0;

    user.roles = [
      {
        id: roleId,
        name: user.selectedRole,
      },
    ];


    const response = await fetch(`http://localhost:7070/admin/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.accessToken}`,
      },
      body: JSON.stringify(user),
    });
  console.log(user);
    const updatedUser = await response.json();
    console.log('User updated:', updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

const filteredUsers = computed(() => {
  return values.value.filter(user => {
    return user.roles.some(role => role.name === 'ROLE_USER' || role.name === 'ROLE_SECRETARY');
  });
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
            <table class="table-lg">
              <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Password</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
              </thead>
              <tbody v-if="filteredUsers">
              <tr v-for="user in filteredUsers" :key="user.id" >
                <td>{{ user.id }}</td>
                <td> <div class="mb-2">

                </div>
                  <div>
                    <input
                      v-model="user.username"
                      type="text"
                      class="form-control-lg"
                      id="usernameFormControl"
                    />
                  </div></td>

                <td> <div class="mb-2">
                </div>
                  <div>
                    <input
                      v-model="user.password"
                      type="password"
                      class="form-control-lg"
                      id="passwordFormControl"
                    />
                  </div></td>


                <td> <div class="mb-2">
                </div>
                  <div>
                    <input
                      v-model="user.email"
                      type="text"
                      class="form-control-lg"
                      id="emailFormControl"
                    />
                  </div>
                </td>

                <td>
<!--                  <p >{{ user.roles}}</p>-->
                  <div class="mb-2">
                    <select v-model="user.selectedRole" class="form-control-lg" id="roleFormControl">
                      <option value="ROLE_USER">User</option>
                      <option value="ROLE_SECRETARY">Secretary</option>
                    </select>
                  </div>
                </td>

<!--                <tr v-for="role in user.roles" :key="user.id">-->
<!--                  <td> <div class="mb-2">-->
<!--                  </div>-->
<!--                    <div>-->
<!--                      <input-->
<!--                        v-model="role.name"-->
<!--                        type="text"-->
<!--                        class="form-control-lg"-->
<!--                        id="roleFormControl"-->
<!--                      />-->
<!--                    </div></td>-->
<!--                </tr>-->




                <td>
                <button @click="deleteUser(user.id) + router.push({ name: 'userDeleted' })" class="btn btn-danger btn-lg">
                  Delete
                </button>
                </td>
                <td><button @click="updateUser(user) + router.push({ name: 'userUpdated' })" class="btn btn-success btn-lg">
                  Update
                </button></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
