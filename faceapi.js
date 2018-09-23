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
      addFace: (params) => {
        let faceListId = params.requestParameters.faceListId;
        delete params.requestParameters.faceListId;

        return _executeHttpRequest({
          method: 'POST',
          action: `facelists/${faceListId}/persistedfaces${_buildUrlParamsString(params)}`, 
          body: JSON.stringify(params.requestBody), // ¿binary data implementation?
          contentType: params.contentType == undefined ? _contentType : params.contentType
        });
      },
      create: (params) => {
        return _executeHttpRequest({
          method: 'PUT',
          action: `facelists/${params.requestParameters.faceListId}`, 
          body: JSON.stringify(params.requestBody) // ¿binary data implementation?
        });
      },
      delete: (params) => {
        return _executeHttpRequest({
          method: 'DELETE',
          action: `facelists/${params.requestParameters.faceListId}`
        });
      },
      deleteFace: (params) => {
        return _executeHttpRequest({
          method: 'DELETE',
          action: `facelists/${params.requestParameters.faceListId}/persistedfaces/${params.requestParameters.persistedFaceId}`
        });
      },
      get: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `facelists/${params.requestParameters.faceListId}`
        });
      },
      list: () => {
        return _executeHttpRequest({
          method: 'GET',
          action: `facelists`
        });
      },
      update: (params) => {
        return _executeHttpRequest({
          method: 'PATCH',
          action: `facelists/${params.requestParameters.faceListId}`,
          body: JSON.stringify(params.requestBody)
        });
      }
    },
    LargeFaceList: {
      addFace: (params) => {
        let largeFaceListId = params.requestParameters.largeFaceListId;
        delete params.requestParameters.largeFaceListId;

        return _executeHttpRequest({
          method: 'POST',
          action: `largefacelists/${largeFaceListId}/persistedfaces${_buildUrlParamsString(params)}`, 
          body: JSON.stringify(params.requestBody), // ¿binary data implementation?
          contentType: params.contentType == undefined ? _contentType : params.contentType
        });
      },
      create: (params) => {
        return _executeHttpRequest({
          method: 'PUT',
          action: `largefacelists/${params.requestParameters.largeFaceListId}`, 
          body: JSON.stringify(params.requestBody) // ¿binary data implementation?
        });
      },
      delete: (params) => {
        return _executeHttpRequest({
          method: 'DELETE',
          action: `largefacelists/${params.requestParameters.largeFaceListId}`
        });
      },
      deleteFace: (params) => {
        return _executeHttpRequest({
          method: 'DELETE',
          action: `largefacelists/${params.requestParameters.largeFaceListId}/persistedfaces/${params.requestParameters.persistedFaceId}`
        });
      },
      get: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `largefacelists/${params.requestParameters.largeFaceListId}`
        });
      },
      getFace: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `largefacelists/${params.requestParameters.largeFaceListId}/persistedfaces/${params.requestParameters.persistedFaceId}`
        });
      },
      getTrainingStatus: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `largefacelists/${params.requestParameters.largeFaceListId}/training`
        });
      },
      list: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `largefacelists${_buildUrlParamsString(params)}`
        });
      },
      listFace: (params) => {
        let largeFaceListId = params.requestParameters.largeFaceListId;
        delete params.requestParameters.largeFaceListId;

        return _executeHttpRequest({
          method: 'GET',
          action: `largefacelists/${largeFaceListId}/persistedfaces${_buildUrlParamsString(params)}`
        });
      },
      train: (params) => {
        return _executeHttpRequest({
          method: 'POST',
          action: `largefacelists/${params.requestParameters.largeFaceListId}/train`
        });
      },
      update: (params) => {
        return _executeHttpRequest({
          method: 'PATCH',
          action: `largefacelists/${params.requestParameters.largeFaceListId}`, 
          body: JSON.stringify(params.requestBody)
        });
      },
      updateFace: (params) => {
        return _executeHttpRequest({
          method: 'PATCH',
          action: `largefacelists/${params.requestParameters.largeFaceListId}/persistedfaces/${params.requestParameters.persistedFaceId}`, 
          body: JSON.stringify(params.requestBody)
        });
      }
    },
    LargePersonGroup: {
      create: (params) => {
        return _executeHttpRequest({
          method: 'PUT',
          action: `largepersongroups/${params.requestParameters.largePersonGroupId}`, 
          body: JSON.stringify(params.requestBody)
        });
      },
      delete: (params) => {
        return _executeHttpRequest({
          method: 'DELETE',
          action: `largepersongroups/${params.requestParameters.largePersonGroupId}`
        });
      },
      get: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `largepersongroups/${params.requestParameters.largePersonGroupId}`
        });
      },
      getTrainingStatus: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `largepersongroups/${params.requestParameters.largePersonGroupId}/training`
        });
      },
      list: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `largepersongroups${_buildUrlParamsString(params)}`
        });
      },
      train: (params) => {
        return _executeHttpRequest({
          method: 'POST',
          action: `largepersongroups/${params.requestParameters.largePersonGroupId}/train`
        });
      },
      update: (params) => {
        return _executeHttpRequest({
          method: 'PATCH',
          action: `largepersongroups/${params.requestParameters.largePersonGroupId}`, 
          body: JSON.stringify(params.requestBody)
        });
      }
    },
    LargePersonGroupPerson: {
      addFace: (params) => {
        let largePersonGroupId = params.requestParameters.largePersonGroupId;
        let personId = params.requestParameters.personId;
        delete params.requestParameters.largePersonGroupId;
        delete params.requestParameters.personId;

        return _executeHttpRequest({
          method: 'POST',
          action: `largepersongroups/${largePersonGroupId}/persons/${personId}/persistedfaces/${_buildUrlParamsString(params)}`, 
          body: JSON.stringify(params.requestBody), // ¿binary data implementation?
          contentType: params.contentType == undefined ? _contentType : params.contentType
        });
      },
      create: (params) => {
        return _executeHttpRequest({
          method: 'POST',
          action: `largepersongroups/${largePersonGroupId}/persons`, 
          body: JSON.stringify(params.requestBody)
        });
      },
      delete: (params) => {
        return _executeHttpRequest({
          method: 'DELETE',
          action: `largepersongroups/${params.requestParameters.largePersonGroupId}/persons/${params.requestParameters.personId}`
        });
      },
      deleteFace: (params) => {
        return _executeHttpRequest({
          method: 'DELETE',
          action: `largepersongroups/${params.requestParameters.largePersonGroupId}/persons/${params.requestParameters.personId}/persistedfaces/${params.requestParameters.persistedFaceId}`
        });
      },
      get: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `largepersongroups/${params.requestParameters.largePersonGroupId}/persons/${params.requestParameters.personId}`
        });
      },
      getFace: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `largepersongroups/${params.requestParameters.largePersonGroupId}/persons/${params.requestParameters.personId}/persistedfaces/${params.requestParameters.persistedFaceId}`
        });
      },
      list: (params) => {
        let largePersonGroupId = params.requestParameters.largePersonGroupId;
        delete params.requestParameters.largePersonGroupId;

        return _executeHttpRequest({
          method: 'GET',
          action: `largepersongroups/${largePersonGroupId}/persons${_buildUrlParamsString(params)}`
        });
      },
      update: (params) => {
        return _executeHttpRequest({
          method: 'PATCH',
          action: `largepersongroups/${params.requestParameters.largePersonGroupId}/persons/${params.requestParameters.personId}`,
          body: JSON.stringify(params.requestBody)
        });
      },
      updateFace: (params) => {
        return _executeHttpRequest({
          method: 'PATCH',
          action: `largepersongroups/${params.requestParameters.largePersonGroupId}/persons/${params.requestParameters.personId}/persistedfaces/${params.requestParameters.persistedFaceId}`,
          body: JSON.stringify(params.requestBody)
        });
      }
    },
    PersonGroup: {
      create: (params) => {
        return _executeHttpRequest({
          method: 'PUT',
          action: `persongroups/${params.requestParameters.personGroupId}`, 
          body: JSON.stringify(params.requestBody)
        });
      },
      delete: (params) => {
        return _executeHttpRequest({
          method: 'DELETE',
          action: `persongroups/${params.requestParameters.personGroupId}`
        });
      },
      get: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `persongroups/${params.requestParameters.personGroupId}`
        });
      },
      getTrainingStatus: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `persongroups/${params.requestParameters.personGroupId}/training`
        });
      },
      list: (params) => {
        return _executeHttpRequest({
          method: 'GET',
          action: `persongroups${_buildUrlParamsString(params)}`
        });
      },
      train: (params) => {
        return _executeHttpRequest({
          method: 'POST',
          action: `persongroups/${params.requestParameters.personGroupId}/train`
        });
      },
      update: (params) => {
        return _executeHttpRequest({
          method: 'PATCH',
          action: `persongroups/${params.requestParameters.personGroupId}`, 
          body: JSON.stringify(params.requestBody)
        });
      }
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