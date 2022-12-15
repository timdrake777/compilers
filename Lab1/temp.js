M.mod_quiz = M.mod_quiz || {};
M.mod_quiz.init_attempt_form = function (Y) {
  M.core_question_engine.init_form(Y, "#responseform");
  Y.on("submit", M.mod_quiz.timer.stop, "#responseform");
  M.core_formchangechecker.init({ formid: "responseform" });
};
M.mod_quiz.init_review_form = function (Y) {
  M.core_question_engine.init_form(Y, ".questionflagsaveform");
  Y.on(
    "submit",
    function (e) {
      e.halt();
    },
    ".questionflagsaveform"
  );
};
M.mod_quiz.init_comment_popup = function (Y) {
  var closebutton = Y.Node.create('<input type="button" />');
  closebutton.set("value", M.util.get_string("cancel", "moodle"));
  Y.one("#id_submitbutton").ancestor().append(closebutton);
  Y.on(
    "click",
    function () {
      window.close();
    },
    closebutton
  );
};
M.mod_quiz.timer = {
  Y: null,
  endtime: 0,
  preview: 0,
  timeoutid: null,
  init: function (Y, start, preview) {
    M.mod_quiz.timer.Y = Y;
    M.mod_quiz.timer.endtime = new Date().getTime() + start * 1e3;
    M.mod_quiz.timer.preview = preview;
    M.mod_quiz.timer.update();
    Y.one("#quiz-timer").setStyle("display", "block");
  },
  stop: function (e) {
    if (M.mod_quiz.timer.timeoutid) clearTimeout(M.mod_quiz.timer.timeoutid);
  },
  two_digit: function (num) {
    if (num < 10) {
      return "0" + num;
    } else return num;
  },
  update: function () {
    var Y = M.mod_quiz.timer.Y,
      secondsleft = Math.floor(
        (M.mod_quiz.timer.endtime - new Date().getTime()) / 1e3
      );
    if (M.mod_quiz.timer.preview && secondsleft < 0) {
      Y.one("#quiz-time-left").setContent("0:00:00");
      return;
    }
    if (secondsleft < 0) {
      M.mod_quiz.timer.stop(null);
      Y.one("#quiz-time-left").setContent(M.str.quiz.timesup);
      var input = Y.one("input[name=timeup]");
      input.set("value", 1);
      var form = input.ancestor("form");
      if (form.one("input[name=finishattempt]"))
        form.one("input[name=finishattempt]").set("value", 0);
      M.core_formchangechecker.set_form_submitted();
      form.submit();
      return;
    }
    if (secondsleft < 100)
      Y.one("#quiz-timer")
        .removeClass("timeleft" + (secondsleft + 2))
        .removeClass("timeleft" + (secondsleft + 1))
        .addClass("timeleft" + secondsleft);
    var hours = Math.floor(secondsleft / 3600);
    secondsleft -= hours * 3600;
    var minutes = Math.floor(secondsleft / 60);
    secondsleft -= minutes * 60;
    var seconds = secondsleft;
    Y.one("#quiz-time-left").setContent(
      hours +
        ":" +
        M.mod_quiz.timer.two_digit(minutes) +
        ":" +
        M.mod_quiz.timer.two_digit(seconds)
    );
    M.mod_quiz.timer.timeoutid = setTimeout(M.mod_quiz.timer.update, 100);
  },
};
M.mod_quiz.nav = M.mod_quiz.nav || {};
M.mod_quiz.nav.update_flag_state = function (attemptid, questionid, newstate) {
  var Y = M.mod_quiz.nav.Y,
    navlink = Y.one("#quiznavbutton" + questionid);
  navlink.removeClass("flagged");
  if (newstate == 1) {
    navlink.addClass("flagged");
    navlink.one(".accesshide .flagstate").setContent(M.str.question.flagged);
  } else navlink.one(".accesshide .flagstate").setContent("");
};
M.mod_quiz.nav.init = function (Y) {
  M.mod_quiz.nav.Y = Y;
  Y.all("#quiznojswarning").remove();
  var form = Y.one("#responseform");
  if (form) {
    function find_enabled_submit() {
      var enabledsubmit = null;
      form.all("input[type=submit]").each(function (submit) {
        if (!enabledsubmit && !submit.get("disabled")) enabledsubmit = submit;
      });
      return enabledsubmit;
    }
    function nav_to_page(pageno) {
      Y.one("#followingpage").set("value", pageno);
      var submit = find_enabled_submit();
      submit.set("name", "");
      submit.getDOMNode().click();
    }
    Y.delegate(
      "click",
      function (e) {
        if (this.hasClass("thispage")) return;
        e.preventDefault();
        var pageidmatch = this.get("href").match(/page=(\d+)/),
          pageno;
        if (pageidmatch) {
          pageno = pageidmatch[1];
        } else pageno = 0;
        var questionidmatch = this.get("href").match(/#q(\d+)/);
        if (questionidmatch)
          form.set("action", form.get("action") + "#q" + questionidmatch[1]);
        nav_to_page(pageno);
      },
      document.body,
      ".qnbutton"
    );
  }
  if (Y.one("a.endtestlink"))
    Y.on(
      "click",
      function (e) {
        e.preventDefault();
        nav_to_page(-1);
      },
      "a.endtestlink"
    );
  if (M.core_question_flags)
    M.core_question_flags.add_listener(M.mod_quiz.nav.update_flag_state);
};
M.mod_quiz.secure_window = {
  init: function (Y) {
    if (window.location.href.substring(0, 4) == "file")
      window.location = "about:blank";
    Y.delegate("contextmenu", M.mod_quiz.secure_window.prevent, document, "*");
    Y.delegate(
      "mousedown",
      M.mod_quiz.secure_window.prevent_mouse,
      document,
      "*"
    );
    Y.delegate(
      "mouseup",
      M.mod_quiz.secure_window.prevent_mouse,
      document,
      "*"
    );
    Y.delegate("dragstart", M.mod_quiz.secure_window.prevent, document, "*");
    Y.delegate("selectstart", M.mod_quiz.secure_window.prevent, document, "*");
    Y.delegate("cut", M.mod_quiz.secure_window.prevent, document, "*");
    Y.delegate("copy", M.mod_quiz.secure_window.prevent, document, "*");
    Y.delegate("paste", M.mod_quiz.secure_window.prevent, document, "*");
    M.mod_quiz.secure_window.clear_status;
    Y.on(
      "beforeprint",
      function () {
        Y.one(document.body).setStyle("display", "none");
      },
      window
    );
    Y.on(
      "afterprint",
      function () {
        Y.one(document.body).setStyle("display", "block");
      },
      window
    );
    Y.on("key", M.mod_quiz.secure_window.prevent, "*", "press:67,86,88+ctrl");
    Y.on("key", M.mod_quiz.secure_window.prevent, "*", "up:67,86,88+ctrl");
    Y.on("key", M.mod_quiz.secure_window.prevent, "*", "down:67,86,88+ctrl");
    Y.on("key", M.mod_quiz.secure_window.prevent, "*", "press:67,86,88+meta");
    Y.on("key", M.mod_quiz.secure_window.prevent, "*", "up:67,86,88+meta");
    Y.on("key", M.mod_quiz.secure_window.prevent, "*", "down:67,86,88+meta");
  },
  clear_status: function () {
    window.status = "";
    setTimeout(M.mod_quiz.secure_window.clear_status, 10);
  },
  prevent: function (e) {
    alert(M.str.quiz.functiondisabledbysecuremode);
    e.halt();
  },
  prevent_mouse: function (e) {
    if (
      e.button == 1 &&
      /^(INPUT|TEXTAREA|BUTTON|SELECT|LABEL|A)$/i.test(e.target.get("tagName"))
    )
      return;
    e.halt();
  },
  start_attempt_action: function (e, args) {
    if (args.startattemptwarning == "") {
      openpopup(e, args);
    } else
      M.util.show_confirm_dialog(e, {
        message: args.startattemptwarning,
        callback: function () {
          openpopup(e, args);
        },
        continuelabel: M.util.get_string("startattempt", "quiz"),
      });
  },
  init_close_button: function (Y, url) {
    Y.on(
      "click",
      function (e) {
        M.mod_quiz.secure_window.close(url, 0);
      },
      "#secureclosebutton"
    );
  },
  close: function (Y, url, delay) {
    setTimeout(function () {
      if (window.opener) {
        window.opener.document.location.reload();
        window.close();
      } else window.location.href = url;
    }, delay * 1e3);
  },
};
