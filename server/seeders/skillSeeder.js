const mongoose = require('mongoose');
const Skill = require('../models/Skill');
const connectDB = require('../config/db');

const skills = [
  {
    name: 'JavaScript',
    level: 'Advanced',
    category: 'Frontend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  },
  {
    name: 'React',
    level: 'Advanced',
    category: 'Frontend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },
  {
    name: 'Node.js',
    level: 'Intermediate',
    category: 'Backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
  },
  {
    name: 'MongoDB',
    level: 'Intermediate',
    category: 'Database',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
  },
  {
    name: 'Express',
    level: 'Intermediate',
    category: 'Backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'
  },
  {
    name: 'Laravel',
    level: 'Intermediate',
    category: 'Backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg'
  },
  {
    name: 'Livewire',
    level: 'Intermediate',
    category: 'Frontend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/livewire/livewire-original.svg'
  },
  {
    name: 'PostgreSQL',
    level: 'Intermediate',
    category: 'Database',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
  },
  {
    name: 'MySQL',
    level: 'Intermediate',
    category: 'Database',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
  },
  {
    name: 'RESTful API',
    level: 'Advanced',
    category: 'Backend',
    logo: 'https://cdn-icons-png.flaticon.com/512/3838/3838759.png'
  },
  {
    name: 'Tailwind CSS',
    level: 'Advanced',
    category: 'Frontend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
  },
  {
    name: 'Bootstrap',
    level: 'Intermediate',
    category: 'Frontend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg'
  },
  {
    name: 'ShadCN UI',
    level: 'Intermediate',
    category: 'Frontend',
    logo: 'https://images.seeklogo.com/logo-png/51/1/shadcn-ui-logo-png_seeklogo-519786.png'
  },
  {
    name: 'Python',
    level: 'Intermediate',
    category: 'Backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  }
];

async function skillSeeder() {
  try {
    await connectDB();

    await Skill.deleteMany();
    await Skill.insertMany(skills);

    console.log('🧠 Skills seeded!');
  } catch (err) {
    console.error('❌ Failed to seed skills:', err);
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = skillSeeder;

if (require.main === module) {
  skillSeeder();
}
