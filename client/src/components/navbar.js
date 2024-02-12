import React from 'react'
import { Routes, Route} from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography, Stack, Button } from "@mui/material";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Login from '../Login';
import Signup from '../Signup';

export const navbar = () => {
  return (
    <div>
    <AppBar position="static">
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' href='/'>
          <LocalGroceryStoreIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
          E-Commerce Store
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button color='inherit' variant='outlined' href='/login'>Login</Button>
          <Button color='inherit' variant='outlined' href='/signup'>Signup</Button>
          <Button color='inherit' variant='outlined' href='/products'>Products</Button>
          <IconButton size='large' edge='start' color='inherit' aria-label='logo' href='/accounts'>
            <AccountBoxIcon />
          </IconButton>
          <IconButton size='large' edge='start' color='inherit' aria-label='logo' href='/cart'>
            <ShoppingCartIcon />
          </IconButton>
        
        </Stack>
      </Toolbar>
    </AppBar>

    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    {/* <Route path="/products" element={<Products />} /> */}
    </Routes>
</div>
  )
}

export default navbar
