import React, { Component } from 'react';
import {
    FlatList,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Alert
} from 'react-native';
import flatListData from '../data/flatlistData';
import Swipeout from 'react-native-swipeout';

class FlatListItem extends Component {
   
    constructor(props){
        super(props);

        this.state = { 
            activeRowKey: null
        }
    }

    render() {

        const swipeSettings = { 
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                this.setState({ activeRowKey: null })
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item.key })
            },
            right:[
                {
                    onPress: () =>{
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure wnat to delete ?',
                            [
                                {text: 'No', onPress: () => console.log('Cancel Pressend'), style: 'cancel'},
                                {text: 'Yes', onPress: () =>{
                                    flatListData.splice(this.props.index, 1);

                                    this.props.parentFlatList.refreshFlatList(deletingRow);
                                }},
                            ],
                            {cancelable: true}
                        );
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        };

        return (
            <Swipeout { ...swipeSettings }>
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', flex: 1, backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato' }}>
                    <Image
                        source={{ uri: this.props.item.imageUrl }}
                        style={{ width: 100, height: 100, margin: 5 }}
                    ></Image>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                        <Text style={styles.flatListItem}>{this.props.item.foodDescription}</Text>
                    </View>
                </View>
                <View style={{ height:5, backgroundColor: 'white' }}>
                </View>
            </View>
            </Swipeout>
        );
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 5,
        fontSize: 16
    }
})

export default class BasicFlatList extends Component {
    constructor(props){
        super(props);
        this.state = {
            deletedRowKey: null,
        }
    }
    refreshFlatList = (deletedKey) => {
        this.setState((prevState) =>{
            return{
                deletedRowKey: deletedKey
            };
        });
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 20 }}>
                <FlatList
                    data={flatListData}
                    renderItem={({ item, index }) => {
                        return (<FlatListItem item={item} index={index} parentFlatList={this}>
                        </FlatListItem>);
                    }}
                >
                </FlatList>
            </View>
        )
    };
}