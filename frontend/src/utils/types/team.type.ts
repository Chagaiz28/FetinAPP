export type TeamType = {
   _id?: string
   number: string
   name: string
   members: MemberType[]
   advisorName: string
   advisorEmail: string
   status: string
   extraActivities: string[]
   currentPhase?: string
   deadline?: string
   issues?: string[]
   grades?: Grades[]
}

export type MemberType = {
   name: string
   email: string
}

export type Grades = {
   currentPhase: string
   grade: number
}
