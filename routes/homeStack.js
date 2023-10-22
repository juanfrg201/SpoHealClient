import {createAppContainer} from "react-navigation" 
import {createStackNavigator} from "react-navigation-stack"
import Home from "../src/home"
import Register from "../src/user/register"
import Login from "../src/user/login"
import Parametizer from "../src/user/parametizer"
import Index from "../src/menu/index"
import Inicio from "../src/user/inicio"
import Community from "../src/user/community"

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
    
    
    Index:{
        screen: Index
    },
    Community:{
        screen: Community
    },
    
    
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)