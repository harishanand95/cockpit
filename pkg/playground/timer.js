require([
    'jquery',
    "base1/cockpit",
    "base1/mustache",
    "playground/moment",
    "playground/patterns",
    "system/bootstrap-datepicker", //taken from systemd bootstrap-datepicker
    "shell/po"
], function($, cockpit, mustache, moment, po) {
    cockpit.locale(po);
    cockpit.translate();
    var _ = cockpit.gettext;
    // The following are variables that keeps the count of each repeat times.
    var repeat_hourly_count = 0;
    var repeat_daily_count = 0;
    var repeat_weekly_count = 0;
    var repeat_monthly_count = 0;
    var repeat_yearly_count = 0;
    // A template of each event that is repeated
    var repeat_hourly = $("#specific_time_for_repeat_hourly0");
    var repeat_daily = $("#specific_time_for_repeat_daily0");
    var repeat_weekly = $("#specific_time_for_repeat_weekly0");
    var repeat_monthly = $("#specific_time_for_repeat_monthly0");
    var repeat_yearly = $("#specific_time_for_repeat_yearly0");

    $("#create-timer").on("click", function() {
        $("#modal").modal("show");
    });

    $("#save-button").on("click", function() {
        var close_modal = create_timer();
        if (close_modal)
            $("#modal").modal("toggle");
    });

    $("#repeat_yearly_day").datepicker({
        autoclose: true,
        todayHighlight: true,
        format: 'dd-MM-yyyy'
    });

    $("#add_button").on("click", function() {
        if ( timer_unit.repeat == "Repeat Hourly" ) {
            repeat_hourly_count++;
            $self = repeat_hourly.clone();
            var id_name = "specific_time_for_repeat_hourly"+repeat_hourly_count;
            var id_name_hr = "repeat_hourly_hr"+repeat_hourly_count;
            var id_name_min = "repeat_hourly_min"+repeat_hourly_count;
            $self.prop('id',id_name);
            $("#repeat_hourly_hr",$self).prop('id',id_name_hr);
            $("#repeat_hourly_min",$self).prop('id',id_name_min);
            $("#repeat").after($self);
            $(".btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',false);
        } else if ( timer_unit.repeat == "Repeat Daily" ) {
            repeat_daily_count++;
            $self = repeat_daily.clone();
            var id_name = "specific_time_for_repeat_daily"+repeat_daily_count;
            var id_name_hr = "repeat_daily_hr"+repeat_daily_count;
            var id_name_min = "repeat_daily_min"+repeat_daily_count;
            $self.prop('id',id_name);
            $("#repeat_daily_hr",$self).prop('id',id_name_hr);
            $("#repeat_daily_min",$self).prop('id',id_name_min);
            $("#repeat").after($self);
            $(".btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',false);
        } else if ( timer_unit.repeat == "Repeat Weekly" ) {
            repeat_weekly_count++;
            $self = repeat_weekly.clone();
            var id_name = "specific_time_for_repeat_weekly"+repeat_weekly_count;
            var id_name_hr = "repeat_weekly_hr"+repeat_weekly_count;
            var id_name_min = "repeat_weekly_min"+repeat_weekly_count;
            var id_name_day = "repeat_weekly_day"+repeat_weekly_count;
            $self.prop('id',id_name);
            $("#repeat_weekly_day",$self).prop('id',id_name_day);
            $("#repeat_weekly_hr",$self).prop('id',id_name_hr);
            $("#repeat_weekly_min",$self).prop('id',id_name_min);
            $("#repeat").after($self);
            $(".btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',false);
        } else if ( timer_unit.repeat == "Repeat Monthly" ) {
            repeat_monthly_count++;
            $self = repeat_monthly.clone();
            var id_name = "specific_time_for_repeat_monthly"+repeat_monthly_count;
            var id_name_hr = "repeat_monthly_hr"+repeat_monthly_count;
            var id_name_min = "repeat_monthly_min"+repeat_monthly_count;
            var id_name_day = "repeat_monthly_day"+repeat_monthly_count;
            $self.prop('id',id_name);
            $("#repeat_monthly_hr",$self).prop('id',id_name_hr);
            $("#repeat_monthly_min",$self).prop('id',id_name_min);
            $("#repeat").after($self);
            $(".btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',false);
        } else if ( timer_unit.repeat == "Repeat Yearly" ) {
            repeat_yearly_count++;
            $self = repeat_yearly.clone();
            var id_name = "specific_time_for_repeat_yearly"+repeat_yearly_count;
            var id_name_hr = "repeat_yearly_hr"+repeat_yearly_count;
            var id_name_min = "repeat_yearly_min"+repeat_yearly_count;
            var id_name_day = "repeat_yearly_day"+repeat_yearly_count;
            $self.prop('id',id_name);
            $("#repeat_yearly_hr",$self).prop('id',id_name_hr);
            $("#repeat_yearly_min",$self).prop('id',id_name_min);
            $("#repeat_yearly_day",$self).prop('id',id_name_day);
            $("#repeat").after($self);
            $("#"+id_name_day).datepicker({
              autoclose: true,
              todayHighlight: true,
              format : "dd-MM-yyyy"
            });
            $(".btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',false);
        }
    });

    $(".form-horizontal").on( "click",".btn.btn-default.dropdown-toggle.pficon-close",function() {
        if( timer_unit.repeat == "Repeat Hourly" ) {
            if (repeat_hourly_count <= 1 )
                $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
            repeat_hourly_count--;
            $(this).parents().eq(2).remove();
        } else if( timer_unit.repeat == "Repeat Daily" ) {
            if (repeat_daily_count <=1)
                $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
            repeat_daily_count--;
            $(this).parents().eq(2).remove();
        } else if( timer_unit.repeat == "Repeat Weekly" ) {
            if (repeat_weekly_count <=1)
                $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
            repeat_weekly_count--;
            $(this).parents().eq(2).remove();
        } else if( timer_unit.repeat == "Repeat Monthly" ) {
            if (repeat_monthly_count <=1)
                $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
            repeat_monthly_count--;
            $(this).parents().eq(2).remove();
        } else if( timer_unit.repeat == "Repeat Yearly" ) {
            if (repeat_yearly_count <=1)
                $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
            repeat_yearly_count--;
            $(this).parents().eq(2).remove();
        }
    });

    $(".form-horizontal ").on("click", "[value]",".btn-group.bootstrap-select.dropdown.form-control", function(ev) {
        var target = $(this).closest(".btn-group.bootstrap-select.dropdown.form-control");
        $("span", target).first().text(ev.target.text);
        $("span", target).first().attr("value",ev.currentTarget.value);
        switch(target.attr('id')) {
            case "boot_specific" : set_calendar_or_boot(Number(ev.currentTarget.value));
            break;
            case "drop_time" : set_boottime_unit(Number(ev.currentTarget.value));
            break;
            case "drop_repeat" : repeat_options(Number(ev.currentTarget.value));
            break;
        }
    });

    function repeat_options(val) {
        while(repeat_hourly_count || repeat_daily_count || repeat_weekly_count || repeat_monthly_count || repeat_yearly_count) {
            $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").trigger('click');
        }
        switch(val) {
            case 0 : $("#specific_time_without_repeat").show();
                $("[id^=specific_time_for_repeat_hourly]").hide();
                $("[id^=specific_time_for_repeat_daily]").hide();
                $("[id^=specific_time_for_repeat_weekly]").hide();
                $("[id^=specific_time_for_repeat_monthly]").hide();
                $("[id^=specific_time_for_repeat_yearly]").hide();
                $("#add_button").hide();
                $("#close_button").hide();
                timer_unit.repeat = "Don't Repeat";
                break;

            case 1 : $("#specific_time_without_repeat").hide();
                $("[id^=specific_time_for_repeat_hourly]").show();
                $("[id^=specific_time_for_repeat_daily]").hide();
                $("[id^=specific_time_for_repeat_weekly]").hide();
                $("[id^=specific_time_for_repeat_monthly]").hide();
                $("[id^=specific_time_for_repeat_yearly]").hide();
                $("#add_button").show();
                $("#close_button").show();

                if ( repeat_hourly_count >= 1)
                    $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',false);
                else
                    $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
                timer_unit.repeat = "Repeat Hourly";
                break;

            case 2 : $("#specific_time_without_repeat").hide();
                $("[id^=specific_time_for_repeat_hourly]").hide();
                $("[id^=specific_time_for_repeat_daily]").show();
                $("[id^=specific_time_for_repeat_weekly]").hide();
                $("[id^=specific_time_for_repeat_monthly]").hide();
                $("[id^=specific_time_for_repeat_yearly]").hide();
                $("#add_button").show();
                $("#close_button").show();

                if ( repeat_daily_count >= 1 )
                    $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',false);
                else
                    $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
                timer_unit.repeat = "Repeat Daily";
                break;

            case 3 : $("#specific_time_without_repeat").hide();
                $("[id^=specific_time_for_repeat_hourly]").hide();
                $("[id^=specific_time_for_repeat_daily]").hide();
                $("[id^=specific_time_for_repeat_weekly]").show();
                $("[id^=specific_time_for_repeat_monthly]").hide();
                $("[id^=specific_time_for_repeat_yearly]").hide();
                $("#add_button").show();
                $("#close_button").show();
                if ( repeat_weekly_count >= 1)
                    $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',false);
                else
                    $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
                timer_unit.repeat = "Repeat Weekly";
                break;

            case 4 : $("#specific_time_without_repeat").hide();
                $("[id^=specific_time_for_repeat_hourly]").hide();
                $("[id^=specific_time_for_repeat_daily]").hide();
                $("[id^=specific_time_for_repeat_weekly]").hide();
                $("[id^=specific_time_for_repeat_monthly]").show();
                $("[id^=specific_time_for_repeat_yearly]").hide();
                $("#add_button").show();
                $("#close_button").show();
                if ( repeat_monthly_count >= 1)
                    $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',false);
                else
                    $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
                timer_unit.repeat = "Repeat Monthly";
                break;

            case 5 : $("#specific_time_without_repeat").hide();
                $("[id^=specific_time_for_repeat_hourly]").hide();
                $("[id^=specific_time_for_repeat_daily]").hide();
                $("[id^=specific_time_for_repeat_weekly]").hide();
                $("[id^=specific_time_for_repeat_monthly]").hide();
                $("[id^=specific_time_for_repeat_yearly]").show();
                $("#add_button").show();
                $("#close_button").show();
                if ( repeat_monthly_count >= 1)
                    $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',false);
                else
                    $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
                timer_unit.repeat = "Repeat Yearly";
                break;
        };
    }

    var set_calendar_or_boot = function(value) {
        if (value == 1) {
            $("#boot").show();
            $("#repeat").hide();
            $("#specific_time_without_repeat").hide();
            $("[id^=specific_time_for_repeat_hourly]").hide();
            $("[id^=specific_time_for_repeat_daily]").hide();
            $("[id^=specific_time_for_repeat_weekly]").hide();
            $("[id^=specific_time_for_repeat_monthly]").hide()
            $("[id^=specific_time_for_repeat_yearly]").hide();
            timer_unit.Calendar_or_Boot = "Boot";
        } else if (value == 2) {
            $("#boot").hide();
            $("#repeat").show();
            if (timer_unit.repeat == "Don't Repeat")
                repeat_options(0);
            else if (timer_unit.repeat == "Repeat Hourly")
                repeat_options(1);
            else if (timer_unit.repeat == "Repeat Daily")
                repeat_options(2);
            else if (timer_unit.repeat == "Repeat Weekly")
                repeat_options(3);
            else if (timer_unit.repeat == "Repeat Monthly")
                repeat_options(4);
            else if (timer_unit.repeat == "Repeat Yearly")
                repeat_options(5);
            timer_unit.Calendar_or_Boot = "Calendar";
        }
    }

    var set_boottime_unit = function(value) {
        value = Number(value);
        switch (value) {
            case 1 : timer_unit.time_unit = "sec";
                break;
            case 2 : timer_unit.time_unit = "min";
                break;
            case 3 : timer_unit.time_unit = "hr";
                break;
            case 4 : timer_unit.time_unit = "week";
                break;
        }
    }
    // A object to store all user input timer values. Below values are set by default.
    var timer_unit = {
      Calendar_or_Boot : "Boot",
      time_unit :"sec",
      repeat : "Don't Repeat"
    };

    function check_inputs() {
        var ex1, ex2, ex3, ex4, ex6, ex7 = null;
        var ex5 = {};
        var errors = [];
        var str = $("#filename").val().replace(/\s/g, '')
        if ( str.length < 1 ) {
            timer_unit.name = null;
            ex1 = new Error("This field cannot be empty.");
            ex1.target = "#filename";
            errors.push(ex1);
        } else if ( !str ) {
            timer_unit.name = null;
            ex1 = new Error("This field is invalid.");
            ex1.target = "#filename";
            errors.push(ex1);
        }
        str = null;

        str = $("#description").val();
        if ( str.length < 1 ) {
            timer_unit.Description = null;
            ex2 = new Error("This field cannot be empty.");
            ex2.target = "#description";
            errors.push(ex2);
        } else if ( !str.trim() ) {
            timer_unit.Description = null;
            ex2 = new Error("This field is invalid.");
            ex2.target = "#description";
            errors.push(ex2);
        }
        str = null;

        str = $("#command").val();
        if ( str.length < 1 ) {
            timer_unit.Command = null;
            ex3 = new Error("This field cannot be empty.");
            ex3.target = "#command";
            errors.push(ex3);
        } else if ( !str.trim() ) {
            timer_unit.Command = null;
            ex3 = new Error("This field is invalid.");
            ex3.target = "#command";
            errors.push(ex3);
        }
        str = null;

        if ( timer_unit.Calendar_or_Boot == "Boot" ) {
            str = $("#boot_time").val();
            if (isNaN(str)) {
                timer_unit.boot_time = null;
                ex4 = new Error("This field needs an integer value");
                ex4.target = "#boot_time";
                errors.push(ex4);
            }
        } else {
            //Calendar timer cases
            if (timer_unit.repeat == "Don't Repeat") {
                var hr = $("#hr").val();
                var min = $("#min").val();
                if (hr >= 24 || hr < 0 || isNaN(hr)) {
                    ex6 = new Error("within 0-23");
                    ex6.target = "#hr";
                    errors.push(ex6);
                }
                if (min >= 60 || min < 0 || isNaN(min)) {
                    ex7 = new Error("within 0-59");
                    ex7.target = "#min";
                    errors.push(ex7);
                }
            }
            if (timer_unit.repeat == "Repeat Hourly") {
                $('input[id^="repeat_hourly_min"]').each( function(count) {
                    if ($(this).val() >= 60 || $(this).val() < 0 || isNaN(parseInt($(this).val()))) {
                        ex5[count] = new Error("within 0-59");
                        ex5[count].target = "#" + $(this).prop('id');
                        errors.push(ex5[count]);
                    }
                });
            } else if(timer_unit.repeat == "Repeat Daily") {
                $('input[id^="repeat_daily_min"]').each( function(count) {
                    if ($(this).val() >= 60 || $(this).val() < 0 || isNaN(parseInt($(this).val()))) {
                        ex5[count] = new Error("within 0-59");
                        ex5[count].target = "#" + $(this).prop('id');
                        errors.push(ex5[count]);
                    }
                });
                $('input[id^="repeat_daily_hr"]').each( function(count) {
                    if ($(this).val() >= 24 || $(this).val() < 0 || isNaN(parseInt($(this).val()))) {
                        ex5[count] = new Error("within 0-23");
                        ex5[count].target = "#" + $(this).prop('id');
                        errors.push(ex5[count]);
                    }
                });
            } else if(timer_unit.repeat == "Repeat Weekly") {
                $('input[id^="repeat_weekly_min"]').each( function(count) {
                    if ($(this).val() >= 60 || $(this).val() < 0 || isNaN(parseInt($(this).val()))) {
                        ex5[count] = new Error("within 0-59");
                        ex5[count].target = "#" + $(this).prop('id');
                        errors.push(ex5[count]);
                    }
                });
                $('input[id^="repeat_weekly_hr"]').each( function(count) {
                    if ($(this).val() >= 24 || $(this).val() < 0 || isNaN(parseInt($(this).val()))) {
                        ex5[count] = new Error("within 0-23");
                        ex5[count].target = "#" + $(this).prop('id');
                        errors.push(ex5[count]);
                    }
                });
            } else if(timer_unit.repeat == "Repeat Monthly") {
                $('input[id^="repeat_monthly_min"]').each( function(count) {
                    if ($(this).val() >= 60 || $(this).val() < 0 || isNaN(parseInt($(this).val()))) {
                        ex5[count] = new Error("within 0-59");
                        ex5[count].target = "#" + $(this).prop('id');
                        errors.push(ex5[count]);
                    }
                });
                $('input[id^="repeat_monthly_hr"]').each( function(count) {
                    if ($(this).val() >= 24 || $(this).val() < 0 || isNaN(parseInt($(this).val()))) {
                        ex5[count] = new Error("within 0-23");
                        ex5[count].target = "#" + $(this).prop('id');
                        errors.push(ex5[count]);
                    }
                });
            } else if(timer_unit.repeat == "Repeat Yearly") {
                $('input[id^="repeat_yearly_min"]').each( function(count) {
                    if ($(this).val() >= 60 || $(this).val() < 0 || isNaN(parseInt($(this).val()))) {
                        ex5[count] = new Error("within 0-59");
                        ex5[count].target = "#" + $(this).prop('id');
                        errors.push(ex5[count]);
                    }
                });
                $('input[id^="repeat_yearly_hr"]').each( function(count) {
                    if ($(this).val() >= 24 || $(this).val() < 0 || isNaN(parseInt($(this).val()))) {
                        ex5[count] = new Error("within 0-23");
                        ex5[count].target = "#" + $(this).prop('id');
                        errors.push(ex5[count]);
                    }
                });
            }
        }
        if ( errors.length == 0 )
            return true;
        $("div#modal").dialog("failure", errors);
        return false;
    }

    function create_timer() {

        var valid_inputs = check_inputs();
        if (!valid_inputs)
            return false;

        var str = $("#filename").val().replace(/\s/g, '')
        timer_unit.name = str;

        str = $("#description").val();
        timer_unit.Description = str;
        str = $("#command").val();
        timer_unit.Command = str;
        str = $("#boot_time").val();
        timer_unit.boot_time = str;

        var array = [];
        if (timer_unit.repeat == "Don't Repeat") {
            timer_unit.repeat_hour = parseInt($("#hr").val());
            timer_unit.repeat_minute = parseInt($("#min").val());
            timer_unit.OnCalendar = "*-*-* "+timer_unit.repeat_hour+":"+timer_unit.repeat_minute+":00";
        } else if (timer_unit.repeat == "Repeat Hourly") {
            $('input[id^="repeat_hourly_min"]').each( function() {
                //parseInt used to avoid cases like "23 " or " 23"
                array.push(parseInt($(this).val()));
            });
            timer_unit.repeat_minute = array.toString();
            timer_unit.repeat_hour = "*";
            timer_unit.repeat_days = "";
            timer_unit.OnCalendar = timer_unit.repeat_days + "*-*-* "+timer_unit.repeat_hour+":"+timer_unit.repeat_minute+":00";

        } else if(timer_unit.repeat == "Repeat Daily") {
            $('input[id^="repeat_daily_min"]').each( function() {
                if (array.indexOf(parseInt($(this).val())) < 0)
                    array.push(parseInt($(this).val()));
            });
            timer_unit.repeat_minute = array.toString();
            array = [];
            $('input[id^="repeat_daily_hr"]').each( function() {
                if (array.indexOf(parseInt($(this).val())) < 0)
                  array.push(parseInt($(this).val()));
            });
            timer_unit.repeat_hour = array.toString();
            timer_unit.repeat_days = "";
            timer_unit.OnCalendar = timer_unit.repeat_days + "*-*-* "+timer_unit.repeat_hour+":"+timer_unit.repeat_minute+":00";

        } else if(timer_unit.repeat == "Repeat Weekly") {
            $('input[id^="repeat_weekly_min"]').each( function() {
                if (array.indexOf(parseInt($(this).val())) < 0)
                    array.push(parseInt($(this).val()));
            });
            timer_unit.repeat_minute = array.toString();
            array = [];
            $('input[id^="repeat_weekly_hr"]').each( function() {
                if (array.indexOf(parseInt($(this).val())) < 0)
                    array.push(parseInt($(this).val()));
            });
            timer_unit.repeat_hour = array.toString();
            array = [];
            $('div[id^="repeat_weekly_day"]').each( function() {
                array.push($("span", $(this)).first().text().slice(0,3));
            });
            timer_unit.repeat_days = array.toString();
            timer_unit.OnCalendar = timer_unit.repeat_days + " *-*-* "+timer_unit.repeat_hour+":"+timer_unit.repeat_minute+":00";

        } else if(timer_unit.repeat == "Repeat Monthly") {
            $('input[id^="repeat_monthly_min"]').each( function() {
                if (array.indexOf(parseInt($(this).val())) < 0)
                    array.push(parseInt($(this).val()));
            });
            timer_unit.repeat_minute = array.toString();
            array = [];
            $('input[id^="repeat_monthly_hr"]').each( function() {
                if (array.indexOf(parseInt($(this).val())) < 0)
                    array.push(parseInt($(this).val()));
            });
            timer_unit.repeat_hour = array.toString();
            array = [];
            $('div[id^="repeat_monthly_day"]').each( function() {
                if (array.indexOf($("span", $(this)).first().attr("value")) < 0)
                    array.push($("span", $(this)).first().attr("value"));
            });
            timer_unit.repeat_days = array.toString();
            timer_unit.OnCalendar = "*-*-"+timer_unit.repeat_days+" "+timer_unit.repeat_hour+":"+timer_unit.repeat_minute+":00";
        } else if(timer_unit.repeat == "Repeat Yearly") {
            $('input[id^="repeat_yearly_min"]').each( function() {
                if (array.indexOf(parseInt($(this).val())) < 0)
                    array.push(parseInt($(this).val()));
            });
            timer_unit.repeat_minute = array.toString();
            array = [];
            $('input[id^="repeat_yearly_hr"]').each( function() {
                if (array.indexOf(parseInt($(this).val())) < 0)
                    array.push(parseInt($(this).val()));
            });
            timer_unit.repeat_hour = array.toString();
            var array_year = [];
            var array_month = [];
            var array_day = [];
            $('[id^="repeat_yearly_day"]').each( function() {
              // pushes year, month, day to separate arrays and are combined together and written to file.
                var date = new Date($(this).children().first().val());
                if (array_year.indexOf(moment(date).format('YYYY')) < 0)
                    array_year.push(moment(date).format('YYYY'));
                if (array_month.indexOf(moment(date).format('MM')) < 0)
                    array_month.push(moment(date).format('MM'));
                if (array_day.indexOf(moment(date).format('DD')) < 0)
                    array_day.push(moment(date).format('DD'));
            });
            array_day.toString();
            array_month.toString();
            array_year.toString();

            timer_unit.OnCalendar = array_year.toString()+"-"+array_month.toString()+"-"+array_day.toString()+" "+timer_unit.repeat_hour+":"+timer_unit.repeat_minute+":00";
        }
        console.log(timer_unit);
        create_timer_file();
        init_units(); // for displaying updated timer
        return true;
    }

    function create_timer_file() {
        var unit="[Unit]\nDescription=";
        var service="\n[Service]\nType=oneshot\nExecStart=";
        var timer="\n[Timer]\n";
        var service_file = unit+timer_unit.Description+service+timer_unit.Command;
        var timer_file ="";
        if(timer_unit.Calendar_or_Boot == "Boot" ) {
            boottimer = timer +"OnBootSec=" +timer_unit.boot_time + timer_unit.time_unit;
            timer_file=unit+timer_unit.Description+boottimer;
        }
        else if (timer_unit.Calendar_or_Boot == "Calendar") {
            calendartimer = timer + "OnCalendar=" + timer_unit.OnCalendar;
            timer_file=unit+timer_unit.Description+calendartimer;
        }
        // writing to file
        var service_path = "/etc/systemd/system/"+timer_unit.name+".service";
        file = cockpit.file(service_path,{superuser:'try'});
        file.replace(service_file).
        fail(function(error) {
            console.log(error);
        });
        console.log("#Service file#\n"+service_file);
        var timer_path = "/etc/systemd/system/"+timer_unit.name+".timer";
        file = cockpit.file(timer_path,{superuser:'try'});
        file.replace(timer_file).
        fail(function(error) {
            console.log(error);
        });
        console.log("#Timer file#\n"+timer_file);
    }

  //*******************CODE from SYSTEMD PKG for overview page********************************//


  /* OVERVIEW PAGE
     *
     * The overview page shows the current state of all units and unit
     * files.
     *
     * It mostly uses information returned by ListUnits and
     * ListUnitFiles in order to avoid flooding D-Bus with an
     * excessive amount of messages.  It listens for updates with the
     * usual PropertiesChanged signal.  However, as noted above, we
     * need to explicitly refresh the properties of a unit file in
     * case it got unloaded from the daemon.
     *
     * TODO - try what happens when we just use DBusProxies.
     */

    var units_initialized = false;

    function startsWith(string, prefix) {
        return string.indexOf(prefix) === 0;
    }

    function ensure_units() {
        if (!units_initialized) {
            units_initialized = true;
            init_units();
        }
    }

    function init_units() {
        var units_by_path = { };
        var path_by_id = { };

        function get_unit(path) {
            var unit = units_by_path[path];
            if (!unit) {
                unit = { aliases: [ ], path: path };
                units_by_path[path] = unit;
            }
            return unit;
        }

        function update_properties(unit, props) {
            function prop(p) {
                if (props[p])
                    unit[p] = props[p].v;
            }

            prop("Id");
            prop("Description");
            prop("LoadState");
            prop("ActiveState");
            prop("SubState");

            if (props["Id"])
                path_by_id[unit.Id] = unit.path;

            update_computed_properties(unit);
        }

        function update_computed_properties(unit) {
            var load_state = unit.LoadState;
            var active_state = unit.ActiveState;
            var sub_state = unit.SubState;

            if (load_state == "loaded")
                load_state = "";

            unit.HasFailed = (active_state == "failed" || load_state !== "");

            load_state = _(load_state);
            active_state = _(active_state);
            sub_state = _(sub_state);

            if (sub_state !== "" && sub_state != active_state)
                active_state = active_state + " (" + sub_state + ")";

            if (load_state !== "")
                active_state = load_state + " / " + active_state;

            unit.CombinedState = active_state;

            if ( unit.Id.slice(-5) == "timer" ) {
                if ( unit.ActiveState == "active" ) {
                    var timer_unit = systemd_client.proxy('org.freedesktop.systemd1.Timer', unit.path);
                    wait_valid(timer_unit, add_timer_properties, unit);
                }
            }
        }

        function add_timer_properties(timer_unit,unit) {
            unit.LastTriggerTime = moment(timer_unit.LastTriggerUSec/1000).calendar();
            if (timer_unit.LastTriggerUSec === 0)
                unit.LastTriggerTime = _("not known");
            var next_run_time = 0;
            if ( timer_unit.NextElapseUSecRealtime === 0)
                next_run_time = timer_unit.NextElapseUSecMonotonic + systemd_manager.GeneratorsStartTimestamp;
            else if (timer_unit.NextElapseUSecMonotonic === 0)
                next_run_time = timer_unit.NextElapseUSecRealtime;
            else {
                if (timer_unit.NextElapseUSecMonotonic + systemd_manager.GeneratorsStartTimestamp < timer_unit.NextElapseUSecRealtime)
                    next_run_time = timer_unit.NextElapseUSecMonotonic + systemd_manager.GeneratorsStartTimestamp;
                else
                    next_run_time = timer_unit.NextElapseUSecRealtime;
            }
            unit.NextRunTime = moment(next_run_time/1000).calendar();
        }

        function refresh_properties(path, tweak_callback) {
            systemd_client.call(path,
                                "org.freedesktop.DBus.Properties", "GetAll",
                                [ "org.freedesktop.systemd1.Unit" ]).
                fail(function (error) {
                    console.log(error);
                }).
                done(function (result) {
                    var unit = get_unit(path);
                    update_properties(unit, result[0]);
                    if (tweak_callback)
                        tweak_callback(unit);
                    render();
                });
        }

        var units_template = $("#services-units-tmpl").html();
        mustache.parse(units_template);

        function render_now() {
            
            function cmp_path(a, b) { return units_by_path[a].Id.localeCompare(units_by_path[b].Id); }
            var sorted_keys = Object.keys(units_by_path).sort(cmp_path);
            var enabled = [ ], disabled = [ ], statics = [ ];

            var header = {
                Description: _("Description"),
                Id: _("Id"),
                Next_Run_Time: _("Next Run Time"),
                Last_Trigger_Time: _("Last Trigger Time"),
                Current_State: _("Current State")
            };

            sorted_keys.forEach(function (path) {
                var unit = units_by_path[path];
                if (!(unit.Id.slice(-5) == "timer"))
                    return;
                if (unit.UnitFileState && startsWith(unit.UnitFileState, 'enabled'))
                    enabled.push(unit);
                else if (unit.UnitFileState && startsWith(unit.UnitFileState, 'disabled'))
                    disabled.push(unit);
                else
                    statics.push(unit);
            });
            
            function fill_table(parent, heading, units) {
                var text = mustache.render(units_template, {
                    heading: heading,
                    table_head: header,
                    units: units
                });
                parent.html(text);
            }
            
            fill_table($('#services-list-enabled'), _("Enabled Timers"), enabled);
            fill_table($('#services-list-disabled'), _("Disabled Timers"), disabled);
            fill_table($('#services-list-static'), _("Static Timers"), statics);
        }

        var render_holdoff_timer;
        var need_render;

        function render() {
            if (!render_holdoff_timer) {
                render_now();
                render_holdoff_timer = window.setTimeout(render_holdoff_over, 200);
            } else {
                need_render = true;
            }
        }

        function render_holdoff_over() {
            render_holdoff_timer = null;
            if (need_render) {
                need_render = false;
                render_now();
            }
        }

        var update_run = 0;

        function update_all() {
            var my_run = ++update_run;

            var seen_ids = { };

            function fail(error) {
                console.log(error);
            }

            function record_unit_state(state) {
                // 0: Id
                // 1: Description
                // 2: LoadState
                // 3: ActiveState
                // 4: SubState
                // 5: Following
                // 6: object-path
                // 7: Job[0], number
                // 8: job-type
                // 9: Job[1], object-path

                seen_ids[state[0]] = true;

                var unit = get_unit(state[6]);
                unit.Id = state[0];
                unit.Description = state[1];
                unit.LoadState = state[2];
                unit.ActiveState = state[3];
                unit.SubState = state[4];

                path_by_id[unit.Id] = unit.path;

                update_computed_properties(unit);
            }

            function record_unit_file_state(state) {
                // 0: FragmentPath
                // 1: UnitFileState

                var name = state[0].split('/').pop();

                if (name.slice(-5) !== "timer")
                    return;

                seen_ids[name] = true;

                if (name.indexOf("@") != -1) {
                    // A template, create a fake unit for it
                    units_by_path[name] = {
                        Id: name,
                        Description: cockpit.format(_("$0 Template"), name),
                        UnitFileState: state[1],
                    };
                    path_by_id[name] = name;
                    return;
                }

                /* We need to know the object path for detecting
                 * aliases and we also need at least the Description
                 * property, so we load all unloaded units here with a
                 * LoadUnit/GetAll pair of method calls.
                 */

                if (path_by_id[name])
                    with_path(path_by_id[name]);
                else {
                    systemd_manager.LoadUnit(name).
                        fail(function (error) {
                            console.log(error);
                        }).
                        done(with_path);
                }

                function with_path(path) {
                    var unit = units_by_path[path];

                    if (unit)
                        with_unit(unit);
                    else
                        refresh_properties(path, with_unit);

                    function with_unit(unit) {
                        if (unit.Id == name) {
                            // Primary id, add UnitFileState
                            unit.UnitFileState = state[1];
                        } else {
                            // Alias for loaded unit, add alias
                            unit.aliases.push(name);
                        }
                        update_computed_properties(unit);
                    }
                }
            }

            systemd_manager.ListUnits().
                fail(fail).
                done(function (result) {
                    if (my_run != update_run)
                        return;
                    for (var i = 0; i < result.length; i++)
                        if (result[i][0].slice(-5) === "timer") 
                            record_unit_state(result[i]);
                    systemd_manager.ListUnitFiles().
                        fail(fail).
                        done(function (result) {
                            var i, keys;
                            if (my_run != update_run)
                                return;
                            for (i = 0; i < result.length; i++)
                                record_unit_file_state(result[i]);
                            keys = Object.keys(units_by_path);
                            for (i = 0; i < keys; i++) {
                                if (!seen_ids[units_by_path[keys[i]].Id]) {
                                    console.log("R", keys[i]);
                                    delete units_by_path[keys[i]];
                                }
                            }
                            render();
                        });
                });
        }

        $(systemd_manager).on("UnitNew", function (event, id, path) {
            path_by_id[id] = path;
        });

        $(systemd_manager).on("JobNew JobRemoved", function (event, number, path, unit_id, result) {
            var unit_path = path_by_id[unit_id];
            if (unit_path)
                refresh_properties(unit_path);
        });

        systemd_client.subscribe({ 'interface': "org.freedesktop.DBus.Properties",
                                   'member': "PropertiesChanged"
                                 },
                                 function (path, iface, signal, args) {
                                     var unit = units_by_path[path];
                                     if (unit) {
                                         update_properties(unit, args[1]);
                                         render();
                                     }
                                 });

        $(systemd_manager).on("UnitFilesChanged", function (event) {
            update_all();
        });

        $('#services-filter button').on('click', function() {
            $('#services-filter button').removeClass('active');
            $(this).addClass('active');
            render();
        });

        update_all();
    }

  var systemd_client = cockpit.dbus("org.freedesktop.systemd1", { superuser: "try" });
  var systemd_manager = systemd_client.proxy("org.freedesktop.systemd1.Manager","/org/freedesktop/systemd1");
 
  function wait_valid(proxy, callback, args) {
    proxy.wait(function() {
    if (proxy.valid)
      callback(proxy, args);
    });
  }
  wait_valid(systemd_manager,init_units);

});