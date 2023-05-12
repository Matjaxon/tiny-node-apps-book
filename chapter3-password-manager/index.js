import bcrypt from 'bcrypt';
import promptModule from 'prompt-sync';
import { MongoClient } from 'mongodb';

const prompt = promptModule();
let hasPasswords = false;
const client = new MongoClient('mongodb://localhost:27017');
const dbName = 'passwordManager';

const saveNewPassword = async (password) => {
  const hash = bcrypt.hashSync(password, 10);
  await authCollection.insertOne({ type: 'auth', hash });
  console.log('Password has been saved!');
  showMenu();
};

const compareHashedPassword = async (password) => {
  const { hash } = await authCollection.findOne({ type: 'auth' });
  return await bcrypt.compare(password, hash);
};

const promptNewPassword = () => {
  const response = prompt('Enter a main password: ');
  saveNewPassword(response);
};

const promptOldPassword = async () => {
  const response = prompt('Enter your password: ');
  const result = await compareHashedPassword(response);
  if (result) {
    console.log('Password verfiied.');
    showMenu();
  } else {
    console.log('Password incorrect.');
    promptOldPassword();
  }
};

const showMenu = async () => {
  console.log(`
  1. View passwords
  2. Manage new passwords
  3. Verify password
  4. Exit
  `);
  const response = prompt('>');

  if (response === '1') await viewPasswords();
  else if (response === '2') await promptNewManagePassword();
  else if (response === '3') await promptOldPassword();
  else if (response === '4') process.exit();
  else {
    console.log(`That is an invalid response.`);
    showMenu();
  }
};

const viewPasswords = async () => {
  const passwords = await passwordsCollection.find({}).toArray();
  console.log(passwords);
  Object.entries(passwords).forEach(([key, value], index) => {
    console.log(`${index + 1}. ${key} => ${value}`);
  });
  showMenu();
};

const promptNewManagePassword = async () => {
  const source = prompt('Enter name for password: ');
  const password = prompt('Enter password to save: ');

  await passwordsCollection.findOneAndUpdate(
    { source },
    { $set: { password } },
    {
      returnNewDocument: true,
      upsert: true
    }
  );
  console.log(`Password for ${source} has been saved!`);
  showMenu();
};

const main = async () => {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const authCollection = db.collection('auth');
  const passwordsCollection = db.collection('passwords');
  const hashedPassword = await authCollection.findOne({
    type: 'auth'
  });
  hasPasswords = !!hashedPassword;
  return [passwordsCollection, authCollection];
};

const [passwordsCollection, authCollection] = await main();
if (!hasPasswords) promptNewPassword();
else promptOldPassword();
