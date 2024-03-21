import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'normalize.css'
import './index.css'
import Title from './components/Title';
import DataTable from './components/Table';
import FieldAddNewData from './components/FieldAddNewData';


function App() {
  return (
    <main style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '50px', justifyContent: 'center' }}>
      <Title />
      <FieldAddNewData />
      <DataTable />
    </main>
  )
}

export default App

