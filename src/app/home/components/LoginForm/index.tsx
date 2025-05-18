"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { SignInContainer } from "./styles/Login.styles";

import ColorModeSelect from "@/app/styles/ColorModeSelect";
const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "3 letters min for username" })
    .regex(/^([a-z\\-]+)$/i, {
      message: "only lowercase letters and hyphens are allowed",
    })
    .transform((username) => username.toLowerCase()),
  password: z.string().min(6, { message: "6 letters min for password" }),
});
type LoginFormData = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleLoginSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Box padding={4}>
          <ColorModeSelect
            sx={{ position: "fixed", top: "1rem", right: "1rem" }}
          />

          <Typography
            component="h1"
            variant="h4"
            mb={2}
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleLoginSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errors.username ? "error" : "primary"}
                {...register("username", { required: true })}
                error={errors.username ? true : false}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                {...register("password", { required: true })}
                color={errors.password ? "error" : "primary"}
                error={errors.password ? true : false}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
          </Box>
          {/* <Divider>or</Divider> */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </SignInContainer>
    // </Box>
  );
};
