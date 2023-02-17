function OrderButton(props) {
    if (props.cart.length === 0) {
        return <button className='btn btn-secondary px-3' disabled={true}>Beställ</button>;
    } else {
        return <button className='btn btn-primary px-3' onClick={() => props.setCart([])}>Beställ</button>;
    }
}

function SaladListing(props) {
    let bas = Object.keys(props.salad.ingredients).filter((ingredient) => props.salad.ingredients[ingredient].foundation);
    let protein = Object.keys(props.salad.ingredients).filter((ingredient) => props.salad.ingredients[ingredient].protein);
    let extras = Object.keys(props.salad.ingredients).filter((ingredient) => props.salad.ingredients[ingredient].extra);
    let dressing = Object.keys(props.salad.ingredients).filter((ingredient) => props.salad.ingredients[ingredient].dressing);

    return (
        <div key={props.salad.uuid} className="row h-200 px-4 py-2 my-3 bg-white border rounded-3">
            <div className="d-flex justify-content-between">
                <p>Sallad #{props.index + 1} </p>
                <i style={{ color: "grey" }}>ID: {props.salad.uuid} </i>
            </div>
            <div className='d-flex flex-wrap'>
                <div className='p-2'>
                    <b>Bas </b>
                    <ul>
                        {bas.map((ingredient, index) => <li key={index}> {ingredient} </li>)}
                    </ul>
                </div>
                <div className='p-2'>
                    <b>Protein </b>
                    <ul>
                        {protein.map((ingredient, index) => <li key={index}> {ingredient} </li>)}
                    </ul>
                </div>
                <div className='p-2'>
                    <b>Tillbehör </b>
                    <ul>
                        {extras.map((ingredient, index) => <li key={index}> {ingredient} </li>)}
                    </ul>
                </div>
                <div className='p-2'>
                    <b>Dressing </b>
                    <ul>
                        {dressing.map((ingredient, index) => <li key={index}> {ingredient} </li>)}
                    </ul>
                </div>
            </div>
            <b>Pris: {props.salad.getPrice()} kr </b>
        </div>
    );
}

function ViewOrder(props) {
    return (
        <div className='container col-12'>
            <div className="row h-200 p-5 bg-light border rounded-3 my-3">
                <h2>Din varukorg</h2>
                <div className='row mb-2'>
                    {props.cart.length === 0 ? <p> Din varukorg är tom! </p> : props.cart.map((salad, index) => { return <SaladListing salad={salad} index={index} /> })}
                </div>
                <b>Totalt pris: {props.cart.reduce((acc, curr) => acc + curr.getPrice(), 0)} kr</b>
                <div className='d-flex justify-content-center'>
                    <OrderButton cart={props.cart} setCart={props.setCart} />
                </div>
            </div>
        </div>
    );
}

export default ViewOrder;