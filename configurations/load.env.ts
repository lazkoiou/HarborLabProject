import dotenv from 'dotenv';

/**
 * Loads environment variables form a .env file based on the current environment.
 * 
 * Common errors:
 * - "Cannot find module dotenv" -> type "npm install --save dotenv"
 */

const envUrlsFile = `./configurations/data/.env.urls`;
dotenv.config({ path: envUrlsFile });