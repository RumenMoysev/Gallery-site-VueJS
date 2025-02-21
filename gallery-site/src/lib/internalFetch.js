const baseUrl = 'http://localhost:3030'

export default function internalFetch(method, url, data) {
    let settings = {
        method: method,
        credentials: 'include'
    }

    if (method === "GET" || method === "DELETE") {
        
        return fetch(`${baseUrl}/${url}`, settings)
    };

    settings.headers = {
        "Content-type": "application/json"
    }
    settings.body = JSON.stringify(data)

    return fetch(`${baseUrl}/${url}`, settings)
}