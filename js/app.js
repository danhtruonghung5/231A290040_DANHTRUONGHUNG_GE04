// Quản lý trạng thái ứng dụng
const appState = {
    movies: [],
    filteredMovies: [],
    currentSort: 'newest',
    searchTerm: '',
    selectedGenre: '', // Lưu thể loại đã chọn (chỉ 1 thể loại)
    minRating: 0
};

// DOM Elements
const elements = {
    movieGrid: document.getElementById('movieGrid'),
    loading: document.getElementById('loading'),
    noResults: document.getElementById('noResults'),
    movieCount: document.getElementById('movieCount'),
    searchInput: document.getElementById('searchInput'),
    globalSearch: document.getElementById('globalSearch'),
    clearSearch: document.getElementById('clearSearch'),
    genreFilter: document.getElementById('genreFilter'),
    ratingFilter: document.getElementById('ratingFilter'),
    sortButtons: document.querySelectorAll('.sort-btn'),
    toggleTheme: document.getElementById('toggleTheme'),
    // Modal elements
    movieModal: document.getElementById('movieModal'),
    modalClose: document.getElementById('modalClose'),
    modalPoster: document.getElementById('modalPoster'),
    modalTitle: document.getElementById('modalTitle'),
    modalYear: document.getElementById('modalYear'),
    modalGenre: document.getElementById('modalGenre'),
    modalRating: document.getElementById('modalRating'),
    modalDirector: document.getElementById('modalDirector'),
    modalCast: document.getElementById('modalCast'),
    modalDuration: document.getElementById('modalDuration'),
    modalDescription: document.getElementById('modalDescription'),
    modalWatchBtn: document.getElementById('modalWatchBtn'),
    modalTrailerBtn: document.getElementById('modalTrailerBtn')
};

// Khởi tạo ứng dụng
function init() {
    // Tạo danh sách thể loại
    createGenreCheckboxes();
    
    // Gán sự kiện
    setupEventListeners();
    
    // Tải dữ liệu ban đầu
    loadMovies();
    
    // Thêm hiệu ứng trang trí
    setupDecorativeEffects();
}

// Thiết lập hiệu ứng trang trí hiện đại
function setupDecorativeEffects() {
    // Hiệu ứng typing cho tiêu đề
    typeWriterEffect();
    
    // Hiệu ứng parallax cho background
    setupParallaxEffect();
    
    // Hiệu ứng hover cho các nút
    setupButtonEffects();
    
    // Hiệu ứng loading mượt mà
    setupSmoothLoading();
}

// Hiệu ứng typing cho tiêu đề
function typeWriterEffect() {
    const title = document.querySelector('.logo-text');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
                // Thêm hiệu ứng nhấp nháy
                title.style.animation = 'blink 2s infinite';
            }
        }, 100);
    }
}

// Hiệu ứng parallax cho background
function setupParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });
    });
}

// Hiệu ứng hover cho các nút
function setupButtonEffects() {
    const buttons = document.querySelectorAll('button, .card-btn, .sort-btn, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Hiệu ứng loading mượt mà
function setupSmoothLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        // Thêm hiệu ứng shimmer cho loading
        loading.style.background = 'linear-gradient(90deg, #1e293b, #334155, #1e293b)';
        loading.style.backgroundSize = '200% 100%';
        loading.style.animation = 'shimmer 2s infinite';
    }
}

// Hiệu ứng hover cho movie cards
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.movie-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Tạo hiệu ứng ánh sáng
            const light = document.createElement('div');
            light.style.position = 'absolute';
            light.style.top = '0';
            light.style.left = '0';
            light.style.width = '100%';
            light.style.height = '100%';
            light.style.background = 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(167, 139, 250, 0.1))';
            light.style.pointerEvents = 'none';
            light.style.transition = 'opacity 0.3s';
            
            card.appendChild(light);
            
            setTimeout(() => {
                light.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                light.remove();
            }, 2000);
        });
    });
}

