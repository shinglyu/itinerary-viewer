var expect = require('chai').expect;
var React = require('react');
var Day = require('../js/itineary_components').Day;
var NodeIcon = require('../js/itineary_components').NodeIcon;
var Node= require('../js/itineary_components').Node;
var sd = require('skin-deep');

describe('NodeIcon component', function() {
  var instance, instance;

  beforeEach(function() {
    var tree = sd.shallowRender(React.createElement(NodeIcon, {'type':'S'}));

    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();
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
    tree = sd.shallowRender(React.createElement(Node, {node: {type:'SG', title: "Find route", description: "http://maps.google.com/maps?saddr=foo&daddr=bar&dirflg=r"}}));

    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();
  });
  it('should render a suggestion link given type SG', function() {
    var url = "http://maps.google.com/maps?saddr=foo&daddr=bar&dirflg=r"
    var tree = sd.shallowRender(React.createElement(Node, {node: {type:'SG-route', title: "Find route", description: url}}));
    var desc = tree.findNode('.description')

    expect(desc.type).to.equal('p');
    expect(desc.props.children.type).to.equal('a');
    expect(desc.props.children.props.children).to.equal('Find route');
    expect(desc.props.children.props.href).to.equal(url);
    expect(desc.props.children.props.target).to.equal("_blank");
  });
  it('can draw or not draw a vertical line', function() {
    var tree = sd.shallowRender(React.createElement(Node, {
      drawVertLine: true,
      node: {type:'S', title: "Find route", description: "foo"}
    }));
    expect(tree.findNode('.line')).to.not.equal(false)

    var tree = sd.shallowRender(React.createElement(Node, {
      drawVertLine: false,
      node: {type:'S', title: "Find route", description: "foo"}
    }));
    expect(tree.findNode('.line')).to.equal(false)

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
