import {createAppContainer} from "react-navigation" 
import {createStackNavigator} from "react-navigation-stack"
import Home from "../src/home"
import Register from "../src/user/register"
import Login from "../src/user/login"

const screens = {
    Home:{
        screen: Home
    },
    Register:{
        screen: Register
    },
    Login:{
        screen: Login
    }
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)