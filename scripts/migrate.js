/* eslint-disable @typescript-eslint/no-require-imports */
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


async function migrate() {
    console.log('Starting migration...');

    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || '3306'),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    try {
        // Create Trainings Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS trainings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(255) UNIQUE NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                longDescription TEXT,
                icon VARCHAR(100),
                image TEXT,
                modules JSON
            )
        `);
        console.log('Trainings table ready.');

        // Create Services Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS services (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(255) UNIQUE NOT NULL,
                title VARCHAR(255) NOT NULL,
                icon VARCHAR(100),
                image TEXT,
                secondaryImage TEXT,
                shortDescription TEXT,
                fullDescription TEXT,
                benefits JSON,
                process JSON
            )
        `);
        console.log('Services table ready.');

        // Create Industries Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS industries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                image TEXT,
                secondaryImage TEXT,
                icon VARCHAR(100),
                info TEXT,
                overview TEXT,
                segments JSON,
                solutions JSON,
                insights JSON,
                edge JSON
            )
        `);
        console.log('Industries table ready.');

        // Migrate Trainings
        const trainingsPath = path.join(process.cwd(), 'src/data/trainings.json');
        if (fs.existsSync(trainingsPath)) {
            const trainings = JSON.parse(fs.readFileSync(trainingsPath, 'utf8'));
            for (const t of trainings) {
                await pool.query(
                    'INSERT IGNORE INTO trainings (slug, title, description, longDescription, icon, image, modules) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [t.slug, t.title, t.description, t.longDescription, t.icon, t.image, JSON.stringify(t.modules)]
                );
            }
            console.log('Trainings migrated.');
        }

        // Migrate Services
        const servicesPath = path.join(process.cwd(), 'src/data/services.json');
        if (fs.existsSync(servicesPath)) {
            const services = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));
            for (const s of services) {
                await pool.query(
                    'INSERT IGNORE INTO services (slug, title, icon, image, secondaryImage, shortDescription, fullDescription, benefits, process) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [s.slug, s.title, s.icon, s.image, s.secondaryImage, s.shortDescription, s.fullDescription, JSON.stringify(s.benefits), JSON.stringify(s.process)]
                );
            }
            console.log('Services migrated.');
        }

        // Migrate Industries
        const industriesPath = path.join(process.cwd(), 'src/data/industries.json');
        if (fs.existsSync(industriesPath)) {
            const industries = JSON.parse(fs.readFileSync(industriesPath, 'utf8'));
            for (const i of industries) {
                await pool.query(
                    'INSERT IGNORE INTO industries (slug, name, image, secondaryImage, icon, info, overview, segments, solutions, insights, edge) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [i.slug, i.name, i.image, i.secondaryImage, i.icon, i.info, i.overview, JSON.stringify(i.segments), JSON.stringify(i.solutions), JSON.stringify(i.insights), JSON.stringify(i.edge)]
                );
            }
            console.log('Industries migrated.');
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await pool.end();
        process.exit();
    }
}

migrate();
