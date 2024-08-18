import { url } from "../services/api";

const searchProducts = async (token, search) => {
    return await fetch(url + '/products/search?search=' + search, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    })
}

const getProductsByCategory = async (token, categoryId) => {
    return await fetch(url + '/products/category/' + categoryId, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    })
}

const getAllAvailableProducts = async (token) => {
    return await fetch(url + '/products', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    })
}

const getProduct = async (token, id) => {
    return await fetch(url + '/products/' + id, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    })
}


const createProduct = async (token, formData) => {
    return await fetch(url + '/products', {
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${ token }`,
        },
        body: formData
    })
}

const updateProduct = async (token, id, data) => {
    return await fetch(url + '/products/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${ token }`,
        },
        body: JSON.stringify(data)
    })
}

export { searchProducts, 
    getProductsByCategory, 
    getAllAvailableProducts, 
    getProduct, 
    createProduct, 
    updateProduct
}