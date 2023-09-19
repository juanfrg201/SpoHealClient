import {createAppContainer} from "react-navigation" 
import {createStackNavigator} from "react-navigation-stack"
import Home from "../src/home"
import Register from "../src/user/register"
import Login from "../src/user/login"
import Parametizer from "../src/user/parametizer"
import Index from "../src/menu/index"

const screens = {
    Home:{
        screen: Home
    },
    Register:{
        screen: Register
    },
    Login:{
        screen: Login
    },
    Parametizer:{
        screen: Parametizer
    },
    Index:{
        screen: Index
    }
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)