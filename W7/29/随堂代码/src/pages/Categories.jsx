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
  TextField,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Collapse,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon
} from '@mui/icons-material';
import { supabase } from '../utils';


export default function Categories() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesOpen, setCategoriesOpen] = useState({});
  const [open, setOpen] = useState(false);
  // //1 新增一级 2新增二级 3编辑一级 4编辑二级
  const [editMode, setEditMode] = useState(1);
  const [parentCategory, setParentCategory] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false)


  const handleEdit = (mode, category = null, childCategory = null) => {
    setEditMode(mode);
    if (mode === 1) {

    } else if (mode === 2) {
      setParentCategory(category)
    } else if (mode === 3) {
      setCurrentCategory(category)
    } else if (mode === 4) {
      setCurrentCategory(childCategory)
      setParentCategory(category)
    }

    setOpen(true);
  }


  useEffect(() => {
    // 获取分类列表
    const fetchCategories = async () => {
      try {
        const response = await supabase.functions.invoke('category-crud', {
          method: 'POST',
          body: JSON.stringify({
            actionType: 'query',
            query_type: 'nested'
          })
        });

        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [forceUpdate]);


  const handleClose = () => {
    setOpen(false);
    setCurrentCategory(null)
    setParentCategory(null)
    setEditMode(null)
  }



  // 保存分类
  const handleSaveCategory = async () => {
    try {
      const actionType = (editMode === 1 || editMode === 2) ? 'create' : 'update';
      const parent_id = (editMode === 2 || editMode === 4) ? parentCategory.id : null;
      const response = await supabase.functions.invoke('category-crud', {
        method: 'POST',
        body: JSON.stringify({
          id: currentCategory?.id,
          actionType,
          title: currentCategory?.title,
          name: currentCategory?.name,
          type: (editMode === 1 || editMode === 3) ? 1 : 2,
          parent_id,

        })
      });

      if (response.data) {
        setSuccess(actionType === 'create' ? '分类创建成功' : '分类更新成功');
        setForceUpdate(!forceUpdate)
        setOpen(false);
      } else {
        setError('保存分类失败');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // 删除分类
  const handleDelete = async (category) => {
    try {
      const response = await supabase.functions.invoke('category-crud', {
        method: 'POST',
        body: JSON.stringify({
          actionType: 'delete',
          id: category.id
        })
      });

      if (response.data) {
        setSuccess('分类删除成功');
        setForceUpdate(!forceUpdate);
      } else {
        setError('删除分类失败');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      {
        success && <Alert severity="success" onClose={() => setSuccess(null)}>{success}</Alert>
      }
      {
        error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
      }
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">分类管理</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => { handleEdit(1) }}
        >
          新增一级分类
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>展示</TableCell>
              <TableCell>id</TableCell>
              <TableCell >标题</TableCell>
              <TableCell >名称</TableCell>
              <TableCell >类型</TableCell>
              <TableCell >操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <>
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ width: 80 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setCategoriesOpen({ ...categoriesOpen, [row.id]: !categoriesOpen[row.id] })}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type === 1 ? '一级分类' : '二级分类'}</TableCell>
                  <TableCell >
                    <Button onClick={() => handleEdit(3, row)} variant="contained" color="primary" startIcon={<EditIcon />}>编辑</Button>
                    <Button onClick={() => handleDelete(row)} variant="contained" color="error" startIcon={<DeleteIcon />}>删除</Button>
                    <Button onClick={() => handleEdit(2, row)} variant="contained" color="success" startIcon={<AddIcon />}>添加子分类</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: 0, backgroundColor: '#f9f7f7' }} colSpan={6}>

                    <Collapse in={
                      !!categoriesOpen[row.id]} >
                      <Table sx={{ minWidth: 650, border: 'none' }} aria-label="simple table" >
                        <TableBody>
                          {row.children?.map((childRow) => (

                            <TableRow
                              key={childRow.name}
                            >
                              <TableCell sx={{ width: 80 }}></TableCell>
                              <TableCell>{childRow.id}</TableCell>
                              <TableCell >{childRow.title}</TableCell>
                              <TableCell >{childRow.name}</TableCell>
                              <TableCell >{childRow.type === 1 ? '一级分类' : '二级分类'}</TableCell>
                              <TableCell >
                                <Button onClick={() => handleEdit(4, row, childRow)} variant="contained" color="primary" startIcon={<EditIcon />}>编辑</Button>
                                <Button onClick={() => handleDelete(childRow)} variant="contained" color="error" startIcon={<DeleteIcon />}>删除</Button>

                              </TableCell>
                            </TableRow>

                          ))}
                        </TableBody >
                      </Table>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>

            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {editMode === 1 ? '新增一级分类' : ''}
          {editMode === 2 ? '新增二级分类' : ''}
          {editMode === 3 ? '编辑一级分类' : ''}
          {editMode === 4 ? '编辑二级分类' : ''}
        </DialogTitle>
        <DialogContent>
          {editMode === 2 || editMode === 4 ? <div>
            父级：{parentCategory.title}
          </div> : null}
          <div className='mt-4'>
            <TextField
              fullWidth
              label="标题"
              id="fullWidth"
              value={currentCategory?.title || ''}
              onChange={(e) => { setCurrentCategory({ ...currentCategory, title: e.target.value }) }}
            />

          </div>
          <div className='mt-4'>
            <TextField
              fullWidth
              label="名称"
              id="fullWidth"
              onChange={(e) => { setCurrentCategory({ ...currentCategory, name: e.target.value }) }}
              value={currentCategory?.name || ''} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSaveCategory} autoFocus>
            提交
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}