
DELIMITER //

/*
[SS-1545] Fix bug  Missing or incorrect Cohort website links [09072018]
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

update cohort_basic set cohort_web_site = "https://www.schs.pitt.edu/methods/shanghai-cohort-study/" where cohort_id =65//

update cohort_basic set cohort_web_site = "https://staging.mc.vanderbilt.edu/swhs-smhs/index_smhs.html" where cohort_id =32//

update cohort_basic set cohort_web_site = "https://snd.gu.se/en/catalogue/study/ext0018	" where cohort_id =75//

/*
Agricultural Health Study (AHS):
Delete link https://aghealth.nih.gov/ under data, biospecimen, and authorship policies
*/


update cohort_basic set request_procedures_web_url ="" where cohort_id=52//


/*
Breakthrough Generations Study:
Add http://www.breakthroughgenerations.org.uk/ to “Cohort Website” purple button link;
Add http://live-breakthrough-generations.pantheonsite.io/about-study/what-information-collected/questionnaire to “questionnaires”
Add http://live-breakthrough-generations.pantheonsite.io/researchers to “DATA, BIOSPECIMEN, AND AUTHORSHIP POLICIES”
*/

update cohort_basic set cohort_web_site="http://www.breakthroughgenerations.org.uk/" where cohort_id=17//


INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '17' as a, '0' as b, '1' as c, 'http://live-breakthrough-generations.pantheonsite.io/about-study/what-information-collected/questionnaire' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '17' AND attachment_type=0  AND category= 1 AND website = 'http://live-breakthrough-generations.pantheonsite.io/about-study/what-information-collected/questionnaire'
) LIMIT 1//



INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '17' as a, '0' as b, '2' as c, 'http://live-breakthrough-generations.pantheonsite.io/researchers' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '17' AND attachment_type=0  AND category=2 AND website = 'http://live-breakthrough-generations.pantheonsite.io/researchers'
) LIMIT 1//

/*
Breast Cancer Surveillance Consortium Research Resource (BCSC):
Add http://www.bcsc-research.org/data/elements.html#questionnaires to “questionnaires”
*/


INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '60' as a, '0' as b, '1' as c, 'http://www.bcsc-research.org/data/elements.html#questionnaires' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '60' AND attachment_type=0  AND category=1 AND website = 'http://www.bcsc-research.org/data/elements.html#questionnaires'
) LIMIT 1//


/*
California Teachers Study (CTS):
Add https://www.calteachersstudy.org/past-questionnaires to “questionnaires”
Add https://www.calteachersstudy.org/collaborations to “DATA, BIOSPECIMEN, AND AUTHORSHIP POLICIES”
*/

INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '66' as a, '0' as b, '1' as c, 'https://www.calteachersstudy.org/past-questionnaires' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '66' AND attachment_type=0  AND category=1 AND website = 'https://www.calteachersstudy.org/past-questionnaires'
) LIMIT 1//


INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '66' as a, '0' as b, '2' as c, 'https://www.calteachersstudy.org/collaborations' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '66' AND attachment_type=0  AND category=2 AND website = 'https://www.calteachersstudy.org/collaborations'
) LIMIT 1//


  
/*
Canadian Study of Diet, Lifestyle and Health (CSDLH):
Missing “Cohort Website” purple button, No
Add https://www.maelstrom-research.org/mica/individual-study/csdlh#/ to “Cohort Website” purple button link

*/

Update cohort_basic set cohort_web_site = "https://www.maelstrom-research.org/mica/individual-study/csdlh#/" where cohort_id=20//




/*
Cancer Prevention Study II Nutrition Cohort:
REPLACE https://www.cancer.org/research/we-conduct-cancer-research/epidemiology/cancer-prevention-questionnaires.html for “questionnaires”*/


Update cohort_attachment set website = "https://www.cancer.org/research/we-conduct-cancer-research/epidemiology/cancer-prevention-questionnaires.html" where attachment_id=99//


