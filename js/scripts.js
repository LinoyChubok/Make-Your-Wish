// Type Writer
var i = 0;

function typeWriter(input) {
  if (i < input.length) {
    document.getElementsByClassName("bubbleText")[0].innerHTML += input.charAt(i);
    i++;
    setTimeout(function () {
      typeWriter(input);
    }, 80);
  }
}

/************************************************************************/

var clickCase = 1;

// contentFormat - Content Format of Speech Bubble
function contentFormat(oldInput, newInput, newText, delayTextTime, delayInputTime, genieTalk = 0) {
  if ($(oldInput).css("visibility", "visible")) {
    hideInput(oldInput);

    switch (genieTalk) {
      case 1:
        reloadBubbleText("Hello " + $("#nameInput").val() + "!\nNice to have you on the show.\n");
        break;
      case 2:
        if ($("#numberInput").val() == 1)
          reloadBubbleText(
            "Great! just remember you\nstill have two wishes to use."
          );
        if ($("#numberInput").val() == 2 || $("#numberInput").val() == 3)
          reloadBubbleText(
            "Slowly, maybe we can start\nfrom the first wish..."
          );
        break;
    }

    setTimeout(function () {
      reloadBubbleText(newText);
      setTimeout(function () {
        showInput(newInput);
      }, delayInputTime);
    }, delayTextTime);
  }
}

function hideInput(input) {
  $(input).css("visibility", "hidden");
  if (clickCase == 7) $("#span-range").css("visibility", "hidden");
}

function showInput(input) {
  $(input).css("visibility", "visible");
  $(input).fadeIn(1000);
  if (clickCase == 7) {
    $("#span-range").css("visibility", "visible");
    $("#span-range").fadeIn(500);
  }
}

function reloadBubbleText(textInput) {
  $(".bubbleText").text("");
  i = 0;
  typeWriter(textInput);
}

function submitForm() {
  if(submitName("#nameInput") &&  submitPassword("#secretInput") && submitMail("#emailInput")&& submitWebsite("#websiteInput") && submitPhone("#idInput") && submitAge("select[name=age]") && submitCheckBox("input[type=checkbox]")) {
    return true;
  }
   else {
    $("#secretInput").css("visibility", "hidden");
    $("#continueBtn").css("visibility", "hidden");
    reloadBubbleText("You have some wrong inputs,\nYou spent your wish.\nSee you in the next time.");
     return false;
   }
}

// Change Content with Click on Continue Button with contentFormat Function
// contentFormat(oldInput, newInput ,newText, delayTextTime, delayInputTime, genieTalk)
function cases() {
    if (clickCase == 1) clickCase++;
    var strToSend = "";
    switch (clickCase) {
      case 2:
        $("#continueBtn").fadeOut(0);
        strToSend = "What is your ID, master?";
        contentFormat("#nameInput", "#idInput", strToSend, 5000, 2000, 1);
        clickCase++;
        break;

      case 3:
        $("#continueBtn").fadeOut(0);
        strToSend = "Where are you from?";    
        contentFormat("#idInput" , "#addressInput", strToSend, 0, 2000);
        setTimeout(function () {$("#continueBtn").fadeIn(500);} , 2000);
        clickCase++;
        break;

      case 4:
        $("#continueBtn").fadeOut(0);
        strToSend = "What is your age?"; 
        contentFormat("#addressInput" , "#ageInput", strToSend, 0, 1500);
        clickCase++;
        break;

      case 5:
        $("#continueBtn").fadeOut(0);
        strToSend = "How many wishes would you\nlike to fulfill?";
        contentFormat("#ageInput", "#numberInput", strToSend, 0, 3500);
        setTimeout(function () {$("#continueBtn").fadeIn(500);} , 3500);
        clickCase++;
        break;

      case 6:
        $("#continueBtn").fadeOut(0);
        strToSend = "What is your status?";
        contentFormat("#numberInput", "#rangeInput", strToSend, 6000, 2500, 2);
        setTimeout(function () {$("#continueBtn").fadeIn(500);} , 9000);
        clickCase++;
        break;

      case 7:
        $("#continueBtn").fadeOut(0);
        strToSend = "How can I contact with\nyou in the future?";
        contentFormat("#rangeInput", "#emailInput", strToSend, 0, 3000);
        clickCase++;
        break;

      case 8:
        $("#continueBtn").fadeOut(0);
        strToSend = "Please enter a magic-site:";
        contentFormat("#emailInput", "#websiteInput", strToSend, 0, 2000);
        clickCase++;
        break;

      case 9:
        $("#continueBtn").fadeOut(0);
        strToSend = "Which type of transport\ndo you use?";
        contentFormat("#websiteInput", "#checkboxesContainer", strToSend, 0, 3000);
        clickCase++;
        break;

      case 10:
        $("#continueBtn").fadeOut(0);
        strToSend = "Choose one partner:";
        contentFormat("#checkboxesContainer", "#radioContainer", strToSend, 0, 1500);
        setTimeout(function () {$("#continueBtn").fadeIn(500);} , 1500);
        clickCase++;
        break;

      case 11:
        $("#continueBtn").fadeOut(0);
        strToSend = "Genie, I wish";
        contentFormat("#radioContainer", "#secretInput", strToSend, 0, 1200);
        clickCase++;
        break;

      case 12:
        if(submitForm()) {
            hideInput("#secretInput");
            $("#speech-bubble").fadeOut(500);
            setTimeout(function () {
              $("#lamp").addClass("final-shakeLemp");
            }, 1000);
            setTimeout(function () {$("#myForm").submit();} , 2000);
        }
        break;
    }
  }

