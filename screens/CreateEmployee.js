import React , {useState} from 'react';
import { StyleSheet, View , Modal, Alert , KeyboardAvoidingView} from 'react-native';
import {TextInput , Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

const CreateEmployee = ({navigation,route}) => {


    const handleSubmit = () => {
        fetch("https://9ab9f47c8140.ngrok.io/send-data", {
            method : "post",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                name,
                email,
                phone,
                image,
                salary,
                position
            })
        })
        .then(res => res.json())
        .then(data =>{ 
            Alert.alert(`${data.name} is saved successfully`)
            navigation.navigate('Home')
        })
        .catch(err => console.log(err))
    }
    const handleUpdate = () => {
        fetch("https://9ab9f47c8140.ngrok.io/update", {
            method : "post",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id:route.params["_id"],
                name,
                email,
                phone,
                image,
                salary,
                position
            })
        })
        .then(res => res.json())
        .then(data =>{ 
            Alert.alert(`${data.name} is updated successfully`)
            navigation.navigate('Home')
        })
        .catch(err => console.log(err))
    }

    const pickFromGallery = async () => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted) {
            const data = await ImagePicker.launchImageLibraryAsync ({
                mediaTypes : ImagePicker.MediaTypeOptions.Images,
                allowsEditing : true,
                aspect : [1,1],
                quality : 1
            })
        if(!data.cancelled){
            let newFile = {
                uri : data.uri,
                type : `test/${data.uri.split('.')[1]}`,
                name : `test/${data.uri.split('.')[1]}`
            }
            handleUpload(newFile);
        }

        }else {
            Alert.alert("You have to give permissions to work.")
        }
    }
    const pickFromCamera = async () => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
        if(granted) {
            const data = await ImagePicker.launchCameraAsync ({
                mediaTypes : ImagePicker.MediaTypeOptions.Images,
                allowsEditing : true,
                aspect : [1,1],
                quality : 1
            })
            if(!data.cancelled){
                let newFile = {
                    uri : data.uri,
                    type : `test/${data.uri.split('.')[1]}`,
                    name : `test/${data.uri.split('.')[1]}`
                }
                handleUpload(newFile);
            }            
        }else {
            Alert.alert("You have to give permissions to work.")
        }
    }

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file' , image)
        data.append('upload_preset' , 'employeeapp')
        data.append('cloud_name' , 'soham')

        fetch ('https://api.cloudinary.com/v1_1/soham/image/upload', {
            method : 'post',
            body : data
        }).then(res => res.json())
        .then(res => {
            setImage(res.url)
            setModal(false)
        })
    }

    const getDetails= (type)=> {
        if (route.params){
            return route.params[type]
        }
        else return ""
    }

    const [name , setName] = useState(getDetails("name")); //basically used to give state to a functional component
    const [phone , setPhone] = useState(getDetails("phone"));
    const [email , setEmail] = useState(getDetails("email"));
    const [salary , setSalary] = useState(getDetails("salary"));
    const [image , setImage] = useState(getDetails("image"));
    const [position , setPosition] = useState(getDetails("position"));
    const [modal , setModal] = useState(false);
    const [enableView,setEnableView]=useState(false)
    return (
        <KeyboardAvoidingView behavior="position" enabled={enableView} style={styles.root}>
            <TextInput
                label='Name'
                style={styles.input}
                value={name}
                theme={theme}
                mode="outlined"
                onChangeText={text => setName(text)}
            />
            <TextInput
                label='Email'
                style={styles.input}
                value={email}
                theme={theme}
                mode="outlined"
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label='Phone'
                style={styles.input}
                value={phone}
                theme={theme}
                keyboardType="phone-pad"
                mode="outlined"
                onChangeText={text => setPhone(text)}
            />
            <TextInput
                label='Salary'
                style={styles.input}
                value={salary}
                theme={theme}
                onFocus={()=> setEnableView(true)}
                onBlur={()=> setEnableView(false)}
                mode="outlined"
                onChangeText={text => setSalary(text)}
            />
            <TextInput
                label='Position'
                style={styles.input}
                value={position}
                theme={theme}
                mode="outlined"
                onFocus={()=> setEnableView(true)}
                onBlur={()=> setEnableView(false)}
                onChangeText={text => setPosition(text)}
            />
            <Button icon={image? 'check' : 'upload'} style={styles.button} theme={theme} mode="contained" onPress={() => setModal(true)}>
               upload
            </Button>
            {route.params?
            <Button icon="content-save" style={styles.button} theme={theme} mode="contained" onPress={() => handleUpdate()}>
            Update Details
         </Button>
            :
            <Button icon="content-save" style={styles.button} theme={theme} mode="contained" onPress={() => handleSubmit()}>
            save
         </Button>
            }
            <Modal
            style={styles.modal}
            animationType="slide"
            transparent={false}
            visible={modal}
            onRequestClose={()=> {setModal(false)}}
            >
                <View>
                    <View style={styles.modalButtonView}>
                        <Button mode="contained" icon="camera-image" theme={theme} onPress={() => pickFromCamera()}>
                            Camera
                        </Button>
                        <Button mode="contained" icon="folder-image" theme={theme} onPress={() => pickFromGallery()}>
                            Gallery
                        </Button>
                    </View>
                    <Button theme={theme} onPress={() => setModal(false)}>
                        cancel
                    </Button>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const theme = {
    colors : {
        primary : '#ffffff',
        background :'#303a52'
    }
}

const styles = StyleSheet.create({
    root: {
        flex:1 ,  // to take total height of parent
        margin : 10
    },
    input : {
        margin : 5
    },
    button : {
        margin : 10
    },
    modal : { 
        position : 'absolute',
        bottom : 2,
        height : '30%',
        width : '100%'
    },
    modalButtonView : {
        flexDirection : "row",
        justifyContent : "space-around",
        padding : 10
    },
});

export default CreateEmployee;