<script setup ="ts">
</script>

<template>
    <section class="registerPage center">
        <form class="form">
            <h2>Register</h2>
            <div class="input-box">
                <input type="email" name="email" placeholder="" id="email">
                <span>Email</span>
                <i class='bx bx-envelope'></i>
            </div>
            <div class="input-box">
                <input type="text" name="username" placeholder="" id="username">
                <span>Username</span>
                <i class='bx bx-user-circle'></i>
            </div>
            <div ngModelGroup="passwords">
                <div class="input-box">
                    <input type="password" name="password" placeholder="" id="password">
                    <span>Password</span>
                    <i class='bx bx-lock-alt'></i>
                </div>
                <div class="input-box">
                    <input type="password" name="repeatPassword" placeholder="" id="repeatPassword">
                    <span>Repeat Password</span>
                    <i class='bx bxs-lock-alt'></i>
                </div>
            </div>

            <button class="formBtn">Register</button>

            <div class="register-link">
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </form>
    </section>
</template>