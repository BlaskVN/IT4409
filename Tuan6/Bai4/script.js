const searchInput = document.getElementById('searchInput'); 
const searchBtn = document.getElementById('searchBtn'); 
const addProductBtn = document.getElementById('addProductBtn'); 
const addProductForm = document.getElementById('addProductForm'); 
const cancelBtn = document.getElementById('cancelBtn');
const errorMsg = document.getElementById('errorMsg');

// Lấy tham chiếu tới các phần tử trong DOM bằng id
searchBtn.addEventListener('click', function() {
    // Lấy từ khóa và chuyển về chữ thường để so sánh không phân biệt hoa thường rồi 
    // lấy danh sách tất cả các phần tử sản phẩm (mỗi sản phẩm có class 'product-item')
    // Duyệt qua từng sản phẩm và ẩn/hiện dựa trên tên sản phẩm có chứa từ khóa hay không

    const keyword = searchInput.value.toLowerCase();
    const products = document.querySelectorAll('.product-item');
    
    products.forEach(function(product) {
        const productName = product.querySelector('.product-name'); 
        const name = productName.textContent.toLowerCase();
        
        // Nếu tên chứa từ khóa thì hiển thị, ngược lại ẩn đi
        if (name.includes(keyword)) {
            product.style.display = ''; 
        } else {
            product.style.display = 'none'; 
        }
    });
});

// Xử lý sự kiện khi người dùng nhấn nút "Thêm sản phẩm"
addProductBtn.addEventListener('click', function() {
    addProductForm.classList.toggle('hidden');
});

// Xử lý sự kiện khi người dùng nhấn nút "Hủy"
// Ẩn form và reset nội dung
cancelBtn.addEventListener('click', function() {
    addProductForm.classList.add('hidden');
    addProductForm.reset();
    errorMsg.textContent = '';
});

// Xử lý sự kiện submit của form thêm sản phẩm
addProductForm.addEventListener('submit', function(event) {
    // Ngăn chặn hành vi mặc định của form (tránh reload trang)
    event.preventDefault();
    
    // Lấy giá trị từ các trường input và loại bỏ khoảng trắng thừa
    const name = document.getElementById('newName').value.trim();
    const image = document.getElementById('newImage').value.trim();
    const price = document.getElementById('newPrice').value.trim();
    const desc = document.getElementById('newDesc').value.trim();
    
    // Validate dữ liệu
    if (name === '') {
        errorMsg.textContent = 'Vui lòng nhập tên sản phẩm!';
        return;
    }
    
    if (price === '' || isNaN(price) || Number(price) <= 0) {
        errorMsg.textContent = 'Vui lòng nhập giá hợp lệ (số lớn hơn 0)!';
        return;
    }
    
    errorMsg.textContent = '';
    
    const newItem = document.createElement('article');
    newItem.className = 'product-item';
    
    // Sử dụng template string để tạo nội dung HTML cho sản phẩm mới
    // Bao gồm hình ảnh (nếu có), tên sản phẩm (với class product-name để tương thích với chức năng tìm kiếm),
    // mô tả và giá
    // Nếu có link hình ảnh thì thêm thẻ img, nếu không thì bỏ qua
    newItem.innerHTML = `
        ${image ? `<img src="${image}" alt="${name}">` : ''}
        <h3 class="product-name">${name}</h3>
        <p>${desc}</p>
        <p class="price">${price}đ</p>
    `;
    
    // Chèn sản phẩm mới vào đầu danh sách
    const productList = document.getElementById('product-list');
    productList.prepend(newItem);
    
    // Reset form và ẩn form sau khi thêm thành công
    addProductForm.reset();
    addProductForm.classList.add('hidden');
});
