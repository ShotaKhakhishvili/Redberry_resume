degrees = 1;
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}
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
    
    var expString = localStorage.getItem("experiences");
    var temp = JSON.parse(expString);

    document.getElementById('rezumeExperienceFrameTitle1').innerText = temp[0].position + ", " + temp[0].employer;

    document.getElementById('rezumeExperienceFrameDate1').innerText = temp[0].start_date + " " + temp[0].end_date;

    document.getElementById('rezumeExperienceFrameDescription1').innerText = temp[0].description;
    
}
