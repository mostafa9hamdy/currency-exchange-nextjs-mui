import {
  AppBar,
  useTheme,
  Container,
  FormControl,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMode } from "context/themecontext";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";

export const Navbar = () => {
  const { t } = useTranslation("common");
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const { toggleThemeMode } = useMode();
  const theme = useTheme();
  const handleChangeLocale = (event: SelectChangeEvent) => {
    router.push(router.pathname, router.pathname, {
      locale: event.target.value,
    });
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>{t("appName")}</Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControl variant="standard">
                <Select
                  value={router.locale}
                  onChange={handleChangeLocale}
                  sx={{ borderRadius: "50px", px: 2, color: "inherit" }}
                >
                  <MenuItem value="ar">العربية</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="ru">Русский</MenuItem>
                </Select>
              </FormControl>
              <Switch
                checked={theme.palette.mode === "dark" ? true : false}
                onChange={() => toggleThemeMode()}
              />
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
