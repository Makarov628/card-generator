const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Карточки
const cards =
// [
//     {
//         title: 'Use Present Perfect',
//         description: 'Say one thing you and your friends have tried recently.',
//         search: 'brain',
//         externalFrameColor: 'ff00ff',
//         internalFrameColor: '0000ff'
//     },
//     {
//         title: 'Talk About Emotions',
//         description: 'Say how you felt during your last group activity.',
//         search: 'emotion',
//         externalFrameColor: '00ffff',
//         internalFrameColor: 'ffcc00'
//     }
// ];
[
  {
    "title": "Report yes/no question",
    "description": "Look at a question bubble: “Do you like music?” → He asked if I liked music.",
    "search": "reported questions",
    "externalFrameColor": "c902db",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Report wh- question",
    "description": "See: “Where are they?” → She asked where they were.",
    "search": "reported questions",
    "externalFrameColor": "c902db",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Match question/report",
    "description": "Match direct questions with their reported forms: “What is this?” → He asked what it was.",
    "search": "match",
    "externalFrameColor": "c902db",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Fix reported error",
    "description": "See: She asked where did he go. → Correct to: She asked where he went.",
    "search": "correction",
    "externalFrameColor": "c902db",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Use timeline",
    "description": "Convert time words: “When did he arrive yesterday?” → She asked when he had arrived the day before.",
    "search": "time shift",
    "externalFrameColor": "c902db",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Say reported yes/no",
    "description": "Hear: “Are you busy?” → He asked if I was busy.",
    "search": "reported questions",
    "externalFrameColor": "d0e600",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Say reported wh-",
    "description": "Hear: “What time does it start?” → She asked what time it started.",
    "search": "reported questions",
    "externalFrameColor": "d0e600",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Practice tone",
    "description": "Repeat as a statement: He asked why she left.",
    "search": "intonation",
    "externalFrameColor": "d0e600",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Hear and fix",
    "description": "Hear: She asked what do I want. → Correct: She asked what I wanted.",
    "search": "correction",
    "externalFrameColor": "d0e600",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Create reported questions",
    "description": "Say 2 reported questions:\n• Yes/No: He asked if you had called.\n• Wh-: She asked where I lived.",
    "search": "reported questions",
    "externalFrameColor": "d0e600",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Match with movement",
    "description": "Walk to match a question card with its reported version.",
    "search": "match",
    "externalFrameColor": "00d991",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Ask–report roleplay",
    "description": "Partner A asks (“Where do you live?”), B reports: She asked where I lived.",
    "search": "roleplay",
    "externalFrameColor": "00d991",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Sentence puzzle",
    "description": "Rearrange word cards into correct reported question: where / she / asked / was.",
    "search": "build",
    "externalFrameColor": "00d991",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Step for structure",
    "description": "Step forward if correct: He asked what time it was. Step back if incorrect.",
    "search": "movement",
    "externalFrameColor": "00d991",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Mime + report",
    "description": "Mime a question. Partner guesses: “Did you eat lunch?” → Report: He asked if I had eaten lunch.",
    "search": "mime",
    "externalFrameColor": "00d991",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Write reported questions",
    "description": "Write 3 reported questions:\n• “Is she here?” → He asked if she was there.\n• “What are you doing?” → She asked what I was doing.",
    "search": "writing",
    "externalFrameColor": "008cd5",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Correct the mistake",
    "description": "He asked where did I go. → He asked where I went.",
    "search": "correction",
    "externalFrameColor": "008cd5",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Fill in blanks",
    "description": "“Do you like it?” → She asked if I ___ it. (liked)",
    "search": "complete",
    "externalFrameColor": "008cd5",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Sort reported forms",
    "description": "Write 2 Wh- and 2 Yes/No questions in reported form.",
    "search": "sorting",
    "externalFrameColor": "008cd5",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Write conversation report",
    "description": "Imagine a teacher asked, “Why are you late?” → He asked why I was late.",
    "search": "writing",
    "externalFrameColor": "008cd5",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Ask and report",
    "description": "Ask 2 questions. Partner reports:\n• Where do you study? → She asked where I studied.",
    "search": "interview",
    "externalFrameColor": "e62100",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Quiz and report",
    "description": "Ask quiz questions and report answers:\n• “Do you play tennis?” → He said he did.",
    "search": "quiz",
    "externalFrameColor": "e62100",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Challenge round",
    "description": "One says: “What time did she call?” Partner reports: He asked what time she had called.",
    "search": "challenge",
    "externalFrameColor": "e62100",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Interview chain",
    "description": "Interview someone, then report what they said to the group.",
    "search": "chain",
    "externalFrameColor": "e62100",
    "internalFrameColor": "ff005b"
  },
  {
    "title": "Speed correction",
    "description": "Say wrong reported questions fast. Partner fixes: He asked where I lived.",
    "search": "correction",
    "externalFrameColor": "e62100",
    "internalFrameColor": "ff005b"
  }
]


























const secondPartPath = {
"c902db": "visual",
"d0e600": "auditory",
"00d991": "kinestetic",
"008cd5": "introverted",
"e62100": "extroverted",
}

const firstPartPath = {
"ff3600": "1.1",
"ff8f00": "1.2",
"ffc800": "2.1",
"ffe800": "2.2",
"e6ff00": "3.1",
"d9ff00": "3.2",
"91ff00": "4.1",
"81ff00": "4.2",
"00ff83": "5.1",
"00ff9c": "5.2",
"00ffdc": "6.1",
"00fff9": "6.2",
"00e3ff": "7.1",
"00d2ff": "7.2",
"0091ff": "8.1",
"005bff": "8.2",
"6f00ff": "9.1",
"9e00ff": "9.2",
"d900ff": "10.1",
"f200ff": "10.2",
"ff00f2": "11.1",
"ff00cb": "11.2",
"ff0097": "12.1",
"ff005b": "12.2",
}

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
                const movedFile = moveFile(path.join(downloadPath, renamed), card);
                if (movedFile) {
                    console.log('📦 Перемещён в:', movedFile);
                } else {
                    console.log('❌ Ошибка перемещения файла');
                }
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
    await page.keyboard.down('End');
    for (let i = 0; i < inputValue.length; i++) {
        await page.keyboard.press('Backspace');
    }
}

function moveFile(filePatch, card) {
    const { externalFrameColor, internalFrameColor } = card;
    const folderPath = path.join(downloadPath, firstPartPath[internalFrameColor.toLowerCase()], secondPartPath[externalFrameColor.toLowerCase()]);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const newFilePath = path.join(folderPath, path.basename(filePatch));
    fs.renameSync(filePatch, newFilePath);
    return newFilePath;
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

