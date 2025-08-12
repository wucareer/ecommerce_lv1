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
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { supabase } from '../utils';

export default function Activities() {
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState({
    id: null,
    title: '',
    url: '',
    banner: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  // 获取活动列表
  const fetchActivities = async () => {
    try {
      const response = await supabase.functions.invoke('activity-crud', {
        method: 'POST',
        body: JSON.stringify({
          actionType: 'query'
        })
      });

      if (response.data) {
        setActivities(response.data);
      } else {
        setError('获取活动列表失败');
      }
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchActivities();
  }, []);

  // 保存活动
  const handleSaveActivity = async () => {
    try {
      // 验证必填项
      if (!currentActivity.title) {
        setError('活动标题不能为空');
        return;
      }

      const actionType = isEditing ? 'update' : 'create';
      const response = await supabase.functions.invoke('activity-crud', {
        method: 'POST',
        body: JSON.stringify({
          actionType,
          ...currentActivity
        })
      });
      if (response.data) {
        setSuccess(actionType === 'create' ? '活动创建成功' : '活动更新成功');
        fetchActivities();
        setOpen(false);
      } else {
        setError('保存活动失败');
      }
    } catch (err) {
      setError(err.message);
    }
  };



  // 打开新增/编辑对话框
  const handleOpenDialog = (activity = null) => {
    if (activity) {
      // 编辑模式
      setCurrentActivity({
        id: activity.id,
        title: activity.title,
        url: activity.url || '',
        banner: activity.banner || []
      });
      setIsEditing(true);
    } else {
      // 新增模式
      setCurrentActivity({
        id: null,
        title: '',
        url: '',
        banner: []
      });
      setIsEditing(false);
    }
    setImageFile(null);
    setOpen(true);
  };



  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('文件:', file);
      const fileName = `${Date.now()}_${file.name}`
      const filePath = `activities/${fileName}`
      const { data, error: uploadError } = await supabase.storage.from('eshop').upload(filePath, file)

      if (uploadError) {
        console.error('上传失败:', uploadError)
        return;
      }

      // 如果上传成功 获取url
      const { data: { publicUrl }, error: urlError } = await supabase.storage
        .from('eshop')
        .getPublicUrl(filePath);
      if (urlError) {
        console.log('获取url失败:', urlError)
        return;

      }

      setCurrentActivity(prev => ({
        ...prev,
        banner: [...prev.banner, publicUrl]
      })
      )
    }
  }


  // 删除活动
  const handleDeleteActivity = async (activityId) => {
    try {
      const response = await supabase.functions.invoke('activity-crud', {
        method: 'POST',
        body: JSON.stringify({
          actionType: 'delete',
          id: activityId
        })
      });

      if (response.data) {
        setSuccess('活动删除成功');
        fetchActivities();
      } else {
        setError('删除活动失败');
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
        <Typography variant="h4">活动管理</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          新增活动
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="活动列表">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>活动名称</TableCell>
              <TableCell>活动连接</TableCell>
              <TableCell>活动图片</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.id}</TableCell>
                <TableCell>{activity.title}</TableCell>
                <TableCell>
                  <a
                    href={activity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {activity.url}
                  </a>
                </TableCell>
                <TableCell>
                  {activity.banner && activity.banner.length > 0 && (
                    <img
                      src={activity.banner[0]}
                      alt={activity.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(activity)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteActivity(activity.id)}
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
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? '编辑活动' : '新增活动'}
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <TextField
              fullWidth
              label="活动名称"
              variant="outlined"
              value={currentActivity.title}
              onChange={(e) => setCurrentActivity(prev => ({
                ...prev,
                title: e.target.value
              }))}
              required
            />
            <TextField
              fullWidth
              label="活动连接"
              variant="outlined"
              value={currentActivity.url}
              onChange={(e) => setCurrentActivity(prev => ({
                ...prev,
                url: e.target.value
              }))}
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={handleImageUpload}
              />
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CloudUploadIcon />}
                className="mt-2"
                onClick={() => {
                  const input = document.getElementById('contained-button-file');
                  if (input) {
                    input.click();
                  }
                }}
              >
                上传图片
              </Button>
              {currentActivity.banner
                && currentActivity.banner.length > 0
                && currentActivity.banner.map(img => {
                  return <div className="mt-4 relative" key={img}>
                    <img
                      width={400}
                      src={img}
                      alt="活动图片"
                      className="max-w-full h-auto mx-auto rounded"
                    />
                    <IconButton
                      color="error"
                      size="small"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setCurrentActivity(prev => ({
                          ...prev,
                          banner: prev.banner.filter(item => item !== img)
                        }));
                      }}
                    >
                      <DeleteIcon />删除
                    </IconButton>
                  </div>
                })}
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
            onClick={handleSaveActivity}
          >
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 