
DELIMITER //

/*
Fix bug [SS-1545] Missing or incorrect Cohort website links
*/

update cohort_basic set cohort_web_site = "https://www.maelstrom-research.org/mica/individual-study/csdlh#/" where cohort_id =20//

update cohort_basic set cohort_web_site = "https://healthcare.utah.edu/huntsmancancerinstitute/clinical-trials/colocare-consortium.php" where cohort_id =74//

update cohort_basic set cohort_web_site = "https://snd.gu.se/en/catalogue/study/ext0015" where cohort_id =78//

update cohort_basic set cohort_web_site = "Not Available" where cohort_id =56//

update cohort_basic set cohort_web_site = "https://www.ed.ac.uk/generation-scotland/our-resources/scottish-family-health-study" where cohort_id =15//

update cohort_basic set cohort_web_site = "https://www.mayo.edu/research/labs/lymphoma-epidemiology/research/molecular-epidemiology-resource" where cohort_id =47//

update cohort_basic set cohort_web_site = "https://www.mayo.edu/research/labs/lymphoma-epidemiology/research/lymphoma-epidemiology-outcomes-study" where cohort_id =46//

update cohort_basic set cohort_web_site = "http://www.biobank.umu.se/biobank/nshds/" where cohort_id =44//

update cohort_basic set cohort_web_site = "http://www.nurseshealthstudy.org/" where cohort_id =27//

update cohort_basic set cohort_web_site = "http://www.nurseshealthstudy.org/" where cohort_id =26//

update cohort_basic set cohort_web_site = "https://biometry.nci.nih.gov/cdas/plco/" where cohort_id =30//

update cohort_basic set cohort_web_site = "https://www.sph.nus.edu.sg/research/schs" where cohort_id =62//

update cohort_basic set cohort_web_site = "https://staging.mc.vanderbilt.edu/swhs-smhs/index_smhs.html" where cohort_id =32//

update cohort_basic set cohort_web_site = "https://snd.gu.se/en/catalogue/study/ext0018	" where cohort_id =75//

----- 