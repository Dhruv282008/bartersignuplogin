import React from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,ScrollView,Alert,KeyboardAvoidingView, Modal, ToastAndroid} from 'react-native';
import * as firebase from 'firebase'
import db from '../config'
export default class Welcome extends React.Component {

    constructor(){
        super();
        this.state={
          emailId : '',
          password: '',
          firstName :'',
          lastName: '',
          address: '',
          contact: '',
          confirmPassword: '',
          isModalVisible: false
        }
      }
    userSignUp = (emailId, password, confirmPassword)=>{
      if(password != confirmPassword){
        return(Alert.alert("Password doesn't match!"))
      }
      else{
        firebase.auth().createUserWithEmailAndPassword(emailId, password)
        .then(()=>{
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            email_Id: this.state.emailId,
            address: this.state.address,
          })
          return(ToastAndroid.show("User Added Successfully!",ToastAndroid.SHORT))
        })
        .catch((error)=>{
          return(
            Alert.alert(error.message)
          )
        })
      }
    }
      login=async(email,password)=>{
        if (email && password){
          try{
            const response = await firebase.auth().signInWithEmailAndPassword(email,password)
            if(response){
              this.props.navigation.navigate('Registration')
            }
          }
          catch(error){
            switch (error.code) {
              case 'auth/user-not-found':
                Alert.alert("User does not exist")
                console.log("doesn't exist")
                break
              case 'auth/invalid-email':
                Alert.alert('Incorrect email or password')
                console.log('invalid')
                break
            }
          }
        }
        else{
            Alert.alert('Enter email and password');
        }
      }
      showModal = ()=>{
        return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          >
          <View style={styles.modalContainer}>
          <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
                >Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Confrim Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }
                >
                <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
                  <TouchableOpacity
                    style={styles.cancelButton}
                  onPress={()=>this.setState({"isModalVisible":false})}
                >
                <Text>Cancel</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
              </ScrollView>
          </View>
        </Modal>
      )
      }
        render(){
          return(
            <View style={styles.container}>
              <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Image
                source={require("../assets/logo.png")}
                style={{width:250, height: 250, marginBottom: 10}}/>
              <Text style={{textAlign: 'center', fontSize: 30, color: 'blue'}}>Barter System</Text>

              </View>
                {
                  this.showModal()
                }
              <View style={{justifyContent:'center', alignItems:'center'}}>
                
              </View>
              <View>
                  <TextInput
                  style={styles.loginBox}
                  placeholder="abc@example.com"
                  keyboardType ='email-address'
                  onChangeText={(text)=>{
                    this.setState({
                      emailId: text
                    })
                  }}
                />
                <TextInput
                style={styles.loginBox}
                secureTextEntry = {true}
                placeholder="Enter Password"
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              />
              <TouchableOpacity
                 style={styles.button}
                 onPress = {()=>{
                   this.login(this.state.emailId, this.state.password)
                 }}
                 >
                 <Text style = {styles.buttonText}>Login</Text>
               </TouchableOpacity>
      
               <TouchableOpacity
                 style={styles.button}
                 onPress={()=>this.setState({ isModalVisible:true})}
                 >
                 <Text style = {styles.buttonText}>SignUp</Text>
               </TouchableOpacity>
            </View>
          </View>
          )
        }
      }


      const styles = StyleSheet.create({
        container:{
         flex:1,
         backgroundColor:'lightgreen',
         alignItems: 'center',
         justifyContent: 'center'
       },
       profileContainer:{
         flex:1,
         justifyContent:'center',
         alignItems:'center',
       },
       title :{
         fontSize:65,
         fontWeight:'300',
         paddingBottom:30,
         color : 'darkgreen'
       },
       loginBox:{
         width: 300,
         height: 40,
         marginTop: 25,
         borderBottomWidth: 2,
         borderColor : 'blue',
         fontSize: 20,
         margin:10,
         paddingLeft:10,
         fontStyle: 'italic',
         color: 'darkgreen'
       },
       KeyboardAvoidingView:{
         flex:1,
         justifyContent:'center',
         alignItems:'center'
       },
       modalTitle :{
         justifyContent:'center',
         alignSelf:'center',
         fontSize:30,
         color:'darkgreen',
         margin:50
       },
       modalContainer:{
         flex:1,
         borderRadius:20,
         justifyContent:'center',
         alignItems:'center',
         backgroundColor:"lightblue",
         marginRight:30,
         marginLeft : 30,
         marginTop:80,
         marginBottom:80,
       },
       formTextInput:{
         width:"75%",
         height:35,
         alignSelf:'center',
         borderColor:'darkblue',
         borderRadius:10,
         borderBottomWidth:2,
         marginTop:20,
         padding:10,
       },
       registerButton:{
         width:200,
         height:40,
         alignItems:'center',
         justifyContent:'center',
         borderWidth:1,
         borderRadius:10,
         marginTop:30,
         backgroundColor: 'darkblue'
       },
       registerButtonText:{
         color:'#ff5722',
         fontSize:15,
         fontWeight:'bold',
         color: 'lightblue'
       },
       cancelButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        color: 'blue'
       },
      
       button:{
         width:300,
         height:50,
         justifyContent:'center',
         alignItems:'center',
         borderRadius:20,
         backgroundColor:"lightblue",
         marginTop: 10
       },
       buttonText:{
         color:'#ffff',
         fontWeight:'200',
         fontSize:15,
         color: 'blue'
         
       }
      })
      