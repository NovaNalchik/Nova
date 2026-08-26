<?php
require_once 'config.php';
if (!isset($_SESSION['admin'])) {
    header('Location: login.php');
    exit;
}

// Загружаем данные для отображения
$projects = json_decode(file_get_contents(PROJECTS_FILE), true) ?: [];
$reviews = json_decode(file_get_contents(REVIEWS_FILE), true) ?: [];
$settings = json_decode(file_get_contents(SETTINGS_FILE), true) ?: [];
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Админка Nova</title>
    <style>
        body { font-family: sans-serif; background: #f9f9f9; padding: 20px; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        h1 { color: #1A252C; }
        .section { margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
        .item { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; }
        .item button { background: #C87A4F; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-left: 5px; }
        .item .delete { background: #c0392b; }
        form { margin-top: 10px; }
        input, textarea { width: 100%; padding: 8px; margin: 5px 0; border: 1px solid #ccc; border-radius: 4px; }
        .btn { background: #C87A4F; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
        .logout { float: right; background: #555; }
        .row { display: flex; gap: 10px; flex-wrap: wrap; }
        .row input { flex: 1; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Панель управления Nova</h1>
        <a href="logout.php" class="btn logout">Выйти</a>

        <!-- НАСТРОЙКИ -->
        <div class="section">
            <h2>Настройки сайта</h2>
            <form method="post" action="api.php?action=update_settings">
                <input type="text" name="phone" value="<?= htmlspecialchars($settings['phone'] ?? '') ?>" placeholder="Телефон">
                <input type="text" name="address" value="<?= htmlspecialchars($settings['address'] ?? '') ?>" placeholder="Адрес">
                <input type="text" name="instagram" value="<?= htmlspecialchars($settings['instagram'] ?? '') ?>" placeholder="Instagram ссылка">
                <button type="submit" class="btn">Сохранить настройки</button>
            </form>
        </div>

        <!-- ПРОЕКТЫ -->
        <div class="section">
            <h2>Проекты</h2>
            <?php foreach ($projects as $index => $project): ?>
                <div class="item">
                    <span><strong><?= htmlspecialchars($project['title']) ?></strong> — <?= htmlspecialchars($project['city'] ?? '') ?></span>
                    <div>
                        <button onclick="editProject(<?= $index ?>)">Редактировать</button>
                        <button class="delete" onclick="deleteProject(<?= $index ?>)">Удалить</button>
                    </div>
                </div>
            <?php endforeach; ?>
            <h3>Добавить проект</h3>
            <form method="post" action="api.php?action=add_project">
                <input type="text" name="title" placeholder="Название" required>
                <textarea name="description" placeholder="Описание"></textarea>
                <input type="text" name="city" placeholder="Город">
                <input type="text" name="image" placeholder="Путь к фото (например /img/kitchen.jpg)">
                <button type="submit" class="btn">Добавить</button>
            </form>
        </div>

        <!-- ОТЗЫВЫ -->
        <div class="section">
            <h2>Отзывы</h2>
            <?php foreach ($reviews as $index => $review): ?>
                <div class="item">
                    <span><strong><?= htmlspecialchars($review['name']) ?></strong> ★<?= $review['rating'] ?? 5 ?></span>
                    <div>
                        <button onclick="editReview(<?= $index ?>)">Редактировать</button>
                        <button class="delete" onclick="deleteReview(<?= $index ?>)">Удалить</button>
                    </div>
                </div>
            <?php endforeach; ?>
            <h3>Добавить отзыв</h3>
            <form method="post" action="api.php?action=add_review">
                <input type="text" name="name" placeholder="Имя" required>
                <textarea name="text" placeholder="Текст отзыва"></textarea>
                <input type="text" name="city" placeholder="Город">
                <input type="number" name="rating" placeholder="Рейтинг (1-5)" min="1" max="5">
                <button type="submit" class="btn">Добавить</button>
            </form>
        </div>
    </div>

    <script>
        // Простые AJAX-функции для удаления и редактирования (можно расширить)
        function deleteProject(index) {
            if (confirm('Удалить проект?')) {
                fetch('api.php?action=delete_project&index=' + index, { method: 'POST' })
                .then(() => location.reload());
            }
        }
        function deleteReview(index) {
            if (confirm('Удалить отзыв?')) {
                fetch('api.php?action=delete_review&index=' + index, { method: 'POST' })
                .then(() => location.reload());
            }
        }
        function editProject(index) {
            // Для простоты перенаправим на страницу редактирования (можно реализовать позже)
            alert('Редактирование проекта #' + index + ' (можно реализовать через отдельную форму)');
        }
        function editReview(index) {
            alert('Редактирование отзыва #' + index);
        }
    </script>
</body>
</html>
