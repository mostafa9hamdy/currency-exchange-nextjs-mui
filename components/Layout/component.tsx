import { Container, Paper } from "@mui/material";
import { Navbar } from "components/Navbar";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { locale } = useRouter();
  return (
    <Paper
      sx={{ direction: locale === "ar" ? "rtl" : "ltr", minHeight: "100vh" }}
    >
      <Navbar />
      <Container sx={{ pt: 4 }}>{children}</Container>
    </Paper>
  );
};
