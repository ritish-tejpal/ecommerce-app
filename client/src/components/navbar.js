import React, { useState } from 'react'
import { AppBar, IconButton, Toolbar, Typography, Stack, Button } from "@mui/material";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import {TextField} from '@mui/material';

const Navbar = () => {
  const [search, setSearch] = useState(false)
  const searchBar = () => {
    setSearch(!search);
  }

  return (
    <div className='nav'>
    <AppBar position="static">
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' href='/'>
          <LocalGroceryStoreIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
          E-Commerce Store
        </Typography>
        <Stack direction='row' spacing={1}>
          <Button color='inherit' variant='outlined' href='/login'>Login</Button>
          <Button color='inherit' variant='outlined' href='/signup'>Signup</Button>
          <Button color='inherit' variant='outlined' href='/products'>Products</Button>
          <IconButton size='large' edge='start' color='inherit' aria-label='logo' href='/accounts'>
            <AccountBoxIcon />
          </IconButton>
          <IconButton size='large' edge='start' color='inherit' aria-label='logo' href='/cart'>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={searchBar}>
            <SearchIcon />
          </IconButton>
          {search ? 
            <TextField 
              id='standard-ba'
              color='info'
              label='Search' 
              variant='outlined' 
              autoFocus={search}
              onSubmit={searchBar}
            /> : null}
        </Stack>
        
      </Toolbar>
    </AppBar>
</div>
  )
}

export default Navbar;