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
function EditMovie() {
  const [titlu, setTitlu] = useState('');
  const [categorie, setCategorie] = useState('');
  const [data,setData] = useState();
  const [rol,setRol] = useState('');
  const [nume,setNume]= useState();
  const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
  const categorii = ['horror', 'romance', 'comedy', 'action'];
  const roluri = ['DIRECTOR','WRITER'];
  useEffect(() => {
    const href = window.location.href;
    const id = href.split('/').at(-1);
    const fetchMovie = async () => {
      const res = await fetch(`${SERVER}/movies/${id}`);
      const data = await res.json();
      setTitlu(data.titlu);
      setCategorie(data.categorie);
    };
    fetchMovie();
  }, []);

  const handleSubmit = () => {
    const id = window.location.href.split('/').at(-1);
    fetch(`${SERVER}/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titlu: titlu,
        categorie: categorie,
        data:data
      }),
    })
      .then((res) => res.json())
      .then((data) => { // /register/movie/:MovieId/
        fetch(`${SERVER}/crewmembers/register/movie/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rol: rol,
            nume: nume
          }),
        }).then((res) => res.json())
          .then((data) => {
          }).catch((err) => { console.log(err); }
          );
        
        toast.success(`Film ${titlu} modificat cu succes!`)
      }).catch((e) => toast.error(`Modificare film ${titlu} esuata!`));
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
             Editeaza filmul
            </Typography>
            <Box
              component="form"
              noValidate
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
                value={titlu}
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
                value={categorie}
                label="categorie"
                renderInput={(params) => <TextField {...params} label="categorie" />}
                inputValue={categorie}
                onInputChange={(event, newInputValue) => {
                  setCategorie(newInputValue);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(e) => setData(e.target.value)}
                id="date"
                label="data"
                type="date"
                defaultValue="2022-01-01"
                autoComplete="data"
              />
               <TextField
                margin="normal"
                required
                fullWidth
                onChange={(e) => setNume(e.target.value)}
                id="nume"
                label="nume"
                type="nume"
                autoComplete="nume"
              />
               <Autocomplete
                disablePortal
                id="rol"
                options={roluri}
                margin="normal"
                required
                fullWidth
                name="rol"
                label="rol"
                renderInput={(params) => <TextField {...params} label="rol" />}
                inputValue={rol}
                onInputChange={(event, newInputValue) => {
                  setRol(newInputValue);
                }}
              />
              <Button
                fullWidth
                type="button"
                variant="contained" color="success"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Salveaza
              </Button>
              <Button
                fullWidth
                type='button'
                variant="outlined" color="error"
                sx={{ mt: 3, mb: 2 }}
                onClick={
                  () => window.location.href = `/`
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

export default EditMovie;