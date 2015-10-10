var expect = require('chai').expect;
var React = require('react');
var Day = require('../js/itineary_components').Day;
var NodeIcon = require('../js/itineary_components').NodeIcon;
var Node= require('../js/itineary_components').Node;
var Suggestions= require('../js/itineary_components').Suggestions;
var sd = require('skin-deep');

describe('NodeIcon component', function() {
  var instance, instance;

  beforeEach(function() {
    var tree = sd.shallowRender(React.createElement(NodeIcon, {'type':'S'}));
instance = tree.getMountedInstance(); vdom = tree.getRenderOutput();
  });

  it('should render with correct class', function() {
    expect(vdom.type).to.equal('div');
    expect(vdom.props.className).to.contain('icon');
    expect(vdom.props.className).to.contain('icon-S');
  });
});

describe('Node component', function() {
  var instance, instance, tree;

  beforeEach(function() {
    tree = sd.shallowRender(React.createElement(Node, {
        node: {
          type:'SG', 
          title: "Find route on Google Map", 
          description: "http://maps.google.com/maps?saddr=foo&daddr=bar&dirflg=r"
        },
        config: {}
      })
    );

    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();
  });
  it('should render a suggestion link given type SG', function() {
    var url = "http://maps.google.com/maps?saddr=foo&daddr=bar&dirflg=r"
    var tree = sd.shallowRender(React.createElement(Node, {
      node: {type:'SG-route', title: "Find route on Google Map", description: url},
      config:{}
    }));
    var desc = tree.findNode('.description')

    expect(desc.type).to.equal('p');
    expect(desc.props.children.type).to.equal('a');
    expect(desc.props.children.props.children).to.equal('Find route on Google Map');
    expect(desc.props.children.props.href).to.equal(url);
    expect(desc.props.children.props.target).to.equal("_blank");
  });
  it('can draw or not draw a vertical line', function() {
    var tree = sd.shallowRender(React.createElement(Node, {
      drawVertLine: true,
      node: {type:'S', title: "Find route", description: "foo"},
      config:{}
    }));
    expect(tree.findNode('.line')).to.not.equal(false)

    var tree = sd.shallowRender(React.createElement(Node, {
      drawVertLine: false,
      node: {type:'S', title: "Find route", description: "foo"},
      config:{}
    }));
    expect(tree.findNode('.line')).to.equal(false)

  });

  it('can show suggestions in planningMode', function() {
    var tree = sd.shallowRender(React.createElement(Node, {
      config: {planningMode:"1"},
      node: {type:'S', title: "Great attraction"},
    }));
    //console.log(tree.getRenderOutput().props.children[1].props.children[5].props)//.children[2])
    expect(tree.text()).to.contain('Suggestions')
  });

  it('can show suggestions in planningMode if address is equal to title', function() {
    var tree = sd.shallowRender(React.createElement(Node, {
      config: {planningMode:"1"},
      node: {type:'S', title: "Great attraction", address:"Great attraction"},
    }));
    //console.log(tree.getRenderOutput().props.children[1].props.children[5].props)//.children[2])
    expect(tree.text()).to.contain('Suggestions')
    //expect(tree.findNode('.suggestions')).to.not.equal(false)
  });

  it('can not show suggestions in non-planningMode', function() {
    var tree = sd.shallowRender(React.createElement(Node, {
      config: {},
      node: {type:'S', title: "Great attraction"}
    }));
    expect(tree.findNode('.suggestions')).to.equal(false)

  });
  /*
  it('can show address suggestions', function() {
    var tree = sd.shallowRender(React.createElement(Node, {
      config: {planningMode:"1"},
      node: {type:'S', title: "Great attraction"},
    }));
    var sug = tree.findNode('.suggestions')
    expect(sug.props.children.type).to.equal('a');
    expect(sug.props.children.props.children).to.equal('Find address');
    expect(desc.props.children.props.href).to.contain('google')(url);
  });
  */
});

describe('Suggestions component', function() {
  it('can show address suggestion if address is empty', function(){
    var node =  {type:'S', title: "Great attraction"}
    var tree = sd.shallowRender(React.createElement(Suggestions, {
      node: node
    }));
    var sug = tree.findNode('.suggestions').props.children
    //console.log(sug.props.children)
    expect(sug.type).to.equal('ul');
    var li = sug.props.children[0]
    expect(li.type).to.equal('li')
    var a = li.props.children
    expect(a.type).to.equal('a')
    expect(a.props.children).to.equal('Find address');
    expect(a.props.target).to.equal('_blank');
    expect(a.props.href).to.contain('google');
    expect(a.props.href).to.contain('search');
    expect(a.props.href).to.contain(encodeURI(node.title));
    expect(a.props.href).to.contain('address');
    
  });

  it('can show search detail no matter what', function(){
    var node =  {type:'S', title: "Great attraction"}
    var tree = sd.shallowRender(React.createElement(Suggestions, {
      node: node
    }));
    var sug = tree.findNode('.suggestions').props.children
    //console.log(sug.props.children)
    expect(sug.type).to.equal('ul');
    var li = sug.props.children[1]
    expect(li.type).to.equal('li')
    var a = li.props.children
    expect(a.type).to.equal('a')
    expect(a.props.children).to.equal('Find detail');
    expect(a.props.target).to.equal('_blank');
    expect(a.props.href).to.contain('google');
    expect(a.props.href).to.contain('search');
    expect(a.props.href).to.contain(encodeURI(node.title));
    expect(a.props.href).to.not.contain('address');
    
  });

  it('can show search detail for S node', function(){
    var node =  {type:'S', title: "Great attraction"}
    var tree = sd.shallowRender(React.createElement(Suggestions, {
      node: node
    }));
    var sug = tree.findNode('.suggestions').props.children
    expect(sug).to.be.not.equal(false)
    
    var node =  {type:'T', title: "Train"}
    var tree = sd.shallowRender(React.createElement(Suggestions, {
      node: node
    }));
    var sug = tree.findNode('.suggestions').props.children
    expect(sug).to.be.equal(false)
  });
});

/*
import Post from '../../components/post.react';
import sd from 'skin-deep';

describe('Post component', function() {
  let vdom, instance;

  beforeEach(function() {
    const tree = sd.shallowRender(React.createElement(Post, {title: 'Title', content: '<p>Content</p>'}));

    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();
  });

  it('should render a post title and content', function() {
    const postTitle = vdom.props.children[0];
    const postContent = vdom.props.children[1];

    expect(postTitle.props.children).to.equal('Title');
    expect(postContent.props.children).to.equal('Content');
  });

  it('should render a post title and content (alternative method)', function() {
    const expectedChildren = [
      React.DOM.h2({ className: 'Post-header', onClick: instance.doSomethingOnClick}, 'Title'),
      React.DOM.p({ className: 'Post-content'}, 'Content')
    ];

    expect(vdom.type).to.equal('div');
    expect(vdom.props.className).to.contain('Post');
    expect(vdom.props.children).to.deep.equal(expectedChildren);
  });

  describe('stripParagraphTags method', function() {
    it('should strip <p> tags', function() {
      const strippedText = instance.stripParagraphTags('<p>Some text.</p> <p>More text.</p>');

      expect(strippedText).to.equal('Some text. More text.');
    });
  });
});
*/
