import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MenuIcon from '@mui/icons-material/Menu';
export default function Dashboard() {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-screen flex">


      <Box sx={{
        display: 'flex',
        width: '100%',
      }}>
        {
          open&&<Box sx={{ width: 260, height: '100vh', borderRight: '1px solid #e5e5e5' }}>
          <div className="h-16 bg-gray-100 flex items-center justify-center">
            电商管理系统
          </div>
          <List>

            <ListItem >
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>

            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <AlternateEmailIcon />
                </ListItemIcon>
                <ListItemText primary="dfsdfs" />
              </ListItemButton>
            </ListItem>

          </List>
        </Box>
        }
        <Box sx={{flexGrow: 1}}>

          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setOpen(!open)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                电商管理系统
              </Typography>

            </Toolbar>
          </AppBar>
          <Outlet />
        </Box>

       


      </Box>





    </div>
  );
}