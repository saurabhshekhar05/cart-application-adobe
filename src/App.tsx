import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import './App.scss';
import WrapperComponent from './wrapper';
import CartViewComponent from './cart-view';
import HeaderViewComponent from './header-view';

interface IAppProps {
    isAdded?: number;
}
interface IAppState {
    cartitems: number;
    cartProducts: any;
}

class App extends React.Component<IAppProps, IAppState> {

    public props: IAppProps;
    public state: IAppState;

    constructor(props: IAppProps) {
        super(props);
        this.props = props;
        this.state = {
            cartitems: 0, cartProducts: []
        };
        this.updateCartitem = this.updateCartitem.bind(this);
    }

    private updateCartitem(productID: number) {
        let oldproduct: any = [];
        oldproduct = localStorage.getItem('cartProducts') ? localStorage.getItem('cartProducts') : "[]";
        let arrayproduct = JSON.parse(oldproduct);

        arrayproduct.push(productID);
        localStorage.setItem('cartProducts', JSON.stringify(arrayproduct));

        this.setState((prevState: IAppState) => ({
            cartitems: prevState.cartitems + 1,
            cartProducts: arrayproduct
        }));
    }

    public render(): JSX.Element {
        return (
            <BrowserRouter>
                <div className="App">
                    <header className="section-header">
                        <section className="header-main border-bottom">
                            <HeaderViewComponent
                                cartProduct={(localStorage.getItem('cartProducts') !== null && localStorage.getItem('cartProducts') !== undefined) ? Object.values(JSON.parse(localStorage.getItem('cartProducts')!)).flat().length : 0} />
                        </section>
                    </header>
                    <Switch>
                        <Route path='/' exact={true} render={() => <WrapperComponent updateCartitem={this.updateCartitem} />} />
                        <Route path='/cart' exact={true} component={CartViewComponent} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;