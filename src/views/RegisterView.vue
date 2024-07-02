<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const router = useRouter();
const { setUserData, persistUserData, isAuthenticated } = useApplicationStore();
const backendEnvVar = import.meta.VITE_BACKEND;

const loading = ref(false);
const registrationData = ref({
    username:'',
    email:'',
    password: '',
    fname: '',
    lname: '',
    phone_number: '',
    date_of_birth:'',
    address: '',
    blood_type: ''

});
const registrationFailed = ref(false);

const onFormSubmit = () => {
    console.log(JSON.stringify(registrationData.value));
    loading.value = true;
    registrationFailed.value = false;

    fetch('{{backendEnvVar}}'+'/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'


        },
        body: JSON.stringify(registrationData.value)
    })
        .then((response) => {
            if (response.ok) {


                    router.push({ name: 'login' });

            } else {
                registrationFailed.value = true;
            }
        })
        .catch((err) => {
            console.warn(err);
            registrationFailed.value = true;
        })
        .finally(() => {
            loading.value = false;
        });
};


onBeforeMount(() => {
    if (isAuthenticated === true) {
        router.push({ name: 'home' });
    }
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-4">
                    <div class="mb-4">
                        <h1>Register</h1>
                    </div>
                    <div class="spinner-border" role="status" v-if="loading">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <form v-else>
                        <div class="mb-2" v-if="registrationFailed">
                            <div class="alert alert-danger" role="alert">
                                Registration failed!
                                -Every field must not be blank
                                -Username must be 3-20 characters long
                                -Email must be of correct format
                                -Password must be 6-40 characters long
                            </div>
                        </div>


                         <div class="mb-2">
                            <label for="usernameFormControl" class="form-label mb-1"
                                >Username</label
                            >
                            <input
                                v-model="registrationData.username"
                                type="text"
                                class="form-control-lg"
                                id="usernameFormControl"
                            />
                        </div>

                         <div class="mb-2">
                            <label for="emailFormControl" class="form-label mb-1"
                                >Email</label
                            >
                            <input
                                v-model="registrationData.email"
                                type="email"
                                class="form-control-lg"
                                id="emailFormControl"
                            />
                        </div>

                         <div class="mb-2">
                            <label for="passwordFormControl" class="form-label mb-1"
                                >Password</label
                            >
                            <input
                                v-model="registrationData.password"
                                type="password"
                                class="form-control-lg"
                                id="passwordFormControl"
                            />
                        </div>


                        <div class="mb-2">
                            <label for="firstNameFormControl" class="form-label mb-1"
                                >First Name</label
                            >
                            <input
                                v-model="registrationData.fname"
                                type="text"
                                class="form-control-lg"
                                id="firstNameFormControl"
                            />
                        </div>


                        <div class="mb-2">
                            <label for="lastNameFormControl" class="form-label mb-1"
                                >Last Name</label
                            >
                            <input
                                v-model="registrationData.lname"
                                type="text"
                                class="form-control-lg"
                                id="lastNameFormControl"
                            />
                        </div>




                        <div class="mb-2">
                            <label for="phoneNumberFormControl" class="form-label mb-1"
                                >Phone Number</label
                            >
                            <input
                                v-model="registrationData.phone_number"
                                type="text"
                                class="form-control-lg"
                                id="phoneNumberFormControl"
                            />
                        </div>

                        <div class="mb-2">
                            <label for="dateOfBirthFormControl" class="form-label mb-1"
                                >Date of Birth</label
                            >
                            <input
                                v-model="registrationData.date_of_birth"
                                type="text"
                                class="form-control-lg"
                                id="dateOfBirthFormControl"
                            />
                        </div>


                        <div class="mb-2">
                            <label for="addressFormControl" class="form-label mb-1"
                                >Address</label
                            >
                            <input
                                v-model="registrationData.address"
                                type="text"
                                class="form-control-lg"
                                id="addressFormControl"
                            />
                        </div>


                      <div class="mb-2">
                        <label for="bloodTypeFormControl" class="form-label mb-1"
                        >Blood Type</label
                        >
                        </div><div>
                        <select v-model="registrationData.blood_type" class="form-control-lg" id="roleFormControl">
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>

                       

        
                        <button @click="onFormSubmit" type="submit" class="btn btn-primary btn-lg">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
