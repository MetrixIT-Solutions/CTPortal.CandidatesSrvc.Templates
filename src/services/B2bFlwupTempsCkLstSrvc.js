/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const config = require('config');

const ftcsImpl = require('./srvcimpls/B2bFlwupTempsCkLstSrvcImpl');
const ftcdaoimpl = require('../daos/daosimpls/B2bFlwupTempsCkLstDaosImpl');
const ftcdao = require('../daos/B2bFlwupTempsCkLstDaos');
const cs = require('../services/CommonSrvc');
const awsS3bucket = require('../AwsS3Bucket');

const postB2bEuAppliedTemList = (tData, callback) => {
  const qry = ftcdaoimpl.ftapplstQry(tData);
  ftcdao.postB2bEuAppliedTemList(qry, callback);
}

const postB2bEuFlwpTemLCkist = (reqBody, tData, callback) => {
  const qry = ftcdaoimpl.ftcklstQry(reqBody, tData);
  ftcdao.postB2bEuFlwpTemLCkist(qry, callback);
}

const postEuFlTemLCkistUpdate = (req, tData, callback) => {
  const reqBody = JSON.parse(req.body.tmData);
  if (reqBody?.tdfPaths || reqBody?.tdfpDel || req?.files) {
    ftcsImpl.deleteFilePaths(reqBody.tdfpDel);
    awsS3bucket.awsS3Upload(req.params.recordid, (uplRes) => {
      const newFiles = req.files?.length > 0 ? req.files.map(item => {
        const filePath = uplRes ? config.awsS3Bucket + config.awsS3Cklst + item.path?.split(config.lclPath)[1] : config.apiHost + item.path;
        return filePath;
      }) : [];
      const files = reqBody?.tdfPaths || [];
      files.push(...newFiles);
      if (uplRes) cs.dltFolder([{destination: 'assets/temp-docs/'+req.params.recordid}]);
      ftcsImpl.setUpdateftcklst(req, files, reqBody, tData, uplRes, callback);
    });
  } else ftcsImpl.setUpdateftcklst(req, [], reqBody, tData, false, callback);
}

const getSignedPdfUrl = (filepaths, callback) => awsS3bucket.awsS3SignedPdfUrl(filepaths, callback);

module.exports = {
  postB2bEuAppliedTemList, postB2bEuFlwpTemLCkist, postEuFlTemLCkistUpdate, getSignedPdfUrl
};

