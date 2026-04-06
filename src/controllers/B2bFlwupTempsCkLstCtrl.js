/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var fs = require('fs');
var multer = require('multer');

const flwTckCv = require('./apiVldns/B2bFlwupTempsCkLstCtrlVldn');
const flwTcksrvc = require('../services/B2bFlwupTempsCkLstSrvc');
const util = require('../lib/util');
const SetRes = require('../SetRes');
const tokens = require('../tokens');
const cs = require('../services/CommonSrvc');
const path = require('path');

const apiServerStatus = (req, res) => {
  const resObj = SetRes.apiServerStatus();
  util.sendApiRes(res, resObj);
}

const postB2bEuAppliedTemList = (req, res) => {
  const devInfo = JSON.parse(req.headers.ctpeuua);
  tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
    const tv = flwTckCv.tokenVldn(tData);
    if (tv.flag) {
      flwTcksrvc.postB2bEuAppliedTemList(tData.tokenData, (resObj) => {
        const apiRes = {...resObj, userObj: tData?.data};
        util.sendApiRes(res, apiRes);
      });
    } else util.sendApiRes(res, tv.result);
  });
}

const postB2bEuFlwpTemLCkist = (req, res) => {
  const vds = flwTckCv.euaTmLstVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = flwTckCv.tokenVldn(tData);
      if (tv.flag) {
        flwTcksrvc.postB2bEuFlwpTemLCkist(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

var storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    var uplLoc = 'assets/temp-docs/' + req.params.recordid;
    if (!fs.existsSync(uplLoc)) {
      fs.mkdirSync(uplLoc);
    }
    callback(null, uplLoc);
  },
  filename: async (req, file, callback) => {
    const rfname = cs.getCurDtTmName();
    const newFileName = `${rfname}-${file.originalname}`; // Rename file
    callback(null, newFileName);
  },
});
var upload = multer({ storage }).array('files', 5);

const postEuFlTemLCkistUpdate = (req, res) => {
  upload(req, res, (err) => {
    const vds = flwTckCv.flwTmCkLstUpdVldn(req);
    if (vds.flag) {
      const devInfo = JSON.parse(req.headers.ctpeuua);
      tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
        const tv = flwTckCv.tokenVldn(tData);
        if (tv.flag) {
          flwTcksrvc.postEuFlTemLCkistUpdate(req, tData.tokenData, (resObj) => {
            const apiRes = {...resObj, userObj: tData?.data};
            util.sendApiRes(res, apiRes);
          });
        } else {
          util.sendApiRes(res, tv.result);
          req.files.forEach(element => cs.dltFolder([element]));
        }
      });
    } else {
      util.sendApiRes(res, vds.result);
      req.files.forEach(element => cs.dltFolder([element]));
    }
  });
}

const getSignedPdfUrl = (req, res) => {
  const vds = flwTckCv.signedPdfUrlVldn(req);
  if(vds.flag) {
    flwTcksrvc.getSignedPdfUrl(req.body.filepaths, (resObj) => util.sendApiRes(res, resObj));
  } else util.sendApiRes(res, vds.result);
}

module.exports = {
  apiServerStatus, postB2bEuAppliedTemList, postB2bEuFlwpTemLCkist, postEuFlTemLCkistUpdate, getSignedPdfUrl
}
