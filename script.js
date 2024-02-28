const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const csvFileName = 'urenregistratie.csv';

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  let data = [];

  while (true) {
    const name = await askQuestion('Naam: ');
    const project = await askQuestion('Project: ');
    const hours = parseFloat(await askQuestion('Gewerkte uren: '));

    const entry = {
      naam: name,
      project: project,
      uren: hours
    };

    data.push(entry);

    const continueInput = await askQuestion('Wil je meer uren invoeren? (ja/nee): ');
    if (continueInput.toLowerCase() !== 'ja') {
      break;
    }
  }

  const csvContent = data.map(entry => `${entry.naam},${entry.project},${entry.uren}`).join('\n');
  
  fs.appendFile(csvFileName, csvContent, (err) => {
    if (err) throw err;
    console.log(`Gegevens zijn opgeslagen in ${csvFileName}`);
    rl.close();
  });
}

main();
