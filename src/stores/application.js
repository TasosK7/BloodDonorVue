import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

function checkJWT(token) {
    if (token === null || token === undefined) {
        return false;
    }


    
    
    const base64Url = token.split('.')[1];
    if (!base64Url) return false;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert base64url to base64
    const payload = JSON.parse(atob(base64)); // Decode base64 and parse JSON
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in Unix timestamp (seconds)
    return currentTime < payload.exp; // Check if token is expired
}

function userRole(roles) {
    return !!roles.includes("ROLE_USER");
}

function secRole(roles) {
    return !!roles.includes("ROLE_SECRETARY");
}

function adminRole(roles) {
    return !!roles.includes("ROLE_ADMIN");
}

export const useApplicationStore = defineStore('application', () => {
    const userData = ref(null);

    const setUserData = (tempUserData) => {
        userData.value = tempUserData;
    };
    const persistUserData = () => {
        localStorage.setItem('userData', JSON.stringify(userData.value));
    };
    const loadUserData = () => {
        let tempUserData = localStorage.getItem('userData');
        tempUserData = JSON.parse(tempUserData);
        if (tempUserData === null || tempUserData === undefined) {
            return;
        }
        userData.value = tempUserData;
    };
    const clearUserData = () => {
        localStorage.setItem('userData', JSON.stringify(null));
        userData.value = null;
    };
    const isAuthenticated = computed(() => {
        return checkJWT(userData.value?.accessToken);
    });

    // Inside useApplicationStore definition
    const isUser = computed(() => {
        return userRole(userData.value?.roles);
    });

    // Inside useApplicationStore definition
    const isSecretary = computed(() => {
        return secRole(userData.value?.roles);
    });

    // Inside useApplicationStore definition
    const isAdmin = computed(() => {
        return adminRole(userData.value?.roles);
    });

    return { userData, setUserData, persistUserData, loadUserData, clearUserData, isAuthenticated, isUser , isSecretary , isAdmin };
});




export const useCitizenStore = defineStore('citizen', () => {
    const citizenData = ref(null);

    const setCitizenData = (tempCitizenData) => {
        citizenData.value = tempCitizenData;
    };
    const persistCitizenData = () => {
        localStorage.setItem('citizenData', JSON.stringify(citizenData.value));
    };
    const loadCitizenData = () => {
        let tempCitizenData = localStorage.getItem('citizenData');
        tempCitizenData = JSON.parse(tempCitizenData);
        if (tempCitizenData === null || tempCitizenData === undefined) {
            return;
        }
        citizenData.value = tempCitizenData;
    };
    const clearCitizenData = () => {
        localStorage.setItem('citizenData', JSON.stringify(null));
        citizenData.value = null;
    };
    const isAuthenticated = computed(() => {
        return checkJWT(citizenData.value?.accessToken);
    });

    return { citizenData, setCitizenData, persistCitizenData, loadCitizenData, clearCitizenData, isAuthenticated };
});
