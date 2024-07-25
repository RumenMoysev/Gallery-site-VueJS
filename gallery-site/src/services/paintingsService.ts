import type { painting, paintingDetails, paintingFormData } from '@/types/painting.js'
import internalFetch from '../lib/internalFetch.js'
import type { paintingErrObject } from '@/types/errors.js'

export async function getPaintings(): Promise<painting[]> {
    const response: Response = await internalFetch('GET', 'paintings')

    return await response.json()
}

export async function getLast2() {
    const response: Response = await internalFetch('GET', 'paintings/last2')

    return response.json()
}

export async function getPaintingDetails(paintingId:string): Promise<paintingDetails> {
    const response: Response = await internalFetch('GET', `paintings/${paintingId}`)

    return response.json()
}

export async function getOwned(): Promise<painting[]> {
    const response: Response = await internalFetch('GET', 'users/getOwnedPaintings')

    return response.json()
}

export async function getLiked(): Promise<painting[]> {
    const response: Response = await internalFetch('GET', 'users/getLikedPaintings')

    return response.json()
}

export async function addPainting(paintingData: paintingFormData): Promise<Response> {
    const createdAtTime = new Date().toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'shortOffset' })
    return await internalFetch('POST', 'paintings', {...paintingData, createdAtTime})
}

export async function editPainting(paintingData: paintingFormData, paintingId: string): Promise<Response> {
    const updatedAtTime = new Date().toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'shortOffset' })
    return await internalFetch('PUT', `paintings/${paintingId}`, { ...paintingData, updatedAtTime })
}

export function likePainting(paintingId: string): Promise<Response> {
    return internalFetch('POST', `paintings/${paintingId}/like`)
}

export function deletePainting(paintingId: string): Promise<Response> {
    return internalFetch('DELETE', `paintings/${paintingId}`)
}

export function validate(paintingData: paintingFormData): paintingErrObject {
    const titleLength: number = 4
    const summaryLength: number = 10
    const descriptionLength: number = 20
    const imageUrlLength: number = 10
    const minPrice: number = 1

    const errObj: paintingErrObject = {}

    if (!paintingData.title) {
        errObj.title = 'Title is required!'
    } else if (paintingData.title.length < titleLength) {
        errObj.title = `Title should be at least ${titleLength} characters`
    }

    if( !paintingData.summary) {
        errObj.summary = 'Summary is required!'
    } else if (paintingData.summary.length < summaryLength) {
        errObj.summary = `Summary should be at least ${summaryLength} characters`
    }

    if (!paintingData.description) {
        errObj.description = 'Description is required!'
    } else if (paintingData.description.length < descriptionLength) {
        errObj.description = `Description should be at least ${descriptionLength} characters`
    }

    if (!paintingData.imageUrl) {
        errObj.imageUrl = 'ImageUrl is required!'
    } else if (paintingData.imageUrl.length < imageUrlLength) {
        errObj.imageUrl = `ImageUrl should be at least ${imageUrlLength}`
    } 
    else if (!paintingData.imageUrl.startsWith('http://') && !paintingData.imageUrl.startsWith('https://')) {
        errObj.imageUrl = 'Please provie a valid image URL'
    }

    if(!paintingData.price) {
        errObj.price = 'Price is required!'
    } else if (paintingData.price < minPrice) {
        errObj.price = `Painting price cannot be less than ${minPrice}€ !`
    }

    return errObj
}
