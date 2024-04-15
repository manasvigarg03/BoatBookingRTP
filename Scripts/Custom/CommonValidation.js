$(document).ready(function () {
  //NoBackPage();
  IsMaxLength();
});
//function NoBackPage() {
//    window.history.forward();
//}
function IsSameCharMobile() {
  debugger;
  var Flag = true;
  var error = "";
  $(".IsSameMobile").each(function () {
    var val = $(this).val();

    var firstchar = val.charAt(0);

    var count = 0;

    //8888888888= 10

    for (var i = 0; i < 9; i++) {
      if (firstchar == val.charAt(i + 1)) {
        count += 1;
      } else {
        count = 0;
        break;
      }
    }

    if (count == val.length - 1) {
      toastr.error("Mobile Number can't have same numbers!");
      $(this).focus();
      Flag = false;
      return Flag;
    } else {
      Flag = true;
      return Flag;
    }
  });
  return Flag;
}
function MobileFirstCharacter() {
  var regexforfirstchar = "^[6-9]{1}[0-9]{9}$";
  var Flag = true;
  var error = "";

  $(".IsMobileFirstCharacter").each(function () {
    var val = $(this).val();
    if (!val.match(regexforfirstchar)) {
      error = "Mobile Number must start with 6,7,8 or 9";
      $(this).focus();
      toastr.error(error);
      Flag = false;
      return Flag;
    } else {
      Flag = true;
      return Flag;
    }
  });

  return Flag;
}
function IsSameCharAadhar() {
  debugger;
  var Flag = true;
  var error = "";
  $(".IsSameAadhar").each(function () {
    var val = $(this).val();

    var firstchar = val.charAt(0);

    var count = 0;

    //8888888888= 10

    for (var i = 0; i < 11; i++) {
      if (firstchar == val.charAt(i + 1)) {
        count += 1;
      } else {
        count = 0;
        break;
      }
    }

    if (count == val.length - 1) {
      toastr.error("Aadhar Number can't have same numbers!");
      $(this).focus();
      Flag = false;
      return Flag;
    } else {
      Flag = true;
      return Flag;
    }
  });
  return Flag;
}
function IsMaxLength() {
  $("input[type='text']").each(function () {
    var thisctrl = $(this);
    var nexttext = $(this).next().text().toUpperCase();
    var maxlength = 0;

    if (nexttext.indexOf("NAME") != -1) {
      if (nexttext.indexOf("CODE") != -1) {
        maxlength = $(thisctrl).attr("maxlength", "3");
      } else {
        maxlength = $(thisctrl).attr("maxlength", "50");
      }
    } else if (nexttext.indexOf("EMAIL") != -1) {
      maxlength = $(thisctrl).attr("maxlength", "50");
    } else if (nexttext.indexOf("MOBILE") != -1) {
      maxlength = $(thisctrl).attr("maxlength", "10");
    } else {
    }
  });

  $("input[type='password']").each(function () {
    var thisctrl = $(this);
    var maxlength = $(thisctrl).attr("maxlength", "15");
  });
}
function EmptyFieldValidation() {
  var Flag = true;
  var error = "";
  $(".IsValid").each(function () {
    debugger;
    if ($.trim($(this).val()) == "") {
      if ($(this).is(":text") || $(this).is("textarea")) {
        error = $(this).next().text() + " is required !";
      } else if ($(this).is(":file")) {
        error = $(this).prev().text() + " is required !";
      } else if ($(this).is("select")) {
        error = $(this).find("option:selected").text();
      }

      $(this).focus();
      toastr.error(error);
      Flag = false;
      return Flag;
    } else {
      Flag = true;
      return Flag;
    }
  });

  return Flag;
}
function SpecialCharacterForNumeric() {
  debugger;
  var regexspecialcharforenglish = "^[A-Za-z ]*$";
  var regexspecialcharforhindi = "[\u0900-\u097F]+";
  var Flag = true;
  var error = "";
  $(".IsSpecialCharAndNumeric").each(function () {
    var val = $(this).val();
    if (
      val.match(regexspecialcharforenglish) ||
      val.match(regexspecialcharforhindi)
    ) {
      Flag = true;
      return Flag;
    } else {
      error =
        "No Special Character or numeric digit is allowed in " +
        $(this).next().text() +
        " field";
      $(this).focus();
      toastr.error(error);
      Flag = false;
      return Flag;
    }
  });

  return Flag;
}
function SpecialCharacter() {
  debugger;
  var regexspecialcharforenglish = "^[A-Za-z0-9 ]*$";
  var regexspecialcharforhindi = "[\u0900-\u097F]+";
  var Flag = true;
  var error = "";
  $(".IsSpecialChar").each(function () {
    var val = $(this).val();
    if (
      val.match(regexspecialcharforenglish) ||
      val.match(regexspecialcharforhindi)
    ) {
      Flag = true;
      return Flag;
    } else {
      error =
        "No Special Character is allowed in " +
        $(this).next().text() +
        " field";
      $(this).focus();
      toastr.error(error);
      Flag = false;
      return Flag;
    }
  });

  return Flag;
}
function MaxDigitLimit() {
  var Flag = true;
  var error = "";
  $(".IsMax").each(function () {
    var val = $(this).val();
    if (val > 0 && val < 26) {
      Flag = true;
      return Flag;
    } else {
      toastr.error("Entered Capacity should be between 1 to 25.");
      $(this).focus();
      Flag = false;
      return Flag;
    }
  });
  return Flag;
}
function IsNumericValidation() {
  var regexnumericvalue = "";
  var Flag = true;
  var error = "";
  $(".IsNumeric").each(function () {
    var val = $(this).val();
    var maxlength = $(this).attr("maxlength");
    regexnumericvalue = "^[0-9]{" + maxlength + "}$";
    if (!val.match(regexnumericvalue)) {
      error =
        "Exactly " +
        maxlength +
        " numeric digits required in " +
        $(this).next().text() +
        " field";
      $(this).focus();
      toastr.error(error);
      Flag = false;
      return Flag;
    } else {
      Flag = true;
      return Flag;
    }
  });

  return Flag;
}
function IsEmailValidation() {
  var regexemail =
    "^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$"; /*correct email id regex*/
  var Flag = true;
  var error = "";
  $(".IsEmail").each(function () {
    var val = $(this).val();

    if (!val.match(regexemail)) {
      error = "Invalid Email id !";
      $(this).focus();
      toastr.error(error);
      Flag = false;
      return Flag;
    } else {
      Flag = true;
      return Flag;
    }
  });

  return Flag;
}

function DecimalDigit() {
  debugger;

  var regexdecimal = /^[-+]?[0-9]+\.[0-9]+$/;
  var regexnumericvalue = /^[0-9]+$/;
  var Flag = true;
  var error = "";
  $(".IsDecimal").each(function () {
    var val = $(this).val();
    if (val.match(regexdecimal) || val.match(regexnumericvalue)) {
      Flag = true;
      return Flag;
    } else {
      error =
        "only Numeric and Decimal values are allowed in this " +
        $(this).next().text() +
        " field";
      $(this).focus();
      toastr.error(error);
      Flag = false;
      return Flag;
    }
  });

  return Flag;
}
//$(document).ready(function () {
//    $('input').keyup(function (event) {
//        if (event.which === 13) {
//            event.preventDefault();
//            $('form').submit();
//        }
//    });
//});
