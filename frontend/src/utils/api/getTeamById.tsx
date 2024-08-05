import { api } from "./tokenService"

export async function getTeamById({id}: {id: string}) {
   try {
      const res = await api.get(`teams/${id}`)
      return res.data
   } catch (error) {
      return error
   }
}