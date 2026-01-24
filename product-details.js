document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Get the Product ID from the URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id')); // Convert string "101" to number 101

    if (!productId) {
        window.location.href = 'index.html'; // Redirect if no ID found
    }

    // 2. Fetch Data
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // Find the specific product
            const product = products.find(p => p.id === productId);

            if (product) {
                renderProductDetails(product);
            } else {
                document.querySelector('.details-container').innerHTML = '<h2>Product not found</h2>';
            }
        })
        .catch(err => console.error('Error:', err));


    // 3. Render Function
    function renderProductDetails(product) {
        
        // --- Fill Text Content ---
        document.title = `${product.title} | Kladz Furniture`;
        document.getElementById('bread-category').textContent = product.category;
        document.getElementById('bread-title').textContent = product.title;
        
        document.getElementById('detail-category').textContent = product.category;
        document.getElementById('detail-title').textContent = product.title;
        document.getElementById('detail-price').textContent = `$${product.price.toLocaleString()}`; // Adds comma (1,299)
        document.getElementById('detail-desc').textContent = product.description;

        // --- Handle Images ---
        const mainImg = document.getElementById('main-img');
        const thumbContainer = document.getElementById('thumbnail-container');

        // Set Initial Main Image
        mainImg.src = product.main_image;

        // Create Array of ALL images (Main + Subs) to loop through
        const allImages = [product.main_image, ...product.sub_images];

        // Generate Thumbnails
        allImages.forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.classList.add('thumb');
            if (index === 0) thumb.classList.add('active'); // First one active

            // Click Event to Swap Image
            thumb.addEventListener('click', () => {
                // Change Main Image
                mainImg.src = imgSrc;
                
                // Update Active Class
                document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });

            thumbContainer.appendChild(thumb);
        });

        // --- Handle Features (Loop through the object) ---
        const featureList = document.getElementById('feature-list');
        
        // Loop through keys like "size", "color"
        for (const [key, value] of Object.entries(product.features)) {
            const li = document.createElement('li');
            // Capitalize first letter of key (e.g., "size" -> "Size")
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            
            li.innerHTML = `<strong>${label}:</strong> ${value}`;
            featureList.appendChild(li);
        }
    }
});