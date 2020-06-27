import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image , FlatList ,ActivityIndicator, Alert} from 'react-native';
import {Card , FAB} from 'react-native-paper';

const Home = (props) => {
    const [data ,setData] = useState([])
    const [loading , setLoading] = useState(true) 

    const fetchData = () => {
        fetch('https://9ab9f47c8140.ngrok.io/')
        .then(res => res.json())
        .then(items => {
            console.log(items+ 'items')
            setData(items)
            console.log(data + 'data')
            setLoading(false)
        })
        .catch(err=> Alert.alert(err))
    }

    useEffect(() => fetchData(),[])

    const renderThis = (item) => {
        return(        
        <Card style={styles.myCard} onPress={()=> props.navigation.navigate('Profile' , {item})}>
            <View style={styles.cardView}>
                <Image 
                style={{height:50 , width: 50 , borderRadius:50/2 , margin:10}}
                source={{uri: item.image}}
                />
                <View>
                    <Text style={{fontSize:22, color : '#ffffff'}}>{item.name}</Text>                    
                    <Text style={{fontSize:16, color : '#ffffff'}}>{item.position}</Text>
                </View>

            </View>
        </Card>
        );
    };
    return(
        <View style={styles.root}>
            {loading ?    
               <ActivityIndicator size="large" color="#0000ff" />
                :
                <FlatList  //used instead of map to increase efficiency
                data={data}
                renderItem={({item})=>{
                    return renderThis(item);
                }}
                keyExtractor ={item=> `${item._id}`}
                onRefresh ={() => fetchData()}
                refreshing={loading}
                />
            }      
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => props.navigation.navigate('Create')}
                theme={{colors:{accent:"#fc85ae"}}}
            /> 
        </View>
    );
}

const styles = StyleSheet.create({//styles can be given without this function but its good for error checking and stuff
    root : {
        flex : 1
    },  
    myCard : {
        backgroundColor : '#1e2535',
        padding : 10,
        margin : 10,
        width: '90%'
    },
    cardView: {
        flexDirection:"row"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
});

export default Home;