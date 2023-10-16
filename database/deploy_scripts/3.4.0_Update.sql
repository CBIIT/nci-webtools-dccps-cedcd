use cedcd;
UPDATE cohort_basic
SET cohort_type = 'Etiology'
WHERE cohort_acronym != 'Pathways';

UPDATE cohort
SET `type` = 'Etiology'
WHERE acronym != 'Pathways';