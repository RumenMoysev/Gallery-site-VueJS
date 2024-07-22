import internalFetch from '../lib/internalFetch.js'

export function getPaintings() {
    return internalFetch('GET', 'paintings')
}

export async function getLast2() {
    const response = await internalFetch('GET', 'paintings/last2')

    return response.json()
}