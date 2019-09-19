// Functions are a vital tool in any programming language. In particular functions control the scope of variables
// JavaScript functions are similar to C++ functions in their declaration, except there is only one type of function
// Declaring Functions

var list=[];
var listn=0;
var listprint = "";
var listcomp=[];
document.getElementById("title").innerText="To Do:"
document.getElementById("enter").innerText="Enter Task: "
document.getElementById("enterdate").innerText="Enter Due Date (dd/mm/yyyy):"
error=false
monthdays=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] //number of days per month

    // function that converts dd/mm/yyyy format into a javascript date 
    function getDate(datestr){
      day = datestr.slice(0, datestr.indexOf("/")); //pull out just day from string
      month = datestr.slice(datestr.indexOf("/")+1, datestr.lastIndexOf("/")) -1 ; // pull out month from string and convert to javascript fomrat (0 is Jan)
      year = datestr.slice(datestr.lastIndexOf("/")+1, 10); // pull out day from string 
      console.log("Day:", day)
      console.log("Month:", month)
      console.log("Year:", year)
      // check that date is valid 
      // check month
      if ((month<0 || month>11) && month!=NaN){
        document.getElementById("errorMonth").innerText="Invalid Month Entry"
        console.log("Error Month")
        error=true
      }

      //check day
      else if ((day<0 || day>monthdays[month]) && day!=NaN){
          document.getElementById("errorDay").innerText="Invalid Day Entry"
          console.log("Error Day")
          error=true
      }
      //check year
      else if (year<2019 && year!=NaN){
          document.getElementById("errorYear").innerText="Year must be in the future"
          console.log("Error Year")
          error=true
      }
      // if all is valid, return date variable 
      else{
        var newDate = new Date(year, month, day)
       console.log("Date", newDate) 
       return newDate
      }
    }
    
    // function that resets errors 
    function resetErrors(){
      error=false 
      document.getElementById("errorYear").innerText=""
      document.getElementById("errorDay").innerText=""
      document.getElementById("errorMonth").innerText=""
    }
    
    // function to add user entry to list and display
    function addToList(){
      resetErrors()
      dueDate=getDate(document.getElementById('date').value)
      if (error==false){
        var taskobj = {taskname:document.getElementById('task').value, date:dueDate, status:'incomp'};
        console.log("object", taskobj);
        list.push(taskobj);
        console.log("Current List", list);
        rePrint(list, listprint, 'mylist');
        //document.getElementById("mylist").innerHTML=listprint;
        //listn ++ ;
        //console.log(listn);
      }
    }

    // function to re-print hte list 
    function rePrint(li, tag, thisid){
      tag = "";
      console.log(li)
      for (var i = 0; i<li.length; i++){
        tag += "<li>" + li[i].taskname + "; Due: " + li[i].date.toDateString() + "<input type='checkbox' name ='check'>"+ "</li>";
      }     
      document.getElementById(thisid).innerHTML=tag;
    }

    // function to sort list by date
    function sortByDate(){
      sortedList=list.sort(function(a,b){return a.date - b.date})
      return sortedList
      console.log(sortedList)
    }

    // function to re-print the list in sorted form 
    function printSorted(){
      sortedList=sortByDate();
      console.log('Sorted List', sortedList)
      listprint = ""; 
      for (var i = 0; i<sortedList.length; i++){
        listprint += "<li>" + sortedList[i].taskname + "; Due: " + sortedList[i].date.toDateString() + "<input type='checkbox' name ='check'>" + "</li>";
      }
      document.getElementById("mylist").innerHTML=listprint;
    }

    // function to remove item from list
    function removeLast(){
      if (listcomp.length>0){
        listcomp.pop()
        printComplete()
      }
      else{
        list.pop();
        rePrint(list, listprint, 'mylist');

      }
      //listn--;
    } 

    function check(){
      for (var i = 0; i<list.length; i++){
        stat=document.getElementsByName('check')[i].checked;
        console.log(stat)
        if (stat==true){
          list[i].status='complete'
        }
        console.log('Check List', list)
      }
    } 
    
    
    function printComplete(){
      comprint = "";
      for (var i = 0; i<listcomp.length; i++){
        console.log("Completed Task Name", listcomp[i].taskname)
        comprint += "<li>" + "<strike>"+listcomp[i].taskname + "<strike>"+ "</li>";
      }     
      document.getElementById('mycomplete').innerHTML=comprint;
    }
    
    function getComp(x){
      return x.status=='incomp'
    }

    function sumbitComplete(){
      check()
      console.log('Test getComp', (getComp(list[1])))
      for (var i=0; i<list.length; i++){
        if (list[i].status=='complete'){
          listcomp.push(list[i])
        }
      }
      list=list.filter(getComp)
      console.log("Filtered List", list)


      //for (var i=0; i<list.length; i++){
      //  if (list[i].status=='complete'){
      //    list.splice(i,1)
      //  }
      //}
      console.log("Complete List", listcomp);
      console.log("List", list);
      rePrint(list, listprint, 'mylist');
      comprint='';
      printComplete();
    }
    

    
      //console.log('Checkbox Test', document.getElementById('check0').checked)
      //return document.getElementById('check0').checked 
  
    
    
  

    // function to mark item as complete 
       