const fs = require('fs');
const path = require('path');
fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
  if (err) throw err;
});
console.log(
  '\n-----------------------------------------------------------------------\n                 Производятся работы над файлом bundle.css!\n-----------------------------------------------------------------------'
);
fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      files = files.filter(
        (elem) =>
          elem.isFile() &&
          path.parse(path.join(__dirname, 'styles', elem.name)).ext === '.css'
      );
      files.forEach((elem) => {
        const stream = fs.createReadStream(
          path.join(__dirname, 'styles', elem.name),
          'utf-8'
        );
        console.log('\n ~~~~~~~~~~~~~~~~~~~~~~~~~Крутятся шестеренки~~~~~~~~~~~~~~~~~~~~~~~~~\n');
        stream.on('data', (chunk) => {
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
            chunk,
            (err) => {
              if (err) throw err;
            }
          );
          console.log('\n ~~~~~~~~~~~~~~~~~~~~~~~~~Крутятся шестеренки~~~~~~~~~~~~~~~~~~~~~~~~~\n');
        });
        stream.on('error', (error) => console.log('Error', error.message));
      });
    }
  }
);

process.on('exit', () => console.log(
  '\n-----------------------------------------------------------------------\n                 Работы над файлом bundle.css - завершены!\n-----------------------------------------------------------------------'
));