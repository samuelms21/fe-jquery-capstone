class Experience {
    constructor(_id, _jobTitle, _companyName) {
        this.id = _id;
        this.jobTitle = _jobTitle;
        this.companyName = _companyName;
    }
}

var emptyExpObj = new Experience(0, null, null);

var emptyEduObj = {
    id: 0,
    institutionName: null,
};

let experience = [emptyExpObj];
let education = [emptyEduObj];
let skills = []; 

let isLoggedIn = false;

function deleteSkill(skillName) {
    let skillIdx = skills.indexOf(skillName);

    if (skillIdx != -1) {
        skills.splice(skillIdx, 1);
        let findChip = $("#skillsContainer").find(`[data-skill='${skillName}']`);
        findChip.remove();

        // Reset text input in dialog
        $("#skillNameInput").val(null);
    }
}

function initializeFormFields() {
    // Display the actual form
    $("#submitProfileForm").css("display", "initial");

    // Initialize listeners to "Add Experience" button
    $("#addExperienceBtn").on("click", function() {
        let nextIdx = experience.length;
        let nextElementId = `expCard_${nextIdx}`;

        let expObj = new Experience(nextIdx, null, null);
        expObj.id = nextIdx;

        experience.push(expObj);

        let newExpCardElement;
        newExpCardElement = $("<div>");
        newExpCardElement.addClass(["card", "mb-2"]);
        newExpCardElement.attr("id", nextElementId);
        
        let expCardBody;
        expCardBody = $("<div>");
        expCardBody.addClass("card-body");

        // Create Upper Row of card-body
        let upperRow = $("<div>").addClass(["row", "mb-2", "d-flex", "align-items-end"]);

        let upperFirstCol = $("<div>").addClass(["col", "col-sm-5"]);
        let upperSecondCol = $("<div>").addClass(["col", "col-sm-5"]);

        let ufColLabel = $("<label>").addClass("form-label").attr("for", `jobTitle_${nextIdx}`).text("Job Title");
        let usColLabel = $("<label>").addClass("form-label").attr("for", `companyName_${nextIdx}`).text("Start Date");

        let ufInputGroup = $("<div>").addClass("input-group");
        let ufTextInput = $("<input>").addClass("form-control").attr("id", `jobTitle_${nextIdx}`).attr("placeholder", "Sales Manager");
        let usInputGroup = $("<div>").addClass("input-group");
        let usTextInput = $("<input>").addClass("form-control").attr("id", `companyName_${nextIdx}`).attr("placeholder", "January 1, 1990");

        let ufInputIcon = $("<i>").addClass(["bi", "bi-briefcase"]);
        let ufInputIconSpan = $("<span>").addClass("input-group-text");
        let usInputIcon = $("<i>").addClass(["bi", "bi-building"]);
        let usInputIconSpan = $("<span>").addClass("input-group-text");

        // Create Delete experience card button
        let buttonCol = $("<div>").addClass(["col", "col-2"]);
        let deleteButton = $("<button>").attr("type", "button").attr("data-experience-id", nextIdx).addClass(["btn", "btn-danger", "btn-delete-exp"]);
        let deleteBtnIcon = $("<i>").addClass(["bi", "bi-trash"]);

        deleteButton.append(deleteBtnIcon);
        buttonCol.append(deleteButton);

        deleteButton.on("click", function() {
            var experienceId = $(this).attr("data-experience-id");
            var expInstance = experience.filter(obj => obj.id == experienceId)[0];
            
            if (expInstance != undefined) {
                experience.splice(nextIdx, 1);
                $(`#expCard_${experienceId}`).remove();
            } else {
                console.log(`Experience with ID of ${experienceId} not found`);
            }
        });

        ufInputIconSpan.append(ufInputIcon);
        usInputIconSpan.append(usInputIcon);

        ufInputGroup.append(ufInputIconSpan);
        ufInputGroup.append(ufTextInput);
        usInputGroup.append(usInputIconSpan);
        usInputGroup.append(usTextInput);

        upperFirstCol.append(ufColLabel);
        upperFirstCol.append(ufInputGroup);
        upperSecondCol.append(usColLabel);
        upperSecondCol.append(usInputGroup);

        upperRow.append(upperFirstCol);
        upperRow.append(upperSecondCol);
        upperRow.append(buttonCol);

        expCardBody.append(upperRow);
        newExpCardElement.append(expCardBody);
        $("#experienceContainer").append(newExpCardElement);
    });

    // Create skill-chip elements to list initial skills
    for (var k = 0; k < skills.length; k++) {
        var currentSkill = skills[k];
        var skillChip = $("<div>").addClass("skill-chip").attr("id", `skill_${k}`).text(currentSkill);
        skillChip.attr("data-skill", currentSkill);

        var deleteSkillBtn = $("<div>").addClass(["ms-2", "custom-close-btn"]).html('<i class="bi bi-x-circle-fill"></i>');

        deleteSkillBtn.on("click", function(event) {
            let chipElement = event.currentTarget.parentElement;

            let skillName = $(chipElement).attr("data-skill");

            deleteSkill(skillName);
        });

        skillChip.append(deleteSkillBtn);
        $("#skillsContainer").append(skillChip);
    }

    // Initialize dialog to add new skills
    let addSkillsDialog = $("#addSkillsDialog").dialog({
        dialogClass: "no-close",
        autoOpen: false,
        resizable: false,
        draggable: false,
        height: 300,
        width: 400,
        modal: true,
        buttons: [
            {
                text: "Add Skill",
                class: "btn btn-primary",
                click: function() {
                    // Get skill text input
                    let newSkill = $("#skillNameInput").val();
                    
                    if (newSkill.trim() == "") {
                        alert("Skill is still empty.");
                        return;
                    }

                    let indexOfSkill = skills.indexOf(newSkill);
                    if (indexOfSkill == -1) {
                        skills.push(newSkill);

                        var newSkillChip = $("<div>").addClass("skill-chip").text(newSkill);
                        newSkillChip.attr("data-skill", newSkill);

                        var newDeleteSkillBtn = $("<div>").addClass(["ms-2", "custom-close-btn"]).html('<i class="bi bi-x-circle-fill"></i>');

                        newDeleteSkillBtn.on("click", function(event) {
                            let newChipElement = event.currentTarget.parentElement;
                            let newSkillName = $(newChipElement).attr("data-skill");

                            deleteSkill(newSkillName);
                        });
                
                        newSkillChip.append(newDeleteSkillBtn);
                        $("#skillsContainer").append(newSkillChip);
                    }

                    $(this).dialog("close");
                }
            },
            {
                text: "Close",
                class: "btn btn-danger",
                click: function() {
                    $(this).dialog("close");
                }
            }
        ],
    });

    $("#addSkillsForm").on("submit", function(event) {
        event.preventDefault();
    });

    $("#addSkillsBtn").button().on("click", function() {
        // Reset text input in dialog
        $("#skillNameInput").val(null);

        // Open dialog
        addSkillsDialog.dialog("open");
    });

    // Initialize DELETE EXPERIENCE buttons
    $('.btn-delete-exp').each(function(index, button) {
        $(button).on("click", function() {
            var experienceId = $(this).attr("data-experience-id");

            // Filter out from 'experiences' array
            var expInstance = experience.filter(obj => obj.id == experienceId)[0];

            if (expInstance != undefined) {
                experience.splice(index, 1);
                $(`#expCard_${experienceId}`).remove();
            } else {
                console.log(`Experience with ID of ${experienceId} not found`);
            }
        });
    });

    $('#saveProfileBtn').on('click', function() {
        // console.log("save profile button clicked");
        let saveProfileObj = {
            "email": "mail@example.com",
            "id": 1,
            "full_name": "NEW John Doe",
            "phone": "087829677020",
            "location": "Bandung",
            "education": "ITB",
            "job_experiences": [
                {
                    "id_user": 1,
                    "job_title": "Web Developer",
                    "company_name": "Google"
                },
                {
                    "id_user": 1,
                    "job_title": "Software Engineer",
                    "company_name": "Oracle"
                },
            ],
            "skills": [
                {"skill": "Python"},
                {"skill": "MySQL"}
            ],
        };
        
        let accessToken = sessionStorage.getItem('access-token');

        $.ajax({
            url: 'http://localhost:8000/users/edit',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(saveProfileObj),
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) {
                // console.log(typeof response)
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.error("HTTP STATUS CODE: ", status)
                console.error(error);
            }
        });
    });
}

