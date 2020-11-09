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
				if (dict[l.category_id] == null) {
					dict[l.category_id] = {};
				}
				if (cache.indexOf(l.id) == -1) {
					cache.push(l.id);
					dt.cohorts.push({
						cohort_id: l.id,
						cohort_name: l.cohort_name,
						cohort_acronym: l.cohort_acronym
					});
				}
				let tmp = dict[l.category_id];
				let v = l.baseline;
				if (v == -1) {
					v = "N/P";
				}
				else {
					v = v ? "Yes" : "No";
					if (l.category_id == 19) {
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
				category_id: 1
			}, {
				name: "Education Level",
				category_id: 2
			}, {
				name: "Marital Status",
				category_id: 3
			}, {
				name: "Language/Country of Origin",
				category_id: 4
			}, {
				name: "Employment Status",
				category_id: 5
			}, {
				name: "Geocoding Information",
				title: "Geographic coordinates of location of interest",
				category_id: 33
			}, {
				name: "Health Insurance Status",
				category_id: 6
			}];
			values.forEach(function (vl) {
				let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if (vl.title) {
					tmp.title = vl.title;
				}
				let baselines = dict[vl.category_id];
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
				category_id: 7
			}, {
				name: "Cigarette Smoking",
				category_id: 14
			}, {
				name: "Use of Cigars",
				category_id: 15
			}, {
				name: "Use of Pipes",
				category_id: 16
			}, {
				name: "Use of Chewing Tobacco",
				category_id: 17
			}, {
				name: "Use of E-Cigarettes",
				category_id: 18
			}, {
				name: "Use of Other Tobacco Products Specified",
				category_id: 19
			}, {
				name: "Alcohol Consumption",
				category_id: 13
			}, {
				name: "Dietary Intake",
				category_id: 8
			}, {
				name: "Dietary Supplement Use",
				category_id: 9
			}, {
				name: "Physical Activity",
				category_id: 20
			}, {
				name: "Sleep Habits",
				category_id: 21
			}];
			values.forEach(function (vl) {
				let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if (vl.title) {
					tmp.title = vl.title;
				}
				let baselines = dict[vl.category_id];

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
				category_id: 23
			}, {
				name: "Reproductive History",
				category_id: 22
			}, {
				name: "Quality of Life",
				category_id: 24
			}, {
				name: "Social Support",
				category_id: 25
			}, {
				name: "Cognitive Function",
				category_id: 26
			}, {
				name: "Depression",
				category_id: 27
			}, {
				name: "Other Psychosocial Variables",
				category_id: 28
			}, {
				name: "Fatigue",
				category_id: 29
			}, {
				name: "Complementary and Alternative Medicine",
				category_id: 10
			}, {
				name: "Prescription Medication Use (not-related to cancer treatment)",
				category_id: 11
			}, {
				name: "Non-prescription Medication Use (not-related to cancer treatment)",
				category_id: 12
			}, {
				name: "Family History of Cancer",
				category_id: 30
			}, {
				name: "Family History of Cancer with Pedigrees",
				category_id: 31
			}, {
				name: "Environmental or Occupational Exposures",
				title: "Such as air contanminants/quality, occupational exposures and history, water source",
				category_id: 32
			}];
			values.forEach(function (vl) {
				let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if (vl.title) {
					tmp.title = vl.title;
				}
				let baselines = dict[vl.category_id];

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
				category_id: 34
			}, {
				name: "Stroke",
				category_id: 35
			}, {
				name: "COPD and/or Emphysema",
				category_id: 36
			}, {
				name: "Cardiovascular Disease",
				category_id: 37
			}, {
				name: "Osteoporosis",
				category_id: 38
			}, {
				name: "Mental Health",
				category_id: 39
			}, {
				name: "Cognitive Decline",
				category_id: 40
			}];
			values.forEach(function (vl) {
				let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if (vl.title) {
					tmp.title = vl.title;
				}
				let baselines = dict[vl.category_id];

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