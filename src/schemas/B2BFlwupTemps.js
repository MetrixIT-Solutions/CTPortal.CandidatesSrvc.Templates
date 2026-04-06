/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
var mongoose = require('mongoose');
var {v4: uuidv4} = require('uuid');

mongoose.createConnection(config.mongoDBConnection);
const Schema = mongoose.Schema;

// --- Begin: B2B Organization / Team / Users Follow Up Templates Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},

  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},

  org: {type: String, required: true},
  orgName: {type: String, required: true},
  orgCode: {type: String, required: true},
  orgs: {type: [String], required: false}, // Organizations IDs(_id)
  team: {type: String, required: false}, // Team._id
  tName: {type: String, required: false}, // oTeam
  tCode: {type: String, required: false}, // otCode
  pTeamIDs: {type: [String], required: false}, // ['', '']
  botruct: {type: String, required: true, index: true, unique: true}, // b2b_org_urID_category_tempName || b2b_org_urID_team_category_tempName || b2b_org_urID_user_category_tempName
  list: {type: [String], required: true}, // org_urID || org_urID_team || org_urID_user
  apply: {type: [String], required: true}, // org_urID_category || org_urID_team_category || org_urID_user_category

  user: {type: String, required: false},
  uName: {type: String, required: false},
  uRefID: {type: String, required: false},
  uPrimary: {type: String, required: false},
  urIDs: {type: [String], required: true},
  userRoles: {type: [String], required: true},
  urData: [{
    _id: {type: String, required: true}, // User Role: _id
    userRole: {type: String, required: true}, // User Role: rName
    urSeq: {type: Number, required: true}, // User Role Sequence: rSeq
  }],

  tempLevel: {type: String, required: true}, // Organization, Team, User
  tempCat: {type: String, required: true}, // Template Category
  tempName: {type: String, required: true}, // Template Name
  tempSeq: {type: Number, required: true},
  tempNotes: {type: String, required: false}, // Template Notes
  tStatus: {type: String, required: true}, // Template Status: Active, Inactive

  tempData: [{ // Max 20
    _id: {type: String, required: true}, // name
    seq: {type: Number, required: true},
    dataType: {type: String, required: true},
    data: {type: [String], required: false},
    dataObj: {type: Object, required: false},
    level: {type: String, required: true},
    display: {type: String, required: true},
    mandatory: {type: Boolean, default: false},
    limit: {type: Number, required: false},
    notes: {type: String, required: false},
  }],

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuType: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cuName: {type: String, required: true}, // Created Users.pName
  cDate: {type: Date, required: true}, // Date & Time
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  uuType: {type: String, required: true}, // Updated User Type
  uUser: {type: String, required: true, trim: true}, // Updated Users._id
  uuName: {type: String, required: true}, // Updated Users.pName
  uDate: {type: Date, required: true}, // Date & Time
  uDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
});

schema.index({userRole: 'text', uName: 'text', tempCat: 'text', tempName: 'text'});
schema.index({delFlag: -1, b2b: 1, org: 1});
schema.index({delFlag: -1, b2b: 1, list: 1});
schema.index({delFlag: -1, b2b: 1, apply: 1, tStatus: 1});
schema.index({tempSeq: 1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BFlwupTemps, schema);
// --- End: B2B Organization / Team / Users Follow Up Templates Schema --- //