// Thêm CSS animation cho các hiệu ứng
function addDecorativeAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        
        @keyframes neonGlow {
            0%, 100% { 
                box-shadow: 0 0 5px var(--primary-color), 0 0 10px var(--primary-color), 0 0 15px var(--primary-color);
            }
            50% { 
                box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color), 0 0 30px var(--primary-color);
            }
        }
        
        .movie-card:hover {
            animation: neonGlow 2s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Tạo các radio button thể loại (chỉ chọn 1)
function createGenreCheckboxes() {
    const genreContainer = document.getElementById('genreCheckboxes');
    genreContainer.innerHTML = '';
    
    // Lấy danh sách thể loại duy nhất từ dữ liệu phim
    const uniqueGenres = [...new Set(movies.map(movie => movie.genre))];
    
    // Thêm tùy chọn "Tất cả"
    const allWrapper = document.createElement('div');
    allWrapper.className = 'genre-checkbox';
    
    const allRadio = document.createElement('input');
    allRadio.type = 'radio';
    allRadio.name = 'genreFilter';
    allRadio.id = 'genre-all';
    allRadio.value = '';
    allRadio.checked = true; // Mặc định chọn tất cả
    allRadio.addEventListener('change', handleGenreFilter);
    
    const allLabel = document.createElement('label');
    allLabel.htmlFor = 'genre-all';
    allLabel.textContent = 'Tất cả';
    
    allWrapper.appendChild(allRadio);
    allWrapper.appendChild(allLabel);
    genreContainer.appendChild(allWrapper);
    
    // Thêm các thể loại
    uniqueGenres.forEach(genre => {
        const radioWrapper = document.createElement('div');
        radioWrapper.className = 'genre-checkbox';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'genreFilter';
        radio.id = `genre-${genre}`;
        radio.value = genre;
        radio.addEventListener('change', handleGenreFilter);
        
        const label = document.createElement('label');
        label.htmlFor = `genre-${genre}`;
        label.textContent = genre;
        
        radioWrapper.appendChild(radio);
        radioWrapper.appendChild(label);
        genreContainer.appendChild(radioWrapper);
    });
}

// Thiết lập các sự kiện
function setupEventListeners() {
    // Tìm kiếm với debounce
    elements.searchInput.addEventListener('input', debounce((e) => {
        appState.searchTerm = e.target.value.toLowerCase();
        filterAndSort();
    }, 300));
    
    elements.globalSearch.addEventListener('input', debounce((e) => {
        appState.searchTerm = e.target.value.toLowerCase();
        filterAndSort();
    }, 300));
    
    elements.clearSearch.addEventListener('click', () => {
        elements.globalSearch.value = '';
        appState.searchTerm = '';
        filterAndSort();
    });
    
    // Lọc đánh giá
    elements.ratingFilter.addEventListener('change', (e) => {
        appState.minRating = parseInt(e.target.value);
        filterAndSort();
    });
    
    // Sắp xếp
    elements.sortButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Cập nhật trạng thái nút
            elements.sortButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            appState.currentSort = btn.dataset.sort;
            filterAndSort();
        });
    });
    
    // Bộ lọc đặc biệt: Phim hay, Hot, Mới
    setupSpecialFilters();
    
    // Theme toggle
    elements.toggleTheme.addEventListener('click', toggleTheme);
}

// Tải danh sách phim
function loadMovies() {
    showLoading();
    
    // Giả lập tải dữ liệu (có thể thay thế bằng API thực tế)
    setTimeout(() => {
        appState.movies = [...movies];
        filterAndSort();
        hideLoading();
    }, 1000);
}

// Lọc và sắp xếp phim (cập nhật để hỗ trợ radio button thể loại)
function filterAndSort() {
    let filtered = [...appState.movies];
    
    // Lọc theo tìm kiếm
    if (appState.searchTerm) {
        filtered = filtered.filter(movie => 
            movie.title.toLowerCase().includes(appState.searchTerm) ||
            movie.description.toLowerCase().includes(appState.searchTerm)
        );
    }
    
    // Lọc theo thể loại (radio button)
    if (appState.selectedGenre) {
        filtered = filtered.filter(movie => movie.genre === appState.selectedGenre);
    }
    
    // Lọc theo đánh giá
    if (appState.minRating > 0) {
        filtered = filtered.filter(movie => movie.rating >= appState.minRating);
    }
    
    // Sắp xếp
    filtered.sort((a, b) => {
        switch (appState.currentSort) {
            case 'newest':
                return b.year - a.year;
            case 'rating':
                return b.rating - a.rating;
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });
    
    appState.filteredMovies = filtered;
    renderMovies();
    updateStats();
}

// Hiển thị danh sách phim
function renderMovies() {
    const grid = elements.movieGrid;
    grid.innerHTML = '';
    
    if (appState.filteredMovies.length === 0) {
        showNoResults();
        return;
    }
    
    appState.filteredMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        grid.appendChild(movieCard);
    });
}

