import { api } from "./tokenService"

export async function patchTeam({ id, team }: { id: string; team: any }) {
   try {
      const res = await api.patch(`teams/${id}`, team)
      return res.data
   } catch (error) {
      return error
   }
}
