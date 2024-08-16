import { url } from "../services/api";

const getCategories = async (token) => {
    return await fetch(url + '/categories', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    })
}

export { getCategories }