const mongoose = require('mongoose');
const { Location } = require('../models');

const environments = require('../config/environments');

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

// NODE_ENV=development node ./scripts/createLocations.js
// --drop (Drop old locations collection if exists)
(async () => {
  // add locations
  const locs = locations.map((loc) => ({ name: loc }));
  await Location.insertMany(locs);

  // close connection
  console.log('Successfully added locations');
  await mongoose.connection.close();
})();