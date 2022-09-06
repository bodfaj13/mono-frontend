import { paginatedData } from "../../utils/helpers-interface"
import { http } from "../index"



export const getLinkedAccounts = (data?: paginatedData) => {
  return http.get(`/accounts/linkedaccounts`, {
    params: {
      ...data
    }
  })
}


export const linkAccount = (code: string) => {
  return http.post(`/accounts/linkaccount`, {
    code
  })
}