"use client"

import Head from "next/head"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { Box, Typography, Button, TextField } from "@mui/material"
import { useRouter } from "next/router"

const ResetPassword = () => {
  const [setInvalidEmail] = useState("")
  const router = useRouter()

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push("/gastos/gastos")
  }

  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório")
        .matches(
          /^[\w._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/,
          "O e-mail deve ser de um dos domínios permitidos: gmail.com, hotmail.com, yahoo.com, outlook.com",
        ),
      password: Yup.string().required("Senha é obrigatória").min(8, "A senha deve ter pelo menos 8 caracteres"),
    }),
    onSubmit: async (values) => {
      setInvalidEmail("")
      try {
        const resetPasswordConfirmUrl = buildResetPasswordConfirmUrl(values.email)
        console.log("URL de confirmação:", resetPasswordConfirmUrl)
        alert("E-mail de redefinição de senha enviado com sucesso!")
      } catch (error) {
        console.error("Erro ao enviar o e-mail:", error)
        formik.setErrors({ submit: "Ocorreu um erro ao enviar o e-mail. Tente novamente." })
        setInvalidEmail(values.email)
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  })

  return (
    <>
      <Head>
        <title>Login</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "grey", // Azul como background
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            filter: "blur(8px)", // Adicionando o efeito de blur
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            padding: "2rem",
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo semi-transparente
            borderRadius: "15px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#333",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
             Bem vindo !
          </Typography>

          <Typography
            variant="h6"
            sx={{
              marginBottom: "0.5rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: "bold",
              fontSize: "35px",
              color: "black", // Cor azul para o título
            }}
          >
            Controle de Pesagem
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#333",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: "0.5rem",
              fontSize: "20px",
            }}
          >
            Entre seu email e senha
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <TextField
                label="E-mail"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  marginBottom: "1rem",
                  border: "2px solid black",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "7px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
              />

              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  marginBottom: "1rem",
                  border: "2px solid black",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "7px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#1E90FF",
                    },
                  },
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
              />

              <Button
                type="submit"
                sx={{
                  width: "70%",
                  padding: "0.5rem 1rem",
                  color: "white",
                  fontSize: "15px",
                  borderRadius: "50px",
                  marginBottom: "0.8rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "#4169E1",
                  },
                }}
              >
                Entrar
              </Button>

              <Button
                sx={{
                  width: "40%",
                  padding: "0.5rem 1rem",
                  color: "black",
                  fontSize: "15px",
                  borderRadius: "50px",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: "white",
                  marginBottom: "0.5rem",
                  border: "2px solid black",
                  "&:hover": {
                    backgroundColor: "#E6F3FF",
                  },
                }}
              >
                Cadastre-se
              </Button>
            </Box>
          </form>

          {formik.errors.submit && (
            <Typography
              color="error"
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              variant="body2"
            >
              {formik.errors.submit}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  )
}

export default ResetPassword

