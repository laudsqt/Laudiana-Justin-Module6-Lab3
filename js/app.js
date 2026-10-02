function isValidStudentNumber(value) {
    return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}

function isValidPassword(value) {
    return /^(?=\S{8,}$)(?=.*[A-Z])(?=.*\d)(?=.*[@$!])/.test(value);
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidMobile(value) {
    return /^(09\d{9}|\+639\d{9})$/.test(value.trim());
}

function setError(input, errorElement, message) {
    errorElement.textContent = message;

    if (message) {
        input.setAttribute("aria-invalid", "true");
    } else {
        input.setAttribute("aria-invalid", "false");
    }
}

if (typeof document !== "undefined") {

    const form = document.getElementById("registrationForm");

    const fullName = document.getElementById("fullName");
    const studentNumber = document.getElementById("studentNumber");
    const email = document.getElementById("email");
    const mobileNumber = document.getElementById("mobileNumber");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const course = document.getElementById("course");
    const terms = document.getElementById("terms");

    const fullNameError = document.getElementById("fullNameError");
    const studentNumberError = document.getElementById("studentNumberError");
    const emailError = document.getElementById("emailError");
    const mobileNumberError = document.getElementById("mobileNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const courseError = document.getElementById("courseError");
    const termsError = document.getElementById("termsError");

    const passwordFeedback = document.getElementById("passwordFeedback");
    const successMessage = document.getElementById("successMessage");
    const registrationSummary = document.getElementById("registrationSummary");

    const summaryName = document.getElementById("summaryName");
    const summaryStudentNumber = document.getElementById("summaryStudentNumber");
    const summaryEmail = document.getElementById("summaryEmail");
    const summaryMobileNumber = document.getElementById("summaryMobileNumber");
    const summaryCourse = document.getElementById("summaryCourse");

    function validateFullName() {
        const value = fullName.value.trim();

        if (value.length < 2) {
            setError(
                fullName,
                fullNameError,
                "Enter a valid full name with at least two characters."
            );
            return false;
        }

        setError(fullName, fullNameError, "");
        return true;
    }

    function validateStudentNumber() {
        const value = studentNumber.value.trim();

        if (!value) {
            setError(
                studentNumber,
                studentNumberError,
                "Student number is required."
            );
            return false;
        }

        if (!isValidStudentNumber(value)) {
            setError(
                studentNumber,
                studentNumberError,
                "Enter a student number in the format 24-1234-123."
            );
            return false;
        }

        setError(studentNumber, studentNumberError, "");
        return true;
    }

    function validateEmail() {
        const value = email.value.trim();

        if (!value) {
            setError(email, emailError, "Email address is required.");
            return false;
        }

        if (!isValidEmail(value)) {
            setError(email, emailError, "Enter a valid email address.");
            return false;
        }

        setError(email, emailError, "");
        return true;
    }

    function validateMobile() {
        const value = mobileNumber.value.trim();

        if (!value) {
            setError(
                mobileNumber,
                mobileNumberError,
                "Mobile number is required."
            );
            return false;
        }

        if (!isValidMobile(value)) {
            setError(
                mobileNumber,
                mobileNumberError,
                "Enter 09XXXXXXXXX or +639XXXXXXXXX."
            );
            return false;
        }

        setError(mobileNumber, mobileNumberError, "");
        return true;
    }

    function validatePassword() {
        if (!password.value) {
            setError(
                password,
                passwordError,
                "Password is required."
            );
            passwordFeedback.textContent = "";
            return false;
        }

        if (!isValidPassword(password.value)) {
            setError(
                password,
                passwordError,
                "Password must have 8 characters, one uppercase letter, one digit, and @, $, or ! with no spaces."
            );
            passwordFeedback.textContent = "Password does not meet the requirements.";
            return false;
        }

        setError(password, passwordError, "");
        passwordFeedback.textContent = "Password meets all requirements.";
        return true;
    }

    function validateConfirmPassword() {
        if (!confirmPassword.value) {
            setError(
                confirmPassword,
                confirmPasswordError,
                "Please confirm your password."
            );
            return false;
        }

        if (confirmPassword.value !== password.value) {
            setError(
                confirmPassword,
                confirmPasswordError,
                "Passwords do not match."
            );
            return false;
        }

        setError(confirmPassword, confirmPasswordError, "");
        return true;
    }

    function validateCourse() {
        if (course.value !== "BSIT" && course.value !== "BSCS") {
            setError(
                course,
                courseError,
                "Please select BSIT or BSCS."
            );
            return false;
        }

        setError(course, courseError, "");
        return true;
    }

    function validateTerms() {
        if (!terms.checked) {
            termsError.textContent = "You must agree to the terms.";
            terms.setAttribute("aria-invalid", "true");
            return false;
        }

        termsError.textContent = "";
        terms.setAttribute("aria-invalid", "false");
        return true;
    }

    fullName.addEventListener("blur", validateFullName);

    password.addEventListener("input", validatePassword);

    course.addEventListener("change", validateCourse);

    terms.addEventListener("change", validateTerms);

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const validName = validateFullName();
        const validStudentNumber = validateStudentNumber();
        const validEmail = validateEmail();
        const validMobile = validateMobile();
        const validPassword = validatePassword();
        const validConfirmPassword = validateConfirmPassword();
        const validCourse = validateCourse();
        const validTerms = validateTerms();

        if (
            validName &&
            validStudentNumber &&
            validEmail &&
            validMobile &&
            validPassword &&
            validConfirmPassword &&
            validCourse &&
            validTerms
        ) {
            successMessage.textContent =
                "Registration details validated successfully!";

            summaryName.textContent = fullName.value.trim();
            summaryStudentNumber.textContent = studentNumber.value.trim();
            summaryEmail.textContent = email.value.trim();
            summaryMobileNumber.textContent = mobileNumber.value.trim();
            summaryCourse.textContent = course.value;

            registrationSummary.hidden = false;
        } else {
            successMessage.textContent = "";
            registrationSummary.hidden = true;
        }
    });

    form.addEventListener("reset", function() {
        setTimeout(function() {

            const fields = [
                fullName,
                studentNumber,
                email,
                mobileNumber,
                password,
                confirmPassword,
                course,
                terms
            ];

            fields.forEach(function(field) {
                field.setAttribute("aria-invalid", "false");
            });

            fullNameError.textContent = "";
            studentNumberError.textContent = "";
            emailError.textContent = "";
            mobileNumberError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";
            courseError.textContent = "";
            termsError.textContent = "";

            passwordFeedback.textContent = "";
            successMessage.textContent = "";

            registrationSummary.hidden = true;

            summaryName.textContent = "";
            summaryStudentNumber.textContent = "";
            summaryEmail.textContent = "";
            summaryMobileNumber.textContent = "";
            summaryCourse.textContent = "";

        }, 0);
    });

    [
        fullName,
        studentNumber,
        email,
        mobileNumber,
        password,
        confirmPassword
    ].forEach(function(input) {
        input.setAttribute("aria-invalid", "false");
    });

    course.setAttribute("aria-invalid", "false");
    terms.setAttribute("aria-invalid", "false");
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}