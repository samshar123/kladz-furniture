document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Define the Fetch Function
    fetch('slides.json')
        .then(response => response.json())
        .then(data => {
            generateCarousel(data); // Build HTML
            initSliderLogic();      // Start Animation
        })
        .catch(error => console.error('Error loading slides:', error));

    
    // 2. Function to Generate HTML from JSON
    function generateCarousel(slidesData) {
        const slidesContainer = document.getElementById('slides-container');
        const dotsContainer = document.getElementById('dots-container');

        slidesData.forEach((slide, index) => {
            // Set the first slide to active
            const activeClass = index === 0 ? 'active' : '';

            // Create Slide HTML
            const slideHTML = `
                <div class="slide ${activeClass}">
                    <img src="${slide.image}" alt="${slide.title}" class="slide-bg">
                    <div class="slide-content">
                        <div class="brand-tag">
                            <span class="logo-icon">K</span> KLADZ FURNITURE
                        </div>
                        <h1 class="slide-title">${slide.title}</h1>
                        <p class="slide-desc">${slide.description}</p>
                        <button class="btn-primary">Know More</button>
                    </div>
                </div>
            `;
            
            // Append Slide to Container
            slidesContainer.insertAdjacentHTML('beforeend', slideHTML);

            // Create Dot HTML
            const dotHTML = `<span class="dot ${activeClass}" data-index="${index}"></span>`;
            
            // Append Dot to Container
            dotsContainer.insertAdjacentHTML('beforeend', dotHTML);
        });
    }


    // 3. Function to Run Slider Logic (Moved from previous version)
    function initSliderLogic() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        let currentSlide = 0;
        const slideInterval = 5000;
        let autoSlide;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            if (index >= slides.length) currentSlide = 0;
            else if (index < 0) currentSlide = slides.length - 1;
            else currentSlide = index;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Event Listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });

        dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                showSlide(index);
                resetTimer();
            });
        });

        function startTimer() {
            autoSlide = setInterval(nextSlide, slideInterval);
        }

        function resetTimer() {
            clearInterval(autoSlide);
            startTimer();
        }

        // Start
        startTimer();
    }
});

// Products section

// --- PRODUCT FETCHING LOGIC ---

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            renderProducts(products);
        })
        .catch(error => console.error('Error loading products:', error));

    function renderProducts(products) {
        const productContainer = document.getElementById('product-container');
        
        // 1. Sort by Priority (Low number = High priority)
        // 2. Slice to get only Top 5
        const topProducts = products
            .sort((a, b) => a.priority - b.priority)
            .slice(0, 5);

        topProducts.forEach(product => {
            
            // Create Card HTML
            const productCard = `
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

            productContainer.insertAdjacentHTML('beforeend', productCard);
        });
    }