function ShowResultMessage(data) {
    if (data.Result == false) {
        showModelessDialog(data.Message, "error");

    } else if (data.Result == true) {
        showModelessDialog(data.Message, "info");
    }
}
function showModelessDialog(message, type) {
    if (type == "info") {
        toastr.success(message)
    }
    else {
        toastr.error(message);
    }
}
$(function () {
    $('.datepickertraveldate').datepicker({
        format: 'mm-dd-yyyy',
        startDate: '+0d',        
        autoclose: true
    });
});
$(function () {
    $('.datepickerbirthdate').datepicker({
        format: 'mm-dd-yyyy',
        endDate: '-10y',
        autoclose: true
    });
});
$('#btnBookingnow').click(function () {
    if (PassengerValidation() && SpecialCharacter() && SpecialCharacterForNumeric() && IsSameCharMobile() && MobileFirstCharacter()) {        
        BoatBooking();
    }
    
});
function BoatBooking() {
    var traveltimings = $('#ddltraveltime').val();
    if (traveltimings != 0) {
        
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: '/BoatBooking/SaveBooking',
            data: JSON.stringify(ConvertToJson()),
            success: function (data) {
                ShowResultMessage(data);
                if (data.PNRNo != null) {
                    setTimeout(function () { window.location.href = '/BoatBooking/BookingConfirmed?PNRNo=' + data.PNRNo; }, 1500);
                }
                else {
                    toastr.error(data.Message);
                    return false;
                }
            },
            Error: function (data) {
                ShowResultMessage(data);
            }

        });
    }
    else {
        toastr.error("Select your Travel time.");
    }
}
function ConvertToJson() {

    var passengerdetails = [];
    var noofpasscount = $("#ddlnoofpassengers").val();
    for (var i = 1; i <= noofpasscount; i++) {
        passengerdetails.push({
            'FullName': $('#PassName_' + i).val(),
            'MobNo': $('#PassMobileNo_' + i).val(),
            'DOB': $('#PassDOB_' + i).val(),
            'Gender': $('#PassGender_' + i).find("option:selected").text(),                 

        });
    }    


    var BoatBooking = {
        Name: $("#Name").val(), MobileNo: $("#MobileNo").val(), Email: $("#Email").val(),
        DOB: $("#birthdate").val(),
        Gender: $("#ddlgender").find("option:selected").text(),
        TravelDate: $("#traveldate").val(),
        TravelTime: $("#ddltraveltime").find("option:selected").text(),        
        SourceId: $("#ddlsourceghat").val(),
        DestinationId: $("#ddldestinationghat").val(),        
        BoatId: 1,        
        NoOfPassenger: $("#ddlnoofpassengers").val(),
        IsWholeBoat: $("#chkwholeboatstatus").prop('checked'),
        Passengers: passengerdetails
    }
    return BoatBooking;
};


function ConvertToJsonForSameBoat() {
    var sameboatbooking = {    
        IsWholeBoat: $("#chkwholeboatstatus").prop('checked'),
        traveldate: $("#traveldate").val(),
        TravelTime: $("#ddltraveltime").find("option:selected").text(),
        SourceId: $("#ddlsourceghat").val(),
        DestinationId: $("#ddldestinationghat").val(),        
        BoatId: 1        
    }
    return sameboatbooking;

}

