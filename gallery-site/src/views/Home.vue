<script setup lang="ts">

import {ref, onMounted, type Ref} from 'vue'
import { getLast2 } from '@/services/paintingsService.js';
import type {painting} from '../types/painting'
import router from '@/router/index.js';

const paintings: Ref<painting[]> = ref([])

onMounted(async () => {
    try {
        paintings.value = await getLast2()
    } catch (error) {
        console.log(error)
    }
})

function goToGallery() {
    router.push('/gallery')
}

function goToPainting(paintingId: string) {
    router.push(`gallery/${paintingId}`)
}

</script>

<template>
    <main>
        <div class="row">
            <div class="col">
                <h1>Gallery</h1>
                <p>Expedita fuga vitae nisi, aperiam ipsam repellendus assumenda molestiae quos, soluta perferendis cum delectus qui, ab officia consequatur tempora. Debitis, sed vel.</p>
                <div class="buttonContainer">
                    <button type="button" @click="goToGallery">Explore</button>
                </div>
            </div>
            <div class="col">
                <div class="card" v-for="painting in paintings" :key="painting._id" :style="{backgroundImage: `url(${painting.imageUrl})`}" @click="goToPainting(painting._id)">
                    <h4>{{painting.title}}</h4>
                    <p>{{painting.summary}}</p>
                </div>
                <p v-if="!paintings || paintings.length === 0" :class="'noPaintings'" style="font-size: 40px;">No paintings yet!</p>
            </div>
        </div>
    </main>
</template>

<style scoped>

main .row {
    display: flex;
    min-height: 100vh;
    align-items: center;
    gap: 2rem;
    padding: 0 0 0 10%;
}

main .col {
    flex-basis: 50%;
}

main .col:nth-child(2) {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 7%;
}

main .col h1 {
    font-size: 5rem;
    text-shadow: 0 0 15px black;
}

main .col p {
    line-height: 1.5rem;
    text-shadow: 0 0 15px black;
    font-weight: 500;
}

main .col button {
    width: 10rem;
    color: black;
    padding: 0.7rem 0;
    border: none;
    border-radius: 1.2rem;
    outline: none;
    margin-top: 2rem;
    transition: 0.3s ease;
}

main .col button:hover {
    cursor: pointer;
    transform: scale(1.1);
}

main .col .card {
    width: 300px;
    height: 420px;
    display: inline-block;
    border-radius: 0.7rem;
    padding: 0.9rem 1.3rem;
    position: relative;
    cursor: pointer;
    margin: 0.6rem 0.8rem;
    background-position: center;
    background-size: cover;
    box-shadow: 0 0 15px black;
    overflow: hidden;
    transition: transform 0.5s ease;
}

main .col .card:hover {
    transform: translateY(-10px);
}

main .col .card h5 {
    text-shadow: 0 0 5px black;
}

main .col .card p {
    text-shadow: 0 0 5px black;
}

main .col .noPaintings {
    padding-left: 200px;
}

.likeContainer {
    position: absolute;
    bottom: 5%;
    right: 10%;
    width: 10%;
    display: flex;
    justify-content: flex-start;
}

.likesCount {
    display: flex;
    align-items: flex-end;
    margin-left: 7px;
    transform: translateY(2px);
    text-shadow: 0 0 5px #000000;
}

@media (max-width: 1580px) {
    main .row {
        padding-left: 3%;
    }
}

@media (max-width: 1440px) {
    main .col .card {
        width: 250px;
        height: 400px;
    }
}

@media (max-width: 1223px) {
    main .col .card {
        width: 370px;
        height: 250px;
    }
}

@media (max-width: 823px) {
    main .col .card {
        width: 250px;
        height: 250px;
    }

    main .row {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 0;
    }

    main .row .col:nth-child(1) {
        padding: 200px 10% 0 10%;
    }

    main .row .col:nth-child(2) {
        justify-content: center;
    }

    main .row .col:nth-child(1) p {
        padding: 10px 6px 10px 5px;
        text-align: center;
        /* background-color: rgba(0, 0, 0, .1);
        backdrop-filter: blur(3px); */
        border-radius: 10%;
    }

    main .row .col h1 {
        text-align: center;
    }

    main .col .buttonContainer {
        display: flex;
        justify-content: center;
    }

    main .col .noPaintings {
        padding-left: 0;
        padding-top: 5%;
    }
}

</style>