import {createAppContainer} from "react-navigation" 
import {createStackNavigator} from "react-navigation-stack"
import Home from "../src/home"
import Register from "../src/user/register"
import Login from "../src/user/login"
import Parametizer from "../src/user/parametizer"
import Index from "../src/menu/index"
import Inicio from "../src/user/inicio"
import Community from "../src/user/community"
import CommunityPost from "../src/user/community_post"
import CreateCommunityPost from "../src/user/create_community_post"
import CommunityCreate from "../src/user/communities/create"

const screens = {
    Inicio:{
        screen: Inicio
    },
    Parametizer:{
        screen: Parametizer
        
    },
    
    Register:{
        screen: Register
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
    
    
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)