$(function () {

  module('carousel plugin')

  test('should be defined on jQuery object', function () {
    ok($(document.body).carousel, 'carousel method is defined')
  })

  module('carousel', {
    setup: function() {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapCarousel = $.fn.carousel.noConflict()
    },
    teardown: function() {
      $.fn.carousel = $.fn.bootstrapCarousel
      delete $.fn.bootstrapCarousel
    }
  })

  test('should provide no conflict', function () {
    ok(!$.fn.carousel, 'carousel was set back to undefined (orig value)')
  })

  test('should return element', function () {
    ok($(document.body).bootstrapCarousel()[0] == document.body, 'document.body returned')
  })

  test('should not fire slide when slide is prevented', function () {
    $.support.transition = false
    stop()
    $('<div class="carousel"/>')
      .on('slide.bs.carousel', function (e) {
        e.preventDefault()
        ok(true)
        start()
      })
      .on('slid.bs.carousel', function () {
        ok(false)
      })
      .bootstrapCarousel('next')
  })

  test('should reset when slide is prevented', function () {
    var template = '<div id="carousel-example-generic" class="carousel slide"><ol class="carousel-indicators"><li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li><li data-target="#carousel-example-generic" data-slide-to="1"></li><li data-target="#carousel-example-generic" data-slide-to="2"></li></ol><div class="carousel-inner"><div class="item active"><div class="carousel-caption"></div></div><div class="item"><div class="carousel-caption"></div></div><div class="item"><div class="carousel-caption"></div></div></div><a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"></a><a class="right carousel-control" href="#carousel-example-generic" data-slide="next"></a></div>'
    var $carousel = $(template)
    $.support.transition = false
    stop()
    $carousel.one('slide.bs.carousel', function (e) {
      e.preventDefault()
      setTimeout(function () {
        ok($carousel.find('.item:eq(0)').is('.active'))
        ok($carousel.find('.carousel-indicators li:eq(0)').is('.active'))
        $carousel.bootstrapCarousel('next')
      }, 1)
    })
    $carousel.one('slid.bs.carousel', function () {
      setTimeout(function () {
        ok($carousel.find('.item:eq(1)').is('.active'))
        ok($carousel.find('.carousel-indicators li:eq(1)').is('.active'))
        start()
      }, 1)
    })
    $carousel.bootstrapCarousel('next')
  })

  test('should fire slide event with direction', function () {
    var template = '<div id="myCarousel" class="carousel slide"><div class="carousel-inner"><div class="item active"><img alt=""><div class="carousel-caption"><h4>{{_i}}First Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Second Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Third Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div></div><a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a></div>'
    $.support.transition = false
    stop()
    $(template).on('slide.bs.carousel', function (e) {
      e.preventDefault()
      ok(e.direction)
      ok(e.direction === 'right' || e.direction === 'left')
      start()
    }).bootstrapCarousel('next')
  })

  test('should fire slid event with direction', function () {
    var template = '<div id="myCarousel" class="carousel slide"><div class="carousel-inner"><div class="item active"><img alt=""><div class="carousel-caption"><h4>{{_i}}First Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Second Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Third Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div></div><a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a></div>'
    $.support.transition = false
    stop()
    $(template).on('slid.bs.carousel', function (e) {
      e.preventDefault()
      ok(e.direction)
      ok(e.direction === 'right' || e.direction === 'left')
      start()
    }).bootstrapCarousel('next')
  })

  test('should fire slide event with relatedTarget', function () {
    var template = '<div id="myCarousel" class="carousel slide"><div class="carousel-inner"><div class="item active"><img alt=""><div class="carousel-caption"><h4>{{_i}}First Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Second Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Third Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div></div><a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a></div>'
    $.support.transition = false
    stop()
    $(template)
      .on('slide.bs.carousel', function (e) {
        e.preventDefault()
        ok(e.relatedTarget)
        ok($(e.relatedTarget).hasClass('item'))
        start()
      })
      .bootstrapCarousel('next')
  })

  test('should fire slid event with relatedTarget', function () {
    var template = '<div id="myCarousel" class="carousel slide"><div class="carousel-inner"><div class="item active"><img alt=""><div class="carousel-caption"><h4>{{_i}}First Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Second Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Third Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div></div><a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a></div>'
    $.support.transition = false
    stop()
    $(template)
      .on('slid.bs.carousel', function (e) {
        e.preventDefault()
        ok(e.relatedTarget)
        ok($(e.relatedTarget).hasClass('item'))
        start()
      })
      .bootstrapCarousel('next')
  })

  test('should set interval from data attribute', 4, function () {
    var template = $('<div id="myCarousel" class="carousel slide"> <div class="carousel-inner"> <div class="item active"> <img alt=""> <div class="carousel-caption"> <h4>{{_i}}First Thumbnail label{{/i}}</h4> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> </div> </div> <div class="item"> <img alt=""> <div class="carousel-caption"> <h4>{{_i}}Second Thumbnail label{{/i}}</h4> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> </div> </div> <div class="item"> <img alt=""> <div class="carousel-caption"> <h4>{{_i}}Third Thumbnail label{{/i}}</h4> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> </div> </div> </div> <a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a> <a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a> </div>')
    template.attr('data-interval', 1814)

    template.appendTo('body')
    $('[data-slide]').first().click()
    ok($('#myCarousel').data('bs.carousel').options.interval == 1814)
    $('#myCarousel').remove()

    template.appendTo('body').attr('data-modal', 'foobar')
    $('[data-slide]').first().click()
    ok($('#myCarousel').data('bs.carousel').options.interval == 1814, 'even if there is an data-modal attribute set')
    $('#myCarousel').remove()

    template.appendTo('body')
    $('[data-slide]').first().click()
    $('#myCarousel').attr('data-interval', 1860)
    $('[data-slide]').first().click()
    ok($('#myCarousel').data('bs.carousel').options.interval == 1814, 'attributes should be read only on initialization')
    $('#myCarousel').remove()

    template.attr('data-interval', false)
    template.appendTo('body')
    $('#myCarousel').bootstrapCarousel(1)
    ok($('#myCarousel').data('bs.carousel').options.interval === false, 'data attribute has higher priority than default options')
    $('#myCarousel').remove()
  })

  test('should skip over non-items', function () {
    $.support.transition = false

    var $template = $(
        '<div id="myCarousel" class="carousel" data-interval="1814">'
      + '<div class="carousel-inner">'
      + '<div class="item active">'
      + '<img alt="">'
      + '</div>'
      + '<script type="text/x-metamorph" id="thingy"></script>'
      + '<div class="item">'
      + '<img alt="">'
      + '</div>'
      + '<div class="item">'
      + '</div>'
      + '</div>'
      + '</div>'
    )

    $template.bootstrapCarousel()

    equal($template.find('.item')[0], $template.find('.active')[0], 'the first carousel item should be active')

    $template.bootstrapCarousel(1)

    equal($template.find('.item')[1], $template.find('.active')[0], 'the second carousel item should be active')
  })
})
iv>'

    var done = assert.async()

    $(template)
      .on('slid.bs.carousel', function (e) {
        assert.ok(e.relatedTarget, 'relatedTarget present')
        assert.ok($(e.relatedTarget).hasClass('item'), 'relatedTarget has class "item"')
        done()
      })
      .bootstrapCarousel('next')
  })

  QUnit.test('should set interval from data attribute', function (assert) {
    assert.expect(4)
    var templateHTML = '<div id="myCarousel" class="carousel slide">'
        + '<div class="carousel-inner">'
        + '<div class="item active">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>First Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '<div class="item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Second Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '<div class="item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Third Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>'
        + '<a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>'
        + '</div>'
    var $carousel = $(templateHTML)
    $carousel.attr('data-interval', 1814)

    $carousel.appendTo('body')
    $('[data-slide]').first().trigger('click')
    assert.strictEqual($carousel.data('bs.carousel').options.interval, 1814)
    $carousel.remove()

    $carousel.appendTo('body').attr('data-modal', 'foobar')
    $('[data-slide]').first().trigger('click')
    assert.strictEqual($carousel.data('bs.carousel').options.interval, 1814, 'even if there is an data-modal attribute set')
    $carousel.remove()

    $carousel.appendTo('body')
    $('[data-slide]').first().trigger('click')
    $carousel.attr('data-interval', 1860)
    $('[data-slide]').first().trigger('click')
    assert.strictEqual($carousel.data('bs.carousel').options.interval, 1814, 'attributes should be read only on initialization')
    $carousel.remove()

    $carousel.attr('data-interval', false)
    $carousel.appendTo('body')
    $carousel.bootstrapCarousel(1)
    assert.strictEqual($carousel.data('bs.carousel').options.interval, false, 'data attribute has higher priority than default options')
    $carousel.remove()
  })

  QUnit.test('should skip over non-items when using item indices', function (assert) {
    assert.expect(2)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="1814">'
        + '<div class="carousel-inner">'
        + '<div class="item active">'
        + '<img alt="">'
        + '</div>'
        + '<script type="text/x-metamorph" id="thingy"/>'
        + '<div class="item">'
        + '<img alt="">'
        + '</div>'
        + '<div class="item">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)

    $template.bootstrapCarousel()

    assert.strictEqual($template.find('.item')[0], $template.find('.active')[0], 'first item active')

    $template.bootstrapCarousel(1)

    assert.strictEqual($template.find('.item')[1], $template.find('.active')[0], 'second item active')
  })

  QUnit.test('should skip over non-items when using next/prev methods', function (assert) {
    assert.expect(2)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="1814">'
        + '<div class="carousel-inner">'
        + '<div class="item active">'
        + '<img alt="">'
        + '</div>'
        + '<script type="text/x-metamorph" id="thingy"/>'
        + '<div class="item">'
        + '<img alt="">'
        + '</div>'
        + '<div class="item">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)

    $template.bootstrapCarousel()

    assert.strictEqual($template.find('.item')[0], $template.find('.active')[0], 'first item active')

    $template.bootstrapCarousel('next')

    assert.strictEqual($template.find('.item')[1], $template.find('.active')[0], 'second item active')
  })

  QUnit.test('should go to previous item if left arrow key is pressed', function (assert) {
    assert.expect(2)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="false">'
        + '<div class="carousel-inner">'
        + '<div id="first" class="item">'
        + '<img alt="">'
        + '</div>'
        + '<div id="second" class="item active">'
        + '<img alt="">'
        + '</div>'
        + '<div id="third" class="item">'
        + '<img alt="">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)

    $template.bootstrapCarousel()

    assert.strictEqual($template.find('.item')[1], $template.find('.active')[0], 'second item active')

    $template.trigger($.Event('keydown', { which: 37 }))

    assert.strictEqual($template.find('.item')[0], $template.find('.active')[0], 'first item active')
  })

  QUnit.test('should go to next item if right arrow key is pressed', function (assert) {
    assert.expect(2)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="false">'
        + '<div class="carousel-inner">'
        + '<div id="first" class="item active">'
        + '<img alt="">'
        + '</div>'
        + '<div id="second" class="item">'
        + '<img alt="">'
        + '</div>'
        + '<div id="third" class="item">'
        + '<img alt="">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)

    $template.bootstrapCarousel()

    assert.strictEqual($template.find('.item')[0], $template.find('.active')[0], 'first item active')

    $template.trigger($.Event('keydown', { which: 39 }))

    assert.strictEqual($template.find('.item')[1], $template.find('.active')[0], 'second item active')
  })

  QUnit.test('should support disabling the keyboard navigation', function (assert) {
    assert.expect(3)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="false" data-keyboard="false">'
        + '<div class="carousel-inner">'
        + '<div id="first" class="item active">'
        + '<img alt="">'
        + '</div>'
        + '<div id="second" class="item">'
        + '<img alt="">'
        + '</div>'
        + '<div id="third" class="item">'
        + '<img alt="">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)

    $template.bootstrapCarousel()

    assert.strictEqual($template.find('.item')[0], $template.find('.active')[0], 'first item active')

    $template.trigger($.Event('keydown', { which: 39 }))

    assert.strictEqual($template.find('.item')[0], $template.find('.active')[0], 'first item still active after right arrow press')

    $template.trigger($.Event('keydown', { which: 37 }))

    assert.strictEqual($template.find('.item')[0], $template.find('.active')[0], 'first item still active after left arrow press')
  })

  QUnit.test('should ignore keyboard events within <input>s and <textarea>s', function (assert) {
    assert.expect(7)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="false">'
        + '<div class="carousel-inner">'
        + '<div id="first" class="item active">'
        + '<img alt="">'
        + '<input type="text" id="in-put">'
        + '<textarea id="text-area"></textarea>'
        + '</div>'
        + '<div id="second" class="item">'
        + '<img alt="">'
        + '</div>'
        + '<div id="third" class="item">'
        + '<img alt="">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)
    var $input = $template.find('#in-put')
    var $textarea = $template.find('#text-area')

    assert.strictEqual($input.length, 1, 'found <input>')
    assert.strictEqual($textarea.length, 1, 'found <textarea>')

    $template.bootstrapCarousel()

    assert.strictEqual($template.find('.item')[0], $template.find('.active')[0], 'first item active')


    $input.trigger($.Event('keydown', { which: 39 }))
    assert.strictEqual($template.find('.item')[0], $template.find('.active')[0], 'first item still active after right arrow press in <input>')

    $input.trigger($.Event('keydown', { which: 37 }))
    assert.strictEqual($template.find('.item')[0], $template.find('.active')[0], 'first item still active after left arrow press in <input>')


    $textarea.trigger($.Event('keydown', { which: 39 }))
    assert.strictEqual($template.find('.item')[0], $template.find('.active')[0], 'first item still active after right arrow press in <textarea>')

    $textarea.trigger($.Event('keydown', { which: 37 }))
    assert.strictEqual($template.find('.item')[0], $template.find('.active')[0], 'first item still active after left arrow press in <textarea>')
  })

  QUnit.test('should only add mouseenter and mouseleave listeners when not on mobile', function (assert) {
    assert.expect(2)
    var isMobile     = 'ontouchstart' in document.documentElement
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="false" data-pause="hover">'
        + '<div class="carousel-inner">'
        + '<div id="first" class="item active">'
        + '<img alt="">'
        + '</div>'
        + '<div id="second" class="item">'
        + '<img alt="">'
        + '</div>'
        + '<div id="third" class="item">'
        + '<img alt="">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML).bootstrapCarousel()

    $.each(['mouseover', 'mouseout'], function (i, type) {
      assert.strictEqual(type in $._data($template[0], 'events'), !isMobile, 'does' + (isMobile ? ' not' : '') + ' listen for ' + type + ' events')
    })
  })

  QUnit.test('should wrap around from end to start when wrap option is true', function (assert) {
    assert.expect(3)
    var carouselHTML = '<div id="carousel-example-generic" class="carousel slide" data-wrap="true">'
        + '<ol class="carousel-indicators">'
        + '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="1"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="2"/>'
        + '</ol>'
        + '<div class="carousel-inner">'
        + '<div class="item active" id="one">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="item" id="two">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="item" id="three">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"/>'
        + '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next"/>'
        + '</div>'
    var $carousel = $(carouselHTML)
    var getActiveId = function () { return $carousel.find('.item.active').attr('id') }

    var done = assert.async()

    $carousel
      .one('slid.bs.carousel', function () {
        assert.strictEqual(getActiveId(), 'two', 'carousel slid from 1st to 2nd slide')
        $carousel
          .one('slid.bs.carousel', function () {
            assert.strictEqual(getActiveId(), 'three', 'carousel slid from 2nd to 3rd slide')
            $carousel
              .one('slid.bs.carousel', function () {
                assert.strictEqual(getActiveId(), 'one', 'carousel wrapped around and slid from 3rd to 1st slide')
                done()
              })
              .bootstrapCarousel('next')
          })
          .bootstrapCarousel('next')
      })
      .bootstrapCarousel('next')
  })

  QUnit.test('should wrap around from start to end when wrap option is true', function (assert) {
    assert.expect(1)
    var carouselHTML = '<div id="carousel-example-generic" class="carousel slide" data-wrap="true">'
        + '<ol class="carousel-indicators">'
        + '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="1"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="2"/>'
        + '</ol>'
        + '<div class="carousel-inner">'
        + '<div class="item active" id="one">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="item" id="two">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="item" id="three">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"/>'
        + '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next"/>'
        + '</div>'
    var $carousel = $(carouselHTML)

    var done = assert.async()

    $carousel
      .on('slid.bs.carousel', function () {
        assert.strictEqual($carousel.find('.item.active').attr('id'), 'three', 'carousel wrapped around and slid from 1st to 3rd slide')
        done()
      })
      .bootstrapCarousel('prev')
  })

  QUnit.test('should stay at the end when the next method is called and wrap is false', function (assert) {
    assert.expect(3)
    var carouselHTML = '<div id="carousel-example-generic" class="carousel slide" data-wrap="false">'
        + '<ol class="carousel-indicators">'
        + '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="1"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="2"/>'
        + '</ol>'
        + '<div class="carousel-inner">'
        + '<div class="item active" id="one">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="item" id="two">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="item" id="three">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"/>'
        + '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next"/>'
        + '</div>'
    var $carousel = $(carouselHTML)
    var getActiveId = function () { return $carousel.find('.item.active').attr('id') }

    var done = assert.async()

    $carousel
      .one('slid.bs.carousel', function () {
        assert.strictEqual(getActiveId(), 'two', 'carousel slid from 1st to 2nd slide')
        $carousel
          .one('slid.bs.carousel', function () {
            assert.strictEqual(getActiveId(), 'three', 'carousel slid from 2nd to 3rd slide')
            $carousel
              .one('slid.bs.carousel', function () {
                assert.ok(false, 'carousel slid when it should not have slid')
              })
              .bootstrapCarousel('next')
            assert.strictEqual(getActiveId(), 'three', 'carousel did not wrap around and stayed on 3rd slide')
            done()
          })
          .bootstrapCarousel('next')
      })
      .bootstrapCarousel('next')
  })

  QUnit.test('should stay at the start when the prev method is called and wrap is false', function (assert) {
    assert.expect(1)
    var carouselHTML = '<div id="carousel-example-generic" class="carousel slide" data-wrap="false">'
        + '<ol class="carousel-indicators">'
        + '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="1"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="2"/>'
        + '</ol>'
        + '<div class="carousel-inner">'
        + '<div class="item active" id="one">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="item" id="two">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="item" id="three">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"/>'
        + '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next"/>'
        + '</div>'
    var $carousel = $(carouselHTML)

    $carousel
      .on('slid.bs.carousel', function () {
        assert.ok(false, 'carousel slid when it should not have slid')
      })
      .bootstrapCarousel('prev')
    assert.strictEqual($carousel.find('.item.active').attr('id'), 'one', 'carousel did not wrap around and stayed on 1st slide')
  })
})
