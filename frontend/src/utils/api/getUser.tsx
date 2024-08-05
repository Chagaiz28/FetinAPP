import { api } from "./tokenService"

export async function getUserByEmail(email: string) {
   try {
      const res = await api.get(`users/${email}`)
      return res.data
   } catch (error) {
      return error
   }
}
