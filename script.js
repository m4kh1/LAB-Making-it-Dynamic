$(document).ready(function () {
  // 1. Theme button: change the reading colors and save the choice.
  if (localStorage.getItem('makhi-light-theme') === 'yes') {
    $('body').addClass('light-theme');
    $('#theme-toggle').text('Use dark theme');
  }

  $('#theme-toggle').on('click', function () {
    $('body').toggleClass('light-theme');

    if ($('body').hasClass('light-theme')) {
      $(this).text('Use dark theme');
      localStorage.setItem('makhi-light-theme', 'yes');
    } else {
      $(this).text('Use light theme');
      localStorage.setItem('makhi-light-theme', 'no');
    }
  });

  // 2. Details buttons: show or hide the paragraph after each button.
  $('.detail-toggle').on('click', function () {
    $(this).next('.details').stop(true, true).slideToggle(300, updateProgress);

    if ($(this).text() === 'Hide details') {
      $(this).text('Show details');
    } else {
      $(this).text('Hide details');
    }
  });

  // 3. Interest buttons: show only the interests in the chosen category.
  $('.filters button').on('click', function () {
    var category = $(this).attr('data-filter');
    $('.filters button').removeClass('selected');
    $(this).addClass('selected');

    if (category === 'all') {
      $('.interest').show();
    } else {
      $('.interest').hide();
      $('.interest.' + category).show();
    }
    updateProgress();
  });

  // 4. Reading progress: scroll distance divided by available scroll space.
  function updateProgress() {
    var pageHeight = $(document).height() - $(window).height();
    var percent = 100;

    if (pageHeight > 0) {
      percent = $(window).scrollTop() / pageHeight * 100;
    }
    $('#reading-progress').css('width', percent + '%');
  }

  $(window).on('scroll resize', updateProgress);
  updateProgress();

  // 5. Section links: scroll to the section named in the link's href.
  $('a[href^="#"]').on('click', function (event) {
    event.preventDefault();
    var section = $(this).attr('href');

    $('html, body').stop().animate({
      scrollTop: $(section).offset().top
    }, 500);
  });
});
