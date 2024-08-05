import { api } from "./tokenService"

export async function postLogin({ email, password }: { email: string; password: string }) {
   try {
      const res = await api.post("/auth/login", { email, password })
      return res.data
   } catch (error) {
      return error
   }
}