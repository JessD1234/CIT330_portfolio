var weekNav = document.querySelector(".week-navigation");

var weekLabels = [ "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "week 6", "week 7", "week 8", "week 9", "week 10", "week 13", "week 14"];
var weekLinks = ["week1/week1.html", "week2/week2.html", "week3/week3.html", "week4/week4.html", "week5/week5.html", "week6/week6.html", "week7/week7.html", "week8/week8.html", "week9/week9.html", "week10/week10.html", "week13/week13.html", "week14/week14.html"];

//var weekLine = document.createElement ("li");
//weekLine.textContent = "Week 1":

/*var a = document.createElement ("a");
var link = document.createTextNode ("Week 1");
a.title = "Week 1";
a.href = "week1/week1.html"

a.appendChild(link);
weekLine.appendChild(a);
weekNav.appendChild(weekLine);*/

for (i=0; i < weekLabels.length; i++) {
    var weekLine = document.createElement ("li");
    var a = document.createElement ("a");
    var link = document.createTextNode (weekLabels[i]);
    a.title = weekLabels[i];
    a.href = weekLinks[i];

    a.appendChild(link);
    weekLine.appendChild(a);
    weekNav.appendChild(weekLine);
}