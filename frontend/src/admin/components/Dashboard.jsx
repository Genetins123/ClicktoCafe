import FoodList from "./FoodList"
import RestaurantList from "./RestaurantList"





function Dashboard(){
    return(
        <>
        <h1 className="text-2xl  text-orange-500 font-bold text-center">Welcome to Admin Panel</h1>
        <br /><br />

           <FoodList />
           <RestaurantList />
        </>
    )
}

export default Dashboard