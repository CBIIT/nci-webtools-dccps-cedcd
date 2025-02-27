const InitialStates = {
  cohort_status: "",
  cohort: {
    //hasLoaded: false,
    sectionAStatus: "",
    investigators: [
      {
        personId: 0,
        name: "",
        institution: "",
        email: "",
      },
    ],
    questionnaireFileName: [],
    mainFileName: [],
    //dataFileName: [],
    //specimenFileName: [],
    publicationFileName: [],
    questionnaire_url: [],
    main_cohort_url: [],
    //data_url: [],
    //specimen_url: [],
    publication_url: [],
    /*  cohort_name: '',
          cohort_acronym: '',
          completerName: '',
          completerPosition: '',
          completerPhone: '',
          completerCountry: '+1',
          completerEmail: '',
          clarification_contact: false,
          contacterName: '',
          contacterPosition: '',
          contacterPhone: '',
          contacterCountry: '+1',
          contacterEmail: '',
          investigators: [
              {
                  personId: 0,
                  name: '',
                  institution: '',
                  email: ''
              }
          ],
          collaboratorName: '',
          collaboratorPosition: '',
          collaboratorPhone: '',
          collaboratorCountry: '+1',
          collaboratorEmail: '',
          sameAsSomeone: null,
          cohort_description: '',
          hasAWebSite: false,
          cohort_web_site: '',
          eligible_gender_id: -1,
          eligible_disease: 0,
          eligible_disease_cancer_specify: '',
          eligible_disease_other_specify: '',
          enrollment_total: '',
          enrollment_year_start: '',
          enrollment_year_end: '',
          enrollment_ongoing: '',
          enrollment_target: '',
          enrollment_year_complete: '',
          enrollment_age_min: '',
          enrollment_age_max: '',
          enrollment_age_median: '',
          enrollment_age_mean: '',
          current_age_min: '',
          current_age_max: '',
          current_age_median: '',
          current_age_mean: '',
          time_interval: '',
          most_recent_year: '',
          data_collected_in_person: 0,
          data_collected_phone: 0,
          data_collected_paper: 0,
          data_collected_web: 0,
          data_collected_other: 0,
          data_collected_other_specify: '',
          requireNone: 0,
          requireCollab: 0,
          requireIrb: 0,
          requireData: 0,
          restrictGenoInfo: 0,
          restrictOtherDb: 0,
          restrictCommercial: 0,
          restrictOther: 0,
          restrictions_other_specify: '',
          strategy_routine: 0,
          strategy_mailing: 0,
          strategy_aggregate_study: 0,
          strategy_individual_study: 0,
          strategy_committees: 0,
          strategy_invitation: 0,
          strategy_participant_input: 0,
          strategy_other: 0,
          strategy_other_specify: '',
          questionnaireFile: false,
          mainCohortFile: false,
          dataFile: false,
          specimenFile: false,
          publicationFile: false,
          questionnaireFileName: [],
          mainFileName: [],
          dataFileName: [],
          specimenFileName: [],
          publicationFileName: [],
          questionnaire_url: [],
          main_cohort_url: [],
          data_url: [],
          specimen_url: [],
          publication_url: []
          */
  },
  cohortErrors: {
    /*  clarification_contact: 'Required Field',
          completerName: 'Required Field',
          completerPosition: 'Required Field',
          completerEmail: 'Required Field',
          contacterName: 'Required Field',
          contacterPosition: 'Required Field',
          contacterEmail: 'Required Field',
          collaboratorName: 'Required Field',
          collaboratorPosition: 'Required Field',
          collaboratorEmail: 'Required Field',
          eligible_gender_id: 'Required Field',
          enrollment_ongoing: 'Required Field',
          enrollment_total: 'Required Field',
          enrollment_year_start: 'Required Field',
          enrollment_year_end: 'Required Field',
          enrollment_ongoing: 'Required Field',
          enrollment_target: 'Required Field',
          enrollment_year_complete: 'Required Field',
          enrollment_age_min: 'Required Field',
          enrollment_age_max: 'Required Field',
          enrollment_age_mean: 'Required Field',
          enrollment_age_median: 'Required Field',
          current_age_min: 'Required Field',
          current_age_max: 'Required Field',
          current_age_mean: 'Required Field',
          current_age_median: 'Required Field',
          time_interval: 'Required Field',
          most_recent_year: 'Required Field',
          dataCollection: 'Required Field',
          requirements: 'Required Field',
          strategy: 'Required Field',
          data_collected_other_specify: 'Required Field',
          restrictions_other_specify: 'Required Field',
          strategy_other_specify: 'Required Field' */
  },
  enrollmentCount: {
    /*'111': 0,
        '112': 0,
        '113': 0,
        '121': 0,
        '122': 0,
        '123': 0,
        '131': 0,
        '132': 0,
        '133': 0,
        '141': 0,
        '211': 0,
        '212': 0,
        '213': 0,
        '221': 0,
        '222': 0,
        '223': 0,
        '231': 0,
        '232': 0,
        '233': 0,
        '241': 0,
        '311': 0,
        '312': 0,
        '313': 0,
        '321': 0,
        '322': 0,
        '323': 0,
        '331': 0,
        '332': 0,
        '333': 0,
        '341': 0,
        '411': 0,
        '412': 0,
        '413': 0,
        '421': 0,
        '422': 0,
        '423': 0,
        '431': 0,
        '432': 0,
        '433': 0,
        '441': 0,
        '511': 0,
        '512': 0,
        '513': 0,
        '521': 0,
        '522': 0,
        '523': 0,
        '531': 0,
        '532': 0,
        '533': 0,
        '541': 0,
        '611': 0,
        '612': 0,
        '613': 0,
        '621': 0,
        '622': 0,
        '623': 0,
        '631': 0,
        '632': 0,
        '633': 0,
        '641': 0,
        '711': 0,
        '712': 0,
        '713': 0,
        '721': 0,
        '722': 0,
        '723': 0,
        '731': 0,
        '732': 0,
        '733': 0,
        '741': 0,
        '811': 0,
        '812': 0,
        '813': 0,
        '821': 0,
        '822': 0,
        '823': 0,
        '831': 0,
        '832': 0,
        '833': 0,
        '841': 0,
        'mostRecentDate': null, */
    sectionBStatus: "",
  },
  enrollmentCountErrors: {
    mostRecentDate: "Required Field",
  },
  majorContent: {
    hasLoaded: false,
    seStatusBaseLine: null,
    seStatusFollowUp: null,
    educationBaseLine: null,
    educationFollowUp: null,
    maritalStatusBaseLine: null,
    maritalStatusFollowUp: null,
    originBaseLine: null,
    originFollowUp: null,
    empStatusBaseLine: null,
    empStatusFollowUp: null,
    insuranceStatusBaseLine: null,
    insuranceStatusFollowUp: null,
    anthropometryBaseLine: null,
    anthropometryFollowUp: null,
    dietaryBaseLine: null,
    dietaryFollowUp: null,
    supplementBaseLine: null,
    supplementFollowUp: null,
    medicineBaseLine: null,
    medicineFollowUp: null,
    prescriptionBaseLine: null,
    prescriptionFollowUp: null,
    nonprescriptionBaseLine: null,
    nonprescriptionFollowUp: null,
    alcoholBaseLine: null,
    alcoholFollowUp: null,
    cigaretteBaseLine: null,
    cigaretteFollowUp: null,
    tobaccoUseBaseLine: null,
    tobaccoUseFollowUp: null,
    cigarBaseLine: null,
    cigarFollowUp: null,
    pipeBaseLine: null,
    pipeFollowUp: null,
    tobaccoBaseLine: null,
    tobaccoFollowUp: null,
    ecigarBaseLine: null,
    ecigarFollowUp: null,
    noncigarOtherBaseLine: 0,
    noncigarOtherFollowUp: null,
    noncigarBaseLineSpecify: "",
    noncigarFollowUpSpecify: "",
    physicalBaseLine: null,
    physicalFollowUp: null,
    sleepBaseLine: null,
    sleepFollowUp: null,
    reproduceBaseLine: null,
    reproduceFollowUp: null,
    reportedHealthBaseLine: null,
    reportedHealthFollowUp: null,
    lifeBaseLine: null,
    lifeFollowUp: null,
    socialSupportBaseLine: null,
    socialSupportFollowUp: null,
    cognitionBaseLine: null,
    cognitionFollowUp: null,
    depressionBaseLine: null,
    depressionFollowUp: null,
    psychosocialBaseLine: null,
    psychosocialFollowUp: null,
    fatigueBaseLine: null,
    fatigueFollowUp: null,
    cancerHistoryBaseLine: null,
    cancerHistoryFollowUp: null,
    cancerPedigreeBaseLine: null,
    cancerPedigreeFollowUp: null,
    physicalMeasureBaseLine: null,
    physicalMeasureFollowUp: null,
    exposureBaseLine: null,
    exposureFollowUp: null,
    residenceBaseLine: null,
    residenceFollowUp: null,
    // sexgenderIdentityBaseLine: null,
    // sexgenderIdentityFollowUp: null,
    diabetesBaseLine: null,
    diabetesFollowUp: null,
    strokeBaseLine: null,
    strokeFollowUp: null,
    copdBaseLine: null,
    copdFollowUp: null,
    cardiovascularBaseLine: null,
    cardiovascularFollowUp: null,
    osteoporosisBaseLine: null,
    osteoporosisFollowUp: null,
    mentalBaseLine: null,
    mentalFollowUp: null,
    cognitiveDeclineBaseLine: null,
    cognitiveDeclineFollowUp: null,
    physicalMeasureBaseLine: null,
    physicalMeasureFollowUp: null,
    cancerRelatedConditionsNA: null,
    cancerToxicity: null,
    cancerLateEffects: null,
    cancerSymptom: null,
    cancerOther: null,
    cancerOtherSpecify: "",
    sectionCStatus: "",
  },
  majorContentError: {
    seStatusBaseLine: true,
    seStatusFollowUp: true,
    educationBaseLine: true,
    educationFollowUp: true,
    maritalStatusBaseLine: true,
    maritalStatusFollowUp: true,
    originBaseLine: true,
    originFollowUp: true,
    empStatusBaseLine: true,
    empStatusFollowUp: true,
    insuranceStatusBaseLine: true,
    insuranceStatusFollowUp: true,
    anthropometryBaseLine: true,
    anthropometryFollowUp: true,
    dietaryBaseLine: true,
    dietaryFollowUp: true,
    supplementBaseLine: true,
    supplementFollowUp: true,
    medicineBaseLine: true,
    medicineFollowUp: true,
    prescriptionBaseLine: true,
    prescriptionFollowUp: true,
    nonprescriptionBaseLine: true,
    nonprescriptionFollowUp: true,
    alcoholBaseLine: true,
    alcoholFollowUp: true,
    cigaretteBaseLine: true,
    cigaretteFollowUp: true,
    tobaccoUseBaseLine: true,
    tobaccoUseFollowUp: true,
    cigarBaseLine: true,
    cigarFollowUp: true,
    pipeBaseLine: true,
    pipeFollowUp: true,
    tobaccoBaseLine: true,
    tobaccoFollowUp: true,
    ecigarBaseLine: true,
    ecigarFollowUp: true,
    noncigarOtherBaseLine: true,
    noncigarOtherFollowUp: true,
    noncigarBaseLineSpecify: true,
    noncigarFollowUpSpecify: true,

    physicalBaseLine: true,
    physicalFollowUp: true,
    sleepBaseLine: true,
    sleepFollowUp: true,
    reproduceBaseLine: true,
    reproduceFollowUp: true,
    reportedHealthBaseLine: true,
    reportedHealthFollowUp: true,
    lifeBaseLine: true,
    lifeFollowUp: true,
    socialSupportBaseLine: true,
    socialSupportFollowUp: true,
    cognitionBaseLine: true,
    cognitionFollowUp: true,
    depressionBaseLine: true,
    depressionFollowUp: true,
    psychosocialBaseLine: true,
    psychosocialFollowUp: true,
    fatigueBaseLine: true,
    fatigueFollowUp: true,
    cancerHistoryBaseLine: true,
    cancerHistoryFollowUp: true,
    cancerPedigreeBaseLine: true,
    cancerPedigreeFollowUp: true,
    physicalMeasureBaseLine: true,
    physicalMeasureFollowUp: true,
    exposureBaseLine: true,
    exposureFollowUp: true,
    residenceBaseLine: true,
    residenceFollowUp: true,
    // sexgenderIdentityBaseLine: true,
    // sexgenderIdentityFollowUp: true,
    diabetesBaseLine: true,
    diabetesFollowUp: true,
    strokeBaseLine: true,
    strokeFollowUp: true,
    copdBaseLine: true,
    copdFollowUp: true,
    cardiovascularBaseLine: true,
    cardiovascularFollowUp: true,
    osteoporosisBaseLine: true,
    osteoporosisFollowUp: true,
    mentalBaseLine: true,
    mentalFollowUp: true,
    cognitiveDeclineBaseLine: true,
    cognitiveDeclineFollowUp: true,
    cancerRelatedConditionsNA: true,
    cancerToxicity: true,
    cancerLateEffects: true,
    cancerSymptom: true,
    cancerOther: true,
    cancerOtherSpecify: true,
  },
  mortality: {
    hasLoaded: false,
    mortalityYear: "",
    deathIndex: 0,
    deathCertificate: 0,
    otherDeath: 0,
    otherDeathSpecify: "",
    haveDeathDate: null,
    haveDeathCause: null,
    icd9: 0,
    icd10: 0,
    notCoded: 0,
    otherCode: 0,
    otherCodeSpecify: "",
    deathNumbers: "",
    sectionEStatus: "",
  },
  dataLinkage: {
    hasLoaded: false,
    haveDataLink: null,
    haveDataLinkSpecify: null,
    haveHarmonization: null,
    haveHarmonizationSpecify: null,
    haveDeposited: null,
    dataFileName: { fileId: 0, fileCategory: 5, filename: "", status: 0 },
    dbGaP: 0,
    BioLINCC: 0,
    otherRepo: 0,
    dataOnline: null,
    //dataOnlineWebsite: 0,
    //dataOnlinePolicy: 0,
    dataOnlineURL: "",
    createdRepo: null,
    createdRepoSpecify: null,
    sectionFStatus: "",
  },
  cancerInfo: {
    counts: {},
    form: {},
  },

  specimen: {
    counts: {
      "1-1": 0,
      "1-2": 0,
      "1-3": 0,
      "1-4": 0,
      "1-5": 0,
      "1-6": 0,
      "1-7": 0,
      "2-1": 0,
      "2-2": 0,
      "2-3": 0,
      "2-4": 0,
      "2-5": 0,
      "2-6": 0,
      "2-7": 0,
      "3-1": 0,
      "3-2": 0,
      "3-3": 0,
      "3-4": 0,
      "3-5": 0,
      "3-6": 0,
      "3-7": 0,
      "4-1": 0,
      "4-2": 0,
      "4-3": 0,
      "4-4": 0,
      "4-5": 0,
      "4-6": 0,
      "4-7": 0,
      "5-1": 0,
      "5-2": 0,
      "5-3": 0,
      "5-4": 0,
      "5-5": 0,
      "5-6": 0,
      "5-7": 0,
      "6-1": 0,
      "6-2": 0,
      "6-3": 0,
      "6-4": 0,
      "6-5": 0,
      "6-6": 0,
      "6-7": 0,
      "7-1": 0,
      "7-2": 0,
      "7-3": 0,
      "7-4": 0,
      "7-5": 0,
      "7-6": 0,
      "7-7": 0,
      "8-1": 0,
      "8-2": 0,
      "8-3": 0,
      "8-4": 0,
      "8-5": 0,
      "8-6": 0,
      "8-7": 0,
      "9-1": 0,
      "9-2": 0,
      "9-3": 0,
      "9-4": 0,
      "9-5": 0,
      "9-6": 0,
      "9-7": 0,
      "10-1": 0,
      "10-2": 0,
      "10-3": 0,
      "10-4": 0,
      "10-5": 0,
      "10-6": 0,
      "10-7": 0,
      "11-1": 0,
      "11-2": 0,
      "11-3": 0,
      "11-4": 0,
      "11-5": 0,
      "11-6": 0,
      "11-7": 0,
      "12-1": 0,
      "12-2": 0,
      "12-3": 0,
      "12-4": 0,
      "12-5": 0,
      "12-6": 0,
      "12-7": 0,
      "13-1": 0,
      "13-2": 0,
      "13-3": 0,
      "13-4": 0,
      "13-5": 0,
      "13-6": 0,
      "13-7": 0,
      "14-1": 0,
      "14-2": 0,
      "14-3": 0,
      "14-4": 0,
      "14-5": 0,
      "14-6": 0,
      "14-7": 0,
      "15-1": 0,
      "15-2": 0,
      "15-3": 0,
      "15-4": 0,
      "15-5": 0,
      "15-6": 0,
      "15-7": 0,
      "16-1": 0,
      "16-2": 0,
      "16-3": 0,
      "16-4": 0,
      "16-5": 0,
      "16-6": 0,
      "16-7": 0,
      "17-1": 0,
      "17-2": 0,
      "17-3": 0,
      "17-4": 0,
      "17-5": 0,
      "17-6": 0,
      "17-7": 0,
      "18-1": 0,
      "18-2": 0,
      "18-3": 0,
      "18-4": 0,
      "18-5": 0,
      "18-6": 0,
      "18-7": 0,
      "19-1": 0,
      "19-2": 0,
      "19-3": 0,
      "19-4": 0,
      "19-5": 0,
      "19-6": 0,
      "19-7": 0,
      "20-1": 0,
      "20-2": 0,
      "20-3": 0,
      "20-4": 0,
      "20-5": 0,
      "20-6": 0,
      "20-7": 0,
      "21-1": 0,
      "21-2": 0,
      "21-3": 0,
      "21-4": 0,
      "21-5": 0,
      "21-6": 0,
      "21-7": 0,
      "22-1": 0,
      "22-2": 0,
      "22-3": 0,
      "22-4": 0,
      "22-5": 0,
      "22-6": 0,
      "22-7": 0,
      "23-1": 0,
      "23-2": 0,
      "23-3": 0,
      "23-4": 0,
      "23-5": 0,
      "23-6": 0,
      "23-7": 0,
      "24-1": 0,
      "24-2": 0,
      "24-3": 0,
      "24-4": 0,
      "24-5": 0,
      "24-6": 0,
      "24-7": 0,
      "25-1": 0,
      "25-2": 0,
      "25-3": 0,
      "25-4": 0,
      "25-5": 0,
      "25-6": 0,
      "25-7": 0,
      "26-1": 0,
      "26-2": 0,
      "26-3": 0,
      "26-4": 0,
      "26-5": 0,
      "26-6": 0,
      "26-7": 0,
      "27-1": 0,
      "27-2": 0,
      "27-3": 0,
      "27-4": 0,
      "27-5": 0,
      "27-6": 0,
      "27-7": 0,
      "28-1": 0,
      "28-2": 0,
      "28-3": 0,
      "28-4": 0,
      "28-5": 0,
      "28-6": 0,
      "28-7": 0,
      "29-1": 0,
      "29-2": 0,
      "29-3": 0,
      "29-4": 0,
      "29-5": 0,
      "29-6": 0,
      "29-7": 0,
    },
    specimenLoaded: false,
    bioBloodBaseline: null,
    bioBloodBaselineSerum: 0,
    bioBloodBaselinePlasma: 0,
    bioBloodBaselineBuffyCoat: 0,
    bioBloodBaselineOtherDerivative: 0,
    bioBloodOtherTime: null,
    bioBloodOtherTimeSerum: 0,
    bioBloodOtherTimePlasma: 0,
    bioBloodOtherTimeBuffyCoat: 0,
    bioBloodOtherTimeOtherDerivative: 0,
    bioBuccalSalivaBaseline: null,
    bioBuccalSalivaOtherTime: null,
    bioTissueBaseline: null,
    bioTissueOtherTime: null,
    bioUrineBaseline: null,
    bioUrineOtherTime: null,
    bioFecesBaseline: null,
    bioFecesOtherTime: null,
    bioOtherBaseline: null,
    bioOtherOtherTime: null,
    bioRepeatedSampleSameIndividual: null,
    bioTumorBlockInfo: null,
    bioGenotypingData: null,
    bioSequencingDataExome: null,
    bioSequencingDataWholeGenome: null,
    bioEpigeneticOrMetabolicMarkers: null,
    bioOtherOmicsData: null,
    bioTranscriptomicsData: null,
    bioMicrobiomeData: null,
    bioMetabolomicData: null,
    bioMetaFastingSample: null,
    bioMetaOutcomesInCancerStudy: 0,
    bioMetaOutcomesInCvdStudy: 0,
    bioMetaOutcomesInDiabetesStudy: 0,
    bioMetaOutcomesInOtherStudy: 0,
    bioMemberOfMetabolomicsStudies: null,
    bioOtherBaselineSpecify: "",
    bioOtherOtherTimeSpecify: "",
    bioMetaOutcomesOtherStudySpecify: "",
    bioMemberInStudy: "",
    bioLabsUsedForAnalysis: "",
    bioAnalyticalPlatform: "",
    bioSeparationPlatform: "",
    bioNumberMetabolitesMeasured: "",
    bioYearSamplesSent: "",
    sectionGStatus: "",
  },

  specimenError: {
    bioBloodBaseline: true,
    bioBloodBaselineSerum: true,
    bioBloodBaselinePlasma: true,
    bioBloodBaselineBuffyCoat: true,
    bioBloodBaselineOtherDerivative: true,
    bioBloodOtherTime: true,
    bioBloodOtherTimeSerum: true,
    bioBloodOtherTimePlasma: true,
    bioBloodOtherTimeBuffyCoat: true,
    bioBloodOtherTimeOtherDerivative: true,
    bioBuccalSalivaBaseline: true,
    bioBuccalSalivaOtherTime: true,
    bioTissueBaseline: true,
    bioTissueOtherTime: true,
    bioUrineBaseline: true,
    bioUrineOtherTime: true,
    bioFecesBaseline: true,
    bioFecesOtherTime: true,
    bioOtherBaseline: true,
    bioOtherOtherTime: true,
    bioRepeatedSampleSameIndividual: true,
    bioTumorBlockInfo: true,
    bioGenotypingData: true,
    bioSequencingDataExome: true,
    bioSequencingDataWholeGenome: true,
    bioEpigeneticOrMetabolicMarkers: true,
    bioOtherOmicsData: true,
    bioTranscriptomicsData: true,
    bioMicrobiomeData: true,
    bioMetabolomicData: true,
    bioMetaFastingSample: true,
    bioMetaOutcomesInCancerStudy: true,
    bioMetaOutcomesInCvdStudy: true,
    bioMetaOutcomesInDiabetesStudy: true,
    bioMetaOutcomesInOtherStudy: true,
    bioMemberOfMetabolomicsStudies: true,
    bioOtherBaselineSpecify: true,
    bioOtherOtherTimeSpecify: true,
    bioMetaOutcomesOtherStudySpecify: true,
    bioMemberInStudy: true,
    bioLabsUsedForAnalysis: true,
    bioAnalyticalPlatform: true,
    bioSeparationPlatform: true,
    bioNumberMetabolitesMeasured: true,
    bioYearSamplesSent: true,
  },

  sectionStatus: {
    A: "new",
    B: "new",
    C: "new",
    D: "new",
    E: "new",
    F: "new",
    G: "new",
  },
  lookup: {},
  cohortId: 0,
};

export default InitialStates;
