import { db } from './db';
import { auth } from './lib/auth';

export const performStartupChecks = async () => {
  console.log('🔍 Performing startup checks...');

  try {
    // Check 1: Database connection
    console.log('📊 Checking database connection...');
    await db.execute('SELECT 1');
    console.log('✅ Database connection successful');

    // Check 2: Auth configuration
    console.log('🔐 Checking auth configuration...');
    console.log(
      'Auth baseURL:',
      process.env.BETTER_AUTH_URL || 'http://localhost:3000'
    );
    console.log('Trusted origins:', [
      'http://localhost:3001',
      'http://localhost:3000',
      'my-better-t-app://',
      ...(process.env.CORS_ORIGIN ? [process.env.CORS_ORIGIN] : []),
    ]);
    console.log('✅ Auth configuration loaded');

    // Check 3: Environment variables
    console.log('🌍 Checking environment variables...');
    const requiredEnvVars = ['BETTER_AUTH_SECRET', 'DATABASE_URL'];
    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
      console.warn('⚠️  Missing environment variables:', missingVars);
    } else {
      console.log('✅ All required environment variables present');
    }

    console.log('🚀 Startup checks completed successfully');
    return true;
  } catch (error) {
    console.error('❌ Startup check failed:', error);
    return false;
  }
};