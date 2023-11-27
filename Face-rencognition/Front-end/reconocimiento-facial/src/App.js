import './css/App.css';
import EntryExitMonitorLog from './components/EntryExitMonitorLog';
import Employee_registration from './components/Employee_registration';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route } from 'react-router-dom'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<EntryExitMonitorLog/>} />
          <Route path="/login" element={<EntryExitMonitorLog/>} />  
          <Route path="/register" element={<Employee_registration/>} />
        </Routes>
      </Router>
    </>
  )


}

export default App;
