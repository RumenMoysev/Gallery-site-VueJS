<script setup lang="ts">
import type { errObject } from '@/types/errors.js';
import type { formUserData } from '@/types/user.js';
import { ref, type Ref } from 'vue';
import * as userSevice from '@/services/userService.js'

const email: Ref<string> = ref('')
const username: Ref<string> = ref('')
const password: Ref<string> = ref('')
const repeatPassword: Ref<string> = ref('')
let errors = ref<errObject>({})

function register() {
    const userData: formUserData = {
        email: email.value,
        username: username.value,
        password: password.value
    }

    errors.value = userSevice.validateData(userData, repeatPassword.value)

    if(!errors.value.email && !errors.value.username && !errors.value.password) {
        console.log('no errs')
    } else {
        console.log('errs')
    }
}

</script>

<template>
    <section class="registerPage center" @submit.prevent="register">
        <form class="form">
            <h2>Register</h2>
            <div class="input-box">
                <input type="email" name="email" placeholder="" id="email" v-model="email">
                <span>Email</span>
                <i class='bx bx-envelope'></i>
            </div>
            <div class="input-box">
                <input type="text" name="username" placeholder="" id="username" v-model="username">
                <span>Username</span>
                <i class='bx bx-user-circle'></i>
            </div>
            <div ngModelGroup="passwords">
                <div class="input-box">
                    <input type="password" name="password" placeholder="" id="password" v-model="password">
                    <span>Password</span>
                    <i class='bx bx-lock-alt'></i>
                </div>
                <div class="input-box">
                    <input type="password" name="repeatPassword" placeholder="" id="repeatPassword" v-model="repeatPassword">
                    <span>Repeat Password</span>
                    <i class='bx bxs-lock-alt'></i>
                </div>
            </div>

            <button class="formBtn">Register</button>

            <div class="register-link">
                <p>Already have an account? <a href="/login">Login</a></p>
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

            <div class="error" v-if="errors.repeatPassword">
                <p>{{ errors.repeatPassword }}</p>
            </div>

            <!-- <div class="error" *ngIf="errorMsg">
                <p>{{errorMsg}}</p>
            </div> -->
        </div>

    </section>
</template>