-- Seed data for ThermWatch database

-- Inserting company profiles
INSERT INTO company (name, address, city, state_province, country, zip_postal_code, phone_number, email) VALUES
('ThermoCo', '123 Industrial Way', 'Techtown', 'Techstate', 'Techland', '12345', '123-456-7890', 'contact@thermoco.com');

-- Inserting plant profiles
INSERT INTO plant (name, address, city, state_province, country, zip_postal_code, phone_number, email) VALUES
('Tech Plant', '456 Production Rd', 'Techtown', 'Techstate', 'Techland', '12345', '123-456-7891', 'plant@thermoco.com');

-- Inserting asset profiles
INSERT INTO asset (name, plant_id, capacity, rating, temperature_threshold) VALUES
('Reactor 1', (SELECT id FROM plant WHERE name = 'Tech Plant'), 5000, 'A', 100),
('Condenser 1', (SELECT id FROM plant WHERE name = 'Tech Plant'), 3000, 'B', 80);

-- Inserting sensor profiles
INSERT INTO sensor (name, sensor_family, sensor_type, sensor_variant, asset_id, position) VALUES
('TempSensor A1', 'ThermoSeries', 'Temperature', 'A100', (SELECT id FROM asset WHERE name = 'Reactor 1'), 0),
('TempSensor A2', 'ThermoSeries', 'Temperature', 'A100', (SELECT id FROM asset WHERE name = 'Reactor 1'), 90),
('TempSensor B1', 'ThermoSeries', 'Temperature', 'B200', (SELECT id FROM asset WHERE name = 'Condenser 1'), 180),
('TempSensor B2', 'ThermoSeries', 'Temperature', 'B200', (SELECT id FROM asset WHERE name = 'Condenser 1'), 270);

-- Note: The above SQL statements assume the existence of `id` columns in the `company`, `plant`, and `asset` tables
-- which are auto-incremented and used as foreign keys for the relationships between tables.