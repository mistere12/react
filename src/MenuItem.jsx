export function MenuItem({name,price,description,category,emoji}){
    return(
        <article className= "menu-item">
            <h3>{name} {emoji}</h3>
            <p>{description}</p>
            <p className={`category ${category.toLowerCase()}`}>{category}</p>
            <p className="price">{(price*1.15).toFixed(2)}ETB</p>
        </article>
    );
}

//props ?