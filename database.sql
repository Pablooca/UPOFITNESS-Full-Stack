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

-- Insert users
INSERT INTO users VALUES
('89357704J', 'Encarnacion Ojeda Estevez', '1979-04-10', 'Jardines Lope De Vega, 55, 44472, Odón(Teruel)', '7104fe6be28c7a25ead2b5ae7264f8e3bc67e850a2bc5613565c7866bc581d9a', '710418466', 'encarnacion_79@gmail.com', 'encarnacion_79', '45339f605585ca4c869c795e6f0410f3'),
('19366628F', 'Manuel Jose Lafuente Fraile', '1973-07-18', 'Glorieta Mayor, 12, 45970, Cervera De Los Montes(Toledo)', 'a3349af6ca5e41a33801c80e777b818bc2be17498fd46dec5f8012d2c35b9224', '658790774', 'manueljose_73@gmail.com', 'manueljose_73', '92160035a409d3389c35fb4f15d47d38'),
('31636878X', 'Carmen Barroso Bello', '1984-01-31', 'Praza Antonio Machado, 32, 03266, Benifato(alicante/alacant)', '94bf430495b814d0e93f2c193658856343cef41b2ac281f22f5609bfedde2230', '785528730', 'carmen_84@gmail.com', 'carmen_84', 'd09ec6e2a38f350575660b2f3b83f110'),
('29503208G', 'Pablo Oca Galeano', '2003-03-04', 'Calle Salto de Alvarado 2, 41007, Sevilla', 'b0c36cc7c4293549aa21fc10bd32dfb3c144e1f3f90d44d344dbd2fd8b482ef5', '611459274', 'pocagal@gmail.com', 'pocagal', '8e4462a99a74c00b798003f4aff5c5f67ce0db438b0714a7c99de2e17feca88c');

-- Insert workers
INSERT INTO worker VALUES
('29503208G', 'Pablo Oca Galeano', '2003-03-04', 'b0c36cc7c4293549aa21fc10bd32dfb3c144e1f3f90d44d344dbd2fd8b482ef5', 'pocagal-admin@gmail.com', 'pocagal-admin', '8e4462a99a74c00b798003f4aff5c5f67ce0db438b0714a7c99de2e17feca88c', 4);

-- Insert appointments
INSERT INTO appointment (date, id_worker, id_user) VALUES 
('2025-02-15', '29503208G', '89357704J'),
('2025-05-25', '29503208G', '19366628F');


