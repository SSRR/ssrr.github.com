$(function () {

  module('modal plugin')

  test('should be defined on jquery object', function () {
    var div = $('<div id="modal-test"></div>')
    ok(div.modal, 'modal method is defined')
  })

  module('modal', {
    setup: function() {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapModal = $.fn.modal.noConflict()
    },
    teardown: function() {
      $.fn.modal = $.fn.bootstrapModal
      delete $.fn.bootstrapModal
    }
  })

  test('should provide no conflict', function () {
    ok(!$.fn.modal, 'modal was set back to undefined (orig value)')
  })

  test('should return element', function () {
    var div = $('<div id="modal-test"></div>')
    ok(div.bootstrapModal() == div, 'document.body returned')
    $('#modal-test').remove()
  })

  test('should expose defaults var for settings', function () {
    ok($.fn.bootstrapModal.Constructor.DEFAULTS, 'default object exposed')
  })

  test('should insert into dom when show method is called', function () {
    stop()
    $.support.transition = false
    $('<div id="modal-test"></div>')
      .on('shown.bs.modal', function () {
        ok($('#modal-test').length, 'modal inserted into dom')
        $(this).remove()
        start()
      })
      .bootstrapModal('show')
  })

  test('should fire show event', function () {
    stop()
    $.support.transition = false
    $('<div id="modal-test"></div>')
      .on('show.bs.modal', function () {
        ok(true, 'show was called')
      })
      .on('shown.bs.modal', function () {
        $(this).remove()
        start()
      })
      .bootstrapModal('show')
  })

  test('should not fire shown when default prevented', function () {
    stop()
    $.support.transition = false
    $('<div id="modal-test"></div>')
      .on('show.bs.modal', function (e) {
        e.preventDefault()
        ok(true, 'show was called')
        start()
      })
      .on('shown.bs.modal', function () {
        ok(false, 'shown was called')
      })
      .bootstrapModal('show')
  })

  test('should hide modal when hide is called', function () {
    stop()
    $.support.transition = false

    $('<div id="modal-test"></div>')
      .on('shown.bs.modal', function () {
        ok($('#modal-test').is(':visible'), 'modal visible')
        ok($('#modal-test').length, 'modal inserted into dom')
        $(this).bootstrapModal('hide')
      })
      .on('hidden.bs.modal', function () {
        ok(!$('#modal-test').is(':visible'), 'modal hidden')
        $('#modal-test').remove()
        start()
      })
      .bootstrapModal('show')
  })

  test('should toggle when toggle is called', function () {
    stop()
    $.support.transition = false
    var div = $('<div id="modal-test"></div>')
    div
      .on('shown.bs.modal', function () {
        ok($('#modal-test').is(':visible'), 'modal visible')
        ok($('#modal-test').length, 'modal inserted into dom')
        div.bootstrapModal('toggle')
      })
      .on('hidden.bs.modal', function () {
        ok(!$('#modal-test').is(':visible'), 'modal hidden')
        div.remove()
        start()
      })
      .bootstrapModal('toggle')
  })

  test('should remove from dom when click [data-dismiss="modal"]', function () {
    stop()
    $.support.transition = false
    var div = $('<div id="modal-test"><span class="close" data-dismiss="modal"></span></div>')
    div
      .on('shown.bs.modal', function () {
        ok($('#modal-test').is(':visible'), 'modal visible')
        ok($('#modal-test').length, 'modal inserted into dom')
        div.find('.close').click()
      })
      .on('hidden.bs.modal', function () {
        ok(!$('#modal-test').is(':visible'), 'modal hidden')
        div.remove()
        start()
      })
      .bootstrapModal('toggle')
  })

  test('should allow modal close with "backdrop:false"', function () {
    stop()
    $.support.transition = false
    var div = $('<div>', { id: 'modal-test', 'data-backdrop': false })
    div
      .on('shown.bs.modal', function () {
        ok($('#modal-test').is(':visible'), 'modal visible')
        div.bootstrapModal('hide')
      })
      .on('hidden.bs.modal', function () {
        ok(!$('#modal-test').is(':visible'), 'modal hidden')
        div.remove()
        start()
      })
      .bootstrapModal('show')
  })

  test('should close modal when clicking outside of modal-content', function () {
    stop()
    $.support.transition = false
    var div = $('<div id="modal-test"><div class="contents"></div></div>')
    div
      .on('shown.bs.modal', function () {
        ok($('#modal-test').length, 'modal insterted into dom')
        $('.contents').click()
        ok($('#modal-test').is(':visible'), 'modal visible')
        $('#modal-test').click()
      })
      .on('hidden.bs.modal', function () {
        ok(!$('#modal-test').is(':visible'), 'modal hidden')
        div.remove()
        start()
      })
      .bootstrapModal('show')
  })

  test('should trigger hide event once when clicking outside of modal-content', function () {
    stop()
    $.support.transition = false

    var triggered
    var div = $('<div id="modal-test"><div class="contents"></div></div>')

    div
      .on('shown.bs.modal', function () {
        triggered = 0
        $('#modal-test').click()
      })
      .on('hide.bs.modal', function () {
        triggered += 1
        ok(triggered === 1, 'modal hide triggered once')
        start()
      })
      .bootstrapModal('show')
  })

  test('should close reopened modal with [data-dismiss="modal"] click', function () {
    stop()
    $.support.transition = false
    var div = $('<div id="modal-test"><div class="contents"><div id="close" data-dismiss="modal"></div></div></div>')
    div
      .on('shown.bs.modal', function () {
        $('#close').click()
        ok(!$('#modal-test').is(':visible'), 'modal hidden')
      })
      .one('hidden.bs.modal', function () {
        div.one('hidden.bs.modal', function () {
          start()
        }).bootstrapModal('show')
      })
      .bootstrapModal('show')

    div.remove()
  })
})
est"/>')
    $div
      .on('shown.bs.modal', function () {
        assert.ok($('#modal-test').length, 'modal inserted into dom')
        assert.ok($('#modal-test').is(':visible'), 'modal visible')
        $div.trigger($.Event('keyup', { which: 27 }))

        setTimeout(function () {
          assert.ok($div.is(':visible'), 'modal still visible')
          $div.remove()
          done()
        }, 0)
      })
      .bootstrapModal('show')
  })

  QUnit.test('should trigger hide event once when clicking outside of modal-content', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var triggered

    $('<div id="modal-test"><div class="contents"/></div>')
      .on('shown.bs.modal', function () {
        triggered = 0
        $('#modal-test').trigger('click')
      })
      .on('hide.bs.modal', function () {
        triggered += 1
        assert.strictEqual(triggered, 1, 'modal hide triggered once')
        done()
      })
      .bootstrapModal('show')
  })

  QUnit.test('should close reopened modal with [data-dismiss="modal"] click', function (assert) {
    assert.expect(2)
    var done = assert.async()

    $('<div id="modal-test"><div class="contents"><div id="close" data-dismiss="modal"/></div></div>')
      .one('shown.bs.modal', function () {
        $('#close').trigger('click')
      })
      .one('hidden.bs.modal', function () {
        // after one open-close cycle
        assert.ok(!$('#modal-test').is(':visible'), 'modal hidden')
        $(this)
          .one('shown.bs.modal', function () {
            $('#close').trigger('click')
          })
          .one('hidden.bs.modal', function () {
            assert.ok(!$('#modal-test').is(':visible'), 'modal hidden')
            done()
          })
          .bootstrapModal('show')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should restore focus to toggling element when modal is hidden after having been opened via data-api', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $toggleBtn = $('<button data-toggle="modal" data-target="#modal-test"/>').appendTo('#qunit-fixture')

    $('<div id="modal-test"><div class="contents"><div id="close" data-dismiss="modal"/></div></div>')
      .on('hidden.bs.modal', function () {
        setTimeout(function () {
          assert.ok($(document.activeElement).is($toggleBtn), 'toggling element is once again focused')
          done()
        }, 0)
      })
      .on('shown.bs.modal', function () {
        $('#close').trigger('click')
      })
      .appendTo('#qunit-fixture')

    $toggleBtn.trigger('click')
  })

  QUnit.test('should not restore focus to toggling element if the associated show event gets prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var $toggleBtn = $('<button data-toggle="modal" data-target="#modal-test"/>').appendTo('#qunit-fixture')
    var $otherBtn = $('<button id="other-btn"/>').appendTo('#qunit-fixture')

    $('<div id="modal-test"><div class="contents"><div id="close" data-dismiss="modal"/></div>')
      .one('show.bs.modal', function (e) {
        e.preventDefault()
        $otherBtn.trigger('focus')
        setTimeout($.proxy(function () {
          $(this).bootstrapModal('show')
        }, this), 0)
      })
      .on('hidden.bs.modal', function () {
        setTimeout(function () {
          assert.ok($(document.activeElement).is($otherBtn), 'focus returned to toggling element')
          done()
        }, 0)
      })
      .on('shown.bs.modal', function () {
        $('#close').trigger('click')
      })
      .appendTo('#qunit-fixture')

    $toggleBtn.trigger('click')
  })

  QUnit.test('should restore inline body padding after closing', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var originalBodyPad = 0
    var $body = $(document.body)

    $body.css('padding-right', originalBodyPad)

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        var currentBodyPad = parseInt($body.css('padding-right'), 10)
        assert.notStrictEqual($body.attr('style'), '', 'body has non-empty style attribute')
        assert.strictEqual(currentBodyPad, originalBodyPad, 'original body padding was not changed')
        $body.removeAttr('style')
        done()
      })
      .on('shown.bs.modal', function () {
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should ignore values set via CSS when trying to restore body padding after closing', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var $body = $(document.body)
    var $style = $('<style>body { padding-right: 42px; }</style>').appendTo('head')

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        assert.ok(!$body.attr('style'), 'body does not have inline padding set')
        $style.remove()
        done()
      })
      .on('shown.bs.modal', function () {
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should ignore other inline styles when trying to restore body padding after closing', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var $body = $(document.body)
    var $style = $('<style>body { padding-right: 42px; }</style>').appendTo('head')

    $body.css('color', 'red')

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        assert.strictEqual($body[0].style.paddingRight, '', 'body does not have inline padding set')
        assert.strictEqual($body[0].style.color, 'red', 'body still has other inline styles set')
        $body.removeAttr('style')
        $style.remove()
        done()
      })
      .on('shown.bs.modal', function () {
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should properly restore non-pixel inline body padding after closing', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var $body = $(document.body)

    $body.css('padding-right', '5%')

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        assert.strictEqual($body[0].style.paddingRight, '5%', 'body does not have inline padding set')
        $body.removeAttr('style')
        done()
      })
      .on('shown.bs.modal', function () {
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })
})
