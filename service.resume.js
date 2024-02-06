(function() {
	"use strict";

	var _ = window._;
	var myResume = {
		//Enter your name here
		name : 'Srikanth COLLATY',

		//Enter your address here
		address : {
			street1: '************',
			street2: '',
			city: 'Paris',
			state: 'France',
			zip: '750001'
		},

		phoneNumber: '07********',

		email: 'srikanthcollaty92@gmail.com',

		github: 'github.com/srikanthsc',

		blog: null,

		//Enter your objective here
		objective : "<p>I am Srikanth Collaty,I have recently graduated, I am a Tech enthusiast. I am always open to collaborating on projects and innovative/disruptive ideas. When I am not coding, you will find me lifting weights in the gym or at my desk sketching stuff</p>" +
					'<strong class="text-muted">Active TS Clearance</strong>',

		//Enter your comma separated skills here.  Any skills you enter will appear at the
		//front of the skills list.  Other skills from your tags and skillsUsed in projects
		//will be added at the end
		skills : [
			"JavaScript",
			"HTML5/CSS",
			"MongoDB",
			"Python"
		],


		//List your projects below
		projects : [
			{
				company : 'Vinci Construction S.I',
				projectName : 'SAP Full Stack Developer',
				dates: '5/23 - 11/23',
				skillsUsed : [
					'JavaScript',
					'SAP',
					'ABAP',
					'SAPUI5',
					'Fiori Elements'
				],
				tags : [
					'SAP',
					'ABAP',
					'SAPUI5',
					'Fiori Elements'
				],
				highlights : [
					'Participate in SAP projects from the design phase to deployment, including unit test development.',
					'Modules covered: SAP HR, SAP FI, SAP CO, SAP SD'
				]
			},
			{
				company : 'TRACTEBEL – ENGIE GROUP',
				projectName : 'BIM Developer',
				dates: '4/22 - 8/22',
				skillsUsed : [
					'C#',
					'SQL'
				],
				tags : [
					'C#',
					'SQL'
				],
				highlights : [
					'Setting up an SQL database for Civil Engineering execution study projects.',
					'Attached to the GCR Unit (Civil Engineering of Reactors)',
					'Nuclear & Industry Unit Directorate. Data processing in C# and use of MS SQL.'
				]
			},
			{
				company : 'Istya',
				projectName : 'Project Manager and developer',
				dates: '9/21 - 2/23',
				skillsUsed : [
					'JavaScript',
					'AngularJS',
					'NodeJS',
					'Figma'
				],
				tags : [
					'JavaScript',
					'AngularJS',
					'NodeJS',
					'Figma'
				],
				highlights : [
					'Create a prediction algorithm to combat pollution episodes.',
					'Use of jupyter notebook for python scripts and Angular for the frontend part.',
				]
			}
		],

		//List your education here
		education : [
			{
				degree : 'Enginering degree',
				school : "ESIEA",
				gradDate : 'December, 2023'
			}
		]
	};

	window.angular.module("resume").factory('ResumeService', ['$q', function ($q) {
		function getResume() {
			var defer = $q.defer();
			//if later you want to use REST inject $http and change this
			setTimeout(function () {
				var skills = {};
				//build the skills list from the tags and skills listed in the projects

				//rapidly de-dup skills
				_.each(myResume.projects, function (project) {
					_.each(project.skillsUsed, function (aSkill) {
						skills[aSkill] = (skills[aSkill] || 0) + 1;
					});
					if (project.tags) {
						_.each(project.tags, function (aTag) {
							skills[aTag] = true;
						});
					}
				});

				//now remove ones that we want at the top of the skills list
				_.each(myResume.skills, function (aPredefinedSkill) {
					skills[aPredefinedSkill] = false;
				});

				//attach the leftovers to the skills list and build activeSkills list
				myResume.activeSkills = {};
				_.each(Object.keys(skills), function (aSkill) {
					if (skills.hasOwnProperty(aSkill)) {
						if (skills[aSkill]) {
							myResume.skills.push(aSkill);
						}
						myResume.activeSkills[aSkill] = true;
					}
				});

				defer.resolve(myResume);
			}, 0);
			return defer.promise;
		}

		function toggleSkillActive(skill) {
			if (skill) {
				myResume.activeSkills[skill] = !myResume.activeSkills[skill];
			}
		}

		function containsActiveSkills (skillSet) {
			return _.reduce(skillSet, function(memo, skill) {
				return memo || myResume.activeSkills[skill];
			}, false);
		}

		function skillIsActive (skill) {
			return myResume.activeSkills[skill] === true;
		}

		return {
			getResume : getResume,
			toggleSkillActive: toggleSkillActive,
			skillIsActive: skillIsActive,
			containsActiveSkills: containsActiveSkills
		};
	}]);
}).call();
