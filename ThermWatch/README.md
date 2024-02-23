# ThermWatch

ThermWatch is a temperature monitoring solution designed for high-value assets located inside plants. It serves plant operators by providing temperature data insights on assets, enabling better planning and operation of plant facilities.

## Features

- Single page dashboard application with real-time temperature data display.
- Database management with models for company, plant, asset, and sensor profiles.
- Ability to save and import database states with `.tmdb` extension.
- Configurable UI with dark and light modes and color customization through CSS.
- DAQ configuration for data acquisition using Modbus and/or MQTT protocols.
- Alarm system with visual feedback, system notifications, and email alerts.
- Demo mode with mock data generation for demonstration purposes.
- Extensive charting and data visualization using Chart.js and Angular.

## Setup Instructions

1. Ensure you have the latest version of Node.js installed on your system.
2. Clone the repository to your local machine.
3. Navigate to the ThermWatch directory and run `npm install` to install all dependencies.
4. To initialize the database, run `node db/init_db.js`. This will create a new SQLite database in the `db` folder.
5. Start the server by running `node server.js`.
6. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Deployment

To deploy ThermWatch, you can use any standard Node.js hosting service. Follow the hosting service's instructions for deploying a Node.js application.

## Testing

Run `npm test` in the ThermWatch directory to execute the test suite. Ensure all tests pass before deploying or making changes to the application.

## Making Changes

To make changes to the application:

- Update the Angular components located in the `public/js/` directory.
- Modify the CSS files in `public/css/` for styling changes.
- Adjust the database models in `src/models/` as needed.
- Controllers and routes can be modified in the `src/controllers/` and `src/routes/` directories, respectively.

To add a logo to the app, place the logo image in the `public/assets/` directory and reference it in the `public/index.html` file.

## Application Overview

ThermWatch uses the following stack:

- Backend: Node.js
- Database: SQLite
- Frontend: Angular
- Charts: Chart.js
- Communication Protocols: Modbus, MQTT

## Libraries and Dependencies

- `express`: Web application framework for Node.js.
- `sqlite3`: SQLite client for Node.js.
- `chart.js`: Simple yet flexible JavaScript charting for designers & developers.
- `angular`: Platform for building mobile and desktop web applications.
- `node-modbus`: Modbus client and server for Node.js.
- `mqtt`: MQTT client for Node.js.

## Licensing

This application is intended for commercial use. Please refer to the `LICENSE.txt` file for the full license text. The End-User License Agreement (EULA) can be found in the `EULA.txt` file.

## Help and Support

For help and support, access the help menu within the application and refer to the license and EULA section for legal information.