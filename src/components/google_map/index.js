import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    useEffect,
    Alert,
    PermissionsAndroid,
    Dimensions,
    Image
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import marker from '../../assets/images/icons8-marker.png'

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    // map: {
    //     flex: 1
    // },
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        height: 48,
        width: 48
    },
    footer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 0,
        position: 'absolute',
        width: '100%'
    },
    region: {
        color: '#fff',
        lineHeight: 20,
        margin: 20
    }
});

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.002
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialPosition: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }
        }
    }

    // func mapView(_ mapView: GMSMapView, idleAt position: GMSCameraPosition) {
    //     let coordinate = mapView.projection.coordinate(for: markerView.center)
    //     print("latitude " + "\(coordinate.latitude)" + " longitude " + "\(coordinate.longitude)")
    // }

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Goom',
                    'message': 'Goom app want access to your location'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location", Geolocation)
                // alert("You can use the location");
                Geolocation.getCurrentPosition(
                    (position) => {

                        var lat = parseFloat(position.coords.latitude)
                        var long = parseFloat(position.coords.longitude)
                        var initialRegion = {
                            latitude: lat,
                            longitude: long,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }

                        this.setState({ initialPosition: initialRegion })

                        this.map.animateToRegion({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA
                        })

                        // speed: 0
                        // heading: 0
                        // accuracy: 16.7810001373291
                        // altitude: 401.8999938964844
                        // longitude: 73.1245396
                        // latitude: 33.5511518

                        console.log("user current location---", position);
                    },
                    (error) => {
                        // See error code charts below.
                        console.log("eorrrrrrrrrrrrrrrrrrrrrrrrr", error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                console.log("location permission denied")
                alert("Location permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    componentDidMount() {
        // Instead of navigator.geolocation, just use Geolocation.
        this.requestLocationPermission();
    }

    onRegionChangeComplete = (initialPosition) => {
        console.log("onRegionChangeComplete--", initialPosition);
        this.setState({ initialPosition })
    }
    // useEffect((val) => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         this.setState({ position: { longitude: position.longitude, latitude: position.latitude } }, () => {
    //             Alert.alert("ALERT---" + JSON.stringify(position));
    //         });
    //     }, (error) => {
    //         alert(JSON.stringify(error))
    //     }, {
    //         enableHighAccuracy: true,
    //         timeout: 20000,
    //         maximumAge: 1000
    //     });
    // })
    render() {
        console.log("Coords---:", this.state);
        return (
            <View style={styles.container}>
                <MapView
                    ref={(map) => { this.map = map; }}
                    // provider="google"
                    onRegionChange={(e) => this.onRegionChangeComplete(e)}

                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    followsUserLocation={true}
                    loadingEnabled={true}
                    toolbarEnabled={true}
                    zoomEnabled={true}
                    rotateEnabled={true}
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    initialRegion={this.state.initialPosition}
                >
                    <View style={styles.markerFixed}>
                        <MapView.Marker coordinate={this.state.initialPosition} draggable onDragEnd={(e) => console.log('data', e.currentTarget)} />
                    </View>
                    {/* <View style={styles.markerFixed}>
                        <Image style={styles.marker} source={marker} />
                    </View> */}
                </MapView>

            </View>
        )
    }
}