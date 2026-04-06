/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const bFlwTCkCtrl = require('../controllers/B2bFlwupTempsCkLstCtrl');

module.exports.controller = (app) => {

  app.get('/', bFlwTCkCtrl.apiServerStatus);

  app.post('/ctpeu/v1/eu/applied/temp/list', bFlwTCkCtrl.postB2bEuAppliedTemList);
  app.post('/ctpeu/v1/eu/flwup/temp/check/list', bFlwTCkCtrl.postB2bEuFlwpTemLCkist);
  app.put('/ctpeu/v1/eu/flwup/temp/check/list/update/:recordid', bFlwTCkCtrl.postEuFlTemLCkistUpdate);

  app.post('/ctpeu/v1/eu/flwup/temp/check/list/signed-pdf', bFlwTCkCtrl.getSignedPdfUrl);
}