import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Button,
    Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators as actions } from '../../redux/actions/index';
// import { requestLogin } from '../../redux/actions/loginActions';
const { width, height } = Dimensions.get("window");
import Icon from 'react-native-vector-icons/Ionicons';

class HomeFeed extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    title: "Lorem ipsum dolor",
                    time: "1 days a go",
                    image: "https://i.picsum.photos/id/0/5616/3744.jpg"
                },
                {
                    id: 2,
                    title: "Sit amet, consectetuer",
                    time: "2 minutes a go",
                    image: "https://i.picsum.photos/id/10/2500/1667.jpg"
                },
                {
                    id: 3,
                    title: "Dipiscing elit. Aenean ",
                    time: "3 hour a go",
                    image: "https://i.picsum.photos/id/1/5616/3744.jpg"
                },
                {
                    id: 4,
                    title: "Commodo ligula eget dolor.",
                    time: "4 months a go",
                    image: "https://i.picsum.photos/id/100/2500/1656.jpg"
                },
                {
                    id: 5,
                    title: "Aenean massa. Cum sociis",
                    time: "5 weeks a go",
                    image: "https://i.picsum.photos/id/1001/5616/3744.jpg"
                },
                {
                    id: 6,
                    title: "Natoque penatibus et magnis",
                    time: "6 year a go",
                    image: "https://i.picsum.photos/id/1002/4312/2868.jpg"
                },
                {
                    id: 7,
                    title: "Dis parturient montes, nascetur",
                    time: "7 minutes a go",
                    image: "https://i.picsum.photos/id/1003/1181/1772.jpg"
                },
                {
                    id: 8,
                    title: "Ridiculus mus. Donec quam",
                    time: "8 days a go",
                    image: "https://i.picsum.photos/id/1005/5760/3840.jpg"
                },
                {
                    id: 9,
                    title: "Felis, ultricies nec, pellentesque",
                    time: "9 minutes a go",
                    image: "https://i.picsum.photos/id/101/2621/1747.jpg"
                },
                {
                    id: 10,
                    title: "Sit amet, consectetuer",
                    time: "2 minutes a go",
                    image: "https://i.picsum.photos/id/10/2500/1667.jpg"
                },
                {
                    id: 11,
                    title: "Dipiscing elit. Aenean ",
                    time: "3 hour a go",
                    image: "https://i.picsum.photos/id/1/5616/3744.jpg"
                },
                {
                    id: 12,
                    title: "Commodo ligula eget dolor.",
                    time: "4 months a go",
                    image: "https://i.picsum.photos/id/100/2500/1656.jpg"
                },
                {
                    id: 13,
                    title: "Aenean massa. Cum sociis",
                    time: "5 weeks a go",
                    image: "https://i.picsum.photos/id/1001/5616/3744.jpg"
                },
                {
                    id: 14,
                    title: "Natoque penatibus et magnis",
                    time: "6 year a go",
                    image: "https://i.picsum.photos/id/1002/4312/2868.jpg"
                },
            ]
        };
    }

    componentDidUpdate(preProps, preState) {
        console.log("didupdateHome:", preProps, this.props)
    }

    handlePress = () => {
        const { navigate } = this.props.navigation;
        this.props.recommendedUsers();
        // navigate('UsersList');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { this.handlePress() }}>
                    <Text style={{ backgroundColor: 'red', marginTop: 30 }}>See more</Text>
                </TouchableOpacity>
                <FlatList style={styles.list}
                    data={this.state.data}
                    keyExtractor={(item) => {
                        return item.id.toString();
                    }}
                    // keyExtractor = {(item, index) => 'list-item-${index}'}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator} />
                        )
                    }}
                    renderItem={(post) => {
                        const item = post.item;
                        return (
                            <View style={styles.card}>

                                <View style={styles.cardHeader}>
                                    <View>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.time}>{item.time}</Text>
                                    </View>
                                </View>

                                <Image style={styles.cardImage} source={{ uri: item.image }} />

                                <View style={styles.cardFooter}>
                                    <View style={styles.socialBarContainer}>
                                        <View style={styles.socialBarSection}>
                                            <TouchableOpacity style={styles.socialBarButton}>
                                                <Image style={styles.icon}
                                                    source={{ uri: 'https://png.icons8.com/android/75/e74c3c/hearts.png' }} />
                                                <Text style={styles.socialBarLabel}>78</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.socialBarSection}>
                                            <TouchableOpacity style={styles.socialBarButton}>
                                                <Image style={styles.icon}
                                                    source={{ uri: 'https://png.icons8.com/ios-glyphs/75/2ecc71/comments.png' }} />
                                                <Text style={styles.socialBarLabel}>25</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.socialBarSection}>
                                            <TouchableOpacity style={styles.socialBarButton}>
                                                <Image style={styles.icon}
                                                    source={{ uri: 'https://png.icons8.com/metro/75/3498db/administrator-male.png' }} />
                                                <Text rkType='primary4 hintColor'
                                                    style={styles.socialBarLabel}>13</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }} />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'grey',
        paddingHorizontal: 18,
        paddingTop: 5,
    },
    list: {
        paddingHorizontal: 17,
        backgroundColor: "#E6E6E6",
    },
    separator: {
        marginTop: 10,
    },
    /******** card **************/
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: "white"
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage: {
        flex: 1,
        height: 150,
        width: null,
    },
    /******** card components **************/
    title: {
        fontSize: 18,
        flex: 1,
    },
    time: {
        fontSize: 13,
        color: "#808080",
        marginTop: 5
    },
    icon: {
        width: 25,
        height: 25,
    },
    /******** social bar ******************/
    socialBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    socialBarSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    socialBarlabel: {
        marginLeft: 8,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = state => {
    console.log("recommedndedUser state:", state)
    return {
        user: state.userProfileReducer.user
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ recommendedUsers: actions.recommendedUsers }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed);