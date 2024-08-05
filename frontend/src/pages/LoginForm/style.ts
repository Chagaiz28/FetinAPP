import styled from "styled-components"
import { Button } from "antd"

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100%;
   padding-top: 4em;
`

export const TitleColor = styled.div`
   color: #0b2031;
`

export const LinkText = styled.span`
   cursor: pointer;
   text-decoration: underline;
   margin-left: 0.2rem;
`
export const LoginContainer = styled.div`
   box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
   border-radius: 0.3em;
   background: rgba(255, 255, 255, 0.95);
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin-bottom: 1em;
   text-align: center;

   .ant-form-item {
      padding: 0.5rem 1.5rem;
   }

   .ant-input-affix-wrapper {
      border: none;
      border-bottom: 0.1rem solid #0b2031;
      border-radius: 0;
      margin: 0.8rem 0.8rem 0 0.8rem;
      @media (max-height: 600px) {
         margin: 0;
         margin-left: 0.5rem;
      }
   }

   .ant-input-affix-wrapper:focus,
   .ant-input-affix-wrapper:hover {
      border-color: #0b2031;
      outline: 0;
   }

   .ant-input-password {
      border: none;
      border-bottom: 0.1rem solid #0b2031;
      border-radius: 0;
      margin-right: 0.5rem;
   }

   .ant-input-password:focus,
   .ant-input-password:hover {
      border-color: #0b2031;
      outline: 0;
   }

   .ant-form-item-control-input-content {
      display: flex;
      flex-direction: row;
      text-align: center;
   }

   .anticon {
      padding-top: 3%;
      margin: 0.7rem 0.5rem 0.5rem 0.5rem;
      @media (max-height: 600px) {
         margin: 0;
         margin-left: 0.5rem;
      }
   }
`

export const LoginButton = styled.button`
    background-color: #0b2031;
    color: rgba(255, 255, 255, 0.87)
    font:inherit;
    font-weight: 400;
    border-radius: 0.3em;
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    padding: 0.5rem;
    font-size: 2rem;
    min-width: 20rem;
    min-height: 3rem;
`

export const TextContainer = styled.div`
   display: flex;
   color: #333;
   flex-direction: column;
   text-align: center;
   justify-content: center;
   margin-bottom: 0.8em;

   h1 {
      font-size: 6em;
      margin-top: 5px;
      margin-bottom: 70px;
   }

   p {
      font-weight: 300;
      margin-top: 4rem;
      @media (min-height: 700px) {
         margin-top: 1em;
      }
   }
`

export const LoginRow = styled.div`
   background-color: #0b2031;
   color: rgba(255, 255, 255, 0.87);
   font: inherit;
   font-weight: 400;
   padding: 1.2rem 1.5rem;
   border-radius: 0.3em;
   display: flex;
   flex-direction: row;
   text-align: center;
   justify-content: center;
   font-size: 2rem;
   min-width: 20rem;
   min-height: 3rem;
`

export const MessageContainer = styled.div`
   margin-top: 0.5em;
   color: red;
`

export const StepTitleSpan = styled.span`
   margin-top: -1rem;
`

export const SmallButton = styled(Button)`
   background-color: ${(props) => (props.color === "blue" ? "#0b2031" : "rgba(255, 255, 255, 1)")};
   color: ${(props) => (props.color === "blue" ? "rgba(255, 255, 255, 0.87)" : "#0b2031")};
   font: inherit;
   font-weight: 500;
   border-radius: 0.3em;
   font-size: 1.2rem;
   min-width: 6.5rem;
   min-height: 1.5rem;
`
