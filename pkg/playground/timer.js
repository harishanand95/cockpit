require([
    'jquery',
    "base1/cockpit",
    "base1/mustache",
    "playground/moment",
    "playground/patterns"
], function($, cockpit, mustache, moment) {

  var repeat_hourly_count = 0;
  var repeat_daily_count = 0;
  var repeat_weekly_count = 0;
  var repeat_monthly_count = 0;

  var repeat_hourly = $("#specific_time_for_repeat_hourly0");
  var repeat_daily = $("#specific_time_for_repeat_daily0");
  var repeat_weekly = $("#specific_time_for_repeat_weekly0");
  var repeat_monthly = $("#specific_time_for_repeat_monthly0");

  $("#specific_time_without_repeat").hide();
  $("[id^=specific_time_for_repeat_hourly]").hide();
  $("[id^=specific_time_for_repeat_daily]").hide();
  $("[id^=specific_time_for_repeat_weekly]").hide();
  $("[id^=specific_time_for_repeat_monthly]").hide();
  $("#repeat").hide();
  $("#add_button").hide();
  $("#close_button").hide();

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
    }
    else if ( timer_unit.repeat == "Repeat Daily" ) {
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
    }
    else if ( timer_unit.repeat == "Repeat Weekly" ) {
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
    }
    else if ( timer_unit.repeat == "Repeat Monthly" ) {
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
    }
  });

  $(".form-horizontal").on( "click",".btn.btn-default.dropdown-toggle.pficon-close",function() {
    if( timer_unit.repeat == "Repeat Hourly" ) {
      if (repeat_hourly_count <= 1 )
        $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
      repeat_hourly_count--;
      $(this).parents().eq(2).remove();
    }
    else if( timer_unit.repeat == "Repeat Daily" ) {
      if (repeat_daily_count <=1)
        $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
      repeat_daily_count--;
      $(this).parents().eq(2).remove();
    }
    else if( timer_unit.repeat == "Repeat Weekly" ) {
      if (repeat_weekly_count <=1)
        $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
      repeat_weekly_count--;
      $(this).parents().eq(2).remove();
    }
    else if( timer_unit.repeat == "Repeat Monthly" ) {
      if (repeat_monthly_count <=1)
        $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
      repeat_monthly_count--;
      $(this).parents().eq(2).remove();
    }
  });

  $("#target").on("click","#create-timer", function() {
    $("#modal").modal("show");
  });

  $("#save-button").on("click", function() {
    var close_modal = create_timer();
    if (close_modal)
      $("#modal").modal("hide");
  });

  $(".form-horizontal ").on("click", "[value]",".btn-group.bootstrap-select.dropdown.form-control", function(ev) {
      var target = $(this).closest(".btn-group.bootstrap-select.dropdown.form-control");
      $("span", target).first().text(ev.target.text);
      $("span", target).first().attr("value",ev.currentTarget.value);

      switch(target.attr('id')) {
        case "boot_specific" : set_calendar_or_boot(Number(ev.currentTarget.value));
        break;
        case "drop_time" : set_time_unit(Number(ev.currentTarget.value));
        break;
        case "drop_repeat" : toggle_on_repeat(Number(ev.currentTarget.value));
        break;
      }
  });

  function toggle_on_repeat(val) {
    while( repeat_hourly_count && repeat_weekly_count && repeat_daily_count ) {
      $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").trigger('click');
    }
    switch(val) {
      case 0 : $("#specific_time_without_repeat").show();
        $("[id^=specific_time_for_repeat_hourly]").hide();
        $("[id^=specific_time_for_repeat_daily]").hide();
        $("[id^=specific_time_for_repeat_weekly]").hide();
        $("[id^=specific_time_for_repeat_monthly]").hide();
        $("#add_button").hide();
        $("#close_button").hide();
        timer_unit.repeat = "Don't Repeat";
        break;

      case 1 : $("#specific_time_without_repeat").hide();
        $("[id^=specific_time_for_repeat_hourly]").show();
        $("[id^=specific_time_for_repeat_daily]").hide();
        $("[id^=specific_time_for_repeat_weekly]").hide();
        $("[id^=specific_time_for_repeat_monthly]").hide();
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
        $("#add_button").show();
        $("#close_button").show();
        if ( repeat_monthly_count >= 1)
          $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',false);
        else
          $(".form-horizontal .btn.btn-default.dropdown-toggle.pficon-close").prop('disabled',true);
        timer_unit.repeat = "Repeat Monthly";
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
      timer_unit.Calendar_or_Boot = "Boot";
    }
    else if (value == 2) {
      $("#boot").hide();
      $("#repeat").show();
      if (timer_unit.repeat == "Don't Repeat")
        toggle_on_repeat(0);
      else if (timer_unit.repeat == "Repeat Hourly")
        toggle_on_repeat(1);
      else if (timer_unit.repeat == "Repeat Daily")
        toggle_on_repeat(2);
      else if (timer_unit.repeat == "Repeat Weekly")
        toggle_on_repeat(3);
      else if (timer_unit.repeat == "Repeat Monthly")
        toggle_on_repeat(4);
      timer_unit.Calendar_or_Boot = "Calendar";
    }
  }

  var set_time_unit = function(value) {
    value = Number(value);
    switch (value) {
      case 1 : 
        timer_unit.time_unit = "sec";
        break;
      case 2 : 
        timer_unit.time_unit = "min";
        break;
      case 3 :  
        timer_unit.time_unit = "hr";
        break;
      case 4 : 
        timer_unit.time_unit = "week";
       break;
    }
  }

  var timer_unit = {
    Calendar_or_Boot : "Boot",
    time_unit :"sec",
    repeat : "Don't Repeat"
  };

  function check_inputs() {
    
    var ex1, ex2, ex3, ex4, ex6, ex7 = null;
    var ex5 = {};
    var ar = [];
    var str = $("#filename").val().replace(/\s/g, '')
    if ( str.length < 1 ) {
      timer_unit.name = null;
      ex1 = new Error("This field cannot be empty.");
      ex1.target = "#filename";
      ar.push(ex1);
    }
    else if ( !str ) {
      timer_unit.name = null;
      ex1 = new Error("This field is invalid.");
      ex1.target = "#filename";
      ar.push(ex1);
    }
    str = null;

    str = $("#description").val();
    if ( str.length < 1 ) {
      timer_unit.Description = null;
      ex2 = new Error("This field cannot be empty.");
      ex2.target = "#description";
      ar.push(ex2);
    }
    else if ( !str.trim() ) {
      timer_unit.Description = null;
      ex2 = new Error("This field is invalid.");
      ex2.target = "#description";
      ar.push(ex2);
    }
    str = null;
    
    str = $("#command").val();
    if ( str.length < 1 ) {
      timer_unit.Command = null;
      ex3 = new Error("This field cannot be empty.");
      ex3.target = "#command";
      ar.push(ex3);
    }
    else if ( !str.trim() ) {
      timer_unit.Command = null;
      ex3 = new Error("This field is invalid.");
      ex3.target = "#command";
      ar.push(ex3);
    }
    str = null;

    if ( timer_unit.Calendar_or_Boot == "Boot" ) {
      str = $("#boot_time").val();
      if ( isNaN(str) ) { 
        timer_unit.boot_time = null;
        ex4 = new Error("This field needs an integer value");
        ex4.target = "#boot_time";
        ar.push(ex4);
      }
    }
    else {
      //Calendar timer cases
      if (timer_unit.repeat == "Don't Repeat") {
        var hr = $("#hr").val();
        var min = $("#min").val();
        if (hr >= 24 || hr < 0 || isNaN(hr)) {
          ex6 = new Error("within 0-23");
          ex6.target = "#hr";
          ar.push(ex6);
        }
        if (min >= 60 || min < 0 || isNaN(min)) {
          ex7 = new Error("within 0-59");
          ex7.target = "#min";
          ar.push(ex7);
        }
      }
      if (timer_unit.repeat == "Repeat Hourly") {
        $('input[id^="repeat_hourly_min"]').each( function(count) {
          if ($(this).val() >= 60 || $(this).val() < 0 || isNaN($(this).val())) {
            ex5[count] = new Error("within 0-59");
            ex5[count].target = "#" + $(this).prop('id');
            ar.push(ex5[count]);
          }
        });
            
      }
      else if(timer_unit.repeat == "Repeat Daily") {
        $('input[id^="repeat_daily_min"]').each( function(count) {
          if ($(this).val() >= 60 || $(this).val() < 0 || isNaN($(this).val())) {
            ex5[count] = new Error("within 0-59");
            ex5[count].target = "#" + $(this).prop('id');
            ar.push(ex5[count]);
          }
        });
        $('input[id^="repeat_daily_hr"]').each( function(count) {
          if ($(this).val() >= 24 || $(this).val() < 0 || isNaN($(this).val())) {
            ex5[count] = new Error("within 0-23");
            ex5[count].target = "#" + $(this).prop('id');
            ar.push(ex5[count]);
          }
        });
      }
      else if(timer_unit.repeat == "Repeat Weekly") {
        $('input[id^="repeat_weekly_min"]').each( function(count) {
          if ($(this).val() >= 60 || $(this).val() < 0 || isNaN($(this).val())) {
            ex5[count] = new Error("within 0-59");
            ex5[count].target = "#" + $(this).prop('id');
            ar.push(ex5[count]);
          }
        });
        $('input[id^="repeat_weekly_hr"]').each( function(count) {
          if ($(this).val() >= 24 || $(this).val() < 0 || isNaN($(this).val())) {
            ex5[count] = new Error("within 0-23");
            ex5[count].target = "#" + $(this).prop('id');
            ar.push(ex5[count]);
          }
        });
      }
      else if(timer_unit.repeat == "Repeat Monthly") {
        $('input[id^="repeat_monthly_min"]').each( function(count) {
          if ($(this).val() >= 60 || $(this).val() < 0 || isNaN($(this).val())) {
            ex5[count] = new Error("within 0-59");
            ex5[count].target = "#" + $(this).prop('id');
            ar.push(ex5[count]);
          }
        });
        $('input[id^="repeat_monthly_hr"]').each( function(count) {
          if ($(this).val() >= 24 || $(this).val() < 0 || isNaN($(this).val())) {
            ex5[count] = new Error("within 0-23");
            ex5[count].target = "#" + $(this).prop('id');
            ar.push(ex5[count]);
          }
        });
      }
    }
    if ( ar.length == 0 )
      return true;
    $("div#modal").dialog("failure", ar);
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
    if (timer_unit.repeat == "Repeat Hourly") {
      $('input[id^="repeat_hourly_min"]').each( function() {
        array.push(parseInt($(this).val())); //parseInt used to avoid cases like "23 " or " 23"
      });
      timer_unit.repeat_minute = array.toString();
      timer_unit.repeat_hour = "*";
      timer_unit.repeat_days = "";
      timer_unit.OnCalendar = timer_unit.repeat_days + "*-*-* "+timer_unit.repeat_hour+":"+timer_unit.repeat_minute+":00";
    
    }
    else if(timer_unit.repeat == "Repeat Daily") {
      $('input[id^="repeat_daily_min"]').each( function() {
        array.push(parseInt($(this).val()));
      });
      timer_unit.repeat_minute = array.toString();

      array = [];
      $('input[id^="repeat_daily_hr"]').each( function() {
        array.push(parseInt($(this).val()));
      });
      timer_unit.repeat_hour = array.toString();

      timer_unit.repeat_days = "";
      timer_unit.OnCalendar = timer_unit.repeat_days + "*-*-* "+timer_unit.repeat_hour+":"+timer_unit.repeat_minute+":00";
    }
    else if(timer_unit.repeat == "Repeat Weekly") {
      $('input[id^="repeat_weekly_min"]').each( function() {
        array.push(parseInt($(this).val()));
      });
      timer_unit.repeat_minute = array.toString();

      array = [];
      $('input[id^="repeat_weekly_hr"]').each( function() {
        array.push(parseInt($(this).val()));
      });
      timer_unit.repeat_hour = array.toString();

      array = [];
      $('div[id^="repeat_weekly_day"]').each( function() {
        array.push($("span", $(this)).first().text().slice(0,3));
      });
      timer_unit.repeat_days = array.toString();

      timer_unit.OnCalendar = timer_unit.repeat_days + "*-*-* "+timer_unit.repeat_hour+":"+timer_unit.repeat_minute+":00";
    }
    else if(timer_unit.repeat == "Repeat Monthly") {
      console.log("Repeat Monthly");
      $('input[id^="repeat_monthly_min"]').each( function() {
        array.push(parseInt($(this).val()));
      });
      timer_unit.repeat_minute = array.toString();

      array = [];
      $('input[id^="repeat_monthly_hr"]').each( function() {
        array.push(parseInt($(this).val()));
      });
      timer_unit.repeat_hour = array.toString();

      array = [];
      $('div[id^="repeat_monthly_day"]').each( function() {
        array.push($("span", $(this)).first().attr("value"));
      });
      timer_unit.repeat_days = array.toString();

      timer_unit.OnCalendar = "*-*-"+timer_unit.repeat_days+" "+timer_unit.repeat_hour+":"+timer_unit.repeat_minute+":00";
    }
    console.log(timer_unit);
    create_timer_file();
    return true; // do checking before
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

  units_by_path = { };

  //init.js L155
  function get_unit(path) {
      var unit = units_by_path[path];
      if (!unit) {
          unit = { aliases: [ ], path: path };
          units_by_path[path] = unit;
      }
      return unit;
  }
  //init.js L287
  function record_unit_state(state) {
    var unit = get_unit(state[6]);
    unit.Id = state[0];
    unit.Description = state[1];
    unit.LoadState = state[2];
    unit.ActiveState = state[3];
    unit.SubState = state[4];
    unit.path = state[6];
  }
  //service.js L79
  function wait_valid(proxy, callback, args) {
    proxy.wait(function() {
    if (proxy.valid)
      callback(proxy, args);
    });
  }
  //init.js L243
  var units_template = $("#services-units-tmpl").html();
  mustache.parse(units_template);
  function fill_table(parent, heading, units) {
    var text = mustache.render(units_template, {
      heading: heading,
      units: units
    });
    parent.html(text);
  }

  function add_last_next_times(timer, manager) {
    if (timer.NextElapseUSecMonotonic > 0)
      var time_left_for_next_run = manager.GeneratorsStartTimestamp + timer.NextElapseUSecMonotonic;
    else
      var time_left_for_next_run = timer.NextElapseUSecRealtime;
    unit = get_unit(timer.path);
    unit.next_run = moment(time_left_for_next_run/1000).fromNow(); //localisation not done
    unit.last_run = moment(timer.LastTriggerUSec/1000).fromNow();

  }

  operation = function (systemd_manager) {
    var units = [ ];
    
    function render () {
      for(var key in units_by_path) {
        console.log(key);
        add_timings(key);
        units.push(units_by_path[key])
      }
      setTimeout(function() {
        fill_table($('#target'), "Timers", units);
      }, 800);  
    };

    function add_timings(key) {
      var systemd_client = cockpit.dbus("org.freedesktop.systemd1", { superuser: "try" });
      var systemd_timer = systemd_client.proxy("org.freedesktop.systemd1.Timer", key);
      wait_valid(systemd_timer, add_last_next_times, systemd_manager);
    };

    function failure (error){
      console.log(error);
    };

    function s (result) {
      var dfd = $.Deferred();
      if (true) {
        var substring = "timer";
        for (var i = 0; i < result.length; i++) {
          if ( result[i][0].slice(-5) == substring ) {
            record_unit_state(result[i]);
          }
        }
        dfd.resolve();
      }  
      return dfd.promise();
    };

    systemd_manager.ListUnits().
    fail(failure).
    done(
      function(result){  
        $.when(s(result)).then(
            function(){
              setTimeout(render, 300);
            }
      )});
  }

  var systemd_client = cockpit.dbus("org.freedesktop.systemd1", { superuser: "try" });
  var systemd_manager = systemd_client.proxy("org.freedesktop.systemd1.Manager","/org/freedesktop/systemd1");
  wait_valid(systemd_manager,operation);

});