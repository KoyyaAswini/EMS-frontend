
import './App.css'
import EmployeeComponent from './components/EmployeeComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {


  return (
    <>
      <HeaderComponent />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListEmployeeComponent />}></Route>
          <Route path='/ems' element={<ListEmployeeComponent />}></Route>
          <Route path='/add-employee' element={<EmployeeComponent />}></Route>
          <Route path='/edit-employee/:id' element={<EmployeeComponent />}></Route>
        </Routes>
      </BrowserRouter>


      <FooterComponent />
    </>
  );
}

export default App;
