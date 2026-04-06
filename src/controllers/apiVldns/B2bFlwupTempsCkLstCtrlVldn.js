/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../../SetRes');

const tokenVldn = (tData) => {
  if (!tData) {
    const result = SetRes.tokenInvalid();
    return { flag: false, result };
  } else if (tData.isExpired) {
    const result = SetRes.tokenExpired();
    return { flag: false, result };
  } else if (!tData.tokenData) {
    const result = SetRes.tokenSsnErr();
    return { flag: false, result };
  } else {
    return { flag: true, result: tData.tokenData };
  }
}

const euaTmLstVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!reqBody.atId) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const flwTmCkLstUpdVldn = (req) => {
  const reqBody = req?.body?.tmData ? JSON.parse(req.body.tmData) : {};
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.recordid || !reqBody?.lid || !reqBody?.tempCat) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const signedPdfUrlVldn = (req) => {
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.body?.filepaths && !req.body.filepaths?.length) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

module.exports = {
  tokenVldn, euaTmLstVldn, flwTmCkLstUpdVldn, signedPdfUrlVldn
}