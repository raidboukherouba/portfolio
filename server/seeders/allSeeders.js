const certificationSeeder = require('./certificationSeeder');
const profileSeeder = require('./profileSeeder');
const projectSeeder = require('./projectSeeder');
const skillSeeder = require('./skillSeeder');
const diplomasSeeder = require('./diplomaSeeder');
const userSeeder = require('./userSeeder');

async function runAllSeeders() {
  try {
    await certificationSeeder();
    await profileSeeder();
    await projectSeeder();
    await skillSeeder();
    await diplomasSeeder();
    await userSeeder();
    console.log('🌱 All seeders completed successfully!');
  } catch (error) {
    console.error('❌ Error running seeders:', error);
  }
}

runAllSeeders();
