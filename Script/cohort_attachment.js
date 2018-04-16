CREATE TABLE cohort_attachment (
  attachment_id int(11) not null AUTO_INCREMENT,
  cohort_id int(11) not null,
  attachment_type int(1) not null,
  category int(2) not null,
  filename varchar(100),
  website varchar(200),
  status int(1) default 1,
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (attachment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into cohort_attachment(cohort_id,
    attachment_type,
    category,
    filename,
    website,
    status) 
values
insert into cohort_attachment(cohort_id,
    attachment_type,
    category,
    filename,
    website,
    status) 
values
(18,1,1,'Calle_2002_Cancer_Nutrition Survey Study Design.pdf','',1),
(22,1,1,'IWHS Description and Protocol.pdf','',1),
(22,1,2,'IWHS Data Sharing Procedures - December 2014.pdf','',1),
(56,1,0,'2017-048ques_073117.pdf','',1),
(56,1,0,'2017-048ques_cg_073117.pdf','',1),
(57,1,0,"SJLIFE Adolescent's Health_2015.pdf",'',1),
(57,1,0,'SJLIFE Behavior Survey 11-17 Yrs_2015.pdf','',1),
(57,1,0,'SJLIFE Behavior Survey Self Report_2015.pdf','',1),
(57,1,0,'SJLIFE Behavior Survey_2015.pdf','',1),
(57,1,0,'SJLIFE Health Habits Survey 11-17 yrs_2015.pdf','',1),
(57,1,0,'SJLIFE Health Habits Survey 5-10 yrs_2015.pdf','',1),
(57,1,0,'SJLIFE Health Habits Survey_Self Report_2015.pdf','',1),
(57,1,0,'SJLIFE Home Minor_2016.pdf','',1),
(57,1,0,'SJLIFE Home Survey_2016.pdf','',1),
(57,1,0,"SJLIFE Men's Health_2015.pdf",'',1),
(57,1,0,'SJLIFE Home Survey_2016.pdf','',1),
(57,1,0,"SJLIFE Women's Health_2015.pdf",'',1),
(57,1,0,'SJLIFEassessment battery.pdf','',1),
(58,1,2,'agreement_SNMC.pdf','',1),
(16,1,2,'Suggestions for Applicants Proposing Research that Uses Adventist Health Study.pdf','',1),
(16,1,2,'Resource Sharing Plan for AHS-2.pdf','',1),
(24,1,1,'MCCS EOI  scientific protocol  management.pdf','',1),
(24,1,0,'CoreFUP Int AdminV13.pdf','',1),
(24,1,0,'Drug inventory sheet.pdf','',1),
(24,1,0,'Eating habits - Green FFQ (Databook).pdf','',1),
(24,1,0,'Eating habits - Green FFQ.pdf','',1),
(24,1,0,'Feasibility study - diet record.pdf','',1),
(24,1,0,'Feelings.pdf','',1),
(24,1,0,'FUp1 Extra comments sheet.pdf','',1),
(24,1,0,'FUp1 Questionnaire - B&W.pdf','',1),
(24,1,0,'FUp1 Questionnaire - Colour.pdf','',1),
(24,1,0,'FUp2 Core Questionnaire v15.pdf','',1),
(24,1,0,'FUp2 Diet Questionnaire.pdf','',1),
(24,1,0,'FUp2 Feelings Questionnaire.pdf','',1),
(24,1,0,'FUp2 Mens Questionnaire.pdf','',1),
(24,1,0,'Lifestyle Qx (Databook) - English.pdf','',1),
(24,1,0,'Lifestyle Qx - English.pdf','',1),
(24,1,0,'Lifestyle Qx answer sheet.pdf','',1),
(24,1,0,'Medications record.pdf','',1),
(24,1,0,'Periods Qx sheet.pdf','',1),
(24,1,0,'Portion size qx.pdf','',1),
(24,1,0,'Supplementary answer sheet.pdf','',1),
(24,1,0,'Supplementary childbirth sheet.pdf','',1),
(24,1,0,'Telephone interviewing.pdf','',1),
(24,1,0,'Validation study - diet qxs (1995).pdf','',1),
(34,1,0,'WHS QQ through 2014.pdf','',1),
(38,1,0,'WHS QQ through 2014.pdf','',1),
(46,1,1,'LEO protocol v2015 07 01.pdf','',1),
(46,1,2,'LEO Resource Sharing Plan FINAL 2015 07 01.pdf','',1),
(46,1,3,'LEO Guidelines for External Collaborators.pdf','',1),
(46,1,0,'LEO-PHASE1_Baseline_Enrollment_Form.pdf','',1),
(46,1,0,'LEO-PHASE1_Baseline_Enrollment_Form_SPANISH.pdf','',1),
(46,1,0,'LEO-PHASE1_FU_12.24.36_month.pdf','',1),
(46,1,0,'LEO-PHASE1_FU_18.30_month.pdf','',1),
(46,1,0,'LEO-PHASE1_FU_6_month.pdf','',1),
(46,1,0,'LEO-PHASE1_Risk_Factor_Qx.pdf','',1),
(47,1,0,'LEO-MER Patient Reported Annual FU.pdf','',1),
(47,1,0,'LEO-MER_Enrollment-1.pdf','',1),
(47,1,0,'LEO-MER_Enrollment-2.pdf','',1),
(47,1,0,'LEO-MER_Farming_Qx.pdf','',1),
(47,1,0,'LEO-MER_Female_Qx.pdf','',1),
(47,1,0,'LEO-MER_FFQ.pdf','',1),
(47,1,0,'LEO-MER_FU3YR.pdf','',1),
(47,1,0,'LEO-MER_FU6YR.pdf','',1),
(47,1,0,'LEO-MER_FU9YR.pdf','',1),
(47,1,0,'LEO-MER_Main_Qx.pdf','',1),
(47,1,0,'LEO-MER_QOL_FU.pdf','',1),
(47,1,3,'LEO Guidelines for External Collaborators.pdf','',1),
(47,1,1,'LEO protocol v2015 07 01.pdf','',1),
(47,1,2,'LEO Resource Sharing Plan FINAL 2015 07 01.pdf','',1),
(57,1,0,'SJLIFE Health Habits Survey_2015.pdf','',1),
(62,1,2,'Research Data Request Procedure SCS_SCHS.pdf','',1),
(62,1,3,'Research Data and Resources Application Form_SCS_SCHS.pdf','',1),
(60,1,1,'BCSC__Ballard_Barbash_AJR_1997.pdf','',1),
(57,1,0,'SJLIFE Post-Visit Survey.pdf','',1),
(63,1,0,"Men's Baseline Questionnaire.pdf",'',1),
(63,1,0,"Women's Baseline Questionnaire.pdf",'',1),
(63,1,1,'VITprotocol.pdf','',1),
(63,1,2,'VITAL data use .pdf','',1),
(65,1,2,'Research Data and Resources Application Form_SCS_SCHS.pdf','',1),
(65,1,2,'Research Data Request Procedure SCS_SCHS.pdf','',1),
(68,1,0,'GEMINI-questionnaire for NCI.pdf','',1),
(68,1,1,'GCS protocol-CEDCD.pdf','',1),
(68,1,4,'Authorship agreement for the Golestan Cohort Study.pdf','',1),
(69,1,3,'MEC Data and Sample Sharing Plan.pdf','',1)








(14,0,3,'','https://www.whi.org/researchers/Document%20%20Ancillary%20Studies/Apply%20for%20AS/AS%20Policy.pdf',1),
(14,0,4,'','https://www.whi.org/researchers/Documents%20%20Write%20a%20Paper/PP%20policy.pdf',1),
(14,0,2,'','https://www.whi.org/researchers/Document%20%20Ancillary%20Studies/Apply%20for%20AS/AS%20Policy.pdf',1),
(14,0,2,'','https://www.whi.org/researchers/Documents%20%20Write%20a%20Paper/PP%20policy.pdf',1),
(14,0,1,'','https://www.whi.org/researchers/studydoc/SitePages/Protocol%20and%20Consents.aspx',1),
(60,0,0,'','http://breastscreening.cancer.gov/data/elements.html',1),
(60,0,2,'','http://breastscreening.cancer.gov/work/',1),
(60,0,4,'','http://breastscreening.cancer.gov/work/',1),
(15,0,2,'','http://www.ed.ac.uk/files/atoms/files/gsmapp_access_policy_v6-7_december_2016_final_0.pdf',1),
(15,0,3,'','http://www.ed.ac.uk/files/atoms/files/gsmapp_access_policy_v6-7_december_2016_final_0.pdf',1),
(15,0,4,'','http://www.ed.ac.uk/files/atoms/files/gsmapp_access_policy_v6-7_december_2016_final_0.pdf',1),
(15,0,1,'','http://www.ed.ac.uk/generation-scotland/using-resources/resources/scottish-family-health-study',1),
(15,0,0,'','http://www.ed.ac.uk/generation-scotland/using-resources/resources/scottish-family-health-study',1),
(24,0,4,'','http://www.pedigree.org.au/downloads/PEDIGREE_PUBLICATION_GUIDELINES_POLICY_v2.5.pdf',1),
(24,0,3,'','http://www.pedigree.org.au/downloads/PEDIGREE_DATA_BIOSPECIMEN_ACCESS_POLICY_2.3.2.pdf',1),
(29,0,0,'','http://phs.bwh.harvard.edu/',1),
(30,0,1,'','https://biometry.nci.nih.gov/cdas/plco/',1),
(33,0,1,'','http://www.mc.vanderbilt.edu/swhs-smhs/',1),
(51,0,3,'','https://www.kreftregisteret.no/en/Research/Janus-Serum-Bank/Project-handling/How-to-apply-for-serum-samples/',1),
(52,0,2,'','http://aghealth.nih.gov/collaboration/process.html',1),
(52,0,0,'','http://aghealth.nih.gov/collaboration/questionnaires.html',1),
(16,0,0,'','adventisthealthstudy.org',1),
(16,0,2,'','https://wiki.ahs2.org/doku.php',1)














































(66,0,4,'','https://www.calteachersstudy.org/',1),
(70,0,4,'','www.coloncfr.org/publications',1),
(76,0,4,'','http://www.bcfamilyregistry.org/for-researchers/initiate-collaborations',1),
(15,0,4,'','http://www.ed.ac.uk/files/atoms/files/gsmapp_access_policy_v6-7_decembe',1),
(18,0,4,'','www.cancer.org/research/we-conduct-cancer-research/epidemiology.html',1),
(24,0,4,'','http://www.pedigree.org.au/downloads/PEDIGREE_PUBLICATION_GUIDE',1),
(28,0,4,'','http://nyuwhs.med.nyu.edu/for-researchers',1),
(30,0,4,'','https://biometry.nci.nih.gov/cdas/',1),
(31,0,4,'','https://ors.southerncommunitystudy.org/',1),
(32,0,4,'','http://www.mc.vanderbilt.edu/swhs-smhs/',1),
(39,0,4,'','https://www2.cscc.unc.edu/aric/pubs-policies-and-forms-pg',1),
(44,0,4,'','http://www.biobank.umu.se/biobank/biobank---for-researchers/nshds/',1),
(49,0,4,'','http://swog.org/Visitors/Download/Policies/Policy24_Publications.pdf',1),
(50,0,4,'','http://www.swog.org/Visitors/Download/Policies/Policy24_Publications.pdf',1),
(54,0,4,'','https://www.nihaarpstars.com',1)
(






































(34,0,2,'','http://www.meb.ki.se/~eliwei_2011/wlh/wlh_documents/',1),
(66,0,2,'','https://www.calteachersstudy.org/',1),
(68,0,2,'','https://dceg2.cancer.gov/gemshare/',1),
(70,0,2,'','www.coloncfr.org/collaboration',1),
(71,0,2,'','http://epic.iarc.fr/access/index.php',1),
(76,0,2,'','http://www.bcfamilyregistry.org/for-researchers/initiate-collaborations',1),
(15,0,2,'','http://www.ed.ac.uk/files/atoms/files/gsmapp_access_policy_v6-7_decembe',1),
(18,0,2,'','www.cancer.org/research/we-conduct-cancer-research/epidemiology.html',1),
(24,0,2,'','http://www.pedigree.org.au/downloads/PEDIGREE_DATA_BIOSPECIMEN_',1),
(26,0,2,'','www.nurseshealthstudy.org/researchers',1),
(27,0,2,'','www.nurseshealthstudy.org/researchers',1),
(28,0,2,'','http://nyuwhs.med.nyu.edu/for-researchers',1),
(30,0,2,'','https://biometry.nci.nih.gov/cdas/',1),
(31,0,2,'','https://ors.southerncommunitystudy.org/',1),
(32,0,2,'','http://www.mc.vanderbilt.edu/swhs-smhs/',1),
(33,0,2,'','http://www.mc.vanderbilt.edu/swhs-smhs/',1),
(39,0,2,'','https://www2.cscc.unc.edu/aric/distribution-agreements',1),
(49,0,2,'','http://swog.org/Visitors/Download/Policies/Policy43.pdf',1),
(50,0,2,'','http://www.swog.org/Visitors/Download/Policies/Policy43.pdf',1),
(53,0,2,'','http://www.compass.fhcrc.org/caretWeb/requests/requesting.aspx',1),
(54,0,2,'','https://www.nihaarpstars.com',1),
(55,0,2,'','https://www.sisterstudystars.org',1),
(16,0,2,'','wiki.ahs2.org',1),
(61,0,2,'','https://content.sph.harvard.edu/hpfs/hpfs_collaborators.htm',1),
(66,0,3,'','https://www.calteachersstudy.org/',1),
(68,0,3,'','https://dceg2.cancer.gov/gemshare/',1),
(70,0,3,'','www.coloncfr.org/collaboration',1),
(71,0,3,'','http://epic.iarc.fr/access/index.php',1),
(76,0,3,'','http://www.bcfamilyregistry.org/for-researchers/initiate-collaborations',1),
(15,0,3,'','http://www.ed.ac.uk/files/atoms/files/gsmapp_access_policy_v6-7_decembe',1),
(18,0,3,'','www.cancer.org/research/we-conduct-cancer-research/epidemiology.html',1),
(24,0,3,'','http://www.pedigree.org.au/downloads/PEDIGREE_DATA_BIOSPECIMEN_',1),
(26,0,3,'','www.nurseshealthstudy.org/researchers',1),
(27,0,3,'','www.nurseshealthstudy.org/researchers',1),
(28,0,3,'','http://nyuwhs.med.nyu.edu/for-researchers',1),
(30,0,3,'','https://biometry.nci.nih.gov/cdas/',1),
(31,0,3,'','https://ors.southerncommunitystudy.org/',1),
(32,0,3,'','http://www.mc.vanderbilt.edu/swhs-smhs/',1),
(33,0,3,'','http://www.mc.vanderbilt.edu/swhs-smhs/',1),
(39,0,3,'','https://www2.cscc.unc.edu/aric/ancillary-studies-pfg',1),
(49,0,3,'','http://swog.org/Visitors/TranslationalMed.asp',1),
(50,0,3,'','http://www.swog.org/Visitors/TranslationalMed.asp',1),
(53,0,3,'','http://www.compass.fhcrc.org/caretWeb/requests/requesting.aspx',1),
(55,0,3,'','https://www.sisterstudystars.org',1),
(16,0,3,'','wiki.ahs2.org',1),
(61,0,3,'','https://content.sph.harvard.edu/hpfs/hpfs_collaborators.htm',1)



























(66,0,1,'','https://www.calteachersstudy.org/'),
(75,0,1,'','http://www.oapublishinglondon.com/article/943 '),
(76,0,1,'','http://www.bcfamilyregistry.org/about-us/our-history'),
(15,0,1,'','http://www.ed.ac.uk/generation-scotland/using-resources/resources/scottish'),
(31,0,1,'','http://www.southerncommunitystudy.org/'),
(32,0,1,'','http://www.mc.vanderbilt.edu/swhs-smhs/'),
(39,0,1,'','https://www2.cscc.unc.edu/aric/cohort-forms'),
(48,0,1,'','https://www.whi.org/studies/SitePages/Home.aspx '),
(49,0,1,'','http://swog.org/Visitors/select/'),
(50,0,1,'','http://swog.org/Visitors/pcpt/'),
(51,0,1,'','https://academic.oup.com/ije/article/46/2/403/2617162/Cohort-Profile-The-J'),
(53,0,1,'','http://www.compass.fhcrc.org/caretWeb/about/caret_protocol_407.pdf'),
(78,0,1,'','http://www.oapublishinglondon.com/article/943 '),
(
(34,0,0,'','http://www.meb.ki.se/~eliwei_2011/wlh/wlh_documents/',1),
(14,0,0,'','www.whi.org/researchers/studydoc/SitePages/Forms.aspx',1),
(66,0,0,'','https://www.calteachersstudy.org/',1),
(69,0,0,'','http://www.uhcancercenter.org/research/the-multiethnic-cohort-study-mec',1),
(70,0,0,'','www.coloncfr.org/questionnaires',1),
(72,0,0,'','www.jhsph.edu/comstockcenter',1),
(73,0,0,'','www.jhsph.edu/comstockcenter',1),
(75,0,0,'','https://snd.gu.se/en/catalogue/search/SMC',1),
(76,0,0,'','http://www.bcfamilyregistry.org/for-researchers/questionnaires',1),
(13,0,0,'','https://atbcstudy.cancer.gov/documentation/',1),
(15,0,0,'','http://www.ed.ac.uk/generation-scotland/using-resources/resources/scottish',1),
(18,0,0,'','www.cancer.org/research/we-conduct-cancer-research/epidemiology.html',1),
(22,0,0,'','https://www.cancer.umn.edu/our-research/research-programs/specs-progra',1),
(26,0,0,'','www.nurseshealthstudy.org/participants/questionnaires',1),
(27,0,0,'','www.nurseshealthstudy.org/participants/questionnaires',1),
(28,0,0,'','http://nyuwhs.med.nyu.edu/about-study/questionnaires',1),
(30,0,0,'','https://biometry.nci.nih.gov/cdas/',1),
(31,0,0,'','https://ors.southerncommunitystudy.org/',1),
(32,0,0,'','http://www.mc.vanderbilt.edu/swhs-smhs/',1),
(33,0,0,'','http://www.mc.vanderbilt.edu/swhs-smhs/',1),
(39,0,0,'','https://www2.cscc.unc.edu/aric/cohort-forms',1),
(44,0,0,'','http://www.biobank.umu.se/biobank/biobank---for-researchers/nshds/',1),
(45,0,0,'','Access provided to password-protected website upon request',1),
(48,0,0,'','https://www.whi.org/researchers/studydoc/SitePages/Forms.aspx',1),
(49,0,0,'','http://swog.org/Visitors/select/',1),
(50,0,0,'','http://swog.org/Visitors/pcpt/',1),
(53,0,0,'','http://www.compass.fhcrc.org/caretWeb/biorepository/riskFactors.aspx',1),
(52,0,0,'','https://aghealth.nih.gov',1),
(54,0,0,'','https://dietandhealth.cancer.gov/resource/',1),
(55,0,0,'','http://sisterstudy.niehs.nih.gov/English/index1.htm',1),
(59,0,0,'','https://www.bu.edu/bwhs/for-researchers/sample-bwhs-questionnaires/',1),
(16,0,0,'','adventisthealthstudy.org',1),
(61,0,0,'','https://content.sph.harvard.edu/hpfs/hpfs_qx.htm',1),
(78,0,0,'','https://snd.gu.se/en/catalogue/search/COSM',1)