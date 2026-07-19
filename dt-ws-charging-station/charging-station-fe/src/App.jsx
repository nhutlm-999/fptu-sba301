import './App.css'
import { Routes, Route } from 'react-router-dom';
import ChargingSlotPage from "./pages/ChargingSlotPage.jsx";
import SlotDetail from "./pages/SlotDetails.jsx";
import AddSlotPage from "./pages/AddSlotPage.jsx";
import DeleteSlotPage from "./pages/DeleteSlotPage.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path={'/'} element={<ChargingSlotPage/>}></Route>
            <Route path={'/details/:id'} element={<SlotDetail/>}></Route>
            <Route path={'/delete/:id'} element={<DeleteSlotPage/>}></Route>
            <Route path={'/add-new-slot'} element={<AddSlotPage/>}></Route>
        </Routes>
    </>
  )
}

export default App
