import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon
} from '@mui/icons-material';
import { supabase } from '../utils';
import { set } from 'react-hook-form';

// 权限配置
const PERMISSIONS = {
  userManagement: {
    name: '用户管理',
    permissions: [
      { key: 'USER-VIEW', label: '查看' },
      { key: 'USER-EDIT', label: '编辑' }
    ]
  },
  productManagement: {
    name: '产品管理',
    permissions: [
      { key: 'PRODUCT-VIEW', label: '查看' },
      { key: 'PRODUCT-EDIT', label: '编辑' }
    ]
  },
  categoryManagement: {
    name: '分类管理',
    permissions: [
      { key: 'CATEGORY-VIEW', label: '查看' },
      { key: 'CATEGORY-EDIT', label: '编辑' }
    ]
  },
  keywordManagement: {
    name: '关键词管理',
    permissions: [
      { key: 'KEYWORD-VIEW', label: '查看' },
      { key: 'KEYWORD-EDIT', label: '编辑' }
    ]
  },
  activityManagement: {
    name: '活动管理',
    permissions: [
      { key: 'ACTIVITY-VIEW', label: '查看' },
      { key: 'ACTIVITY-EDIT', label: '编辑' }
    ]
  }
};

// 角色默认权限
const ROLE_PERMISSIONS = {
  admin: [
    'USER-VIEW', 'USER-EDIT',
    'PRODUCT-VIEW', 'PRODUCT-EDIT',
    'CATEGORY-VIEW', 'CATEGORY-EDIT',
    'KEYWORD-VIEW', 'KEYWORD-EDIT',
    'ACTIVITY-VIEW', 'ACTIVITY-EDIT'
  ],
  operator: [
    'PRODUCT-VIEW', 'PRODUCT-EDIT'
  ],
  marketing: [
    'CATEGORY-VIEW', 'CATEGORY-EDIT',
    'KEYWORD-VIEW', 'KEYWORD-EDIT',
    'ACTIVITY-VIEW', 'ACTIVITY-EDIT'
  ]
};

export default function Users() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: '',
    email: '',
    role: '',
    access: []
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 角色列表
  const ROLES = [
    { key: 'admin', label: '管理员' },
    { key: 'operator', label: '运营' },
    { key: 'marketing', label: '营销' }
  ];

  // 获取用户列表
  const fetchUsers = async () => {
    try {
      // 直接从 user_expansion 表获取所有用户信息
      const { data: users, error: usersError } = await supabase
        .from('user_expansion')
        .select('userId, email, name, access');

      if (usersError) throw usersError;

      // 处理用户数据
      const formattedUsers = users.map(user => ({
        id: user.userId,
        email: user.email,
        name: user.name,
        access: user.access || []
      }));
      setUsers(formattedUsers);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);


  const handleOpenDialog = (user) => {
    setCurrentUser({
      ...user,
    });

    setOpen(true);
  }

  const handlePermisstionChange = (permission, checked) => {
    setCurrentUser(prev => {
      const newAccess = checked ? [...prev.access, permission] : prev.access.filter(p => p !== permission);
      return {
        ...prev,
        access: newAccess
      }
    })
  }



  const handleSaveUser = async () => {
    try {
      const { data, error } = await supabase
        .from('user_expansion')
        .update({
          access: currentUser.access
        })
        .eq('userId', currentUser.id)
        .select();

      if (error) throw error;
      setSuccess('用户权限更新成功');
      setOpen(false);
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  const hasPermission = (permissionKey,user ) => {
    return user?user.access.includes(permissionKey):currentUser.access.includes(permissionKey);
  };

  const hasRole=(role,user)=>{
    const rolePermissions = ROLE_PERMISSIONS[role];
    return rolePermissions.every(permissionKey => hasPermission(permissionKey,user));

  }


  const handleRoleChange = (role, checked) => {
    const rolePermissions = ROLE_PERMISSIONS[role] || [];
    let prevAccess = currentUser.access;
    if(checked){
      rolePermissions.forEach(permissionKey => {
        if (!prevAccess.includes(permissionKey)) {
          prevAccess.push(permissionKey);
        }
      })
    }else{

      prevAccess= prevAccess.filter(permissionKey => !rolePermissions.includes(permissionKey))

    }

    setCurrentUser({
      ...currentUser,
      access: prevAccess
    })
  }

  return (
    <div className="p-4">
      {error && (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          className="mb-4"
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess(null)}
          className="mb-4"
        >
          {success}
        </Alert>
      )}

      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">用户管理</Typography>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="用户列表">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>用户名</TableCell>
              <TableCell>邮箱</TableCell>
              <TableCell>权限</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell><div className='flex'>
                  {hasRole('admin',user) && <div className='text-xs text-green-500 bg-green-100 rounded-full px-2 py-1 mr-2'>管理员</div>}
                  {hasRole('operator',user) && <div className='text-xs text-green-500 bg-blue-100 rounded-full px-2 py-1 mr-2'>运营</div>}
                  {hasRole('marketing',user)&&<div className='text-xs text-green-500 bg-yellow-100 rounded-full px-2 py-1 mr-2'>营销</div>}
                </div></TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleOpenDialog(user)
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>编辑用户权限</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <Typography variant="subtitle1">
              用户名：{currentUser.name}
            </Typography>
            <Typography variant="subtitle1">
              邮箱：{currentUser.email}
            </Typography>

            <Divider className="my-4" />

            <Typography variant="h6" className="mb-2">用户角色</Typography>
            <div className="grid grid-cols-1 gap-2 border rounded p-4">
              <FormGroup row>
                {ROLES.map(({ key, label }) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        onChange={(event) => {
                          handleRoleChange(key, event.target.checked)
                        }}
                        checked={hasRole(key)}
                      />
                    }
                    label={label}
                  />
                ))}
              </FormGroup>
            </div>

            <Divider className="my-4" />

            <Typography variant="h6" className="mb-2">权限设置</Typography>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(PERMISSIONS).map(([module, { name, permissions }]) => (
                <div key={module} className="border rounded p-4">
                  <Typography variant="subtitle1" className="mb-2">{name}</Typography>
                  <FormGroup row>
                    {permissions.map(({ key, label }) => (
                      <FormControlLabel
                        key={key}
                        control={
                          <Checkbox
                            checked = { hasPermission(key) }
                            onChange={(event) => {
                             
                              handlePermisstionChange(key, event.target.checked)

                            }}
                          />
                        }
                        label={label}
                      />
                    ))}
                  </FormGroup>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
             取消
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveUser}
          >
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 