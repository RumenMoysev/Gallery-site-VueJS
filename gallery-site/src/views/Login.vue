<script setup lang="ts">
</script>

<template>
    <section class="loginPage center">
        <form class="form">
            <h2>Login</h2>
            <div class="input-box">
                <input type="text" placeholder="" name="email" id="">
                <span>Email</span>
                <i class='bx bx-envelope'></i>
            </div>
            <div class="input-box">
                <input type="text" placeholder="" name="username" id="">
                <span>Username</span>
                <i class='bx bx-user-circle'></i>
            </div>
            <div class="input-box">
                <input type="password" placeholder="" name="password" id="">
                <span>Password</span>
                <i class='bx bx-lock-alt'></i>
            </div>

            <button class="formBtn">Login</button>

            <div class="register-link">
                <p>Don't have an account? <a router-link="/register">Register</a></p>
            </div>
        </form>

    </section>
</template>