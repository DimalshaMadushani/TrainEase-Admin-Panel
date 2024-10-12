// import { Button, Box, CssBaseline } from "@mui/material";
// import BookingsLineChart from "./pages/BookingsLineChart";
// import TrainBarChart from "./pages/TrainBarChart";
// import RevenueChart from "./pages/RevenueChart";
// import RegistrationPage from "./pages/UserRegistrationsChart";
// import AdminPage from "./pages/AdminPage";
// import Login from "./pages/LoginPage";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// export default function App() {
//   return (
//     <>
//       {/* <BookingGraphPage />
//       {/* <TrainBarChart /> */}
//       {/* <BookingRevenuePage /> */}
//       {/* <RegistrationPage />   */}
//       {/* <CssBaseline> */}
//       {/* <AdminPage /> */}
//       {/* </CssBaseline>  */}
//       <BrowserRouter>
//         <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//         <CssBaseline/>
//         <Box sx={{ flex: "1 0 auto", backgroundColor: "rosybrown" }}></Box>
//           <Routes>
//             <Route path="/login" element={<Login />} />

//             {/* <Route  element={<PrivateRoute />} >
//               <Route path="/admin-page" element={<AdminPage />} />
//             </Route> */}
//             <Route path="/admin-page" element={<AdminPage />} />
//           </Routes>
//           </Box>
//       </BrowserRouter>
//       </Box>
//       </>
//   );
// }

import { Button, Box, CssBaseline } from "@mui/material";
import BookingsLineChart from "./pages/BookingsLineChart";
import TrainBarChart from "./pages/TrainBarChart";
import RevenueChart from "./pages/RevenueChart";
import RegistrationPage from "./pages/UserRegistrationsChart";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <CssBaseline />
          <Box sx={{ flex: "1 0 auto", backgroundColor: "#F4F6F6" }}>
            {/* Routes should be placed within a single Box if they need to be styled or structured */}
            <Routes>
              <Route path="/" element={<Login />} />
              {/* <Route element={<PrivateRoute />}> */}
                <Route path="/admin-page" element={<AdminPage />} />
              {/* </Route> */}
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </>
  );
}