function PassengerValidation() {

    var flag = true;    
    var regexmobile = "^[0-9]{10}$";
    var regexemail = "^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$";
    var regexnumericvalue = "^[0-9]{1,2}$";
    /*var packageid = $("#ddlpackagename").val();*/
    var sourceid = $("#ddlsourceghat").val();
    var destinationid = $("#ddldestinationghat").val();
    /*var Boatid = $("#ddlBoat").val();*/
    var noofpassengerid = $("#ddlnoofpassengers").val();
    var traveldate = $("#traveldate").val();
    var traveltimings = $('#ddltraveltime').val();
    var _Name = $("#Name").val();
    var _MobileNo = $("#MobileNo").val();
    var _Email = $("#Email").val();
    var _DOB = $("#birthdate").val();
    var GenderId = $("#ddlgender").val();
    if (sourceid == 0) {
        toastr.error("Select your Source Ghat");
        $("#ddlsourceghat").focus();
        flag = false;
    }
    else if (destinationid == 0) {
        toastr.error("Select your Destination Ghat");
        $("#ddldestinationghat").focus();
        flag = false;
    }
    
    else if (traveldate == 'undefined' || traveldate == '') {
        toastr.error("Travel date is required");
        $("#traveldate").focus();
        flag = false;

    }

    else if (traveltimings == 0) {
        toastr.error("Travel time is required");
        $('#ddltraveltime').focus();
        flag = false;

    }
    else if (_Name == 'undefined' || _Name == '') {
        toastr.error("Enter name");
        $("#Name").focus();
        flag = false;

    }
    else if (_MobileNo == 'undefined' || _MobileNo == '' || !_MobileNo.match(regexmobile)) {

        if (_MobileNo == 'undefined' || _MobileNo == '') {
            toastr.error("Enter mobile No");
            $("#MobileNo").focus();
            flag = false;

        }
        else {
            toastr.error("Mobile No. Should be exactly of numeric 10 digits");
            $("#MobileNo").focus();
            flag = false;

        }

    }

    //Email
    else if (_Email == 'undefined' || _Email == '' || !_Email.match(regexemail)) {

        if (_Email == 'undefined' || _Email == '') {
            toastr.error("Enter Email");
            $("#Email").focus();
            flag = false;

        }
        else {
            toastr.error("Invalid Email entered !");
            $("#Email").focus();
            flag = false;

        }

    }   
        
    else if (_DOB == 'undefined' || _DOB == '') {
        toastr.error("Enter DOB");
        $("#birthdate").focus();
        flag = false;

    }

    else if (GenderId == 0) {
        toastr.error("Select your Gender");
        $("#ddlgender").focus();
        flag = false;

    }

    else if (noofpassengerid == '') {
        toastr.error("Select No. Of Passengers");
        $("#ddlnoofpassengers").focus();
        flag = false;
    }



    else {
        
        for (var i = 1; i <= noofpassengerid; i++) {
            var Name = $("#PassName_" + i).val();
            var MobileNo = $("#PassMobileNo_" + i).val();
            var DOB = $("#PassDOB_" + i).val();
            var Gender = $("#PassGender_" + i).val();
            if (Name == 'undefined' || Name == '') {
                toastr.error("Enter passanger" + i + " name");
                flag = false;
                break;
            }
            else if (MobileNo == 'undefined' || MobileNo == '' || !MobileNo.match(regexmobile)) {

                if (MobileNo == 'undefined' || MobileNo == '') {
                    toastr.error("Enter passanger" + i + " Mobile No");
                    flag = false;
                    break;
                }
                else {
                    toastr.error("Mobile No. Should be exactly of numeric 10 digits");
                    flag = false;
                    break;
                }

            }
            else if (DOB == 'undefined' || DOB == '') {
                toastr.error("Enter passanger" + i + " DOB");
                flag = false;
                break;
            }

            else if (Gender == '0') {
                toastr.error("Select passanger" + i + " Gender");
                flag = false;
                break;
            }
        }       

        return flag;
        
    }


    return flag;
}

