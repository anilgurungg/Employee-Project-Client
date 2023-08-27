import { Container, Typography, Link } from "@mui/material"

function footer () {
    return( <footer style={{ 
        paddingTop: "20px" }}>
    <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary" align="center">
            &copy; {new Date().getFullYear()} Employee Project. All rights reserved.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
            Made with ❤️ by <Link color="inherit" href="https://github.com/anilgurungg">Anil Gurung</Link>
        </Typography>
    </Container>
</footer>);
}

export default footer;