function validPassword(id) {
  var pass = $(id).val();
  var regex = "^[A-Za-z ']+$";
  if (pass.match(regex)) return true;
  return false;
}
function validMail(id) {
  var mail = $(id).val();
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail.match(regex)) return true;
  return false;
}
function validWebsite(id) {
  var website = $(id).val();
  var regex = "(\w*\W*)?\w*(\.(\w)+)+(\W\d+)?(\/\w*(\W*\w)*)*";
  if (website.match(regex)) return true;
  return false;
}
function validPhone(id) {
  var phone = $(id).val();
  var regexA = /^\d{10}$/;
  var regexB = /^\d{9}$/;
  if (phone.match(regexA) || phone.match(regexB)) return true;
  return false;
}
function validAge(id) {
  var age = $(id).val();
  if (age != null) return true;
  else return false;
}
function validCheckbox(id) {
  var checkboxes = $(id);
  var checkboxLen = checkboxes.length;
  for (let i = 0; i < checkboxLen; i++) {
    if (checkboxes[i].checked) return true;
  }
  return false;
}

function submitName(id) {
  if(validName(id)) {
    if($(id).hasClass("is-invalid"))
      $(id).removeClass("is-invalid");

    if(!$(id).hasClass("is-valid"))
      $(id).addClass("is-valid");

    $("#continueBtn").css("visibility", "visible");
    $("#continueBtn").fadeIn(500);
    return true;
  }
  else {
      if($(id).hasClass("is-valid"))
        $(id).removeClass("is-valid");

      if(!$(id).hasClass("is-invalid"))
        $(id).addClass("is-invalid");
      return false;
  }
}
function submitPassword(id) {
  if(validPassword(id)) {
    if($(id).hasClass("is-invalid"))
      $(id).removeClass("is-invalid");

    if(!$(id).hasClass("is-valid"))
      $(id).addClass("is-valid");
    
    $("#continueBtn").css("visibility", "visible");
    $("#continueBtn").fadeIn(500);
    return true;
  }
  else {
    if($(id).hasClass("is-valid"))
      $(id).removeClass("is-valid");

    if(!$(id).hasClass("is-invalid"))
      $(id).addClass("is-invalid");
    return false;
  } 
  }
  function submitMail(id) {
    if(validMail(id)) {
      if($(id).hasClass("is-invalid"))
        $(id).removeClass("is-invalid");

      if(!$(id).hasClass("is-valid"))
        $(id).addClass("is-valid");

      $("#continueBtn").css("visibility", "visible");
      $("#continueBtn").fadeIn(500);
      return true;
    }
    else {
      if($(id).hasClass("is-valid"))
        $(id).removeClass("is-valid");

      if(!$(id).hasClass("is-invalid"))
        $(id).addClass("is-invalid");
      return false;
    }
  }
  function submitWebsite(id) {
  if(validWebsite(id)) {
    if($(id).hasClass("is-invalid"))
        $(id).removeClass("is-invalid");

    if(!$(id).hasClass("is-valid"))
      $(id).addClass("is-valid");
    
    $("#continueBtn").css("visibility", "visible");
    $("#continueBtn").fadeIn(500);
    return true;
  }
  else {
    if($(id).hasClass("is-valid"))
      $(id).removeClass("is-valid");

    if(!$(id).hasClass("is-invalid"))
      $(id).addClass("is-invalid");
      return false;
  }
}
function submitPhone(id) {
  if(validPhone(id)) {
    if($(id).hasClass("is-invalid"))
      $(id).removeClass("is-invalid");
    if(!$(id).hasClass("is-valid"))
      $(id).addClass("is-valid");
    
    $("#continueBtn").css("visibility", "visible");
    $("#continueBtn").fadeIn(500);
    return true;
  }
  else {
    if($(id).hasClass("is-valid"))
      $(id).removeClass("is-valid");
    if(!$(id).hasClass("is-invalid"))
      $(id).addClass("is-invalid");
    return false;
  }
}
function submitAge(id) {
  if(validAge(id)) {
    if($(id).hasClass("is-invalid"))
      $(id).removeClass("is-invalid");

    if(!$(id).hasClass("is-valid"))
      $(id).addClass("is-valid");
    
    $("#continueBtn").css("visibility", "visible");
    $("#continueBtn").fadeIn(500);
    return true;
  }
  else {
    if($(id).hasClass("is-valid"))
      $(id).removeClass("is-valid");

    if(!$(id).hasClass("is-invalid"))
      $(id).addClass("is-invalid");
    return false;
  }
}
function submitCheckBox(id) {
  var checkboxes = $(id);
  var checkboxLen = checkboxes.length;
  if(validCheckbox(id)) {
    for (let i = 0; i < checkboxLen; i++) {  
      if(!$(checkboxes).hasClass("is-valid"))
        $(checkboxes).addClass("is-valid");
    }

    $("#continueBtn").css("visibility", "visible");
    $("#continueBtn").fadeIn(500);
    return true;
  }
 else {
    for (let i = 0; i < checkboxLen; i++) {  
      if(!$(checkboxes).hasClass("is-invalid"))
        $(checkboxes).addClass("is-invalid");
    }
    return false;
  }
}

