<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

function handleLogout() {
    localStorage.removeItem('user');
    router.push('/login');
}
</script>


<template>
    <header class="header">
        <div class="header__logo-container">
            <img src="../assets/images/rs2-notes-logo.svg" alt="RS2 Notes App Logo" class="header__logo">
        </div>
        <input type="text" class="header__search-notes-field" placeholder="Search notes here">
        <button @click="handleLogout" class="btn btn--primary btn--header">
            Logout
        </button>
    </header>
</template>