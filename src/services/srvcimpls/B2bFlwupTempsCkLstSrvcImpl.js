/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const config = require('config');

const cs = require('../CommonSrvc');
const awsS3bucket = require('../../AwsS3Bucket');
const bFlwTCkDaoimpl = require('../../daos/daosimpls/B2bFlwupTempsCkLstDaosImpl');
const bFlwTCkDao = require('../../daos/B2bFlwupTempsCkLstDaos');
const apicalls = require('../../Apicalls');

const deleteFilePaths = (tdfpDel) => {
  tdfpDel.forEach(element => {
    if (element.includes(config.awsS3Cklst)) {
      const exPath = element.split(config.awsS3Cklst);
      exPath.length > 1 && awsS3bucket.awsS3Delete(config.awsS3Cklst+exPath[1]);
    } else if(element.includes(config.lclPath)) {
      const extpath = element.split('assets');
      const path = extpath.length > 1 ? [{destination: 'assets'+extpath[1]}] : '';
      path && cs.dltFolder(path);
    }
  });
}

const setUpdateftcklst = (req, files, reqBody, tData, awsUpload, callback) => {
  const obj = bFlwTCkDaoimpl.updftcklstData(req.params.recordid, files, reqBody, tData);
  bFlwTCkDao.putEuFlwupTempCkLstUpdate(obj.qry, obj.updObj, resObj => {
    if (resObj.status !== '200' && req?.files?.length) {
      awsUpload ? req.files.forEach(element => awsS3bucket.awsS3Delete(config.awsS3Cklst+element.path?.split(config.lclPath)[1])) : req.files.forEach(element => cs.dltFolder([element]));
    }
    if (resObj.status === '200' && (reqBody.tempcStatus || reqBody?.tdaCount)) {
      const uAppObj = bFlwTCkDaoimpl.updAppTemData(reqBody, resObj.resData.result, tData);
      bFlwTCkDao.putB2bAppTempCkLstUpdate(uAppObj.qry, uAppObj.updObj, resObj1 => {
        const apRes = resObj1.resData.result;
        const temAppData = {tempId: resObj.resData.result?.template, tempData: obj.updObj, lid: reqBody.lid, tdpCount: apRes.tdpCount, tdaCount: apRes.tdaCount, tdoCount: apRes.tdoCount, tdcCount: apRes.tdcCount, tdCount: apRes.tdCount, tData};
        if (apRes.lType == 'Leads') apicalls.postB2BUserTempCount(req.headers.ctpb2batoken, temAppData, (err, resObj) => {});
        else if (apRes.lType == 'H1B Petitions') apicalls.postB2BH1PetnTempCount(temAppData, (err, resObj) => {});
        else if (apRes.lType == 'Offer Letters') apicalls.postB2BOfrLtrTempCount(temAppData, (err, resObj) => {});
      });
    }
    callback(resObj);
  });
}

module.exports = {
  deleteFilePaths, setUpdateftcklst
};
