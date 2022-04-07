const { Pool } = require('pg');

const config = {
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
};

const pool = new Pool(config);
pool.connect();


pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM cohorts
JOIN students ON students.cohort_id = cohorts.id
JOIN assistance_requests ON students.id = assistance_requests.student_id
JOIN teachers ON teachers.id = assistance_requests.teacher_id
WHERE cohorts.name LIKE $1
ORDER BY teacher;`, [`%${process.argv[2]}%`]
)
  .then((res) => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch(err => {
    console.log('Query Error', err.stack);
  });