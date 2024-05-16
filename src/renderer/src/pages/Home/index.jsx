import { Alert, Box } from "@mui/material"
import FormAddRequest from "../../components/FormAddRequest"
import { useEffect, useState } from "react"
import RequestTable from "../../components/RequestTable"

export default function Home() {

  const [requestRegisteredSuccessfully, setRequestRegisteredSuccessfully] = useState(undefined)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRequestRegisteredSuccessfully(null)
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [requestRegisteredSuccessfully])

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '50px', justifyContent: 'center' }}>
      {
        requestRegisteredSuccessfully === true ? (
          <Alert severity="success">Requisição cadastrada com sucesso.</Alert>
        ) : requestRegisteredSuccessfully === false ? (
          <Alert severity="warning">Já existe uma bateria com esse código cadastrado, por favor tente novamente.</Alert>
        ) : null
      }
      <FormAddRequest requestRegisteredSuccessfully={value => setRequestRegisteredSuccessfully(value)} />
      <RequestTable />
    </Box>
  )
}