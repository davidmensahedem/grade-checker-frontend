var studentform = document.getElementById("studentform");

var studentname = document.getElementById("studentname");

var studentcourse = document.getElementById("studentcourse");

var studentperiod = document.getElementById("studentperiod");

var studentbranch = document.getElementById("studentbranch");

var studentscore = document.getElementById("studentscore");

var studentgradeawarded = document.getElementById("studentgradeawarded");

var studentcontent = document.getElementById("studentcontent");

var studentinfo = document.getElementById("studentinfo");

var showError = document.getElementById("showvalidation");
var studentid = document.getElementById("studentid");
var footerdate = document.getElementById("date");
footerdate.innerHTML = displayDate();
var studenterror = {};

async function show(e) {
  e.preventDefault();
  checkStudentError();
  try {
    const searchStudent = await callApi(studentid.value);
    if (!searchStudent) {
      hideInformation();
      studenterror.studentID = "Student ID is invalid";
      showError.innerHTML = studenterror.studentID;
      showError.style.display = "block";
    }

    const { data: student } = searchStudent;
    fillInformation(student);
  } catch (error) {}
}

async function callApi(studentID) {
  try {
    const result = await axios.get(
      `https://gradechecker-by-joshuakings.herokuapp.com/api/student/${studentID}`
    );

    if (result) {
      return result;
    }
  } catch (ex) {
    return null;
  }
}

function fillInformation(student) {
  studentname.innerHTML = student.studentName;
  studentcourse.innerHTML = student.course;
  studentperiod.innerHTML = student.validityPeriod;
  studentbranch.innerHTML = student.branchName;
  studentscore.innerHTML = student.grade;
  checkgrade(student);
  studentinfo.style.display = "block";
}

function hideInformation() {
  studentinfo.style.display = "none";
}

function checkgrade(student) {
  if (student.grade >= 80 && student.grade <= 100) {
    studentgradeawarded.innerHTML = "Excellent (A)";
    studentgradeawarded.style.color = "green";
  } else if (student.grade >= 70 && student.grade <= 79) {
    studentgradeawarded.innerHTML = "Very Good (B)";
    studentgradeawarded.style.color = "yellow";
  } else if (student.grade >= 60 && student.grade <= 69) {
    studentgradeawarded.innerHTML = "Good (C)";
    studentgradeawarded.style.color = "orange";
  } else if (student.grade >= 50 && student.grade <= 59) {
    studentgradeawarded.innerHTML = "Pass (D)";
    studentgradeawarded.style.color = "brown";
  } else {
    studentgradeawarded.innerHTML = "Failed";
    studentgradeawarded.style.color = "red";
  }
}

function checkStudentError() {
  if (studentid.value === "") {
    studentinfo.style.display = "none";
    studenterror.studentID = "Student ID is required";
    showError.innerHTML = studenterror.studentID;
    showError.style.display = "block";
    return;
  } else {
    showError.innerHTML = "";
    showError.style.display = "none";
    delete studenterror["studentID"];
  }
}

function displayDate() {
  var date = new Date();
  return date.getFullYear();
}
