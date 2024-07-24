<script setup lang="ts">
import type { painting } from '@/types/painting.js';
import { onMounted, ref, type Ref } from 'vue';
import * as paintingsService from '@/services/paintingsService.js'

const paintings: Ref<painting[] | undefined> = ref()
const isLoading: Ref<boolean> = ref(true)

onMounted(async () => {
    paintings.value = await paintingsService.getPaintings()
    isLoading.value = false
})

</script>

<template>
    <section v-if="paintings" class="paintingsPage">
        <template v-if="paintings?.length > 0">
            <article v-for="painting in paintings" key="painting._id" class="paintingContainer">
                <h3>{{painting.title}}</h3>
                <div class="innerContainer">
                    <div class="pBtnContainer">
                        <p>{{painting.summary}}</p>
                        <div>
                            <router-link :to="{name: 'PaintingDetails', params: {id: painting._id}}" class="detailsBtn">Details</router-link>
                        </div>
                    </div>
                    <img :src="painting.imageUrl"/>
                </div>
            </article>
        </template>
        <p v-if="paintings?.length == 0" style="font-size: 40px; text-shadow: 0 0 10px black;">No paintings yet!</p>
    </section>

    <div class="spinner" v-if="isLoading">
        <div class="ring"></div>
        <span>loading...</span>
    </div>
</template>

<style>
.paintingsPage {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0 5%;
    gap: 80px 0;
    padding-top: 150px;
}

.paintingsPage .paintingContainer {
    width: 450px;
    min-height: 310px;
    display: flex;
    flex-wrap: wrap;
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    backdrop-filter: blur(20px);
    border-radius: 0.5rem;
    box-shadow: 0 0 10px 2px black;
}

.paintingsPage .paintingContainer h3 {
    font-size: 1.4rem;
    flex-basis: 100%;
    height: 20%;
    text-align: center;
    padding-top: 3.5%;
    border-bottom: solid 2px rgba(255, 255, 255, 0.3);
}

.paintingsPage .paintingContainer .innerContainer {
    display: flex;
    justify-content: space-evenly;
    gap: 1.5rem;
    padding: 20px;
}

.paintingsPage .paintingContainer img {
    width: 150px;
    height: 200px;
    object-fit: cover;
}

.paintingsPage .paintingContainer .pBtnContainer p {
    max-height: 150px;
    margin-bottom: 45px;
    text-align: center;
    word-wrap: break-word;
    /* word-break: break-all; */
    overflow: auto;
}

.paintingsPage .paintingContainer .pBtnContainer div {
    display: flex;
    justify-content: center;
}

.paintingsPage .paintingContainer .pBtnContainer .detailsBtn {
    background-color: #fff;
    color: black;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 20px;
    text-decoration: none;
    transition: 0.3s ease all;
}

.paintingsPage .paintingContainer .pBtnContainer .detailsBtn:hover {
    transform: scale(1.1);
}
</style>