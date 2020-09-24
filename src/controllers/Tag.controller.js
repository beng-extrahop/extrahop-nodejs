// Tag.controller.js

const BaseCtrl = require('./_base/BaseCtrl.controller');
const Tag = require('../models/tag/Tag.model');
const TagSet = require('../models/tag/TagSet.model');

module.exports = class TagCtrl extends BaseCtrl {
  // -------------------------------------
  // Defaults
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
  // Base Functions
  // -------------------------------------

  getTags() {
    return this.process(this.appliance.getTags(), 'tags');
  }

  getTag(tag) {
    return this.process(this.appliance.getTag(tag.id), 'tag');
  }

  postTag(tag) {
    return this.process(this.appliance.postTag(tag), 'tag');
  }

  patchTag(tag, data) {
    return this.process(this.appliance.patchTag(tag.id, data), `tag (id: ${tag.id})`);
  }

  deleteTag(tag) {
    return this.process(this.appliance.deleteTag(tag.id), `tag (id: ${tag.id})`);
  }
};