function NoOfPassangerform() {
    var NoOfPassenger = $("#ddlnoofpassengers").val();  

        if (NoOfPassenger != null && NoOfPassenger > 0) {
            var Maindiv = "<div class='col-md-12' ><h4 class='font-weight-bolder'>Enter details of passengers.</h4>";
            var FinalFormData = '';
            for (var i = 1; i <= NoOfPassenger; i++) {
                var FormData = "<div class='row'>";
                var PassName = "<div class='col-md-3 mb-3'> ";
                PassName = PassName + "<label for='PassName_" + i + "' class='active'>Name</label><input type='text' id='PassName_" + i + "'class = 'form-control IsValid IsSpecialCharAndNumeric'> </input>";                
                PassName = PassName + "</div>";

                var PassMobileNo = "<div class='col-md-3'> <label for='PassMobileNo_" + i + "' class='active'>Mobile No.</label>";
                PassMobileNo = PassMobileNo + "<input type='text' id='PassMobileNo_" + i + "'  class = 'form-control IsValid IsSpecialChar IsNumeric IsSameMobile'> </input>";                
                PassMobileNo = PassMobileNo + "</div>";

                var PassDOB = "<div class='col-md-3'><label for='PassDOB_" + i + "' class='active'>DOB</label> ";
                PassDOB = PassDOB + "<input type='Date' id='PassDOB_" + i + "' class='form-control' ></input>";                                
                PassDOB = PassDOB + "</div>";

                var PassGender = "<div class='col-md-3'> <label for='PassGender_" + i + "' class='active'>Gender</label>";
                PassGender = PassGender + "<select id='PassGender_" + i + "' class='form-control'><option value='0'>-- Select any one --</option><option value='1'>Male</option><option value='2'>Female</option><option value='3'>Other</option></select></div>";
                
                FinalFormData = FinalFormData + FormData + PassName + PassMobileNo + PassDOB + PassGender + "</div>";
            }
            Maindiv = Maindiv + FinalFormData + "</div>";
        }
    return Maindiv;
}

function BindPassDetails() {
    
    $(function () {
        $('.datepicker').datepicker({
            format: 'mm-dd-yyyy',
            endDate: '-10y',            
            autoclose: true
        });
    });
    $("#otherpassengerdetails").empty();
    var bindform = NoOfPassangerform();
    $("#otherpassengerdetails").append(bindform);

}

$('#traveldate').change(function () {   

    var traveldatevalue = $('#traveldate').val();    

    if (traveldatevalue == "" || traveldatevalue == " ") {
        $('#btnBookingnow').show();
        $("#otherpassengerdetails").empty();
        TravelTimeUnBinding();
        NoofPassengerUnBinding();
    }
    else {
        $('#btnBookingnow').show();
        CurrentTravelTimeBinding();
    }   
})

function NoofPassengerUnBinding() {
    $("#ddlnoofpassengers").empty();
    $("#ddlnoofpassengers").append('<option value="0">-- Select any one --</option>');
}

function TravelTimeUnBinding() {
    $("#ddltraveltime").empty();
    $("#ddltraveltime").append('<option value="0">-- Select any one --</option>');    
}

