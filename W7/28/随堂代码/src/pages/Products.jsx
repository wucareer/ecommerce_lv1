import React from 'react';
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
  Typography
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export default function Products() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">产品管理</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
        >
          新增产品
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>标题</TableCell>
              <TableCell>原价</TableCell>
              <TableCell>折扣价</TableCell>
              <TableCell>分类</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>示例产品</TableCell>
              <TableCell>100.00</TableCell>
              <TableCell>80.00</TableCell>
              <TableCell>1</TableCell>
              <TableCell>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* 新增/编辑对话框 */}
      <Dialog 
        open={false}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>新增产品</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextField
              label="标题"
              fullWidth
            />
            <TextField
              label="原价"
              type="number"
              fullWidth
            />
            <TextField
              label="折扣价"
              type="number"
              fullWidth
            />
            <TextField
              label="分类"
              type="number"
              fullWidth
            />
            <TextField
              label="图片链接"
              fullWidth
              className="col-span-2"
            />
            <TextField
              label="产品详情"
              fullWidth
              multiline
              rows={4}
              className="col-span-2"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="secondary">
            取消
          </Button>
          <Button 
            color="primary"
            variant="contained"
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}