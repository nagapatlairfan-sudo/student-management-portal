/* DEMONSTRATION DATA ONLY — single source of truth. Swap with API calls later. */
const DATA={
college:{name:"Meridian Institute of Technology",short:"MIT"},
student:{name:"Irfan",fullName:"Irfan Ahmed (demo)",id:"STU2026001",dept:"Computer Science and Engineering",semester:5,section:"A",year:"2026–2027",email:"irfan.demo@meridian.example",phone:"+91 90000 00000"},
subjects:[
{code:"CS501",name:"Operating Systems",faculty:"Dr. R. Menon",room:"B-204",total:48,present:43,marks:88},
{code:"CS502",name:"Database Systems",faculty:"Prof. S. Iyer",room:"B-204",total:46,present:42,marks:91},
{code:"CS503",name:"Computer Networks",faculty:"Dr. A. Khan",room:"B-310",total:44,present:34,marks:79},
{code:"CS504",name:"Software Engineering",faculty:"Prof. L. Rao",room:"B-105",total:40,present:36,marks:86},
{code:"CS505",name:"Machine Learning Lab",faculty:"Dr. P. Nair",room:"Lab 3",total:30,present:27,marks:93}],
gpaHistory:[{sem:1,gpa:8.1},{sem:2,gpa:8.3},{sem:3,gpa:8.4},{sem:4,gpa:8.5},{sem:5,gpa:8.6}],
timetableToday:[
{subject:"Operating Systems",faculty:"Dr. R. Menon",room:"B-204",start:"09:00",end:"09:50"},
{subject:"Database Systems",faculty:"Prof. S. Iyer",room:"B-204",start:"10:00",end:"10:50"},
{subject:"Computer Networks",faculty:"Dr. A. Khan",room:"B-310",start:"11:10",end:"12:00"},
{subject:"Machine Learning Lab",faculty:"Dr. P. Nair",room:"Lab 3",start:"14:00",end:"16:00"}],
assignments:[
{id:1,title:"Process Scheduling Simulator",subject:"Operating Systems",due:"2026-10-24",priority:"High",status:"Pending"},
{id:2,title:"ER Diagram for Library System",subject:"Database Systems",due:"2026-10-27",priority:"Medium",status:"Pending"},
{id:3,title:"Subnetting Worksheet",subject:"Computer Networks",due:"2026-10-30",priority:"Low",status:"Pending"}],
exams:[
{name:"Internal Assessment II",subject:"Computer Networks",date:"2026-11-03T10:00",hall:"Hall A"},
{name:"Internal Assessment II",subject:"Operating Systems",date:"2026-11-05T10:00",hall:"Hall A"},
{name:"Lab Practical",subject:"Machine Learning Lab",date:"2026-11-10T14:00",hall:"Lab 3"}],
fees:{total:85000,paid:72500},
notifications:[
{id:1,cat:"Assignment",text:"New assignment posted in Operating Systems",time:"2026-10-21T08:10",read:false},
{id:2,cat:"Attendance",text:"Computer Networks attendance is at 77%. Stay above 75%.",time:"2026-10-20T17:30",read:false},
{id:3,cat:"Exam",text:"Internal Assessment II timetable published",time:"2026-10-19T12:00",read:false},
{id:4,cat:"Fee",text:"₹12,500 fee balance due by 15 Nov 2026",time:"2026-10-18T09:00",read:true}]
};

/* ---- Extended demo data (appended) ---- */
DATA.comps={CS501:[25,8,8,43],CS502:[26,9,8,43],CS503:[22,8,7,38],CS504:[22,8,8,40],CS505:[27,9,9,43]}; // internal/30, assignment/10, practical/10, end-sem/50
DATA.subjects.forEach(s=>{s.marks=DATA.comps[s.code].reduce((a,b)=>a+b,0)});
DATA.grade=m=>m>=90?["O",10]:m>=80?["A+",9]:m>=70?["A",8]:m>=60?["B",7]:m>=50?["C",6]:["F",0];
DATA.slots=[["09:00","09:50"],["10:00","10:50"],["10:50","11:10","Tea break"],["11:10","12:00"],["12:00","13:00","Lunch break"],["13:00","13:50"],["14:00","16:00","Lab"]];
DATA.week={Mon:[0,1,2,3,4],Tue:[1,2,3,0,null],Wed:[2,3,0,1,4],Thu:[3,0,1,2,null],Fri:[0,1,2,3,4],Sat:[1,0,3,2,null]};
DATA.assignmentsAll=[
{id:1,desc:"Implement FCFS, SJF and Round Robin in any language and compare waiting times.",assigned:"2026-10-10"},
{id:2,desc:"Design an ER diagram with entities, keys and cardinalities.",assigned:"2026-10-14"},
{id:3,desc:"Solve 10 VLSM subnetting problems.",assigned:"2026-10-18"}
].map((x,i)=>({...DATA.assignments[i],...x}));
DATA.assignmentsAll.push(
{id:4,title:"Normalization Worksheet",subject:"Database Systems",due:"2026-10-15",priority:"High",status:"Overdue",desc:"Normalize the given schema to 3NF.",assigned:"2026-10-05"},
{id:5,title:"SRS Document",subject:"Software Engineering",due:"2026-10-12",priority:"Medium",status:"Submitted",desc:"Write an SRS for the portal project.",assigned:"2026-10-01"},
{id:6,title:"Linear Regression Notebook",subject:"Machine Learning Lab",due:"2026-10-09",priority:"Low",status:"Submitted",desc:"Fit and evaluate a regression model.",assigned:"2026-09-30"});
DATA.examsAll=[...DATA.exams.map((e,i)=>({...e,type:i==2?"Practical":"Internal",duration:i==2?"2 hrs":"1.5 hrs",past:false})),
{name:"Internal Assessment I",subject:"Database Systems",date:"2026-09-02T10:00",hall:"Hall B",type:"Internal",duration:"1.5 hrs",past:true,result:true},
{name:"Quiz 2",subject:"Software Engineering",date:"2026-09-15T11:00",hall:"B-105",type:"Quiz",duration:"45 min",past:true,result:false}];
DATA.examRules=["Carry your student ID card.","Report 20 minutes before the start time.","Mobile phones are not allowed in the hall.","Use only a blue or black pen."];
DATA.feeItems=[["Tuition fees",60000],["Examination fees",5000],["Laboratory fees",8000],["Library fees",2000],["Other academic charges",10000]];
DATA.payments=[{ref:"DEMO-TXN-1001",date:"2026-07-05",amount:40000,status:"Success"},{ref:"DEMO-TXN-1002",date:"2026-08-20",amount:22500,status:"Success"},{ref:"DEMO-TXN-1003",date:"2026-09-18",amount:10000,status:"Success"}];
DATA.profileDefaults={course:"B.Tech",dob:"2005-04-12",address:"12 Sample Street, Demo Town, Andhra Pradesh",guardian:"Mr. A. Ahmed (demo)",gphone:"+91 90000 00001"};
