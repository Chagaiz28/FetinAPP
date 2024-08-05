import React from "react"
import { ConfigProvider, Card, Tag, Row, Col, List } from "antd"
import backgroundImage from "../../assets/logo.png"
import { useEffect, useState } from "react"
import { getTeamByUserEmail } from "../../utils/api/getTeams"

export const AlunoPage = () => {
   const [team, setTeam] = useState<any>({})

   useEffect(() => {
      getTeam()
   }, [])

   async function getTeam() {
      try {
         const email = localStorage.getItem("userEmail") as string
         const res = await getTeamByUserEmail({ userEmail: email })
         setTeam(res)
      } catch (error) {
         console.error(error)
      }
   }

   const getGradeForPhase = (phaseName: string) => {
      const gradeObj = team.grades
         ? team.grades.find((grade: any) => grade.currentPhase === phaseName)
         : undefined
      return gradeObj ? gradeObj.grade : "Sem nota"
   }

   return (
      <ConfigProvider
         theme={{
            token: {
               colorTextHeading: "white",
            },
            components: {
               Card: {
                  headerBg: "#0B2031",
                  headerFontSize: 19,
               },
            },
         }}
      >
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               minHeight: "100vh",
               background: `url(${backgroundImage})`,
               backgroundSize: "cover",
            }}
         >
            <Row gutter={[128, 128]}>
               <Col span={12}>
                  <Card
                     title="Menu Equipe"
                     style={{ width: "400px", height: "auto", textAlign: "center", margin: "0 auto" }}
                  >
                     <List.Item
                        style={{
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                           margin: "10px",
                        }}
                     >
                        <div style={{ marginBottom: "5px" }}>
                           <span style={{ fontWeight: "bold" }}>Projeto:</span> {team.name}
                        </div>
                        <span style={{ fontWeight: "bold" }}>Membros:</span>
                        {team.members &&
                           team.members.map((member: any, index: any) => (
                              <div key={index} style={{ margin: "4px 2px 0 20px" }}>
                                 <Tag color="blue">{member.name}</Tag>
                                 <Tag color="blue">{member.email}</Tag>
                              </div>
                           ))}
                        <div style={{ marginTop: "5px" }}>
                           <span style={{ fontWeight: "bold" }}>Orientador:</span> {team.advisorName} (
                           {team.advisorEmail})
                        </div>
                        <div style={{ marginBottom: "2px" }}>
                           <span style={{ fontWeight: "bold" }}>Status:</span> {team.status}
                        </div>
                        <div style={{ marginBottom: "2px" }}>
                           <span style={{ fontWeight: "bold" }}>Atividades Extras:</span>
                           {team.extraActivities && team.extraActivities.join(", ")}
                        </div>
                     </List.Item>
                  </Card>
               </Col>
               <Col span={12}>
                  <Card
                     title="Fase Atual da FETIN"
                     style={{ width: "400px", height: "auto", textAlign: "center", margin: "0 auto" }}
                  >
                     {team.phases && team.phases.length > 0 ? (
                        <div>
                           <p>
                              <strong>Fase Atual:</strong> {team.phases[team.phases.length - 1].currentPhase}
                           </p>
                           <p>
                              <strong>Prazo:</strong> {team.phases[team.phases.length - 1].deadline}
                           </p>
                           <p>
                              <strong>Entregas:</strong>
                           </p>
                           <ul style={{ display: "contents" }}>
                              {team.phases[team.phases.length - 1].issues.map(
                                 (delivery: string, index: number) => (
                                    <p key={index}>{delivery}</p>
                                 ),
                              )}
                           </ul>
                           <p>
                              <strong>Nota:</strong>{" "}
                              {getGradeForPhase(team.phases[team.phases.length - 1].currentPhase)}
                           </p>
                        </div>
                     ) : (
                        <p>Sem informações da fase atual.</p>
                     )}
                  </Card>
               </Col>
            </Row>
         </div>
      </ConfigProvider>
   )
}
