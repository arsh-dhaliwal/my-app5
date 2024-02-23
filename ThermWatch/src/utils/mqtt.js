```javascript
const mqtt = require('mqtt');
const { mqttConfig } = require('../config/config');
const { SensorModel } = require('../models/sensorModel');

class MQTTClient {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  connect() {
    this.client = mqtt.connect(mqttConfig.brokerUrl, {
      clientId: mqttConfig.clientId,
      clean: true,
      connectTimeout: 4000,
      username: mqttConfig.username,
      password: mqttConfig.password,
      reconnectPeriod: 1000,
    });

    this.client.on('connect', () => {
      console.log('MQTT Client Connected');
      this.isConnected = true;
      this.subscribeToTopics();
    });

    this.client.on('reconnect', () => {
      console.log('MQTT Client Reconnecting...');
    });

    this.client.on('error', (err) => {
      console.error('MQTT Client Error:', err);
      this.client.end();
    });

    this.client.on('message', (topic, message) => {
      this.handleMessage(topic, message);
    });

    this.client.on('close', () => {
      console.log('MQTT Client Disconnected');
      this.isConnected = false;
    });
  }

  subscribeToTopics() {
    // Subscribe to sensor data topic
    this.client.subscribe(mqttConfig.topics.sensorData, { qos: 1 }, (err) => {
      if (err) {
        console.error('Subscribe to topics error:', err);
      } else {
        console.log(`Subscribed to topic: ${mqttConfig.topics.sensorData}`);
      }
    });
  }

  handleMessage(topic, message) {
    try {
      const payload = JSON.parse(message.toString());
      if (topic === mqttConfig.topics.sensorData) {
        this.processSensorData(payload);
      }
    } catch (e) {
      console.error('Error handling MQTT message:', e);
    }
  }

  processSensorData(data) {
    // Process and save sensor data to the database
    const { sensorId, temperature } = data;
    SensorModel.update({ temperature }, { where: { id: sensorId } })
      .then(() => {
        console.log(`Sensor data updated for sensor ID: ${sensorId}`);
      })
      .catch((error) => {
        console.error('Error updating sensor data:', error);
      });
  }

  disconnect() {
    if (this.client) {
      this.client.end(() => {
        console.log('MQTT Client Disconnected');
      });
    }
  }
}

module.exports = {
  MQTTClient,
};
```