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

const createCategory = async (token, data) => {
    return await fetch(url + '/categories', {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${ token }`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

const updateCategory = async (token, data, id) => {
    return await fetch(url + '/categories/' + id, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${ token }`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export { getCategories, getCategory, deleteCategory, createCategory, updateCategory }