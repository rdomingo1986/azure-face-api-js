'use strict';

let azurefaceapi = (() => {
  let _baseURL = '';

  let _ocpApimSubscriptionKey = '';

  let _contentType = 'application/json';

  let _baseValidation = () => {
    if(_baseURL == '') {
      throw 'Base URL is required.';
    }
    if(_ocpApimSubscriptionKey == '') {
      throw 'Subscription Key is required.';
    }
  };

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

  let _executeHttpRequest = (resource, data, contentType = _contentType, method = 'POST') => {
    _baseValidation();

    return new Promise((resolve, reject) => {
      fetch(`${_baseURL}/${resource}`, {
        method: method,
        headers: {
          'Content-type': contentType,
          'Ocp-Apim-Subscription-Key': _ocpApimSubscriptionKey
        },
        body: data
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
  };

  return {
    config: (baseUrl, ocpApimSubscriptionKey) => {
      _baseURL = baseUrl;
      _ocpApimSubscriptionKey = ocpApimSubscriptionKey;
      return azurefaceapi;
    },
    Face: {
      detect: (params) => {
        return _executeHttpRequest(`detect${_buildUrlParamsString(params)}`, JSON.stringify(params.requestBody), params.contentType == undefined ? _contentType : params.contentType);
      },
      findSimilar: (params) => {
        return _executeHttpRequest('findsimilars', JSON.stringify(params.requestBody));
      },
      group: (params) => {
        return _executeHttpRequest('group', JSON.stringify(params.requestBody));
      },
      identify: (params) => {
        return _executeHttpRequest('identify', JSON.stringify(params.requestBody));
      },
      verify: (params) => {
        return _executeHttpRequest('verify', JSON.stringify(params.requestBody));
      }
    }
  };
})();