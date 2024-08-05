import { api } from "./tokenService"

export async function getTeams() {
   try {
      const res = await api.get(`teams`)
      return res.data
   } catch (error) {
      return error
   }
}
