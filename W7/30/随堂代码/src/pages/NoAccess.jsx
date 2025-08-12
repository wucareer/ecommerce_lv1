import React from 'react'
import { Box, Alert} from '@mui/material'
export default function NoAccess(){

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Alert variant="filled" severity="warning">
        你没有这个页面的权限！请联系管理员！
      </Alert>
    </Box>
    )
}