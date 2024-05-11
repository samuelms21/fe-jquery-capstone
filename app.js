var emptyExpObj = {
    jobTitle: null,
    companyName: null,
    jobStartDate: null,
    jobEndDate: null,
};

var emptyEduObj = {
    institutionName: null,
    eduStartDate: null,
    eduEndDate: null,
    fieldOfStudy: null,
    degree: null,
};

let experience = [emptyExpObj];
let education = [emptyEduObj];
let skills = ["Python", "MySQL", "C++"]; 
// let skills = ["Python", "MySQL", "C++", "Java", "Angular"];
// console.log(experience);

function deleteSkill(skillName) {
    // console.log(skillName);
    // console.log(skills);
    // debug
    // console.log("debugging deleteskill");
    // console.log(index);

    // // let beforeLength = skills.length;
    // skills.splice(index, 1);
    // console.log(skills);
    // // let afterLength = skills.length;

    // // if (afterLength < beforeLength) {
    // $(`#skill_${index}`).remove();
    // }

    let skillIdx = skills.indexOf(skillName);

    // console.log(skillName);
    // console.log(skills);

    if (skillIdx != -1) {
        skills.splice(skillIdx, 1);
        let findChip = $("#skillsContainer").find(`[data-skill='${skillName}']`);
        findChip.remove();

        // Reset text input in dialog
        $("#skillNameInput").val(null);
    }

    // console.log(skills);
}

$(function() {
    // When DOM is fully loaded
    console.log("DOM FULLY LOADED");

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
        experience.push(emptyExpObj);

        let newExpCardElement;
        newExpCardElement = $("<div>");
        newExpCardElement.addClass(["card", "mb-2"]);
        newExpCardElement.attr("id", nextElementId);
        
        let expCardBody;
        expCardBody = $("<div>");
        expCardBody.addClass("card-body");

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

        // DEBUG
        // console.log($("#experienceContainer").children());
    });

    // Create skill-chip elements to list initial skills
    for (var k = 0; k < skills.length; k++) {
        var currentSkill = skills[k];
        var skillChip = $("<div>").addClass("skill-chip").attr("id", `skill_${k}`).text(currentSkill);
        skillChip.attr("data-skill", currentSkill);

        var deleteSkillBtn = $("<div>").addClass(["ms-2", "custom-close-btn"]).html('<i class="bi bi-x-circle-fill"></i>');

        deleteSkillBtn.on("click", function(event) {
            let chipElement = event.currentTarget.parentElement;

            // DEBUG
            // console.log(chipElement);

            let skillName = $(chipElement).attr("data-skill");

            // console.log(chipElements);
            // console.log(skillName);
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

                            // debug
                            // console.log(newChipElement);

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
});