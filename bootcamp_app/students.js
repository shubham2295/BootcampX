const { Pool } = require('pg');

const config = {
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
};

const pool = new Pool(config);
const args = process.argv.slice(2);
pool.connect();

pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, [`%${args[0]}%`, args[1]])
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  }).catch(err => console.error('query error', err.stack));

