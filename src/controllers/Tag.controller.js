// Tag.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Tag = require('../models/tag/Tag.model');
const TagSet = require('../models/tag/TagSet.model');

const OBJECT_NAME = 'tag';

module.exports = class TagCtrl extends BaseCtrl {
  // -------------------------------------
  // Aliases
  // -------------------------------------

  get(tag) {
    return tag ? new Tag(this.getTag(tag)) : new TagSet(this.getTags());
  }

  create(data) {
    return this.postTag(new Tag(data));
  }

  update(tag, data) {
    return this.patchTag(tag, data);
  }

  delete(tag) {
    return this.deleteTag(tag);
  }

  // -------------------------------------
  // Defaults
  // -------------------------------------

  getTags() {
    return this.process(this.appliance.getTags(), OBJECT_NAME);
  }

  getTag(tag) {
    return this.process(this.appliance.getTag(tag.id), OBJECT_NAME);
  }

  postTag(tag) {
    return this.process(this.appliance.postTag(tag), OBJECT_NAME);
  }

  patchTag(tag, data) {
    return this.process(this.appliance.patchTag(tag.id, data), OBJECT_NAME);
  }

  deleteTag(tag) {
    return this.process(this.appliance.deleteTag(tag.id), OBJECT_NAME);
  }
};
