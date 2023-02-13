validationArray = [
                    {name : "number", validation : false},
                    {name : "email", validation : false},
                    {name : "surname", validation : false},
                    {name : "name", validation : false}
                ];

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
    for(i = 0; i < 4; i++)
    {
        if(validationArray[i].name == "number")
            validatePhoneNumber();
        else if(validationArray[i].name == "email")
            checkEmail();
        else if(validationArray[i].name == "name")
            checkInputVar("name","nameLabel");
        else if(validationArray[i].name == "surname")
            checkInputVar("surname","surnameLabel");
    }

    var name = localStorage.getItem("name");

    var surname = localStorage.getItem("surname");
    
    var email = localStorage.getItem("email");

    var number = localStorage.getItem("number");

    var description = localStorage.getItem("description");

    document.getElementById('name').value = name;

    document.getElementById('surname').value = surname;

    document.getElementById('email').value = email;

    document.getElementById('number').value = number;

    document.getElementById('description').value = description;

    for(i = 0; i < 4; i++)
    {
        validationArray[i].validation = !bool(localStorage.getItem(validationArray[i].name) == ""); 
    }
}
function onNextPage()
{
    validate = true;
    for(i = 0; i < 4; i++)
    {
        if(!validationArray[i].validation)
        {
            if(validationArray[i].name == "number")
                validatePhoneNumber();
            else if(validationArray[i].name == "email")
                checkEmail();
            else if(validationArray[i].name == "name")
                checkInputVar("name","nameLabel");
            else if(validationArray[i].name == "surname")
                checkInputVar("surname","surnameLabel");
        }
        validate &= validationArray[i].validation;
    }
    if(validate)
        window.location.href = "pg3.html";
}
function checkInputVar(inputRef, labelRef)
{
    setTimeout(() => {
        prevValidation = true;
        id = 0;
        for(i = 0; i < 4; i++)
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

        validationArray[id].validation = validate;
        if(validate)
        {
            if(inputRef == "name")
            {
                localStorage.setItem("name", document.getElementById(inputRef).value);
                document.getElementById('Accepted1').style.display = "flex";
                document.getElementById('Denied1').style.display = "none";
            }
            if(inputRef == "surname")
            {
                localStorage.setItem("surname", document.getElementById(inputRef).value);
                document.getElementById('Accepted2').style.display = "flex";
                document.getElementById('Denied2').style.display = "none";
            }
            document.getElementById(labelRef).style.borderColor = "lime";
        }
        else
        {
            if(inputRef == "name")
            {
                localStorage.setItem("name", "");
                document.getElementById('Denied1').style.display = "flex";
                document.getElementById('Accepted1').style.display = "none";
            }
            if(inputRef == "surname")
            {
                localStorage.setItem("surname", "");
                document.getElementById('Denied2').style.display = "flex";
                document.getElementById('Accepted2').style.display = "none";
            }
            document.getElementById(labelRef).style.borderColor = "red";
        }
    }, 50);
}
function notRequired(labelRef)
{
    document.getElementById(labelRef).style.borderColor = "lime";

    localStorage.setItem("description", document.getElementById('description').value);
}

function checkEmail()
{
    setTimeout(() => { 
        prevValidation = validationArray[1].validation;
        email = document.getElementById("email").value;
        j = 0;
        str = "eg.yrrebder@";
        validate = true;
        if(email.length < 12)
            validate = false;
        else
        {
            for(i  = email.length-1; i>=0; i--)
            {
                if(j == 12)
                    break;
                if(str[j] != email[i])
                {
                    validate = false;
                    break;
                }
                j++;
            }
        }
        validationArray[1].validation = validate;
        if(validate)
        {
            localStorage.setItem("email", document.getElementById("email").value);
            document.getElementById("emailLabel").style.borderColor = "lime";
            document.getElementById('Accepted3').style.display = "flex";
            document.getElementById('Denied3').style.display = "none";
        }
        else
        {
            localStorage.setItem("email", "");
            document.getElementById("emailLabel").style.borderColor = "red";
            document.getElementById('Denied3').style.display = "flex";
            document.getElementById('Accepted3').style.display = "none";
        }
    }, 50);
    
}

function validatePhoneNumber()
{
    setTimeout(() => { 
        prevValidation = validationArray[0].validation; 
        num = document.getElementById("number").value; 
        validate = true;
        
        validatedNum = "";

        currVal = 0;
        for(i = 0; i < num.length; i++)
        {
            if(num[i] != ' ')
            {
                if(currVal == 0 && num[i] != '+')
                {
                    validate = false;
                    break;
                } 
                if(currVal == 1 && num[i] != '9')
                {
                    validate = false;
                    break;
                } 
                if(currVal == 2 && num[i] != '9')
                {
                    validate = false;
                    break;
                } 
                if(currVal == 3 && num[i] != '5')
                {
                    validate = false;
                    break;
                } 
                if(currVal == 4 && num[i] != '5')
                {
                    validate = false;
                    break;
                } 
                else if(currVal > 0 && (num[i] < '0' || num[i] > '9'))
                {
                    validate = false;
                    break;
                }
                else if(currVal > 12)
                {
                    validate = false;
                    break
                }
                currVal++;
                validatedNum += num[i];
                if(currVal == 4 || currVal == 7 || currVal == 9 || currVal == 11 || currVal == 13)
                    validatedNum += ' ';
            }
        }

        if(currVal != 13)
            validate = false;

        validationArray[0].validation = validate;
        if(validate)
        {
            localStorage.setItem("number", validatedNum);
            document.getElementById("numberLabel").style.borderColor = "lime";
            document.getElementById('Accepted4').style.display = "flex";
            document.getElementById('Denied4').style.display = "none";
        }
        else
        {
            localStorage.setItem("number", "");
            document.getElementById("numberLabel").style.borderColor = "red";
            document.getElementById('Denied4').style.display = "flex";
            document.getElementById('Accepted4').style.display = "none";
        }
    }, 50);
}