import React, { useState, useEffect, useCallback } from 'react';
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
  TextField,
  InputAdornment,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  OutlinedInput,
  Divider,
  Grid
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  AddPhotoAlternate as AddPhotoIcon
} from '@mui/icons-material';
import { supabase } from '../utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
// 自定义图片处理模块
const ImageHandler = {
  upload: async (file) => {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `products/editor/${fileName}`;
      const { data, error: uploadError } = await supabase.storage
        .from('eshop')
        .upload(filePath, file);

      if (uploadError) throw uploadError;
      const { data: { publicUrl }, error: urlError } = await supabase.storage
        .from('eshop')
        .getPublicUrl(filePath);
      if (urlError) throw urlError;
      return publicUrl;
    } catch (error) {
      console.error('图片上传失败:', error);
      throw error;
    }
  }
};

// Quill 编辑器配置
const modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
    handlers: {
      image: function () {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click()
        input.onchange = async () => {
          const file = input.files[0];
          try {
            const url = await ImageHandler.upload(file);

            const range = this.quill.getSelection();
            this.quill.insertEmbed(range.index, 'image', url);

          } catch (error) {
            console.log(error);
          }

        }
      }
    }
  }
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'list', 'bullet',
  'align',
  'link', 'image'
];

export default function Products() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    price: '',
    stock: '',
    category: [],
    detail: '',
    images: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .functions.invoke('category-crud', {
          method: 'POST',
          body: {
            actionType: 'query',
            query_type: 'flat'// nested
          }
        });

      if (error) throw error;
      setCategories(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // 获取商品列表
  const fetchProducts = async () => {
    try {
      const response = await supabase.functions.invoke('product-crud', {
        method: 'POST',
        body: JSON.stringify({
          actionType: 'query'
        })
      });

      if (response.data) {
        setProducts(response.data);
      } else {
        setError('获取商品列表失败');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleOpenDialog = (product = null) => {
    if (product) {
      setCurrentProduct({
        ...product,
        category: product.category || [],
        images: product.images || [],
        detail: product.detail || ''
      });
      setIsEditing(true);
    } else {
      setCurrentProduct({
        id: null,
        title: '',
        price: '',
        stock: '',
        category: [],
        detail: '',
        images: []
      });
      setIsEditing(false);
    }
    setOpen(true);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `products/${fileName}`;
      const { data, error: uploadError } = await supabase.storage
        .from('eshop')
        .upload(filePath, file);

      if (uploadError) {
        setError('图片上传失败');
        return;
      }

      const { data: { publicUrl }, error: urlError } = await supabase.storage
        .from('eshop')
        .getPublicUrl(filePath);

      if (urlError) {
        setError('获取图片URL失败');
        return;
      }

      setCurrentProduct(prev => ({
        ...prev,
        images: [...prev.images, publicUrl]
      }));
    }
  };

  const handleSaveProduct = async () => {
    try {
      const actionType = isEditing ? 'update' : 'create';

      const { data, error } = await supabase
        .functions.invoke('product-crud', {
          method: 'POST',
          body: {
            actionType,
            ...(isEditing && { id: currentProduct.id }),
            title: currentProduct.title,
            price: parseFloat(currentProduct.price),
            stock: currentProduct.stock,
            category: currentProduct.category,
            images: currentProduct.images,
            detail: currentProduct.detail
          }
        });

      if (error) throw error;

      setSuccess(`产品${isEditing ? '更新' : '创建'}成功`);
      setOpen(false);
      fetchProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('确定要删除这个产品吗？')) return;

    try {
      const { error } = await supabase
        .functions.invoke('product-crud', {
          method: 'POST',
          body: {
            actionType: 'delete',
            id
          }
        });

      if (error) throw error;

      setSuccess('产品删除成功');
      fetchProducts();
    } catch (error) {
      setError(error.message);
    }
  };


  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setCurrentProduct(prev => ({
      ...prev,
      category: value
    }));
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
        <Typography variant="h4">商品管理</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          新增商品
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="商品列表">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>商品名称</TableCell>
              <TableCell>价格</TableCell>
              <TableCell>库存</TableCell>
              <TableCell>分类</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>¥{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  {product.category?.map((catId) => {
                    const category = categories.find(c => c.id === catId);
                    return category ? (
                      <Chip
                        key={catId}
                        label={category.title}
                        size="small"
                        className="mr-1"
                      />
                    ) : null;
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(product)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteProduct(product.id)}
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
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? '编辑产品' : '添加产品'}
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {/* 左侧表单 */}
              <div className="space-y-4">
                <TextField
                  fullWidth
                  label="产品名称"
                  value={currentProduct.title}
                  onChange={(e) => setCurrentProduct(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                />
                <TextField
                  fullWidth
                  label="价格"
                  type="number"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct(prev => ({
                    ...prev,
                    price: e.target.value
                  }))}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">¥</InputAdornment>
                  }}
                />
                <TextField
                  fullWidth
                  label="库存"
                  type="number"
                  value={currentProduct.stock}
                  onChange={(e) => setCurrentProduct(prev => ({
                    ...prev,
                    stock: e.target.value
                  }))}
                />
                <FormControl fullWidth>
                  <InputLabel id="category-select-label">分类</InputLabel>
                  <Select
                    labelId="category-select-label"
                    multiple
                    onChange={handleCategoryChange}
                    value={currentProduct.category}
                    input={<OutlinedInput label="分类" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const category = categories.find(c => c.id === value);
                          return (
                            <Chip
                              key={value}
                              label={category?.title || value}
                              size="small"
                            />
                          );
                        })}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.type === 2 ?
                          <div className='pl-4'>└{category.title}</div> :
                          <div className='font-bold'>{category.title}</div>}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* 右侧图片上传 */}
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="product-image-upload"
                    type="file"
                    onChange={handleImageUpload}
                  />
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.images?.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`产品图片 ${index + 1}`}
                          className="w-[100px] h-[100px] object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center">
                          <IconButton
                            color="error"
                            size="small"
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            onClick={() => {
                              setCurrentProduct(prev => ({
                                ...prev,
                                images: prev.images.filter((_, i) => i !== index)
                              }));
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outlined"
                      color="primary"
                      className="w-[100px] h-[100px] flex items-center justify-center border-2 border-dashed"
                      onClick={() => {
                        const input = document.getElementById('product-image-upload');
                        if (input) {
                          input.click();
                        }
                      }}
                    >
                      <AddPhotoIcon fontSize="large" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Divider className="my-4" />

            {/* 富文本编辑器 */}
            <div className="h-[300px]">
              <ReactQuill
                theme="snow"
                value={currentProduct.detail}
                onChange={(content) => setCurrentProduct(prev => ({
                  ...prev,
                  detail: content
                }))}
                modules={modules}
                className="h-[250px]"
              />
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
            onClick={handleSaveProduct}
          >
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}