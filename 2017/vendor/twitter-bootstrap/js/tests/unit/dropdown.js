$(function () {

  module('dropdowns plugin')

  test('should be defined on jquery object', function () {
    ok($(document.body).dropdown, 'dropdown method is defined')
  })

  module('dropdowns', {
    setup: function() {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapDropdown = $.fn.dropdown.noConflict()
    },
    teardown: function() {
      $.fn.dropdown = $.fn.bootstrapDropdown
      delete $.fn.bootstrapDropdown
    }
  })

  test('should provide no conflict', function () {
    ok(!$.fn.dropdown, 'dropdown was set back to undefined (org value)')
  })

  test('should return element', function () {
    var el = $('<div />')
    ok(el.bootstrapDropdown()[0] === el[0], 'same element returned')
  })

  test('should not open dropdown if target is disabled', function () {
    var dropdownHTML = '<ul class="tabs">' +
        '<li class="dropdown">' +
        '<button disabled href="#" class="btn dropdown-toggle" data-toggle="dropdown">Dropdown</button>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="#">Secondary link</a></li>' +
        '<li><a href="#">Something else here</a></li>' +
        '<li class="divider"></li>' +
        '<li><a href="#">Another link</a></li>' +
        '</ul>' +
        '</li>' +
        '</ul>',
        dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').bootstrapDropdown().click()

    ok(!dropdown.parent('.dropdown').hasClass('open'), 'open class added on click')
  })

  test('should not open dropdown if target is disabled', function () {
    var dropdownHTML = '<ul class="tabs">' +
        '<li class="dropdown">' +
        '<button href="#" class="btn dropdown-toggle disabled" data-toggle="dropdown">Dropdown</button>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="#">Secondary link</a></li>' +
        '<li><a href="#">Something else here</a></li>' +
        '<li class="divider"></li>' +
        '<li><a href="#">Another link</a></li>' +
        '</ul>' +
        '</li>' +
        '</ul>',
        dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').bootstrapDropdown().click()

    ok(!dropdown.parent('.dropdown').hasClass('open'), 'open class added on click')
  })

  test('should add class open to menu if clicked', function () {
    var dropdownHTML = '<ul class="tabs">' +
        '<li class="dropdown">' +
        '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="#">Secondary link</a></li>' +
        '<li><a href="#">Something else here</a></li>' +
        '<li class="divider"></li>' +
        '<li><a href="#">Another link</a></li>' +
        '</ul>' +
        '</li>' +
        '</ul>',
        dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').bootstrapDropdown().click()

    ok(dropdown.parent('.dropdown').hasClass('open'), 'open class added on click')
  })

  test('should test if element has a # before assuming it\'s a selector', function () {
    var dropdownHTML = '<ul class="tabs">' +
        '<li class="dropdown">' +
        '<a href="/foo/" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="#">Secondary link</a></li>' +
        '<li><a href="#">Something else here</a></li>' +
        '<li class="divider"></li>' +
        '<li><a href="#">Another link</a></li>' +
        '</ul>' +
        '</li>' +
        '</ul>',
        dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').bootstrapDropdown().click()

    ok(dropdown.parent('.dropdown').hasClass('open'), 'open class added on click')
  })


  test('should remove open class if body clicked', function () {
    var dropdownHTML = '<ul class="tabs">' +
        '<li class="dropdown">' +
        '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="#">Secondary link</a></li>' +
        '<li><a href="#">Something else here</a></li>' +
        '<li class="divider"></li>' +
        '<li><a href="#">Another link</a></li>' +
        '</ul>' +
        '</li>' +
        '</ul>',
        dropdown = $(dropdownHTML)
          .appendTo('#qunit-fixture')
          .find('[data-toggle="dropdown"]')
          .bootstrapDropdown()
          .click()

    ok(dropdown.parent('.dropdown').hasClass('open'), 'open class added on click')
    $('body').click()
    ok(!dropdown.parent('.dropdown').hasClass('open'), 'open class removed')
    dropdown.remove()
  })

  test('should remove open class if body clicked, with multiple drop downs', function () {
    var dropdownHTML = '<ul class="nav">' +
        '    <li><a href="#menu1">Menu 1</a></li>' +
        '    <li class="dropdown" id="testmenu">' +
        '      <a class="dropdown-toggle" data-toggle="dropdown" href="#testmenu">Test menu <b class="caret"></b></a>' +
        '      <ul class="dropdown-menu" role="menu">' +
        '        <li><a href="#sub1">Submenu 1</a></li>' +
        '      </ul>' +
        '    </li>' +
        '</ul>' +
        '<div class="btn-group">' +
        '    <button class="btn">Actions</button>' +
        '    <button class="btn dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>' +
        '    <ul class="dropdown-menu">' +
        '        <li><a href="#">Action 1</a></li>' +
        '    </ul>' +
        '</div>',
        dropdowns = $(dropdownHTML).appendTo('#qunit-fixture').find('[data-toggle="dropdown"]'),
        first = dropdowns.first(),
        last = dropdowns.last()

    ok(dropdowns.length == 2, 'Should be two dropdowns')

    first.click()
    ok(first.parents('.open').length == 1, 'open class added on click')
    ok($('#qunit-fixture .open').length == 1, 'only one object is open')
    $('body').click()
    ok($('#qunit-fixture .open').length === 0, 'open class removed')

    last.click()
    ok(last.parent('.open').length == 1, 'open class added on click')
    ok($('#qunit-fixture .open').length == 1, 'only one object is open')
    $('body').click()
    ok($('#qunit-fixture .open').length === 0, 'open class removed')

    $('#qunit-fixture').html('')
  })

  test('should fire show and hide event', function () {
    var dropdownHTML = '<ul class="tabs">' +
        '<li class="dropdown">' +
        '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="#">Secondary link</a></li>' +
        '<li><a href="#">Something else here</a></li>' +
        '<li class="divider"></li>' +
        '<li><a href="#">Another link</a></li>' +
        '</ul>' +
        '</li>' +
        '</ul>',
        dropdown = $(dropdownHTML)
          .appendTo('#qunit-fixture')
          .find('[data-toggle="dropdown"]')
          .bootstrapDropdown()

    stop()

    dropdown
      .parent('.dropdown')
      .on('show.bs.dropdown', function () {
        ok(true, 'show was called')
      })
      .on('hide.bs.dropdown', function () {
        ok(true, 'hide was called')
        start()
      })

    dropdown.click()
    $(document.body).click()
  })


  test('should fire shown and hiden event', function () {
    var dropdownHTML = '<ul class="tabs">' +
        '<li class="dropdown">' +
        '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="#">Secondary link</a></li>' +
        '<li><a href="#">Something else here</a></li>' +
        '<li class="divider"></li>' +
        '<li><a href="#">Another link</a></li>' +
        '</ul>' +
        '</li>' +
        '</ul>',
        dropdown = $(dropdownHTML)
          .appendTo('#qunit-fixture')
          .find('[data-toggle="dropdown"]')
          .bootstrapDropdown()

    stop()

    dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        ok(true, 'show was called')
      })
      .on('hidden.bs.dropdown', function () {
        ok(true, 'hide was called')
        start()
      })

    dropdown.click()
    $(document.body).click()
  })

})
'click')
    assert.strictEqual($first.parents('.open').length, 1, '"open" class added on click')
    assert.strictEqual($('#qunit-fixture .open').length, 1, 'only one dropdown is open')
    $(document.body).trigger('click')
    assert.strictEqual($('#qunit-fixture .open').length, 0, '"open" class removed')

    $last.trigger('click')
    assert.strictEqual($last.parent('.open').length, 1, '"open" class added on click')
    assert.strictEqual($('#qunit-fixture .open').length, 1, 'only one dropdown is open')
    $(document.body).trigger('click')
    assert.strictEqual($('#qunit-fixture .open').length, 0, '"open" class removed')
  })

  QUnit.test('should fire show and hide event', function (assert) {
    assert.expect(2)
    var dropdownHTML = '<ul class="tabs">'
        + '<li class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<ul class="dropdown-menu">'
        + '<li><a href="#">Secondary link</a></li>'
        + '<li><a href="#">Something else here</a></li>'
        + '<li class="divider"/>'
        + '<li><a href="#">Another link</a></li>'
        + '</ul>'
        + '</li>'
        + '</ul>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()

    var done = assert.async()

    $dropdown
      .parent('.dropdown')
      .on('show.bs.dropdown', function () {
        assert.ok(true, 'show was fired')
      })
      .on('hide.bs.dropdown', function () {
        assert.ok(true, 'hide was fired')
        done()
      })

    $dropdown.trigger('click')
    $(document.body).trigger('click')
  })


  QUnit.test('should fire shown and hidden event', function (assert) {
    assert.expect(2)
    var dropdownHTML = '<ul class="tabs">'
        + '<li class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<ul class="dropdown-menu">'
        + '<li><a href="#">Secondary link</a></li>'
        + '<li><a href="#">Something else here</a></li>'
        + '<li class="divider"/>'
        + '<li><a href="#">Another link</a></li>'
        + '</ul>'
        + '</li>'
        + '</ul>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()

    var done = assert.async()

    $dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.ok(true, 'shown was fired')
      })
      .on('hidden.bs.dropdown', function () {
        assert.ok(true, 'hidden was fired')
        done()
      })

    $dropdown.trigger('click')
    $(document.body).trigger('click')
  })

  QUnit.test('should fire shown and hidden event with a relatedTarget', function (assert) {
    assert.expect(2)
    var dropdownHTML = '<ul class="tabs">'
        + '<li class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<ul class="dropdown-menu">'
        + '<li><a href="#">Secondary link</a></li>'
        + '<li><a href="#">Something else here</a></li>'
        + '<li class="divider"/>'
        + '<li><a href="#">Another link</a></li>'
        + '</ul>'
        + '</li>'
        + '</ul>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()
    var done = assert.async()

    $dropdown.parent('.dropdown')
      .on('hidden.bs.dropdown', function (e) {
        assert.strictEqual(e.relatedTarget, $dropdown[0])
        done()
      })
      .on('shown.bs.dropdown', function (e) {
        assert.strictEqual(e.relatedTarget, $dropdown[0])
        $(document.body).trigger('click')
      })

    $dropdown.trigger('click')
  })

  QUnit.test('should ignore keyboard events within <input>s and <textarea>s', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var dropdownHTML = '<ul class="tabs">'
        + '<li class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<ul class="dropdown-menu">'
        + '<li><a href="#">Secondary link</a></li>'
        + '<li><a href="#">Something else here</a></li>'
        + '<li class="divider"/>'
        + '<li><a href="#">Another link</a></li>'
        + '<li><input type="text" id="input"></li>'
        + '<li><textarea id="textarea"/></li>'
        + '</ul>'
        + '</li>'
        + '</ul>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()

    var $input = $('#input')
    var $textarea = $('#textarea')

    $dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.ok(true, 'shown was fired')

        $input.trigger('focus').trigger($.Event('keydown', { which: 38 }))
        assert.ok($(document.activeElement).is($input), 'input still focused')

        $textarea.trigger('focus').trigger($.Event('keydown', { which: 38 }))
        assert.ok($(document.activeElement).is($textarea), 'textarea still focused')

        done()
      })

    $dropdown.trigger('click')
  })

  QUnit.test('should skip disabled element when using keyboard navigation', function (assert) {
    assert.expect(1)
    var dropdownHTML = '<ul class="tabs">'
        + '<li class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<ul class="dropdown-menu">'
        + '<li class="disabled"><a href="#">Disabled link</a></li>'
        + '<li><a href="#">Another link</a></li>'
        + '</ul>'
        + '</li>'
        + '</ul>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()
      .trigger('click')

    $dropdown.trigger($.Event('keydown', { which: 40 }))
    $dropdown.trigger($.Event('keydown', { which: 40 }))

    assert.ok(!$(document.activeElement).parent().is('.disabled'), '.disabled is not focused')
  })

  QUnit.test('should not close the dropdown if the user clicks on a text field', function (assert) {
    assert.expect(1)
    var dropdownHTML = '<div class="btn-group">'
        + '<button type="button" data-toggle="dropdown">Dropdown</button>'
        + '<ul class="dropdown-menu">'
        + '<li><input id="textField" type="text" /></li>'
        + '</ul>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()
      .trigger('click')

    $('#textField').trigger('click')

    assert.ok($dropdown.parent('.btn-group').hasClass('open'), 'dropdown menu is open')
  })

  QUnit.test('should not close the dropdown if the user clicks on a textarea', function (assert) {
    assert.expect(1)
    var dropdownHTML = '<div class="btn-group">'
        + '<button type="button" data-toggle="dropdown">Dropdown</button>'
        + '<ul class="dropdown-menu">'
        + '<li><textarea id="textArea"></textarea></li>'
        + '</ul>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()
      .trigger('click')

    $('#textArea').trigger('click')

    assert.ok($dropdown.parent('.btn-group').hasClass('open'), 'dropdown menu is open')
  })
})
