export async function getProducts() {
    const response = await fetch('/api/products')

    if (!response.ok) {
        throw new Error('Failed to load products')
    }

    return response.json()
}

export async function getFarms() {
    const response = await fetch('/api/farms')

    if (!response.ok) {
        throw new Error('Failed to load farms')
    }

    return response.json()
}