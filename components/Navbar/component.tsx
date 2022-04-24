import { AppBar, Container, FormControl, ListItem, MenuItem, Select, SelectChangeEvent, Stack, Switch, Toolbar, Typography } from "@mui/material"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router";
import { useState } from "react";

export const Navbar = () => {
  const { t } = useTranslation("common");
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const handleChangeLocale = (event: SelectChangeEvent) => {
    router.push(router.pathname, router.pathname, {locale: event.target.value})
  }
  return (
    <AppBar>
      <Toolbar>
        <Container>
          <Stack direction="row" justifyContent="space-between" alignItems="center" >
            <Typography>{t("appName")}</Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center" >
            <FormControl variant="standard" >
              <Select
                value={router.locale}
                onChange={handleChangeLocale}
                sx={{borderRadius: '50px',px: 2,color: 'inherit'}}
              >
                <MenuItem value="ar">العربية</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </FormControl>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
