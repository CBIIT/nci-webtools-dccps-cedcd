use cedcd;
UPDATE cohort_basic
SET cohort_type = 'Etiology'
WHERE cohort_acronym != 'Pathways';

UPDATE cohort
SET `type` = 'Etiology'
WHERE acronym != 'Pathways';

UPDATE enrollment_count
SET `type_id` = 1
WHERE cohort_id != 45;