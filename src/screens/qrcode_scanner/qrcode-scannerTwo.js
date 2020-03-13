import React, { Component } from 'react';
import { verifyHash } from '../../services/api';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { Colors } from "react-native/Libraries/NewAppScreen";
import forge from 'node-forge';
import StepIndicator from '../../components/step_indicator';
import { Process, Wifi } from '../../assets';
import Button from '../../components/button';
import Scanner from '../../components/scanner';
import ServerResponse from '../../components/server_response';
import CertificateValidation from '../../components/certificate_validation';
import HashesNotMatch from '../../components/hashes_not_match';
import colors from '../../styles/colors';

class ScanScreen extends Component {
    static navigationOptions = {
        title: 'Scan Driving License',
        headerStyle: {
            backgroundColor: colors.blue,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'normal',
        },
        // header: null,
        headerRight: () => (
            <Process fill={colors.white} width={40} height={30} />
        )
    };

    state = {
        currentPosition: 0,
        step: 0,
        reactivateScanner: false,
        isHashValid: false,
        isCertValid: false,
        serverResp: null,
        dlHashOne: null,
        areHashesMatched: null,
        dlHashTwo: null,
        showScanner: true,
        scanningDl: true,
        reactivateQr: false,
        isQRCodeGenerated: false,
        isDlScanned: false,
        isQrScanned: false,
        qrMsg: '',
        qrCodeValue: '',
        serverRespMsg: '',
        frCsr: '',
        networkErr: false,
        networkErrMsg: ''
    };

