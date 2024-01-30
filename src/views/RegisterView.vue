<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const router = useRouter();
const { setUserData, persistUserData, isAuthenticated } = useApplicationStore();

const loading = ref(false);
const registrationData = ref({
    "username":'',
    "email":'',
    "password": '',
    "fname": '',
    "lname": '',
    "phone_number": '',
    "date_of_birth":'',
    "address": '',
    "blood_type": ''

});
const registrationFailed = ref(false);

const onFormSubmit = () => {
    console.log(registrationData);
    loading.value = true;
    registrationFailed.value = false;

    fetch('http://localhost:7070/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData.value)
    })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setUserData(data);
                    persistUserData();
                    router.push({ name: 'home' });
                });
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
                        <h1 class="fs-3">Register</h1>
                    </div>
                    <div class="spinner-border" role="status" v-if="loading">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <form v-else>
                        <div class="mb-2" v-if="registrationFailed">
                            <div class="alert alert-danger" role="alert">
                                Registration failed!
                            </div>
                        </div>


                         <div class="mb-2">
                            <label for="usernameFormControl" class="form-label mb-1"
                                >Username</label
                            >
                            <input
                                v-model="registrationData.username"
                                type="username"
                                class="form-control"
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
                                class="form-control"
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
                                class="form-control"
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
                                class="form-control"
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
                                class="form-control"
                                id="lastNameFormControl"
                            />
                        </div>




                        <div class="mb-2">
                            <label for="phoneNumberFormControl" class="form-label mb-1"
                                >Phone Number</label
                            >
                            <input
                                v-model="registrationData.phone_number"
                                type="tel"
                                class="form-control"
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
                                class="form-control"
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
                                class="form-control"
                                id="addressFormControl"
                            />
                        </div>

                        <div class="mb-2">
                            <label for="bloodTypeFormControl" class="form-label mb-1"
                                >Blood Type</label
                            >
                            <input
                                v-model="registrationData.blood_type"
                                type="text"
                                class="form-control"
                                id="bloodTypeFormControl"
                            />
                        </div>

                       

        
                        <button @click="onFormSubmit" type="submit" class="btn btn-primary">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
