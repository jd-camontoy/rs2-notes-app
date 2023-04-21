<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '../api/requests';

const name = ref("");
const surname = ref("");
const password = ref("");

const router = useRouter()

async function handleRegistration() {
  const result = await registerUser({
    first_name: name.value,
    surname: surname.value,
    password: password.value
  });
  if (result.success) {
    localStorage.setItem('user', JSON.stringify(result.data));
    router.push('/');
  } else {
    console.log(result);
  }
}
</script>

<template>
  <main class="main--login">
    <div class="login">
      <img
        src="../assets/images/rs2-notes-logo-wo-text.svg"
        alt="RS2 Notes App Logo"
        class="header__logo"
      />
      <div class="login__inputs">
        <div class="login__inputs--name margin-bottom-10">
          <input
            v-model="name"
            type="text"
            placeholder="First Name"
            class="margin-right-10"
          />
          <input v-model="surname" type="text" placeholder="Surname" />
        </div>
        <input
          v-model="password"
          class="login__input"
          type="password"
          placeholder="Password"
        />
      </div>
      <button @click="handleRegistration" class="btn btn--primary">
        <i class="fa-regular fa-user margin-right-10"></i>
        Register to Notes
      </button>
      <router-link to="/login">Go to Login</router-link>
    </div>
  </main>
</template>
