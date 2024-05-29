class Experience {
    constructor(_id, _jobTitle, _companyName, _jobStartDate, _jobEndDate) {
        this.id = _id;
        this.jobTitle = _jobTitle;
        this.companyName = _companyName;
        this.jobStartDate = _jobStartDate;
        this.jobEndDate = _jobEndDate;
    }
}

var emptyExpObj = new Experience(0, null, null, null, null);

var emptyEduObj = {
    id: 0,
    institutionName: null,
    eduStartDate: null,
    eduEndDate: null,
    fieldOfStudy: null,
    degree: null,
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

    // Initialize datepicker listener to jobStartDate_0 & jobEndDate_0
    $("#jobStartDate_0").datepicker({
        dateFormat: "MM d, yy",
        onSelect: function(dateText, inst) {
            $("#jobStartDate_0").val(dateText);
        }
    });

    $("#jobEndDate_0").datepicker({
        dateFormat: "MM d, yy",
        onSelect: function(dateText, inst) {
            $("#jobEndDate_0").val(dateText);
        }
    });
    
    // Initialize datepicker listener to eduStartDate_0 & eduEndDate_0
    $("#eduStartDate_0").datepicker({
        dateFormat: "MM d, yy",
        onSelect: function(dateText, inst) {
            $("#eduStartDate_0").val(dateText);
        }
    });

    $("#eduEndDate_0").datepicker({
        dateFormat: "MM d, yy",
        onSelect: function(dateText, inst) {
            $("#eduEndDate_0").val(dateText);
        }
    });

    // Initialize listeners to "Add Experience" button
    $("#addExperienceBtn").on("click", function() {
        let nextIdx = experience.length;
        let nextElementId = `expCard_${nextIdx}`;

        let expObj = new Experience(nextIdx, null, null, null, null);
        expObj.id = nextIdx;

        experience.push(expObj);

        let newExpCardElement;
        newExpCardElement = $("<div>");
        newExpCardElement.addClass(["card", "mb-2"]);
        newExpCardElement.attr("id", nextElementId);
        
        let expCardBody;
        expCardBody = $("<div>");
        expCardBody.addClass("card-body");

        // Create Delete experience card button
        let buttonRow = $("<div>").addClass(["row", "d-flex", "justify-content-end"]);
        let buttonCol = $("<div>").addClass(["col", "col-2", "d-flex", "justify-content-end"]);
        let deleteButton = $("<button>").attr("type", "button").attr("data-experience-id", nextIdx).addClass(["btn", "btn-danger", "btn-sm", "btn-delete-exp"]);
        let deleteBtnIcon = $("<i>").addClass(["bi", "bi-trash"]);

        deleteButton.append(deleteBtnIcon);
        buttonCol.append(deleteButton);
        buttonRow.append(buttonCol);

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

        // Create Upper Row of card-body
        let upperRow = $("<div>").addClass(["row", "mb-2"]);

        let upperFirstCol = $("<div>").addClass(["col", "col-sm-6"]);
        let upperSecondCol = $("<div>").addClass(["col", "col-sm-6"]);

        let ufColLabel = $("<label>").addClass("form-label").attr("for", `jobTitle_${nextIdx}`).text("Job Title");
        let usColLabel = $("<label>").addClass("form-label").attr("for", `jobStartDate_${nextIdx}`).text("Start Date");

        let ufInputGroup = $("<div>").addClass("input-group");
        let ufTextInput = $("<input>").addClass("form-control").attr("id", `jobTitle_${nextIdx}`).attr("placeholder", "Sales Manager");
        let usInputGroup = $("<div>").addClass("input-group");
        let usTextInput = $("<input>").addClass("form-control").attr("id", `jobStartDate_${nextIdx}`).attr("placeholder", "January 1, 1990");

        let ufInputIcon = $("<i>").addClass(["bi", "bi-briefcase"]);
        let ufInputIconSpan = $("<span>").addClass("input-group-text");
        let usInputIcon = $("<i>").addClass(["bi", "bi-calendar-event"]);
        let usInputIconSpan = $("<span>").addClass("input-group-text");

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

        // Create Bottom Row of card-body
        let bottomRow = $("<div>").addClass(["row", "mb-2"]);
        let bottomFirstCol = $("<div>").addClass(["col", "col-sm-6"]);
        let bottomSecondCol = $("<div>").addClass(["col", "col-sm-6"]);
        
        let bfColLabel = $("<label>").addClass("form-label").attr("for", `companyName_${nextIdx}`).text("Company");
        let bsColLabel = $("<label>").addClass("form-label").attr("for", `jobEndDate_${nextIdx}`).text("End Date");

        let bfInputGroup = $("<div>").addClass("input-group");
        let bfTextInput = $("<input>").addClass("form-control").attr("id", `companyName_${nextIdx}`).attr("placeholder", "XYZ Consulting");
        let bsInputGroup = $("<div>").addClass("input-group");
        let bsTextInput = $("<input>").addClass("form-control").attr("id", `jobEndDate_${nextIdx}`).attr("placeholder", "December 1, 1990");

        let bfInputIcon = $("<i>").addClass(["bi", "bi-building"]);
        let bfInputIconSpan = $("<span>").addClass("input-group-text");
        let bsInputIcon = $("<i>").addClass(["bi", "bi-calendar-event"]);
        let bsInputIconSpan = $("<span>").addClass("input-group-text");

        bfInputIconSpan.append(bfInputIcon);
        bsInputIconSpan.append(bsInputIcon);

        bfInputGroup.append(bfInputIconSpan);
        bfInputGroup.append(bfTextInput);
        bsInputGroup.append(bsInputIconSpan);
        bsInputGroup.append(bsTextInput);

        bottomFirstCol.append(bfColLabel);
        bottomFirstCol.append(bfInputGroup);
        bottomSecondCol.append(bsColLabel);
        bottomSecondCol.append(bsInputGroup);

        bottomRow.append(bottomFirstCol);
        bottomRow.append(bottomSecondCol);

        expCardBody.append(buttonRow);
        expCardBody.append(upperRow);
        expCardBody.append(bottomRow);
        newExpCardElement.append(expCardBody);
        $("#experienceContainer").append(newExpCardElement);

        // Attach datepicker listener to #jobStartDate_{index} element
        $(`#jobStartDate_${nextIdx}`).datepicker({
            dateFormat: "MM d, yy",
            onSelect: function(dateText, inst) {
                $(`#jobStartDate_${nextIdx}`).val(dateText);
                
                // DEBUG
                // console.log(inst);
            }
        });

        // Attach datepicker listener to #jobEndDate_{index} element
        $(`#jobEndDate_${nextIdx}`).datepicker({
            dateFormat: "MM d, yy",
            onSelect: function(dateText, inst) {
                $(`#jobEndDate_${nextIdx}`).val(dateText);
                
                // DEBUG
                // console.log(inst);
            }
        });

        // DEBUG
        // console.log($("#experienceContainer").children());
    });

    // Initialize listeners to "Add Education" button
    $("#addEducationBtn").on("click", function() {
        let nextIdx = education.length;
        let nextElementId = `eduCard_${nextIdx}`;

        let eduObj = emptyEduObj;
        eduObj.id = nextIdx;

        education.push(emptyEduObj);

        let newEduCardElement;
        newEduCardElement = $("<div>");
        newEduCardElement.addClass(["card", "mb-2"]);
        newEduCardElement.attr("id", nextElementId);
        
        let eduCardBody;
        eduCardBody = $("<div>");
        eduCardBody.addClass("card-body");

        // Create Upper Row of card-body
        let eduUpperRow = $("<div>").addClass(["row", "mb-2"]);

        // edu U F C : upper first column
        let eduUFC = $("<div>").addClass(["col", "col-sm-8"]);
        // edu U S C : upper second column
        let eduUSC = $("<div>").addClass(["col", "col-sm-4"]);

        let eduUFCLabel = $("<label>").addClass("form-label").attr("for", `institutionName_${nextIdx}`).text("Institution");
        let eduUSCLabel = $("<label>").addClass("form-label").attr("for", `eduStartDate_${nextIdx}`).text("Start Date");

        let eduUFInputGroup = $("<div>").addClass("input-group");
        let eduUFTextInput = $("<input>").addClass("form-control").attr("id", `institutionName_${nextIdx}`).attr("placeholder", "JKL Business College");
        let eduUSInputGroup = $("<div>").addClass("input-group");
        let eduUSTextInput = $("<input>").addClass("form-control").attr("id", `eduStartDate_${nextIdx}`).attr("placeholder", "January 1, 2010");

        let eduUFInputIcon = $("<i>").addClass(["bi", "bi-pin-map"]);
        let eduUFInputIconSpan = $("<span>").addClass("input-group-text");
        let eduUSInputIcon = $("<i>").addClass(["bi", "bi-calendar-event"]);
        let eduUSInputIconSpan = $("<span>").addClass("input-group-text");

        eduUFInputIconSpan.append(eduUFInputIcon);
        eduUSInputIconSpan.append(eduUSInputIcon);

        eduUFInputGroup.append(eduUFInputIconSpan);
        eduUFInputGroup.append(eduUFTextInput);
        eduUSInputGroup.append(eduUSInputIconSpan);
        eduUSInputGroup.append(eduUSTextInput);

        eduUFC.append(eduUFCLabel);
        eduUFC.append(eduUFInputGroup);
        eduUSC.append(eduUSCLabel);
        eduUSC.append(eduUSInputGroup);

        eduUpperRow.append(eduUFC);
        eduUpperRow.append(eduUSC);

        // Create Bottom Row of card-body
        let eduBottomRow = $("<div>").addClass(["row", "mb-2"]);
        let eduBFC = $("<div>").addClass(["col", "col-sm-5"]);
        let eduBSC = $("<div>").addClass(["col", "col-sm-3"]);
        // edu B T C : bottom third column
        let eduBTC = $("<div>").addClass(["col", "col-sm-4"]);
        
        let eduBFColLabel = $("<label>").addClass("form-label").attr("for", `fieldOfStudy_${nextIdx}`).text("Field of Study");
        let eduBSColLabel = $("<label>").addClass("form-label").attr("for", `degree_${nextIdx}`).text("Degree");
        // eduBTColLabel : education bottom third column label
        let eduBTColLabel = $("<label>").addClass("form-label").attr("for", `eduEndDate_${nextIdx}`).text("End Date");

        // let bfInputGroup = $("<div>").addClass("input-group");
        let eduBFInputGroup = $("<div>").addClass("input-group");
        let eduBFTextInput = $("<input>").addClass("form-control").attr("id", `fieldOfStudy_${nextIdx}`).attr("placeholder", "Computer Science");

        // let bsInputGroup = $("<div>").addClass("input-group");
        let eduBSInputGroup = $("<div>").addClass("input-group");
        let eduBSTextInput = $("<input>").addClass("form-control").attr("id", `degree_${nextIdx}`).attr("placeholder", "B. Sc");

        let eduBTInputGroup = $("<div>").addClass("input-group");
        let eduBTTextInput = $("<input>").addClass("form-control").attr("id", `eduEndDate_${nextIdx}`).attr("placeholder", "January 1, 2014");

        let eduBFInputIcon = $("<i>").addClass(["bi", "bi-book"]);
        let eduBFInputIconSpan = $("<span>").addClass("input-group-text");

        let eduBSInputIcon = $("<i>").addClass(["bi", "bi-mortarboard"]);
        let eduBSInputIconSpan = $("<span>").addClass("input-group-text");

        let eduBTInputIcon = $("<i>").addClass(["bi", "bi-calendar-event"]);
        let eduBTInputIconSpan = $("<span>").addClass("input-group-text");

        eduBFInputIconSpan.append(eduBFInputIcon);
        eduBSInputIconSpan.append(eduBSInputIcon);
        eduBTInputIconSpan.append(eduBTInputIcon);

        eduBFInputGroup.append(eduBFInputIconSpan);
        eduBFInputGroup.append(eduBFTextInput);
        eduBSInputGroup.append(eduBSInputIconSpan);
        eduBSInputGroup.append(eduBSTextInput);
        eduBTInputGroup.append(eduBTInputIconSpan);
        eduBTInputGroup.append(eduBTTextInput);

        eduBFC.append(eduBFColLabel);
        eduBFC.append(eduBFInputGroup);
        eduBSC.append(eduBSColLabel);
        eduBSC.append(eduBSInputGroup);
        eduBTC.append(eduBTColLabel);
        eduBTC.append(eduBTInputGroup);

        eduBottomRow.append(eduBFC);
        eduBottomRow.append(eduBSC);
        eduBottomRow.append(eduBTC);

        eduCardBody.append(eduUpperRow);
        eduCardBody.append(eduBottomRow);
        newEduCardElement.append(eduCardBody);
        $("#educationContainer").append(newEduCardElement);

        // Attach datepicker listener to #eduStartDate_{index} element
        $(`#eduStartDate_${nextIdx}`).datepicker({
            dateFormat: "MM d, yy",
            onSelect: function(dateText, inst) {
                $(`#eduStartDate_${nextIdx}`).val(dateText);
                
                // DEBUG
                // console.log(inst);
            }
        });

        // Attach datepicker listener to #eduEndDate_{index} element
        $(`#eduEndDate_${nextIdx}`).datepicker({
            dateFormat: "MM d, yy",
            onSelect: function(dateText, inst) {
                $(`#eduEndDate_${nextIdx}`).val(dateText);
                
                // DEBUG
                // console.log(inst);
            }
        });

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
        close: function() {
            // console.log("closed add skills dialog");
        }
    });

    $("#addSkillsForm").on("submit", function(event) {
        // console.log(event);
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
                // xhr: XMLTHttpRequest object, contains details about the request made to the server
                // xhr.status : HTTP Status Code
                // xhr.statusText: the status text of the response
                error: function(xhr, status, error) {
                    alert(JSON.parse(xhr.responseText)["detail"]);
                    isLoggedIn = false;
                }
            });
        });
    }
}

$(function() {
    // When DOM is fully loaded
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
                    // xhr: XMLTHttpRequest object, contains details about the request made to the server
                    // xhr.status : HTTP Status Code
                    // xhr.statusText: the status text of the response
                    error: function(xhr, status, error) {
                        // console.log(status);
                        // console.log(error);
                        // console.log(xhr);
                        // console.log(JSON.parse(xhr.responseText)["detail"]);
                        alert(JSON.parse(xhr.responseText)["detail"]);
                        isLoggedIn = false;
                    }
                });
                
            }
        }
    });
});