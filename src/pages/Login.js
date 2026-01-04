import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
// import { useLoginMutation } from "../features/auth/authApi";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

function Login() {
  //   const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (values) => {
    try {
      //   await login(values).unwrap();
    } catch (err) {}
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height:"100vh",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          p: 4,
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5, // 🔹 consistent spacing
                }}
              >
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  sx={{ "& .MuiInputBase-input": { height: "50px" } }}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  sx={{ "& .MuiInputBase-input": { height: "50px" } }}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Button
                  type="submit"
                  variant="contained"
                  className="btn"
                  size="large"
                  disabled={false}
                  sx={{
                    mt: 1,
                    height: 48,
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  {false ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}

export default Login;
