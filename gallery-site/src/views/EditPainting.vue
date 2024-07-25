<script setup lang="ts">
import type { paintingErrObject } from '@/types/errors.js';
import type { paintingDetails, paintingFormData } from '@/types/painting.js';
import { onMounted, ref, type Ref } from 'vue';
import * as paintingsService from '@/services/paintingsService.js'
import router from '@/router/index.js';
import { useRoute } from 'vue-router';

const title: Ref<string> = ref('')
const summary: Ref<string> = ref('')
const description: Ref<string> = ref('')
const imageUrl: Ref<string> = ref('')
const price: Ref<number | undefined> = ref()
const isLoading: Ref<boolean> = ref(true)

const route = useRoute()
const paintingId: string = String(route.params.id)

onMounted(async () => {
    const data: paintingDetails = await paintingsService.getPaintingDetails(paintingId)
    
    title.value = data.title
    summary.value = data.summary
    description.value = data.description
    imageUrl.value = data.imageUrl
    price.value = data.price
    
    isLoading.value = false
})

const errors = ref<paintingErrObject>({})

async function editPainting() {
    const paintingData: paintingFormData = {
        title: title.value,
        summary: summary.value,
        description: description.value,
        imageUrl: imageUrl.value,
        price: Number(price.value)
    }

    errors.value = paintingsService.validate(paintingData)

    if(!errors.value.title && !errors.value.summary && !errors.value.description && !errors.value.imageUrl && !errors.value.price) {
        try {
            const response: Response = await paintingsService.editPainting(paintingData, paintingId)

            if(response.status === 400) {
                const body = await response.json()

                throw body.message
            }

            router.push('/gallery')
        } catch (error) {
            errors.value.generalError = String(error)
        }
    }
}

</script>

<template>
    <section class="editPaintingPage center">
        <form v-if="!isLoading" class="form" @submit.prevent="editPainting">
            <h2>Edit painting</h2>
            <div class="input-box">
                <input type="text" placeholder="" name="paintingTitle" id="" v-model="title">
                <span>Painting Title</span>
                <i class='bx bx-palette'></i>
            </div>
            <div class="input-box">
                <input type="text" placeholder="" name="summary" id="" v-model="summary">
                <span>Description Summary</span>
                <i class='bx bx-dots-horizontal-rounded'></i>
            </div>
            <div class="input-box">
                <input type="text" placeholder="" name="description" id="" v-model="description">
                <span>Description</span>
                <i class='bx bx-list-ul'></i>
            </div>
            <div class="input-box">
                <input type="text" placeholder="" name="imageUrl" id="" v-model="imageUrl">
                <span>Image Url</span>
                <i class='bx bx-image-add'></i>
            </div>
            <div class="input-box">
                <input type="number" placeholder="" name="price" id="" v-model="price">
                <span>Price</span>
                <i class='bx bx-euro'></i>
            </div>
            <button class="formBtn">Confrim edit</button>
        </form>

        <div class="error-container">
            <div class="error" v-if="errors.title">
                <p>{{ errors.title }}</p>
            </div>

            <div class="error" v-if="errors.summary">
                <p>{{ errors.summary }}</p>
            </div>

            <div class="error" v-if="errors.description">
                <p>{{ errors.description }}</p>
            </div>

            <div class="error" v-if="errors.imageUrl">
                <p>{{ errors.imageUrl }}</p>
            </div>

            <div class="error" v-if="errors.price">
                <p>{{ errors.price }}</p>
            </div>
            
            <div class="error" v-if="errors.generalError">
                <p>{{ errors.generalError }}</p>
            </div>
        </div>

        <div class="spinner" v-if="isLoading">
        <div class="ring"></div>
        <span>loading...</span>
    </div>
    </section>
</template>

<style>
</style>