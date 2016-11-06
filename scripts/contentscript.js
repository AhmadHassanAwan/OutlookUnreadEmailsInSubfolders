'use strict';

console.log('\'Allo \'Allo! Content script');

var init = function() {

  $("._n_y4 > div > div > .subfolders > div").each(function () {                 // Iterating Each Parent Folder
    var unreadSubfolderEmails = 0;
    var thisParentId = $(this).children("div").attr("id");
    var thisParentSubfolderId = "#"+thisParentId+".subfolders";
    var thisParentTitle = $("#" + thisParentId + " > div:first-child > span > div > span:nth-child(3)").attr("title");
    var thisSubfolderContent = $("#" + thisParentId + " > div:nth-child(2)").html();
    var currentUnreadEmails = $("#" + thisParentId + " > div:first-child > span > div > div:nth-child(4) > span").text();
    if (thisSubfolderContent) {
      $("#" + thisParentId + " > div:first-child > span > div > span:nth-child(2)").trigger("click").trigger("click");
      console.log(thisParentTitle + " contains subfolder");
      $("#" + thisParentId + " > div:nth-child(2) > div").each(function () {
        var emailCount = $(this).find("._n_p4.ms-font-m.ms-fwt-sb.ms-fcl-tp").html();
        if (emailCount) {
          unreadSubfolderEmails = unreadSubfolderEmails + parseInt(emailCount)
        }
      });
      console.log(unreadSubfolderEmails);
      if (unreadSubfolderEmails == 0){
        return;
      }
      if (!($("#" + thisParentId + " > div:first-child > span > div > div:nth-child(4) > span").hasClass("contentAdded"))) {
        $("#" + thisParentId + " > div:first-child > span > div > div:nth-child(4) > span").addClass("contentAdded");
        $("#" + thisParentId + " > div:first-child > span > div > div:nth-child(4) > span").html(currentUnreadEmails + " <small>(" + unreadSubfolderEmails + ")</small>");
      }
      else{
        return;
      }
    }

    /*if (!($(this).find(".subfolders").html() == "")) {                          // If this Parent Folder contains Sub Folders
     var totalUnreadInSubfolders = 0;                                         // Total Number of Unread Emails in This Parent Folder
     $(this).find(".subfolders").each(function () {

     });
     console.log(totalUnreadInSubfolders);
     }*/
  });
};

/*setTimeout(function(){
  debugger
  $("._n_i4.treeNodeRowElement").each(function(){
    console.log($(this));
    $(this).trigger("click");
  });
},5000);*/

setInterval(function(){
  init();
},5000);