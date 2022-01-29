import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Home() {
  const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
  const [movies, setMovies] = useState([]);
  const [crew,setCrew] = useState([]);
  const fetchMovies = async () => {
    const res = await fetch(`${SERVER}/movies/`);
    const data = await res.json();
    setMovies(data);
    console.log(data)
  };
  const fetchCrew = async () => {
    const res = await fetch(`${SERVER}/crewmembers/all`);
    const data = await res.json();
    setCrew(data);
    console.log(data)
  };
  useEffect(() => {
      fetchMovies();
      fetchCrew();
  }, []);

  const deleteMovie = (key) => {
    fetch(`${SERVER}/movies/${key}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        fetchMovies();
        fetchCrew();
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {`Pagina ta de filme`}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Bine ai venit! Gestioneaza filmele.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="md">
          <Grid container spacing={4}>
            {movies.map((materie,i) => (
              <Grid item key={materie.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    (window.location.href = `/editmovie/${materie.id}`)
                  }
                >
                  <CardMedia
                    component="img"
                    image="./movie.jpg"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{ textAlign: 'center' }}
                    >
                   {materie.id} - {materie.titlu}
                    </Typography>
                  </CardContent>
                </Card>
                <Button
                    onClick={()=>{deleteMovie(movies[i].id)}}
                    >Sterge</Button>
              </Grid>
            ))}
              {crew.map((crewMember,i) => (
              <Grid item key={crewMember.id} xs={4} sm={2} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <CardMedia
                    component="img"
                    image="./person.png"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{ textAlign: 'center' }}
                    >
                     {crewMember.rol} {crewMember.nume} - {crewMember.MovieId}
                    </Typography>
                  </CardContent>
                </Card>

              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
