import { MenuItem } from './MenuItem';

const menu= [
    {
        id: 1,
        name: "Buna",
        price: 120,
        description: "Traditional Ethiopian Coffee",
        category: "Drink",
        emoji: "☕"
    },
     {
        id: 2,
        name: "Shiro",
        price: 90,
        description: "Traditional Ethiopian chickpea stew",
        category: "Main",
        emoji: "🍲"
    },
    {
        id: 3,
        name: "Tibs",
        price: 100,
        description: "Traditional Ethiopian steak",
        category: "Main",
        emoji: "🥩"
    },
    {
        id: 4,
        name: "Tej",
        price: 60,
        description: "Traditional Ethiopian honey wine",
        category: "Drink",
        emoji: "🍹"
    },
    {
        id: 5,
        name: "Agelgel",
        price: 150,
        description: "Traditional Ethiopian combo",
        category: "Main",
        emoji:"🥮"
    },
    {
        id: 6,
        name: "Tella",
        price: 40,
        description: "Traditional Ethiopian beverage",
        category: "Drink",
        emoji: "🍷"
    },
    {
        id: 7,
        name: "Kitfo",
        price: 120,
        description: "Traditional Ethiopian spiced meat dish",
        category: "Main",
        emoji: "🥩"
    },
    {
        id: 8,
        name: "Genfo",
        price: 80,
        description: "Traditional flavoured porridge",
        category: "Breakfast",
        emoji: "🍵"
    },
    


];

export function Menu(){   //no props nedded bc Menu.jsx owns z data (menu)
    return (
        <>
        <h2>Our Menu</h2>
        <div className="menu">
        {menu.map(d=>(
            <MenuItem
                key= {d.id}
                name= {d.name}
                price= {d.price}
                description= {d.description}
                category= {d.category}
                emoji= {d.emoji}
            />
        ))}
        </div>
        </>
    );
}