function CurrentTravelTimeBinding() {


    $("#ddltraveltime").empty();
    $("#ddltraveltime").append('<option value="0">-- Select any one --</option>'); 
    $("#ddltraveltime").append('<option value="1">06:00 AM</option>'); 
    $("#ddltraveltime").append('<option value="2">07:00 AM</option>'); 
    $("#ddltraveltime").append('<option value="3">08:00 AM</option>'); 
    $("#ddltraveltime").append('<option value="4">09:00 AM</option>'); 
    $("#ddltraveltime").append('<option value="5">10:00 AM</option>'); 
    $("#ddltraveltime").append('<option value="6">11:00 AM</option>'); 
    $("#ddltraveltime").append('<option value="7">12:00 PM</option>'); 
    $("#ddltraveltime").append('<option value="8">01:00 PM</option>'); 
    $("#ddltraveltime").append('<option value="9">02:00 PM</option>');
    $("#ddltraveltime").append('<option value="10">03:00 PM</option>'); 
    $("#ddltraveltime").append('<option value="11">04:00 PM</option>'); 
    $("#ddltraveltime").append('<option value="12">05:00 PM</option>');   



    //var currenttime = new Date();

    //var currenthours = currenttime.getHours().toString();    

    //var intcurrenthours = parseInt(currenthours);   
    //var count = 0;
    //var status = "0";
   
    //var intcurrenthourspast = 0;

    //if (intcurrenthours >= 12) {      
    //    count = 19 - (intcurrenthours + 1);
    //    status = "2";
    //    intcurrenthourspast = intcurrenthours - 12;
    //}
    //else {
    //    count = 19 - (intcurrenthours + 1);
    //    //if (count >= 13) {
    //    //    count = 13;
    //    //}
    //    //else {
    //    //    count = 19 - (intcurrenthours + 1);
    //    //}
      

    //    intcurrenthourspast = intcurrenthours;                
    //    status = "1";
    //}
    

    

    //if (count > 0) {
    //    if (count <= 13) {
    //        for (var i = 1; i <= count; i++) {

    //            intcurrenthourspast = intcurrenthourspast + 1;

    //            if (status == 2) {
    //                if (intcurrenthours >= 12) {
    //                    if (intcurrenthours == 12) {
    //                        $("#ddltraveltime").append($('<option></option>').val(i).text((intcurrenthourspast - 0) + ':00 PM'));
    //                    }
    //                    else {

    //                        $("#ddltraveltime").append($('<option></option>').val(i).text('0' + (intcurrenthourspast - 0) + ':00 PM'));
    //                    }
    //                }
    //                else {
    //                    $("#ddltraveltime").append($('<option></option>').val(i).text('0' + (intcurrenthourspast - 12) + ':00 AM'));
    //                }
    //            }

    //            else {
    //                if (intcurrenthourspast >= 12) {
    //                    if (intcurrenthourspast == 12) {
    //                        $("#ddltraveltime").append($('<option></option>').val(i).text((intcurrenthourspast - 0) + ':00 PM'));
    //                    }
    //                    else {

    //                        $("#ddltraveltime").append($('<option></option>').val(i).text('0' + (intcurrenthourspast - 12) + ':00 PM'));
    //                    }
    //                }
    //                else {
    //                    if (intcurrenthourspast == 10 || intcurrenthourspast == 11) {
    //                        $("#ddltraveltime").append($('<option></option>').val(i).text((intcurrenthourspast - 0) + ':00 AM'));
    //                    }
    //                    else {
    //                        $("#ddltraveltime").append($('<option></option>').val(i).text('0' + (intcurrenthourspast - 0) + ':00 AM'));

    //                    }

    //                }
    //            }
    //        }
    //    }

    //    else {
    //        toastr.error("No booking at this time as booking starts from 06:00 am onwards !")
    //        $('#btnBookingnow').hide();
    //        $("#otherpassengerdetails").empty();
    //        return false;
    //    }
      
    //}

    //else {
    //    toastr.error("No booking at this time as current time exceeds the today's boat booking time !")
    //    $('#btnBookingnow').hide();
    //    $("#otherpassengerdetails").empty();
    //    return false;
    //} 
    
    
    
}

$('#ddltraveltime').change(function () {
    var val = $(this).val();
    var IsWholeBoat = $("#chkwholeboatstatus").prop('checked');
    if (val == 0) {
        toastr.error("Select travel time");
        $(this).focus();
    }
    else {
        if (!IsWholeBoat) {
            if (confirm("Do you want to book whole boat?")) {                
                IsSameBoat(true);
            }
            else {                
                IsSameBoat(false);
                var tAMT = CalculateTotalCost(0);
                $("#txtNetCost").val(tAMT);
            } 

        }
        else {            
            IsSameBoat(true);
        }             

    }
});


$("#chkwholeboatstatus").click
    (function (){
       
        if (!this.checked) {
            IsSameBoat(false);
            var tAMT = CalculateTotalCost(0);
            $("#txtNetCost").val(tAMT);
            $('#ddlnoofpassengers option[value="0"]').prop("selected", "selected");
          
        } else {
            IsSameBoat(true);
        }
    });


