const fs = require('fs');
const path = require('path');

console.log(
  '\n-----------------------------------------------------------------------\n                       Начало работ над страницей!\n-----------------------------------------------------------------------'
);

console.log('\n ~~~~~~~~~~~~~~~~~~~~~~~~~Крутятся шестеренки~~~~~~~~~~~~~~~~~~~~~~~~~\n');

// ---------------------------------- project-dist ----------------------------------

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

// ---------------------------------- assets  ----------------------------------

let pathFolder = 'assets';

function copyFile(folder) {
  fs.readdir(
    path.join(__dirname, folder),
    { withFileTypes: true },
    (err, filesData) => {
      if (err)
        console.log(
          'К сожалению, в процессе работы произошла ошибка! :(\n',
          err
        );
      else {
        for (const file of filesData) {
          if (!file.isFile()) {
            fs.mkdir(
              path.join(__dirname, 'project-dist', 'assets', file.name),
              { recursive: true },
              (err) => {
                if (err) throw err;
              },
              copyFile(folder + '/' + file.name)
            );
          } else {
            fs.copyFile(
              path.join(__dirname, folder, file.name),
              path.join(__dirname, 'project-dist', folder, file.name),
              (err) => {
                if (err) throw err;
              }
            );
          }
        }
      }
    }
  );
}

fs.access(path.join(__dirname, 'project-dist', 'assets'), (err) => {
  if (!err) {
    fs.rm(
      path.join(__dirname, 'project-dist', 'assets'),
      { recursive: true },
      (err) => {
        if (err) throw err;
        fs.mkdir(
          path.join(__dirname, 'project-dist', 'assets'),
          { recursive: true },
          (err) => {
            if (err) throw err;
            copyFile(pathFolder);
            console.log('\n ~~~~~~~~~~~~~~~~~~~~~~~~~Крутятся шестеренки~~~~~~~~~~~~~~~~~~~~~~~~~\n');
          }
        );
      }
    );
  } else {
    fs.mkdir(
      path.join(__dirname, 'project-dist', 'assets'),
      { recursive: true },
      (err) => {
        if (err) throw err;
        copyFile(pathFolder);
        console.log('\n ~~~~~~~~~~~~~~~~~~~~~~~~~Крутятся шестеренки~~~~~~~~~~~~~~~~~~~~~~~~~\n');
      }
    );
  }
});

// ---------------------------------- html ----------------------------------

fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err) => {
  if (err) throw err;
});

let htmlFile = '';

const stream = fs.createReadStream(
  path.join(__dirname, 'template.html'),
  'utf-8'
);
stream.on('data', (chunk) => {
  htmlFile += chunk;
});
stream.on('end', () => {
  fs.readdir(
    path.join(__dirname, 'components'),
    { withFileTypes: true },
    (err, files) => {
      if (err) console.log(err);
      else {
        files = files.filter(
          (elem) =>
            elem.isFile() &&
            path.parse(path.join(__dirname, 'components', elem.name)).ext ===
              '.html'
        );
        files.forEach((elem) => {
          const stream = fs.createReadStream(
            path.join(__dirname, 'components', elem.name),
            'utf-8'
          );
          let dataComponent = '';
          stream.on('data', (chunk) => {
            dataComponent += chunk;
          });
          stream.on('end', () => {
            htmlFile = htmlFile.replace(
              `{{${elem.name.slice(0, -5)}}}`,
              dataComponent
            );
            console.log('\n ~~~~~~~~~~~~~~~~~~~~~~~~~Крутятся шестеренки~~~~~~~~~~~~~~~~~~~~~~~~~\n');
            fs.writeFile(
              path.join(__dirname, 'project-dist', 'index.html'),
              htmlFile,
              (err) => {
                if (err) throw err;
              }
            );
          });
          stream.on('error', (error) => console.log('Error', error.message));
          console.log('\n ~~~~~~~~~~~~~~~~~~~~~~~~~Крутятся шестеренки~~~~~~~~~~~~~~~~~~~~~~~~~\n');
        });
      }
    }
  );
});
stream.on('error', (error) => console.log('Error', error.message));

// ---------------------------------- styles ----------------------------------

fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
  if (err) throw err;
});
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
        stream.on('data', (chunk) => {
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'style.css'),
            chunk,
            (err) => {
              if (err) throw err;
            }
          );
        });
        stream.on('error', (error) => console.log('Error', error.message));
      });
    }
  }
);

process.on('exit', () => console.log(
  '\n-----------------------------------------------------------------------\n                      Работы над страницей завершены!\n-----------------------------------------------------------------------'
));