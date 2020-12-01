const InitialStates = {
    cohort: {
        hasLoaded: false,
        sectionAStatus: '',
        cohort_Id: true,
        cohort_name: '',
        cohort_acronym: '',
        completionDate: '2020-10-12T05:00:00.000Z',
        completerName: '',
        completerPosition: '',
        completerPhone: '',
        completerCountry: '+1',
        completerEmail: '',
        clarification_contact: true,
        contacterName: '',
        contacterPosition: '',
        contacterPhone: '',
        contacterCountry: '+1',
        contacterEmail: '',
        investigators: [
            {
                personId: true,
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
        sameAsSomeone: true,
        cohort_description: '',
        hasAWebSite: true,
        cohort_web_site: '',
        eligible_gender_id: true,
        eligible_disease: true,
        eligible_disease_cancer_specify: '',
        eligible_disease_other_specify: '',
        enrollment_total: true,
        enrollment_year_start: true,
        enrollment_year_end: true,
        enrollment_ongoing: true,
        enrollment_target: true,
        enrollment_year_complete: true,
        enrollment_age_min: true,
        enrollment_age_max: true,
        enrollment_age_median: true,
        enrollment_age_mean: true,
        current_age_min: true,
        current_age_max: true,
        current_age_median: true,
        current_age_mean: true,
        time_interval: '',
        most_recent_year: true,
        data_collected_in_person: true,
        data_collected_phone: true,
        data_collected_paper: true,
        data_collected_web: true,
        data_collected_other: true,
        data_collected_other_specify: '',
        requireNone: true,
        requireCollab: true,
        requireIrb: true,
        requireData: true,
        restrictGenoInfo: true,
        restrictOtherDb: true,
        restrictCommercial: true,
        restrictOther: true,
        restrictOtherSpecify: '',
        strategy_routine: true,
        strategy_mailing: true,
        strategy_aggregate_study: true,
        strategy_individual_study: true,
        strategy_invitation: true,
        strategy_other: true,
        strategy_other_specify: '',
        questionnaireFile: true,
        mainCohortFile: true,
        dataFile: true,
        specimenFile: true,
        publicationFile: true,
        questionnaireFileName: '',
        mainFileName: '',
        dataFileName: '',
        specimenFileName: '',
        publicationFileName: '',
        questionnaire_url: '',
        main_cohort_url: '',
        data_url: '',
        specimen_url: '',
        publication_url: ''
    },
    cohortErrors: {
        completionDate: 'please provide a value',
        clarification_contact: 'please choose one',
        completerName: 'please provide a value',
        completerPosition: 'please provide a value',
        completerEmail: 'please provide a value',
        contacterName: 'please provide a value',
        contacterPosition: 'please provide a value',
        contacterEmail: 'please provide a value',
        collaboratorName: 'please provide a value',
        collaboratorPosition: 'please provide a value',
        collaboratorEmail: 'please provide a value',
        eligible_gender_id: 'please select one',
        enrollment_ongoing: 'please select one',
        enrollment_total: 'please provide a value',
        enrollment_year_start: 'please provide a value',
        enrollment_year_end: 'please provide a value',
        enrollment_ongoing: 'please select one',
        enrollment_target: 'please specify',
        enrollment_year_complete: 'please specify',
        enrollment_age_min: 'please specify',
        enrollment_age_max: 'please specify',
        enrollment_age_mean: 'please specify',
        enrollment_age_median: 'please specify',
        current_age_min: 'please specify',
        current_age_max: 'please specify',
        current_age_mean: 'please specify',
        current_age_median: 'please specify',
        time_interval: 'please provide a value',
        most_recent_year: 'please provide a value',
        dataCollection: 'please select at least one value',
        requirements: 'please select at least one value',
        strategy: 'please select at least one value',
        data_collected_other_specify: 'please specify',
        restrictions_other_specify: 'please specify',
        strategy_other_specify: 'please specify',
        questionnaire: true,
        main: true,
        data: true,
        specimen: true,
        publication: true
    },
    enrollmentCount: {
        'hasLoaded': false,
        '111': 50,
        '112': 50,
        '113': 50,
        '121': 50,
        '122': 50,
        '123': 50,
        '131': 50,
        '132': 50,
        '133': 50,
        '141': 450,
        '211': 50,
        '212': 50,
        '213': 50,
        '221': 50,
        '222': 50,
        '223': 50,
        '231': 50,
        '232': 50,
        '233': 50,
        '241': 450,
        '311': 50,
        '312': 50,
        '313': 50,
        '321': 50,
        '322': 50,
        '323': 50,
        '331': 50,
        '332': 50,
        '333': 50,
        '341': 450,
        '411': 50,
        '412': 50,
        '413': 50,
        '421': 50,
        '422': 50,
        '423': 50,
        '431': 50,
        '432': 50,
        '433': 50,
        '441': 450,
        '511': 50,
        '512': 50,
        '513': 50,
        '521': 50,
        '522': 50,
        '523': 50,
        '531': 50,
        '532': 50,
        '533': 50,
        '541': 450,
        '611': 50,
        '612': 50,
        '613': 50,
        '621': 50,
        '622': 50,
        '623': 50,
        '631': 50,
        '632': 50,
        '633': 50,
        '641': 450,
        '711': 50,
        '712': 50,
        '713': 50,
        '721': 50,
        '722': 50,
        '723': 50,
        '731': 50,
        '732': 50,
        '733': 50,
        '741': 450,
        '811': 350,
        '812': 350,
        '813': 350,
        '821': 350,
        '822': 350,
        '823': 350,
        '831': 350,
        '832': 350,
        '833': 350,
        '841': 3150,
        'mostRecentDate': '2020-10-12T05:00:00.000Z',
        'sectionBStatus': ''
    },
    enrollmentCountErrors: {
        mostRecentDate: 'please provide a value'
    }, 
    majorContent: {
        hasLoaded: false,
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
        cancerToxicity: true,
        cancerLateEffects: true,
        cancerSymptom: true,
        cancerOther: true,
        cancerOtherSpecify: true
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
        cancerToxicity: true,
        cancerLateEffects: true,
        cancerSymptom: true,
        cancerOther: true,
        cancerOtherSpecify: true
    },
    mortality: {
        hasLoaded: false,
        mortalityYear: '',
        deathIndex: null,
        deathCertificate: null,
        otherDeath: null,
        otherDeathSpecify: '',
        haveDeathDate: null,
        haveDeathCause: null,
        icd9: null,
        icd10: null,
        notCoded: null,
        otherCode: null,
        otherCodeSpecify: '',
        deathNumbers: '',
        sectionEStatus: '',
    },
    dataLinkage:{
        hasLoaded: false,
        haveDataLink: null,
        haveDataLinkSpecify: null,
        haveHarmonization: null,
        haveHarmonizationSpecify: null,
        haveDeposited: null,
        dbGaP: null,
        BioLINCC: null,
        otherRepo: null,
        dataOnline: null,
        dataOnlineWebsite: false,
        dataOnlinePolicy: false,
        dataOnlineURL: '',
        createdRepo: null,
        createdRepoSpecify: null,
        sectionFStatus: '',
    },
    cancerCount: {
        '1-2-1': 50,
        '2-2-1': 50,
        '3-2-1': 50,
        '4-2-1': 50,
        '5-2-1': 50,
        '6-2-1': 50,
        '7-2-1': 50,
        '8-2-1': 50,
        '9-2-1': 50,
        '10-2-1': 50,
        '11-2-1': 50,
        '12-2-1': 50,
        '13-2-1': 50,
        '14-2-1': 50,
        '15-2-1': 50,
        '16-2-1': 50,
        '17-2-1': 50,
        '18-2-1': 50,
        '19-2-1': 50,
        '20-2-1': 50,
        '21-2-1': 50,
        '22-2-1': 50,
        '23-2-1': 50,
        '24-2-1': 50,
        '25-2-1': 50,
        '26-2-1': 50,
        '27-2-1': 50,
        '28-2-1': 50,
        '1-2-2': 50,
        '2-2-2': 50,
        '3-2-2': 50,
        '4-2-2': 50,
        '5-2-2': 50,
        '6-2-2': 50,
        '7-2-2': 50,
        '8-2-2': 50,
        '9-2-2': 50,
        '10-2-2': 50,
        '11-2-2': 50,
        '12-2-2': 50,
        '13-2-2': 50,
        '14-2-2': 50,
        '15-2-2': 50,
        '16-2-2': 50,
        '17-2-2': 50,
        '18-2-2': 50,
        '19-2-2': 50,
        '20-2-2': 50,
        '21-2-2': 50,
        '22-2-2': 50,
        '23-2-2': 50,
        '24-2-2': 50,
        '25-2-2': 50,
        '26-2-2': 50,
        '27-2-2': 50,
        '28-2-2': 50,
        '1-1-1': 50,
        '2-1-1': 50,
        '3-1-1': 50,
        '4-1-1': 50,
        '5-1-1': 50,
        '6-1-1': 50,
        '7-1-1': 50,
        '8-1-1': 50,
        '9-1-1': 50,
        '10-1-1': 50,
        '11-1-1': 50,
        '12-1-1': 50,
        '13-1-1': 50,
        '14-1-1': 50,
        '15-1-1': 50,
        '16-1-1': 50,
        '17-1-1': 50,
        '18-1-1': 50,
        '19-1-1': 50,
        '20-1-1': 50,
        '21-1-1': 50,
        '22-1-1': 50,
        '23-1-1': 50,
        '24-1-1': 50,
        '25-1-1': 50,
        '26-1-1': 50,
        '27-1-1': 50,
        '28-1-1': 50,
        '1-1-2': 50,
        '2-1-2': 50,
        '3-1-2': 50,
        '4-1-2': 50,
        '5-1-2': 50,
        '6-1-2': 50,
        '7-1-2': 50,
        '8-1-2': 50,
        '9-1-2': 50,
        '10-1-2': 50,
        '11-1-2': 50,
        '12-1-2': 50,
        '13-1-2': 50,
        '14-1-2': 50,
        '15-1-2': 50,
        '16-1-2': 50,
        '17-1-2': 50,
        '18-1-2': 50,
        '19-1-2': 50,
        '20-1-2': 50,
        '21-1-2': 50,
        '22-1-2': 50,
        '23-1-2': 50,
        '24-1-2': 50,
        '25-1-2': 50,
        '26-1-2': 50,
        '27-1-2': 50,
        '28-1-2': 50
    },
    cancerInfo: {
        cohort: {},
        counts: {},
        form: {},
    },

    specimen: {
        counts: {
        '1-1': 50, 	'1-2': 50, 	'1-3': 50, 	'1-4': 50, 	'1-5': 50, 	'1-6': 50, 	'1-7': 50,
        '2-1': 50, 	'2-2': 50, 	'2-3': 50, 	'2-4': 50, 	'2-5': 50, 	'2-6': 50, 	'2-7': 50, 
        '3-1': 50, 	'3-2': 50, 	'3-3': 50, 	'3-4': 50, 	'3-5': 50, 	'3-6': 50, 	'3-7': 50, 
        '4-1': 50, 	'4-2': 50, 	'4-3': 50, 	'4-4': 50, 	'4-5': 50, 	'4-6': 50, 	'4-7': 50, 
        '5-1': 50, 	'5-2': 50, 	'5-3': 50, 	'5-4': 50, 	'5-5': 50, 	'5-6': 50, 	'5-7': 50, 
        '6-1': 50, 	'6-2': 50, 	'6-3': 50, 	'6-4': 50, 	'6-5': 50, 	'6-6': 50, 	'6-7': 50, 
        '7-1': 50, 	'7-2': 50, 	'7-3': 50, 	'7-4': 50, 	'7-5': 50, 	'7-6': 50, 	'7-7': 50, 
        '8-1': 50, 	'8-2': 50, 	'8-3': 50, 	'8-4': 50, 	'8-5': 50, 	'8-6': 50, 	'8-7': 50, 
        '9-1': 50, 	'9-2': 50, 	'9-3': 50, 	'9-4': 50, 	'9-5': 50, 	'9-6': 50, 	'9-7': 50, 
        '10-1': 50, 	'10-2': 50, 	'10-3': 50, 	'10-4': 50, 	'10-5': 50, 	'10-6': 50, 	'10-7': 50, 
        '11-1': 50, 	'11-2': 50, 	'11-3': 50, 	'11-4': 50, 	'11-5': 50, 	'11-6': 50, 	'11-7': 50, 
        '12-1': 50, 	'12-2': 50, 	'12-3': 50, 	'12-4': 50, 	'12-5': 50, 	'12-6': 50, 	'12-7': 50, 
        '13-1': 50, 	'13-2': 50, 	'13-3': 50, 	'13-4': 50, 	'13-5': 50, 	'13-6': 50, 	'13-7': 50, 
        '14-1': 50, 	'14-2': 50, 	'14-3': 50, 	'14-4': 50, 	'14-5': 50, 	'14-6': 50, 	'14-7': 50, 
        '15-1': 50, 	'15-2': 50, 	'15-3': 50, 	'15-4': 50, 	'15-5': 50, 	'15-6': 50, 	'15-7': 50, 
        '16-1': 50, 	'16-2': 50, 	'16-3': 50, 	'16-4': 50, 	'16-5': 50, 	'16-6': 50, 	'16-7': 50, 
        '17-1': 50, 	'17-2': 50, 	'17-3': 50, 	'17-4': 50, 	'17-5': 50, 	'17-6': 50, 	'17-7': 50, 
        '18-1': 50, 	'18-2': 50, 	'18-3': 50, 	'18-4': 50, 	'18-5': 50, 	'18-6': 50, 	'18-7': 50, 
        '19-1': 50, 	'19-2': 50, 	'19-3': 50, 	'19-4': 50, 	'19-5': 50, 	'19-6': 50, 	'19-7': 50, 
        '20-1': 50, 	'20-2': 50, 	'20-3': 50, 	'20-4': 50, 	'20-5': 50, 	'20-6': 50, 	'20-7': 50, 
        '21-1': 50, 	'21-2': 50, 	'21-3': 50, 	'21-4': 50, 	'21-5': 50, 	'21-6': 50, 	'21-7': 50, 
        '22-1': 50, 	'22-2': 50, 	'22-3': 50, 	'22-4': 50, 	'22-5': 50, 	'22-6': 50, 	'22-7': 50, 
        '23-1': 50, 	'23-2': 50, 	'23-3': 50, 	'23-4': 50, 	'23-5': 50, 	'23-6': 50, 	'23-7': 50, 
        '24-1': 50, 	'24-2': 50, 	'24-3': 50, 	'24-4': 50, 	'24-5': 50, 	'24-6': 50, 	'24-7': 50, 
        '25-1': 50, 	'25-2': 50, 	'25-3': 50, 	'25-4': 50, 	'25-5': 50, 	'25-6': 50, 	'25-7': 50, 
        '26-1': 50, 	'26-2': 50, 	'26-3': 50, 	'26-4': 50, 	'26-5': 50, 	'26-6': 50, 	'26-7': 50, 
        '27-1': 50, 	'27-2': 50, 	'27-3': 50, 	'27-4': 50, 	'27-5': 50, 	'27-6': 50, 	'27-7': 50, 
        '28-1': 50, 	'28-2': 50, 	'28-3': 50, 	'28-4': 50, 	'28-5': 50, 	'28-6': 50, 	'28-7': 50,
        '29-1': 50, 	'29-2': 50, 	'29-3': 50, 	'29-4': 50, 	'29-5': 50, 	'29-6': 50, 	'29-7': 50
        }, 
        sectionGStatus: ''
    }, 

    sectionStatus: {
        'A': 'complete',
        'B': 'complete  ',
        'C': 'complete',
        'D': 'complete',
        'E': 'complete',
        'F': 'complete',
        'G': 'incomplete'
    },
    lookup: {},
    cohortId: null,
}

export default InitialStates