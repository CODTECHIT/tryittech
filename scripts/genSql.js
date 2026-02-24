/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');


const trainings = JSON.parse(fs.readFileSync('src/data/trainings.json', 'utf8'));
const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));
const industries = JSON.parse(fs.readFileSync('src/data/industries.json', 'utf8'));

let sql = '-- DATABASE SETUP SCRIPT\n\n';

// Schema
sql += 'CREATE TABLE IF NOT EXISTS trainings (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    slug VARCHAR(255) UNIQUE NOT NULL,\n    title VARCHAR(255) NOT NULL,\n    description TEXT,\n    longDescription TEXT,\n    icon VARCHAR(100),\n    image TEXT,\n    modules JSON\n);\n\n';
sql += 'CREATE TABLE IF NOT EXISTS services (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    slug VARCHAR(255) UNIQUE NOT NULL,\n    title VARCHAR(255) NOT NULL,\n    icon VARCHAR(100),\n    image TEXT,\n    secondaryImage TEXT,\n    shortDescription TEXT,\n    fullDescription TEXT,\n    benefits JSON,\n    process JSON\n);\n\n';
sql += 'CREATE TABLE IF NOT EXISTS industries (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    slug VARCHAR(255) UNIQUE NOT NULL,\n    name VARCHAR(255) NOT NULL,\n    image TEXT,\n    secondaryImage TEXT,\n    icon VARCHAR(100),\n    info TEXT,\n    overview TEXT,\n    segments JSON,\n    solutions JSON,\n    insights JSON,\n    edge JSON\n);\n\n';

// Escape function
const esc = (str) => {
    if (typeof str !== 'string') return '';
    return str.replace(/'/g, "''");
};

// Insert Trainings
trainings.forEach(t => {
    sql += `INSERT INTO trainings (slug, title, description, longDescription, icon, image, modules) VALUES ('${esc(t.slug)}', '${esc(t.title)}', '${esc(t.description)}', '${esc(t.longDescription)}', '${esc(t.icon)}', '${esc(t.image)}', '${JSON.stringify(t.modules).replace(/'/g, "''")}');\n`;
});
sql += '\n';

// Insert Services
services.forEach(s => {
    sql += `INSERT INTO services (slug, title, icon, image, secondaryImage, shortDescription, fullDescription, benefits, process) VALUES ('${esc(s.slug)}', '${esc(s.title)}', '${esc(s.icon)}', '${esc(s.image)}', '${esc(s.secondaryImage)}', '${esc(s.shortDescription)}', '${esc(s.fullDescription)}', '${JSON.stringify(s.benefits).replace(/'/g, "''")}', '${JSON.stringify(s.process).replace(/'/g, "''")}');\n`;
});
sql += '\n';

// Insert Industries
industries.forEach(i => {
    sql += `INSERT INTO industries (slug, name, image, secondaryImage, icon, info, overview, segments, solutions, insights, edge) VALUES ('${esc(i.slug)}', '${esc(i.name)}', '${esc(i.image)}', '${esc(i.secondaryImage)}', '${esc(i.icon)}', '${esc(i.info)}', '${esc(i.overview)}', '${JSON.stringify(i.segments).replace(/'/g, "''")}', '${JSON.stringify(i.solutions).replace(/'/g, "''")}', '${JSON.stringify(i.insights).replace(/'/g, "''")}', '${JSON.stringify(i.edge).replace(/'/g, "''")}');\n`;
});

fs.writeFileSync('setup.sql', sql);
console.log('setup.sql generated successfully.');
