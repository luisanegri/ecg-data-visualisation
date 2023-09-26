
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { useThemeToggle } from "../contexts/ThemeProvider";

const TopBar = () => {
    const { darkMode, toggleDarkMode } = useThemeToggle();

    return (
        <AppBar position="static">
            <Toolbar variant="regular">
                <Typography variant="h6" component="div">
                    Idoven.ai Coding Challenge
                </Typography>
                <Box flexGrow={1}></Box>
                <Button onClick={toggleDarkMode} color="inherit">
                    <Typography>
                        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </Typography>

                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar