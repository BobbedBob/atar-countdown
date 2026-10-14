// 2026 senior secondary written exam timetables for each state and territory.
// Start times are local to that state, with its UTC offset, as printed on the official timetable.
// Oral/performance/practical exams are scheduled individually, so they're not included.
const SYSTEMS = [
    {
        id: "vic",
        label: "VIC (VCE)",
        name: "VCE",
        // Melbourne time / AEDT UTC+11
        timetableUrl: "https://vcaa.vic.edu.au/administration/key-dates/vce-examination-timetable",
        resultsUrl: "https://resultsandatar.vic.edu.au/",
        timeZones: ["Australia/Melbourne"],
        // Source: https://vcaa.vic.edu.au/sites/default/files/2026-10/VCEExamsTimetable2026.pdf
        // The Extended Investigation is also scheduled individually.
        sessions: [
            {start: "2026-10-15T08:00:00+11:00", exams: ["Auslan Sign Comprehension and Sign Production"]},
            {start: "2026-10-15T09:25:00+11:00", exams: ["Classical Hebrew"]},
            {
                start: "2026-10-15T14:00:00+11:00", exams: [
                    "Armenian", "Bengali", "Bosnian", "Chin Hakha", "Croatian", "Dutch", "Filipino", "Hebrew", "Hindi",
                    "Hungarian", "Karen", "Khmer", "Macedonian", "Persian", "Polish", "Portuguese", "Punjabi", "Romanian",
                    "Russian", "Serbian", "Sinhala", "Swedish", "Tamil", "Turkish"
                ]
            },
            {start: "2026-10-16T13:55:00+11:00", exams: ["Classical Greek"]},

            {start: "2026-10-27T09:00:00+11:00", exams: ["English", "English as an Additional Language (EAL)"]},

            {start: "2026-10-28T09:00:00+11:00", exams: ["Agricultural and Horticultural Studies"]},
            {start: "2026-10-28T11:45:00+11:00", exams: ["Art Making and Exhibiting"]},
            {start: "2026-10-28T15:00:00+11:00", exams: ["English Language", "Indonesian First Language", "Vietnamese First Language"]},

            {start: "2026-10-29T09:00:00+11:00", exams: ["VET Business", "VET Community Services", "Theatre Studies"]},
            {start: "2026-10-29T11:45:00+11:00", exams: ["Economics"]},
            {start: "2026-10-29T15:00:00+11:00", exams: ["Chinese First Language", "Japanese First Language", "Korean First Language", "Literature"]},

            {start: "2026-10-30T09:00:00+11:00", exams: ["Psychology"]},
            {start: "2026-10-30T14:00:00+11:00", exams: ["General Mathematics Examination 1"]},

            {start: "2026-11-02T09:00:00+11:00", exams: ["Biology"]},
            {start: "2026-11-02T14:00:00+11:00", exams: ["General Mathematics Examination 2"]},

            // Tuesday 3 November: Melbourne Cup public holiday

            {start: "2026-11-04T09:00:00+11:00", exams: ["Art Creative Practice", "VET Engineering Studies", "VET Health Allied", "VET Health Services Assistance"]},
            {start: "2026-11-04T11:45:00+11:00", exams: ["Aboriginal Languages of Victoria", "Algorithmics (HESS)", "Classical Studies", "Korean Second Language", "Vietnamese Second Language"]},
            {start: "2026-11-04T15:00:00+11:00", exams: ["Business Management"]},

            {start: "2026-11-05T09:00:00+11:00", exams: ["Mathematical Methods Examination 1", "Music Composition"]},
            {start: "2026-11-05T11:45:00+11:00", exams: ["VET Equine Studies", "VET Hospitality"]},
            {start: "2026-11-05T15:00:00+11:00", exams: ["Chinese Language, Culture and Society", "Health and Human Development"]},

            {start: "2026-11-06T09:00:00+11:00", exams: ["Dance", "VET Integrated Technologies"]},
            {start: "2026-11-06T11:45:00+11:00", exams: ["Mathematical Methods Examination 2"]},
            {start: "2026-11-06T15:00:00+11:00", exams: ["Arabic", "Legal Studies", "VET Creative and Digital Media"]},

            {start: "2026-11-09T09:00:00+11:00", exams: ["Music Inquiry", "Specialist Mathematics Examination 1"]},
            {start: "2026-11-09T11:45:00+11:00", exams: ["Applied Computing: Data Analytics", "Physical Education", "Spanish"]},
            {start: "2026-11-09T15:00:00+11:00", exams: ["History: Revolutions", "Industry and Enterprise"]},

            {start: "2026-11-10T09:00:00+11:00", exams: ["Chemistry"]},
            {start: "2026-11-10T14:00:00+11:00", exams: ["Environmental Science", "Greek", "Media", "Text and Traditions"]},

            {start: "2026-11-11T09:00:00+11:00", exams: ["VET Furnishing", "Visual Communication Design"]},
            {start: "2026-11-11T11:45:00+11:00", exams: ["History: Australian History", "Outdoor and Environmental Studies", "Specialist Mathematics Examination 2"]},
            {start: "2026-11-11T15:00:00+11:00", exams: ["Accounting"]},

            {start: "2026-11-12T09:00:00+11:00", exams: ["Physics"]},
            {start: "2026-11-12T14:00:00+11:00", exams: ["History: Ancient History", "Geography", "Sociology"]},

            {start: "2026-11-13T09:00:00+11:00", exams: ["Product Design and Technologies", "VET Information and Communications Technology", "VET Music (Sound Production)"]},
            {start: "2026-11-13T11:45:00+11:00", exams: ["Drama", "VET Sport and Recreation"]},
            {start: "2026-11-13T15:00:00+11:00", exams: ["Applied Computing: Software Development", "German", "Philosophy"]},

            {start: "2026-11-16T09:00:00+11:00", exams: ["Food Studies"]},
            {start: "2026-11-16T11:45:00+11:00", exams: ["VET Hospitality (Cookery)", "VET Laboratory Skills", "Systems Engineering"]},
            {start: "2026-11-16T15:00:00+11:00", exams: ["Latin", "Politics", "Religion and Society"]},

            {start: "2026-11-17T09:00:00+11:00", exams: ["Music Contemporary Performance", "Music Repertoire Performance"]},
            {start: "2026-11-17T11:45:00+11:00", exams: ["Indonesian Second Language", "Italian"]},
            {start: "2026-11-17T15:00:00+11:00", exams: ["Foundation Mathematics", "French"]},

            {start: "2026-11-18T09:00:00+11:00", exams: ["Japanese Second Language"]},
            {start: "2026-11-18T14:00:00+11:00", exams: ["Chinese Second Language", "Chinese Second Language Advanced"]},

            // Not an exam, but worth counting down to. Source: https://vtac.edu.au/dates
            {start: "2026-12-10T07:00:00+11:00", exams: ["ATAR & study scores release"], release: true},
        ],
    },
    {
        id: "nsw",
        label: "NSW (HSC)",
        name: "HSC",
        // Sydney time / AEDT UTC+11
        timetableUrl: "https://www.nsw.gov.au/education-and-training/nesa/key-dates/hsc-written-exam-timetable",
        resultsUrl: "https://www.uac.edu.au/",
        timeZones: ["Australia/Sydney", "Australia/Broken_Hill", "Australia/Lord_Howe"],
        // Source: https://www.nsw.gov.au/sites/default/files/noindex/2026-05/2026-hsc-written-exam-timetable-01-05-26.pdf
        // Exams in the same session often start a few minutes apart, so sessions are split by start time.
        sessions: [
            {
                start: "2026-10-13T09:50:00+11:00", exams: [
                    "English Advanced Paper 1", "English Standard Paper 1", "English Studies", "English EAL/D Paper 1"
                ]
            },
            {
                start: "2026-10-13T14:00:00+11:00", exams: [
                    "Classical Greek Extension", "Classical Hebrew Extension", "German Continuers",
                    "Indonesian Extension", "Japanese Beginners", "Japanese Continuers"
                ]
            },

            {start: "2026-10-14T09:25:00+11:00", exams: ["English Advanced Paper 2", "English Standard Paper 2", "English EAL/D Paper 2"]},
            {start: "2026-10-14T13:55:00+11:00", exams: ["Music 1 Aural Skills"]},
            {start: "2026-10-14T15:25:00+11:00", exams: ["Music 2 Musicology and Aural Skills"]},

            {start: "2026-10-15T09:20:00+11:00", exams: ["Indonesian Beginners"]},
            {start: "2026-10-15T09:25:00+11:00", exams: ["Classical Hebrew Continuers", "Earth and Environmental Science", "Tourism, Travel and Events (VET)"]},
            {start: "2026-10-15T09:30:00+11:00", exams: ["Indonesian Continuers"]},
            {start: "2026-10-15T13:55:00+11:00", exams: ["Agriculture"]},
            {
                start: "2026-10-15T14:00:00+11:00", exams: [
                    "Arabic Continuers", "Chinese in Context", "Japanese in Context", "Korean in Context",
                    "Modern Hebrew Continuers", "Spanish Beginners", "Spanish Continuers", "Vietnamese Continuers",
                    "Armenian Continuers", "Croatian Continuers", "Dutch Continuers", "Filipino Continuers",
                    "Hindi Continuers", "Hungarian Continuers", "Khmer Continuers", "Macedonian Continuers",
                    "Persian Continuers", "Polish Continuers", "Portuguese Continuers", "Punjabi Continuers",
                    "Russian Continuers", "Serbian Continuers", "Swedish Continuers", "Tamil Continuers", "Turkish Continuers"
                ]
            },

            {start: "2026-10-16T09:25:00+11:00", exams: ["Modern History"]},
            {start: "2026-10-16T09:30:00+11:00", exams: ["Japanese Extension"]},
            {start: "2026-10-16T13:55:00+11:00", exams: ["Classical Greek Continuers", "Hospitality (VET)"]},
            {start: "2026-10-16T14:00:00+11:00", exams: ["German Extension"]},

            {start: "2026-10-19T09:20:00+11:00", exams: ["Mathematics Advanced", "Mathematics Standard 1", "Mathematics Standard 2"]},
            {start: "2026-10-19T13:50:00+11:00", exams: ["Mathematics Extension 2"]},

            {start: "2026-10-20T09:20:00+11:00", exams: ["German Beginners"]},
            {start: "2026-10-20T09:25:00+11:00", exams: ["Engineering Studies", "Latin Continuers", "Primary Industries (VET)", "Textiles and Design"]},
            {start: "2026-10-20T09:30:00+11:00", exams: ["Spanish Extension"]},
            {start: "2026-10-20T13:55:00+11:00", exams: ["Automotive (VET)", "Society and Culture"]},
            {start: "2026-10-20T14:00:00+11:00", exams: ["Arabic Extension", "Chinese Continuers"]},

            {start: "2026-10-21T09:25:00+11:00", exams: ["Biology"]},
            {start: "2026-10-21T13:50:00+11:00", exams: ["History Extension"]},
            {start: "2026-10-21T13:55:00+11:00", exams: ["Business Services (VET)"]},
            {start: "2026-10-21T14:00:00+11:00", exams: ["Chinese and Literature"]},

            {start: "2026-10-22T09:20:00+11:00", exams: ["Latin Extension"]},
            {start: "2026-10-22T09:25:00+11:00", exams: ["Studies of Religion I", "Studies of Religion II"]},
            {start: "2026-10-22T13:55:00+11:00", exams: ["Drama"]},
            {start: "2026-10-22T14:00:00+11:00", exams: ["Chinese Beginners", "Chinese Extension"]},

            {start: "2026-10-23T09:25:00+11:00", exams: ["Ancient History", "Electrotechnology (VET)"]},
            {start: "2026-10-23T13:50:00+11:00", exams: ["Mathematics Extension 1"]},

            {start: "2026-10-26T09:25:00+11:00", exams: ["Business Studies"]},
            {start: "2026-10-26T13:50:00+11:00", exams: ["Science Extension"]},
            {start: "2026-10-26T13:55:00+11:00", exams: ["Construction (VET)"]},

            {start: "2026-10-27T09:20:00+11:00", exams: ["Modern Greek Beginners"]},
            {start: "2026-10-27T09:25:00+11:00", exams: ["Human Services (VET)"]},
            {start: "2026-10-27T09:30:00+11:00", exams: ["Italian Continuers", "Korean Continuers", "Modern Greek Extension"]},
            {start: "2026-10-27T09:50:00+11:00", exams: ["Software Engineering"]},
            {start: "2026-10-27T13:55:00+11:00", exams: ["Economics", "Entertainment Industry (VET)"]},

            {start: "2026-10-28T09:20:00+11:00", exams: ["Health and Movement Science"]},
            {start: "2026-10-28T13:50:00+11:00", exams: ["English Extension 1"]},
            {start: "2026-10-28T13:55:00+11:00", exams: ["Information and Digital Technology (VET)", "Retail Services (VET)"]},
            {start: "2026-10-28T14:00:00+11:00", exams: ["Korean and Literature"]},

            {start: "2026-10-29T09:20:00+11:00", exams: ["Italian Beginners", "Korean Beginners"]},
            {start: "2026-10-29T09:25:00+11:00", exams: ["Dance"]},
            {start: "2026-10-29T09:30:00+11:00", exams: ["Italian Extension", "Modern Greek Continuers"]},
            {start: "2026-10-29T09:50:00+11:00", exams: ["Enterprise Computing"]},
            {start: "2026-10-29T13:55:00+11:00", exams: ["Design and Technology"]},
            {start: "2026-10-29T14:00:00+11:00", exams: ["French Beginners", "French Extension"]},

            {start: "2026-10-30T09:25:00+11:00", exams: ["Aboriginal Studies", "Chemistry", "Financial Services (VET)"]},
            {start: "2026-10-30T13:55:00+11:00", exams: ["Visual Arts"]},

            {start: "2026-11-02T09:25:00+11:00", exams: ["Legal Studies"]},
            {start: "2026-11-02T13:50:00+11:00", exams: ["Geography"]},

            {start: "2026-11-03T09:25:00+11:00", exams: ["Community and Family Studies"]},
            {start: "2026-11-03T13:55:00+11:00", exams: ["Investigating Science"]},
            {start: "2026-11-03T14:00:00+11:00", exams: ["French Continuers"]},

            {start: "2026-11-04T09:25:00+11:00", exams: ["Food Technology"]},
            {start: "2026-11-04T13:55:00+11:00", exams: ["Industrial Technology"]},

            {start: "2026-11-05T09:25:00+11:00", exams: ["Physics"]},

            // Source: https://www.uac.edu.au/key-dates
            {start: "2026-12-16T09:00:00+11:00", exams: ["ATAR release"], release: true},
        ],
    },
    {
        id: "qld",
        label: "QLD (QCE)",
        name: "QCE",
        // Brisbane time / AEST UTC+10 (no daylight saving)
        timetableUrl: "https://www.qcaa.qld.edu.au/senior/assessment/external-assessment/timetable",
        resultsUrl: "https://www.qtac.edu.au/year-12-atar/",
        timeZones: ["Australia/Brisbane", "Australia/Lindeman"],
        // Source: https://www.qcaa.qld.edu.au/downloads/senior/snr_ext_assess_timetable_2026.pdf
        // The timetable only gives AM/PM sessions. They're scheduled statewide for 9:00 am and 12:30 pm, see
        // https://www.qcaa.qld.edu.au/senior/certificates-and-qualifications/qce-qcia-handbook/10-external-assessment/10.3-scheduling-external-assessment
        // Senior External Examinations aren't included.
        sessions: [
            {start: "2026-10-26T09:00:00+10:00", exams: ["Economics"]},
            {start: "2026-10-26T12:30:00+10:00", exams: ["Aerospace Systems", "Health", "Music"]},

            {start: "2026-10-27T09:00:00+10:00", exams: ["English", "English as an Additional Language"]},
            {start: "2026-10-27T12:30:00+10:00", exams: ["Ancient History"]},

            {start: "2026-10-28T09:00:00+10:00", exams: ["Chinese", "Philosophy & Reason", "Physical Education"]},
            {start: "2026-10-28T12:30:00+10:00", exams: ["Spanish", "Visual Art"]},

            {start: "2026-10-29T09:00:00+10:00", exams: ["Literature"]},
            {start: "2026-10-29T12:30:00+10:00", exams: ["Legal Studies"]},

            {start: "2026-10-30T09:00:00+10:00", exams: ["Chemistry (Paper 1)"]},
            {start: "2026-10-30T12:30:00+10:00", exams: ["Chemistry (Paper 2)"]},

            {start: "2026-11-02T09:00:00+10:00", exams: ["Biology (Paper 1)"]},
            {start: "2026-11-02T12:30:00+10:00", exams: ["Biology (Paper 2)"]},

            {start: "2026-11-03T09:00:00+10:00", exams: ["Aboriginal & Torres Strait Islander Studies", "German", "Study of Religion"]},
            {start: "2026-11-03T12:30:00+10:00", exams: ["Business", "Music Extension"]},

            {start: "2026-11-04T09:00:00+10:00", exams: ["Film, Television & New Media", "Chinese Extension", "French Extension", "German Extension"]},
            {start: "2026-11-04T12:30:00+10:00", exams: ["Accounting", "Drama", "Italian"]},

            {start: "2026-11-05T09:00:00+10:00", exams: ["Modern History"]},
            {start: "2026-11-05T12:30:00+10:00", exams: ["General Mathematics (Paper 1)", "Specialist Mathematics (Paper 1)"]},

            {start: "2026-11-06T09:00:00+10:00", exams: ["General Mathematics (Paper 2)", "Specialist Mathematics (Paper 2)"]},
            {start: "2026-11-06T12:30:00+10:00", exams: ["Design"]},

            {start: "2026-11-09T09:00:00+10:00", exams: ["Physics (Paper 1)"]},
            {start: "2026-11-09T12:30:00+10:00", exams: ["Physics (Paper 2)"]},

            {start: "2026-11-10T09:00:00+10:00", exams: ["Dance", "Digital Solutions", "English & Literature Extension"]},
            {start: "2026-11-10T12:30:00+10:00", exams: ["Psychology (Paper 1)"]},

            {start: "2026-11-11T09:00:00+10:00", exams: ["Psychology (Paper 2)"]},
            {start: "2026-11-11T12:30:00+10:00", exams: ["Earth & Environmental Science (Paper 1)", "Engineering", "Food & Nutrition"]},

            {start: "2026-11-12T09:00:00+10:00", exams: ["Earth & Environmental Science (Paper 2)", "Geography"]},
            {start: "2026-11-12T12:30:00+10:00", exams: ["French", "Japanese"]},

            {start: "2026-11-13T09:00:00+10:00", exams: ["Mathematical Methods (Paper 1)"]},
            {start: "2026-11-13T12:30:00+10:00", exams: ["Mathematical Methods (Paper 2)"]},

            {start: "2026-11-16T09:00:00+10:00", exams: ["Marine Science (Paper 1)"]},
            {start: "2026-11-16T12:30:00+10:00", exams: ["Marine Science (Paper 2)"]},

            {start: "2026-11-17T09:00:00+10:00", exams: ["Agricultural Science (Paper 1)"]},
            {start: "2026-11-17T12:30:00+10:00", exams: ["Agricultural Science (Paper 2)"]},

            // Source: https://www.qtac.edu.au/year-12-atar/
            {start: "2026-12-18T09:00:00+10:00", exams: ["ATAR release"], release: true},
        ],
    },
    {
        id: "sa",
        label: "SA/NT (SACE)",
        name: "SACE",
        // Adelaide time / ACDT UTC+10:30. NT students sit them at the same moment (an hour earlier on the clock).
        timetableUrl: "https://www.sace.sa.edu.au/documents/652891/ddb4a5dc-0c02-4287-adbd-70944a6cb66c",
        timeZones: ["Australia/Adelaide", "Australia/Darwin"],
        // Source: the timetable above. SATAC hasn't announced the 2026 results/ATAR release yet.
        sessions: [
            {start: "2026-10-13T13:30:00+10:30", exams: ["Japanese (beginners)"]},

            {start: "2026-10-15T09:00:00+10:30", exams: ["Indonesian (beginners)"]},
            {start: "2026-10-15T10:00:00+10:30", exams: ["Auslan (continuers)"]},
            {
                start: "2026-10-15T13:30:00+10:30", exams: [
                    "Spanish (beginners)",
                    "Armenian (continuers)", "Bengali (continuers)", "Bosnian (continuers)", "Chin Hakha (continuers)",
                    "Croatian (continuers)", "Dutch (continuers)", "Filipino (continuers)", "Hebrew (continuers)",
                    "Hindi (continuers)", "Hungarian (continuers)", "Karen (continuers)", "Khmer (continuers)",
                    "Nepali (continuers)", "Persian (continuers)", "Polish (continuers)", "Portuguese (continuers)",
                    "Punjabi (continuers)", "Romanian (continuers)", "Russian (continuers)", "Serbian (continuers)",
                    "Sinhala (continuers)", "Swedish (continuers)", "Tamil (continuers)", "Turkish (continuers)"
                ]
            },

            {start: "2026-10-20T09:00:00+10:30", exams: ["German (beginners)"]},
            {start: "2026-10-20T09:25:00+10:30", exams: ["Latin (continuers)"]},

            {start: "2026-10-22T13:30:00+10:30", exams: ["Chinese (beginners)"]},

            {start: "2026-10-27T09:00:00+10:30", exams: ["Korean (continuers)", "Modern Greek (beginners)"]},

            {start: "2026-10-28T14:30:00+10:30", exams: ["Indonesian (background speakers)"]},

            {start: "2026-10-29T09:00:00+10:30", exams: ["Italian (beginners)", "Korean (beginners)"]},
            {start: "2026-10-29T13:30:00+10:30", exams: ["French (beginners)"]},
            {start: "2026-10-29T14:30:00+10:30", exams: ["Japanese (background speakers)", "Korean (background speakers)"]},

            {start: "2026-11-02T09:00:00+10:30", exams: ["Mathematical Methods"]},
            {start: "2026-11-02T13:30:00+10:30", exams: ["General Mathematics"]},

            {start: "2026-11-03T09:00:00+10:30", exams: ["Nutrition"]},
            {
                start: "2026-11-03T13:30:00+10:30", exams: [
                    "Chinese (background speakers)", "Chinese (continuers)", "French (continuers)",
                    "Indonesian (continuers)", "Modern Greek (continuers)", "Spanish (continuers)"
                ]
            },

            {start: "2026-11-04T09:00:00+10:30", exams: ["Chemistry"]},
            {start: "2026-11-04T13:30:00+10:30", exams: ["Psychology"]},

            {start: "2026-11-05T09:00:00+10:30", exams: ["Physics"]},
            {start: "2026-11-05T13:30:00+10:30", exams: ["Accounting"]},

            {start: "2026-11-06T09:00:00+10:30", exams: ["Biology"]},
            {start: "2026-11-06T13:30:00+10:30", exams: ["Essential Mathematics"]},
            {start: "2026-11-06T14:30:00+10:30", exams: ["Arabic (continuers)"]},

            {start: "2026-11-09T09:00:00+10:30", exams: ["Modern History"]},
            {start: "2026-11-09T13:30:00+10:30", exams: ["English Literary Studies"]},

            {start: "2026-11-10T09:00:00+10:30", exams: ["Specialist Mathematics"]},
            {start: "2026-11-10T13:30:00+10:30", exams: ["Economics"]},

            {
                start: "2026-11-11T09:00:00+10:30", exams: [
                    "German (continuers)", "Italian (continuers)", "Japanese (continuers)",
                    "Vietnamese (background speakers)", "Vietnamese (continuers)"
                ]
            },
            {start: "2026-11-11T13:30:00+10:30", exams: ["English as an Additional Language"]},

            {start: "2026-11-12T09:00:00+10:30", exams: ["Legal Studies"]},
            {start: "2026-11-12T13:30:00+10:30", exams: ["Tourism"]},

            {start: "2026-11-13T09:00:00+10:30", exams: ["Music Studies"]},
            {start: "2026-11-13T13:30:00+10:30", exams: ["Geography"]},
        ],
    },
    {
        id: "wa",
        label: "WA (WACE)",
        name: "WACE",
        // Perth time / AWST UTC+8 (no daylight saving)
        timetableUrl: "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0004/1254937/2026-ATAR-course-written-examinations-timetable.pdf",
        resultsUrl: "https://www.tisc.edu.au/",
        timeZones: ["Australia/Perth", "Australia/Eucla"],
        // Source: the timetable above, including the interstate language exams on page 2
        sessions: [
            {
                start: "2026-10-15T11:00:00+08:00", exams: [
                    "Auslan", "Bengali", "Bosnian", "Croatian", "Dutch", "Filipino", "Hebrew", "Hungarian", "Karen",
                    "Khmer", "Macedonian", "Persian", "Polish", "Portuguese", "Romanian", "Russian", "Serbian",
                    "Sinhala", "Swedish", "Turkish", "Japanese: Background Language", "Chinese: Background Language"
                ]
            },

            {start: "2026-10-28T09:20:00+08:00", exams: ["Aviation", "Psychology"]},
            {start: "2026-10-28T14:00:00+08:00", exams: ["Engineering Studies", "Indonesian: Second Language", "Korean: Second Language"]},

            {start: "2026-10-29T09:20:00+08:00", exams: ["Agribusiness", "Chemistry"]},
            {start: "2026-10-29T14:00:00+08:00", exams: ["Computer Science", "German: Background Language", "Ancient History"]},

            {start: "2026-10-30T09:20:00+08:00", exams: ["English"]},
            {start: "2026-10-30T14:00:00+08:00", exams: ["English as an Additional Language or Dialect"]},

            {start: "2026-11-02T09:20:00+08:00", exams: ["Agricultural Science and Technology", "Mathematics Methods"]},
            {start: "2026-11-02T14:00:00+08:00", exams: ["Applied Information Technology", "Chinese: Second Language"]},

            {start: "2026-11-03T09:20:00+08:00", exams: ["Literature"]},
            {start: "2026-11-03T11:00:00+08:00", exams: ["Modern Greek", "Spanish"]},
            {start: "2026-11-03T14:00:00+08:00", exams: ["Dance", "German: Second Language", "Media Production and Analysis"]},

            {start: "2026-11-04T08:45:00+08:00", exams: ["Vietnamese"]},
            {start: "2026-11-04T09:20:00+08:00", exams: ["Physics"]},
            {start: "2026-11-04T14:00:00+08:00", exams: ["Chinese: First Language", "Indonesian: Background Language", "Politics and Law"]},

            {start: "2026-11-05T09:20:00+08:00", exams: ["Human Biology"]},
            {start: "2026-11-05T14:00:00+08:00", exams: ["Drama", "Outdoor Education"]},

            {start: "2026-11-06T09:20:00+08:00", exams: ["Mathematics Applications"]},
            {start: "2026-11-06T12:00:00+08:00", exams: ["Arabic"]},
            {start: "2026-11-06T14:00:00+08:00", exams: ["Japanese: Second Language", "Materials Design and Technology"]},

            {start: "2026-11-09T09:20:00+08:00", exams: ["Food Science and Technology", "Mathematics Specialist"]},
            {start: "2026-11-09T14:00:00+08:00", exams: ["Biology", "French: Background Language", "Korean: Background Language"]},

            {start: "2026-11-10T09:20:00+08:00", exams: ["Economics"]},
            {start: "2026-11-10T14:00:00+08:00", exams: ["Marine and Maritime Studies", "Punjabi: Background Language", "Visual Arts"]},

            {start: "2026-11-11T09:20:00+08:00", exams: ["Business Management and Enterprise"]},
            {start: "2026-11-11T14:00:00+08:00", exams: ["Geography", "Tamil: Background Language"]},

            {start: "2026-11-12T09:20:00+08:00", exams: ["Modern History"]},
            {start: "2026-11-12T14:00:00+08:00", exams: ["Italian: Background Language", "Physical Education Studies"]},

            {start: "2026-11-13T09:20:00+08:00", exams: ["Accounting and Finance", "Earth and Environmental Science"]},
            {start: "2026-11-13T14:00:00+08:00", exams: ["Philosophy and Ethics", "Religion and Life"]},

            {start: "2026-11-16T09:20:00+08:00", exams: ["Health Studies"]},
            {start: "2026-11-16T14:00:00+08:00", exams: ["French: Second Language", "Hindi: Background Language"]},

            {start: "2026-11-17T09:20:00+08:00", exams: ["Design"]},
            {start: "2026-11-17T14:00:00+08:00", exams: ["Music"]},

            {start: "2026-11-18T09:20:00+08:00", exams: ["Italian: Second Language"]},

            // Source: https://www.tisc.edu.au/static/guide/tisc-calendar-current.tisc
            {start: "2026-12-20T08:00:00+08:00", exams: ["ATAR release"], release: true},
        ],
    },
    {
        id: "tas",
        label: "TAS (TCE)",
        name: "TCE",
        // Hobart time / AEDT UTC+11
        timetableUrl: "https://www.tasc.tas.gov.au/2026-exam-timetables/",
        resultsUrl: "https://www.tasc.tas.gov.au/students/years-11-and-12/your-results/student-faqs-results/",
        timeZones: ["Australia/Hobart"],
        // Source: https://assets.tasc.tas.gov.au/uploads/2026/08/2026-TASC-Written-Exam-Timetable.pdf
        sessions: [
            {start: "2026-11-09T09:00:00+11:00", exams: ["Electronics and Advanced Technologies", "General Mathematics"]},
            {start: "2026-11-09T13:30:00+11:00", exams: ["Mathematics Specialised", "Sociology"]},

            {start: "2026-11-10T09:00:00+11:00", exams: ["Computer Graphics and Design", "Philosophy", "Sport Science"]},
            {start: "2026-11-10T13:30:00+11:00", exams: ["Chinese", "Health Studies", "Japanese"]},

            {start: "2026-11-11T09:00:00+11:00", exams: ["English", "English as an Additional Language or Dialect"]},
            {start: "2026-11-11T13:30:00+11:00", exams: ["English Literature", "Environmental Science"]},

            {
                start: "2026-11-12T09:00:00+11:00", exams: [
                    "Australia in Asia and the Pacific", "Italian", "Mathematics Methods – Foundation", "Media Production"
                ]
            },
            {start: "2026-11-12T13:30:00+11:00", exams: ["Legal Studies"]},

            {start: "2026-11-13T09:00:00+11:00", exams: ["Physical Sciences", "Physics"]},
            {start: "2026-11-13T13:30:00+11:00", exams: ["Economics", "Music", "Outdoor Leadership"]},

            {start: "2026-11-16T09:00:00+11:00", exams: ["Biology"]},
            {start: "2026-11-16T13:30:00+11:00", exams: ["Business Studies", "Drama"]},

            {start: "2026-11-17T09:00:00+11:00", exams: ["Geography", "Mathematics Methods"]},
            {start: "2026-11-17T13:30:00+11:00", exams: ["Food and Nutrition", "French"]},

            {start: "2026-11-18T09:00:00+11:00", exams: ["Accounting", "Ancient History", "German"]},
            {start: "2026-11-18T13:30:00+11:00", exams: ["Chemistry", "Studies of Religion"]},

            {start: "2026-11-19T09:00:00+11:00", exams: ["Computer Science", "Psychology"]},
            {start: "2026-11-19T13:30:00+11:00", exams: ["Housing and Design", "Modern History"]},

            // TASC emails results (with the ATAR) out progressively over the day, so this counts to the start of it.
            // Source: the results FAQ above
            {
                start: "2026-12-16T00:00:00+11:00", exams: ["Results & ATAR release"], release: true,
                info: "TASC emails results out progressively throughout Wednesday 16 December 2026",
            },
        ],
    },
    {
        id: "act",
        label: "ACT",
        name: "ACT",
        // Canberra time / AEDT UTC+11
        timetableUrl: "https://www.bsss.act.edu.au/",
        resultsUrl: "https://www.uac.edu.au/",
        timeZones: ["Australia/Canberra", "Australia/ACT"],
        // The ACT has no external exams (it's all school-based assessment), so there's only the ATAR to wait for.
        sessions: [
            // Source: https://www.uac.edu.au/key-dates
            {start: "2026-12-16T09:00:00+11:00", exams: ["ATAR release"], release: true},
        ],
    },
]
