$(function () {

  module('affix plugin')

  test('should be defined on jquery object', function () {
    ok($(document.body).affix, 'affix method is defined')
  })

  module('affix', {
    setup: function() {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapAffix = $.fn.affix.noConflict()
    },
    teardown: function() {
      $.fn.affix = $.fn.bootstrapAffix
      delete $.fn.bootstrapAffix
    }
  })

  test('should provide no conflict', function () {
    ok(!$.fn.affix, 'affix was set back to undefined (org value)')
  })

  test('should return element', function () {
    ok($(document.body).bootstrapAffix()[0] == document.body, 'document.body returned')
  })

  test('should exit early if element is not visible', function () {
    var $affix = $('<div style="display: none"></div>').bootstrapAffix()
    $affix.data('bs.affix').checkPosition()
    ok(!$affix.hasClass('affix'), 'affix class was not added')
  })

  test('should trigger affixed event after affix', function () {
    stop()

    var template = $('<div id="affixTarget"><ul><li>Please affix</li><li>And unaffix</li></ul></div><div id="affixAfter" style="height: 20000px; display:block;"></div>')
    template.appendTo('body')

    $('#affixTarget').bootstrapAffix({
      offset: $('#affixTarget ul').position()
    })

    $('#affixTarget')
      .on('affix.bs.affix', function () {
        ok(true, 'affix event triggered')
      }).on('affixed.bs.affix', function () {
        ok(true,'affixed event triggered')
        $('#affixTarget').remove()
        $('#affixAfter').remove()
        start()
      })

    setTimeout(function () {
      window.scrollTo(0, document.body.scrollHeight)
      setTimeout(function () { window.scroll(0,0) }, 0)
    },0)
  })
})
set: $('#affixTarget ul').position()
    })

    $('#affixTarget')
      .on('affix.bs.affix', function () {
        assert.ok(true, 'affix event fired')
      }).on('affixed.bs.affix', function () {
        assert.ok(true, 'affixed event fired')
        $('#affixTarget, #affixAfter').remove()
        done()
      })

    setTimeout(function () {
      window.scrollTo(0, document.body.scrollHeight)

      setTimeout(function () {
        window.scroll(0, 0)
      }, 16) // for testing in a browser
    }, 0)
  })

  QUnit.test('should affix-top when scrolling up to offset when parent has padding', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var templateHTML = '<div id="padding-offset" style="padding-top: 20px;">'
        + '<div id="affixTopTarget">'
        + '<p>Testing affix-top class is added</p>'
        + '</div>'
        + '<div style="height: 1000px; display: block;"/>'
        + '</div>'
    $(templateHTML).appendTo(document.body)

    $('#affixTopTarget')
      .bootstrapAffix({
        offset: { top: 120, bottom: 0 }
      })
      .on('affixed-top.bs.affix', function () {
        assert.ok($('#affixTopTarget').hasClass('affix-top'), 'affix-top class applied')
        $('#padding-offset').remove()
        done()
      })

    setTimeout(function () {
      window.scrollTo(0, document.body.scrollHeight)

      setTimeout(function () {
        window.scroll(0, 119)
      }, 250)
    }, 250)
  })
})
