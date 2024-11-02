// Existing code for delete buttons
let deleteButtons = document.querySelectorAll('.deleteBtn');

deleteButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        let product = this.dataset.name;
        let productID = this.dataset.id;

        let response = confirm("Do you want to delete the product " + product + "?");

        if (response) {
            fetch('../products/deleteproduct.php?id=' + productID, {
                method: 'GET'
            })
                .then(response => response.text())
                .then(data => {
                    if (data === 'success') {
                        window.location.href = 'admin/products';
                    }
                });
        }
    });
});

// New code for file size validation
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-add-product');
    if (form) {
        form.addEventListener('submit', function (e) {
            const fileInput = document.getElementById('product_image');
            const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

            if (fileInput && fileInput.files.length > 0) {
                const fileSize = fileInput.files[0].size;
                if (fileSize > maxFileSize) {
                    e.preventDefault();
                    fileInput.classList.add('is-invalid');
                    const feedbackElement = fileInput.nextElementSibling;
                    if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                        feedbackElement.textContent = 'File size exceeds the maximum limit of 5MB.';
                    } else {
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'invalid-feedback';
                        errorDiv.textContent = 'File size exceeds the maximum limit of 5MB.';
                        fileInput.parentNode.insertBefore(errorDiv, fileInput.nextSibling);
                    }
                } else {
                    fileInput.classList.remove('is-invalid');
                    const feedbackElement = fileInput.nextElementSibling;
                    if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                        feedbackElement.textContent = '';
                    }
                }
            }
        });
    }
});