'use strict';

let azurefaceapi = (() => {
  let _baseURL = '';

  let _ocpApimSubscriptionKey = '';

  let _contentType = 'application/json';

  // let _face = {
  //   requestParameters: {
  //     returnFaceId: {
  //       type: 'boolean',
  //       default: true
  //     },
  //     returnFaceLandmarks: {
  //       type: 'boolean',
  //       default: false
  //     },
  //     returnFaceAttributes: {
  //       type: 'string',
  //       regex: '',
  //       acceptedValues: [
  //         'age',
  //         'gender',
  //         'headPose',
  //         'smile',
  //         'facialHair',
  //         'glasses',
  //         'emotion',
  //         'hair',
  //         'makeup',
  //         'occlusion',
  //         'accessories',
  //         'blur',
  //         'exposure',
  //         'noise'
  //       ],
  //       default: ''
  //     }
  //   },
  //   requestBody: {
  //     url: {
  //       type: 'string',
  //       regex: '',
  //       default: ''
  //     }
  //   }
  // };

  let _baseValidation = () => {
    if(_baseURL == '') {
      throw 'Base URL is required.'
    }
    if(_ocpApimSubscriptionKey == '') {
      throw 'Subscription Key is required.'
    }
  };

  return {
    config: (baseUrl, ocpApimSubscriptionKey) => {
      _baseURL = baseUrl;
      _ocpApimSubscriptionKey = ocpApimSubscriptionKey;
      return azurefaceapi;
    },
    Face: {
      detect: (params) => {
        _baseValidation();

        return new Promise((resolve, reject) => {
          fetch(`${_baseURL}/detect`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'Ocp-Apim-Subscription-Key': _ocpApimSubscriptionKey
            },
            body: JSON.stringify(params)
          })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            resolve(json);
          })
          .catch((error) => {
            reject(error);
          })
        });
      },
      findSimilar: () => {

      },
      group: () => {

      },
      identify: () => {

      },
      verify: () => {

      }
    }
  };
})();