# Руководство по развёртыванию

## Развёртывание на веб-сервере

### Вариант 1: Apache

1. Загрузите все файлы проекта на сервер через FTP/SFTP
2. Разместите файлы в корневой директории сайта или в поддиректории
3. Убедитесь, что файл `index.html` доступен

**Пример структуры:**
```
/var/www/html/scientific-program/
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── ...
```

**Настройка .htaccess (опционально):**
```apache
# Включить сжатие
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Кэширование статических файлов
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### Вариант 2: Nginx

**Конфигурация nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/scientific-program;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Кэширование статических файлов
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Сжатие
    gzip on;
    gzip_types text/css application/javascript image/png;
}
```

### Вариант 3: GitHub Pages

1. Загрузите проект на GitHub (см. GITHUB_UPLOAD_INSTRUCTIONS.md)
2. Перейдите в Settings → Pages
3. Выберите Source: main branch
4. Сохраните
5. Сайт будет доступен: `https://kbgdov-dev.github.io/scientific-program/`

**Преимущества:**
- ✅ Бесплатный хостинг
- ✅ HTTPS по умолчанию
- ✅ Автоматическое обновление при push
- ✅ CDN

### Вариант 4: Netlify

1. Зарегистрируйтесь на https://netlify.com
2. Выберите "New site from Git"
3. Подключите GitHub репозиторий
4. Build settings оставьте пустыми (статический сайт)
5. Deploy

**Преимущества:**
- ✅ Бесплатный SSL
- ✅ Глобальный CDN
- ✅ Автодеплой из GitHub
- ✅ Поддержка форм и функций

### Вариант 5: Vercel

1. Зарегистрируйтесь на https://vercel.com
2. Импортируйте проект из GitHub
3. Deploy

### Вариант 6: Локальный сервер

**Python SimpleHTTPServer:**
```bash
cd scientific-program
python3 -m http.server 8000
```

**Node.js (http-server):**
```bash
npm install -g http-server
cd scientific-program
http-server -p 8000
```

Откройте браузер: `http://localhost:8000`

## Требования к серверу

### Минимальные требования
- Веб-сервер (Apache, Nginx, IIS)
- Поддержка статических файлов
- HTTPS (рекомендуется)

### Рекомендуемые настройки
- Сжатие gzip/brotli
- Кэширование статических ресурсов
- HTTP/2
- SSL-сертификат

## Настройка домена

### Для GitHub Pages

**Настройка кастомного домена:**
1. Добавьте файл `CNAME` в корень проекта:
```
program.trichologia.ru
```

2. Настройте DNS записи:
```
Type: CNAME
Name: program
Value: kbgdov-dev.github.io
```

### Для обычного хостинга

**DNS записи:**
```
Type: A
Name: @
Value: IP-адрес сервера

Type: A  
Name: www
Value: IP-адрес сервера
```

## SSL/HTTPS

### Let's Encrypt (бесплатный SSL)

**Установка certbot:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

**Автообновление сертификата:**
```bash
sudo certbot renew --dry-run
```

## Мониторинг и аналитика

### Google Analytics

Добавьте перед закрывающим тегом `</head>` в `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Яндекс.Метрика

```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(XXXXXX, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
```

## Безопасность

### Заголовки безопасности

**Apache (.htaccess):**
```apache
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

**Nginx:**
```nginx
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

## Резервное копирование

### Автоматический бэкап (Linux)

Создайте скрипт `/usr/local/bin/backup-program.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/scientific-program"
SOURCE_DIR="/var/www/scientific-program"
DATE=$(date +%Y-%m-%d_%H-%M-%S)

mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz $SOURCE_DIR

# Удалить бэкапы старше 30 дней
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +30 -delete
```

**Добавьте в crontab:**
```bash
0 2 * * * /usr/local/bin/backup-program.sh
```

## Обновление проекта

### Через Git

```bash
cd /var/www/scientific-program
git pull origin main
```

### Через FTP

1. Сделайте бэкап текущей версии
2. Загрузите новые файлы
3. Проверьте работоспособность

## Производительность

### Оптимизация изображений

```bash
# Установка ImageMagick
sudo apt install imagemagick

# Оптимизация PNG
convert logo-t.png -quality 85 logo-t-optimized.png
```

### Минификация CSS/JS (опционально)

Для продакшена можно минифицировать файлы:

```bash
npm install -g clean-css-cli uglify-js

# Минификация CSS
cleancss -o assets/css/style.min.css assets/css/style.css

# Минификация JS
uglifyjs assets/js/editor.js -o assets/js/editor.min.js
```

## Поддержка и обслуживание

### Логи

**Apache:**
```bash
tail -f /var/log/apache2/access.log
tail -f /var/log/apache2/error.log
```

**Nginx:**
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Мониторинг uptime

Используйте сервисы:
- UptimeRobot (бесплатно)
- Pingdom
- StatusCake

## Контакты технической поддержки

- GitHub Issues: https://github.com/kbgdov-dev/scientific-program/issues
- Email: support@trichologia.ru

---

**Дата обновления:** 30 ноября 2025
