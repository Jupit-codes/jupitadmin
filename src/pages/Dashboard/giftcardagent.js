import { reactLocalStorage } from 'reactjs-localstorage';
import { Grid, Container, Typography } from '@mui/material';

const Index = ()=>{

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
            Hi {reactLocalStorage.getObject('admin').username}!, Welcome back
            </Typography>
        </Container>
    )
}

export default Index;