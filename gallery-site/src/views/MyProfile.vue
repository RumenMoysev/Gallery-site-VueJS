<script setup lang="ts">
import type { User } from '@/types/user.js';
import { onMounted, ref, type Ref } from 'vue';
import * as userService from '@/services/userService.js'
import * as paintingsService from '@/services/paintingsService.js'
import type { painting } from '@/types/painting.js';

const userData = ref<User>({} as User)
const paintings: Ref<painting[]> = ref([])
const ownedSelected: Ref<boolean> = ref(false)
const likedSelected: Ref<boolean> = ref(true)

onMounted(async () => {
    userData.value = await userService.getUser() as User
    getLikedPaintings()
})

async function getOwnedPaintings() {
    ownedSelected.value = true
    likedSelected.value = false
    paintings.value = await paintingsService.getOwned()
}

async function getLikedPaintings() {
    ownedSelected.value = false
    likedSelected.value = true
    console.log(await paintingsService.getLiked())
    paintings.value = await paintingsService.getLiked()
}

</script>

<template>
    <section class="profilePage center">
        <section class="profileContainer">
            <div class='userData'>
                <h2>Profile: {{userData?.username}}</h2>
                <h2></h2>
                <h3>Email: {{userData?.email}}</h3>
            
            </div>

            <section class="profile">
                <div class='profileButtons'>
                    <button v-if="userData.role === 'admin'" :class="{selected: ownedSelected}" @click="getOwnedPaintings">Posted</button>
                    <button :class="{selected: likedSelected}" @click="getLikedPaintings">Liked</button>
                </div>
                <div class="paintingsPage1">
                <template v-if="paintings">
                    <article v-for="painting in paintings" key="painting._id" class="paintingContainer">
                        <h3>{{painting.title}}</h3>
                        <div class="innerContainer">
                            <div class="pBtnContainer">
                                <p>{{painting.summary}}</p>
                                <div>
                                    <router-link :to="{name: 'PaintingDetails', params: {id: painting._id}}" class="detailsBtn">Details</router-link>
                                </div>
                            </div>
                            <img :src="painting.imageUrl" />
                        </div>
                    </article>
                </template>
                <p v-if="paintings?.length == 0">No paintings yet!</p>
                </div>
            </section>
        </section>
    </section>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

.profileContainer {
    margin-top: 150px;
    width: 1200px;
    min-height: 600px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    backdrop-filter: blur(20px);
    border-radius: 0.5rem;
    box-shadow: 0 0 10px 2px black;
}

.userData {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}

.userData h2 {
    font-family: "Montserrat", sans-serif;
    font-weight: 550;
    font-size: 40px;
    color: #edf0f1;
}

.userData h3 {
    font-family: "Montserrat", sans-serif;
    font-weight: 550;
    font-size: 25px;
    color: #edf0f1;
    margin-top: 1%;
}

.profile {
    margin-top: 10%;
}

.profileButtons {
    display: flex;
    justify-content: space-around;
    margin-top: -1%;
    margin-bottom: 2%;
}

.profileButtons button {
    position: relative;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    height: 33px;
    min-width: 5%;
    /* border-radius: 0.7rem; */
    border: none;
    color: #edf0f1;
    background: none;
    cursor: pointer;
    /* border-bottom: 2px solid var(--theme-color); */
    transition: all 0.3s ease;
}

.profileButtons button::before {
    content: "";
    position: absolute;
    left: 25%;
    bottom: 0;
    height: 1px;
    width: 50%;
    border-bottom: 2px solid white;
    transition: all 0.3s ease;
}

.profileButtons button:hover::before {
    left: 8%;
    width: 84%;
}

.profileButtons .selected::before {
    left: 8%;
    width: 84%;
}

.profileButtons button:hover {
    font-size: 18.5px;
    height: 40px;
    min-width: 6%;
}

.paintingsPage1 {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0 5%;
    gap: 80px 0;
}

.paintingContainer {
    width: 450px;
    min-height: 310px;
    display: flex;
    flex-wrap: wrap;
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    backdrop-filter: blur(20px);
    border-radius: 0.5rem;
    box-shadow: 0 0 10px 2px black;
    margin: 30px 30px 30px 30px;
}

.paintingContainer h3 {
    font-size: 1.4rem;
    flex-basis: 100%;
    height: 20%;
    text-align: center;
    padding-top: 3.5%;
    border-bottom: solid 2px rgba(255, 255, 255, 0.3);
}

.paintingContainer .innerContainer {
    display: flex;
    justify-content: space-evenly;
    gap: 1.5rem;
    padding: 20px;
}

.paintingContainer img {
    width: 150px;
    height: 200px;
    object-fit: cover;
}

.paintingContainer .pBtnContainer p {
    max-height: 150px;
    margin-bottom: 45px;
    text-align: center;
    word-wrap: break-word;
    word-break: break-all;
    overflow: auto;
}

.paintingContainer .pBtnContainer div {
    display: flex;
    justify-content: center;
}

.paintingContainer .pBtnContainer .detailsBtn {
    background-color: #fff;
    color: black;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 20px;
    text-decoration: none;
    transition: 0.3s ease all;
}

.paintingContainer .pBtnContainer .detailsBtn:hover {
    transform: scale(1.1);
}
</style>