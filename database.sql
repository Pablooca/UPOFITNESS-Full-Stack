-- SCHEMA: upofitness

-- DROP SCHEMA IF EXISTS upofitness ;

CREATE SCHEMA IF NOT EXISTS upofitness
    AUTHORIZATION postgres;

-- Ejecuta esto tras conectarte a la base de datos deseada (por ejemplo, upofitness)

DROP TABLE IF EXISTS appointment CASCADE;
DROP TABLE IF EXISTS worker CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS gym CASCADE;

CREATE TABLE gym (
	id SERIAL PRIMARY KEY,
	name VARCHAR(256) NOT NULL,
	direction VARCHAR(256) NOT NULL,
	city VARCHAR(256) NOT NULL,
	timetable VARCHAR(256)
);

CREATE TABLE users (
	dni VARCHAR(9) PRIMARY KEY,
	name VARCHAR(256) NOT NULL,
	birth_date DATE NOT NULL,
	direction VARCHAR(256) NOT NULL,
	iban VARCHAR(256) NOT NULL,
	phone_number VARCHAR(256) NOT NULL,
	email VARCHAR(256) NOT NULL,
	username VARCHAR(256) NOT NULL,
	password VARCHAR(256) NOT NULL
);

CREATE TABLE worker (
	dni VARCHAR(9) PRIMARY KEY,
	name VARCHAR(256) NOT NULL,
	birth_date DATE NOT NULL,
	iban VARCHAR(256) NOT NULL,
	email VARCHAR(256) NOT NULL,
	username VARCHAR(256) NOT NULL,
	password VARCHAR(256) NOT NULL,
	id_gym INT,
	FOREIGN KEY (id_gym) REFERENCES gym(id)
);

CREATE TABLE appointment (
	id SERIAL PRIMARY KEY,
	date DATE NOT NULL,
	id_worker VARCHAR(9),
	id_user VARCHAR(9),
	FOREIGN KEY (id_worker) REFERENCES worker(dni),
	FOREIGN KEY (id_user) REFERENCES users(dni)
);

-- Insert gyms
INSERT INTO gym (name, direction, city, timetable) VALUES 
('Calle Francos', 'Calle Francos 40','Sevilla', 'Monday-Friday 7:00-22:30, Saturday-Sunday 8:00-21:00'),
('Calle Tarifa', 'Calle Tarifa 8','Sevilla', 'Monday-Friday 7:00-22:30, Saturday-Sunday 8:00-21:00'),
('Calle Pagés del Corro','Calle Pagés del Corro 142','Sevilla','Monday-Friday 7:00-22:30, Saturday-Sunday 8:00-21:00'),
('Luis Montoto','Calle Luis Montoto 132','Sevilla','Monday-Friday 7:00-22:30, Saturday-Sunday 8:00-21:00'),
('Avenida Juan Pablo II','Avenida Juan Pablo II 1','Sevilla','Monday-Friday 7:00-22:30, Saturday-Sunday 8:00-21:00'),
('Avenida de Hytasa','Avenida de Hytasa 3','Sevilla','Monday-Friday 7:00-22:30, Saturday-Sunday 8:00-21:00'),
('Kansas City','Av. de Kansas City, s/n','Sevilla','Reopening on September 30th at 14:00'),
('Gimnasio Sevilla CC Vega del Rey','Calle la Pañoleta 4','Sevilla','Monday-Friday 7:00-22:30, Saturday-Sunday 8:00-21:00'),
('Calle Doctor Fleming 47','Calle Doctor Fleming 47','Sevilla','Monday-Friday 7:00-22:30, Saturday-Sunday 8:00-21:00'),
('Palacio de Congresos','Gta. Palacio de congresos s/n, Centro Comercial Zona Este','Sevilla','Monday-Friday 6:00-23:00, Saturday-Sunday 8:00-21:00'),
('Avenida de Palmas Atlas','Avenida de Palmas Altas 1','Sevilla','Monday-Friday 7:00-22:30, Saturday-Sunday 8:00-21:00'),
('Avenida de Jerez 55','Avenida de Jerez 55','Sevilla','Monday-Friday 7:00-22:30, Saturday-Sunday 8:00-21:00'),
('Salvador de Madariaga', 'Avda. Salvador de Madariaga, 7', 'A Coruña', 'Monday-Friday 6:00-23:00, Saturday-Sunday 8:00-21:00');