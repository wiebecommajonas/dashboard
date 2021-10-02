import axios from "axios"

export class BaseService {
    async POST<Result>(data: any, headers?: any): Promise<Result> {
        const _headers = headers ? headers : {'Content-TYPE': 'application/json'}
        const result = await axios.request<Result>({method: 'POST', baseURL: process.env.VUE_APP_SERVER_URL!,
        headers: _headers, data})

        if (result.status === 200) {
            return result.data
        }
        else {
            throw new Error('Axios error with status: ' + result.status)
        }
    }
}