function IsSameBoat(IsWholeBoat) {

    if (IsWholeBoat) {
        $("#chkwholeboatstatus").prop('checked', true);
    }

    else {
        $("#chkwholeboatstatus").prop('checked', false);
      
    }

    
    $('#btnBookingnow').show();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: '/BoatBooking/IsSameBoat',
        data: JSON.stringify(ConvertToJsonForSameBoat()),
        success: function (data) {            
            $("#txtCostPerPerson").val(data.Cost);            
            $("#ddlnoofpassengers").empty();
           //$("#ddlnoofpassengers").append('<option value="1">--Select No of Passengers--</option>');
            $("#txtNetCost").val(CalculateTotalCost(0));  
            var boatlength = data.listBoatCapacity.length;
            console.log(data.listBoatCapacity,);
            if (boatlength > 0) {                
                $.each(data.listBoatCapacity, function (id, result) {
                   
                        $("#ddlnoofpassengers").append($('<option></option>').val(id).text(id));
                   
                    
                });
                if (IsWholeBoat) {
                    $('#ddlnoofpassengers option[value="0"]').prop("selected", "selected");
                    $("#txtNetCost").val(CalculateTotalCost(12));          
                }               
                
            }
            else {
                toastr.error('This boat is already full for this Ghat. Please select other Ghat or select different travel date or different time slot ! ');
                $('#ddlsourceghat option[value=""]').prop("selected", "selected");
                $('#ddldestinationghat option[value=""]').prop("selected", "selected");
                $('#ddlBoat option[value="0"]').prop("selected", "selected");
                $("#traveldate").val('');
                $("#otherpassengerdetails").empty();
                $("#txtCostPerPerson").val('');
                $("#chkwholeboatstatus").prop('checked', false),
                    TravelTimeUnBinding();
                NoofPassengerUnBinding();
                /*$('#ddlBoat option').filter('[value="0"]').prop('selected', 'selected');*/
                $("#txtNetCost").val('');
                /*$('#btnBookingnow').hide();*/
                $("#otherpassengerdetails").empty();
                return false;
            }

        },
        Error: function () {
            toastr.error(Error);
        }
    });
}


function CalculateTotalCost(val) {
    var Cost = $("#txtCostPerPerson").val();
    var IsWholeBoat= $("#chkwholeboatstatus").prop('checked');

    var Total = 0.0;
    if (!IsWholeBoat) {
        Total = Cost * (parseInt(val) + 1);
    }
    else { 
        Total = Cost * 12;
    }
    return Total;
}

$('#ddlnoofpassengers').change(function () {    

    var val = $(this).val();          

    var TotalCost = CalculateTotalCost(val);
    
    if (val != '') {
        $("#txtNetCost").val(TotalCost);
        BindPassDetails();
        IsMaxLength();        
    }
    
    else {
        $("#txtNetCost").val('');
        $('#btnBookingnow').show();
        $("#otherpassengerdetails").empty();
        toastr.error("Select No. Of Passengers");
        $(this).focus();
    }

    
});

$('#ddlgender').change(function () {
    var val = $(this).val();
    if (val == 0) {               
        toastr.error("Select your gender");
        $(this).focus();
    }   

});

$('#ddlsourceghat').change(function () {  
    $('#ddlBoat option[value="0"]').prop("selected", "selected");
    $("#traveldate").val('');
    $("#otherpassengerdetails").empty();
    $("#txtCostPerPerson").val('');
    $("#chkwholeboatstatus").prop('checked',false),
    TravelTimeUnBinding();
    NoofPassengerUnBinding();    
    $("#txtNetCost").val(''); 
    var val = $(this).val();  
    if (val == 0) {
        toastr.error("Select your Ghat");
        $(this).focus();
    }

});

$('#ddlBoat').change(function () {
    var val = $(this).val();
    if (val == 0) {
        toastr.error("Select your Boat");
        $(this).focus();
    }

});




