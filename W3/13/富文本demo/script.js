document.addEventListener('DOMContentLoaded', function() {
    // 配置Quill编辑器的工具栏选项
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // 文字格式
        ['blockquote', 'code-block'],                     // 引用和代码块
        [{ 'header': 1 }, { 'header': 2 }],               // 标题
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // 列表
        [{ 'script': 'sub'}, { 'script': 'super' }],      // 上标/下标
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
        [{ 'direction': 'rtl' }],                         // 文字方向
        [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],        // 标题级别
        [{ 'color': [] }, { 'background': [] }],          // 字体颜色和背景色
        [{ 'font': [] }],                                 // 字体
        [{ 'align': [] }],                                // 对齐方式
        ['clean'],                                         // 清除格式
        ['link', 'image', 'video']                         // 链接、图片和视频
    ];

    // 初始化Quill编辑器
    const quill = new Quill('#editor-container', {
        modules: {
            toolbar: {
                container: toolbarOptions,
                
            }
        },
        placeholder: '开始编辑内容...',
        theme: 'snow',  // 使用snow主题
    });

    // 图片上传处理函数
    function imageHandler() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        
        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                try {
                    // 显示上传中提示
                    const loadingMsg = document.createElement('div');
                    loadingMsg.textContent = '图片上传中...';
                    loadingMsg.style.position = 'fixed';
                    loadingMsg.style.top = '10px';
                    loadingMsg.style.right = '10px';
                    loadingMsg.style.padding = '10px';
                    loadingMsg.style.backgroundColor = '#f0f0f0';
                    loadingMsg.style.borderRadius = '4px';
                    loadingMsg.style.zIndex = '9999';
                    document.body.appendChild(loadingMsg);
                    
                    // 生成唯一文件名，避免文件名冲突
                    const timestamp = new Date().getTime();
                    const fileName = `${timestamp}_${file.name}`;
                    
                    // 上传到Supabase存储桶
                    const supabaseUrl = 'https://supabase.co/storage/v1/object/public/eshop';
                    const supabaseKey = '5681bff5e1728c472c12bef3b3b4d027';
                    
                    const formData = new FormData();
                    formData.append('file', file);
                    
                    const response = await fetch(`${supabaseUrl}/${fileName}`, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'apikey': supabaseKey,
                            'Authorization': `Bearer ${supabaseKey}`
                        }
                    });
                    
                    if (!response.ok) {
                        throw new Error('图片上传失败');
                    }
                    
                    const data = await response.json();
                    // 构建图片URL
                    const imageUrl = `${supabaseUrl}/${fileName}`;
                    
                    // 获取当前光标位置
                    const range = quill.getSelection(true);
                    
                    // 在光标位置插入图片
                    quill.insertEmbed(range.index, 'image', imageUrl);
                    // 将光标移动到图片后面
                    quill.setSelection(range.index + 1);
                    
                    // 移除上传提示
                    document.body.removeChild(loadingMsg);
                    
                } catch (error) {
                    console.error('上传图片时出错:', error);
                    alert('上传图片失败: ' + error.message);
                }
            }
        };
    }

    // 尝试从本地存储加载之前保存的内容
    const savedContent = localStorage.getItem('quillContent');
    if (savedContent) {
        quill.root.innerHTML = savedContent;
    }

    // 保存按钮点击事件
    document.getElementById('save-button').addEventListener('click', function() {
        const content = quill.root.innerHTML;
        localStorage.setItem('quillContent', content);
        
        // 显示保存的内容
        document.getElementById('content-output').innerHTML = `
            <h3>保存的内容：</h3>
            <div style="border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
                ${content}
            </div>
        `;
        
        alert('内容已保存！');
    });

    // 清空按钮点击事件
    document.getElementById('clear-button').addEventListener('click', function() {
        if (confirm('确定要清空编辑器内容吗？')) {
            quill.setText('');
            document.getElementById('content-output').innerHTML = '';
        }
    });

    // 自动保存功能（每30秒）
    setInterval(function() {
        const content = quill.root.innerHTML;
        localStorage.setItem('quillContent', content);
        console.log('内容已自动保存');
    }, 30000);
});

