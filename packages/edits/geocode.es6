import React, { Component, Fragment } from 'react';
import { AutoComplete, Input, Row, Col } from 'antd';
import { get, debounce } from 'lodash';
import { withApollo } from 'react-apollo';
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
  withState('loading', 'setLoading'),
  withState('dataSource', 'setDataSource', []),
  withState(
    'location',
    'setLocation',
    ({ lat, lng }) =>
      lat !== undefined && lng !== undefined ? `${lat},${lng}` : undefined
  ),
  withPropsOnChange(
    ['value', 'input'],
    ({
      value: { id, formattedAddress } = {},
      input,
      dataSource = [],
      setDataSource
    }) => {
      const data = dataSource.filter(d => d.value !== id);

      setDataSource(
        !input && id ? [{ value: id, text: formattedAddress }, ...data] : data
      );
    }
  ),
  withPropsOnChange(
    ['value'],
    ({ value: { formattedAddress } = {}, setInput }) => {
      setInput(formattedAddress);
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

  getPlace = id => {
    const { client, onChange, setLoading } = this.props;

    setLoading(true);
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
        setLoading(loading);

        if (data.place) {
          onChange(data.place);
        }
      })
      .catch(err => console.log(err));
  };

  getPlaces = input => {
    const { client, location, setLoading, setDataSource } = this.props;

    setLoading(true);
    client
      .query({
        query: gql(`
      query places($input: String!, $location: String) {
        places(input: $input, location: $location) {
          placeId
          description
        }
      }
    `),
        variables: {
          input,
          location
        }
      })
      .then(({ data, loading }) => {
        setLoading(loading);
        setDataSource(
          (data.places || []).map(x => ({
            value: x.placeId,
            text: x.description
          }))
        );
      })
      .catch(err => console.log(err));
  };

  getLocation = (force = true) => {
    const { client, onChange, setLocation, setLoading } = this.props;

    if (navigator && navigator.geolocation) {
      setLoading(true);

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
            setLoading(loading);
            const geocode = get(data, 'geocode.0');

            if (geocode) {
              if (force) {
                onChange(geocode);
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

  handleSearch = input => {
    const { setInput } = this.props;

    setInput(input);
    debounce(i => this.getPlaces(i), 800, {
      trailing: true,
      leading: false
    })(input);
  };

  render() {
    const {
      input,
      dataSource = [],
      value = {},
      location,
      placesLoading,
      loading,
      onChange,
      extended,
      ...rest
    } = this.props;

    return (
      <Fragment>
        <StyleAutoComplete
          dataSource={dataSource}
          onSelect={this.getPlace}
          onSearch={this.handleSearch}
          onChange={this.onChange}
          value={input}
          {...rest}
        >
          <Input
            suffix={
              placesLoading || loading ? (
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

        {!!extended &&
          value.id && (
            <Row gutter={16} style={{ marginTop: '1rem' }}>
              <Col span={16}>
                <Input value={value.route} disabled />
              </Col>
              <Col span={8}>
                <Input value={value.streetNumber} disabled />
              </Col>
            </Row>
          )}
        {!!extended &&
          value.id && (
            <Row
              gutter={16}
              style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
            >
              <Col span={10}>
                <Input value={value.postalCode} disabled />
              </Col>
              <Col span={14}>
                <Input value={value.locality} disabled />
              </Col>
            </Row>
          )}
        {!!extended &&
          value.id && (
            <Row gutter={16}>
              <Col span={12}>
                <Input value={value.administrativeAreaLevel1} disabled />
              </Col>
              <Col span={12}>
                <Input value={value.country} disabled />
              </Col>
            </Row>
          )}
      </Fragment>
    );
  }
}
Edit.displayName = 'EditGeocode';
Edit.type = 'object';
export default Edit;
