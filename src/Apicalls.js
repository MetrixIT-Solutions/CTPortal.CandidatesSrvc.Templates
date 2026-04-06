/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const axios = require('axios'); 
const config = require('config');

const postB2BUserTempCount = (ctpeuatoken, ctpeuua, data, callback) => {
  const headers = { headers: {ctpeuatoken, ctpeuua} };
  axios.post(config.temCountApi, data, headers).then((res) => callback(null , res.data)).catch((err) => callback(err, {}));
}

const postB2BH1PetnTempCount = (data, callback) => {
  // const headers = { headers: {ctpb2batoken} };
  axios.post(config.h1bTCountApi, data, {}).then((res) => callback(null, res.data)).catch((err) => callback(err, {}));
}

const postB2BOfrLtrTempCount = (data, callback) => {
  // const headers = { headers: {ctpb2batoken} };
  axios.post(config.oflTCountApi, data, {}).then((res) => callback(null, res.data)).catch((err) => callback(err, {}));
}

module.exports = { postB2BUserTempCount, postB2BH1PetnTempCount, postB2BOfrLtrTempCount };
