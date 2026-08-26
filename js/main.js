// ========== Бургер-меню ==========
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// ========== Модалка ==========
function openModal() {
    document.getElementById('modal').classList.add('modal-active');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    document.getElementById('modal').classList.remove('modal-active');
    document.body.style.overflow = 'auto';
}
function submitForm(e) {
    e.preventDefault();
    alert('✅ Спасибо! Мы перезвоним вам в ближайшее время.');
    closeModal();
}

// ========== Загрузка данных из JSON ==========
async function loadData() {
    try {
        const [projectsRes, reviewsRes, settingsRes] = await Promise.all([
            fetch('/data/projects.json'),
            fetch('/data/reviews.json'),
            fetch('/data/settings.json')
        ]);

        const projects = await projectsRes.json();
        const reviews = await reviewsRes.json();
        const settings = await settingsRes.json();

        renderProjects(projects);
        renderReviews(reviews);
        renderContacts(settings);
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

function renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    container.innerHTML = '';
    if (!projects.length) {
        container.innerHTML = '<p class="text-gray-500">Пока нет проектов</p>';
        return;
    }
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'bg-gray-100 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group';
        card.innerHTML = `
            <img src="${project.image || '/img/placeholder.jpg'}" alt="${project.title}" class="w-full h-64 object-cover group-hover:scale-105 transition duration-500">
            <div class="p-4 bg-white">
                <h4 class="font-display font-bold text-[#1A252C]">${project.title}</h4>
                <p class="font-body text-sm text-gray-500">${project.description || ''} ${project.city ? '— ' + project.city : ''}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderReviews(reviews) {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    container.innerHTML = '';
    if (!reviews.length) {
        container.innerHTML = '<p class="text-gray-500 text-center col-span-3">Пока нет отзывов</p>';
        return;
    }
    reviews.forEach(review => {
        const div = document.createElement('div');
        div.className = 'bg-white p-7 rounded-2xl shadow-sm border border-gray-100';
        const stars = '★'.repeat(review.rating || 5) + '☆'.repeat(5 - (review.rating || 5));
        div.innerHTML = `
            <div class="flex text-[#C87A4F] text-sm mb-2">${stars}</div>
            <p class="font-body text-gray-700 text-sm italic leading-relaxed">${review.text}</p>
            <p class="font-body font-bold text-[#1A252C] mt-4">— ${review.name}${review.city ? ', г. ' + review.city : ''}</p>
        `;
        container.appendChild(div);
    });
}

function renderContacts(settings) {
    const container = document.getElementById('contactsContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-[#C87A4F]/10 rounded-full flex items-center justify-center text-[#C87A4F] flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
                <p class="font-body font-bold text-[#1A252C]">Адрес производства</p>
                <p class="font-body text-gray-500">${settings.address || 'г. Нальчик, ул. Куйбышева, д. 78'}</p>
            </div>
        </div>
        <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-[#C87A4F]/10 rounded-full flex items-center justify-center text-[#C87A4F] flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <div>
                <p class="font-body font-bold text-[#1A252C]">Телефон / WhatsApp</p>
                <a href="tel:${settings.phone || '+79609380007'}" class="font-body text-[#C87A4F] hover:underline text-lg font-semibold">${settings.phone || '+7 (960) 938-00-07'}</a>
            </div>
        </div>
        <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-[#C87A4F]/10 rounded-full flex items-center justify-center text-[#C87A4F] flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <div>
                <p class="font-body font-bold text-[#1A252C]">Социальные сети</p>
                <a href="${settings.instagram || 'https://instagram.com/nova_kuhni_'}" target="_blank" class="font-body text-[#C87A4F] hover:underline">Instagram: @nova_kuhni_</a>
            </div>
        </div>
    `;
}

// Загружаем данные при загрузке страницы
document.addEventListener('DOMContentLoaded', loadData);
