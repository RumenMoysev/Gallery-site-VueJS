<script setup lang="ts">
import type { errObject } from '@/types/errors.js';
import type { formUserData } from '@/types/user.js';
import { ref, type Ref } from 'vue';
import * as userSevice from '@/services/userService.js'
import router from '@/router/index.js';

const email: Ref<string> = ref('')
const username: Ref<string> = ref('')
const password: Ref<string> = ref('')
const errors = ref<errObject>({})

async function login() {
    const userData: formUserData = {
        email: email.value,
        username: username.value,
        password: password.value
    }

    errors.value = userSevice.validateData(userData)

    if(!errors.value.email && !errors.value.username && !errors.value.password) {
        try {
            await userSevice.login(userData)
            router.push('/')
        } catch (error) {
            errors.value.generalError = String(error)
        }
    }
}

</script>

<template>
    <section class="loginPage center">
        <form class="form" @submit.prevent="login">
            <h2>Login</h2>
            <div class="input-box">
                <input type="text" placeholder="" name="email" id="" v-model="email">
                <span>Email</span>
                <i class='bx bx-envelope'></i>
            </div>
            <div class="input-box">
                <input type="text" placeholder="" name="username" id="" v-model="username">
                <span>Username</span>
                <i class='bx bx-user-circle'></i>
            </div>
            <div class="input-box">
                <input type="password" placeholder="" name="password" id="" v-model="password">
                <span>Password</span>
                <i class='bx bx-lock-alt'></i>
            </div>

            <button class="formBtn">Login</button>

            <div class="register-link">
                <p>Don't have an account? <a router-link="/register">Register</a></p>
            </div>
        </form>

        <div class="error-container">
            <div class="error" v-if="errors.email">
                <p>{{ errors.email }}</p>
            </div>
        
            <div class="error" v-if="errors.username">
                <p>{{ errors.username }}</p>
            </div>

            <div class="error" v-if="errors.password">
                <p>{{ errors.password }}</p>
            </div>

            <div class="error" v-if="errors.generalError">
                <p>{{errors.generalError}}</p>
            </div>
        </div>
    </section>
</template>