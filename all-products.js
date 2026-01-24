document.addEventListener('DOMContentLoaded', () => {
    
    let allProductsData = []; // Store fetched data here

    // 1. Fetch Data
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            allProductsData = products;
            
            // Render everything initially
            generateFilterButtons(products);
            renderGrid(products); 
        })
        .catch(err => console.error('Error:', err));


    // 2. Generate Filter Buttons Dynamically
    function generateFilterButtons(products) {
        const filterContainer = document.getElementById('filter-container');
        
        // Extract unique categories (e.g., "Living Room", "Office")
        // The 'Set' object automatically removes duplicates
        const categories = ['All', ...new Set(products.map(p => p.category))];

        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.textContent = category;
            btn.classList.add('filter-btn');
            
            // Set 'All' as active by default
            if (category === 'All') btn.classList.add('active');

            // Add Click Event
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Filter Logic
                filterProducts(category);
            });

            filterContainer.appendChild(btn);
        });
    }


    // 3. Filter Logic
    function filterProducts(category) {
        if (category === 'All') {
            renderGrid(allProductsData);
        } else {
            // Filter the array based on the category string
            const filtered = allProductsData.filter(product => product.category === category);
            renderGrid(filtered);
        }
    }


    // 4. Render Grid (Reusing card design)
    function renderGrid(products) {
        const grid = document.getElementById('all-products-grid');
        grid.innerHTML = ''; // Clear existing content

        if (products.length === 0) {
            grid.innerHTML = '<h3 style="grid-column: 1/-1; text-align:center;">No products found in this category.</h3>';
            return;
        }

        products.forEach(product => {
            const cardHTML = `
                <div class="product-card">
                    <div class="product-img-wrapper">
                        <img src="${product.main_image}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        <span class="product-cat">${product.category}</span>
                        <h3 class="product-title">${product.title}</h3>
                        <a href="product-details.html?id=${product.id}" class="product-btn">Know More</a>
                    </div>
                </div>
            `;
            grid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }
});