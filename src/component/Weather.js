import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Card, CardActionArea, CardContent, CardMedia, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
import WindPowerIcon from '@mui/icons-material/WindPower';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

function Weather() {
     const [weather, setWeather] = useState(null)
     const [cityName, setCityName] = useState('Pune')

    function kelvinToCelsius(kelvin) {
        return (kelvin - 273.15).toFixed(2);
      }

    function convertTOKM(windSpeedInMetersPerSecond){
      const windSpeedInKilometersPerHour = windSpeedInMetersPerSecond * 3.6;
      return windSpeedInKilometersPerHour.toFixed(2)
    }

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=35c413588a906f164fa7447fac4052d4`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchData();
    }, [cityName]);

    if (!weather) {
        return <div>Loading...</div>;
    }
    
    const ChangeCityName = (event) => {
        setCityName(event.target.value)
    }

    
  return (    
    <Grid item xs={12} style={{justifyContent:'center', transform:'translateY(25%)'}}>
        <Grid item xs={12} style={{marginBottom:'1rem', color:'white', fontSize:'2rem', fontWeight:'bold'}}>Weather App</Grid>
         <Grid style={{display:'flex', justifyContent:'center'}}> 
         <Card sx={{ minidth: '30%' }} style={{minWidth:'25%', background:'#12c2e9',background: '-webkit-linear-gradient(to right, #12c2e9, #c471ed, #f64f59);',background: 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)'}}>
      <CardActionArea>
       <TextField
        style={{backgroundColor:'white', minWidth:300, marginTop:'2rem', borderRadius:'10px', marginBottom:'1rem', margin:'1rem'}}
        id="outlined-basic"
        variant="outlined"
        size='small'
        value={cityName}
        onChange={ChangeCityName}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
      />
        <CardContent>
          <Grid item xs={12}>
          {weather.weather[0].description === 'clear sky'?<WbSunnyIcon style={{ fontSize: '8rem', color:'white', marginBottom:'1rem' }} />: 
          <>
          {weather.weather[0].description === 'few clouds'?<>
          <WbCloudyIcon style={{ fontSize: '8rem', color:'white' }} />
          </>:<>
           {weather.weather[0].description === 'haze'?<>
           <ThunderstormIcon style={{ fontSize: '8rem', color:'white' }} />
           </>:<>
           <CloudQueueIcon style={{ fontSize: '8rem', color:'white' }} />
           </>}         
          </>}
          </>}
            <Typography style={{color:'white', fontSize:'1rem'}}>{weather.weather[0].description}</Typography>
            </Grid>
          <Typography variant="body2" color="text.secondary" style={{color:'white', fontSize:'4rem'}}>
          {`${kelvinToCelsius(weather?.main?.temp)}\u00B0C`}
          </Typography>
          <Typography style={{color:'white', fontSize:'2rem'}}>
            {weather.name.length <=3 ? "Not a valid City name":weather.name}
          </Typography>
          <Grid style={{display:'flex', justifyContent:'space-between', paddingBottom:'1rem', paddingTop:'1.5rem'}}>
          <Grid item xs={6}>
            <Grid item xs={12} style={{display:'flex', justifyContent:'space-evenly'}}>
            <Typography><WindPowerIcon style={{color:'white'}}/></Typography>
              <Typography variant="body2" color="text.secondary" style={{color:'white', fontSize:'1.2rem'}}>
              {`${weather?.main?.humidity}%`}
              </Typography>
             
            </Grid>
            <Typography style={{color:'white'}}>Humidity</Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12} style={{display:'flex', justifyContent:'space-evenly'}}>
              <Typography><AirIcon style={{color:'white'}}/></Typography>
              <Typography variant="body2" color="text.secondary" style={{color:'white', fontSize:'1.2rem'}}>
                {`${convertTOKM(weather.wind.speed)}km/h`}
              </Typography>
              
            </Grid>
            <Typography style={{color:'white'}}>Wind Speed</Typography>
          </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
        </Card>
         </Grid>
    </Grid>
  )
}

export default Weather