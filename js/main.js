// Загрузка данных с главной страницы
async function loadData() {
    try {
        const projectsRes = await fetch('/data/projects.json');
        const reviewsRes = await fetch('/data/reviews.json');
        const settingsRes = await fetch('/data/settings.json');

        const projects = await projectsRes.json();
        const reviews = await reviewsRes.json();
        const settings = await settingsRes.json();

        // Здесь вставить код, который рендерит проекты, отзывы и контакты на странице
        // Например, можно найти элементы по ID и заполнить их

        console.log('Данные загружены:', { projects, reviews, settings });
        // Дальше ваша логика отображения
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadData);
