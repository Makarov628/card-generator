const fs = require('fs');
const path = require('path')

const paths = fs.readdirSync('./clientApp/dist/cards', { recursive: true })

const json = paths.reduce((prev, curr, i, arr) => {
    const pathParts = curr.split(path.sep);
    const normalizePath = pathParts.join('/')

    let obj = prev;
    pathParts.forEach((part, i) => {
        if (!obj[part]) {
            obj[part] = {};
        }
        obj = obj[part]

        if (path.parse(part).ext == '.png') {
            obj.path = '/cards/' + normalizePath
            obj.name = part;
        }
    });

    return prev;
}, {})

fs.writeFileSync('./cards.json', JSON.stringify(json), { encoding: "utf8" })