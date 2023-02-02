import TableComponent from '../components/TableComponent';
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {

  return (
    <div className='h-screen flex flex-col'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TableComponent />} />
          <Route path="/?rowid=:id" element={<TableComponent />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
