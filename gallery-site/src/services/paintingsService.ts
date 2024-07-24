import type { painting, paintingDetails } from '@/types/painting.js'
import internalFetch from '../lib/internalFetch.js'

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

export function likePainting(paintingId: string) {
    return internalFetch('POST', `paintings/${paintingId}/like`)
}

export function deletePainting(paintingId: string) {
    return internalFetch('DELETE', `paintings/${paintingId}`)
}