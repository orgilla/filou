import React, { Component } from 'react';
import { AutoComplete, Input } from 'antd';
import { get, debounce } from 'lodash';
import { withApollo, graphql } from 'react-apollo';
import { createComponent } from 'react-fela';
import { compose, withState } from 'recompose';
import gql from 'graphql-tag';
import FormIcon from '../form/form-icon';

const StyledInput = createComponent(
  ({ theme }) => ({
    '> input': {
      paddingRight: `${theme.space3} !important`
    }
  }),
  p => <Input {...p} />,
  p => Object.keys(p)
);

const enhance = compose(
  withApollo,
  withState('input', 'setInput'),
  withState('geocodeLoading', 'setGeocodeLoading'),
  withState(
    'location',
    'setLocation',
    ({ lat, lng }) => lat !== undefined && lng !== undefined && `${lat},${lng}`
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
        skip: !input,
        variables: {
          input,
          location
        }
      }),
      props: ({ ownProps: props, data }) => ({
        ...props,
        placesLoading: data.loading,
        items: get(data, 'places', [])
      })
    }
  )
);

@enhance
class Edit extends Component {
  static defaultProps = {
    forceLatLng: true
  };

  componentWillMount() {
    const { forceLatLng } = this.props;

    if (forceLatLng) {
      this.getLatLng(false);
    }
  }

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

  getLatLng = (force = true) => {
    const {
      client,
      value,
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

            if (geocode && (force || !get(value, 'id'))) {
              onChange(geocode);
              setInput();
            }
          })
          .catch(err => console.log(err));

        setLocation(location);
      });
    }
  };

  handleSearch = debounce(input => this.props.setInput(input), 800, {
    trailing: true,
    leading: false
  });

  renderOption = ({ placeId, description }) => (
    <AutoComplete.Option key={placeId} text={description}>
      <div style={{ whiteSpace: 'initial', display: 'flex' }}>
        {description}
      </div>
    </AutoComplete.Option>
  );

  render() {
    const {
      input,
      items,
      value,
      location,
      placesLoading,
      geocodeLoading,
      ...rest
    } = this.props;

    const dataSource = [...(items || [])];

    if (value && value.id)
      dataSource.push({
        placeId: value.id,
        description: value.formattedAddress
      });

    return (
      <AutoComplete
        style={{ width: '100%' }}
        dataSource={dataSource.map(this.renderOption)}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        optionLabelProp="text"
        value={input || get(value, 'id')}
        disabled={placesLoading || geocodeLoading}
        {...rest}
      >
        <StyledInput
          suffix={
            placesLoading || geocodeLoading ? (
              <FormIcon type="loading" />
            ) : (
              <FormIcon
                type="environment-o"
                isActive={!location}
                onClick={this.getLatLng}
              />
            )
          }
          disabled={placesLoading || geocodeLoading}
        />
      </AutoComplete>
    );
  }
}
Edit.displayName = 'EditGeocode';
Edit.type = 'object';
export default Edit;
