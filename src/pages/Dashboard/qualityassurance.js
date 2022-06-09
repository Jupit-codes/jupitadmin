import { reactLocalStorage } from 'reactjs-localstorage';
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