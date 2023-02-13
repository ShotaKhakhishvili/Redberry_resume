experiences = 0;
validationArray = [
                        {name : "position1", validation : false},
                        {name : "employer1", validation : false},
                        {name : "start_date1", validation : false},
                        {name : "end_date1", validation : false}
                    ];
window.onload = function() {
    onPageOpen();
  };
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}
globalValidation = 0;
window.onload = function() {
    onPageOpen();
  };
function onPageOpen()
{
    var name = localStorage.getItem("name");

    var surname = localStorage.getItem("surname");
    
    var email = localStorage.getItem("email");

    var number = localStorage.getItem("number");

    var aboutMe = localStorage.getItem("description");

    document.getElementById('rezumeName').innerText = name + " " + surname;

    document.getElementById('rezumeEmailVal').innerText = email;

    document.getElementById('rezumeNumberVal').innerText = number;

    document.getElementById('rezumeAboutMeVal').innerText = aboutMe;

    var temp = localStorage.getObj("experiences");

    experienceS = localStorage.getItem("experiencesAmount");
    
    for(i = 1; i <= experienceS; i++)
    {   
        experiences++;
        if(i > 1)
        {
            addNewExperience();
            createNewDiv();
        }
        document.getElementById('position' + i).value = temp[i-1].position;
        document.getElementById('employer' + i).value = temp[i-1].employer;
        document.getElementById('start_date' + i).value = temp[i-1].start_date;
        document.getElementById('end_date' + i).value = temp[i-1].end_date;
        document.getElementById('experienceDescription' + i).value = temp[i-1].description;
        checkInputVar('position' + i, 'position' + i + 'Label');
        checkInputVar('employer' + i, 'employer' + i + 'Label');
        checkStartDate('start_date' + i);
        checkEndDate('end_date' + i);
        notRequired('experienceDescription' + i);

    }

}
function createNewHr()
{
    incrementExperiences();
    createNewDiv();
    addNewExperience();
}
function incrementExperiences()
{   
    experiences++;

    localStorage.setItem("experiencesAmount", experiences);
}
function addNewExperience()
{
    var expString = localStorage.getItem("experiences");
    var temp = JSON.parse(expString);


    temp.push({position : "", employer : "", start_date : "", end_date : "", description : ""});

    var stringedTemp = JSON.stringify(temp);
    localStorage.setItem("experiences", stringedTemp);
}
function createNewDiv()
{
    topPxs = (experiences - 1) * 645;

    var newExperience = document.querySelector('#Experience1');
    var clone = newExperience.cloneNode(true);
    var parent = newExperience.parentNode;

    // Replace the id's of the cloned node
    clone.id = "Experience" + experiences;

    var positionInput = clone.querySelector('#position1');
    positionInput.id = "position" + experiences;
    positionInput.value = "";

    var positionLabel = clone.querySelector('#position1Label');
    positionLabel.id = "position" + experiences + "Label";

    var experienceAccepted = clone.querySelector('#experienceAccepted1');
    experienceAccepted.id = "experienceAccepted" + experiences;
    // experienceAccepted.style.top = (topPxs + 85) + "px";

    var experienceDenied = clone.querySelector('#experienceDenied1');
    experienceDenied.id = "experienceDenied" + experiences;
    // experienceDenied.style.top = (topPxs + 85) + "px";

    var employerInput = clone.querySelector('#employer1');
    employerInput.id = "employer" + experiences;
    employerInput.value = "";

    var employerLabel = clone.querySelector('#employer1Label');
    employerLabel.id = "employer" + experiences + "Label";

    var startDateInput = clone.querySelector('#start_date1');
    startDateInput.id = "start_date" + experiences;
    startDateInput.value = "";

    var startDateLabel = clone.querySelector('#start_date1Label');
    startDateLabel.id = "start_date" + experiences + "Label";

    var endDateInput = clone.querySelector('#end_date1');
    endDateInput.id = "end_date" + experiences;
    endDateInput.value = "";

    var endDateLabel = clone.querySelector('#end_date1Label');
    endDateLabel.id = "end_date" + experiences + "Label";

    var experienceDescriptionInput = clone.querySelector('#experienceDescription1');
    experienceDescriptionInput.id = "experienceDescription" + experiences;
    experienceDescriptionInput.value = "";

    var experienceDescriptionLabel = clone.querySelector('#experienceDescription1Label');
    experienceDescriptionLabel.id = "experienceDescription" + experiences + "Label";

    clone.style.top = topPxs + "px";

    newExperience.after(clone);

    var button = document.querySelector('#Button4');

    button.style.top = (topPxs + 804) + "px";
    
    var nextButton = document.querySelector('#Next2');

    nextButton.style.top = (topPxs + 980) + "px";

    var prevButton = document.querySelector('#buttonBack1');

    prevButton.style.top = (topPxs + 980) + "px";
}
function onNextPage()
{
    validate = true;
    for(i = 0; i < validationArray.length; i++)
    {
        indx = Math.round((i - 2) / 4 + 1);
        if(i % 4 == 0)
        {
            checkInputVar('position' + indx, 'position' + indx + 'Label');
        }
        else if(i % 4 == 1)
        {
            checkInputVar('employer' + indx, 'employer' + indx + 'Label');
        }
        else
        {
            if(document.getElementById(validationArray[i].name).value == "")
            {
                document.getElementById(validationArray[i].name + 'Label').style.borderColor = "red";
                validationArray[i].validation = false;
            }
            else
            {
                document.getElementById(validationArray[i].name + 'Label').style.borderColor = "lime";
                validationArray[i].validation = true;
            }
        }
        validate &= validationArray[i].validation;
    }
    if(validate)
        window.location.href = "pg4.html";   
}
function checkInputVar(inputRef, labelRef)
{
    setTimeout(() => {
        prevValidation = true;
        id = 0;
        for(i = 0; i < validationArray.length; i++)
        {
            if(inputRef == validationArray[i].name)
                prevValidation = validationArray[i].validation,
                id = i; 
        }
        val = document.getElementById(inputRef).value;

        validate = true;

        if(val.length < 2)
        {
            validate = false;
        }

        else
        {
            for(i = 0; i < val.length; i++)
            {
                if(val[i] < 'ა' || val[i] > 'ჰ')
                {
                    validate = false;
                    break;
                }
            }
        }
        
        identification = "";
        index = "";

        identification = inputRef.substring(0,8);
        index = inputRef.substring(8);

        validationArray[id].validation = validate;

        var expString = localStorage.getItem("experiences");
        var temp = JSON.parse(expString);

        if(validate)
        {
            if(identification == "position")
            {
                document.getElementById('experienceAccepted' + index).style.display = "flex";
                document.getElementById('experienceDenied' + index).style.display = "none";
                temp[index-1].position = val;
            }
            if(identification == "employer")
            {
                document.getElementById('experienceAccepted' + index).style.display = "flex";
                document.getElementById('experienceDenied' + index).style.display = "none";
                temp[index-1].employer = val;
            }
            document.getElementById(labelRef).style.borderColor = "lime";
        }
        else
        {
            if(identification == "position")
            {
                document.getElementById('experienceDenied' + index).style.display = "flex";
                document.getElementById('experienceAccepted' + index).style.display = "none";
                temp[index-1].position = "";
            }
            if(identification == "employer")
            {
                document.getElementById('experienceDenied' + index).style.display = "flex";
                document.getElementById('experienceAccepted' + index).style.display = "none";
                temp[index-1].employer = "";
            }
            document.getElementById(labelRef).style.borderColor = "red";
        }
        var stringedTemp = JSON.stringify(temp);
        localStorage.setItem("experiences", stringedTemp);
    }, 50);
}
function checkStartDate(inputRef)
{
    i = inputRef.substring(10);

    if(document.getElementById(inputRef).value == "")
    {
        document.getElementById(inputRef + 'Label').style.borderColor = "red";
    }
    else
    {
        document.getElementById(inputRef + 'Label').style.borderColor = "lime";
    }
    var expString = localStorage.getItem("experiences");
    var temp = JSON.parse(expString);

    temp[i-1].start_date = document.getElementById(inputRef).value;

    var stringedTemp = JSON.stringify(temp);
    localStorage.setItem("experiences", stringedTemp);
}
function checkEndDate(inputRef)
{
    i = inputRef.substring(8);
    if(document.getElementById(inputRef).value == "")
    {
        document.getElementById(inputRef + 'Label').style.borderColor = "red";
    }
    else
    {
        document.getElementById(inputRef + 'Label').style.borderColor = "lime";
    }
    var expString = localStorage.getItem("experiences");
    var temp = JSON.parse(expString);

    temp[i-1].end_date = document.getElementById(inputRef).value;

    var stringedTemp = JSON.stringify(temp);
    localStorage.setItem("experiences", stringedTemp);
}
function notRequired(inputRef)
{
    i = inputRef.substring(21);

    document.getElementById(inputRef + "Label").style.borderColor = "lime";

    var expString = localStorage.getItem("experiences");
    var temp = JSON.parse(expString);

    temp[i-1].description = document.getElementById(inputRef).value;

    var stringedTemp = JSON.stringify(temp);
    localStorage.setItem("experiences", stringedTemp);
}