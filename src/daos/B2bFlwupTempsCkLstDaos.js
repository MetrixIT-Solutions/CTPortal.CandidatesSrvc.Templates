/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const euapTemps = require('../schemas/B2BEuAppliedTemps');
const euTempCklst = require('../schemas/B2BEuLeadsCkLst');
const B2BEuAppliedTemps = require('../schemas/B2BEuAppliedTemps');
const SetRes = require('../SetRes');
const logger = require('../lib/logger');

const postB2bEuAppliedTemList = (query, callback) => {
  euapTemps.find(query).sort({tempcSeq: 1}).then((resObj) => {
    if (resObj && resObj.length) {
      const sr = SetRes.successRes(resObj);
      callback(sr);
    } else {
      const uf = SetRes.noData([]);
      callback(uf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bFlwupTempsCkLstDaosImpl.js, at postB2bEuAppliedTemList:' + error);
    const err = SetRes.unKnownErr([]);
    callback(err);
  });
}

const postB2bEuFlwpTemLCkist = (query, callback) => {
  euTempCklst.find(query).sort({tdSeq: 1}).then((resObj) => {
    if (resObj && resObj.length) {
      const sr = SetRes.successRes(resObj);
      callback(sr);
    } else {
      const uf = SetRes.noData([]);
      callback(uf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bFlwupTempsCkLstDaosImpl.js, at postB2bEuFlwpTemLCkist:' + error);
    const err = SetRes.unKnownErr([]);
    callback(err);
  });
}

const putEuFlwupTempCkLstUpdate = (query, updateObj, callback) => {
  euTempCklst.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.updateFailed({});
      callback(uf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bFlwupTempsCkLstDaosImpl.js, at putEuFlwupTempCkLstUpdate:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

const putB2bAppTempCkLstUpdate = (query, updateObj, callback) => {
  B2BEuAppliedTemps.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.updateFailed({});
      callback(uf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bFlwupTempsCkLstDaosImpl.js, at putB2bAppTempCkLstUpdate:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

module.exports = {
  postB2bEuAppliedTemList, postB2bEuFlwpTemLCkist, putEuFlwupTempCkLstUpdate, putB2bAppTempCkLstUpdate
};

