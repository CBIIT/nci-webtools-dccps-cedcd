const InitialStates ={
    cohort: {
        cohortId: 79,
        name: 'joe',
        acronym: 'HWS',
        completionDate: '05/19/2020',
        completerName: 'Joe',
        completerPosition: 'Developer',
        completerPhone: '225-125-3344',
        completerEmail: 'joez@hws.com',
        contacterRight: 0,
        contacterName: 'anna',
        contacterPosition: 'manager',
        contacterPhone: '225-255-5555',
        contacterEmail: 'anna@hws.com',
        investigators: [
            {
                name: 'chao',
                institution: 'zhang',
                email: 'cz@hws.com'
            }
        ],
        collaboratorName: 'Joe',
        collaboratorPosition: 'Developer',
        collaboratorPhone: '225-125-3344',
        collaboratorEmail: 'joez@hws.com',
        sameAsSomeone: 0,
        description: 'this is a description demo',
        hasAWebSite: 1,
        webSite: 'mycohort.com',
        eligibleGender: '4',
        hasCancerSite: true,
        cancerSites: 'cancersite.com, cancerSites.org',
        eligibilityCriteriaOther: 'BMI',
        enrolledTotal: 10,
        enrollStartYear: 2020,
        enrollEndYear: 2020,
        enrollOnGoing: 1,
        numOfPlans: 10,
        yearToComplete: 2022,
        baseLineMinAge: 18,
        baseLineMaxAge: 65,
        baseLineMedianAge: 35,
        baseLineMeanAge: 35,
        currentMinAge: 18,
        currentMaxAge: 65,
        currentMedianAge: 35,
        currentMeanAge: 35,
        timeInterval: 'twice a year',
        mostRecentYear: 2010,
        collectedInPerson: true,
        collectedPhone: true,
        collectedPaper: true,
        collectedWeb: true,
        collectedOther: true,
        collectedOtherSpecify: 'heard from friends',
        requireNone: false,
        requireCollab: true,
        requireIrb: true,
        requireData: true,
        restrictGenoInfo: true,
        restrictOtherDb: true,
        restrictCommercial: true,
        restrictOther: true,
        restrictOtherSpecify: 'other restrictions',
        strategyRoutine: true,
        strategyMailing: true,
        strategyAggregateStudy: true,
        strategyIndividualStudy: true,
        strategyInvitation: true,
        strategyOther: true,
        strategyOtherSpecify: 'other strategies',
        questionnaireFile: true,
        mainCohortFile: true,
        dataFile: true,
        specimenFile: true,
        publicationFile: true,
        questionnaireUrl: '',
        mainCohortUrl: '',
        dataUrl: '',
        specimenUrl: '',
        publicationUrl: ''
    },
    enrollmentCount: {
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
        'mostRecentDate': ''
    },
    majorContent: {
        'seStatusBaseLine': 1,
        'seStatusFollowUp': 1,
        'educationBaseLine': 1,
        'educationFollowUp': 1,
        'maritalStatusBaseLine': 1,
        'maritalStatusFollowUp': 1,
        'originBaseLine': 1,
        'originFollowUp': 0,
        'empStatusBaseLine': 1,
        'empStatusFollowUp': 0,
        'insuranceStatusBaseLine': 1,
        'insuranceStatusFollowUp': 0,
        'anthropometryBaseLine': 1,
        'anthropometryFollowUp': 0,
        'dietaryBaseLine': 1,
        'dietaryFollowUp': 0,
        'supplementBaseLine': 1,
        'supplementFollowUp': 0,
        'medicineBaseLine': 1,
        'medicineFollowUp': 0,
        'prescriptionBaseLine': 1,
        'prescriptionFollowUp': 1,
        'nonprescriptionBaseLine': 1,
        'nonprescriptionFollowUp': 1,
        'alcoholBaseLine': 1,
        'alcoholFollowUp': 0,
        'cigaretteBaseLine': 1,
        'cigaretteFollowUp': 1,
        'cigarBaseLine': true,
        'cigarFollowUp': true,
        'pipeBaseLine': true,
        'pipeFollowUp': true,
        'tobaccoBaseLine': true,
        'tobaccoFollowUp': true,
        'ecigarBaseLine': true,
        'ecigarFollowUp': true,
        'noncigarOtherBaseLine': true,
        'noncigarOtherFollowUp': true,
        'noncigarBaseLineSpecify': '',
        'noncigarFollowUpSpecify': '',
        'physicalBaseLine': 1,
        'physicalFollowUp': 0,
        'sleepBaseLine': 1,
        'sleepFollowUp': 0,
        'reproduceBaseLine': 1,
        'reproduceFollowUp': 0,
        'reportedHealthBaseLine': 1,
        'reportedHealthFollowUp': 0,
        'lifeBaseLine': 1,
        'lifeFollowUp': 1,
        'socialSupportBaseLine': 1,
        'socialSupportFollowUp': 1,
        'cognitionBaseLine': 1,
        'cognitionFollowUp': 0,
        'depressionBaseLine': 1,
        'depressionFollowUp': 1,
        'phychosocialBaseLine': 1,
        'phychosocialFollowUp': 0,
        'fatigueBaseLine': 1,
        'fatigueFollowUp': 0,
        'cancerHistoryBaseLine': 1,
        'cancerHistoryFollowUp': 0,
        'cancerPedigreeBaseLine': 1,
        'cancerPedigreeFollowUp': 1,
        'physicalMeasureBaseLine': 1,
        'physicalMeasureFollowUp': 1,
        'exposureBaseLine': 1,
        'exposureFollowUp': 1,
        'residenceBaseLine': 1,
        'residenceFollowUp': 0,
        'diabetesBaseLine': 1,
        'diabetesFollowUp': 1,
        'strokeBaseLine': 1,
        'strokeFollowUp': 1,
        'copdBaseLine': 1,
        'copdFollowUp': 1,
        'cardiovascularBaseLine': 1,
        'cardiovascularFollowUp': 1,
        'osteoporosisBaseLine': 1,
        'osteoporosisFollowUp': 1,
        'mentalBaseLine': 1,
        'mentalFollowUp': 1,
        'cognitiveDeclineBaseLine': 1,
        'cognitiveDeclineFollowUp': 1,
        'cancerToxicity': 1,
        'cancerLateEffects': 1,
        'cancerSymptom': 0,
        'cancerOther': 1,
        'cancerOtherSpecify': ''

    },
    sectionStatus:{
        'A': 'complete',
        'B': 'incomplete',
        'C': 'new',
        'D': 'incomplete',
        'E': 'new',
        'F': 'new',
        'G': 'new'
    }
}

export default InitialStates