<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import type { paintingDetails } from '@/types/painting.js';
import * as paintingsService from '@/services/paintingsService.js'
import * as userService from '@/services/userService.js'
import router from '@/router/index.js';

const route = useRoute()
const paintingId: string = String(route.params.id)

const paintingDetails: Ref<paintingDetails | undefined> = ref()
const isLoading: Ref<boolean> = ref(true)
const hasLiked: Ref<boolean> = ref(false)

onMounted(async () => {
    getPaintingDetails()
})

async function getPaintingDetails() {
    const data = await paintingsService.getPaintingDetails(paintingId)
    data.owner = data.owner === userService.userId.value

    paintingDetails.value = data
    hasLiked.value = paintingDetails.value?.likes.includes(userService.userId.value)

    isLoading.value = false
}

function likePainting(e: Event) {
    e.preventDefault()
    
    if(userService.isLoggedIn && !hasLiked.value) {
        paintingDetails.value?.likes.push(userService.userId.value)
        hasLiked.value = true
        paintingsService.likePainting(paintingId)
    }
}

async function deletePainting(e: Event) {
    e.preventDefault()

    if(userService.isLoggedIn && paintingDetails.value?.owner) {
        await paintingsService.deletePainting(paintingId)

        router.push('/gallery')
    }
}

</script>

<template>
    <section class="detailsPage center" v-if="!isLoading">
        <article class="detailsContainer">
            <div class="headingContainer">
                <h2>{{paintingDetails?.title}}</h2>
                <div>
                    <p>Created on: {{paintingDetails?.createdAtTime }}</p>
                    <p v-if="paintingDetails?.updatedAtTime">Last updated on: {{paintingDetails?.updatedAtTime}}</p>
                </div>
            </div>
            <div class="infoContainer">
                <div>
                    <p>{{paintingDetails?.description}}</p>
                    <div class="detailsBtnContainer" v-if="userService.isLoggedIn">
                        <a v-if="!paintingDetails?.owner && userService.isLoggedIn.value && !hasLiked" class="detailsBtn" href="" @click="likePainting">Like</a>
                        <p v-if="hasLiked">Thanks for liking!</p>
                        <template v-if="paintingDetails?.owner">
                            <a class="detailsBtn" routerLink='edit'>Edit</a>
                            <a class="detailsBtn" href='' @click="deletePainting">Delete</a>
                        </template>
                    </div>
                </div>
                <div class="imgContainer">
                    <img :src="paintingDetails?.imageUrl"/>
                </div>
                <div class="priceAndLikes">
                    <p v-if="paintingDetails?.likes?.length">Number of likes: {{paintingDetails?.likes?.length}}</p>
                    <p v-if="!paintingDetails?.likes?.length">No likes yet!</p>
                    <p class="price">Price: {{paintingDetails?.price}}€</p>
                </div>
            </div>
        </article>
    </section>

    <div class="spinner" v-if="isLoading">
        <div class="ring"></div>
        <span>loading...</span>
    </div>
</template>

<style>
.detailsContainer {
    margin-top: 150px;
    width: 1100px;
    min-height: 600px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    backdrop-filter: blur(20px);
    border-radius: 0.5rem;
    box-shadow: 0 0 10px 2px black;
}

.detailsContainer .headingContainer {
    min-height: 100px;
    text-align: center;
    margin-top: 30px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.detailsContainer .headingContainer div {
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
}

.detailsContainer .infoContainer {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    padding: 0 50px;
    flex-wrap: wrap;
}

.detailsContainer .infoContainer div p {
    word-wrap: break-word;
    text-align: center;
}

.detailsContainer .infoContainer div .detailsBtnContainer {
    margin-top: 2.2rem;
    display: flex;
    justify-content: center;
    gap: 50px;
}

.detailsContainer .infoContainer div a {
    background-color: #fff;
    color: black;
    font-weight: 600;
    padding: 7px 30px;
    border-radius: 20px;
    text-decoration: none;
    transition: 0.3s ease all;
}

.detailsContainer .infoContainer div a:hover {
    transform: scale(1.12);
}

.detailsContainer .infoContainer img {
    width: 250px;
    height: 350px;
    object-fit: cover;
    display: block;
    margin-left: auto;
}

.detailsContainer .infoContainer .imgContainer {
    flex-basis: 40%;
}

.detailsContainer .infoContainer .priceAndLikes {
    margin-top: 20px;
    margin-right: 8%;
    width: 1000px;
    display: flex;
    justify-content: space-between;
}

@media (max-width: 600px) {
    .detailsContainer {
        margin-top: 150px;
        width: 350px;
        min-height: 550px;
        border-radius: 0.5rem;
        padding-bottom: 50px;
    }

    .detailsContainer .headingContainer div {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .detailsContainer .infoContainer {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        padding: 0 20px;
        flex-wrap: wrap-reverse;
    }

    .detailsContainer .infoContainer .imgContainer {
        order: 1;
        margin-bottom: 30px;
    }

    .detailsContainer .infoContainer .imgContainer img {
        width: auto;
        height: auto;
        max-width: 200px;
        max-height: 260px;
    }

    .detailsContainer .infoContainer .priceAndLikes {
        order: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-bottom: 10px;
        max-width: 100px;
        margin-right: 0;
        text-align: center;
    }
}
</style>