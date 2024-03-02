import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Display = (props) => {
  return (
    <Card sx={{ }}>
      <CardMedia
        component="img"
        height="140"
        image="https://picsum.photos/seed/picsum/200/300"
        alt="green iguana"
        sx={{ width: "100%"}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={'/products/'+props.name}>Buy</Button>
      </CardActions>
    </Card>
  )
}

export default Display
