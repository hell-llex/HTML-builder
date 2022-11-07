const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      console.log(
        '\n-----------------------------------------------------------------------\n                          Файлы текущего каталога:\n-----------------------------------------------------------------------'
      );
      files = files.filter((elem) => elem.isFile());
      files.forEach((elem) => {
        fs.stat(
          path.join(__dirname, 'secret-folder', elem.name),
          (err, stats) => {
            if (err) {
              console.error(err);
              return;
            }
            const sizeFile = stats.size / 1024 + ' kb';
            console.log(
              '-----------------------------------------------------------------------'
            );
            console.log(
              `    ${
                path.parse(path.join(__dirname, 'secret-folder', elem.name))
                  .name
              } - ${path
                .parse(path.join(__dirname, 'secret-folder', elem.name))
                .ext.slice(1)} - ${sizeFile}`
            );
          }
        );
      });
    }
  }
);

process.on('exit', () => console.log(
  '-----------------------------------------------------------------------'
));