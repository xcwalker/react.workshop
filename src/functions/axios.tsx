import axios from "axios";

function accessToken() {
  return axios.post(`https://login.microsoftonline.com/${import.meta.env.VITE_TOKEN_ID}/oauth2/v2.0/token`, {
    headers:{'content-type': 'application/x-www-form-urlencoded'},
    data: {
      grant_type: 'client_credentials',
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      scope: "https://tapi.dvsa.gov.uk/.default",
    }
  }).then((response) => {
    return response.data.access_token;
  })
}

const instance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: {
    Authorization: `Bearer {${accessToken()}}`,
    "X-API-Key": `{${import.meta.env.VITE_API_KEY}}`,
  },
});

export function GetMOTHistoryVRN(vrn: string) {
  return instance.get(
    `https://history.mot.api.gov.uk/v1/trade/vehicles/registration/${vrn}`
  );
}
