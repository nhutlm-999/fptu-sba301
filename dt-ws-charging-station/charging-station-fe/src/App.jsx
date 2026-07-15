
import './App.css'
import { Routes, Route } from 'react-router-dom';
import ChargingSlotPage from "./pages/ChargingSlotPage.jsx";
import SlotDetail from "./pages/SlotDetails.jsx";

function App() {

  return (
    <>
        <Routes>

            <Route path={'/'} element={<ChargingSlotPage/>}></Route>
            <Route path={'/details/:id'} element={<SlotDetail/>}></Route>
            {/*<Route path={'/charging-slots'} element={<ChargingSlotPage/>}></Route>*/}
        </Routes>
    </>
  )
}

export default App
