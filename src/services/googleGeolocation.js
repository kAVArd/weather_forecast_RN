import axios from 'axios';
import * as R from 'ramda';
import { GOOGLE_API_KEY } from 'react-native-dotenv';

import AppConfig from '@config';

export default class GoogleGeolocation {
  static findLocationName = async (lat, lng) => {
    const url = `${AppConfig.baseGoogleGeolocationURL}?&key=${GOOGLE_API_KEY}&latlng=${lat},${lng}`;
    const result = await axios.get(url);

    console.log(JSON.stringify(result.data, null, 2));
    const locationString = R.path(['data', 'plus_code', 'compound_code'], result);

    if (locationString) {
      const locationArray = R.split(', ', locationString);
      const locationName = locationArray[0];

      return {
        name: locationName.substring(locationName.indexOf(' ') + 1),
        country: R.last(locationArray),
      }
    }
    console.log(locationString);

    const formattedAddress = R.compose(
      R.prop('formatted_address'),
      R.last,
      R.path(['data', 'results'])
    )(result);

    return {
      name: formattedAddress,
      country: '',
    }
  };
};