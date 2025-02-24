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
  CircularProgress,
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
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 8,
            fontWeight: "bold",
            color: "gray",
            fontSize: "4rem",
            textAlign: "center",
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
                backgroundColor="#E3E3E3"
                titleColor="#5A5A5A"
                valueColor="#333333"
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
                  fontSize: "24px", // Increased font size
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
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": { backgroundColor: "#333" },
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                }}
              >
                Salvar Pesagem
              </Button>
            </Box>
          </Box>
        </Fade>

        <Grow in={true} timeout={1500}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: "20px", padding: "20px" }}>
            {/* UnpaidExpensesCard removed */}
          </Box>
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
        boxShadow: theme.shadows[3],
        height: "auto",
        width: "97%",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: "24px",
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
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
                borderColor: "black",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
          }}
        />
      </Box>
      <TableContainer sx={{ maxHeight: "calc(100vh - 350px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5", fontSize: "18px" }}>Motorista</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5", fontSize: "18px" }}>
                Número do Veículo
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5", fontSize: "18px" }}>Data</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5", fontSize: "18px" }}>Hora</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5", fontSize: "18px" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPesagens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pesagem) => (
              <TableRow key={pesagem.id} hover>
                <TableCell>{pesagem.motorista}</TableCell>
                <TableCell>{pesagem.numeroVeiculo}</TableCell>
                <TableCell>{pesagem.data}</TableCell>
                <TableCell>{pesagem.hora}</TableCell>
                <TableCell>
                  <IconButton sx={{ color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton sx={{ color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}>
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
        boxShadow: theme.shadows[2],
        height: "200px", // Increased height for more square-like appearance
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: titleColor,
          fontWeight: "bold",
          fontSize: "24px", // Increased font size
          marginBottom: "12px", // Increased space between title and value
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: valueColor,
          fontWeight: "bold",
          fontSize: "48px", // Increased font size
        }}
      >
        {value}
      </Typography>
    </Card>
  )
}



