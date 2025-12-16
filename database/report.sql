SELECT 
    c.name AS dataset_title, 
    cb.cohort_description AS description, 
    c.id AS dataset_id, 
    cb.cohort_web_site AS dataset_url, 
    (
        SELECT GROUP_CONCAT(DISTINCT lc.cancer SEPARATOR ', ')
        FROM cancer_count cc
        JOIN lu_cancer lc ON cc.cancer_id = lc.id
        WHERE cc.cohort_id = c.id
    ) AS primary_disease,
    GROUP_CONCAT(DISTINCT p.name SEPARATOR ', ') AS principal_investigators,
    cb.enrollment_total AS number_of_participants,
    c.acronym AS cohort_acronym,
    c.type AS cohort_type,
    (
        SELECT GROUP_CONCAT(DISTINCT ls.specimen SEPARATOR ', ')
        FROM specimen_count sc
        JOIN lu_specimen ls ON sc.specimen_id = ls.id
        WHERE sc.cohort_id = c.id
    ) AS types_of_biospecimens,
    cb.enrollment_year_start AS year_enrollment_started,
    cb.enrollment_year_end AS year_enrollment_ended,
    cb.enrollment_age_min AS minimum_age_at_baseline,
    cb.enrollment_age_max AS maximum_age_at_baseline
FROM 
    cohort c
JOIN 
    cohort_basic cb ON c.id = cb.cohort_id
JOIN 
    person p ON c.id = p.cohort_id
WHERE 
    p.category_id = 3
GROUP BY 
    c.id, 
    c.name, 
    cb.cohort_description, 
    cb.cohort_web_site, 
    cb.enrollment_total, 
    c.acronym, 
    c.type, 
    cb.enrollment_year_start, 
    cb.enrollment_year_end, 
    cb.enrollment_age_min, 
    cb.enrollment_age_max;