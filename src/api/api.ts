import * as axios from 'axios'
export class Api {
    public static runCode(code: string): Axios.IPromise<Axios.AxiosXHR<{}>>  {
           return axios.post('/api/v1/',
               {
                   session_name: "tmp1234",
                   code: code
               },
               {
                   responseType: 'text'
                }
               )
    }
}