// Tạo thẻ phim
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    card.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-meta">
                <span class="rating">⭐ ${movie.rating}</span>
                <span class="genre">${movie.genre}</span>
            </div>
            <p class="movie-desc">${movie.description}</p>
            <div class="card-actions">
                <button class="card-btn btn-watch" onclick="watchMovie(${movie.id})">
                    <i class="fas fa-play"></i> Xem phim
                </button>
                <button class="card-btn btn-trailer" onclick="watchTrailer('${movie.trailer}')">
                    <i class="fas fa-video"></i> Trailer
                </button>
            </div>
        </div>
    `;
    
    // Hiệu ứng hover
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
    
    // Mở modal khi click vào thẻ phim
    card.addEventListener('click', (e) => {
        // Ngăn chặn sự kiện nổi bọt nếu click vào các nút con
        if (e.target.closest('.card-btn')) {
            return;
        }
        openMovieModal(movie);
    });
    
    return card;
}

// Hiển thị thông báo không có kết quả
function showNoResults() {
    elements.noResults.style.display = 'block';
    elements.movieGrid.style.display = 'none';
}

// Ẩn thông báo không có kết quả
function hideNoResults() {
    elements.noResults.style.display = 'none';
    elements.movieGrid.style.display = 'grid';
}

// Hiển thị loading
function showLoading() {
    elements.loading.style.display = 'flex';
}

// Ẩn loading
function hideLoading() {
    elements.loading.style.display = 'none';
}

// Cập nhật thống kê
function updateStats() {
    const count = appState.filteredMovies.length;
    elements.movieCount.textContent = `${count} phim`;
    
    if (count === 0) {
        showNoResults();
    } else {
        hideNoResults();
    }
}

// Chuyển đổi theme
function toggleTheme() {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
        elements.toggleTheme.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        elements.toggleTheme.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Khôi phục theme từ localStorage
function restoreTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        elements.toggleTheme.textContent = '☀️';
    } else {
        document.body.classList.remove('dark');
        elements.toggleTheme.textContent = '🌙';
    }
}

// Xem phim (mô phỏng)
function watchMovie(movieId) {
    const movie = appState.movies.find(m => m.id === movieId);
    alert(`🎬 Đang chuẩn bị phát phim: ${movie.title}\n\nĐây là chức năng demo. Trong thực tế, bạn sẽ chuyển hướng đến trang xem phim.`);
}

// Xem trailer
function watchTrailer(trailerUrl) {
    window.open(trailerUrl, '_blank');
}

// Hàm debounce để tối ưu hiệu năng tìm kiếm
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Xử lý lọc thể loại (radio button)
function handleGenreFilter() {
    const selectedRadio = document.querySelector('#genreCheckboxes input[type="radio"]:checked');
    
    // Cập nhật trạng thái ứng dụng
    if (selectedRadio) {
        appState.selectedGenre = selectedRadio.value;
    } else {
        appState.selectedGenre = '';
    }
    
    filterAndSort();
}

// Mở modal chi tiết phim
function openMovieModal(movie) {
    // Cập nhật nội dung modal
    elements.modalPoster.src = movie.image;
    elements.modalPoster.alt = movie.title;
    elements.modalTitle.textContent = movie.title;
    elements.modalYear.textContent = movie.year;
    elements.modalGenre.textContent = movie.genre;
    elements.modalRating.textContent = `⭐ ${movie.rating}`;
    elements.modalDirector.textContent = movie.director;
    elements.modalCast.textContent = movie.cast.join(', ');
    elements.modalDuration.textContent = movie.duration;
    elements.modalDescription.textContent = movie.description;
    
    // Cập nhật hành động nút
    elements.modalWatchBtn.onclick = () => watchMovie(movie.id);
    elements.modalTrailerBtn.onclick = () => watchTrailer(movie.trailer);
    
    // Hiển thị modal
    elements.movieModal.classList.add('active');
    // Thay vì chặn cuộn, chỉ chặn cuộn nền khi modal mở
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
}

// Đóng modal
function closeMovieModal() {
    elements.movieModal.classList.remove('active');
    // Khôi phục cuộn khi đóng modal
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    document.body.style.width = 'auto';
}

// Thiết lập các sự kiện cho modal
function setupModalEvents() {
    // Đóng khi click nút đóng
    elements.modalClose.addEventListener('click', closeMovieModal);
    
    // Đóng khi click ngoài modal
    elements.movieModal.addEventListener('click', (e) => {
        if (e.target === elements.movieModal) {
            closeMovieModal();
        }
    });
    
    // Đóng khi nhấn ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.movieModal.classList.contains('active')) {
            closeMovieModal();
        }
    });
}

// Thiết lập các bộ lọc đặc biệt: Phim hay, Hot, Mới
function setupSpecialFilters() {
    // Lấy các nút bộ lọc đặc biệt
    const specialButtons = document.querySelectorAll('.special-filter-btn');
    
    specialButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Cập nhật trạng thái nút
            specialButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Xóa các bộ lọc khác
            appState.searchTerm = '';
            elements.globalSearch.value = '';
            appState.selectedGenre = '';
            appState.minRating = 0;
            
            // Đặt lại các checkbox/radio
            const checkboxes = document.querySelectorAll('#genreCheckboxes input[type="radio"]');
            checkboxes.forEach(cb => cb.checked = false);
            document.getElementById('genre-all').checked = true;
            
            const ratingSelect = document.getElementById('ratingFilter');
            ratingSelect.value = '0';
            
            // Áp dụng bộ lọc đặc biệt
            applySpecialFilter(btn.dataset.filter);
        });
    });
}

// Áp dụng bộ lọc đặc biệt
function applySpecialFilter(filterType) {
    let filtered = [...appState.movies];
    
    switch (filterType) {
        case 'hot':
            // Phim hot: rating cao + lượt xem cao (giả lập bằng rating)
            filtered = filtered.filter(movie => movie.rating >= 8.0);
            filtered.sort((a, b) => {
                // Ưu tiên rating cao, sau đó là năm mới
                if (b.rating !== a.rating) return b.rating - a.rating;
                return b.year - a.year;
            });
            break;
            
        case 'best':
            // Phim hay: rating rất cao
            filtered = filtered.filter(movie => movie.rating >= 8.5);
            filtered.sort((a, b) => {
                // Ưu tiên rating cao nhất
                return b.rating - a.rating;
            });
            break;
            
        case 'new':
            // Phim mới: năm sản xuất mới nhất
            filtered.sort((a, b) => b.year - a.year);
            // Chỉ lấy 20 phim mới nhất để tăng hiệu năng
            filtered = filtered.slice(0, 20);
            break;
            
        default:
            // Mặc định: tất cả phim, sắp xếp theo mặc định
            filtered.sort((a, b) => b.year - a.year);
    }
    
    appState.filteredMovies = filtered;
    renderMovies();
    updateStats();
    
    // Cập nhật tiêu đề
    updateFilterTitle(filterType);
}

// Cập nhật tiêu đề theo bộ lọc
function updateFilterTitle(filterType) {
    const title = document.querySelector('.section-title');
    const subtitle = document.querySelector('.section-subtitle');
    
    switch (filterType) {
        case 'hot':
            title.textContent = '🔥 Phim Hot';
            subtitle.textContent = 'Những bộ phim đang được xem nhiều nhất';
            break;
        case 'best':
            title.textContent = '⭐ Phim Hay';
            subtitle.textContent = 'Những bộ phim có đánh giá cao nhất';
            break;
        case 'new':
            title.textContent = '🆕 Phim Mới';
            subtitle.textContent = 'Những bộ phim mới nhất';
            break;
        default:
            title.textContent = '🎬 Thư Viện Phim';
            subtitle.textContent = 'Khám phá thế giới điện ảnh';
    }
}

// Khởi chạy ứng dụng
document.addEventListener('DOMContentLoaded', () => {
    restoreTheme();
    setupModalEvents(); // Thêm sự kiện modal
    init();
});

// Cập nhật chức năng toggle theme để hoạt động tốt hơn
function toggleTheme() {
    const body = document.body;
    const toggleBtn = document.getElementById('toggleTheme');
    
    if (body.classList.contains('dark')) {
        // Chuyển sang light theme
        body.classList.remove('dark');
        body.classList.add('light');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        // Chuyển sang dark theme
        body.classList.remove('light');
        body.classList.add('dark');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
}

// Cập nhật hàm restoreTheme để xử lý cả hai class
function restoreTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const toggleBtn = document.getElementById('toggleTheme');
    
    if (savedTheme === 'dark') {
        body.classList.remove('light');
        body.classList.add('dark');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}
