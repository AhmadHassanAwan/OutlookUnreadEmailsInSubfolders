'use strict';

var init = function() {

  $("._n_A4 > div > div > .subfolders > div").each(function () {                 // Iterating Each Parent Folder
    var unreadSubfolderEmails = 0;
    var thisParentId = $(this).children("div").attr("id");
    var thisParentSubfolderId = "#"+thisParentId+".subfolders";
    var thisParentTitle = $("#" + thisParentId + " > div:first-child > span > div > span:nth-child(3)").attr("title");
    var thisSubfolderContent = $("#" + thisParentId + " > div:nth-child(2)").html();
    var currentUnreadEmails = $("#" + thisParentId + " > div:first-child > span > div > div:nth-child(4) > span").text();
    if (thisSubfolderContent) {
      $("#" + thisParentId + " > div:first-child > span > div > span:nth-child(2)").trigger("click").trigger("click");
      $("#" + thisParentId + " > div:nth-child(2) > div").each(function () {
        var emailCount = $(this).find("._n_r4.ms-font-m.ms-fwt-sb.ms-fcl-tp").html();
        if (emailCount) {
          unreadSubfolderEmails = unreadSubfolderEmails + parseInt(emailCount)
        }
      });
      if (unreadSubfolderEmails == 0){
        return;
      }
      if (!($("#" + thisParentId + " > div:first-child > span > div > div:nth-child(4) > span").hasClass("contentAdded"))) {
        $("#" + thisParentId + " > div:first-child > span > div > div:nth-child(4) > span").addClass("contentAdded");
        $("#" + thisParentId + " > div:first-child > span > div > div:nth-child(4) > span").html(currentUnreadEmails + " <small class='unreadInSubfolders'>(" + unreadSubfolderEmails + ")</small>");
      }
      else{
        return;
      }
    }
  });
};

var updateElements = function(){

  $(".contentAdded").each(function(){
    console.log("removing class");
    $(this).removeClass("contentAdded");
  });
  $("small.unreadInSubfolders").each(function(){
    console.log("removing small");
    $(this).remove();
  });
};

setInterval(function(){
  updateElements();
  init();
},5000);