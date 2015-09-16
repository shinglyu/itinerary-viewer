var expect = chai.expect;
describe('Random', function(){
  describe('randomInt(from, to)', function(){
    it('random within range', function(){
      for (var i = 0, len = 1000; i < len; i++) {
        var from = 0;
        var to   = 11;
        var result = randomInt(from, to)
        expect(result).to.be.at.least(from);
        expect(result).to.be.at.most(to);
      }
    })
  })
})

describe('SearchStr', function(){
  describe('genSearchStr()', function(){
    it('should generate a string', function(){
      var sstr = genSearchStr();
      expect(sstr).to.be.a('string');
    })
  })
  describe('genLink(searchStr, source)', function(){
    it('can generate a YouTube link',function(){
      var searchStr = "Bach violin sonata";
      var link = genLink(searchStr, 'YouTube')
      expect(link).to.be.a('string');
      expect(link).to.contain('youtube');
      expect(link).to.not.contain(' ');
      //is a vlid url?
    })
  })
})

describe('UI', function(){
  after(function(){
    window.open.restore();
  })
  describe('luckyBtn()', function(){
    it('should open a tab', function(){
      sinon.stub(window, 'open');
      luckyBtn();
      expect(window.open.called).to.be.ok;
      //smoketest
    })
  })
})
