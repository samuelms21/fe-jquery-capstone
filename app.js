var emptyExpObj = {
    jobTitle: null,
    companyName: null,
    jobStartDate: null,
    jobEndDate: null,
};

let experience = [emptyExpObj];
// console.log(experience);

$(function() {
    // When DOM is fully loaded
    console.log("DOM FULLY LOADED");

    // Initialize listener to add exp button
    $("#addExperienceBtn").on("click", function() {
        let nextIdx = experience.length;
        let nextElementId = `expCard_${nextIdx}`;
        experience.push(emptyExpObj);

        let newExpCardElement;
        newExpCardElement = $("<div>");
        newExpCardElement.addClass(["card", "mb-2"]);
        newExpCardElement.attr("id", nextElementId);
        // $("#experienceContainer").append(newExpCardElement);
        
        let expCardBody;
        expCardBody = $("<div>");
        expCardBody.addClass("card-body");
        // $(`#${nextElementId}`).append(expCardBody);

        let upperRow = $("<div>").addClass(["row", "mb-2"]);
        // expCardBody.append(upperRow);

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

        expCardBody.append(upperRow);
        newExpCardElement.append(expCardBody);
        $("#experienceContainer").append(newExpCardElement);

        // DEBUG
        console.log($("#experienceContainer").children());
    });

    $("#jobStartDate").datepicker({
        dateFormat: "MM d, yy",
        onSelect: function(dateText, inst) {
            $("#jobStartDate").val(dateText);
        }
    });
});