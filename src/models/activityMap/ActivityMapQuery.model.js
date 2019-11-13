// AcitivtyMapQuery.model.js

const BaseObject = require('../../models/_base/BaseObject.model');

module.exports = class AcitivtyMapQuery extends BaseObject {
  constructor(activityMapQuery = {}) {
    super();
    /* TODO */
    Object.keys(activityMapQuery).forEach(key => this[key] = activityMapQuery[key]);

    const referenceObj = {
      "edge_annotations": [
        "string"
      ],
      "from": 0,
      "until": 0,
      "walks": [
        {
          "origins": [
            {
              "object_id": 0,
              "object_type": "all_devices"
            }
          ],
          "steps": [
            {
              "peer_in": [
                {
                  "object_id": 0,
                  "object_type": "all_devices"
                }
              ],
              "peer_not_in": [
                {
                  "object_id": 0,
                  "object_type": "all_devices"
                }
              ],
              "relationships": [
                {
                  "protocol": "string",
                  "role": "any"
                }
              ]
            }
          ]
        }
      ],
      "weighting": "bytes"
    };
  }
}


