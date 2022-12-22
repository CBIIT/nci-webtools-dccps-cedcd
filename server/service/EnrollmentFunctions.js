import config from "../config/index.js";

    //Basically gets all the combinations of the selected genders, races, and ethnicities
    //If any of the parameters are empty, then return all possible combinations.
export function EnrollmentFunctions(gender, race, ethnicity){
        let column_info = [];
        let ethnicity_len = ethnicity.length;
        let race_len = race.length;
        let gender_len = gender.length;
        console.log(config.gender);
        console.log(config.race.length);
        console.log(gender);
        console.log(gender.length);
        if(ethnicity_len !== 0 || race_len !== 0 || gender_len !== 0){
            if((ethnicity_len === Object.keys(config.ethnicity).length || ethnicity_len === 0) && (race_len === Object.keys(config.race).length || race_len === 0) && (gender_len === Object.keys(config.gender).length || gender_len === 0)){
                column_info.push("race_total_total");
            }
            else{
                if(race_len === config.gender.length || race_len === 0){
                    race = Object.keys(config.race);
                }
                if(ethnicity_len === config.ethnicity.length || ethnicity_len === 0){
                    ethnicity = Object.keys(config.ethnicity);
                }
                if(gender_len === config.gender.length || gender_len === 0){
                    gender = Object.keys(config.gender);
                }
                race.forEach(function(r){
                    ethnicity.forEach(function(eth){
                        gender.forEach(function(g){
                            column_info.push("race_" + config.race[r] + "_" + config.ethnicity[eth] + "_" + config.gender[g]);
                        });
                    });
                });
                /*
                if(race_len === config.race.length || race_len === 0){
                    let prefix = "race_total_";
                    if(ethnicity_len === config.ethnicity.length || ethnicity_len === 0){
                        ethnicity = Object.keys(config.ethnicity);
                    }
                    else if(gender_len === config.gender.length || gender_len === 0){
                        gender = Object.keys(config.gender);
                    }
                    else{
                        
                    }
                    //go through the rest of the two arrays
                    ethnicity.forEach(function(eth){
                        gender.forEach(function(g){
                            column_info.push(prefix + config.ethnicity[eth] + "_" + config.gender[g]);
                        });
                    });
                }
                else{
                    if((ethnicity_len === config.ethnicity.length || ethnicity_len === 0) && 
                        (gender_len === config.gender.length || gender_len === 0)){
                        let surfix = "_total";
                        race.forEach(function(r){
                            column_info.push("race_"+config.race[r]+surfix);
                        });
                    }
                    else if((ethnicity_len === config.ethnicity.length || ethnicity_len === 0) && 
                        !(gender_len === config.gender.length || gender_len === 0)){
                        ethnicity = Object.keys(config.ethnicity);
                        race.forEach(function(r){
                            ethnicity.forEach(function(eth){
                                gender.forEach(function(g){
                                    column_info.push("race_" + config.race[r] + "_" + config.ethnicity[eth] + "_" + config.gender[g]);
                                });
                            });
                        });
                    }
                    else if(!(ethnicity_len === config.ethnicity.length || ethnicity_len === 0) && 
                        (gender_len === config.gender.length || gender_len === 0)){
                        gender = Object.keys(config.gender);
                        race.forEach(function(r){
                            ethnicity.forEach(function(eth){
                                gender.forEach(function(g){
                                    column_info.push("race_" + config.race[r] + "_" + config.ethnicity[eth] + "_" + config.gender[g]);
                                });
                            });
                        });
                    }
                    else{
                        //go through all the columns and filter out the applied ones
                        race.forEach(function(r){
                            ethnicity.forEach(function(eth){
                                gender.forEach(function(g){
                                    column_info.push("race_" + config.race[r] + "_" + config.ethnicity[eth] + "_" + config.gender[g]);
                                });
                            });
                        });
                    }
                }*/
            }
            return column_info;
        }
        else{
            return [];
        }
    }
 