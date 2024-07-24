import type { painting } from '@/types/painting.js'
import internalFetch from '../lib/internalFetch.js'

export async function getPaintings():Promise<painting[]> {
    const response: Response = await internalFetch('GET', 'paintings')

    return await response.json()
}

export async function getLast2() {
    const response: Response = await internalFetch('GET', 'paintings/last2')

    return response.json()
}