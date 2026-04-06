/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
var mongoose = require('mongoose');
var {v4: uuidv4} = require('uuid');

mongoose.createConnection(config.mongoDBConnection);
const Schema = mongoose.Schema;

// --- Begin: B2B Partner End Users Leads Check List Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  lid: {type: String, required: true},
  leadId: {type: String, required: true},
  lType: {type: String, required: true}, // Leads, H1B Petitions, Offer Letters

  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},
  org: {type: String, required: true},
  orgName: {type: String, required: true},
  orgCode: {type: String, required: true},
  team: {type: String, required: true},
  tName: {type: String, required: true}, // Team Name
  tCode: {type: String, required: true}, // Team Code
  report: {type: String, required: true},
  rprtName: {type: String, required: true},
  rprtPrimary: {type: String, required: true},
  pReports: {type: [String], required: true}, // Parent Reports

  euUser: {type: String, required: true},
  euName: {type: String, required: true},
  euMobCcNum: {type: String, required: false}, // Mobile Number with Country Code
  euEmID: {type: String, required: true, trim: true}, // Email ID
  euUID: {type: String, required: true}, // Reference Unique ID
  euPrimary: {type: String, required: true}, // Mobile Number or Email

  template: {type: String, required: true}, // Template _id
  tempLevel: {type: String, required: true}, // Organization, Team, User
  tempCat: {type: String, required: true}, // Template Category
  tempName: {type: String, required: true}, // Template Name
  tempNotes: {type: String, required: false}, // Template Notes
  tempUrIDs: {type: [String], required: true},
  tempUserRoles: {type: [String], required: true},
  tempUrData: [{
    _id: {type: String, required: true}, // User Role: _id
    userRole: {type: String, required: true}, // User Role: rName
    urSeq: {type: Number, required: true}, // User Role Sequence: rSeq
  }],

  tdCount: {type: Number, default: 0}, // Template Data Count
  tdoCount: {type: Number, default: 0}, // Template Data Organization Count
  tdcCount: {type: Number, default: 0}, // Template Data Consultants Count
  tdpCount: {type: Number, default: 0}, // Template Data Provided Count
  tdaCount: {type: Number, default: 0}, // Template Data Approved Count

  tempcStatus: {type: String, default: 'Open'}, // Consultant Status: Open, Started, Completed, Closed
  tempoStatus: {type: String, default: 'Open'}, // Organization Status: Open, Started, Completed, Closed
  tempcSeq: {type: String, default: '1'}, // Consultant Sequence: Open = 1, Started = 2, Completed = 3, Closed = 4

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

schema.index({lid: 1, template: 1}, {unique: 1});
schema.index({delFlag: -1, b2b: 1, lid: 1, tempCat: 1});
schema.index({delFlag: -1, b2b: 1, euUser: 1, tempUserRoles: 1});
schema.index({tempcSeq: 1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BEuAppliedTemps, schema);
// --- End: B2B Partner End Users Leads Check List Schema --- //