function initializeLogoutBtn() {
    if ($("#logoutBtn").length) {
        let token = sessionStorage.getItem("access-token");
        $("#logoutBtn").on("click", function() {
            $.ajax({
                url: 'http://localhost:8000/users/logout/',
                type: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function(response) {
                    // Store user info and token after succesful login
                    isLoggedIn = false;
                    sessionStorage.removeItem("access-token");
                    sessionStorage.removeItem("user");

                    $("#loginForm").css("display", "initial");
                    $("#logoutBtn").css("display", "none");
                    $("#submitProfileForm").css("display", "none");
                },
                error: function(xhr, status, error) {
                    console.log(xhr);
                    isLoggedIn = false;
                }
            });
        });
    }
}

function initializeRegisterForm() {
    if($("#registerForm").length) {
        // Init login link (redirect to login form)
        $("#loginLink").on("click", function() {
            $("#registerForm").css("display", "none");
            $("#loginForm").css("display", "initial");
        });

        // Initialize submit validation function
        $("#registerForm").on("submit", function(event) {
            event.preventDefault();

            let emailReg = $("#emailAddressRegister").val();
            let passwordReg = $("#passwordRegister").val();
    
            if (emailReg != null && passwordReg != null) {
                if (emailReg.trim() != "" && passwordReg != "") {
    
                    var postData = {
                        email: emailReg,
                        password: passwordReg,
                    };
                    
                    $.ajax({
                        url: 'http://localhost:8000/users/register/',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(postData),
                        success: function(response) {
                            $("#registerSuccessDialog").dialog({
                                modal: true,
                                buttons: {
                                    Ok: function () {
                                        $(this).dialog("close");
                                        $("#registerForm").css("display", "none");
                                        $("#loginForm").css("display", "initial");
                                    }
                                }
                            });
                        },
                        error: function(xhr, status, error) {
                            alert(JSON.parse(xhr.responseText)["detail"]);
                        }
                    });
                }
            }
        });
    }
}

