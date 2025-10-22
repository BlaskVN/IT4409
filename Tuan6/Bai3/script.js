const searchInput = document.getElementById('searchInput'); 
const searchBtn = document.getElementById('searchBtn'); 
const addProductBtn = document.getElementById('addProductBtn'); 
const addProductForm = document.getElementById('addProductForm'); 

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
// Sử dụng classList.toggle để bật/tắt class 'hidden' (hiển thị/ẩn form)
addProductBtn.addEventListener('click', function() {
    addProductForm.classList.toggle('hidden');
});
