import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    Button
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Loader } from "../../components/loader";
import {EmailEnvelopeOne} from '../../assets';
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");

const accessToken = "3037519972.1677ed0.52a14a1505524e469810bbd082331214";

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={EmailEnvelopeOne}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}

class HomeScreen extends React.Component {
    state = {
        loaded: true,
        data: null,
        comments: []
    };

    componentDidMount() {
        this.fetchFeed();
    }

    createPost = (postInfo, index) => {
        const imageUri = postInfo.images.standard_resolution.url;
        const username = postInfo.user.username.toString();
        const numlikes = postInfo.likes.count;

        return (
            <View>
                <View style={styles.infoContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                        <View style={styles.profileImage} />
                        <Text style={styles.infoText}>{username}</Text>
                        {/*<SimpleLineIcons name={'search'} size={28}/>;*/}
                    </View>
                    <MaterialCommunityIcons name="dots-vertical" size={26} color="gray" />
                </View>

                <Image style={styles.image} source={{ uri: imageUri }} />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 12
                    }}
                >
                    <TouchableOpacity>
                        <SimpleIcons name="heart" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 15 }}>
                        <FontAwesomeIcons name="comment-o" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SimpleIcons name="paper-plane" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.infoText}>
                    {numlikes + (numlikes !== 1 ? " likes" : " like")}
                </Text>
                <View style={{ paddingLeft: 10 }}>{this.state.comments[index]}</View>
            </View>
        );
    };

    makeCommentsList = async posts => {
        let postsArray = posts.map(async post => {
            const postId = post.id;
            if (post.comments.count === 0) {
                return (
                    <View style={styles.comment} key={postId}>
                        <Text>No Comments!</Text>
                    </View>
                );
            }
            const response = await fetch(
                `https://api.instagram.com/v1/media/${postId}/comments?access_token=${accessToken}`
            );
            const comments = await response.json();
            const commentsArray = comments.data;

            const commentsList = commentsArray.map(commentInfo => (
                <View style={styles.comment} key={commentInfo.id}>
                    <Text style={styles.commentText}>{commentInfo.from.username}</Text>
                    <Text>{commentInfo.text}</Text>
                </View>
            ));
            return commentsList;
        });
        postsArray = await Promise.all(postsArray);
        return postsArray;
    };

    async fetchFeed() {
        const response = await fetch(
            `https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}`
        );

        const posts = await response.json();
        const comments = await this.makeCommentsList(posts.data);

        this.setState({
            loaded: false,
            data: posts.data,
            comments
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loaded} text="Loading..." />
                {/*<View style={styles.header}>*/}
                {/*    <Icon name='camera' size={28} color='black'/>*/}
                {/*    <Icon name='paper-plane' size={28} color='black'/>*/}
                {/*</View>*/}
                <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) => this.createPost(item, index)}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // marginTop:100,
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'grey',
        paddingHorizontal: 20,
        paddingTop: 5,
    },
    headerText: {
        textAlign: "center",
        flex: 1,
        fontFamily: "lobster_regular",
        fontSize: 22
    },
    inputWrapper: {
        marginTop: 20
    },
    profileImage: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: width * 0.4,
        borderWidth: 1
    },
    image: {
        width,
        height: width * 0.8
    },
    infoContainer: {
        flexDirection: "row",
        paddingHorizontal: 8,
        paddingVertical: 10,
        flex: 1,
        alignItems: "center"
    },
    infoText: {
        fontSize: 16,
        paddingLeft: 10,
        fontWeight: "bold"
    }
});

export default HomeScreen;