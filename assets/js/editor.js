// Глобальные переменные
let programData = {
    title: "XXIV НАУЧНО-ПРАКТИЧЕСКАЯ КОНФЕРЕНЦИЯ ПО ТРИХОЛОГИИ",
    subtitle: "«Инновации в трихологии: мировые направления развития и холодный расчет»",
    date: "6-7 декабря 2025 года, Москва",
    days: []
};

// Редактирование заголовка
function editHeader() {
    document.getElementById('editTitle').value = programData.title;
    document.getElementById('editSubtitle').value = programData.subtitle;
    document.getElementById('editDate').value = programData.date;
    document.getElementById('headerModal').style.display = 'block';
}

function saveHeader() {
    programData.title = document.getElementById('editTitle').value;
    programData.subtitle = document.getElementById('editSubtitle').value;
    programData.date = document.getElementById('editDate').value;
    
    document.getElementById('conferenceTitle').textContent = programData.title;
    document.getElementById('conferenceSubtitle').textContent = programData.subtitle;
    document.getElementById('conferenceDate').textContent = programData.date;
    
    closeModal('headerModal');
}

// Добавление дня
function addDay() {
    const dayNumber = programData.days.length + 1;
    document.getElementById('dayNumber').value = dayNumber;
    document.getElementById('dayDate').value = '';
    document.getElementById('dayModal').style.display = 'block';
}

function saveDay() {
    const dayNumber = document.getElementById('dayNumber').value;
    const dayDate = document.getElementById('dayDate').value;
    
    if (!dayDate) {
        alert('Укажите дату');
        return;
    }
    
    const dayData = {
        number: dayNumber,
        title: `День ${dayNumber}`,
        date: dayDate,
        sessions: []
    };
    
    programData.days.push(dayData);
    closeModal('dayModal');
    renderProgram();
}

// Удаление дня
function deleteDay(dayIndex) {
    if (confirm('Удалить этот день конференции?')) {
        programData.days.splice(dayIndex, 1);
        programData.days.forEach((day, index) => {
            day.number = index + 1;
            day.title = `День ${index + 1}`;
        });
        renderProgram();
    }
}

// Добавление сессии
function addSession() {
    if (programData.days.length === 0) {
        alert('Сначала добавьте день конференции');
        return;
    }
    
    document.getElementById('sessionTime').value = '';
    document.getElementById('sessionTitle').value = '';
    document.getElementById('sessionModal').style.display = 'block';
}

function saveSession() {
    const time = document.getElementById('sessionTime').value;
    const title = document.getElementById('sessionTitle').value;
    
    if (!time || !title) {
        alert('Заполните все поля');
        return;
    }
    
    const sessionData = {
        time: time,
        title: title,
        talks: []
    };
    
    programData.days[programData.days.length - 1].sessions.push(sessionData);
    closeModal('sessionModal');
    renderProgram();
}

// Удаление сессии
function deleteSession(event, dayIndex, sessionIndex) {
    event.stopPropagation();
    if (confirm('Удалить эту сессию?')) {
        programData.days[dayIndex].sessions.splice(sessionIndex, 1);
        renderProgram();
    }
}

// Добавление доклада
function addTalk() {
    if (programData.days.length === 0) {
        alert('Сначала добавьте день конференции');
        return;
    }
    
    const lastDay = programData.days[programData.days.length - 1];
    if (lastDay.sessions.length === 0) {
        alert('Сначала добавьте сессию');
        return;
    }
    
    document.getElementById('talkTitle').value = '';
    document.getElementById('talkAuthor').value = '';
    document.getElementById('talkTime').value = '';
    document.getElementById('talkModal').style.display = 'block';
}

function saveTalk() {
    const title = document.getElementById('talkTitle').value;
    const author = document.getElementById('talkAuthor').value;
    const time = document.getElementById('talkTime').value;
    
    if (!title || !author) {
        alert('Заполните обязательные поля (название и автор)');
        return;
    }
    
    const talkData = {
        title: title,
        author: author,
        time: time || ''
    };
    
    const lastDay = programData.days[programData.days.length - 1];
    const lastSession = lastDay.sessions[lastDay.sessions.length - 1];
    
    if (lastSession.type === 'break') {
        alert('Нельзя добавить доклад в перерыв. Создайте новую сессию.');
        return;
    }
    
    lastSession.talks.push(talkData);
    
    closeModal('talkModal');
    renderProgram();
}

// Удаление доклада
function deleteTalk(event, dayIndex, sessionIndex, talkIndex) {
    event.stopPropagation();
    if (confirm('Удалить этот доклад?')) {
        programData.days[dayIndex].sessions[sessionIndex].talks.splice(talkIndex, 1);
        renderProgram();
    }
}

