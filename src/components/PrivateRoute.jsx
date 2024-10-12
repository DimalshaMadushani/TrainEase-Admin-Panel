import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUpAdmin, deleteAdmin } from "../redux/admin/adminSlice";
import { TailSpin } from "react-loader-spinner";
import { Box } from "@mui/material";

export default function PrivateRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();

  // This make sure that if there is a cookie the redux torage is updated to the logged in user, otherwise the redux storage is cleared
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get(
          "https://trainease-backend.onrender.com/api/admin/getProfile",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        dispatch(setUpAdmin(response.data));
      } catch (error) {
        setIsAuthenticated(false);
        dispatch(deleteAdmin());
      }
    }
    checkAuth();
  }, [dispatch]);

  if (isAuthenticated === null) {
    return (
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </Box>
    );
  }

  return isAuthenticated ? <Outlet replace /> : <Navigate to="/" replace />;
}
