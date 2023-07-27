import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

axios.interceptors.response.use(async (response: AxiosResponse) => {
    await sleep();
    return response;
},
    (error: AxiosError) => {
        const er = error.response!
        const { data, status } = error.response! as AxiosResponse
        console.log("error caught")
        if (status === 400) {
            if (data.errors) {
                const modelStateErrors: string[] = []
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat()
            }
        }
        // return er
        return Promise.reject(er)
    })

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: string) => requests.get(`products/${id}`),
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const Basket = {
    getBasket: () => requests.get('baskets'),
    addBasket: (productId: number, quantity: number) => requests.post(`baskets?productId=${productId}&quantity=${quantity}`, {}),
    removeBasket : (productId: number, quantity: number) => requests.delete(`baskets?productId=${productId}&quantity=${quantity}`),
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
}

export default agent
