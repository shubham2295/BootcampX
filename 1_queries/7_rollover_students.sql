SELECT students.name, cohorts.name, students.start_date, cohorts.start_date
FROM students 
JOIN cohorts
ON students.cohort_id = cohorts.id
AND students.start_date <> cohorts.start_date;