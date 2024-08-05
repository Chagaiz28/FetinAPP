import { Button, Card, ConfigProvider, Form, Input } from "antd"
import backgroundImage from "../../assets/logo.png"
import { useState } from "react"
import { LockOutlined, UnlockOutlined, UserOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { postLogin } from "../../utils/api/postLogin"
import { getUserByEmail } from "../../utils/api/getUser"

export const LoginForm = () => {
   const [form] = Form.useForm()
   const [passwordVisible, setPasswordVisible] = useState(false)
   const Navigate = useNavigate()

   async function onSubmitLogin(event: any) {
      const email = form.getFieldValue("email")
      const password = form.getFieldValue("password")

      if (!email || !password) return

      const response = await postLogin({ email, password })
      const user = await getUserByEmail(email)

      if (!user) {
         console.error("Usuário não encontrado")
         return
      }

      if (response instanceof Error) {
         return
      }

      localStorage.setItem("token", response?.acessToken)
      localStorage.setItem("refresh_token", response?.refreshToken)
      localStorage.setItem("teamNumber", user.teamNumber)
      localStorage.setItem("userEmail", user.email)

      if (user.role === "student") {
         Navigate("/aluno")
      } else if (user.role === "advisor") {
         Navigate("/orientador")
      } else if (user.role === "admin") {
         Navigate("/admin-page")
      } else {
         Navigate("/")
      }
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
            <Card title="Login" style={{ width: "400px", textAlign: "center" }}>
               <Form form={form}>
                  <Form.Item name="email" rules={[{ required: true, message: "Please enter your email" }]}>
                     <Input placeholder="Email" prefix={<UserOutlined />} />
                  </Form.Item>
                  <Form.Item
                     name="password"
                     rules={[{ required: true, message: "Please enter your password" }]}
                  >
                     <Input.Password
                        placeholder="Password"
                        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        prefix={passwordVisible ? <UnlockOutlined /> : <LockOutlined />}
                     />
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
                        onClick={onSubmitLogin}
                        type="primary"
                        style={{ marginBottom: "10px", background: "#0b2031" }}
                     >
                        Entrar
                     </Button>
                     <Button type="link" onClick={() => Navigate("/esqueci-senha")}>
                        Esqueceu a senha?
                     </Button>
                  </div>
               </Form>
            </Card>
         </div>
      </ConfigProvider>
   )
}
