import { useCallback, useEffect, useState } from "react"
import { ConfigProvider, Card, Form, Input, Button, Modal, Space } from "antd"
import backgroundImage from "../../assets/logo.png"
import CSVReader from "react-csv-reader"
import { getTeams } from "../../utils/api/getTeam"
import { postTeam } from "../../utils/api/postTeam"
import { deleteTeamById } from "../../utils/api/deleteTeam"
import { patchTeam } from "../../utils/api/patchTeam"

export const CadastroEquipe = () => {
   const [modalVisible, setModalVisible] = useState(false)
   const [equipes, setEquipes] = useState<any>([])
   const [editingEquipe, setEditingEquipe] = useState<any>()

   useEffect(() => {
      handleGetTeams()
   }, [])

   const initialValuesFromTeam = useCallback((team: any) => {
      if (!team) {
         return {}
      } else {
         return {
            teamNumber: team.number,
            projectName: team.name,
            member1Name: team.members[0]?.name,
            member1Email: team.members[0]?.email,
            member2Name: team.members[1]?.name,
            member2Email: team.members[1].email,
            member3Name: team.members[2]?.name,
            member3Email: team.members[2]?.email,
            member4Name: team.members[3]?.name,
            member4Email: team.members[3]?.email,
            advisorName: team.advisorName,
            advisorEmail: team.advisorEmail,
            teamStatus: team.status,
            parallels: team.extraActivities,
         }
      }
   }, [])

   const handleGetTeams = async () => {
      const teams = await getTeams()
      setEquipes(teams)
   }

   const handleOpenModal = () => setModalVisible(true)
   const handleCloseModal = () => setModalVisible(false)

   const handleCadastroEquipe = async (values: any) => {
      setEquipes([...equipes, values])
      const {
         teamNumber,
         projectName,
         member1Name,
         member1Email,
         member2Name,
         member2Email,
         member3Name,
         member3Email,
         member4Name,
         member4Email,
         advisorName,
         advisorEmail,
         teamStatus,
         parallels,
      } = values
      const teamToSave = {
         number: teamNumber,
         name: projectName,
         members: [
            { name: member1Name, email: member1Email },
            { name: member2Name, email: member2Email },
            { name: member3Name, email: member3Email },
            { name: member4Name, email: member4Email },
         ],
         advisorName: advisorName,
         advisorEmail: advisorEmail,
         status: teamStatus,
         extraActivities: parallels,
      }
      await postTeam(teamToSave)
      handleGetTeams()
      handleCloseModal()
   }

   const handleEditEquipe = async (index: any) => {
      setEditingEquipe(equipes[index])
      setModalVisible(true)
   }

   const handleUpdateEquipe = async (values: any) => {
      const teamToSave = {
         number: values.teamNumber,
         name: values.projectName,
         members: [
            { name: values.member1Name, email: values.member1Email },
            { name: values.member2Name, email: values.member2Email },
            { name: values.member3Name, email: values.member3Email },
            { name: values.member4Name, email: values.member4Email },
         ],
         advisorName: values.advisorName,
         advisorEmail: values.advisorEmail,
         status: values?.teamStatus, // Certifique-se de que o status está presente em values
         extraActivities: values?.parallels, // Certifique-se de que parallels está presente em values
      }
      await patchTeam({ id: editingEquipe._id, team: teamToSave })
      handleCloseModal()
      handleGetTeams()
   }

   const handleDeleteEquipe = async (index: number) => {
      if (index) {
         const teamId = equipes[index]._id.toString()
         await deleteTeamById(teamId)
      }
      handleCloseModal()
      handleGetTeams()
   }

   const handleForce = async (data: any) => {
      data.map(async (row: any[]) => {
         await handleCadastroEquipe({
            teamNumber: row[0],
            projectName: row[1],
            member1Name: row[2],
            member1Email: row[3],
            member2Name: row[4],
            member2Email: row[5],
            member3Name: row[6],
            member3Email: row[7],
            member4Name: row[8],
            member4Email: row[9],
            advisorName: row[10],
            advisorEmail: row[11],
            teamStatus: row[12],
            parallels: row[13],
         })
      })
   }

   return (
      <ConfigProvider
         theme={{
            token: { colorTextHeading: "white" },
            components: { Card: { headerBg: "#0B2031", headerFontSize: 19 } },
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
            <Card title="Cadastro de Equipe" style={{ width: "800px", textAlign: "center", margin: "10px" }}>
               {equipes.map((equipe: any, index: number) => (
                  <div key={index} style={{ marginBottom: "8px" }}>
                     <span>
                        Equipe {equipe.number}: {equipe.name}
                     </span>
                     <Space style={{ marginLeft: "10px" }}>
                        <Button onClick={() => handleEditEquipe(index)}>Editar</Button>
                        <Button type="primary" onClick={() => handleDeleteEquipe(index)}>
                           Excluir
                        </Button>
                     </Space>
                  </div>
               ))}
               <Button type="primary" onClick={handleOpenModal} style={{ margin: "15px" }}>
                  Adicionar Equipe +
               </Button>
               <CSVReader
                  cssClass="csv-reader-input"
                  onFileLoaded={handleForce}
                  onError={() => {}}
                  inputId="ObiWan"
                  inputStyle={{ color: "red" }}
               />
            </Card>
         </div>
         <Modal
            title={editingEquipe ? "Editar Equipe" : "Adicionar Equipe"}
            open={modalVisible}
            onCancel={handleCloseModal}
            footer={null}
         >
            <Form
               initialValues={initialValuesFromTeam(editingEquipe)}
               onFinish={editingEquipe ? handleUpdateEquipe : handleCadastroEquipe}
            >
               <Form.Item
                  name="teamNumber"
                  rules={[
                     { required: true, message: "Por favor, insira o número da equipe (até 3 caracteres)" },
                  ]}
               >
                  <Input placeholder="Número da Equipe" maxLength={3} />
               </Form.Item>
               <Form.Item
                  name="projectName"
                  rules={[
                     { required: true, message: "Por favor, insira o nome do projeto (até 65 caracteres)" },
                  ]}
               >
                  <Input placeholder="Nome do Projeto" maxLength={65} />
               </Form.Item>
               <Form.Item
                  name="member1Name"
                  rules={[
                     {
                        required: true,
                        message: "Por favor, insira o nome do integrante 01 (até 50 caracteres)",
                     },
                  ]}
               >
                  <Input placeholder="Nome do Integrante 01" maxLength={50} />
               </Form.Item>
               <Form.Item
                  name="member1Email"
                  rules={[
                     {
                        required: true,
                        message: "Por favor, insira o email do integrante 01 (até 30 caracteres)",
                     },
                  ]}
               >
                  <Input placeholder="Email do Integrante 01" maxLength={30} />
               </Form.Item>
               <Form.Item
                  name="member2Name"
                  rules={[
                     {
                        required: true,
                        message: "Por favor, insira o nome do integrante 01 (até 50 caracteres)",
                     },
                  ]}
               >
                  <Input placeholder="Nome do Integrante 02" maxLength={50} />
               </Form.Item>
               <Form.Item
                  name="member2Email"
                  rules={[
                     {
                        required: true,
                        message: "Por favor, insira o email do integrante 01 (até 30 caracteres)",
                     },
                  ]}
               >
                  <Input placeholder="Email do Integrante 02" maxLength={30} />
               </Form.Item>
               <Form.Item
                  name="member3Email"
                  rules={[
                     {
                        required: true,
                        message: "Por favor, insira o email do integrante 03 (até 30 caracteres)",
                     },
                  ]}
               >
                  <Input placeholder="Email do Integrante 03" maxLength={30} />
               </Form.Item>
               <Form.Item
                  name="member4Name"
                  rules={[
                     {
                        required: true,
                        message: "Por favor, insira o nome do integrante 02 (até 50 caracteres)",
                     },
                  ]}
               >
                  <Input placeholder="Nome do Integrante 04" maxLength={50} />
               </Form.Item>
               <Form.Item
                  name="member4Email"
                  rules={[
                     {
                        required: true,
                        message: "Por favor, insira o email do integrante 03 (até 30 caracteres)",
                     },
                  ]}
               >
                  <Input placeholder="Email do Integrante 04" maxLength={30} />
               </Form.Item>
               <Form.Item
                  name="advisorName"
                  rules={[
                     { required: true, message: "Por favor, insira o nome do projeto (até 65 caracteres)" },
                  ]}
               >
                  <Input placeholder="Nome do Orientador" maxLength={65} />
               </Form.Item>
               <Form.Item
                  name="advisorEmail"
                  rules={[
                     { required: true, message: "Por favor, insira o nome do projeto (até 65 caracteres)" },
                  ]}
               >
                  <Input placeholder="Email do Orientador" maxLength={65} />
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit">
                     {editingEquipe ? "Atualizar" : "Cadastrar"}
                  </Button>
               </Form.Item>
            </Form>
         </Modal>
      </ConfigProvider>
   )
}
