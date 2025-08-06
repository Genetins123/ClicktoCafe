import FoodList from "./FoodList"
import StoreList from "./StoreList"





function Dashboard(){
    return(
        <>
        <h1 className="text-2xl font-bold text-center">Welcome to Admin Panel</h1>
        <br /><br />

           <FoodList />
           <StoreList />
        </>
    )
}

export default Dashboard