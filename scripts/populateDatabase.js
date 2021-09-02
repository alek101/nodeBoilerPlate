/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const slugify = require('slugify');
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const bcrypt = require('bcrypt');
const {
  Category, User, Job, ReportReason, Location,
} = require('../models');
const environments = require('../config/environments');
const { generatePib } = require('../lib/misc');

mongoose.Promise = global.Promise;

// Create the database connection
mongoose.connect(environments.MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${environments.MONGO_DB}`);
});

// CONNECTION EVENTS
// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// When the connection is open
mongoose.connection.on('open', () => {
  console.log('Mongoose default connection is open');
  if (process.argv[2] === '--drop') {
    mongoose.connection.db.dropDatabase(() => {
      console.log('Database droped');
    });
  }
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});

const locations = [
  'Ada',
  'Aleksandrovac',
  'Aleksinac',
  'Alibunar',
  'Apatin',
  'Aranđelovac',
  'Arilje',
  'Azanja',
  'Babušnica',
  'Bač',
  'Bačka Palanka',
  'Bačka Topola',
  'Bački Petrovac',
  'Bačko Petrovo Selo',
  'Bajina Bašta',
  'Banatski Karlovac',
  'Banatsko Novo Selo',
  'Banja Koviljača',
  'Banja Rusanda',
  'Banja Vrujci',
  'Barajevo',
  'Batočina',
  'Bavanište',
  'Bečej',
  'Bela Crkva',
  'Bela Palanka',
  'Beočin',
  'Beograd',
  'Beograd | Batajnica',
  'Beograd | Čukarica',
  'Beograd | Novi Bg.',
  'Beograd | Palilula',
  'Beograd | Rakovica',
  'Beograd | Savski venac',
  'Beograd | Stari grad',
  'Beograd | Voždovac',
  'Beograd | Vračar',
  'Beograd | Zemun',
  'Beograd | Zvezdara',
  'Beška',
  'Blace',
  'Bogatić',
  'Bojnik',
  'Boljevac',
  'Bor',
  'Borča',
  'Bosilegrad',
  'Brus',
  'Bujanovac',
  'Crvenka',
  'Čačak',
  'Čelarevo',
  'Čoka',
  'Čurug',
  'Ćićevac',
  'Ćuprija',
  'Debeljača',
  'Despotovac',
  'Dimitrovgrad',
  'Divčibare',
  'Dolovo (kod Pančeva)',
  'Doljevac',
  'Feketić',
  'Futog',
  'Gadžin Han',
  'Golubac',
  'Golubinci',
  'Gornji Milanovac',
  'Grocka',
  'Horgoš',
  'Inđija',
  'Inostranstvo',
  'Irig',
  'Ivanjica',
  'Jagodina',
  'Jakovo',
  'Jošanička Banja',
  'Kačarevo',
  'Kać',
  'Kanjiža',
  'Kikinda',
  'Kladovo',
  'Knić',
  'Knjaževac',
  'Koceljeva',
  'Kopaonik',
  'Kosjerić',
  'Kosmaj',
  'Kosovska Mitrovica',
  'Kostolac',
  'Kovačica',
  'Kovilj',
  'Kovin',
  'Kragujevac',
  'Kraljevo',
  'Krupanj',
  'Kruševac',
  'Kučevo',
  'Kula',
  'Kuršumlija',
  'Kusadak',
  'Lajkovac',
  'Lapovo',
  'Lazarevac',
  'Lebane',
  'Leposavić',
  'Leskovac',
  'Loznica',
  'Lučani',
  'Lukovska Banja',
  'Ljig',
  'Ljubovija',
  'Majdanpek',
  'Mali Iđoš',
  'Mali Zvornik',
  'Mataruška Banja',
  'Medveđa',
  'Melenci',
  'Merošina',
  'Mionica',
  'Mladenovac',
  'Mol',
  'Negotin',
  'Niš',
  'Niška Banja',
  'Nova Pazova',
  'Nova Varoš',
  'Novi Banovci',
  'Novi Bečej',
  'Novi Kneževac',
  'Novi Pazar',
  'Novi Sad',
  'Obrenovac',
  'Odžaci',
  'Omoljica',
  'Opovo',
  'Padina',
  'Palić',
  'Pančevo',
  'Paraćin',
  'Pećinci',
  'Petrovac na Mlavi',
  'Petrovaradin',
  'Pirot',
  'Plandište',
  'Pojate',
  'Požarevac',
  'Požega',
  'Preševo',
  'Priboj',
  'Prijepolje',
  'Prokuplje',
  'Prolom Banja',
  'Pukovac',
  'Rača Kragujevačka',
  'Raška',
  'Ražanj',
  'Ruma',
  'Rumenka',
  'Ruski Krstur',
  'Senta',
  'Sevojno',
  'Sivac',
  'Sjenica',
  'Smederevo',
  'Smederevska Palanka',
  'Sokobanja',
  'Sombor',
  'Sopot',
  'Srbobran',
  'Sremska Kamenica',
  'Sremska Mitrovica',
  'Sremski Karlovci',
  'Stara Pazova',
  'Starčevo',
  'Stari Banovci',
  'Subotica',
  'Surčin',
  'Surdulica',
  'Svilajnac',
  'Svrljig',
  'Šabac',
  'Šid',
  'Šimanovci',
  'Štrpce',
  'Temerin',
  'Titel',
  'Topola',
  'Trstenik',
  'Tutin',
  'Ub',
  'Užice',
  'Valjevo',
  'Varvarin',
  'Velika Plana',
  'Veliko Gradište',
  'Veternik',
  'Vinča',
  'Vladičin Han',
  'Vladimirci',
  'Vlasotince',
  'Vojka',
  'Vranje',
  'Vranjska Banja',
  'Vrbas',
  'Vrdnik',
  'Vrnjačka Banja',
  'Vršac',
  'Zaječar',
  'Zlatibor',
  'Zrenjanin',
  'Zubin Potok',
  'Zvečan',
  'Žabalj',
  'Žagubica',
  'Žitorađa',
];

// NODE_ENV=development node ./scripts/populateDatabase.js
// --drop (Drop old db)
// password: pass1234

(async () => {
  // add locations
  const locs = locations.map((loc) => ({ name: loc }));
  await Location.insertMany(locs);

  // add users
  let users = [];
  for (let i = 1; i <= 10; i += 1) {
    const ratingsQuantity = Math.floor(Math.random() * 50) + 1;
    const min = ratingsQuantity * 1;
    const max = ratingsQuantity * 5;
    const pib = i % 3 === 0 ? generatePib(9) : undefined;
    const userName = faker.name.findName();
    users.push({
      name: userName,
      slugName: slugify(userName, { lower: true }),
      email: `test${i}@mail.com`,
      password: bcrypt.hashSync('pass1234', 1),
      ratingsSum: Math.floor(Math.random() * (max - min + 1)) + min,
      ratingsQuantity,
      phone: faker.phone.phoneNumberFormat(),
      location: locations[Math.floor(Math.random() * locations.length)],
      description: faker.lorem.sentences(2),
      isActive: true,
      pib,
    });
  }
  users[0].role = 'SuperAdmin';
  users = await User.insertMany(users);

  // add categories
  const categories = await Category.insertMany([
    { name: 'Kućni servisi', isTopCategories: true },
    { name: 'Privatni časovi', isTopCategories: true },
    { name: 'IT i dizajn', isTopCategories: true },
    { name: 'Fizički poslovi' },
    { name: 'Dostava' },
    { name: 'Trgovina i prodaja' },
    { name: 'Ugostiteljstvo' },
    { name: 'Online poslovi' },
    { name: 'Rad na terenu' },
    { name: 'Čuvanje i nega' },
    { name: 'Fitnes' },
    { name: 'Volontiranje' },
    { name: 'Ostalo' },
  ]);

  // add report reasons
  await ReportReason.insertMany([
    { reportReason: 'Lažna objava' },
    { reportReason: 'Zastareli sadržaj' },
    { reportReason: 'Uvredljiv sadržaj' },
    { reportReason: 'Ostalo' },
  ]);

  // add jobs
  const jobTypes = ['job', 'service'];
  const priceType = ['fixed', 'per hour'];
  let jobs = [];
  for (let i = 0; i < 300; i += 1) {
    let fromTime;
    let toTime;
    if (i % 2 === 0) {
      fromTime = '09:00';
      toTime = '17:00';
    }
    const jobTitle = faker.name.jobTitle();
    jobs.push({
      creator: users[Math.floor(Math.random() * users.length)]._id,
      title: jobTitle,
      slugTitle: slugify(jobTitle, { lower: true }),
      type: jobTypes[Math.floor(Math.random() * jobTypes.length)],
      price: faker.datatype.number(3000) + 1,
      priceType: priceType[Math.floor(Math.random() * priceType.length)],
      category: categories[Math.floor(Math.random() * categories.length)].name,
      location: locations[Math.floor(Math.random() * locations.length)],
      description: faker.lorem.sentences(10),
      tags: [faker.name.jobDescriptor(), faker.name.jobDescriptor(), faker.name.jobDescriptor()],
      fromDate: faker.date.past(),
      toDate: faker.date.recent(),
      fromTime,
      toTime,
    });
  }
  jobs = await Job.insertMany(jobs);

  // close connection
  console.log('Successfully populated database');
  await mongoose.connection.close();
})();
