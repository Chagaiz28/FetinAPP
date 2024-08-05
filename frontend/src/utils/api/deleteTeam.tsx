import { api } from "./tokenService"

export async function deleteTeamById(id: string) {
   try {
      const res = await api.delete(`teams/${id}`)
      return res.data
   } catch (error) {
      return error
   }
}
