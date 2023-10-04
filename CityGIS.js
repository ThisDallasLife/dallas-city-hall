// @see https://egis.dallascityhall.com/resources/documents/CityGIS_REST_primer.pdf

const CityGIS = {
  baseUrl: 'https://egis.dallascityhall.com/arcgis/rest/services/',
  
  findAddressCandidatesPath: 'Crm_public/CrmDallasStreetsLocator/GeocodeServer/findAddressCandidates?Street=[X]&City=Dallas&State=Texas&ZIP=&Single+Line+Input=&category=&outFields=&maxLocations=&outSR=&searchExtent=&location=&distance=&magicKey=&f=pjson',
  findAddressCandidatesUrl: function (streetAddress) {
    return this.baseUrl + this.findAddressCandidatesPath.replace('[X]', encodeURIComponent(streetAddress))
  },

  findCouncilPath: 'Basemap/CouncilAreas/MapServer/0/query?&geometry=[X]%2C[Y]&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&returnGeometry=false&f=pjson&outFields=*',
  findCouncilUrl: function (x, y) {
    return this.baseUrl + this.findCouncilPath.replace('[X]', x).replace('[Y]', y);
  }
};