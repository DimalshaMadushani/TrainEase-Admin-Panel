import { Button, Box, CssBaseline } from "@mui/material";
import BookingsLineChart from "./pages/BookingsLineChart";
import TrainBarChart from "./pages/TrainBarChart";
import RevenueChart from "./pages/RevenueChart";
import RegistrationPage from "./pages/UserRegistrationsChart";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <>
      {/* <BookingGraphPage /> */}
      {/* <TrainBarChart /> */}
      {/* <BookingRevenuePage /> */}
      {/* <RegistrationPage />   */}
      <CssBaseline>
      <AdminPage />
      </CssBaseline>
    </>
  );
}
