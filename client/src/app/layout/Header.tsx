import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar sx={{ marginBottom: 4 }} position="static">
            <Toolbar>
                <Typography variant="h6">
                    RE-STORE
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
