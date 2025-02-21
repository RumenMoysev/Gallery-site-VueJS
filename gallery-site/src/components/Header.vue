<script setup lang="ts">
import router from '@/router/index.js';
import * as userService from '@/services/userService.js';
import { onMounted, ref, type Ref } from 'vue';

const checked: Ref<boolean> = ref(false)

onMounted(() => {
    if(document.cookie.includes('userId=')) {
    userService.getUser()
}
})

function logout(e: Event) {
    e.preventDefault()

    userService.logoutUser()
}

function goToHome(e: Event) {
    e.preventDefault()

    router.push('/')
}

function check() {
    checked.value = !checked.value
}
</script>

<template>
    <header class="header">
        <a href="/"><img class="headerLogo" src="@/assets/images/art-logo.png" @click="goToHome"/></a>

        <input type="checkbox" id="check" :checked="checked" @click="check">
        <label for="check" class="icons">
            <i class='bx bx-menu' id="menu-icon"></i>
            <i class='bx bx-x' id="close-icon"></i>
        </label>
            
        <div v-if="userService.isLoggedIn" style="--nav-bar-size: 16rem"></div>
        <div v-if="!userService.isLoggedIn" style="--nav-bar-size: 13.5rem"></div>

        <nav class="navbar">
            <router-link to="/" style="--i:1;" @click="check">Home</router-link>
            <router-link to="/gallery" style="--i:2;" @click="check">Gallery</router-link>
            <template v-if="userService.isLoggedIn.value">
                <router-link to="" style="--i:3;" @click="logout($event); check()" >Logout</router-link>
                <router-link to="/my-profile" style="--i:4;" @click="check">Profile</router-link>
            </template>
            <template v-if="!userService.isLoggedIn.value">
                <router-link to="/login" style="--i:3;" @click="check">Login</router-link>
                <router-link to="/register" style="--i:4;" @click="check">Register</router-link>
            </template>
            <router-link v-if="userService.role.value === 'admin'" to="/add-painting" style="--i:5;" @click="check">Add Painting</router-link>
        </nav>
    </header>
</template>

<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1.3rem 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
}

.header::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .1);
    backdrop-filter: blur(50px);
    z-index: -1;
}

.headerLogo {
    width: 60px;
    height: 40px;
    transform: scale(1.3);
    transition: 0.3s ease;
}

.headerLogo:hover {
    transform: scale(1.4);
}

.navbar {
    display: flex;
    gap: 2.5rem;
}

.navbar a {
    font-size: 1.15rem;
    text-decoration: none;
    font-weight: 500;
    transition: 0.3s ease;
}

.navbar a:hover {
    transform: scale(1.2);
    text-shadow: 0px 0px 10px black;
}

.icons {
    position: absolute;
    right: 5%;
    transform: scale(2.5);
    cursor: pointer;
    display: none;
}

#check {
    display: none;
}

@media (max-width: 1000px) {
    .header {
        padding: 1.3rem 5%;
    }
}

@media (max-width: 750px) {
    .icons {
        display: inline-flex;
    }

    #check:checked~.icons #menu-icon {
        display: none;
    }

    .icons #close-icon {
        display: none;
    }

    #check:checked~.icons #close-icon {
        display: block;
    }

    .navbar {
        display: block;
        position: absolute;
        top: 100%;
        left: 0%;
        background-color: rgba(0, 0, 0, .1);
        backdrop-filter: blur(50px);
        width: 100%;
        height: 0;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, .1);
        overflow: hidden;
        transition: 0.3s ease;
    }

    #check:checked~.navbar {
        height: var(--nav-bar-size);
    }

    .navbar a {
        display: block;
        font-size: 1.1em;
        margin: 1.5rem 0;
        text-align: center;
        transform: translateY(-50px);
        opacity: 0;
        transition: 0.3s ease;
    }

    #check:checked~.navbar a {
        transform: translateY(0);
        opacity: 1;
        transition-delay: calc(0.12s * var(--i));
    }
}
</style>