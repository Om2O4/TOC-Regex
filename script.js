// REGEX PATTERNS
const patterns = {
  name: /^[A-Za-z ]{2,50}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/,
  phone: /^[6-9]\d{9}$/,
  skills: /^([A-Za-z]+)(,\s*[A-Za-z]+)*$/,
  cgpa: /^([0-9]\.\d{1,2}|10(\.0{1,2})?)$/,
  year: /^(20[2-3][0-9])$/,
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-]+$/
};

// VALIDATION FUNCTION
function validateField(id, regex, errorMsg) {
  let input = document.getElementById(id);
  let error = document.getElementById(id + "Error");

  if (!regex.test(input.value.trim())) {
    input.classList.add("invalid");
    input.classList.remove("valid");
    error.innerText = errorMsg;
    return false;
  } else {
    input.classList.add("valid");
    input.classList.remove("invalid");
    error.innerText = "";
    return true;
  }
}

// REAL-TIME VALIDATION
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", () => {
    validateField(input.id, patterns[input.id], "Invalid " + input.id);
  });
});

// FORM SUBMIT
document.getElementById("resumeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let valid = true;

  valid &= validateField("name", patterns.name, "Only letters allowed");
  valid &= validateField("email", patterns.email, "Invalid email");
  valid &= validateField("phone", patterns.phone, "Invalid phone");
  valid &= validateField("skills", patterns.skills, "Invalid skills");
  valid &= validateField("cgpa", patterns.cgpa, "Invalid CGPA");
  valid &= validateField("year", patterns.year, "Invalid year");
  valid &= validateField("linkedin", patterns.linkedin, "Invalid LinkedIn");

  if (valid) {
    extractData();
  }
});

// EXTRACTION LOGIC (ATS STYLE)
function extractData() {
  let data = {
    Name: document.getElementById("name").value,
    Email: document.getElementById("email").value,
    Phone: document.getElementById("phone").value,
    Skills: document.getElementById("skills").value.split(","),
    CGPA: document.getElementById("cgpa").value,
    Year: document.getElementById("year").value,
    LinkedIn: document.getElementById("linkedin").value
  };

  // EXTRACTION FROM RESUME TEXT
  let text = document.getElementById("resumeText").value;

  let extractedEmail = text.match(patterns.email);
  let extractedPhone = text.match(patterns.phone);

  if (extractedEmail) data.Extracted_Email = extractedEmail[0];
  if (extractedPhone) data.Extracted_Phone = extractedPhone[0];

  document.getElementById("output").innerText =
    JSON.stringify(data, null, 2);
}