const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Карточки
const cards = [
    {
        title: 'Use Present Perfect',
        description: 'Say one thing you and your friends have tried recently.',
        search: 'brain',
        externalFrameColor: 'ff00ff',
        internalFrameColor: '0000ff'
    },
    {
        title: 'Talk About Emotions',
        description: 'Say how you felt during your last group activity.',
        search: 'emotion',
        externalFrameColor: '00ffff',
        internalFrameColor: 'ffcc00'
    }
];

const downloadPath = path.resolve('./downloads');

(async () => {
    fs.mkdirSync(downloadPath, { recursive: true });

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    // Настройка папки для скачивания
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath
    });

    // Переход на сайт
    await page.goto('https://obscurrro.vercel.app'); // <-- замени на нужный URL
    await later(3000);

    for (const card of cards) {
        console.log(`\n🎴 Генерация карточки: "${card.title}"`);

        await clearInput(page, '#title-input');
        await clearInput(page, '#subtitle-input');
        await clearInput(page, '#description-input');
        await clearInput(page, '#external-frame-color-input');
        await clearInput(page, '#internal-frame-color-input');
        await clearInput(page, '#search-input');

        // Заполнение полей
        await page.type('#title-input', card.title);
        await page.type('#description-input', card.description);
        await page.type('#external-frame-color-input', card.externalFrameColor);
        await page.type('#internal-frame-color-input', card.internalFrameColor);
        await page.type('#search-input', card.search);

        // Поиск картинки
        await page.click('#search-button');

        const previousSrcs = await page.$$eval('#image-list [id^="image-"] img', imgs =>
            imgs.map(img => img.getAttribute('src')).filter(Boolean)
        );

        // Ждём изображения (до 5 сек)
        try {
            await page.waitForFunction((prev) => {
                const images = document.querySelectorAll('#image-list [id^="image-"] img');
                const currentSrcs = Array.from(images).map(img => img.getAttribute('src')).filter(Boolean);

                // Проверка: есть ли хотя бы один src, которого не было раньше
                return currentSrcs.some(src => !prev.includes(src) && src.startsWith('http'));
            }, {
                timeout: 7000
            }, previousSrcs);
        } catch (e) {
            console.log('❌ Картинки не обновились (src не изменился). Пропускаем.', e);
            continue;
        }

        // Кликаем по случайной
        const imageHandles = await page.$$('[id^="image-"]');
        if (imageHandles.length === 0) {
            console.log('⚠️ Нет доступных изображений');
            continue;
        }
        const randomIndex = Math.floor(Math.random() * imageHandles.length);
        await imageHandles[randomIndex].click();

        // Нажимаем сохранить и ждём скачивания
        const filePromise = waitForDownload(downloadPath, 10000);
        await page.click('#save-button');

        const file = await filePromise;
        if (file) {
            console.log('✅ Скачан файл:', file);

            const finalName = `${Date.now()}_card.png`;

            const renamed = renameDownloadedFile(downloadPath, file, finalName);
            if (renamed) {
                console.log('📁 Переименован в:', renamed);
            }
        } else {
            console.log('⚠️ Файл не скачался вовремя');
        }
    }

    await browser.close();
})();

// Ожидание появления нового файла с помощью fs.watch
function waitForDownload(folderPath, timeout = 10000) {
    return new Promise((resolve) => {
        let finalFile = null;

        const watcher = fs.watch(folderPath, async (eventType, filename) => {
            if (eventType === 'rename' && filename && !filename.endsWith('.crdownload')) {
                finalFile = filename;
                watcher.close();
                resolve(finalFile);
            }
        });

        setTimeout(() => {
            watcher.close();
            resolve(null);
        }, timeout);
    });
}

function later(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

async function clearInput(page, inputId) {
    const inputValue = await page.$eval(inputId, el => el.value);
    await page.click(inputId);
    for (let i = 0; i < inputValue.length; i++) {
        await page.keyboard.press('Backspace');
    }
}

function renameDownloadedFile(folderPath, oldName, newName) {
    const oldPath = path.join(folderPath, oldName);
    const newPath = path.join(folderPath, newName);
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        return newName;
    }
    return null;
}

