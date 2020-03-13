import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import forge from 'node-forge';
import { Process, FirstResponder } from '../../assets';
import Button from '../../components/button'
import colors from '../../styles/colors';

class Welcome extends React.Component {
    static navigationOptions = {
        header: null
    };
    state = { caCert: '', caPbKey: '', caPrKey: '' }

    componentDidMount() {

    }

    genCert() {
        forge.options.usePureJavaScript = true;
        var pki = forge.pki;
        var keys = pki.rsa.generateKeyPair(2048);
        var cert = pki.createCertificate();
        cert.publicKey = keys.publicKey;
        cert.serialNumber = '01';
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

        var attrs = [
            { name: 'commonName', value: 'example.org' }
            , { name: 'countryName', value: 'US' }
            , { shortName: 'ST', value: 'Virginia' }
            , { name: 'localityName', value: 'Blacksburg' }
            , { name: 'organizationName', value: 'text.toString()' }
        ];

        // set appropriate extensions here (some examples below)
        cert.setExtensions([{
            name: 'basicConstraints',
            cA: true
        }, {
            name: 'keyUsage',
            keyCertSign: true,
            digitalSignature: true,
            nonRepudiation: true,
            keyEncipherment: true,
            dataEncipherment: true
        }, {
            name: 'subjectAltName',
            altNames: [{
                type: 6, // URI
                value: 'http://example.org/webid#me'
            }]
        }]);

        cert.setSubject(attrs);
        cert.setIssuer(attrs);
        cert.sign(keys.privateKey);
        var pem_pkey = pki.publicKeyToPem(keys.publicKey);
        var pem_privkey = pki.privateKeyToPem(keys.privateKey);
        var pem_cert = pki.certificateToPem(cert);
        console.log("pemCert--->", pem_cert);
        alert(pem_cert);

        if (pem_cert) {
            this.setState({ caCert: pem_cert, caPbKey: keys.publicKey, caPrKey: keys.privateKey })
        } else {
            alert("waiting for Cert-------->");
        }
    }

    _onPressButton = (flag) => {
        const { navigate } = this.props.navigation;
        switch (flag) {
            case 'sdl':
                navigate('ScanQRCode')
                break;
            case 'sqrc':
                navigate('ScanQRCode')
                break;
            case 'scws':
                alert("Syncing certs with Server!");
                break;
            default:
                console.log("?");
        }
    }

    render() {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.logoContainer}>
                    <Process fill={colors.white} width={120} height={140} />
                </View>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.titleText}>Goom</Text>
                    <Text style={styles.nameText}>Kevin Jay</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <Button btnType={'square'} SvgImgSrc={FirstResponder} btnText={'Grant Access '} btnFlag={'sdl'} _onPressButton={this._onPressButton} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        position: 'relative'
    },
    logoContainer: {
        paddingTop: 220,
        shadowColor: colors.blue,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        paddingLeft: 215,
        position: 'absolute',
        top: -200,
        left: -200,
        backgroundColor: colors.blue,
        width: 400,
        height: 400,
        borderTopRightRadius: 300,
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 300,
    },
    welcomeContainer: {
        flexDirection: 'column',
        flex: 1,
        paddingTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        height: 'auto',
        alignItems: 'stretch',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: colors.blue
    },
    nameText: {
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: 20,
        color: colors.blue
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
});
export default Welcome;