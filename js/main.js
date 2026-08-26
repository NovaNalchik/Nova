// ============================================================
// 1. Загрузка данных из JSON и рендеринг
// ============================================================

// Пути к файлам с данными (относительно корня сайта)
const DATA_PATH = {
    projects: 'data/projects.json',
    reviews: 'data/reviews.json',
    settings: 'data/settings.json'
};

// Функция для загрузки JSON
async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка загрузки ${url}: ${response.status}`);
    }
    return response.json();
}

// Рендеринг проектов (карусель)
function renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    if (!projects || projects.length === 0) {
        container.innerHTML = '<p class="text-gray-500">Пока нет проектов. Добавьте их в админке.</p>';
        return;
    }
    // Генерируем карточки
    container.innerHTML = projects.map(project => `
        <div class="bg-gray-100 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group">
            <img src="${project.image || 'https://via.placeholder.com/600x400?text=Нет+фото'}" 
                 alt="${project.title}" 
                 class="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                 onerror="this.src='https://via.placeholder.com/600x400?text=Фото+не+загружено'"
            />
            <div class="p-4 bg-white">
                <h4 class="font-display font-bold text-nova-dark">${project.title}</h4>
                <p class="font-body text-sm text-gray-500">${project.city || project.description || ''}</p>
                ${project.link ? `<a href="${project.link}" target="_blank" class="text-nova-copper text-sm hover:underline">Подробнее</a>` : ''}
            </div>
        </div>
    `).join('');
}

// Рендеринг отзывов
function renderReviews(reviews) {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    if (!reviews || reviews.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center col-span-full">Пока нет отзывов. Добавьте их в админке.</p>';
        return;
    }
    container.innerHTML = reviews.map(review => {
        const stars = '★'.repeat(review.rating || 5) + '☆'.repeat(5 - (review.rating || 5));
        return `
            <div class="bg-white p-7 rounded-2xl shadow-sm border border-gray-100">
                <div class="flex text-nova-copper text-sm mb-2">${stars}</div>
                <p class="font-body text-gray-700 text-sm italic leading-relaxed">"${review.text}"</p>
                <p class="font-body font-bold text-nova-dark mt-4">— ${review.name}${review.city ? `, ${review.city}` : ''}</p>
            </div>
        `;
    }).join('');
}

// Обновление контактов из настроек
function updateSettings(settings) {
    if (!settings) return;
    // Телефон
    if (settings.phone) {
        const phoneLink = document.getElementById('phoneLink');
        if (phoneLink) {
            phoneLink.href = `tel:${settings.phone.replace(/\s/g, '').replace(/[^0-9+]/g, '')}`;
            phoneLink.textContent = settings.phone;
        }
        // также в хедере и мобильном меню уже прописаны вручную, но можно обновить отдельно
    }
    // Адрес
    if (settings.address) {
        const addr = document.getElementById('addressText');
        if (addr) addr.textContent = settings.address;
    }
    // Instagram
    if (settings.instagram) {
        const links = document.querySelectorAll('#instagramLink, #instagramLink2');
        links.forEach(el => {
            if (el) el.href = settings.instagram;
        });
    }
}

// Основная функция инициализации
async function init() {
    try {
        // Загружаем все данные параллельно
        const [projects, reviews, settings] = await Promise.all([
            fetchJSON(DATA_PATH.projects),
            fetchJSON(DATA_PATH.reviews),
            fetchJSON(DATA_PATH.settings)
        ]);

        renderProjects(projects);
        renderReviews(reviews);
        updateSettings(settings);
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        // Показываем заглушки, чтобы сайт не падал
        document.getElementById('projectsContainer').innerHTML = '<p class="text-gray-500">Не удалось загрузить проекты. Проверьте соединение.</p>';
        document.getElementById('reviewsContainer').innerHTML = '<p class="text-gray-500 text-center col-span-full">Не удалось загрузить отзывы.</p>';
    }
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', init);

// ============================================================
// 2. Бургер-меню (мобильное)
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        // Закрываем меню при клике на ссылку
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// ============================================================
// 3. Модальное окно
// ============================================================
function openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('modal-active');
        document.body.style.overflow = 'hidden';
    }
}
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('modal-active');
        document.body.style.overflow = 'auto';
    }
}
// Закрытие по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});

// ============================================================
// 4. Обработка формы (пока alert, потом можно заменить на реальную отправку)
// ============================================================
function submitForm(e) {
    e.preventDefault();
    alert('✅ Спасибо! Мы перезвоним вам в ближайшее время.');
    closeModal();
    // Можно очистить поля формы
    e.target.reset();
}

// ============================================================
// 5. Дополнительно: подхват контактов из settings для хедера (если нужно)
//    Пока оставим статику, но можно динамически обновлять.
// ============================================================
// (Опционально) Можно обновить и номер в хедере и мобильном меню,
// но там уже прописаны напрямую. Если хочешь, чтобы они тоже брались из JSON,
// можно добавить соответствующие id и обновлять их в updateSettings.