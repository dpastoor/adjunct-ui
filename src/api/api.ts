import * as axios from 'axios'
export class Api {
    public static runCode(code: string[]): Axios.IPromise<Axios.AxiosXHR<{}>>  {
        console.log(code)
        console.log(JSON.stringify(code))
           return axios.post('http://localhost:8080',
               {
                   session_name: "tmp123",
                   code: code
               },
               {
                   responseType: 'text'
                }
               )
    }
}