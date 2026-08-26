<?php
require_once 'config.php';

if (!isset($_SESSION['admin'])) {
    http_response_code(403);
    exit('Доступ запрещён');
}

$action = $_GET['action'] ?? '';

// Функция для чтения и записи JSON
function readJSON($file) {
    return json_decode(file_get_contents($file), true) ?: [];
}
function writeJSON($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

switch ($action) {
    case 'update_settings':
        $settings = [
            'phone' => $_POST['phone'] ?? '',
            'address' => $_POST['address'] ?? '',
            'instagram' => $_POST['instagram'] ?? ''
        ];
        writeJSON(SETTINGS_FILE, $settings);
        header('Location: index.php');
        break;

    case 'add_project':
        $projects = readJSON(PROJECTS_FILE);
        $projects[] = [
            'title' => $_POST['title'] ?? '',
            'description' => $_POST['description'] ?? '',
            'city' => $_POST['city'] ?? '',
            'image' => $_POST['image'] ?? ''
        ];
        writeJSON(PROJECTS_FILE, $projects);
        header('Location: index.php');
        break;

    case 'delete_project':
        $index = (int)$_GET['index'];
        $projects = readJSON(PROJECTS_FILE);
        if (isset($projects[$index])) {
            array_splice($projects, $index, 1);
            writeJSON(PROJECTS_FILE, $projects);
        }
        header('Location: index.php');
        break;

    case 'add_review':
        $reviews = readJSON(REVIEWS_FILE);
        $reviews[] = [
            'name' => $_POST['name'] ?? '',
            'text' => $_POST['text'] ?? '',
            'city' => $_POST['city'] ?? '',
            'rating' => (int)($_POST['rating'] ?? 5)
        ];
        writeJSON(REVIEWS_FILE, $reviews);
        header('Location: index.php');
        break;

    case 'delete_review':
        $index = (int)$_GET['index'];
        $reviews = readJSON(REVIEWS_FILE);
        if (isset($reviews[$index])) {
            array_splice($reviews, $index, 1);
            writeJSON(REVIEWS_FILE, $reviews);
        }
        header('Location: index.php');
        break;

    default:
        http_response_code(400);
        echo 'Неизвестное действие';
}
?>
