import { api } from "./tokenService"

export async function getTeamsByAdvisor({ advisorEmail }: { advisorEmail: string }) {
   try {
      const res = await api.get(`teams/advisor/${advisorEmail}`)
      return res.data
   } catch (error) {
      return error
   }
}

export async function getTeamByUserEmail({ userEmail }: { userEmail: string }) {
   try {
      const res = await api.get(`teams/student/${userEmail}`)
      return res.data
   } catch (error) {
      return error
   }
}
