window.onload = function() {
    onPageOpen();
  };
function onPageOpen()
{
    experiences = [{position : "", employer : "", start_date : "", end_date : "", description : ""}];
    localStorage.setItem("experiences", JSON.stringify(experiences));
    localStorage.setItem("experiencesAmount", 1);
}