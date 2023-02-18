// import { writeFileSync } from 'fs';
// import { createInterface } from 'readline';
import { appendFileSync } from 'fs';
import prompt from 'prompt';
import { createObjectCsvWriter } from 'csv-writer';

const csvWriter = createObjectCsvWriter({
  path: './output/contacts.csv',
  append: true,
  header: [
    { id: 'name', title: 'NAME' },
    { id: 'number', title: 'NUMBER' },
    { id: 'email', title: 'EMAIL' }
  ]
});

class Person {
  constructor(name = '', number = '', email = '') {
    this.name = name;
    this.number = number;
    this.email = email;
  }
  saveToCSV() {
    try {
      const { name, number, email } = this;
      csvWriter.writeRecords([{ name, number, email }]);
      console.log(`${name} Saved!`);
    } catch (err) {
      console.error(err);
    }
  }
}

prompt.start();
prompt.message = '';

const startApp = async () => {
  const person = new Person();
  const responses = await prompt.get([
    {
      name: 'name',
      description: 'Contact Name'
    },
    {
      name: 'number',
      description: 'Contact Number'
    },
    {
      name: 'email',
      description: 'Contact email'
    }
  ]);
  Object.assign(person, responses);
  person.saveToCSV();
  const { again } = await prompt.get([
    {
      name: 'again',
      description: 'Add another contact? [y to add another]'
    }
  ]);
};

startApp();