// Добавление перерыва
function addBreak() {
    if (programData.days.length === 0) {
        alert('Сначала добавьте день конференции');
        return;
    }
    
    document.getElementById('breakTime').value = '';
    document.getElementById('breakTitle').value = 'Кофе-брейк';
    document.getElementById('breakModal').style.display = 'block';
}

function saveBreak() {
    const time = document.getElementById('breakTime').value;
    const title = document.getElementById('breakTitle').value;
    
    if (!time || !title) {
        alert('Заполните все поля');
        return;
    }
    
    const breakData = {
        type: 'break',
        time: time,
        title: title
    };
    
    programData.days[programData.days.length - 1].sessions.push(breakData);
    closeModal('breakModal');
    renderProgram();
}

// Закрытие модального окна
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Рендеринг программы
function renderProgram() {
    const container = document.getElementById('programDays');
    container.innerHTML = '';
    
    programData.days.forEach((day, dayIndex) => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-section';
        
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.innerHTML = `
            <span><i class="fas fa-calendar"></i> ${day.title} - ${day.date}</span>
            <button class="delete-btn-header" onclick="deleteDay(${dayIndex})" title="Удалить день">
                <i class="fas fa-trash"></i>
            </button>
        `;
        dayDiv.appendChild(dayHeader);
        
        day.sessions.forEach((session, sessionIndex) => {
            if (session.type === 'break') {
                const breakDiv = document.createElement('div');
                breakDiv.className = 'break-item';
                breakDiv.innerHTML = `
                    <span><i class="fas fa-coffee"></i> ${session.time} - ${session.title}</span>
                    <button class="delete-btn" onclick="deleteSession(event, ${dayIndex}, ${sessionIndex})" title="Удалить перерыв">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                breakDiv.onclick = (e) => {
                    if (e.target === breakDiv || e.target.tagName === 'I' || e.target.tagName === 'SPAN') {
                        editItem(dayIndex, sessionIndex, 'session');
                    }
                };
                dayDiv.appendChild(breakDiv);
            } else {
                const sessionDiv = document.createElement('div');
                sessionDiv.className = 'session-block';
                
                const headerContainer = document.createElement('div');
                headerContainer.style.position = 'relative';
                
                const timeDiv = document.createElement('div');
                timeDiv.className = 'session-time';
                timeDiv.textContent = session.time;
                headerContainer.appendChild(timeDiv);
                
                const titleDiv = document.createElement('div');
                titleDiv.className = 'session-title';
                titleDiv.textContent = session.title;
                headerContainer.appendChild(titleDiv);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn-session';
                deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
                deleteBtn.title = 'Удалить сессию';
                deleteBtn.onclick = (e) => deleteSession(e, dayIndex, sessionIndex);
                headerContainer.appendChild(deleteBtn);
                
                sessionDiv.appendChild(headerContainer);
                
                headerContainer.onclick = (e) => {
                    if (!e.target.closest('.delete-btn-session')) {
                        editItem(dayIndex, sessionIndex, 'session');
                    }
                };
                
                if (session.talks && session.talks.length > 0) {
                    session.talks.forEach((talk, talkIndex) => {
                        const talkDiv = document.createElement('div');
                        talkDiv.className = 'talk-item editable';
                        
                        if (talk.time) {
                            const talkTimeDiv = document.createElement('div');
                            talkTimeDiv.className = 'talk-time-small';
                            talkTimeDiv.textContent = talk.time;
                            talkDiv.appendChild(talkTimeDiv);
                        }
                        
                        const talkTitleDiv = document.createElement('div');
                        talkTitleDiv.className = 'talk-title';
                        talkTitleDiv.textContent = talk.title;
                        talkDiv.appendChild(talkTitleDiv);
                        
                        const talkAuthorDiv = document.createElement('div');
                        talkAuthorDiv.className = 'talk-author';
                        talkAuthorDiv.textContent = talk.author;
                        talkDiv.appendChild(talkAuthorDiv);
                        
                        const deleteTalkBtn = document.createElement('button');
                        deleteTalkBtn.className = 'delete-btn';
                        deleteTalkBtn.innerHTML = '<i class="fas fa-trash"></i>';
                        deleteTalkBtn.title = 'Удалить доклад';
                        deleteTalkBtn.onclick = (e) => deleteTalk(e, dayIndex, sessionIndex, talkIndex);
                        talkDiv.appendChild(deleteTalkBtn);
                        
                        talkDiv.onclick = (e) => {
                            if (!e.target.closest('.delete-btn')) {
                                editItem(dayIndex, sessionIndex, 'talk', talkIndex);
                            }
                        };
                        
                        sessionDiv.appendChild(talkDiv);
                    });
                }
                
                dayDiv.appendChild(sessionDiv);
            }
        });
        
        container.appendChild(dayDiv);
    });
}

// Редактирование элементов
function editItem(dayIndex, sessionIndex, type, talkIndex) {
    if (type === 'session') {
        const session = programData.days[dayIndex].sessions[sessionIndex];
        
        if (session.type === 'break') {
            const newTime = prompt('Время перерыва:', session.time);
            if (newTime === null) return;
            const newTitle = prompt('Название:', session.title);
            
            if (newTime && newTitle) {
                session.time = newTime;
                session.title = newTitle;
                renderProgram();
            }
        } else {
            const newTime = prompt('Время сессии:', session.time);
            if (newTime === null) return;
            const newTitle = prompt('Название сессии:', session.title);
            
            if (newTime && newTitle) {
                session.time = newTime;
                session.title = newTitle;
                renderProgram();
            }
        }
    } else if (type === 'talk') {
        const talk = programData.days[dayIndex].sessions[sessionIndex].talks[talkIndex];
        
        const newTime = prompt('Время доклада (опционально):', talk.time || '');
        if (newTime === null) return;
        const newTitle = prompt('Название доклада:', talk.title);
        if (newTitle === null) return;
        const newAuthor = prompt('Автор:', talk.author);
        
        if (newTitle && newAuthor) {
            talk.time = newTime;
            talk.title = newTitle;
            talk.author = newAuthor;
            renderProgram();
        }
    }
}

// Сохранение программы
function saveProgram() {
    const json = JSON.stringify(programData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'program_' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Загрузка программы
function loadProgram() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                programData = JSON.parse(event.target.result);
                document.getElementById('conferenceTitle').textContent = programData.title;
                document.getElementById('conferenceSubtitle').textContent = programData.subtitle;
                document.getElementById('conferenceDate').textContent = programData.date;
                renderProgram();
                alert('Программа успешно загружена!');
            } catch (error) {
                alert('Ошибка при загрузке файла: ' + error.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Экспорт в PDF
async function exportToPDF() {
    document.body.classList.add('pdf-export');
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingIndicator';
    loadingDiv.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    background: white; padding: 30px; border-radius: 10px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 10000; text-align: center;">
            <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #E8B4D9; margin-bottom: 15px;"></i>
            <div style="font-size: 18px; color: #333;">Генерация PDF...</div>
            <div style="font-size: 14px; color: #666; margin-top: 10px;">Это может занять несколько секунд</div>
        </div>
    `;
    document.body.appendChild(loadingDiv);
    
    try {
        const element = document.getElementById('programContent');

        const canvas = await html2canvas(element, {
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: 794,
            windowHeight: 1123
        });
        
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        const margin = 10;
        const imgWidth = 210 - margin * 2;
        const pageHeight = 297 - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = margin;

        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = margin + heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        const fileName = 'научная_программа_' + new Date().toISOString().split('T')[0] + '.pdf';
        pdf.save(fileName);

        document.body.removeChild(loadingDiv);
        document.body.classList.remove('pdf-export');
        
        const successDiv = document.createElement('div');
        successDiv.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: #d4edda; padding: 20px; border-radius: 10px; 
                        box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 10000; 
                        border: 2px solid #c3e6cb; color: #155724;">
                <i class="fas fa-check-circle" style="color: #28a745; margin-right: 10px;"></i>
                PDF успешно создан!
            </div>
        `;
        document.body.appendChild(successDiv);
        setTimeout(() => {
            if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
            }
        }, 3000);
        
    } catch (error) {
        console.error('Ошибка при генерации PDF:', error);
        const loadingEl = document.getElementById('loadingIndicator');
        if (loadingEl && document.body.contains(loadingEl)) {
            document.body.removeChild(loadingEl);
        }
        document.body.classList.remove('pdf-export');
        alert('Ошибка при создании PDF. Попробуйте открыть файл через веб-сервер (не напрямую из папки).\n\nОшибка: ' + error.message);
    }
}

// Закрытие модальных окон по клику вне их
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Редактор научной программы загружен');
    
    // Делаем компоненты боковой панели кликабельными
    const components = document.querySelectorAll('.component-item');
    components.forEach((component, index) => {
        component.style.cursor = 'pointer';
        component.onclick = function() {
            switch(index) {
                case 0: addDay(); break;
                case 1: addSession(); break;
                case 2: addTalk(); break;
                case 3: addBreak(); break;
                case 4:
                    addSession();
                    setTimeout(() => {
                        document.getElementById('sessionTitle').value = 'Круглый стол: ';
                    }, 100);
                    break;
                case 5:
                    addSession();
                    setTimeout(() => {
                        document.getElementById('sessionTitle').value = 'Торжественное ';
                    }, 100);
                    break;
            }
        };
    });
});
