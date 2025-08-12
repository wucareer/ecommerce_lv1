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
  Typography,
  IconButton,
  Chip,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { supabase } from '../utils';
import { useUserAccess } from '../hooks/useUserAccess';

export default function Keywords() {
  const [open, setOpen] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState({
    id: null,
    name: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading,list,check]= useUserAccess();

  const fetchKeywords = async () => {
    try {
      const response = await supabase.functions.invoke('keywords-crud', {
        method: 'POST',
        body: JSON.stringify({
          actionType: 'query'
        })
      });

      if (response.data) {
        setKeywords(response.data);
      } else {
        setError('获取关键词列表失败');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchKeywords();
  }, []);

  const hanldeOpenDialog = (keyword) => {
    if (keyword) {
      // edit mode
      setCurrentKeyword({
        ...keyword
      });
      setIsEditing(true);
    } else {
      // add mode
      setCurrentKeyword({
        id: null,
        name: ''
      });
      setIsEditing(false);
    }

    setOpen(true);
  }

  const hanldeSaveKeyword = async () => {
    try {
      const actionType = isEditing ? 'update' : 'create';
      debugger
      const response = await supabase.functions.invoke('keywords-crud', {
        method: 'POST',
        body: JSON.stringify({
          actionType,
          ...currentKeyword
        })
      });

      if (response.data) {
        // 提示保存成功
        setSuccess(actionType === 'create' ? '关键词创建成功' : '关键词更新成功');

        // 关闭弹窗
        setOpen(false);
        // 刷新 keywords
        fetchKeywords();

      } else {
        setError('保存关键词失败');
      }

    } catch (error) {
      setError(error.message);
    }

  }


  // 删除关键词
  const handleDeleteKeyword = async (keywordId) => {
    try {
      const response = await supabase.functions.invoke('keywords-crud', {
        method: 'POST',
        body: JSON.stringify({
          actionType: 'delete',
          id: keywordId
        })
      });

      if (response.data) {
        setSuccess('关键词删除成功');
        fetchKeywords();
      } else {
        setError('删除关键词失败');
      }
    } catch (err) {
      setError(err.message);
    }
  };

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
        <Typography variant="h4">关键词管理</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {hanldeOpenDialog()}}
        >
          新增关键词
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="关键词列表">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>关键词</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keywords.map((keyword) => (
              <TableRow key={keyword.id}>
                <TableCell>{keyword.id}</TableCell>
                <TableCell>{keyword.name}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <IconButton
                      color="primary"
                      onClick={() => { hanldeOpenDialog(keyword) }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => { check('KEYWORD-EDIT').then(() => {handleDeleteKeyword(keyword.id)}).catch(e=>{console.log(e);})}} 
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{isEditing ? '编辑关键词' : '新增关键词'}</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <TextField
              fullWidth
              label="关键词"
              variant="outlined"
              required
              value={currentKeyword.name}
              onChange={(e) => setCurrentKeyword(prev => ({
                ...prev,
                name: e.target.value
              }))}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            取消
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={()=>{check('KEYWORD-EDIT').then(() => {hanldeSaveKeyword()}).catch(() => {setOpen(false)})}}
          >
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
