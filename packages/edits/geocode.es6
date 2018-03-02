import React, { Component } from 'react';
import { AutoComplete, Input } from 'antd';
import { get, debounce } from 'lodash';
import { withApollo, graphql } from 'react-apollo';
import { createComponent } from 'react-fela';
import { compose, withState, withPropsOnChange } from 'recompose';
import gql from 'graphql-tag';
import FormIcon from '../form/form-icon';

const StyleAutoComplete = createComponent(
  ({ theme }) => ({
    width: '100%',
    '& .ant-select-selection__placeholder': {
      marginX: `${theme.space3} !important`
    },
    '& .ant-input-suffix': {
      right: theme.space3
    },
    '& input': {
      paddingRight: `${theme.space3} !important`
    }
  }),
  p => <AutoComplete {...p} />,
  p => Object.keys(p)
);

const enhance = compose(
  withApollo,
  withState('input', 'setInput'),
  withState('geocodeLoading', 'setGeocodeLoading'),
  withState(
    'location',
    'setLocation',
    ({ lat, lng }) =>
      lat !== undefined && lng !== undefined ? `${lat},${lng}` : undefined
  ),
  graphql(
    gql`
      query places($input: String!, $location: String) {
        places(input: $input, location: $location) {
          placeId
          description
        }
      }
    `,
    {
      options: ({ input, location }) => ({
        skip: !input || location === undefined,
        variables: {
          input,
          location
        }
      }),
      props: ({ ownProps, data }) => ({
        ...ownProps,
        placesLoading: data.loading,
        dataSource: (data.places || []).map(x => ({
          value: x.placeId,
          text: x.description
        }))
      })
    }
  ),
  withPropsOnChange(
    ['value', 'input', 'dataSource'],
    ({ value: { id, formattedAddress } = {}, input, dataSource = [] }) => {
      const data = dataSource.filter(d => d.value !== id);

      return {
        dataSource:
          !input && id ? [{ value: id, text: formattedAddress }, ...data] : data
      };
    }
  )
);

@enhance
class Edit extends Component {
  onChange = () => {
    const { location } = this.props;

    if (location === undefined) {
      this.getLocation(false);
    }
  };

  onSelect = id => {
    const { client, onChange, setInput, setGeocodeLoading } = this.props;

    setGeocodeLoading(true);
    client
      .query({
        query: gql(`
        query place($id: String!) {
          place(placeId: $id) {
            id
            streetNumber
            route
            locality
            administrativeAreaLevel1
            administrativeAreaLevel2
            country
            postalCode
            formattedAddress
            lat
            lng
            locationType
            partialMatch
            types
          }
        }
      `),
        variables: {
          id
        }
      })
      .then(({ data, loading }) => {
        setGeocodeLoading(loading);

        if (data.place) {
          onChange(data.place);
          setInput();
        }
      })
      .catch(err => console.log(err));
  };

  getLocation = (force = true) => {
    const {
      client,
      onChange,
      setInput,
      setLocation,
      setGeocodeLoading
    } = this.props;

    if (navigator && navigator.geolocation) {
      setGeocodeLoading(true);

      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const location = `${coords.latitude},${coords.longitude}`;

        client
          .query({
            query: gql(`
            query geocode($location: String) {
              geocode(location: $location) {
                id
                streetNumber
                route
                locality
                administrativeAreaLevel1
                administrativeAreaLevel2
                country
                postalCode
                formattedAddress
                lat
                lng
                locationType
                partialMatch
                types
              }
            }
          `),
            variables: {
              location
            }
          })
          .then(({ data, loading }) => {
            setGeocodeLoading(loading);
            const geocode = get(data, 'geocode.0');

            if (geocode) {
              if (force) {
                onChange(geocode);
                setInput();
              }
              setLocation(location);
            }
          })
          .catch(err => console.log(err));
      });
    } else {
      setLocation(null);
    }
  };

  handleSearch = debounce(input => this.props.setInput(input), 500, {
    trailing: true,
    leading: false
  });

  render() {
    const {
      input,
      dataSource = [],
      value = {},
      location,
      placesLoading,
      geocodeLoading,
      onChange,
      ...rest
    } = this.props;

    return (
      <StyleAutoComplete
        dataSource={dataSource}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        onChange={this.onChange}
        defaultValue={value.id}
        {...rest}
      >
        <Input
          suffix={
            placesLoading || geocodeLoading ? (
              <FormIcon type="loading" />
            ) : (
              <FormIcon
                type="environment-o"
                isActive={!location}
                onClick={this.getLocation}
              />
            )
          }
        />
      </StyleAutoComplete>
    );
  }
}
Edit.displayName = 'EditGeocode';
Edit.type = 'object';
export default Edit;
