import { TeamType } from "../types/team.type"
import { api } from "./tokenService"

export async function postTeam(team: TeamType) {
   try {
      const res = await api.post(`teams/`, team)
      return res.data
   } catch (error) {
      return error
   }
}
