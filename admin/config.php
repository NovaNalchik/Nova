<?php
// Пароль для входа (смените на свой)
define('ADMIN_PASSWORD', '123456');

// Пути к файлам данных (относительно корня)
define('DATA_DIR', '../data/');
define('PROJECTS_FILE', DATA_DIR . 'projects.json');
define('REVIEWS_FILE', DATA_DIR . 'reviews.json');
define('SETTINGS_FILE', DATA_DIR . 'settings.json');

// Запуск сессии для авторизации
session_start();
?>