$(function() {
    // When DOM is fully loaded
    // Init login form first
    $("#loginForm").on("submit", function(event) {
        event.preventDefault();

        let emailInput = $("#emailAddressLogin").val();
        let passwordInput = $("#passwordLogin").val();

        if (emailInput != null && passwordInput != null) {
            if (emailInput.trim() != "" && passwordInput.trim() != "") {
                $.ajax({
                    url: 'http://localhost:8000/users/login/',
                    type: 'POST',
                    data: {
                        username: emailInput,
                        password: passwordInput
                    },
                    contentType: 'application/x-www-form-urlencoded',
                    success: function(response) {
                        // Store user info and token after succesful login
                        sessionStorage.setItem("access-token", JSON.stringify(response["access_token"]));
                        sessionStorage.setItem("user", JSON.stringify(response["user"]));
                        isLoggedIn = true;

                        // Clear login form values
                        $("#emailAddressLogin").val(null);
                        $("#passwordLogin").val(null);

                        $("#loginForm").css("display", "none");
                        $("#logoutBtn").css("display", "initial");
                        initializeFormFields();
                        initializeLogoutBtn();
                    },

                    error: function(xhr, status, error) {
                        alert(JSON.parse(xhr.responseText)["detail"]);
                        isLoggedIn = false;
                    }
                });
                
            }
        }
    });

    // Init register link (if clicked, will be redirected to register form)
    $("#registerLink").on("click", function() {
        $("#loginForm").css("display", "none");
        $("#registerForm").css("display", "initial");

        initializeRegisterForm();
    });
});