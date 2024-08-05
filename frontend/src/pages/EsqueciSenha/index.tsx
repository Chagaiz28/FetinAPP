import { ConfigProvider, Card, Input, Button, Form, notification } from "antd"
import backgroundImage from "../../assets/logo.png"
import { UserOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { SetStateAction, useState } from "react"

export const EsqueciSenha = () => {
   const Navigate = useNavigate()
   const [email, setEmail] = useState("")

   const handlePasswordRecovery = () => {
      if (email.trim() !== "") {
         notification.success({
            message: "Email enviado com sucesso",
            description: "Verifique sua caixa de entrada",
         })
      } else {
         notification.error({
            message: "Erro",
            description: "Por favor, preencha o campo de Email",
         })
      }
   }

   const handleEmailChange = (e: { target: { value: SetStateAction<string> } }) => {
      setEmail(e.target.value)
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
            <Card title="Esqueci a Senha" style={{ width: "400px", textAlign: "center" }}>
               <Form>
                  <Form.Item name="email" rules={[{ required: true, message: "Please enter your Email" }]}>
                     <Input placeholder="Email" prefix={<UserOutlined />} onChange={handleEmailChange} />
                  </Form.Item>
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "20px",
                     }}
                  >
                     <Button
                        type="primary"
                        style={{ marginBottom: "10px", background: "#0b2031" }}
                        onClick={handlePasswordRecovery}
                     >
                        Enviar
                     </Button>
                     <Button type="link" onClick={() => Navigate("/")}>
                        Voltar ao menu
                     </Button>
                  </div>
               </Form>
            </Card>
         </div>
      </ConfigProvider>
   )
}
