import { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AbcIcon from '@mui/icons-material/Abc';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Autocomplete } from '@mui/material';
const theme = createTheme();
function AddMovies (){
  const [titlu, setTitlu] = useState('');
  const [categorie, setCategorie] = useState('');
  const [data,setData] = useState();
  const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

  const categorii = ['horror', 'romance', 'comedy', 'action'];
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data)
        fetch(`${SERVER}/movies`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            titlu: titlu, 
            categorie: categorie,
            data:data
           }),
        })
          .then((res) => res.json())
          .then((data)=>{
            toast.success(`Film ${titlu} adaugat cu succes!`)
          }).catch((e)=>toast.error(`Adaugare film ${titlu} esuata!`));
      };
    return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={2.5}
      
      />
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AbcIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Adauga un film
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
                margin="normal"
                required
                fullWidth
                id="titlu"
                label="titlu"
                name="titlu"
                autoComplete="titlu"
                onChange={(e) => setTitlu(e.target.value)}
              />
               <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categorii}
                margin="normal"
                required
                fullWidth
                name="categorie"
                label="categorie"
                renderInput={(params) => <TextField {...params} label="categorie" />}
                onInputChange={(event, newInputValue) => {
                  setCategorie(newInputValue);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="date"
                onChange={(e) => setData(e.target.value)}
                label="data"
                type="date"
                defaultValue="2022-01-01"
                autoComplete="date"
              />
            <Button
              fullWidth
             type="submit"
             variant="contained" color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Adauga
            </Button>
            <Button
              fullWidth
            type='button'
            variant="outlined" color="error"
              sx={{ mt: 3, mb: 2 }}
              onClick = {
                  ()=>  window.location.href = `/`
              }
            >
              Inapoi
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
    )
}

export default AddMovies;