import FoodList from "./FoodList"
import RestaurantList from "./RestaurantList"
import StoreList from "./RestaurantList"





function Dashboard(){
    return(
        <>
        <h1 className="text-2xl font-bold text-center">Welcome to Admin Panel</h1>
        <br /><br />

           <FoodList />
           <RestaurantList />
        </>
    )
}

export default Dashboard