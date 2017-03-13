$(function () {

  module('popover plugin')

  test('should be defined on jquery object', function () {
    var div = $('<div></div>')
    ok(div.popover, 'popover method is defined')
  })

  module('popover', {
    setup: function() {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapPopover = $.fn.popover.noConflict()
    },
    teardown: function() {
      $.fn.popover = $.fn.bootstrapPopover
      delete $.fn.bootstrapPopover
    }
  })

  test('should provide no conflict', function () {
    ok(!$.fn.popover, 'popover was set back to undefined (org value)')
  })

  test('should return element', function () {
    var div = $('<div></div>')
    ok(div.bootstrapPopover() == div, 'document.body returned')
  })

  test('should render popover element', function () {
    $.support.transition = false
    var popover = $('<a href="#" title="mdo" data-content="http://twitter.com/mdo">@mdo</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover('show')

    ok($('.popover').length, 'popover was inserted')
    popover.bootstrapPopover('hide')
    ok(!$('.popover').length, 'popover removed')
  })

  test('should store popover instance in popover data object', function () {
    $.support.transition = false
    var popover = $('<a href="#" title="mdo" data-content="http://twitter.com/mdo">@mdo</a>')
      .bootstrapPopover()

    ok(!!popover.data('bs.popover'), 'popover instance exists')
  })

  test('should get title and content from options', function () {
    $.support.transition = false
    var popover = $('<a href="#">@fat</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        title: function () {
          return '@fat'
        },
        content: function () {
          return 'loves writing tests （╯°□°）╯︵ ┻━┻'
        }
      })

    popover.bootstrapPopover('show')

    ok($('.popover').length, 'popover was inserted')
    equal($('.popover .popover-title').text(), '@fat', 'title correctly inserted')
    equal($('.popover .popover-content').text(), 'loves writing tests （╯°□°）╯︵ ┻━┻', 'content correctly inserted')

    popover.bootstrapPopover('hide')
    ok(!$('.popover').length, 'popover was removed')
    $('#qunit-fixture').empty()
  })

  test('should not duplicate HTML object', function () {
    $.support.transition = false

    $div = $('<div>').html('loves writing tests （╯°□°）╯︵ ┻━┻')

    var popover = $('<a href="#">@fat</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        content: function () {
          return $div
        }
      })

    popover.bootstrapPopover('show')
    ok($('.popover').length, 'popover was inserted')
    equal($('.popover .popover-content').html(), $div, 'content correctly inserted')

    popover.bootstrapPopover('hide')
    ok(!$('.popover').length, 'popover was removed')

    popover.bootstrapPopover('show')
    ok($('.popover').length, 'popover was inserted')
    equal($('.popover .popover-content').html(), $div, 'content correctly inserted')

    popover.bootstrapPopover('hide')
    ok(!$('.popover').length, 'popover was removed')
    $('#qunit-fixture').empty()
  })

  test('should get title and content from attributes', function () {
    $.support.transition = false
    var popover = $('<a href="#" title="@mdo" data-content="loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻" >@mdo</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover()
      .bootstrapPopover('show')

    ok($('.popover').length, 'popover was inserted')
    equal($('.popover .popover-title').text(), '@mdo', 'title correctly inserted')
    equal($('.popover .popover-content').text(), 'loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻', 'content correctly inserted')

    popover.bootstrapPopover('hide')
    ok(!$('.popover').length, 'popover was removed')
    $('#qunit-fixture').empty()
  })


  test('should get title and content from attributes #2', function () {
    $.support.transition = false
    var popover = $('<a href="#" title="@mdo" data-content="loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻" >@mdo</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        title: 'ignored title option',
        content: 'ignored content option'
      })
      .bootstrapPopover('show')

    ok($('.popover').length, 'popover was inserted')
    equal($('.popover .popover-title').text(), '@mdo', 'title correctly inserted')
    equal($('.popover .popover-content').text(), 'loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻', 'content correctly inserted')

    popover.bootstrapPopover('hide')
    ok(!$('.popover').length, 'popover was removed')
    $('#qunit-fixture').empty()
  })

  test('should respect custom classes', function () {
    $.support.transition = false
    var popover = $('<a href="#">@fat</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        title: 'Test',
        content: 'Test',
        template: '<div class="popover foobar"><div class="arrow"></div><div class="inner"><h3 class="title"></h3><div class="content"><p></p></div></div></div>'
      })

    popover.bootstrapPopover('show')

    ok($('.popover').length, 'popover was inserted')
    ok($('.popover').hasClass('foobar'), 'custom class is present')

    popover.bootstrapPopover('hide')
    ok(!$('.popover').length, 'popover was removed')
    $('#qunit-fixture').empty()
  })

  test('should destroy popover', function () {
    var popover = $('<div/>').bootstrapPopover({trigger: 'hover'}).on('click.foo', function () {})
    ok(popover.data('bs.popover'), 'popover has data')
    ok($._data(popover[0], 'events').mouseover && $._data(popover[0], 'events').mouseout, 'popover has hover event')
    ok($._data(popover[0], 'events').click[0].namespace == 'foo', 'popover has extra click.foo event')
    popover.bootstrapPopover('show')
    popover.bootstrapPopover('destroy')
    ok(!popover.hasClass('in'), 'popover is hidden')
    ok(!popover.data('popover'), 'popover does not have data')
    ok($._data(popover[0],'events').click[0].namespace == 'foo', 'popover still has click.foo')
    ok(!$._data(popover[0], 'events').mouseover && !$._data(popover[0], 'events').mouseout, 'popover does not have any events')
  })

})
ctEqual($('.popover').length, 0, 'popover was removed')
  })

  QUnit.test('should destroy popover', function (assert) {
    assert.expect(7)
    var $popover = $('<div/>')
      .bootstrapPopover({
        trigger: 'hover'
      })
      .on('click.foo', $.noop)

    assert.ok($popover.data('bs.popover'), 'popover has data')
    assert.ok($._data($popover[0], 'events').mouseover && $._data($popover[0], 'events').mouseout, 'popover has hover event')
    assert.strictEqual($._data($popover[0], 'events').click[0].namespace, 'foo', 'popover has extra click.foo event')

    $popover.bootstrapPopover('show')
    $popover.bootstrapPopover('destroy')

    assert.ok(!$popover.hasClass('in'), 'popover is hidden')
    assert.ok(!$popover.data('popover'), 'popover does not have data')
    assert.strictEqual($._data($popover[0], 'events').click[0].namespace, 'foo', 'popover still has click.foo')
    assert.ok(!$._data($popover[0], 'events').mouseover && !$._data($popover[0], 'events').mouseout, 'popover does not have any events')
  })

  QUnit.test('should render popover element using delegated selector', function (assert) {
    assert.expect(2)
    var $div = $('<div><a href="#" title="mdo" data-content="https://twitter.com/mdo">@mdo</a></div>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        selector: 'a',
        trigger: 'click'
      })

    $div.find('a').trigger('click')
    assert.notEqual($('.popover').length, 0, 'popover was inserted')

    $div.find('a').trigger('click')
    assert.strictEqual($('.popover').length, 0, 'popover was removed')
  })

  QUnit.test('should detach popover content rather than removing it so that event handlers are left intact', function (assert) {
    assert.expect(1)
    var $content = $('<div class="content-with-handler"><a class="btn btn-warning">Button with event handler</a></div>').appendTo('#qunit-fixture')

    var handlerCalled = false
    $('.content-with-handler .btn').on('click', function () {
      handlerCalled = true
    })

    var $div = $('<div><a href="#">Show popover</a></div>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        html: true,
        trigger: 'manual',
        container: 'body',
        content: function () {
          return $content
        }
      })

    var done = assert.async()
    $div
      .one('shown.bs.popover', function () {
        $div
          .one('hidden.bs.popover', function () {
            $div
              .one('shown.bs.popover', function () {
                $('.content-with-handler .btn').trigger('click')
                $div.bootstrapPopover('destroy')
                assert.ok(handlerCalled, 'content\'s event handler still present')
                done()
              })
              .bootstrapPopover('show')
          })
          .bootstrapPopover('hide')
      })
      .bootstrapPopover('show')
  })

  QUnit.test('should throw an error when initializing popover on the document object without specifying a delegation selector', function (assert) {
    assert.expect(1)
    assert.throws(function () {
      $(document).bootstrapPopover({ title: 'What am I on?', content: 'My selector is missing' })
    }, new Error('`selector` option must be specified when initializing popover on the window.document object!'))
  })

  QUnit.test('should do nothing when an attempt is made to hide an uninitialized popover', function (assert) {
    assert.expect(1)

    var $popover = $('<span data-toggle="popover" data-title="some title" data-content="some content">some text</span>')
      .appendTo('#qunit-fixture')
      .on('hidden.bs.popover shown.bs.popover', function () {
        assert.ok(false, 'should not fire any popover events')
      })
      .bootstrapPopover('hide')
    assert.strictEqual($popover.data('bs.popover'), undefined, 'should not initialize the popover')
  })

  QUnit.test('should throw an error when template contains multiple top-level elements', function (assert) {
    assert.expect(1)
    assert.throws(function () {
      $('<span data-toggle="popover" data-title="some title" data-content="some content">some text</span>')
        .appendTo('#qunit-fixture')
        .bootstrapPopover({ template: '<div>Foo</div><div>Bar</div>' })
        .bootstrapPopover('show')
    }, new Error('popover `template` option must consist of exactly 1 top-level element!'))
  })

  QUnit.test('should fire inserted event', function (assert) {
    assert.expect(2)
    var done = assert.async()

    $('<a href="#">@Johann-S</a>')
      .appendTo('#qunit-fixture')
      .on('inserted.bs.popover', function () {
        assert.notEqual($('.popover').length, 0, 'popover was inserted')
        assert.ok(true, 'inserted event fired')
        done()
      })
      .bootstrapPopover({
        title: 'Test',
        content: 'Test'
      })
      .bootstrapPopover('show')
  })

})
