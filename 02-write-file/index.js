const fs = require('fs');
const path = require('path');
const { stdin } = process;

fs.open(path.join(__dirname, 'text.txt'), 'w', (err) => {
  if (err) throw err;
  console.log( 
    '\n-----------------------------------------------------------------------\n          Файл был создан, введите текст для добавления в файл: \n-----------------------------------------------------------------------\n'
  );
});

stdin.on('data', (data) => {
  const dataExit = data.toString();
  const dataExit1 = data.toString().replace('\n', '').replace('\r', '');
  if (dataExit === 'exit' || dataExit === 'exit\n' || dataExit.trim() === 'exit' 
  ||  dataExit1 === 'exit' ||  dataExit1.trim() === 'exit') {
    console.log(
      '\n-----------------------------------------------------------------------\n Весь текст был добавлен в файл. Спасибо за работу, всего хорошего! :)\n-----------------------------------------------------------------------'
    );
    process.exit(1);
  }
  fs.appendFile(path.join(__dirname, 'text.txt'), data, (err) => {
    if (err) throw err;
  });
});
process.on('SIGINT', () => {
  console.log(
    '\n-----------------------------------------------------------------------\n Весь текст был добавлен в файл. Спасибо за работу, всего хорошего! :)\n-----------------------------------------------------------------------'
  );
  process.exit(1);
});