/*
CLUE I:
REPLACE https://www.jhsph.edu/research/centers-and-institutes/george-w-comstock-center-for-public-health-research-and-prevention/CLUE_I_1974_DCQ.pdf for “questionnaires”;
Replace https://www.jhsph.edu/research/centers-and-institutes/george-w-comstock-center-for-public-health-research-and-prevention/clue_research_activities.html for DATA, BIOSPECIMEN, AND AUTHORSHIP POLICIES”
*/

Update cohort_attachment set website = "https://www.jhsph.edu/research/centers-and-institutes/george-w-comstock-center-for-public-health-research-and-prevention/CLUE_I_1974_DCQ.pdf" where attachment_id=126//

Update cohort_basic set request_procedures_web_url = "https://www.jhsph.edu/research/centers-and-institutes/george-w-comstock-center-for-public-health-research-and-prevention/clue_research_activities.html" where cohort_id=72//

/*
CLUE II
REPLACE https://www.jhsph.edu/research/centers-and-institutes/george-w-comstock-center-for-public-health-research-and-prevention/1989_CLUE_II_Baseline_Q.pdf and
https://www.jhsph.edu/research/centers-and-institutes/george-w-comstock-center-for-public-health-research-and-prevention/1989_CLUE_II_Food_Frequency_Q.pdf for “questionnaires”;
Replace https://www.jhsph.edu/research/centers-and-institutes/george-w-comstock-center-for-public-health-research-and-prevention/clue_research_activities.html for DATA, BIOSPECIMEN, AND AUTHORSHIP POLICIES”
*/

Update cohort_attachment set website = "https://www.jhsph.edu/research/centers-and-institutes/george-w-comstock-center-for-public-health-research-and-prevention/1989_CLUE_II_Food_Frequency_Q.pdf" where attachment_id=127//



INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '73' as a, '0' as b, '1' as c, 'https://www.jhsph.edu/research/centers-and-institutes/george-w-comstock-center-for-public-health-research-and-prevention/1989_CLUE_II_Baseline_Q.pdf' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '73' AND attachment_type=0  AND category=1 AND website = 'https://www.jhsph.edu/research/centers-and-institutes/george-w-comstock-center-for-public-health-research-and-prevention/1989_CLUE_II_Baseline_Q.pdf'
) LIMIT 1//


Update cohort_basic set request_procedures_web_url = "https://www.jhsph.edu/research/centers-and-institutes/george-w-comstock-center-for-public-health-research-and-prevention/clue_research_activities.html" where cohort_id=73//



/*
Cohort of Swedish Men:
Add https://snd.gu.se/en/catalogue/study/ext0015 to “Cohort Website” purple button link,
Add “Not Provided” to questionnaires  [change status does not works, hard delete ]
*/


Update cohort_basic set cohort_web_site = "https://snd.gu.se/en/catalogue/study/ext0015" where cohort_id=78//


delete from cohort_attachment where attachment_id=130//

/*
ColoCare Consortium (ColoCare):
Missing “Cohort Website” purple button,[No]
Add https://healthcare.utah.edu/huntsmancancerinstitute/clinical-trials/colocare-consortium.php to “Cohort Website” purple button link*/





Update cohort_basic set cohort_web_site = "https://healthcare.utah.edu/huntsmancancerinstitute/clinical-trials/colocare-consortium.php" where cohort_id=74//


/*

The Canadian Partnership for Tomorrow Project (CPTP):
ADD http://www.partnershipfortomorrow.ca/cptp-data-biosamples/ to questionnaires,
ADD http://www.partnershipfortomorrow.ca/accessing-data-biosamples/ to DATA, BIOSPECIMEN, AND AUTHORSHIP POLICIES


*/



INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '64' as a, '0' as b, '1' as c, 'http://www.partnershipfortomorrow.ca/cptp-data-biosamples/' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '64' AND attachment_type=0  AND category=1 AND website = 'http://www.partnershipfortomorrow.ca/cptp-data-biosamples/'
) LIMIT 1//



INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '64' as a, '0' as b, '2' as c, 'http://www.partnershipfortomorrow.ca/accessing-data-biosamples/' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '64' AND attachment_type=0  AND category=2 AND website = 'http://www.partnershipfortomorrow.ca/accessing-data-biosamples/'
) LIMIT 1//


/*
Detroit Research on Cancer Survivorship (Detroit ROCS):
Add Not Provided next to the “Cohort Website” purple button link and remove current link,
Add Not Provided under Questionnaires and remove current pdf links*/

delete from cohort_attachment where attachment_id=37//
delete from cohort_attachment where attachment_id=38//

/*
European Prospective Investigation into Cancer and Nutrition (EPIC):
Add http://epic.iarc.fr/about/studyresources.php to questionnaires,
Add http://epic.iarc.fr/access/index.php to DATA, BIOSPECIMEN, AND AUTHORSHIP POLICIES
*/


INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '71' as a, '0' as b, '1' as c, 'http://epic.iarc.fr/about/studyresources.php' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '71' AND attachment_type=0  AND category=1 AND website = 'http://epic.iarc.fr/about/studyresources.php'
) LIMIT 1//


INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '71' as a, '0' as b, '2' as c, 'http://epic.iarc.fr/access/index.php' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '71' AND attachment_type=0  AND category=2 AND website = 'http://epic.iarc.fr/access/index.php'
) LIMIT 1//



/*

Golestan Cohort Study (GCS):
Add Not Provided next to the “Cohort Website” purple button link and remove current link,
Add Not Provided under Questionnaires and remove current pdf links,
Add Not Provided under DATA, BIOSPECIMEN, AND AUTHORSHIP POLICIES and remove current pdf links

[attachment_type 0 and attachment_type 1 ] 

*/


Update cohort_basic set cohort_web_site = "" where cohort_id=68//

delete from cohort_attachment where cohort_id=68 and category !=0//


Update cohort_basic set request_procedures_web_url = "" where cohort_id=68//




/*

Generation Scotland: Scottish Family Health Study (GS:SFHS):
Add https://www.ed.ac.uk/generation-scotland/our-resources/scottish-family-health-study to Generation Scotland: The Scottish Family Health Study to the “Cohort Website” purple button link,
replace https://www.ed.ac.uk/generation-scotland/our-resources/scottish-family-health-study to Generation Scotland: The Scottish Family Health Study to questionnaires,
replace https://www.ed.ac.uk/generation-scotland/using-resources/access-to-resources to DATA, BIOSPECIMEN, AND AUTHORSHIP POLICIES


*/

Update cohort_basic set cohort_web_site = "https://www.ed.ac.uk/generation-scotland/our-resources/scottish-family-health-study" where cohort_id=15//

Update cohort_basic set request_procedures_web_url = "" where cohort_id=15//


delete from cohort_attachment where cohort_id=15 and category !=0//



INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '15' as a, '0' as b, '1' as c, 'https://www.ed.ac.uk/generation-scotland/our-resources/scottish-family-health-study' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '15' AND attachment_type=0  AND category=1 AND website = 'https://www.ed.ac.uk/generation-scotland/our-resources/scottish-family-health-study'
) LIMIT 1//



INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '15' as a, '0' as b, '2' as c, 'https://www.ed.ac.uk/generation-scotland/using-resources/access-to-resources' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '15' AND attachment_type=0  AND category=2 AND website = 'https://www.ed.ac.uk/generation-scotland/using-resources/access-to-resources'
) LIMIT 1//




/*
Health Professionals Follow-up Study (HPFS):
Replace https://sites.sph.harvard.edu/hpfs/hpfs-questionnaires/ to questionnaires,
Replace https://sites.sph.harvard.edu/hpfs/for-collaborators/ to DATA, BIOSPECIMEN, AND AUTHORSHIP POLICIES
*/

delete from cohort_attachment where cohort_id=61 and category !=0//

Update cohort_basic set request_procedures_web_url = "" where cohort_id=61//


INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '61' as a, '0' as b, '1' as c, 'https://sites.sph.harvard.edu/hpfs/hpfs-questionnaires/' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '61' AND attachment_type=0  AND category=1 AND website = 'https://sites.sph.harvard.edu/hpfs/hpfs-questionnaires/'
) LIMIT 1//


INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '61' as a, '0' as b, '2' as c, 'https://sites.sph.harvard.edu/hpfs/for-collaborators/' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '61' AND attachment_type=0  AND category=2 AND website = 'https://sites.sph.harvard.edu/hpfs/for-collaborators/'
) LIMIT 1//


/*

Iowa Women's Health Study:
replace https://www.cancer.umn.edu/our-research/research-programs/specs-program/research-studies to questionnaires
Add Not Provided under DATA, BIOSPECIMEN, AND AUTHORSHIP POLICIES and remove current pdf links

*/

delete from cohort_attachment where cohort_id=22 and  category!=0//


INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '22' as a, '0' as b, '1' as c, 'https://www.cancer.umn.edu/our-research/research-programs/specs-program/research-studies' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '22' AND attachment_type=0  AND category=1 AND website = 'https://www.cancer.umn.edu/our-research/research-programs/specs-program/research-studies'
) LIMIT 1//


/*
Lymphoma Epidemiology of Outcomes (LEO) cohort: Molecular Epidemiology Resource Subcohort:
Add https://www.mayo.edu/research/labs/lymphoma-epidemiology/research/molecular-epidemiology-resource to the “Cohort Website” purple button link ,
Replace broken pdf links with https://www.mayo.edu/research/documents/6-mayo-mer-baseline-enrollment/doc-20400290 for questionnaires,
Add Not Provided under DATA, BIOSPECIMEN, AND AUTHORSHIP POLICIES
*/


delete from cohort_attachment where cohort_id=47 and category !=0//

Update cohort_basic set cohort_web_site = "https://www.mayo.edu/research/labs/lymphoma-epidemiology/research/molecular-epidemiology-resource" where cohort_id=47//


INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '47' as a, '0' as b, '1' as c, 'https://www.mayo.edu/research/documents/6-mayo-mer-baseline-enrollment/doc-20400290' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '47' AND attachment_type=0  AND category=1 AND website = 'https://www.mayo.edu/research/documents/6-mayo-mer-baseline-enrollment/doc-20400290'
) LIMIT 1//


/*
Lymphoma Epidemiology of Outcomes (LEO) cohort: Phase 1 :
Add https://www.mayo.edu/research/labs/lymphoma-epidemiology/research/lymphoma-epidemiology-outcomes-study to the “Cohort Website” purple button link,
Replace broken pdf links with https://www.mayo.edu/research/documents/13-mayo-leo-baseline-enrollment-questionnaire/doc-20400301 for questionnaires,
Add Not Provided under DATA, BIOSPECIMEN, AND AUTHORSHIP POLICIES

*/


delete from cohort_attachment where cohort_id=46 and category !=0//

Update cohort_basic set cohort_web_site = "https://www.mayo.edu/research/labs/lymphoma-epidemiology/research/lymphoma-epidemiology-outcomes-study" where cohort_id=46//


INSERT INTO `cedcd`.`cohort_attachment` (`cohort_id`, `attachment_type`, `category`, `website`, `status`, `create_time`) 
SELECT * FROM (SELECT  '46' as a, '0' as b, '1' as c, 'https://www.mayo.edu/research/documents/13-mayo-leo-baseline-enrollment-questionnaire/doc-20400301' as d, '1' as e, '2018-09-09 00:00:00' as f) as tmp
WHERE NOT EXISTS (
    SELECT * FROM `cedcd`.`cohort_attachment` WHERE cohort_id = '46' AND attachment_type=0  AND category=1 AND website = 'https://www.mayo.edu/research/documents/13-mayo-leo-baseline-enrollment-questionnaire/doc-20400301'
) LIMIT 1//




