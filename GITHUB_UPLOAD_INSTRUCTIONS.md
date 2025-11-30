# Инструкция по загрузке проекта на GitHub

## Шаг 1: Подготовка репозитория на GitHub

1. Перейдите на https://github.com/kbgdov-dev/scientific-program
2. Если репозиторий уже существует и не пустой, сделайте бэкап важных файлов
3. Если репозиторий новый - всё готово к загрузке

## Шаг 2: Инициализация Git локально

Откройте терминал в папке проекта `scientific-program` и выполните:

```bash
# Инициализация Git репозитория
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: Scientific Program Editor v1.0"

# Добавление удаленного репозитория
git remote add origin https://github.com/kbgdov-dev/scientific-program.git

# Отправка на GitHub
git branch -M main
git push -u origin main
```

## Шаг 3: Альтернативный способ (через GitHub Desktop)

1. Скачайте и установите GitHub Desktop
2. Войдите в свой аккаунт GitHub
3. Выберите "Add Local Repository"
4. Укажите путь к папке `scientific-program`
5. Нажмите "Publish repository"

## Шаг 4: Загрузка через веб-интерфейс GitHub

Если у вас проблемы с Git командной строкой:

1. Перейдите на https://github.com/kbgdov-dev/scientific-program
2. Нажмите "Add file" → "Upload files"
3. Перетащите все файлы из папки проекта
4. Напишите commit message: "Initial commit: Scientific Program Editor"
5. Нажмите "Commit changes"

## Структура проекта для загрузки

Убедитесь, что загружаете следующие файлы и папки:

```
scientific-program/
├── index.html
├── README.md
├── .gitignore
├── example_program.json
├── GITHUB_UPLOAD_INSTRUCTIONS.md (этот файл)
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── editor.js
    └── images/
        └── logo-t.png
```

## Шаг 5: Включение GitHub Pages (опционально)

Для публикации проекта как веб-сайта:

1. Перейдите в Settings репозитория
2. Найдите раздел "Pages" в левом меню
3. В Source выберите "main" branch
4. Нажмите "Save"
5. Через несколько минут сайт будет доступен по адресу:
   `https://kbgdov-dev.github.io/scientific-program/`

## Проверка загрузки

После загрузки проверьте:
- ✅ Все файлы загружены
- ✅ Структура папок сохранена
- ✅ README.md отображается на главной странице
- ✅ Логотип отображается

## Обновление проекта в будущем

```bash
# Добавить изменённые файлы
git add .

# Создать коммит
git commit -m "Описание изменений"

# Отправить на GitHub
git push
```

## Проблемы и решения

### Ошибка: "permission denied"
Проверьте права доступа к репозиторию на GitHub

### Ошибка: "repository not found"
Проверьте правильность URL репозитория

### Конфликты при push
```bash
git pull origin main --rebase
git push
```

## Контакты

По вопросам работы с проектом:
- GitHub: https://github.com/kbgdov-dev
- Email: support@trichologia.ru
