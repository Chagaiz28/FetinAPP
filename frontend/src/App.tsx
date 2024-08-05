import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LoginForm } from "./pages/LoginForm"
import { EsqueciSenha } from "./pages/EsqueciSenha"
import { AlunoPage } from "./pages/MenuPage/aluno"
import { CadastroEquipe } from "./pages/CadastroEquipe"
import { OrientadorPage } from "./pages/MenuPage/orientador"

export const App = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route path="/aluno" element={<AlunoPage />} />
            <Route path="/orientador" element={<OrientadorPage />} />
            <Route path="/admin-page" element={<CadastroEquipe />} />
         </Routes>
      </Router>
   )
}
