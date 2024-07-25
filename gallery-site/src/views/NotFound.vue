<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from 'vue';

const backgroundPositionX: Ref<string> = ref('')
const backgroundPositionY: Ref<string> = ref('')

function moveBackground(e: any) {
    let x = e.clientX / 6
    let y = e.clientY / 6

    backgroundPositionX.value = x + 'px'
    backgroundPositionY.value = y + 'px'
}

onMounted(() => {
    window.addEventListener('mousemove', moveBackground)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', moveBackground)
})

</script>

<template>
    <section id="page404" class="page404" :style="{backgroundPositionX, backgroundPositionY}">
        <div class="content404">
            <h2>404</h2>
            <h4>Oops! Page not found</h4>
            <p>
                The page you were looking for doesn't exist.
                You may have mistyped the address or the page may have been moved.
            </p>
            <a routerLink="/">Back To Home</a>
        </div>
    </section>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

.page404 {
    font-family: "Montserrat", sans-serif;
    position: absolute;
    /* margin-top: 7%; */
    height: 100vh;
    width: 100vw;
    /* top: 22%;
    left: 10%;
    right: 10%;
    bottom: 10%; */
    /* border-radius: 10px; */
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('@/assets/images/p404.png'), #151729;
    /* box-shadow: 0 0px 30px var(--theme-color); */
}

.content404 {
    max-width: 900px;
    margin-top: 7%;
    text-align: center;
}

.content404 h2 {
    font-size: 18vw;
    color: #edf0f1;
    line-height: 1em;
}

.content404 h4 {
    position: relative;
    font-size: 1.5em;
    margin-bottom: 20px;
    color: #111;
    background: #fff;
    font-weight: 300;
    padding: 10px 20px;
    display: inline-block;
}

.content404 p {
    color: #edf0f1;
    font-size: 1.2em;
}

.content404 a {
    position: relative;
    display: inline-block;
    font-size: 18px;
    padding: 10px 25px;
    background: var(--button-color);
    color: #edf0f1;
    text-decoration: none;
    margin-top: 25px;
    border-radius: 25px;
    transition: all 0.4s ease 0s;
}

.content404 a:hover {
    font-size: 22px;
    padding: 10px 25px;
    background: var(--button-hover-color);
    box-shadow: 0 0 20px var(--theme-color);
}

.content404 a:active {
    background: var(--button-active-color);
    box-shadow: 0 0 20px var(--button-hover-color);
    transform: scale(96%);
}

</style>