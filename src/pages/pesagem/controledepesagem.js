"use client"

import React from "react"
import {
  Box,
  Card,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
  Button,
} from "@mui/material"
import {
  SearchOutlined as SearchOutlinedIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  Email as EmailIcon,
} from "@mui/icons-material"
import Sidebar from "../../components/sidebar"
import { keyframes } from "@emotion/react"

export default function DashboardPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const isLaptop = useMediaQuery(theme.breakpoints.between("md", "lg"))

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [search, setSearch] = React.useState("")

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", margin: 0, padding: 0, overflow: "hidden" }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          marginLeft: { xs: 0, sm: "290px" },
          width: "100%",
          height: "auto",
          paddingTop: "3rem",
          overflowX: "hidden",
          overflowY: "auto",
          backgroundColor: "#f0f4f8",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 6,
            fontWeight: "bold",
            color: "#2c3e50",
            fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            animation: `${fadeIn} 1s ease-out`,
          }}
        >
          Controle de pesagem
        </Typography>

        <Fade in={true} timeout={1000}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: "20px", padding: "0 20px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", width: { xs: "100%", lg: "50%" } }}>
              <DashboardCard
                title="Quantitade de rotas feitas hoje"
                value="470"
                backgroundColor="#c3e6cb"
                titleColor="#28a745"
                valueColor="#28a745"
                sx={{
                  height: "200px",
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 20px",
                  textAlign: "center",
                }}
              />
              <DashboardCard
                title="Total de quilos coletados hoje"
                value="27.500"
                backgroundColor="#FDF6E3"
                titleColor="#A67C52"
                valueColor="#5A3E36"
                sx={{
                  height: "200px",
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 20px",
                  textAlign: "center",
                }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", lg: "50%" },
                height: "auto",
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: "bold",
                  color: "#333",
                  textAlign: "center",
                  fontSize: "24px",
                }}
              >
                Adicionar Pesagem
              </Typography>
              <TextField
                label="Data da Pesagem"
                type="date"
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField label="Nome do Motorista" fullWidth sx={{ mb: 2 }} />
              <TextField label="Peso (kg)" type="number" fullWidth sx={{ mb: 2 }} />
              <TextField label="Número do Veículo" fullWidth sx={{ mb: 2 }} />
              <TextField
                label="Hora da Pesagem"
                type="time"
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#3498db",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#3498db",
                    transform: "translateY(-2px)",
                  },
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  textTransform: "none",
                }}
              >
                Salvar Pesagem
              </Button>
            </Box>
          </Box>
        </Fade>

        <Grow in={true} timeout={1500}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: "20px", padding: "20px" }}></Box>
        </Grow>

        <Fade in={true} timeout={2000}>
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <ExpenseControlCard
              search={search}
              setSearch={setSearch}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Box>
        </Fade>
      </Box>
    </Box>
  )
}

function ExpenseControlCard({ search, setSearch, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  const theme = useTheme()

  const pesagens = [
    { id: 1, motorista: "João Silva", numeroVeiculo: "ABC-1234", data: "2023-05-01", hora: "08:30" },
    { id: 2, motorista: "Maria Santos", numeroVeiculo: "DEF-5678", data: "2023-05-02", hora: "09:45" },
    { id: 3, motorista: "Pedro Oliveira", numeroVeiculo: "GHI-9012", data: "2023-05-03", hora: "10:15" },
    { id: 4, motorista: "Ana Rodrigues", numeroVeiculo: "JKL-3456", data: "2023-05-04", hora: "11:30" },
    { id: 5, motorista: "Carlos Ferreira", numeroVeiculo: "MNO-7890", data: "2023-05-05", hora: "13:00" },
    { id: 6, motorista: "Lucia Almeida", numeroVeiculo: "PQR-1234", data: "2023-05-06", hora: "14:20" },
  ]

  const filteredPesagens = pesagens.filter((pesagem) => pesagem.motorista.toLowerCase().includes(search.toLowerCase()))

  return (
    <Card
      sx={{
        p: 3,
        bgcolor: theme.palette.background.paper,
        borderRadius: "16px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        height: "auto",
        width: "97%",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          transform: "translateY(-5px)",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: "24px",
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          fontSize: "28px",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Registro de Pesagens
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 3 }}>
        <TextField
          label="Pesquisar Motorista"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "60%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#3f51b5",
                transition: "all 0.3s ease-in-out",
              },
              "&:hover fieldset": {
                borderColor: "#303f9f",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1a237e",
              },
            },
          }}
        />
      </Box>
      <TableContainer sx={{ maxHeight: "calc(100vh - 350px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#333", color: "white", fontSize: "18px" }}>
                Motorista
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#333", color: "white", fontSize: "18px" }}>
                Número do Veículo
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#333", color: "white", fontSize: "18px" }}>
                Data
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#333", color: "white", fontSize: "18px" }}>
                Hora
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#333", color: "white", fontSize: "18px" }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPesagens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pesagem, index) => (
              <TableRow
                key={pesagem.id}
                hover
                sx={{
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    transform: "scale(1.01)",
                  },
                  animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <TableCell>{pesagem.motorista}</TableCell>
                <TableCell>{pesagem.numeroVeiculo}</TableCell>
                <TableCell>{pesagem.data}</TableCell>
                <TableCell>{pesagem.hora}</TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "#3498db", "&:hover": { backgroundColor: "#3498db", transform: "scale(1.1)" } }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: "#3498db", "&:hover": { backgroundColor: "#3498db", transform: "scale(1.1)" } }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: "#3498db", "&:hover": { backgroundColor: "#3498db", transform: "scale(1.1)" } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredPesagens.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
            color: "#333",
            fontWeight: "bold",
          },
          ".MuiTablePagination-select": {
            color: "#333",
          },
          ".MuiTablePagination-actions": {
            color: "#333",
          },
        }}
      />
    </Card>
  )
}

function StatementIssuanceTable() {
  const theme = useTheme()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const statements = [
    { id: 1, client: "Cliente A", date: "2023-05-01", type: "Mensal" },
    { id: 2, client: "Cliente B", date: "2023-05-02", type: "Anual" },
    { id: 3, client: "Cliente C", date: "2023-05-03", type: "Trimestral" },
    { id: 4, client: "Cliente D", date: "2023-05-04", type: "Mensal" },
    { id: 5, client: "Cliente E", date: "2023-05-05", type: "Semestral" },
    { id: 6, client: "Cliente F", date: "2023-05-06", type: "Anual" },
  ]

  return (
    <Box>
      <TableContainer sx={{ maxHeight: "calc(100vh - 250px)", width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Data</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((statement) => (
              <TableRow key={statement.id}>
                <TableCell>{statement.client}</TableCell>
                <TableCell>{statement.date}</TableCell>
                <TableCell>{statement.type}</TableCell>
                <TableCell>
                  <IconButton sx={{ color: theme.palette.info.main }}>
                    <PrintIcon />
                  </IconButton>
                  <IconButton sx={{ color: theme.palette.success.main }}>
                    <EmailIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={statements.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  )
}

function DashboardCard({ title, value, backgroundColor, titleColor, valueColor }) {
  const theme = useTheme()

  return (
    <Card
      sx={{
        p: 3,
        bgcolor: backgroundColor,
        borderRadius: "16px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px) scale(1.02)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: titleColor,
          fontWeight: "bold",
          fontSize: "24px",
          marginBottom: "12px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: valueColor,
          fontWeight: "bold",
          fontSize: "48px",
          animation: `${countUp} 2s ease-out`,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        {value}
      </Typography>
    </Card>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const countUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

