import * as axios from 'axios'
export class Api {
    public static runCode(code: string[]): Axios.IPromise<Axios.AxiosXHR<{}>>  {
           return axios.post('http://localhost:8080',
               {
                   session_name: "tmp123",
                   code: ["2+2", "2+1"]
               },
               {
                   responseType: 'text'
                }
               )
    }
}