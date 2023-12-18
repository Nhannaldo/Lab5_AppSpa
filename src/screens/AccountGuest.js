import  React,{useEffect}  from  'react';
import  {  View,  StyleSheet,  TouchableOpacity, Text, Image  }  from  'react-native'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMyContextController, signOut } from '../context'
export const AccountGuest = ({navigation}) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const handleLogout = async () => {
        await signOut(dispatch, navigation);
      };
      useEffect(() => {
        if (!userLogin) {
          navigation.replace('Login');
        }
      }, [userLogin, navigation]);
    return (
        <View style={styles.container}>
            
            <View style={styles.img}>
                <Image
                source={require("../../assets/avatar.png")}
                style={styles.avatar}
                />
                <Text style={{fontWeight: 'bold', color:"white", fontSize: 20,paddingBottom: 20}}>
                    {userLogin ? userLogin.username : "Tên người dùng"}
                </Text>
            </View>
            <View>
                <View style={styles.info}>
                    <View style={styles.item}>
                        <MaterialCommunityIcons name="email" style={styles.icon}></MaterialCommunityIcons>
                        <View style={styles.itemchild}>
                            <Text style={{fontWeight: "bold", color: "black"}}>Email</Text>
                            <Text style={{color: "#4169E1"}}>{userLogin ? userLogin.Email : "example@example.com"}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.item}>
                        <MaterialCommunityIcons name="phone" style={styles.icon}></MaterialCommunityIcons>
                        <View style={styles.itemchild}>
                            <Text style={{fontWeight: "bold", color: "black"}}>PhoneNumber</Text>
                            <Text style={{color: "#4169E1"}}>{userLogin ? userLogin.SDT : "0000000"}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.item}>
                        <MaterialCommunityIcons name="shield-account" style={styles.icon}></MaterialCommunityIcons>
                        <View style={styles.itemchild}>
                            <Text style={{fontWeight: "bold", color: "black"}}>Role</Text>
                            <Text style={{color: "#4169E1"}}>{userLogin ? userLogin.Role : "123456"}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View>
            <TouchableOpacity
                style={styles.btn}
                onPress={handleLogout}
            >
                <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons name="logout" style={{fontSize: 22, color: "white"}}/>
                    <Text style={styles.btntext}>Sign Out</Text>
                </View>
                
            </TouchableOpacity>
            </View>
        </View>
    );
};
const  styles  =  StyleSheet.create({ 
    container: {
        flex: 1,
    },
    btn:{
        backgroundColor:"red",
        width: "90%",
        padding: 15,
        borderRadius: 8,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        height: 50
    },
    btntext:{
        color: 'white',
        fontWeight:'bold',
        fontSize: 16,
        marginLeft: 5
    },
    info:{
        marginTop: 20,
        borderBottomWidth: 0.2,
        borderBottomColor: "grey",
    },
    avatar:{
        width: 150,
        height: 150,
    },
    img:{
        backgroundColor: "#1E90FF",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    item:{
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 10
    },
    itemchild:{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10
    },
    icon:{
        fontSize: 30
    }
    
});