import shoes from "./data.js";
import { useState } from "react";
import "./App.css"

function App(){
    const [cart,setCart]=useState([]);

    function addToCart(shoe){
        const foundItem = cart.find((item)=>item.id===shoe.id);

        if(foundItem){
            const newCart=cart.map((item)=>{
                if (item.id===shoe.id){
                    return{
                        ...item,
                        quantity:item.quantity+1,
                    };
                }else{
                    return item;
                }
            });
            setCart(newCart);
        }else{
            setCart([
                ...cart,
                {
                    ...shoe,
                    quantity:+1,
                },
            ]);
        }
    }
    //Increase Quantity
    function increaseQuantity(id){
        const newCart =cart.map((item)=>{
            if(item.id===id){
                return{
                    ...item,
                    quantity:item.quantity+1,
                };
            }else{
                return item;
            }
        });
        setCart(newCart);
    }
    //decrease function
    function decreaseQuantity(id){
        const foundItem =cart.find((item)=>item.id===id);
        if (foundItem.quantity===1){
            removeFromCart(id);
            return;
        }
        const newCart=cart.map((item)=>{
            if(item.id===id){
                return{
                    ...item,
                    quantity: item.quantity-1,
                };
            }else{
                return item;
            }
        });
        setCart(newCart);
    }
    function removeFromCart(id){
        const newCart=cart.filter((item)=>item.id!==id);
        setCart(newCart);
    }
    const total=cart.reduce((sum,item)=>{
        return sum + item.price*item.quantity;
    },0);

    return(
        <>
        <header className="header">
            <h1>Online Sjoe Store</h1>
        </header>
        <div className="container">
            <div className="left">
                <h2>Available Shoes</h2>
                <div className="shoe-list">
                    {shoes.map((shoe)=>(
                        <div className="card" key={shoe.id}>
                            <img src={shoe.image} alt={shoe.name}/>
                            <h3>{shoe.name}</h3>
                            <p className="price">${shoe.price}</p>
                            <button className="add-btn"onClick={()=>addToCart(shoe)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="right">
                <h2>Shopping Cart</h2>
                {cart.lenght===0 ? (
                    <p>Your Cart is Empty.</p>
                ):(
                    <>
                    {cart.map((item)=>(
                        <div className="cart-item" key={item.id}>
                            <h4>{item.name}</h4>
                            <p>Price:${item.price}</p>
                            <div className="qty-box">
                                <button className="qty-btn"
                                onClick={()=>decreaseQuantity(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="qty-btn" onClick={()=>increaseQuantity(item.id)}>+</button>
                            </div>
                            <p className="subtotal">
                                Subtotal:${item.price*item.quantity}
                            </p>
                            <button className="remove-btn" onClick={()=>removeFromCart(item.id)}>Remove from cart</button>
                        </div>
                    ))}
                    <hr/>
                    <h3 className="total">
                        Total:${total}
                    </h3>
                    </>
                )}
            </div>
        </div>
        </>
    );
}
export default App;
