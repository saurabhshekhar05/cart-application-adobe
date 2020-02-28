import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { apiService } from './services/api-service';

interface IProductClass {
    id: number;
    name: string;
    price: number;
    discount: number;
    category: string;
    img_url: string;
    qty?: number;
}

interface ICartProps {
    value: number;
}

interface ICartState {
    value: number;
    filtered: any;
    disabled: boolean;
    productList: IProductClass[];
    error?: string;
    totalPrice: number;
    discountedPrice?: number;
}

export default class CartViewComponent extends React.Component<ICartProps, ICartState> {
    public filterArray: any;
    public props: ICartProps;
    public arrayValue: any = [];
    private myRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    constructor(props: ICartProps) {
        super(props);
        this.props = props;
        this.state = {
            value: 0,
            disabled: true,
            productList: [],
            error: '',
            totalPrice: 0,
            discountedPrice: 0,
            filtered: []
        }
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    async componentDidMount() {
        this.arrayValue = localStorage.getItem('cartProducts');

        if (this.arrayValue == null) {
            return false;
        }
        var data = apiService.getCall('', '', null).then(function (result) {
            return Promise.resolve(result);
        });
        data.then((d: any) => {
            let productData: any = [];
            d.forEach(function (items: any) {
                productData[items.id] = items;
            });
            this.setState({
                productList: productData
            })
        });
    }

    getCartProduct = () => {
        let productcart: any = [];
        let ModifyData: any;

        localStorage.getItem('cartProducts') !== null && localStorage.getItem('cartProducts') !== undefined
            && Object.values(JSON.parse(localStorage.getItem('cartProducts')!)).map((pid: any) => {

                if (productcart[pid] !== undefined) {
                    ModifyData = {
                        qty: Math.round(productcart[pid].qty) + 1,
                        ...this.state.productList[pid]
                    };

                } else {
                    ModifyData = {
                        qty: 1,
                        ...this.state.productList[pid]
                    };
                }
                productcart[pid] = ModifyData;
            });
        return productcart;
    }

    private GettotalCartPrice() {
        let totalPrice: any = 0;

        this.getCartProduct().forEach((item: any) => {

            totalPrice = totalPrice + Math.round(item.qty * item.price);
        })
        return totalPrice;
    }

    render(): JSX.Element | null {
        return (
            <React.Fragment>
                <section className="section-pagetop bg">
                    <div className="container">
                        <h2 className="title-page">Shopping cart</h2>
                    </div>
                </section>
                <section className="section-content padding-y">
                    <div className="container">
                        <div className="row">
                            <main className="col-md-9">
                                <div className="card">
                                    <table className="table table-borderless table-shopping-cart">
                                        <thead className="text-muted">
                                            <tr className="small text-uppercase">
                                                <th scope="col">Product</th>
                                                <th scope="col" style={{ width: '120' }}>Quantity</th>
                                                <th scope="col" style={{ width: '120' }}>Price</th>
                                                <th scope="col" className="text-right" style={{ width: '120' }}> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.getCartProduct() !== null && this.getCartProduct().map((items: IProductClass, index: number) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <figure className="itemside">
                                                                    <div className="aside">
                                                                        <img src={items.img_url} alt={items.name} className="img-sm" />
                                                                    </div>
                                                                    <figcaption className="info">
                                                                        <a href="/cart-application-adobe" className="title text-dark">
                                                                            {items.name}</a>
                                                                        <p className="text-muted small">Category: {items.category}
                                                                        </p>
                                                                    </figcaption>
                                                                </figure>
                                                            </td>
                                                            <td>                                                                <div className="msc-cart-line__product-quantity">
                                                                <div className="msc-cart-line__product-quantity-label">Quantity</div>
                                                                <div className="quantity" id={"msc-cart-line__quantity_" + items.id}>
                                                                    {/* <button key={'keyd_ ' + items.id}  className="decrement quantity__controls " id={"decrementQuantity_" + items.id}
                                                                        onClick={() => { this.decrementCounter(this) }}
                                                                        disabled={this.state.disabled}

                                                                        aria-hidden="true" tabIndex={-1} color="secondary">
                                                                        <FontAwesomeIcon icon={faMinus} className="fa fa-minus" />
                                                                    </button> */}
                                                                    <input type="number" id={'idddd_ ' + items.id} key={'idddd_ ' + items.id} ref={this.myRef} className="quantity-input" pattern="[0-9]*" aria-live="polite" aria-label="quantity input"
                                                                        role="spinbutton" defaultValue={items.qty}
                                                                        onChange={(e: any) => this.handleChange(items.id, e)}
                                                                    />
                                                                    {/* <button key={'keyi_ ' + items.id}  className="increment quantity__controls " id={"incrementQuantity_" + items.id}
                                                                        onClick={() => { this.incrementCounter(this,this.myRef) }}

                                                                        aria-hidden="true" tabIndex={-1} color="secondary">
                                                                        <FontAwesomeIcon icon={faPlus} className="fa fa-plus" />
                                                                    </button> */}
                                                                </div>
                                                            </div>
                                                            </td>
                                                            <td>
                                                                <div className="price-wrap">
                                                                    <var className="price">{Math.round(items.price * items.qty!)}</var>
                                                                    {/* <small className="text-muted"> $315.20 each </small> */}
                                                                </div>
                                                            </td>
                                                            <td className="text-right">
                                                                <a href="/cart" className="btn btn-light" onClick={() => this.removeFromCart(this, items.id)}>
                                                                    <FontAwesomeIcon icon={faTrash} className="fa fa-trash" />
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>                                   
                                </div>
                            </main>
                            <aside className="col-md-3">
                                <div className="card">
                                    <div className="card-body">
                                        <dl className="dlist-align">
                                            <dt>Total price:</dt>
                                            <dd className="text-right"> {this.GettotalCartPrice()}</dd>
                                        </dl>
                                        <dl className="dlist-align">
                                            <dt>Discount:</dt>
                                            <dd className="text-right">{this.state.discountedPrice}</dd>
                                        </dl>
                                        <hr />
                                        <dl className="dlist-align">
                                            <dt>Total:</dt>
                                            <dd className="text-right  h5"><strong>{this.GettotalCartPrice()}</strong></dd>
                                        </dl>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }

    private removeFromCart(e: any, productID: number): void {
        let oldproduct: any = [];
        oldproduct = localStorage.getItem('cartProducts') ? localStorage.getItem('cartProducts') : "[]";
        let arrayproduct = JSON.parse(oldproduct);
        const index = arrayproduct.indexOf(productID);
        if (index > -1) {
            arrayproduct.splice(index, 1);
        }
        localStorage.removeItem('cartProducts');
        localStorage.setItem('cartProducts', JSON.stringify(arrayproduct));
        e.preventDefault();
        e.stopPropagation();
    }

    private handleChange = (pid: number, e: any) => {
        let productcart: any = [];
        productcart = this.getCartProduct();
        productcart[pid] = {
            qty: Math.round(e.target.value),
            ...this.state.productList[pid]
        };
        return productcart;
    };

    // incrementCounter(e: any,ref:any) { 
    //     // this.setState({
    //     //     value: this.state.value + 1, disabled: false
    //     // });

    //     ref.current!.value = '5';
    // }

    // decrementCounter(e: any) {
    //     if (this.state.value <= 0) {
    //         return;
    //     };
    //     this.setState({
    //         value: this.state.value - 1
    //     });
    //     if (this.state.value - 1 <= 0) {
    //         this.setState({
    //             disabled: true
    //         });
    //     }
    // }
}
