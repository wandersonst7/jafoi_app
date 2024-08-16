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

export { searchProducts, getProductsByCategory, getAllAvailableProducts, getProduct }