    verifyHashFromServer = (hash) => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state);
            if (state.isConnected) {
                return new Promise((resolve, reject) => {
                    verifyHash(this.state.dlHashOne)
                        .then((res) => {
                            console.log("serverResp----", res);
                            if (res && !res.success) {
                                this.setState({ currentPosition: 2, showScanner: false, isHashValid: true, isCertValid: false, serverResp: true, serverRespMsg: 'Hash Verified!' })
                            } else {
                                this.setState({ currentPosition: 1, showScanner: false, isHashValid: false, isCertValid: false, serverResp: false, serverRespMsg: 'Hash Not Verified!' })
                            }
                        }).catch((err) => {
                            reject(err)
                        });
                })
            } else {
                this.setState({ networkErr: true, networkErrMsg: 'NETWORK ERROR!' })
            }
        });
    }

    onSuccess = (e) => {
        if (this.state.scanningDl) {
            if (e.type === 'PDF_417' || e.type === 'org.iso.PDF417') {
                NetInfo.fetch().then(state => {
                    console.log("Connection type", state.type);
                    console.log("Is connected?", state);
                    if (state.isConnected) {
                        try {
                            let md = forge.md.sha256.create();
                            md.update(e.data);
                            if (md.digest().toHex()) {
                                this.setState({ dlHashOne: md.digest().toHex() }, () => {
                                    this.setState({
                                        currentPosition: 1,
                                        isDlScanned: true,
                                        showScanner: false,
                                        scanningDl: false,
                                        qrMsg: 'Scanning QR from F.R'
                                    })
                                })
                                this.verifyHashFromServer(this.state.dlHashOne);
                            }
                        } catch (e) {
                            alert("something went wrong, try again!" + e);
                        }
                    } else {
                        this.setState({ networkErr: true, networkErrMsg: 'NETWORK ERROR!' })
                    }
                })
            } else {
                Alert.alert(
                    'Invalid Driving License Format!',
                    'Make sure you are scanning a valid Driving License.',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => this._onPressButton('cancel'),
                            style: 'cancel',
                        },
                        { text: 'Try again', onPress: () => this.setState({ reactivateScanner: true }) },
                    ],
                    { cancelable: false },
                );
            }
        } else if (e.type === "QR_CODE" || e.type === "org.iso.QRCode") {
            try {
                if (e.data.includes("-----BEGIN CERTIFICATE-----" && "-----END CERTIFICATE-----")) {
                    let cert = forge.pki.certificateFromPem(e.data);
                    if (cert.extensions[0].altNames[0].value) {
                        this.setState({
                            isQrScanned: true,
                            frCert: cert,
                            dlHashTwo: cert.extensions[0].altNames[0].value,
                            currentPosition: 3,
                        })
                    } else {
                        Alert.alert(
                            'Error',
                            'Somthing went wrong while scanning.',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => this._onPressButton('cancel'),
                                    style: 'cancel',
                                },
                                { text: 'Try again', onPress: () => this.setState({ reactivateScanner: true }) },
                            ],
                            { cancelable: false },
                        );
                    }
                } else {
                    Alert.alert(
                        'Invalid QR Format!',
                        'Make sure you are scanning a valid QR Code.',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => this._onPressButton('cancel'),
                                style: 'cancel',
                            },
                            { text: 'Try again', onPress: () => this.setState({ reactivateScanner: true }) },
                        ],
                        { cancelable: false },
                    );
                }
            } catch (e) {
                alert('Something went wrong, try again!' + e);
                setTimeout(() => {
                    this.setState({ isDlScanned: false, isQrScanned: false, showScanner: false })
                }, 1000)
            }
        } else {
            Alert.alert(
                'Invalid QR Format!',
                'Make sure you are scanning a valid QR Code.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => this._onPressButton('cancel'),
                        style: 'cancel',
                    },
                    { text: 'Try again', onPress: () => this.setState({ reactivateScanner: true }) },
                ],
                { cancelable: false },
            );
        }
    }

    componentDidMount() {
        this.setState({ qrMsg: 'Scanning Driving License!' })
    }

    componentDidUpdate(preProps, preState) {
        if (preState.dlHashOne !== this.state.dlHashOne || preState.dlHashTwo !== this.state.dlHashTwo) {
            if (this.state.dlHashOne !== null && this.state.dlHashTwo !== null) {
                if (this.state.dlHashOne === this.state.dlHashTwo) {
                    // alert("Hashes Matched....!!!!");
                    this.setState({ areHashesMatched: true, showScanner: false }, () => {
                        this._onPressVerifyCertButton();
                    });
                } else {
                    // alert("Hashes Do not match....!!!!");
                    this.setState({ isHashValid: false, serverResp: null, areHashesMatched: false, showScanner: false });
                }
            }
        }
    }

    connectingSoi(certificate) {
        // console.log("certificate--->", certificate);
        let frCert = "-----BEGIN CERTIFICATE-----\n" +
            "MIIDXjCCAkagAwIBAgIBATANBgkqhkiG9w0BAQUFADB/MR4wHAYDVQQDExV3aGlz\n" +
            "dGxlLjE1NzE4NTY4MzU5NzkxCzAJBgNVBAYTAkNOMQswCQYDVQQIEwJaSjELMAkG\n" +
            "A1UEBxMCSFoxITAfBgNVBAoTGDE1NzE4NTY4MzU5Nzkud3Byb3h5Lm9yZzETMBEG\n" +
            "A1UECxMKd3Byb3h5Lm9yZzAeFw0xOTEwMjMxOTUxMjRaFw0yMDEwMjMxOTUxMjRa\n" +
            "MBUxEzARBgNVBAMTCkRhdmUgSm9uZXMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw\n" +
            "ggEKAoIBAQCMgSLWPhg1DInVnYXp4/M3KpEJdMrUQXUh0J8nuzHvI+AR1UK+hNuk\n" +
            "58+5WDa4OrAvQrnAjRcqEba6diZ9BMf9hcFai6BT/OEjBksYjGTd3fxdSpUtWAP/\n" +
            "A2AW1c3SiqB02RjANxjVvp2uSOR7O78jK6EhuPV28czPguRW94IvrTSXTgpJt8SV\n" +
            "oC2LYqzvZJDDuIVOZnC9gkb/ju+m0AqRsl2Q+kdIgyRLGIzpQa9nZkh4YHbcOhcX\n" +
            "LQ85je0o8M2y+9n3usqscD3m79AvDb2Mke2Dv6s44mUF+UUSYH2fDAx8WDa3x0/+\n" +
            "p7MKKXoo5Nw2mECWk3UESMyu3qj432ZFAgMBAAGjTzBNMEsGA1UdEQREMEKGQDMw\n" +
            "NDExN2RhYjc4Y2I4MzQ1NGNlOGQ5ZmRmZmUzZGE3MWQ5MjA0OGJjNTI0ZDhlNmQw\n" +
            "ZDAyMzA4YmExMmFkMmQwDQYJKoZIhvcNAQEFBQADggEBAFPzvAn6D5poyahXkx84\n" +
            "KN0XIEC1Wv6GowrtMLCbItLD6kO1ejySlMPLx0jgN0O5I6jqBKaEksGYhqLfj+AY\n" +
            "YINrQw6recBxkGfq1pcWQfBv41FxsNfKR5qOSCs9C118VmJgS2PULHte4LXxJOMR\n" +
            "2/k9HZfysnChunCDziU0Jevw9FefQFzL8B9QKE57Txptbc48j9vBnOwQRcSuBXgc\n" +
            "avuQDf0Ip1q6nC9ifEU8WVFPLphZvSDN6EypgUBNfEWX4AAA89NnIWApWa37cjmN\n" +
            "I0dvj95KcPxRVdikxeFBtR3qES7styndYSlLRyTxgbUDIiBht5YRvn/IV2sUfALF\n" +
            "9wE=\n" +
            "-----END CERTIFICATE-----";
        let frCert1 = "-----BEGIN CERTIFICATE-----\n" +
            "MIIDXjCCAkagAwIBAgIBATANBgkqhkiG9w0BAQUFADB/MR4wHAYDVQQDExV3aGlz\n" +
            "dGxlLjE1NzE5Mjg3MzYwNDYxCzAJBgNVBAYTAkNOMQswCQYDVQQIEwJaSjELMAkG\n" +
            "A1UEBxMCSFoxITAfBgNVBAoTGDE1NzE5Mjg3MzYwNDYud3Byb3h5Lm9yZzETMBEG\n" +
            "A1UECxMKd3Byb3h5Lm9yZzAeFw0xOTEwMjQxNDU2NDVaFw0yMDEwMjQxNDU2NDVa\n" +
            "MBUxEzARBgNVBAMTCkRhdmUgSm9uZXMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw\n" +
            "ggEKAoIBAQDmQQrnbP5h4ppR2NlYacLLkLOAqrypKZE0SP9PAlrF1SsRvqAEcmo+\n" +
            "hKQho1fB4XDe23SjNhDhH4n9nskXBQQFsnhcrP0lXD+6xQ2MmBc2gUbNveM2ZHHP\n" +
            "Im3W12yTX1rNOaa7MiRc/1Xis6wEmtPdp6QjgC9B9ybGUkzZiA7OjECPkBHSV1TA\n" +
            "jLE6oghJbg6NlnI8++I6JNt3l6rRoizo+I6ZOtXOFERzv6pWTwbfX+Q3jSzQSoQ4\n" +
            "lZ93UB1C1Y6c4FmABuNoNKg6s/1AlVJvzopi5jY6XcjaVta0sxQZN2alEtKHnU+o\n" +
            "h3J17T58JVWpi0VadKMLzSWhNrbC9XAjAgMBAAGjTzBNMEsGA1UdEQREMEKGQDMw\n" +
            "NDExN2RhYjc4Y2I4MzQ1NGNlOGQ5ZmRmZmUzZGE3MWQ5MjA0OGJjNTI0ZDhlNmQw\n" +
            "ZDAyMzA4YmExMmFkMmQwDQYJKoZIhvcNAQEFBQADggEBANPThUnsd6fwtUWG7Jom\n" +
            "Bk1BMm1LM0UgaMmgT0WG50D+seFpW+6RPWB20SNfiyAXn9euZBsjEPtdZAR8X3DI\n" +
            "pa1HEtfFv1C+ha+5Ya4YDmemxphFkApUpgPX7RzxwAk9JtLfucIihMYqQmXpyeNz\n" +
            "hjQ3bxQ4yCeq6enOi24TgQe4F9CLx947zbSslE/1buljPZkvOa9E0aKu04or8nJN\n" +
            "BlgVq58i9lKbLOPyFLFo+U3enH3CH/Q3yp3lacjYE5IA5rwxV8P5dnYwUuZgfby1\n" +
            "0Ww20PE4V+NczDaIw3THFQN5/OTvFS6gQswmEfL3cESVvFzKsDAuf7n3hbbi+Kj4\n" +
            "23s=\n" +
            "-----END CERTIFICATE-----";
        let frCert2 = "-----BEGIN CERTIFICATE-----\n" +
            "MIIDXjCCAkagAwIBAgIBATANBgkqhkiG9w0BAQUFADB/MR4wHAYDVQQDExV3aGlz\n" +
            "dGxlLjE1NzE4NTY4MzU5NzkxCzAJBgNVBAYTAkNOMQswCQYDVQQIEwJaSjELMAkG\n" +
            "A1UEBxMCSFoxITAfBgNVBAoTGDE1NzE4NTY4MzU5Nzkud3Byb3h5Lm9yZzETMBEG\n" +
            "A1UECxMKd3Byb3h5Lm9yZzAeFw0yMDEwMjQxNzE5NThaFw0yMTEwMjQxNzE5NTha\n" +
            "MBUxEzARBgNVBAMTCkRhdmUgSm9uZXMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw\n" +
            "ggEKAoIBAQCMgSLWPhg1DInVnYXp4/M3KpEJdMrUQXUh0J8nuzHvI+AR1UK+hNuk\n" +
            "58+5WDa4OrAvQrnAjRcqEba6diZ9BMf9hcFai6BT/OEjBksYjGTd3fxdSpUtWAP/\n" +
            "A2AW1c3SiqB02RjANxjVvp2uSOR7O78jK6EhuPV28czPguRW94IvrTSXTgpJt8SV\n" +
            "oC2LYqzvZJDDuIVOZnC9gkb/ju+m0AqRsl2Q+kdIgyRLGIzpQa9nZkh4YHbcOhcX\n" +
            "LQ85je0o8M2y+9n3usqscD3m79AvDb2Mke2Dv6s44mUF+UUSYH2fDAx8WDa3x0/+\n" +
            "p7MKKXoo5Nw2mECWk3UESMyu3qj432ZFAgMBAAGjTzBNMEsGA1UdEQREMEKGQGFm\n" +
            "NjQxYTlkNDlhMTBlNWQwYjlmNjdlYjk5ZGM1YmYyYjdjYjRlYzM0MjMzZDVlNzg2\n" +
            "Y2IxNjIwY2MyMDg4YWEwDQYJKoZIhvcNAQEFBQADggEBAGkJTdr1V2Z9o/6UT6JC\n" +
            "Kz73qPk+z1PidJ2hj0KPKU/DF4A5RVTVoeh0RbrA2GBnhP3kxqPob1fTt7QjL0+K\n" +
            "kvC4/QHHyjlzdZOH6tVJ5QHbShVphWZuRsXp2jyvbMTP90qDygL37/GvmDw9C5Fu\n" +
            "Y1WckDFF87vpydXxH1ifpCA7bk2NP+2mhk8kxKK2XGazhRipW6gZS9RBhsWo78rm\n" +
            "weuRkqsOudTKfXeWNmWE4g9QC/t1EiWS8m5zXNckboAZUn0jZREBFyvBHdE2DCTc\n" +
            "t6f555ZW1uknP1JA50gcLb+zthM/ZNJZ52lv3QAs3WoUWiR7ex2UyjtL5c/HsZD6\n" +
            "4Rg=\n" +
            "-----END CERTIFICATE-----";
        let certdup = "-----BEGIN CERTIFICATE-----\n" +
            "AAAERcCCAkagAwIBAgIBATANBgkqhkiG9w0BAQUFADB/MR4wHAYDVQQDExV3aGlz\n" +
            "dGxlLjE1NzE4NTY4MzU5NzkxCzAJBgNVBAYTAkNOMQswCQYDVQQIEwJaSjELMAkG\n" +
            "A1UEBxMCSFoxITAfBgNVBAoTGDE1NzE4NTY4MzU5Nzkud3Byb3h5Lm9yZzETMBEG\n" +
            "A1UECxMKd3Byb3h5Lm9yZzAeFw0xOTEwMjMxOTUxMjRaFw0yMDEwMjMxOTUxMjRa\n" +
            "MBUxEzARBgNVBAMTCkRhdmUgSm9uZXMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw\n" +
            "ggEKAoIBAQCMgSLWPhg1DInVnYXp4/M3KpEJdMrUQXUh0J8nuzHvI+AR1UK+hNuk\n" +
            "58+5WDa4OrAvQrnAjRcqEba6diZ9BMf9hcFai6BT/OEjBksYjGTd3fxdSpUtWAP/\n" +
            "A2AW1c3SiqB02RjANxjVvp2uSOR7O78jK6EhuPV28czPguRW94IvrTSXTgpJt8SV\n" +
            "oC2LYqzvZJDDuIVOZnC9gkb/ju+m0AqRsl2Q+kdIgyRLGIzpQa9nZkh4YHbcOhcX\n" +
            "LQ85je0o8M2y+9n3usqscD3m79AvDb2Mke2Dv6s44mUF+UUSYH2fDAx8WDa3x0/+\n" +
            "p7MKKXoo5Nw2mECWk3UESMyu3qj432ZFAgMBAAGjTzBNMEsGA1UdEQREMEKGQDMw\n" +
            "NDExN2RhYjc4Y2I4MzQ1NGNlOGQ5ZmRmZmUzZGE3MWQ5MjA0OGJjNTI0ZDhlNmQw\n" +
            "ZDAyMzA4YmExMmFkMmQwDQYJKoZIhvcNAQEFBQADggEBAFPzvAn6D5poyahXkx84\n" +
            "KN0XIEC1Wv6GowrtMLCbItLD6kO1ejySlMPLx0jgN0O5I6jqBKaEksGYhqLfj+AY\n" +
            "YINrQw6recBxkGfq1pcWQfBv41FxsNfKR5qOSCs9C118VmJgS2PULHte4LXxJOMR\n" +
            "2/k9HZfysnChunCDziU0Jevw9FefQFzL8B9QKE57Txptbc48j9vBnOwQRcSuBXgc\n" +
            "avuQDf0Ip1q6nC9ifEU8WVFPLphZvSDN6EypgUBNfEWX4AAA89NnIWApWa37cjmN\n" +
            "I0dvj95KcPxRVdikxeFBtR3qES7styndYSlLRyTxgbUDIiBht5YRvn/IV2sUfALF\n" +
            "9wE=\n" +
            "-----END CERTIFICATE-----";
        let caCert = "-----BEGIN CERTIFICATE-----\n" +
            "MIID5jCCAs6gAwIBAgIBATANBgkqhkiG9w0BAQUFADB/MR4wHAYDVQQDExV3aGlz\n" +
            "dGxlLjE1NzE4NTY4MzU5NzkxCzAJBgNVBAYTAkNOMQswCQYDVQQIEwJaSjELMAkG\n" +
            "A1UEBxMCSFoxITAfBgNVBAoTGDE1NzE4NTY4MzU5Nzkud3Byb3h5Lm9yZzETMBEG\n" +
            "A1UECxMKd3Byb3h5Lm9yZzAeFw0xODEwMjMxODUzNTVaFw0yOTEwMjMxODUzNTVa\n" +
            "MH8xHjAcBgNVBAMTFXdoaXN0bGUuMTU3MTg1NjgzNTk3OTELMAkGA1UEBhMCQ04x\n" +
            "CzAJBgNVBAgTAlpKMQswCQYDVQQHEwJIWjEhMB8GA1UEChMYMTU3MTg1NjgzNTk3\n" +
            "OS53cHJveHkub3JnMRMwEQYDVQQLEwp3cHJveHkub3JnMIIBIjANBgkqhkiG9w0B\n" +
            "AQEFAAOCAQ8AMIIBCgKCAQEAjIEi1j4YNQyJ1Z2F6ePzNyqRCXTK1EF1IdCfJ7sx\n" +
            "7yPgEdVCvoTbpOfPuVg2uDqwL0K5wI0XKhG2unYmfQTH/YXBWougU/zhIwZLGIxk\n" +
            "3d38XUqVLVgD/wNgFtXN0oqgdNkYwDcY1b6drkjkezu/IyuhIbj1dvHMz4LkVveC\n" +
            "L600l04KSbfElaAti2Ks72SQw7iFTmZwvYJG/47vptAKkbJdkPpHSIMkSxiM6UGv\n" +
            "Z2ZIeGB23DoXFy0POY3tKPDNsvvZ97rKrHA95u/QLw29jJHtg7+rOOJlBflFEmB9\n" +
            "nwwMfFg2t8dP/qezCil6KOTcNphAlpN1BEjMrt6o+N9mRQIDAQABo20wazAMBgNV\n" +
            "HRMEBTADAQH/MAsGA1UdDwQEAwIC9DA7BgNVHSUENDAyBggrBgEFBQcDAQYIKwYB\n" +
            "BQUHAwIGCCsGAQUFBwMDBggrBgEFBQcDBAYIKwYBBQUHAwgwEQYJYIZIAYb4QgEB\n" +
            "BAQDAgD3MA0GCSqGSIb3DQEBBQUAA4IBAQCGNmne+OIfl20Y5mX9QMy38UovkVbU\n" +
            "EXAK4vXtTuHCe8fNfBTmTQa/u9uMrPbJB8AVjXdPIb2zEuj3sj9wyA3WA09ZwmYX\n" +
            "wsJJUWdaaosYPacvZDwmVpGGdEjon5hhl6Gwcqc0CZpQOPjIPfFkvZLzdoakdtzf\n" +
            "UvcZf5EifsFvMKc3wbV3N/UtkfA8iuuvFG5PMjy9VnjVOs7XuRvF7ljJiCHrj/QM\n" +
            "z7wkiwaPLkPy06Ur10XHJEFYiuspvR3aTsO582bq72zwdRl9C5NX+Uob8TRcCAwG\n" +
            "ypa0eZBPG3JWCeDJwW7Kdfh8A9IZIi98Xh2tEL0dWLzt46xh0VLaFicn\n" +
            "-----END CERTIFICATE-----";
        let caCert1 = "-----BEGIN CERTIFICATE-----\n" +
            "MIID5jCCAs6gAwIBAgIBATANBgkqhkiG9w0BAQUFADB/MR4wHAYDVQQDExV3aGlz\n" +
            "dGxlLjE1NzE5Mjg3MzYwNDYxCzAJBgNVBAYTAkNOMQswCQYDVQQIEwJaSjELMAkG\n" +
            "A1UEBxMCSFoxITAfBgNVBAoTGDE1NzE5Mjg3MzYwNDYud3Byb3h5Lm9yZzETMBEG\n" +
            "A1UECxMKd3Byb3h5Lm9yZzAeFw0xODEwMjQxNDUyMTZaFw0yOTEwMjQxNDUyMTZa\n" +
            "MH8xHjAcBgNVBAMTFXdoaXN0bGUuMTU3MTkyODczNjA0NjELMAkGA1UEBhMCQ04x\n" +
            "CzAJBgNVBAgTAlpKMQswCQYDVQQHEwJIWjEhMB8GA1UEChMYMTU3MTkyODczNjA0\n" +
            "Ni53cHJveHkub3JnMRMwEQYDVQQLEwp3cHJveHkub3JnMIIBIjANBgkqhkiG9w0B\n" +
            "AQEFAAOCAQ8AMIIBCgKCAQEA5kEK52z+YeKaUdjZWGnCy5CzgKq8qSmRNEj/TwJa\n" +
            "xdUrEb6gBHJqPoSkIaNXweFw3tt0ozYQ4R+J/Z7JFwUEBbJ4XKz9JVw/usUNjJgX\n" +
            "NoFGzb3jNmRxzyJt1tdsk19azTmmuzIkXP9V4rOsBJrT3aekI4AvQfcmxlJM2YgO\n" +
            "zoxAj5AR0ldUwIyxOqIISW4OjZZyPPviOiTbd5eq0aIs6PiOmTrVzhREc7+qVk8G\n" +
            "31/kN40s0EqEOJWfd1AdQtWOnOBZgAbjaDSoOrP9QJVSb86KYuY2Ol3I2lbWtLMU\n" +
            "GTdmpRLSh51PqIdyde0+fCVVqYtFWnSjC80loTa2wvVwIwIDAQABo20wazAMBgNV\n" +
            "HRMEBTADAQH/MAsGA1UdDwQEAwIC9DA7BgNVHSUENDAyBggrBgEFBQcDAQYIKwYB\n" +
            "BQUHAwIGCCsGAQUFBwMDBggrBgEFBQcDBAYIKwYBBQUHAwgwEQYJYIZIAYb4QgEB\n" +
            "BAQDAgD3MA0GCSqGSIb3DQEBBQUAA4IBAQBy0LxbLCapGNtDYuUqffQ5JZrEwFhb\n" +
            "PJawCdysIl19+q8WyDw/EwKXz3iZvF4HJMiVS+GGz+EOwFfBQOp7Wk3QHI20VKiE\n" +
            "hxMAIKEDsyFZ5dpDaoGPr/pIeAiNsMUcdkw+H1ZOSkqdoicFRiWQeE2NTibFZs9c\n" +
            "XtxBNA8qXm+H90J5EXSXNzR7m11IVfQdRps9CSMa3zh8mijmZYOWiIeSfcZC3wJ7\n" +
            "xOG6Nzjm6nKo6YZDct74FME3TKDVT5yYKUd9y528uQjW2AoGnuGF0VC5gw+Xd4jM\n" +
            "HfH0439FZ89XkDchB/rtfWTxAeNRLe3MKwXfu6HR2YoOmvegHUhHLJIX\n" +
            "-----END CERTIFICATE-----";

        let caCertFromPem = "", caCertFromPem1 = "", frCertFromPem = "", frCertFromPem1 = "";
        try {
            caCertFromPem = forge.pki.certificateFromPem(caCert);
            caCertFromPem1 = forge.pki.certificateFromPem(caCert1);
        } catch (e) {
            console.log('caCertFromPem - Failed to read cert (' + e + ')');
        }
        try {
            frCertFromPem = forge.pki.certificateFromPem(frCert);
        } catch (e) {
            console.log('frCertFromPem - Failed to read cert (' + e + ')');
        }
        try {
            frCertFromPem1 = forge.pki.certificateFromPem(frCert1);
        } catch (e) {
            alert(JSON.stringify(e.message));
            console.log('frCertFromPem1 - Failed to read cert (' + e + ')');
        }
        // let caCertFromPem = forge.pki.certificateFromPem(caCert);
        // let certFromPem = forge.pki.certificateFromPem(cert);
        // let certFromPem1 = forge.pki.certificateFromPem(certdup);
        // const csrPem = forge.pki.certificationRequestToPem(csr);
        return new Promise((resolve, reject) => {
            let caStore;
            try {
                // caCert = fs.readFileSync('path/to/ca-cert.pem').toString();
                caStore = forge.pki.createCaStore([caCertFromPem, caCertFromPem1]);
            } catch (e) {
                console.log('createCaStore - Failed to load CA certificate (' + e + ')');
                return;
            }
            try {
                // if (caCertFromPem1.verify(frCertFromPem1)) {
                //     resolve({success: true});
                //     console.log("FR cert is verified........!!");
                // } else {
                //     resolve({success: false});
                //     console.log("FR cert is not created by this IM........!!");
                // }
                resolve({ success: forge.pki.verifyCertificateChain(caStore, [certificate]) });
            } catch (e) {
                console.log('verifyCertificateChain - Failed to load CA certificate (' + JSON.stringify(e.message) + ')');
                reject({ success: false, message: JSON.stringify(e.message) });
                // handleResponse(new Error('Failed to verify certificate (' + e.message || e + ')'));
            }
        })
    }

    _onPressVerifyCertButton = () => {
        this.connectingSoi(this.state.frCert)
            .then((resp) => {
                if (resp.success) {
                    this.setState({ currentPosition: 4, isCertValid: true, isHashValid: false, serverResp: true, serverRespMsg: 'Certificate is valid!' })
                } else {
                    this.setState({ isCertValid: false, isHashValid: false, serverResp: false, serverRespMsg: 'Certificate is not valid!' })
                }
            }).catch((err) => {
                this.setState({ currentPosition: 2, showScanner: false, isQrScanned: true, isCertValid: false, isHashValid: false, serverResp: false, serverRespMsg: JSON.parse(err.message) })
            })
    };

    _onPressButton = (flag) => {
        const { navigate } = this.props.navigation;
        if (flag === 'sdl') {
            this.setState({ scanningDl: true, showScanner: true, qrMsg: 'Scanning Driving Licence' })
        } else if (flag === 'scsr') {
            this.setState({ showScanner: true, qrMsg: 'Scanning CSR QR Code' })
        } else if (flag === 'sqr') {
            this.setState({ showScanner: true, qrMsg: 'Scanning First Responder QR Code', reactivateScanner: false })
        } else if (flag === 'cancel' || flag === 'home') {
            navigate('Welcome');
        } else if (flag === 'scan_again_qr') {
            this.setState({ currentPosition: 2, isQrScanned: false, areHashesMatched: false, showScanner: true }, () => {
                this.scanner.reactivate();
            })
        } else if (flag === 'try_again') {
            this.setState({ isQrScanned: false, isCertValid: false, isHashValid: false, areHashesMatched: false, reactivateScanner: false },
                () => {
                    this.setState({ showScanner: true, networkErr: false })
                })
        } else if (flag === 'scan_again') {
            this.setState({
                currentPosition: 0,
                step: 0,
                isHashValid: false,
                isCertValid: false,
                serverResp: null,
                dlHashOne: null,
                areHashesMatched: null,
                dlHashTwo: null,
                showScanner: true,
                scanningDl: true,
                reactivateQr: false,
                isQRCodeGenerated: false,
                isDlScanned: false,
                isQrScanned: false,
                qrMsg: '',
                qrCodeValue: '',
                serverRespMsg: '',
                frCsr: '',
            })
        } else {
            verifyHash(this.state.dlHashOne)
                .then((res) => {
                    if (!res.success) {
                        this.setState({ serverResp: true, serverRespMsg: 'Hash Verified!' })
                    } else {
                        this.setState({ serverResp: false, serverRespMsg: 'Hash Not Verified!' })
                    }
                }).catch((err) => {
                    console.log('err: ', err);
                });
        }
    }

    render() {
        if (this.state.networkErr) {
            return (
                <View style={styles.outerContainer}>
                    <View style={styles.container}>
                        <View style={styles.badgeView}>
                            <Wifi fill={colors.red} width={140} height={140} style={styles.sectionTitle} />
                            <Text style={styles.titleText}>{this.state.networkErrMsg}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button btnType={'default'} btnText={'Try Again'} btnFlag={'try_again'} _onPressButton={this._onPressButton} />
                        <Button btnType={'default'} btnText={'Cancel'} btnFlag={'cancel'} _onPressButton={this._onPressButton} />
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.outerContainer}>
                <ScrollView style={styles.scrollView}>
                    <StepIndicator currentPosition={this.state.currentPosition} />
                    {this.state.showScanner &&
                        <Scanner
                            onSuccess={this.onSuccess}
                            _onPressButton={this._onPressButton}
                            reactivateScanner={this.state.reactivateScanner}
                        />
                    }
                    {!this.state.showScanner && this.state.serverResp !== null &&
                        <ServerResponse
                            isHashValid={this.state.isHashValid}
                            isCertValid={this.state.isCertValid}
                            serverRespMsg={this.state.serverRespMsg}
                            _onPressButton={this._onPressButton}
                            isQrScanned={this.state.isQrScanned}
                        />}

                    {!this.state.showScanner && this.state.isCertValid &&
                        <CertificateValidation
                            isHashValid={this.state.isHashValid}
                            isCertValid={this.state.isCertValid}
                            serverRespMsg={this.state.serverRespMsg}
                            _onPressButton={this._onPressButton}
                        />
                    }
                    {!this.state.areHashesMatched && !this.state.serverResp && this.state.isQrScanned &&
                        <HashesNotMatch
                            _onPressButton={this._onPressButton}
                        />
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    titleText: {
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: 20,
        color: colors.red
    },
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50
    },
    badgeView: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        alignItems: 'center',
        height: '100%'
    },
    cameraContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        alignItems: 'center',
        marginTop: 15
    },
    containerOne: {
        flex: 1,
        justifyContent: 'center',
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    centerText: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 8
    },
    buttonContainer: {
        margin: 7,
        flex: 1,
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: colors.blue,
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#fff',
        marginLeft: 8,
        marginRight: 8
    },

    btnText: {
        color: colors.white
    },
    badgeView: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'stretch',
        width: '100%',
        marginBottom: 30,
        marginTop: 30

    },
    sectionTitle: {
        // flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'stretch',
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 30
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default ScanScreen;