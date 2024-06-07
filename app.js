class Experience {
    constructor(_id, _jobTitle, _companyName) {
        this.id = _id;
        this.jobTitle = _jobTitle;
        this.companyName = _companyName;
    }
}

var emptyEduObj = {
    id: 0,
    institutionName: null,
};

let experience = [];
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

function initExperienceCard(jobTitle, companyName) {
    let nextIdx = experience.length;
    let nextElementId = `expCard_${nextIdx}`;

    let expObj = new Experience(nextIdx, jobTitle, companyName);
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
    let usColLabel = $("<label>").addClass("form-label").attr("for", `companyName_${nextIdx}`).text("Company");

    let ufInputGroup = $("<div>").addClass("input-group");
    let ufTextInput = $("<input>").addClass("form-control").attr("id", `jobTitle_${nextIdx}`).attr("placeholder", "Sales Manager");

    if (jobTitle != null) {
        ufTextInput.val(jobTitle);
    }

    let usInputGroup = $("<div>").addClass("input-group");
    let usTextInput = $("<input>").addClass("form-control").attr("id", `companyName_${nextIdx}`).attr("placeholder", "XYZ Consulting");

    if (companyName != null) {
        usTextInput.val(companyName);
    }

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
            experience.splice(experience.indexOf(expInstance), 1);
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
}

function initSkillChip(newSkill) {
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
}

function initializeFormFields() {
    // Display the actual form
    $("#submitProfileForm").css("display", "initial");

    // Remove previously-displayed/created HTML elements (cards, chips, etc.)

    // Initialize listeners to "Add Experience" button
    $("#addExperienceBtn").on("click", () => initExperienceCard(null, null));

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
                    initSkillChip(newSkill);
                    
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

    // Initialize user info inside the form fields 
    // If user has previously-saved info, then fill in the blanks (input elements)
    var userInfo = JSON.parse(sessionStorage.getItem('user'));
    $('#email').val(userInfo['email']);
    $('#fullname').val(userInfo['full_name']);
    $('#phone').val(userInfo['phone']);
    $('#location').val(userInfo['location']);
    $('#institutionName_0').val(userInfo['education']);

    // Initialize others, like skills, and experience (if previously-saved data exists)
    // Initialize past job experiences (if any)
    for (var j = 0; j < userInfo['job_experiences'].length; j++) {
        var currExpItem = userInfo['job_experiences'][j];
        initExperienceCard(currExpItem['job_title'], currExpItem['company_name']);
    }

    // Initialize skills
    for (var k = 0; k < userInfo['skills'].length; k++) {
        var currSkillName = userInfo['skills'][k]['skill'];
        initSkillChip(currSkillName);
    }

    $('#saveProfileBtn').on('click', function() {
        let oldUserInfo = JSON.parse(sessionStorage.getItem('user'));
        let saveProfileObj = {
            email: $('#email').val()?.trim() ?? null,
            id: oldUserInfo['id'],
            full_name: $('#fullname').val()?.trim() ?? null,
            phone: $('#phone').val()?.trim() ?? null,
            location: $('#location').val()?.trim() ?? null,
            education: $('#institutionName_0').val()?.trim() ?? null,
        };

        let savedJobExps = [];
        
        // Save past job experience data entered by user
        let allExperienceCards = $('#experienceContainer').children();

        for (let i = 0; i < allExperienceCards.length; i++) {

            if ($(allExperienceCards[i]).hasClass("card")) {
                
                var jobExpItem = {
                    'id_user': oldUserInfo['id'],
                };

                var columns = $(allExperienceCards[i]).find('div.card-body').find('div.row').find('div.col.col-sm-5');

                columns.each(function(index, element) {
                    if (index == 0) {
                        var jobTitleIdx = $(element).find('input').val();
                        jobExpItem['job_title'] = jobTitleIdx
                    }

                    if (index == 1) {
                        var companyNameIdx =  $(element).find('input').val();
                        jobExpItem['company_name'] = companyNameIdx;
                    }
                });


                savedJobExps.push(jobExpItem);
            }
        }

        saveProfileObj['job_experiences'] = savedJobExps;

        // Save skills data entered by user
        let savedSkills = [];

        for (let j = 0; j < skills.length; j++) {
            var skillObj = {'skill': skills[j]};
            savedSkills.push(skillObj);
        }

        saveProfileObj['skills'] = savedSkills;
        
        let accessToken = sessionStorage.getItem('access-token');

        // PUT REQUEST TO EDIT USER INFO
        $.ajax({
            url: 'http://localhost:8000/users/edit',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(saveProfileObj),
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) {
                $("#saveSuccessDialog").dialog();
            },
            error: function(xhr, status, error) {
                console.error("HTTP STATUS CODE: ", status)
                console.error(error);
            }
        });
        // END OF PUT REQUEST TO EDIT USER INFO
    });
}

function initializeLogoutBtn() {
    if ($("#logoutBtn")) {
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
                    sessionStorage.removeItem("access-token");
                    sessionStorage.removeItem("user");

                    // Clean out all other data (skills & experience arrays)
                    experience = [];
                    skills = [];

                    // Remove remaining HTML elements
                    // Remove all currently-displayed experience cards
                    $('#experienceContainer').find('div.card').remove();

                    // Remove all currently-displayed skill chip
                    $('#skillsContainer').find('div.skill-chip').remove();

                    // Clear out profile form fields
                    $('#email').val(null);
                    $('#phone').val(null);
                    $('#fullname').val(null);
                    $('#location').val(null);

                    // Clear out education form field
                    $('#institutionName_0').val(null);

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