$(document).ready(function () {
  $("#nameInput").on('input', function () {
    submitName(this);
  });
  
  $("#secretInput").on('input', function () {
    submitPassword(this);
    });

  $("#emailInput").on('input', function () {
    submitMail(this);
  });

  $("#websiteInput").on('input', function () {
  submitWebsite(this);
  });
  
  $("#idInput").on('input', function () {
    submitPhone(this);
  });

  $("select[name=age]").on('input', function () {
    submitAge(this);
  });

  $("input[type=checkbox]").on('input', function () {
    submitCheckBox(this);
  });
      
  //////////////////////////////////////

  $("#lamp").click(function () {
    $("#continueBtn").on("click", cases);

    // Magic Sound
    var audio = new Audio("../audio/magicsound.mp3");
    audio.play();
    // Active Lamp Color (Remove class shakeIt, the other class name of lamp, because cant remove lamp:hover without delete lamp css)
    $("#lamp").removeClass("shakeIt");
    $("#lamp").addClass("lampColor");
    // Smoke
    setTimeout(function () {
      $("ul").show();
    }, 1700);

    // Genie Fade In
    setTimeout(function () {
      $("#genie").fadeIn(4500);
    }, 2000);

    // Genie Levitation
    setTimeout(function () {
      $("#genie").addClass("genieLevitation");
    }, 2000);

    // Speech Bubble Fade In
    setTimeout(function () {
      $("#speech-bubble").fadeIn(3000);
    }, 6000);

    // Text of Speech Bubble  (Opening + Name Input)
    setTimeout(function () {
      reloadBubbleText("Aaaaahhhhh! Oy!");
    }, 7000);

    setTimeout(function () {
      reloadBubbleText(
        "Ten thousand years will\ngive you such a crick\nin the neck!"
      );
    }, 10000);

    setTimeout(function () {
      reloadBubbleText(
        "I'm the Genie of the lamp!\nRight here for your\nenjoyment wish fulfillment.");
    }, 18000);

    setTimeout(function () {
      reloadBubbleText("So... What's your name?");
    }, 26000);

    setTimeout(function () {
      showInput("#nameInput");
    }, 28000);
  });
});

function validName(id) {
    var regex = "^[A-Za-z ']+$";
    var cnt = 0;
    var flag = 0;
    var fullName = $(id).val();
    var fullNameLen = fullName.length;

    if (fullName.charAt(0) == " " || fullName.charAt(fullNameLen - 1) == " ")
      return false;

    for (let i = 0; i < fullNameLen; i++) {
      if (fullName.charAt(i) == " ") {
        cnt++;
        flag = 1;
      }
      if (i + 1 != fullNameLen) {
        if (flag && fullName.charAt(i + 1) == " ") {
          return false;
        }
        flag = 0;
      }
    }
    if (fullName.match(regex) && cnt > 0) return true;
    return false;
  }

  

  
  
  
  
 