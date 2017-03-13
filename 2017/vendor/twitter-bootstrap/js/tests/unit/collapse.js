$(function () {

  module('collapse plugin')

  test('should be defined on jquery object', function () {
    ok($(document.body).collapse, 'collapse method is defined')
  })

  module('collapse', {
    setup: function() {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapCollapse = $.fn.collapse.noConflict()
    },
    teardown: function() {
      $.fn.collapse = $.fn.bootstrapCollapse
      delete $.fn.bootstrapCollapse
    }
  })

  test('should provide no conflict', function () {
    ok(!$.fn.collapse, 'collapse was set back to undefined (org value)')
  })

  test('should return element', function () {
    ok($(document.body).bootstrapCollapse()[0] == document.body, 'document.body returned')
  })

  test('should show a collapsed element', function () {
    var el = $('<div class="collapse"></div>').bootstrapCollapse('show')
    ok(el.hasClass('in'), 'has class in')
    ok(!/height/.test(el.attr('style')), 'has height reset')
  })

  test('should hide a collapsed element', function () {
    var el = $('<div class="collapse"></div>').bootstrapCollapse('hide')
    ok(!el.hasClass('in'), 'does not have class in')
    ok(/height/.test(el.attr('style')), 'has height set')
  })

  test('should not fire shown when show is prevented', function () {
    $.support.transition = false
    stop()
    $('<div class="collapse"/>')
      .on('show.bs.collapse', function (e) {
        e.preventDefault()
        ok(true)
        start()
      })
      .on('shown.bs.collapse', function () {
        ok(false)
      })
      .bootstrapCollapse('show')
  })

  test('should reset style to auto after finishing opening collapse', function () {
    $.support.transition = false
    stop()
    $('<div class="collapse" style="height: 0px"/>')
      .on('show.bs.collapse', function () {
        ok(this.style.height == '0px')
      })
      .on('shown.bs.collapse', function () {
        ok(this.style.height === '')
        start()
      })
      .bootstrapCollapse('show')
  })

  test('should add active class to target when collapse shown', function () {
    $.support.transition = false
    stop()

    var target = $('<a data-toggle="collapse" href="#test1"></a>')
      .appendTo($('#qunit-fixture'))

    $('<div id="test1"></div>')
      .appendTo($('#qunit-fixture'))
      .on('show.bs.collapse', function () {
        ok(!target.hasClass('collapsed'))
        start()
      })

    target.click()
  })

  test('should remove active class to target when collapse hidden', function () {
    $.support.transition = false
    stop()

    var target = $('<a data-toggle="collapse" href="#test1"></a>')
      .appendTo($('#qunit-fixture'))

    $('<div id="test1" class="in"></div>')
      .appendTo($('#qunit-fixture'))
      .on('hide.bs.collapse', function () {
        ok(target.hasClass('collapsed'))
        start()
      })

    target.click()
  })

  test('should remove active class from inactive accordion targets', function () {
    $.support.transition = false
    stop()

    var accordion = $('<div id="accordion"><div class="accordion-group"></div><div class="accordion-group"></div><div class="accordion-group"></div></div>')
      .appendTo($('#qunit-fixture'))

    var target1 = $('<a data-toggle="collapse" href="#body1" data-parent="#accordion"></a>')
      .appendTo(accordion.find('.accordion-group').eq(0))

    $('<div id="body1" class="in"></div>')
      .appendTo(accordion.find('.accordion-group').eq(0))

    var target2 = $('<a class="collapsed" data-toggle="collapse" href="#body2" data-parent="#accordion"></a>')
      .appendTo(accordion.find('.accordion-group').eq(1))

    $('<div id="body2"></div>')
      .appendTo(accordion.find('.accordion-group').eq(1))

    var target3 = $('<a class="collapsed" data-toggle="collapse" href="#body3" data-parent="#accordion"></a>')
      .appendTo(accordion.find('.accordion-group').eq(2))

    $('<div id="body3"></div>')
      .appendTo(accordion.find('.accordion-group').eq(2))
      .on('show.bs.collapse', function () {
        ok(target1.hasClass('collapsed'))
        ok(target2.hasClass('collapsed'))
        ok(!target3.hasClass('collapsed'))

        start()
      })

    target3.click()
  })

  test('should allow dots in data-parent', function () {
    $.support.transition = false
    stop()

    var accordion = $('<div class="accordion"><div class="accordion-group"></div><div class="accordion-group"></div><div class="accordion-group"></div></div>')
      .appendTo($('#qunit-fixture'))

    var target1 = $('<a data-toggle="collapse" href="#body1" data-parent=".accordion"></a>')
      .appendTo(accordion.find('.accordion-group').eq(0))

    $('<div id="body1" class="in"></div>')
      .appendTo(accordion.find('.accordion-group').eq(0))

    var target2 = $('<a class="collapsed" data-toggle="collapse" href="#body2" data-parent=".accordion"></a>')
      .appendTo(accordion.find('.accordion-group').eq(1))

    $('<div id="body2"></div>')
      .appendTo(accordion.find('.accordion-group').eq(1))

    var target3 = $('<a class="collapsed" data-toggle="collapse" href="#body3" data-parent=".accordion"></a>')
      .appendTo(accordion.find('.accordion-group').eq(2))

    $('<div id="body3"></div>')
      .appendTo(accordion.find('.accordion-group').eq(2))
      .on('show.bs.collapse', function () {
        ok(target1.hasClass('collapsed'))
        ok(target2.hasClass('collapsed'))
        ok(!target3.hasClass('collapsed'))

        start()
      })

    target3.click()
  })

})
 a collapse when initialized with "show" option if not already shown', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $test = $('<div id="test1" />')
      .appendTo('#qunit-fixture')
      .on('show.bs.collapse', function () {
        assert.ok(true)
      })

    $test.bootstrapCollapse('show')

    setTimeout(done, 0)
  })

  QUnit.test('should not show a collapse when initialized with "hide" option if already hidden', function (assert) {
    assert.expect(0)
    var done = assert.async()

    $('<div class="collapse"></div>')
      .appendTo('#qunit-fixture')
      .on('show.bs.collapse', function () {
        assert.ok(false, 'showing a previously-uninitialized hidden collapse when the "hide" method is called')
      })
      .bootstrapCollapse('hide')

    setTimeout(done, 0)
  })

  QUnit.test('should hide a collapse when initialized with "hide" option if not already hidden', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div class="collapse in"></div>')
      .appendTo('#qunit-fixture')
      .on('hide.bs.collapse', function () {
        assert.ok(true, 'hiding a previously-uninitialized shown collapse when the "hide" method is called')
      })
      .bootstrapCollapse('hide')

    setTimeout(done, 0)
  })

  QUnit.test('should remove "collapsed" class from active accordion target', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var accordionHTML = '<div class="panel-group" id="accordion">'
        + '<div class="panel"/>'
        + '<div class="panel"/>'
        + '<div class="panel"/>'
        + '</div>'
    var $groups = $(accordionHTML).appendTo('#qunit-fixture').find('.panel')

    var $target1 = $('<a role="button" data-toggle="collapse" href="#body1" data-parent="#accordion"/>').appendTo($groups.eq(0))

    $('<div id="body1" class="in"/>').appendTo($groups.eq(0))

    var $target2 = $('<a class="collapsed" data-toggle="collapse" role="button" href="#body2" data-parent="#accordion"/>').appendTo($groups.eq(1))

    $('<div id="body2"/>').appendTo($groups.eq(1))

    var $target3 = $('<a class="collapsed" data-toggle="collapse" role="button" href="#body3" data-parent="#accordion"/>').appendTo($groups.eq(2))

    $('<div id="body3"/>')
      .appendTo($groups.eq(2))
      .on('shown.bs.collapse', function () {
        assert.ok($target1.hasClass('collapsed'), 'inactive target 1 does have class "collapsed"')
        assert.ok($target2.hasClass('collapsed'), 'inactive target 2 does have class "collapsed"')
        assert.ok(!$target3.hasClass('collapsed'), 'active target 3 does not have class "collapsed"')

        done()
      })

    $target3.trigger('click')
  })

  QUnit.test('should allow dots in data-parent', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var accordionHTML = '<div class="panel-group accordion">'
        + '<div class="panel"/>'
        + '<div class="panel"/>'
        + '<div class="panel"/>'
        + '</div>'
    var $groups = $(accordionHTML).appendTo('#qunit-fixture').find('.panel')

    var $target1 = $('<a role="button" data-toggle="collapse" href="#body1" data-parent=".accordion"/>').appendTo($groups.eq(0))

    $('<div id="body1" class="in"/>').appendTo($groups.eq(0))

    var $target2 = $('<a class="collapsed" data-toggle="collapse" role="button" href="#body2" data-parent=".accordion"/>').appendTo($groups.eq(1))

    $('<div id="body2"/>').appendTo($groups.eq(1))

    var $target3 = $('<a class="collapsed" data-toggle="collapse" role="button" href="#body3" data-parent=".accordion"/>').appendTo($groups.eq(2))

    $('<div id="body3"/>')
      .appendTo($groups.eq(2))
      .on('shown.bs.collapse', function () {
        assert.ok($target1.hasClass('collapsed'), 'inactive target 1 does have class "collapsed"')
        assert.ok($target2.hasClass('collapsed'), 'inactive target 2 does have class "collapsed"')
        assert.ok(!$target3.hasClass('collapsed'), 'active target 3 does not have class "collapsed"')

        done()
      })

    $target3.trigger('click')
  })

  QUnit.test('should set aria-expanded="true" on target when collapse is shown', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" class="collapsed" href="#test1" aria-expanded="false"/>').appendTo('#qunit-fixture')

    $('<div id="test1"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.collapse', function () {
        assert.strictEqual($target.attr('aria-expanded'), 'true', 'aria-expanded on target is "true"')
        done()
      })

    $target.trigger('click')
  })

  QUnit.test('should set aria-expanded="false" on target when collapse is hidden', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" href="#test1" aria-expanded="true"/>').appendTo('#qunit-fixture')

    $('<div id="test1" class="in"/>')
      .appendTo('#qunit-fixture')
      .on('hidden.bs.collapse', function () {
        assert.strictEqual($target.attr('aria-expanded'), 'false', 'aria-expanded on target is "false"')
        done()
      })

    $target.trigger('click')
  })

  QUnit.test('should set aria-expanded="true" on all triggers targeting the collapse when the collapse is shown', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" class="collapsed" href="#test1" aria-expanded="false"/>').appendTo('#qunit-fixture')
    var $alt = $('<a role="button" data-toggle="collapse" class="collapsed" href="#test1" aria-expanded="false"/>').appendTo('#qunit-fixture')

    $('<div id="test1"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.collapse', function () {
        assert.strictEqual($target.attr('aria-expanded'), 'true', 'aria-expanded on target is "true"')
        assert.strictEqual($alt.attr('aria-expanded'), 'true', 'aria-expanded on alt is "true"')
        done()
      })

    $target.trigger('click')
  })

  QUnit.test('should set aria-expanded="false" on all triggers targeting the collapse when the collapse is hidden', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" href="#test1" aria-expanded="true"/>').appendTo('#qunit-fixture')
    var $alt = $('<a role="button" data-toggle="collapse" href="#test1" aria-expanded="true"/>').appendTo('#qunit-fixture')

    $('<div id="test1" class="in"/>')
      .appendTo('#qunit-fixture')
      .on('hidden.bs.collapse', function () {
        assert.strictEqual($target.attr('aria-expanded'), 'false', 'aria-expanded on target is "false"')
        assert.strictEqual($alt.attr('aria-expanded'), 'false', 'aria-expanded on alt is "false"')
        done()
      })

    $target.trigger('click')
  })

  QUnit.test('should change aria-expanded from active accordion target to "false" and set the newly active one to "true"', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var accordionHTML = '<div class="panel-group" id="accordion">'
        + '<div class="panel"/>'
        + '<div class="panel"/>'
        + '<div class="panel"/>'
        + '</div>'
    var $groups = $(accordionHTML).appendTo('#qunit-fixture').find('.panel')

    var $target1 = $('<a role="button" data-toggle="collapse" href="#body1" data-parent="#accordion"/>').appendTo($groups.eq(0))

    $('<div id="body1" aria-expanded="true" class="in"/>').appendTo($groups.eq(0))

    var $target2 = $('<a class="collapsed" data-toggle="collapse" role="button" href="#body2" data-parent="#accordion"/>').appendTo($groups.eq(1))

    $('<div id="body2" aria-expanded="false"/>').appendTo($groups.eq(1))

    var $target3 = $('<a class="collapsed" data-toggle="collapse" role="button" href="#body3" data-parent="#accordion"/>').appendTo($groups.eq(2))

    $('<div id="body3" aria-expanded="false"/>')
      .appendTo($groups.eq(2))
      .on('shown.bs.collapse', function () {
        assert.strictEqual($target1.attr('aria-expanded'), 'false', 'inactive target 1 has aria-expanded="false"')
        assert.strictEqual($target2.attr('aria-expanded'), 'false', 'inactive target 2 has aria-expanded="false"')
        assert.strictEqual($target3.attr('aria-expanded'), 'true', 'active target 3 has aria-expanded="false"')

        done()
      })

    $target3.trigger('click')
  })

  QUnit.test('should not fire show event if show is prevented because other element is still transitioning', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var accordionHTML = '<div id="accordion">'
        + '<div class="panel"/>'
        + '<div class="panel"/>'
        + '</div>'
    var showFired = false
    var $groups   = $(accordionHTML).appendTo('#qunit-fixture').find('.panel')

    var $target1 = $('<a role="button" data-toggle="collapse" href="#body1" data-parent="#accordion"/>').appendTo($groups.eq(0))

    $('<div id="body1" class="collapse"/>')
      .appendTo($groups.eq(0))
      .on('show.bs.collapse', function () {
        showFired = true
      })

    var $target2 = $('<a role="button" data-toggle="collapse" href="#body2" data-parent="#accordion"/>').appendTo($groups.eq(1))
    var $body2   = $('<div id="body2" class="collapse"/>').appendTo($groups.eq(1))

    $target2.trigger('click')

    $body2
      .toggleClass('in collapsing')
      .data('bs.collapse').transitioning = 1

    $target1.trigger('click')

    setTimeout(function () {
      assert.ok(!showFired, 'show event did not fire')
      done()
    }, 1)
  })

  QUnit.test('should add "collapsed" class to target when collapse is hidden via manual invocation', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" href="#test1"/>').appendTo('#qunit-fixture')

    $('<div id="test1" class="in"/>')
      .appendTo('#qunit-fixture')
      .on('hidden.bs.collapse', function () {
        assert.ok($target.hasClass('collapsed'))
        done()
      })
      .bootstrapCollapse('hide')
  })

  QUnit.test('should remove "collapsed" class from target when collapse is shown via manual invocation', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" class="collapsed" href="#test1"/>').appendTo('#qunit-fixture')

    $('<div id="test1"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.collapse', function () {
        assert.ok(!$target.hasClass('collapsed'))
        done()
      })
      .bootstrapCollapse('show')
  })

})
