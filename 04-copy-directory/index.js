const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
});
fs.readdir(
  path.join(__dirname, 'files-copy'),
  { withFileTypes: true },
  (err, filesData) => {
    if (err)
      console.log('К сожалению, в процессе работы произошла ошибка! :(\n', err);
    else {
      for (const file of filesData) {
        fs.unlink(path.join(__dirname, 'files-copy', file.name), (err) => {
          if (err) throw err;
        });
      }
    }
  }
);

fs.readdir(
  path.join(__dirname, 'files'),
  { withFileTypes: true },
  (err, filesData) => {
    if (err)
      console.log('К сожалению, в процессе работы произошла ошибка! :(\n', err);
    else {
      for (const file of filesData) {
        fs.copyFile(
          path.join(__dirname, 'files', file.name),
          path.join(__dirname, 'files-copy', file.name),
          (err) => {
            if (err) throw err;
          }
        );
      }
    }
  }
);

process.on('exit', () => console.log(
  '\n-----------------------------------------------------------------------\n                 Директория была успешно скопированна :)\n-----------------------------------------------------------------------'
));