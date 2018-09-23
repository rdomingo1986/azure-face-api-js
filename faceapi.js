'use strict';

let azurefaceapi = (() => {
  let _baseURL = '';

  let _ocpApimSubscriptionKey = '';

  let _contentType = 'application/json';

  let _buildUrlParamsString = (params) => {
    let urlParamsString = '';
    if(params.requestParameters != undefined) {
      urlParamsString += '?';
      for(let key in params.requestParameters) {
        urlParamsString += `${key}=${params.requestParameters[key]}&`
      }
    }
    return urlParamsString.substring(0, urlParamsString.length - 1);
  };

  let _baseValidation = () => {
    if(_baseURL == '') {
      throw 'Base URL is required.';
    }
    if(_ocpApimSubscriptionKey == '') {
      throw 'Subscription Key is required.';
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

        let urlParams = _buildUrlParamsString(params);

        return new Promise((resolve, reject) => {
          fetch(`${_baseURL}/detect${urlParams}`, {
            method: 'POST',
            headers: {
              'Content-type': params.contentType == undefined ? _contentType : params.contentType,
              'Ocp-Apim-Subscription-Key': _ocpApimSubscriptionKey
            },
            body: JSON.stringify({url: params.requestBody.url})
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