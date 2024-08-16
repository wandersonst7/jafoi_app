import { url } from "../services/api";

const getCategories = async (token) => {
    return await fetch(url + '/categories', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    })
}

const getCategory = async (token, id) => {
    return await fetch(url + '/categories/' + id, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    })
}

const deleteCategory = async (token, id) => {
    return await fetch(url + '/categories/' + id, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    })
}

export { getCategories, getCategory, deleteCategory }