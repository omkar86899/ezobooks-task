import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'ezobooks-task',
  webDir: 'dist/ezobooks-task',
  server: {
    androidScheme: 'https'
  }
};

export default config;
