var mysql = require('../../components/mysql');

exports.run = function (req, res) {
	let body = req.body;
	let cohorts = body.cohorts || [];

	let func = "select_cohort_baseline_data";
	let params = [];

	if (cohorts.length > 0) {
		params.push(cohorts.toString());
	}
	else {
		params.push("");
	}
	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			let dt = {};
			dt.list = [];
			dt.cohorts = [];
			let list = results[0];
			let dict = {};
			let cache = [];
			list.forEach(function (l) {
				if (dict[l.domain_id] == null) {
					dict[l.domain_id] = {};
				}
				if (cache.indexOf(l.id) == -1) {
					cache.push(l.id);
					dt.cohorts.push({
						cohort_id: l.id,
						cohort_name: l.cohort_name,
						cohort_acronym: l.cohort_acronym
					});
				}
				let tmp = dict[l.domain_id];
				let v = l.baseline;
				if (v == -1) {
					v = "N/P";
				}
				else {
					v = v ? "Yes" : "No";
					if (l.domain_id == 19) {
						if (l.other_specify_baseline != "") {
							v = l.other_specify_baseline;
						}
						else if (v == "No") {
							v = "N/A";
						}
						else {
							v = "N/P";
						}
					}
				}
				tmp["c_" + l.id] = v;
			});

			dt.list.push({
				type: "block",
				name: "Demographic Information",
				rows: 7
			});
			let values = [{
				name: "Socio-economic status (e.g., income)",
				domain_id: 1
			}, {
				name: "Education Level",
				domain_id: 2
			}, {
				name: "Marital Status",
				domain_id: 3
			}, {
				name: "Language/Country of Origin",
				domain_id: 4
			}, {
				name: "Employment Status",
				domain_id: 5
			}, {
				name: "Geocoding Information",
				title: "Geographic coordinates of location of interest",
				domain_id: 33
			}, {
				name: "Health Insurance Status",
				domain_id: 6
			}];
			values.forEach(function (vl) {
				let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if (vl.title) {
					tmp.title = vl.title;
				}
				let baselines = dict[vl.domain_id];
				for (key in baselines) {
					let v = baselines[key];
					tmp[key] = v;
				}

				dt.list.push(tmp);
			});
			dt.list.push({
				type: "block",
				name: "Lifestyle Information",
				rows: 12
			});
			values = [{
				name: "Anthropometry",
				title: "Body measurements such as height, weight, or body mass index",
				domain_id: 7
			}, {
				name: "Cigarette Smoking",
				domain_id: 14
			}, {
				name: "Use of Cigars",
				domain_id: 15
			}, {
				name: "Use of Pipes",
				domain_id: 16
			}, {
				name: "Use of Chewing Tobacco",
				domain_id: 17
			}, {
				name: "Use of E-Cigarettes",
				domain_id: 18
			}, {
				name: "Use of Other Tobacco Products Specified",
				domain_id: 19
			}, {
				name: "Alcohol Consumption",
				domain_id: 13
			}, {
				name: "Dietary Intake",
				domain_id: 8
			}, {
				name: "Dietary Supplement Use",
				domain_id: 9
			}, {
				name: "Physical Activity",
				domain_id: 20
			}, {
				name: "Sleep Habits",
				domain_id: 21
			}];
			values.forEach(function (vl) {
				let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if (vl.title) {
					tmp.title = vl.title;
				}
				let baselines = dict[vl.domain_id];

				for (key in baselines) {
					let v = baselines[key];
					tmp[key] = v;
				}

				dt.list.push(tmp);
			});

			dt.list.push({
				type: "block",
				name: "Health Information",
				rows: 14
			});
			values = [{
				name: "Self-Reported Health",
				domain_id: 23
			}, {
				name: "Reproductive History",
				domain_id: 22
			}, {
				name: "Quality of Life",
				domain_id: 24
			}, {
				name: "Social Support",
				domain_id: 25
			}, {
				name: "Cognitive Function",
				domain_id: 26
			}, {
				name: "Depression",
				domain_id: 27
			}, {
				name: "Other Psychosocial Variables",
				domain_id: 28
			}, {
				name: "Fatigue",
				domain_id: 29
			}, {
				name: "Complementary and Alternative Medicine",
				domain_id: 10
			}, {
				name: "Prescription Medication Use (not-related to cancer treatment)",
				domain_id: 11
			}, {
				name: "Non-prescription Medication Use (not-related to cancer treatment)",
				domain_id: 12
			}, {
				name: "Family History of Cancer",
				domain_id: 30
			}, {
				name: "Family History of Cancer with Pedigrees",
				domain_id: 31
			}, {
				name: "Environmental or Occupational Exposures",
				title: "Such as air contanminants/quality, occupational exposures and history, water source",
				domain_id: 32
			}];
			values.forEach(function (vl) {
				let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if (vl.title) {
					tmp.title = vl.title;
				}
				let baselines = dict[vl.domain_id];

				for (key in baselines) {
					let v = baselines[key];
					tmp[key] = v;
				}

				dt.list.push(tmp);
			});
			dt.list.push({
				type: "block",
				name: "Co-Morbid Conditions",
				rows: 7
			});
			values = [{
				name: "Diabetes",
				domain_id: 34
			}, {
				name: "Stroke",
				domain_id: 35
			}, {
				name: "COPD and/or Emphysema",
				domain_id: 36
			}, {
				name: "Cardiovascular Disease",
				domain_id: 37
			}, {
				name: "Osteoporosis",
				domain_id: 38
			}, {
				name: "Mental Health",
				domain_id: 39
			}, {
				name: "Cognitive Decline",
				domain_id: 40
			}];
			values.forEach(function (vl) {
				let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if (vl.title) {
					tmp.title = vl.title;
				}
				let baselines = dict[vl.domain_id];

				for (key in baselines) {
					let v = baselines[key];
					tmp[key] = v;
				}

				dt.list.push(tmp);
			});

			res.json({ status: 200, data: dt });
		}
		else {
			res.json({ status: 200, data: { list: [] } });
		}
	});
}