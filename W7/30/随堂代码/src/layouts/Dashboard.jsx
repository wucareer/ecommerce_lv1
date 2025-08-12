import React, { useState } from "react";
import { Outlet, useLocation,useNavigate } from "react-router-dom";
import { Box, Alert, CircularProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MenuIcon from '@mui/icons-material/Menu';
import { useUserAccess } from "../hooks/useUserAccess";


const accessMap = new Map()
accessMap.set('USER-VIEW',"/users")
accessMap.set('ACTIVITY-VIEW',"/activities")
accessMap.set('CATEGORY-VIEW',"/categories")
accessMap.set('KEYWORD-VIEW',"/keywords")
accessMap.set('PRODUCT-VIEW',"/products")

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [loading, accessList] = useUserAccess();
  const location = useLocation()
  const navigate = useNavigate()


  console.log(accessList)


  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  }



  let combinedAccessPath = [];
  accessList.forEach(item => {
    if(accessMap.get(item)){
      combinedAccessPath.push(accessMap.get(item))
    }
   
  })
  combinedAccessPath.push('/noAccess')
  console.log('权限页面：',combinedAccessPath)
  if (!combinedAccessPath.includes(location.pathname)) {
    navigate('/noAccess') 
  }


  return (
    <div className="h-screen flex">

      <Box sx={{
        display: 'flex',
        width: '100%',
      }}>
        {
          open && <Box sx={{ width: 260, height: '100vh', borderRight: '1px solid #e5e5e5' }}>
            <div className="h-16 bg-gray-100 flex items-center justify-center">
              电商管理系统
            </div>
            <List>

              <ListItem >
                <ListItemButton onClick={() => {navigate('/products')}}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="商品管理" />
                </ListItemButton>

              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => {navigate('/categories')}}>
                  <ListItemIcon>
                    <AlternateEmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="分类管理" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => {navigate('/users')}}>
                  <ListItemIcon>
                    <AlternateEmailIcon />                  
                  </ListItemIcon>
                  <ListItemText primary="用户管理" />
                </ListItemButton>
              </ListItem>
              
              <ListItem>
                <ListItemButton onClick={() => {navigate('/activities')}}>
                  <ListItemIcon>
                    <AlternateEmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="促销管理" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => {navigate('/keywords')}}>
                  <ListItemIcon>
                    <AlternateEmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="关键词管理" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        }
        <Box sx={{ flexGrow: 1 }}>

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