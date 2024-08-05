import React from "react"
import { ConfigProvider, Card, List, Tag, Row, Col, Button, Modal, Input, InputNumber } from "antd"
import { useEffect, useState } from "react"
import backgroundImage from "../../assets/logo.png"
import { getTeamsByAdvisor } from "../../utils/api/getTeams"
import { Grades, MemberType } from "../../utils/types/team.type"
import { patchTeam } from "../../utils/api/patchTeam"

export const OrientadorPage = () => {
   const [teamData, setTeamData] = useState<any[]>()
   const [isModalVisible, setIsModalVisible] = useState(false)
   const [isGradeModalVisible, setIsGradeModalVisible] = useState(false)
   const [isSummaryModalVisible, setIsSummaryModalVisible] = useState(false)
   const [currentTeam, setCurrentTeam] = useState<any>({})
   const [newPhase, setNewPhase] = useState<string>()
   const [newDeadline, setNewDeadline] = useState<string>()
   const [newIssues, setNewIssues] = useState<string>()
   const [grade, setGrade] = useState<any>()

   useEffect(() => {
      get()
   }, [])

   async function get() {
      try {
         const advisorEmail = localStorage.getItem("userEmail") as string
         const res = await getTeamsByAdvisor({ advisorEmail })
         setTeamData(res)
      } catch (error) {
         console.error(error)
      }
   }

   const showModal = (team: any) => {
      setCurrentTeam(team)
      setIsModalVisible(true)
   }

   const showGradeModal = (team: any) => {
      setCurrentTeam(team)
      setIsGradeModalVisible(true)
   }

   const showSummaryModal = (team: any) => {
      setCurrentTeam(team)
      setIsSummaryModalVisible(true)
   }

   const handleOk = async () => {
      if (currentTeam && newPhase && newDeadline && newIssues) {
         try {
            const newPhaseObj = {
               currentPhase: newPhase,
               deadline: newDeadline,
               issues: newIssues.split(","),
            }
            currentTeam.phases.push(newPhaseObj)
            await patchTeam({ id: currentTeam._id ?? "id_inexistente", team: currentTeam })
            setIsModalVisible(false)
            get() // Atualiza os dados após a mudança de fase
         } catch (error) {
            console.error(error)
         }
      }
   }

   const handleGradeOk = async () => {
      if (currentTeam && grade !== null) {
         try {
            const currentPhase = currentTeam.phases[currentTeam.phases.length - 1].currentPhase
            const existingGrade = currentTeam.grades.find((grade: any) => grade.currentPhase === currentPhase)

            if (existingGrade) {
               existingGrade.grade = Number(grade)
            } else {
               const newGradeObj = {
                  currentPhase: currentPhase,
                  grade: Number(grade),
               } as Grades
               currentTeam.grades.push(newGradeObj)
            }

            await patchTeam({ id: currentTeam._id ?? "id_inexistente", team: currentTeam })
            setIsGradeModalVisible(false)
            get() // Atualiza os dados após a submissão da nota
         } catch (error) {
            console.error(error)
         }
      }
   }

   const handleCancel = () => {
      setIsModalVisible(false)
   }

   const handleGradeCancel = () => {
      setIsGradeModalVisible(false)
   }

   const handleSummaryCancel = () => {
      setIsSummaryModalVisible(false)
   }

   const getGradeForPhase = (team: any, phaseName: string) => {
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
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
               minHeight: "100vh",
               background: `url(${backgroundImage})`,
               backgroundSize: "cover",
            }}
         >
            <Card
               title="Informações do Orientador"
               style={{
                  width: "100%",
                  maxWidth: "700px",
                  minHeight: "200px",
                  textAlign: "center",
                  margin: "10px",
               }}
            >
               <Button type="primary" href="URL_DO_MANUAL">
                  Acessar Manual
               </Button>
               <br />
               <br />
               <Button type="primary" href="URL_DO_FORMULARIO">
                  Acessar Formulários
               </Button>
            </Card>
            <Row gutter={[16, 16]} style={{ width: "100%", maxWidth: "1200px", marginTop: "20px" }}>
               {teamData &&
                  teamData.map((team: any, index: any) => (
                     <React.Fragment key={index}>
                        <Col span={12}>
                           <Card
                              title={`Equipe: ${team.name}`}
                              style={{
                                 width: "100%",
                                 minHeight: "350px",
                                 textAlign: "center",
                                 margin: "10px",
                              }}
                           >
                              <List
                                 dataSource={team.members}
                                 renderItem={(member: MemberType, idx) => (
                                    <List.Item key={idx}>
                                       <Tag color="blue">{member.name}</Tag> {member.email}
                                    </List.Item>
                                 )}
                              />
                              <div>
                                 <strong>Orientador:</strong> {team.advisorName} ({team.advisorEmail})
                              </div>
                              <div>
                                 <strong>Status:</strong> {team.status}
                              </div>
                              <div>
                                 <strong>Atividades Extras:</strong>{" "}
                                 {team.extraActivities && team.extraActivities.join(", ")}
                              </div>
                           </Card>
                        </Col>
                        <Col span={12}>
                           <Card
                              title="Detalhes da Fase"
                              style={{
                                 width: "100%",
                                 minHeight: "350px",
                                 textAlign: "center",
                                 margin: "10px",
                              }}
                           >
                              <Button
                                 type="primary"
                                 style={{ marginBottom: "20px", textAlign: "center" }}
                                 onClick={() => showSummaryModal(team)}
                              >
                                 Resumo de Fases
                              </Button>
                              <div style={{ marginBottom: 50 }}>
                                 <div>
                                    <strong>Fase Atual:</strong>{" "}
                                    {team.phases[team.phases.length - 1]?.currentPhase}
                                 </div>
                                 <div>
                                    <strong>Prazo:</strong> {team.phases[team.phases.length - 1]?.deadline}
                                 </div>
                                 <div>
                                    <strong>Entregas:</strong>{" "}
                                    {team.phases[team.phases.length - 1]?.issues.join(", ")}
                                 </div>
                                 <div>
                                    <strong>Nota:</strong>{" "}
                                    {getGradeForPhase(
                                       team,
                                       team.phases[team.phases.length - 1]?.currentPhase,
                                    )}
                                 </div>
                              </div>
                              <Button
                                 type="primary"
                                 style={{ marginRight: "10px" }}
                                 onClick={() => showModal(team)}
                              >
                                 Editar Fase
                              </Button>
                              <Button type="primary" onClick={() => showGradeModal(team)}>
                                 Lançar Nota
                              </Button>
                           </Card>
                        </Col>
                     </React.Fragment>
                  ))}
            </Row>
            <Modal title="Editar Fase" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               <strong>Nova Fase:</strong>
               <Input
                  placeholder="Ex: Estudo de caso"
                  style={{ margin: 10 }}
                  onChange={(e) => setNewPhase(e.target.value)}
               />
               <strong>Novo Prazo:</strong>
               <Input
                  placeholder="Ex: 20/10/2025"
                  style={{ margin: 10 }}
                  onChange={(e) => setNewDeadline(e.target.value)}
               />
               <strong>Novas Entregas:</strong>
               <Input
                  placeholder="Ex: entrega1,entrega2,entrega3,etc..."
                  style={{ margin: 10 }}
                  onChange={(e) => setNewIssues(e.target.value)}
               />
            </Modal>
            <Modal
               title="Lançar Nota"
               visible={isGradeModalVisible}
               onOk={handleGradeOk}
               onCancel={handleGradeCancel}
            >
               <strong>Nota:</strong>
               <InputNumber
                  min={0}
                  max={10}
                  style={{ margin: 10 }}
                  placeholder="Nota"
                  onChange={(value) => setGrade(value)}
               />
            </Modal>
            <Modal
               title="Resumo de Fases"
               visible={isSummaryModalVisible}
               onOk={handleSummaryCancel}
               onCancel={handleSummaryCancel}
            >
               {currentTeam.phases &&
                  currentTeam.phases.map((phase: any, idx: any) => (
                     <div key={idx} style={{ marginBottom: "10px" }}>
                        <Card>
                           <p>
                              <strong>Fase:</strong> {phase.currentPhase}
                           </p>
                           <p>
                              <strong>Prazo:</strong> {phase.deadline}
                           </p>
                           <p>
                              <strong>Entregas:</strong> {phase.issues.join(", ")}
                           </p>
                           <p>
                              <strong>Nota:</strong> {getGradeForPhase(currentTeam, phase.currentPhase)}
                           </p>
                        </Card>
                     </div>
                  ))}
            </Modal>
         </div>
      </ConfigProvider>
   )
}
