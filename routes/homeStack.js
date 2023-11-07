import {createAppContainer} from "react-navigation" 
import {createStackNavigator} from "react-navigation-stack"
import Home from "../src/home"
import Register from "../src/user/register"
import Login from "../src/user/login"
import Parametizer from "../src/user/parametizer"
import Index from "../src/menu/index"
import Inicio from "../src/user/inicio"
import Community from "../src/user/community"
import Ejercice from "../src/user/ejercice"
import CommunityPost from "../src/user/community_post"
import CreateCommunityPost from "../src/user/create_community_post"
import CommunityCreate from "../src/user/communities/create"
import LogoutButton from "../src/modal/LogoutButton"

const screens = { 
    Home:{
        screen: Home
    },
    Inicio:{
        screen: Inicio
    },
    Register:{
        screen: Register
    },
    LogoutButton:{
        screen: LogoutButton
    },
    Parametizer:{
        screen: Parametizer 
    },
    Parametizer:{
        screen: Parametizer 
    },
    Login:{
        screen: Login
    },
    Home:{
        screen: Home
    },
    CommunityPost: {
        screen: CommunityPost
    },
    CreateCommunityPost:{
        screen: CreateCommunityPost
    },
    
    Index:{
        screen: Index
    },
    Community:{
        screen: Community
    },
    CommunityCreate:{
        screen: CommunityCreate
    },
    Ejercice:{
        screen: Ejercice
    },
    
    
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)