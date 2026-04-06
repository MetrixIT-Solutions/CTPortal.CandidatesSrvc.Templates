/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const cs = require('../../services/CommonSrvc');
const {cuType} = require('../../consts/B2bFlwupTempsConsts.json');

const ftapplstQry = (tData) => {
  return {euUser: tData.iss, tempUserRoles: {$in: ['HR Manager', 'HR Executive']}, delFlag: false, b2b: tData.b2b};
}

const ftcklstQry = (reqBody, tData) => {
  return {delFlag: false, b2b: tData.b2b, euapTemp: reqBody.atId};
}

const updftcklstData = (_id, tdfPaths, reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const fileObj = tdfPaths.length ? {tdfPaths} : {};
  const tdtgObj = reqBody.tdtgData ? {tdtgData: reqBody.tdtgData} : {};
  const qry = {_id, delFlag: false, lid: reqBody.lid, tempCat: reqBody.tempCat, b2b: tData.b2b};

  const updObj = {
    tdgData: reqBody?.givData || '',
    ...tdtgObj,
    tdFlag: true,
    tdStatus: false,
    ...fileObj,

    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };
  return {qry, updObj};
}

const updAppTemData = (reqBody, data, tData) => {
  const curUtc = cs.currUTCObj();
  const qry = {template: data.template, delFlag: false, lid: reqBody.lid, b2b: tData.b2b};
  const acObj = reqBody?.tdaCount ? {tdaCount: reqBody.tdaCount} : {};

  const temStsObj = reqBody.tempcStatus ? {tempcStatus: reqBody.tempcStatus, tempcSeq: reqBody.tempcStatus === 'Started' ? '2' : '3'} : {};
  const tpCObj = reqBody?.tdpCount ? {tdpCount: reqBody.tdpCount, tdcCount: reqBody.tdpCount} : {};
  const updObj = {
    $inc: {
      ...tpCObj,
      ...acObj,
    },
    $set: {
      ...temStsObj,

      uuType: cuType,
      uUser: tData.iss,
      uuName: tData.fn + ' ' + tData.ln,
      uDate: curUtc.currUTCDtTm,
      uDtStr: curUtc.currUTCDtTmStr
    }
  };
  return {qry, updObj};
}

module.exports = {
  ftapplstQry, ftcklstQry, updftcklstData, updAppTemData
};
