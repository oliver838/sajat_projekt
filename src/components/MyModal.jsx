import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { useContext } from "react";
import { MyAcces } from "../context/MyContextProvider";
import { useState } from "react";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "#121212",
  color: "#fff",
  borderRadius: "16px",
  boxShadow: "0 0 40px rgba(0,0,0,0.8)",
  p: 4,
};

export const MyModal = () => {
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const {verifyKey,hasAcces} = useContext(MyAcces)
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{ setOpen(false)
    setPassword("")
  };
  const [password,setPassword] = useState("");
  
const handleLogin = async (e) => {
  e.preventDefault(); 
  await verifyKey(password);
};

  useEffect(()=>{handleClose()},[hasAcces])
  return (
    <>
      <Button
        variant="contained"
        startIcon={<FaSignInAlt />}
        onClick={handleOpen}
        sx={{
          bgcolor: "#1f1f1f",
          "&:hover": { bgcolor: "#333" },
        }}
      >
        Login
      </Button>

     <Modal open={open} onClose={handleClose}>
  <Box sx={style}>
    <Typography
      variant="h5"
      sx={{ mb: 3, textAlign: "center", fontWeight: 600 }}
    >
      Welcome Back
    </Typography>

    <form onSubmit={handleLogin}>
      <TextField
        fullWidth
        label="Key"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        InputLabelProps={{ style: { color: "#aaa" } }}
        InputProps={{
          style: { color: "#fff" },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                sx={{ color: "#aaa" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#333" },
            "&:hover fieldset": { borderColor: "#555" },
            "&.Mui-focused fieldset": { borderColor: "#90caf9" },
          },
        }}
      />

      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{
          mt: 3,
          py: 1.2,
          fontWeight: 600,
          bgcolor: "#90caf9",
          color: "#000",
          "&:hover": { bgcolor: "#64b5f6" },
        }}
      >
        Login
      </Button>
    </form>
  </Box>
</Modal>

    </>
  );
};
