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

  let _executeHttpRequest = (params) => {
    _baseValidation();

    return new Promise((resolve, reject) => {
      fetch(`${_baseURL}/${params.action}`, {
        method: params.method,
        headers: {
          'Content-type': params.contentType == undefined ? _contentType : params.contentType,
          'Ocp-Apim-Subscription-Key': _ocpApimSubscriptionKey
        },
        body: params.body
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
        return _executeHttpRequest({
          method: 'POST',
          action: `detect${_buildUrlParamsString(params)}`, 
          body: JSON.stringify(params.requestBody), // ¿binary data implementation?
          contentType: params.contentType == undefined ? _contentType : params.contentType
        });
      },
      findSimilar: (params) => {
        return _executeHttpRequest({
          method: 'POST',
          action: 'findsimilars', 
          body: JSON.stringify(params.requestBody)
        });
      },
      group: (params) => {
        return _executeHttpRequest({
          method: 'POST',
          action: 'group', 
          body: JSON.stringify(params.requestBody)
        });
      },
      identify: (params) => {
        return _executeHttpRequest({
          method: 'POST',
          action: 'identify', 
          body: JSON.stringify(params.requestBody)
        });
      },
      verify: (params) => {
        return _executeHttpRequest({
          method: 'POST',
          action: 'verify', 
          body: JSON.stringify(params.requestBody)
        });
      }
    },
    FaceList: {
      addFace: () => {},
      create: () => {},
      delete: () => {},
      deleteFace: () => {},
      get: () => {},
      list: () => {},
      update: () => {}
    },
    LargeFaceList: {
      addFace: () => {},
      create: () => {},
      delete: () => {},
      deleteFace: () => {},
      get: () => {},
      getFace: () => {},
      getTrainingStatus: () => {},
      list: () => {},
      listFace: () => {},
      train: () => {},
      update: () => {},
      updateFace: () => {}
    },
    LargePersonGroup: {
      create: () => {},
      delete: () => {},
      get: () => {},
      getTrainingStatus: () => {},
      list: () => {},
      train: () => {},
      update: () => {}
    },
    LargePersonGroupPerson: {
      addFace: () => {},
      create: () => {},
      delete: () => {},
      deleteFace: () => {},
      get: () => {},
      getFace: () => {},
      list: () => {},
      update: () => {},
      updateFace: () => {}
    },
    PersonGroup: {
      create: () => {},
      delete: () => {},
      get: () => {},
      getTrainingStatus: () => {},
      list: () => {},
      train: () => {},
      update: () => {}
    },
    PersonGroupPerson: {
      addFace: () => {},
      create: () => {},
      delete: () => {},
      deleteFace: () => {},
      get: () => {},
      getFace: () => {},
      list: () => {},
      update: () => {},
      updateFace: () => {}
    }
  };
})();